
'use strict';

import util from '../../util'
import mat3 from '../../base/Matrix'
import EventEmitter from '../../base/EventEmitter'
import TextureLoader from './TextureLoader'
import TextureText from './TextureText'
import TextureIcon from './TextureIcon'
import initEvent from '../../core/Event'
import Tween from '../../animation/tween'
import {
    loadProgram,
    loadShader,
    getActiveUniforms,
    getActiveAttributes,
    vertexAttribPointer,
    setUniforms,
    checkAttrValid,
    calculateStrip
} from '../../base/GLUtil'

const mouseType = {
    MOVE:'move',
    DEFAULT:'default',
    POINTER:'pointer'
};

class WebGLRender extends EventEmitter{
    constructor(context,container) {
        super();

        //graphView obj
        this.context = context;
        //config
        this.config = this.context.config;

        //dom canvas
        this.container = container;
        //graph
        this.graph = context.graph;

        //render flag, render when  needUpdate is true;
        this.needUpdate = true;
        //sample Ratio,
        this.sampleRatio = 1;

        // this.textureLoader = new TextureLoader();
        //manage icon texture for node
        this.textureIcon = new TextureIcon(this.config,0);
        //manager text texture for node ,edge
        this.textureText = new TextureText(this.config,1);

        //enum mouse type
        this.mouseType = mouseType;

        // matrix from camera coordinate to webgl coordinate[-1 ,1]
        this.projectMatrix = null;

        // camera transform info
        this.camera = {
            scale:1,//scale
            positionX:0,//position x
            positionY:0,//position y
            rotation:0//rotation,(not use now)
        };

        // gl frame buffer to save png(not use now)
        this.saveDataFrame = null;
        // gl texture
        this.saveDataTex = null;

        /**
         ** render cache for context : graph ,node ,edge. for every node or edge , cache the render data for the
         * relative layers, and if need , the vertex buffer of render layers are composed of the vertex data of the contexts,
         *  the index buffer of render layers  are composed of the index data fo the contexts;
         *
         *  more info look at [updateCacheByData]
         *
         *  layers : relative layers of the context. example : 'node' 'nodeLabel' 'rectNode' for node context.
         *  index : a map that store the layer info for each context, the key is the id of a node or a edge.
         *
         *      vertexStart: the start vertex num at the vertex buffer of render layer,
         *      data.vertices: the vertex data array.
         *      data.indices: the index data array.
         *      oldVertexLength: the len of data.vertices in bytes.
         *      oldIndexLength: the len of data.indices in bytes.
         *
         *  filters : context relative filters
         *
         *  update : data to update
         *
         *  example:
         *  {
         *     node:{
         *       layers:['node','nodeLabel',...]
         *       index:{
         *             'nodeId1':{
         *                      'layername1': {vertexStart:-1,data:{vertices:[...],indices:[...]},oldVertexLength:-1,oldIndexLength:-1}
         *                      .....
         *                  }
         *               ....
         *              }
         *       filters:[filterNodeBySize,....]
         *       }
         *  }
         *
         */
        this.renderCache = {
            graph: {layers: [], index: {}, filters: [],update:{map:null,data:null}},
            node: {layers: [], index: {}, filters: [],update:{map:null,data:null}},
            edge: {layers: [], index: {}, filters: [],update:{map:null,data:null}}
        };
        // map for layers ,key is the layer name.
        this.renderLayerMap = {};

        /**
         * render layer config, default is the WebGLRender.defaultLayersConfig .  more info in file [defaultConfig/index.js]
         * {
         *   mainLayer: {boolean} the main name that the layer belong to.
         *   enable: {boolean} render and update the layer or not
         *   show: {boolean} render the layer or not ,  don't affect update the layer.
         *   needResize: {boolean} need resize the vertex buffer of layer or not
         *   program: {WebGLProgram} the vertex buffer is initialized or not.
         *   tempVertex: temp data for vertex buffer.
         *   tempIndex: temp data for index buffer.
         *   cache:{boolean} vertex buffer cache flag.
         *   indexCache:{boolean} index buffer cache flag.
         *   check:{fun} check the node or the edge will be render at the layer
         *   option:{obj} custom args for the layer, pass to [getRenderData , getUniforms] of the layer render.
         *   filter:{array} layer filters.
         * }
         *
         */
        this.renderLayersConfig = this.config.renderLayersConfig || WebGLRender.defaultLayersConfig;

        //init webgl context and Extension
        this.initGl();

        //register events to graph,event 'change' 'add' 'remove' etc.
        this.initEvent();

        //init textureIcon for node
        this.initIconTexture();

        console.time('initTextTexture')
        //init textureText for node label and edge label
        this.initTextTexture();
        console.timeEnd('initTextTexture')


        //init render layers info
        this.initRenderLayer();

        // this.updateLayerData();

        // init mouse events
        initEvent.call(this);

    }

    /**
     * init webgl info
     */
    initGl() {
        //webgl　默认初始化 option
        var option = {
            preserveDrawingBuffer:true,
            premultipliedAlpha:true,
            alpha:true,
            antialias:true
        }

        var canvas = this.container,gl;
        
        gl = canvas.getContext('experimental-webgl',option) || canvas.getContext('webgl',option);


        if (!gl) {
            throw 'browser not support webGl!';
        }

        //加载　Extension
        gl.getExtension('OES_standard_derivatives');
        gl.getExtension('OES_element_index_uint');

        this.gl = gl;
    }

    /**
     * init event
     */
    initEvent(){
        var _this = this;
        //graph node or edge 属性改变会触发　change 事件，
        this.graph.on('change',function (type,ids,dirtyAttrs) {
            if(type =='node'){
                updateTextureText(dirtyAttrs);
                 _this.updateNodeRenderData(ids,dirtyAttrs);
            }else if(type == 'edge'){
                updateTextureText(dirtyAttrs);
                _this.updateEdgeRenderData(ids,dirtyAttrs);
            }

        });

        // clear缓存，重新计算 icon 和　text texture
        this.graph.on('reset',function () {
            _this.clearRenderCache();
            _this.initIconTexture();
            _this.initTextTexture();
        });


        //node or edge 增加时，　需要重新计算cache, 更新text texture.
        this.graph.on('add',function (type,ids) {
            if(!util.isArray(ids)) ids = [ids];

            var objs = null;

            if(type == 'node') objs = ids.map(function (e) {return _this.graph.nodesIndex[e]});
            else objs = ids.map(function (e) {return _this.graph.edgesIndex[e]});

            updateTextureText(objs);
            _this.clearRenderCache();

        });

        // node or edge 移除时，　需要重新计算　index cache
        this.graph.on('remove',function (type,ids) {
            _this.forceRender();
            var contextRelativeLayers = _this.renderCache[type].layers;
            var  renderLayerMap = _this.renderLayerMap;

            contextRelativeLayers.forEach(function (layer) {
                renderLayerMap[layer].indexCache = false;// 重新计算index cache
            });
        });

        //更新 text texture
        function updateTextureText(objs) {
            // debugger
            var addtexts = getAddText(objs);
            if(addtexts.length > 0){
                // console.time('updateTextureText');
                //是否需要　resize text texture
                if(_this.textureText.needResize(addtexts.length)){
                    //clear cache
                    _this.clearRenderCache();
                }
                //add texts
                _this.textureText.addTexts(addtexts);
                _this.textureText.attachGl(_this.gl);
                // console.timeEnd('updateTextureText');
            }
        }

        function getAddText(objs) {
            var infos = _this.textureText.textinfo.infos;
            var char,len;
            var texts = [];
            var map = {};
            objs.forEach(function (e) {
                if(!e.label) return;
                len = e.label.length;
                for(var i = 0;i< len;i++){
                    char = e.label.charAt(i);
                    if(!infos[char] && !map[char]){
                        texts.push(char);
                        map[char] = true;
                    }
                }
            });

            return texts;
        }

    }

    /**
     * 初始化，text texture, 计算node.label 和　edge.label中的文字。
     */
    initTextTexture(){

        //clear
        this.textureText.clear();

        var nodes = this.graph.nodes;
        var edges = this.graph.edges;

        // node label
        var map = {};
        var texts = [];
        nodes.forEach(function (e) {
            if(e.label){
                var chars = e.label.split('');
                chars.forEach(function (e) {
                    if(e && !map[e]){
                        map[e] = true;
                        texts.push(e);
                    }
                })
            }
        });


        //edge label
        edges.forEach(function (e) {
            if(e.label){
                var chars = e.label.split('');
                chars.forEach(function (e) {
                    if(e && !map[e]){
                        map[e] = true;
                        texts.push(e);
                    }
                })
            }
        });

        // add text
        this.textureText.addTexts(texts);
        // 创建 gl texture and bind
        this.textureText.attachGl(this.gl);
    }

    /**
     * 初始化 icon texture ,计算node.icon 中的 icon
     */
    initIconTexture(){

        //clear
        this.textureIcon.clear();

        var nodes = this.graph.nodes;

        //node icon
        var map = {};
        var icons = [];

        if(this.config.textureIcons && this.config.textureIcons.length > 0) icons = this.config.textureIcons;
        else{
            nodes.forEach(function (e) {
                if(e.icon){
                    if(!map[e.icon]){
                        map[e.icon] = true;
                        icons.push(e.icon);
                    }
                }
            });
        }



        //create icon texture
        this.textureIcon.createIcons(icons);

        //create gl texture and bind
        this.textureIcon.attachGl(this.gl);

    }

    /**
     * 初始化render layer
     */
    initRenderLayer(){
        var  renderLayerMap = this.renderLayerMap;
        var gl = this.gl;
        var program,strip = 0;

        var _this = this;


        this.renderLayersConfig.forEach(function (layer) {

            layer.subLayers.forEach(function (subLayer) {

                //default value
                if(subLayer.enable == undefined) subLayer.enable = true;
                if(subLayer.show == undefined) subLayer.show = true;
                if(subLayer.option == undefined) subLayer.option = {};
                if(subLayer.filters == undefined) subLayer.filters = [];

                //layer map
                renderLayerMap[subLayer.name] = subLayer;

                //自定义layer ,没有下面的参数
                if(subLayer.custom) return;

                //create WebGLProgram
                program = loadProgram(gl, [
                    loadShader(gl, subLayer.render.shaderVert, gl.VERTEX_SHADER),
                    loadShader(gl, subLayer.render.shaderFrag, gl.FRAGMENT_SHADER)
                ]);

                // attributes in shader
                program.activeAttributes = getActiveAttributes(gl,program);
                // uniforms in shader
                program.activeUniforms = getActiveUniforms(gl,program);

                //strip of a point in the render layer。
                strip = subLayer.render.strip;

                //如果不存在strip ,　从attributes　config 中计算
                if(!subLayer.render.strip) strip = calculateStrip(subLayer.render.attributes);

                //attributes offset in strip
                program.offsetConfig = {config:subLayer.render.attributes,strip:strip};
                program.uniforms = null;
                //VBO buffer
                program.vertexBuffer = gl.createBuffer();
                //IBO buffer
                program.indexBuffer = gl.createBuffer();
                //IBO length
                program.indexN = 0;

                subLayer.mainLayer = layer.name;
                subLayer.program = program;
                // subLayer.initBuffer = false;
                subLayer.tempVertex = [];
                subLayer.tempIndex = [];
                // subLayer.index = [];
                subLayer.indexCache = false;
                subLayer.needResize = false;

                //layer check when create cache
                if(subLayer.check == undefined) subLayer.check = function () {return true};

                _this.renderCache[subLayer.context].layers.push(subLayer.name);

            })
        }.bind(this));
    }

    /**
     * prepare the render data and draw
     */
    render() {

        if(!this.needUpdate) return;

        // resize canvas width and height ,update projectMatrix

        this.resizeCanvas();
        // console.time('render');

        this.updateChange();

        //更新node 相关的render layer的　cache.

        // console.time('updateContextCacheNode');
        this.updateContextCache('node');
        // console.timeEnd('updateContextCacheNode');

        //更新edge 相关的render layer的　cache.

        // console.time('updateContextCacheEdge');
        this.updateContextCache('edge');
        // console.timeEnd('updateContextCacheEdge');

        //计算uniforms

        // console.time('updateLayerUniformData');
        this.updateLayerUniformData();
        // console.timeEnd('updateLayerUniformData');

        //resize vertex buffer(VBO).

        // console.time('resizeLayerVertexData');
        this.resizeLayerVertexData('node');
        this.resizeLayerVertexData('edge');
        // console.timeEnd('resizeLayerVertexData');

        //update index buffer(IBO)
        this.updateLayerIndex('node');//node first
        this.updateLayerIndex('edge');

        // console.time('draw');
        try {
            this.draw();
        }catch (e) {
            console.error(e);
        }

        // console.timeEnd('draw');
        // console.timeEnd('render');

        this.needUpdate = false;

    }

    /**
     * set default render flags
     */
    setFlag(){
        var gl = this.gl;

        // gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        // gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA,gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
        gl.enable(gl.BLEND);
        gl.disable(gl.DEPTH_TEST);

        var bgColor  = util.parseColor(this.config.defaultBackgroundColor);
        gl.clearColor(bgColor.r/255,bgColor.g/255,bgColor.b/255,bgColor.a/255);

        //clear viewport
        gl.clear(gl.COLOR_BUFFER_BIT);
    }

    /**
     * draw layer data
     */
    draw(){

        var mainLayer, subLayers, layer, gl,err,
            renderLayerMap, program;
        renderLayerMap = this.renderLayerMap;

        gl = this.gl;
        //set flag
       this.setFlag();

       //emit event
       this.emit('renderBefore',[this]);

        for (var i = 0; i < this.renderLayersConfig.length; i++) {
            mainLayer = this.renderLayersConfig[i];
            subLayers = mainLayer.subLayers;

            //for each layer
            for (var j = 0; j < subLayers.length; j++) {

                layer = subLayers[j].name;

                if(!subLayers[j].enable || !subLayers[j].show) continue;

                //custom render
                if(subLayers[j].custom && subLayers[j].render){
                    subLayers[j].render.call(subLayers[j],this,subLayers[j].option);
                    continue;
                }

                //WebGLProgram
                program = renderLayerMap[layer].program;

                if(program.indexN == 0) continue;

                //call renderBefore if exist
                if(subLayers[j].render.renderBefore && util.isFunction(subLayers[j].render.renderBefore)){
                    subLayers[j].renderBefore.render.call(subLayers[j],this,subLayers[j].option);
                }

                //gl call, use program
                gl.useProgram(program);

                //bind VBO IBO
                gl.bindBuffer(gl.ARRAY_BUFFER, program.vertexBuffer);
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, program.indexBuffer);

                //set attributes offset and enable attributes location
                if(err = vertexAttribPointer(gl, program.activeAttributes, program.offsetConfig)){
                    throw new Error(`render layer[ ${layer} ] err:\n ${err}`);
                }

                //set uniform values
                if(err = setUniforms(gl, program.activeUniforms, program.uniforms)){
                    throw new Error(`render layer[ ${layer} ] err:\n ${err}`);
                }

                //draw data
                gl.drawElements(gl.TRIANGLES, program.indexN, gl.UNSIGNED_INT, 0);

                //call renderAfter if exist
                if(subLayers[j].render.renderAfter && util.isFunction(subLayers[j].render.renderAfter)){
                    subLayers[j].render.renderAfter.call(subLayers[j],this,subLayers[j].option);
                }

                //clear bing status
                gl.bindBuffer(gl.ARRAY_BUFFER, null);
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);


            }
        }

        //emit event
        this.emit('renderAfter',[this]);

        // console.log('render count:',num);
    }

    /**
     * update change
     */
    updateChange(){

        //update node
        var update,id,map;
        update = this.renderCache.node.update;
        if(update.data && update.data.length > 0){
            map = update.map;
            for(id in map) this.updateCacheByData('node',this.graph.nodesIndex[id],map[id]);

            update.data = null;
            update.map = null;
        }

        //update edge
        update = this.renderCache.edge.update;
        if(update.data && update.data.length > 0){
            map = update.map;
            for(id in map) this.updateCacheByData('edge',this.graph.edgesIndex[id],map[id]);

            update.data = null;
            update.map = null;
        }

    }

    /**
     * add change
     */
    addChange(context,id,changeData){
        if(context != 'node' &&  context != 'edge' && context != 'graph') return;

        var map,data,temp;
        if(context === 'graph'){
            //reserve
        }else {
            map = this.renderCache[context].update.map = this.renderCache[context].update.map || Object.create(null);
            data = this.renderCache[context].update.data = this.renderCache[context].update.data || [];

            if(!map[id]) map[id] = temp = {}, data.push(temp);
            else temp = map[id];

            for(var attr in changeData) temp[attr] = changeData[attr];
        }
    }

    /**
     * 计算cache chunk,
     * @param context : node ,edge ,graph etc;
     * @param data: a node or a edge obj,
     * @param dirtyAttr : changed attributes
     * @param needUpdateLayers : need update layers
     */
    updateCacheByData(context,data,dirtyAttr,needUpdateLayers){

        var cacheIndex,temp,points,startBytes,strip;
        var contextRelativeLayers = this.renderCache[context].layers;
        var renderLayerMap = this.renderLayerMap;
        var gl = this.gl;

        //index map
        cacheIndex = this.renderCache[context].index[data.id] =  this.renderCache[context].index[data.id]  || {};

        needUpdateLayers = needUpdateLayers || contextRelativeLayers;

        //update cache
        needUpdateLayers.forEach(function(layer) {

            if(!renderLayerMap[layer].check(data) || !renderLayerMap[layer].enable) return;

            //dirtyAttr setData update,ignore update cache ,
            if(dirtyAttr && !renderLayerMap[layer].cache) return;

            //calculate cache
            temp = renderLayerMap[layer].render.getRenderData({
                dirtyAttr:dirtyAttr,//dirty attributes
                oldData:cacheIndex[layer] ? cacheIndex[layer].data : null,//cache data, 可以看情况复用
                data: data,//a node or a edge
                config:this.config,
                graph: this.graph,
                textureText: this.textureText,
                option: renderLayerMap[layer].option,//custom  args
                // textureLoader: this.textureLoader,
                textureIcon: this.textureIcon
            });


            strip = renderLayerMap[layer].program.offsetConfig.strip;

            //cache 有效时，进行局部更新
            if(renderLayerMap[layer].cache){
                //updateNodeRenderData　updateEdgeRenderData　进行局部更新　主要执行这一部分

                //no data
                if(!temp){
                    if(cacheIndex[layer].data){//need update index cache;
                        renderLayerMap[layer].indexCache = false;
                        cacheIndex[layer].data = null;
                    }
                    return;
                }

                //vertex size 和上一次不一致的时候，会resize vertex buffer
                if(renderLayerMap[layer].needResize || (temp && temp.vertices.length !== cacheIndex[layer].oldVertexLength)){
                    renderLayerMap[layer].indexCache = false;
                    renderLayerMap[layer].needResize = true;//set resize flag
                    cacheIndex[layer].data = temp;
                    cacheIndex[layer].oldVertexLength = temp.vertices.length;
                    cacheIndex[layer].oldIndexLength = temp.indices.length;
                }else{

                    //每个float占4个bytes
                    startBytes = cacheIndex[layer].vertexStart * strip * 4;//float 4 bytes

                    //bind vertex buffer,局部更新vertex buffer data
                    gl.bindBuffer(gl.ARRAY_BUFFER, renderLayerMap[layer].program.vertexBuffer);
                    gl.bufferSubData(gl.ARRAY_BUFFER, startBytes,new Float32Array(temp.vertices));

                    cacheIndex[layer].data = temp;

                    //如果indices size 和　上一次不一致，需要更新index buffer
                    if(temp.indices.length !== cacheIndex[layer].oldIndexLength) renderLayerMap[layer].indexCache = false;
                }

            }else {//cache　无效时，　把数据保存到　temp array.

                //updateContextCache 主要执行这一部分

                //temp array中的point数
                points = renderLayerMap[layer].tempVertex.length / strip;


                /**
                 * chunk info
                 * vertexStart: 这个vertex chunk在vertex buffer中的第几个point，
                 * oldVertexLength: vertex chunk size，
                 * oldIndexLength: index chunk size，
                 */
                cacheIndex[layer] = {vertexStart:-1,data:null,oldVertexLength:-1,oldIndexLength:-1};

                if(!temp) return;

                //检查chunk中point 属性长度是否一致
                if(!util.isInteger(temp.vertices.length/strip))
                    throw new Error('points num not bound to a integer');

                cacheIndex[layer].data = temp;//cache old data
                cacheIndex[layer].vertexStart = points;
                cacheIndex[layer].oldVertexLength = temp.vertices.length;
                cacheIndex[layer].oldIndexLength = temp.indices.length;

                //add vertex chunk to temp array
                temp.vertices.forEach(function (e) {renderLayerMap[layer].tempVertex.push(e)});
            }

        }.bind(this))
    }

    /**
     * 计算context 相关layer的cache.
     * @param context : node ,edge ,graph etc.
     */
    updateContextCache(context){
        if(context != 'node' &&  context != 'edge' && context != 'graph') return;

        var datas,contextRelativeLayers,needUpdateLayers;
        var gl = this.gl;
        var  renderLayerMap = this.renderLayerMap;

        if(context === 'graph'){
            //reserve
        }else {

            //寻找需要计算cache　的layers
            needUpdateLayers = [];
            contextRelativeLayers = this.renderCache[context].layers;
            contextRelativeLayers.forEach(function (layer) {
                if(!renderLayerMap[layer].cache && renderLayerMap[layer].enable)
                    needUpdateLayers.push(layer)
            });

            if(needUpdateLayers.length < 1) return;

            datas = context == 'node' ? this.graph.nodes : this.graph.edges;
            for(var i = 0,len = datas.length;i < len ; i++){
                //create cache for a node or a edge
                this.updateCacheByData(context,datas[i],null,needUpdateLayers);
            }

            //创建vertex buffer 从 temp array
            needUpdateLayers.forEach(function (layer) {

                //bind and crate buffer
                gl.bindBuffer(gl.ARRAY_BUFFER, renderLayerMap[layer].program.vertexBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(renderLayerMap[layer].tempVertex), gl.DYNAMIC_DRAW);

                //set flag
                renderLayerMap[layer].cache = true;

                renderLayerMap[layer].tempVertex = [];
                // renderLayerMap[layer].tempIndex = [];
            })
        }

    }

    /**
     * resize layer vertex buffer,
     * @param context
     */
    resizeLayerVertexData(context){
        if(context != 'node' &&  context != 'edge' && context != 'graph') return;

        var datas,contextRelativeLayers,cacheIndex;
        var data,needResizeLayer,points,strip,vertexLen;
        var gl = this.gl;
        var  renderLayerMap = this.renderLayerMap;

        if(context === 'graph'){

        }else {
            datas = context == 'node' ? this.graph.nodes : this.graph.edges;
            contextRelativeLayers = this.renderCache[context].layers;

            //find need resize vertex layers
            needResizeLayer = [];
            contextRelativeLayers.forEach(function (layer) {
                if(renderLayerMap[layer].needResize){
                    needResizeLayer.push(layer);
                    renderLayerMap[layer].tempVertex = [];
                    renderLayerMap[layer].tempIndex = [];
                }
            });

            if(needResizeLayer.length > 0){
                for(var i = 0,len = datas.length;i < len ; i++){
                    data = datas[i];

                    cacheIndex = this.renderCache[context].index[data.id];

                    //create temp array data from vertex chunk
                    for(var layer in cacheIndex){
                        if(!renderLayerMap[layer].needResize) continue;

                        strip = renderLayerMap[layer].program.offsetConfig.strip;
                        points = renderLayerMap[layer].tempVertex.length/strip;//points in tempVertex
                        vertexLen = cacheIndex[layer].oldVertexLength;//vertex len

                        //当data 为null时候　，oldVertexLength > 0，说明上一次这个chunk有数据，暂时保留chunk的位置，初始化为０
                        if(vertexLen > 0){
                            cacheIndex[layer].vertexStart = points;
                            for(var j = 0;j< vertexLen;j++){
                                renderLayerMap[layer].tempVertex.push(
                                    cacheIndex[layer].data ?  cacheIndex[layer].data.vertices[j] : 0//no data fill with 0
                                );
                            }
                        }
                    }
                }

                //创建vertex buffer 从 temp array
                needResizeLayer.forEach(function (layer) {

                    gl.bindBuffer(gl.ARRAY_BUFFER, renderLayerMap[layer].program.vertexBuffer);
                    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(renderLayerMap[layer].tempVertex), gl.DYNAMIC_DRAW);

                    renderLayerMap[layer].cache = true;
                    renderLayerMap[layer].needResize = false;

                    renderLayerMap[layer].tempVertex = [];
                    // renderLayerMap[layer].tempIndex = [];
                })

            }


        }

    }

    /**
     * update index buffer.
     * @param context : node ,edge ,graph etc.
     */
    updateLayerIndex(context){
        if(context != 'node' &&  context != 'edge' && context != 'graph') return;

        var datas,contextRelativeLayers,cacheIndex,data,needUpdateLayer,check,startPoint;
        var gl = this.gl;
        var  renderLayerMap = this.renderLayerMap;

        if(context === 'graph'){

        }else {
            datas = context == 'node' ? this.graph.nodes : this.graph.edges;
            contextRelativeLayers = this.renderCache[context].layers;

            //find need update layers
            needUpdateLayer = [];
            contextRelativeLayers.forEach(function (layer) {
                if(!renderLayerMap[layer].indexCache) needUpdateLayer.push(layer);
            })

            if(needUpdateLayer.length > 0){
                for(var i = 0,len = datas.length;i < len ; i++){
                    data = datas[i];

                    cacheIndex = this.renderCache[context].index[data.id];

                    //如果contex是edge的时候，edge的source,target中一个别过滤了，这条edge也会被过滤。
                    if(context == 'edge'){
                        if(this.graph.nodesIndex[data.source].filter || this.graph.nodesIndex[data.target].filter){
                            data.filter = true;
                            continue;
                        }
                    }

                    //context filters
                    if(this.renderCache[context].filters && this.renderCache[context].filters.length){
                        if(data.filter = this._checkFilters(this.renderCache[context].filters,data)) continue;
                    }else data.filter = false;

                    //crate temp array from index chunk data
                    for(var layer in cacheIndex){
                        if(renderLayerMap[layer].indexCache || !cacheIndex[layer].data) continue;

                        //layer filters
                        if(renderLayerMap[layer].filters && renderLayerMap[layer].filters.length){
                            if(check = this._checkFilters(renderLayerMap[layer].filters,data)) continue;
                        }

                        startPoint = cacheIndex[layer].vertexStart;

                        cacheIndex[layer].data.indices.forEach(function (id) {
                            renderLayerMap[layer].tempIndex.push(id+startPoint);
                        });
                    }
                }

                //crate index buffer from temp array
                needUpdateLayer.forEach(function (layer) {
                    //bind and create buffer
                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, renderLayerMap[layer].program.indexBuffer);
                    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(renderLayerMap[layer].tempIndex), gl.STATIC_DRAW);
                    renderLayerMap[layer].program.indexN = renderLayerMap[layer].tempIndex.length;
                    renderLayerMap[layer].tempIndex = [];
                    renderLayerMap[layer].indexCache = true;//set flag
                })
            }


        }

    }

    /**
     * calculate uniforms every render frame.
     */
    updateLayerUniformData(){
        var uniforms,err;
        var renderLayerMap = this.renderLayerMap;

        for(var layer in renderLayerMap){
            if(renderLayerMap[layer].custom) continue;
            uniforms = renderLayerMap[layer].render.getUniforms({
                matrix: mat3.multiMatrix([this.getCameraMatrix(true), this.projectMatrix]),//matrix transform from camera to gl
                camera: this.camera, //camera info
                config: this.config,
                option: renderLayerMap[layer].option, //custom args
                sampleRatio: this.sampleRatio,
                textureText: this.textureText,
                textureIcon: this.textureIcon
                // textureLoader: this.textureLoader,
            });

            if (err = checkAttrValid(renderLayerMap[layer].program.activeUniforms, uniforms)) {
                throw err.join('\n');
            }

            renderLayerMap[layer].program.uniforms = uniforms;
        }
    }

    /**
     * 局部更新node data
     * @param ids: node ids
     * @param dirtyAttrs: dirty attributes
     */
    updateNodeRenderData(ids,dirtyAttrs){

        if(!util.isArray(ids)) ids = [ids];
        if(!util.isArray(dirtyAttrs)) dirtyAttrs = [dirtyAttrs];

        this.forceRender();

        ids.forEach( function(id,i){
            // this.updateCacheByData('node',this.graph.nodesIndex[id],dirtyAttrs[i]);
            this.addChange('node',id,dirtyAttrs[i]);
        }.bind(this));

    }

    /**
     * 局部更新edge data
     * @param ids: edge ids
     * @param dirtyAttrs: dirty attributes
     */
    updateEdgeRenderData(ids,dirtyAttrs){
        if(!Array.isArray(ids)) ids = [ids];
        if(!Array.isArray(dirtyAttrs)) dirtyAttrs = [dirtyAttrs];

        this.forceRender();

        ids.forEach(function (id,i) {
            // this.updateCacheByData('edge',this.graph.edgesIndex[id],dirtyAttrs[i]);
            this.addChange('edge',id,dirtyAttrs[i]);
        }.bind(this));
    }

    /**
     * clear layer cache, if layers omitted, clear all layer cache.
     * @param layers {string | [string]} :  layer name.
     */
    clearRenderCache(layers){
        this.forceRender();
        var _this = this;
        if(layers){
            if(!util.isArray(layers)) layers = [layers];
            layers.forEach(function (layer) {
                if(_this.renderLayerMap[layer].custom) return;

                _this.renderLayerMap[layer].cache = false;
                _this.renderLayerMap[layer].needResize = false;
                _this.renderLayerMap[layer].indexCache = false;
                _this.renderLayerMap[layer].program.indexN = 0;
            });
        }else {
            for(var layer in _this.renderLayerMap){
                if(_this.renderLayerMap[layer].custom) continue;

                _this.renderLayerMap[layer].cache = false;
                _this.renderLayerMap[layer].needResize = false;
                _this.renderLayerMap[layer].indexCache = false;
                _this.renderLayerMap[layer].program.indexN = 0;
            }
            _this.renderCache.graph.index = {};
            _this.renderCache.node.index = {};
            _this.renderCache.edge.index = {};
        }
    }

    /**
     *  disable layer，disable之后，不会render，layer data也不会更新
     * @param layers {string | [string]}
     */
    disableRenderLayer(layers){
        this.forceRender();

        var renderLayerMap = this.renderLayerMap;

        if(!util.isArray(layers)) layers = [layers];

        layers.forEach(function (layer) {
            if(renderLayerMap[layer]){
                renderLayerMap[layer].enable = false;
            }
        });
    }

    /**
     *  enable layer，enable之后，layer cache 会重新计算一次
     * @param layers {string | [string]}
     */
    enableRenderLayer(layers){
        this.forceRender();

        var renderLayerMap = this.renderLayerMap;

        if(!util.isArray(layers)) layers = [layers];

        layers.forEach(function (layer) {
            if(renderLayerMap[layer])
            {
                renderLayerMap[layer].enable = true;
                renderLayerMap[layer].cache = false;
                renderLayerMap[layer].indexCache = false;
                renderLayerMap[layer].program.indexN = 0;
            }
        });
    }

    /**
     * hide layer, 不会render　layer ,　但是layer cache data 会更新
     * @param layers {string | [string]}
     */
    hideRenderLayer(layers){
        this.forceRender();

        var renderLayerMap = this.renderLayerMap;

        if(!util.isArray(layers)) layers = [layers];
        layers.forEach(function (layer) {
            if(renderLayerMap[layer]){
                renderLayerMap[layer].show = false;
            }
        });
    }

    /**
     * show layer
     * @param layers {string | [string]}
     */
    showRenderLayer(layers){
        this.forceRender();

        var renderLayerMap = this.renderLayerMap;

        if(!util.isArray(layers)) layers = [layers];
        layers.forEach(function (layer) {
            if(renderLayerMap[layer]){
                renderLayerMap[layer].show = true;
            }
        });
    }

    /**
     * 对layer 触发一次layer filter 更新，重新计算index buffer
     * @param layers {string | [string]}
     */
    updateByLayerFilter(layers){
        if(!layers) return;

        this.forceRender();

        var renderLayerMap = this.renderLayerMap;
        if(!util.isArray(layers)) layers = [layers];

        layers.forEach(function (layer) {
            if(!renderLayerMap[layer]) return;
            renderLayerMap[layer].indexCache = false;
        });
    }

    /**
     * 对 context 相关的layer触发一次更新，重新计算index buffer
     * @param context
     */
    updateByContextFilter(context){
        var contextRelativeLayers = this.renderCache[context].layers;
        var renderLayerMap = this.renderLayerMap;

        this.forceRender();

        contextRelativeLayers.forEach(function (layer) {
            renderLayerMap[layer].indexCache = false;
        });
    }

    /**
     * set layer filter
     * @param layer {string}
     * @param filters {[fun]}
     */
    setLayerFilters(layer,filters){
        var  renderLayerMap = this.renderLayerMap;
        if(!renderLayerMap[layer]) return;

        this.forceRender();
        filters = filters || [];

        if(!util.isArray(filters)) filters = [filters];

        renderLayerMap[layer].indexCache = false;
        renderLayerMap[layer].filters = filters;

    }

    /**
     * get layer filter
     * @param layer
     */
    getLayerFilters(layer){
        return  this.renderLayerMap[layer] ?  this.renderLayerMap[layer].filters : null;
    }

    /**
     * set context filter
     * @param context
     * @param filters
     */
    setContextFilters(context,filters){
        this.forceRender();
        filters = filters || [];

        if(!util.isArray(filters)) filters = [filters];

        var  renderLayerMap = this.renderLayerMap;
        var  contextRelativeLayers = this.renderCache[context].layers;

        contextRelativeLayers.forEach(function (layer) {
            renderLayerMap[layer].indexCache = false;
        });

        this.renderCache[context].filters = filters;
    }

    /**
     * get context filter
     * @param context
     * @returns {null}
     */
    getContextFilters(context){
        return  this.renderCache[context] ?  this.renderCache[context].filters : null;
    }

    /**
     * set layer custom args
     * @param layer
     * @param option
     */
    setLayerOption(layer,option){
        var renderLayerMap = this.renderLayerMap;
        if(!renderLayerMap[layer]) return;

        this.forceRender();

        for(var attr in option){
            renderLayerMap[layer].option[attr] = option[attr];
        }
    }

    /**
     * set mouse type
     * @param type
     */
    setMouseType(type){
        // if(mouseType[type]){
        this.container.style.cursor = type;
        // }
    }

    /**
     * get camera matrix ,
     * @param isInvert
     * @returns {*}
     */
    getCameraMatrix(isInvert){
        var mat = mat3.multiMatrix([
            mat3.matrixFromScale(this.camera.scale,this.camera.scale),
            mat3.matrixFromRotation(this.camera.rotation),
            mat3.matrixFromTranslate(this.camera.positionX,this.camera.positionY)
        ]);
        return isInvert  ? mat3.invert(mat) : mat;
    }

    /**
     * resize render canvas and set viewport , update  projectMatrix
     * @private
     */
    resizeCanvas() {
        var canvas;
        var multiplier = this.sampleRatio;
        canvas =this.container;
        var width = canvas.clientWidth * multiplier | 0;
        var height = canvas.clientHeight * multiplier | 0;
        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
            this.gl.viewport(0, 0,canvas.width, canvas.height);
        }
        this.projectMatrix = mat3.matrixFromScale(2/(this.container.clientWidth),2/(this.container.clientHeight));
    }

    /**
     * translate point from graph to camera
     * @param pos obj {x:number,y:number}
     * @returns {{x: number, y: number}}
     */
    graphToDomPos(pos){
        var container = this.container;
        var camPos =  mat3.transformPoint([pos.x,pos.y],this.getCameraMatrix(true));
        return {x:camPos[0]+container.clientWidth/2,y:container.clientHeight/2-camPos[1]};
    }

    /**
     * translate point from dom to camera
     * @param pos obj {x:number,y:number}
     * @returns {{x: number, y: number}}
     */
    domToCameraPos(pos){
        var container = this.container;
        return {x:pos.x-container.clientWidth/2,y:container.clientHeight/2-pos.y};
    }

    /**
     * translate point from dom to camera
     * @param pos obj {x:number,y:number}
     * @returns {{x: number, y: number}}
     */
    cameraToGraphPos(pos,isVector){
        var p = isVector ?
            mat3.rotateVector([pos.x,pos.y],this.getCameraMatrix())
            :
            mat3.transformPoint([pos.x,pos.y],this.getCameraMatrix());
        return {x:p[0],y:p[1]};
    }

    /**
     * force render
     */
    forceRender(){
        this.needUpdate = true;
    }

    /**
     * zoom from a point
     * @private
     * @param ratio
     * @param x
     * @param y
     * @param animation
     */
    zoomFromPosition(ratio,x,y,animation){
        // debugger

        var scale = this.camera.scale;
        var positionX,positionY;

        var newscale = ratio * scale;
        if(newscale < this.config.zoomMin) newscale = this.config.zoomMin;
        if(newscale > this.config.zoomMax) newscale = this.config.zoomMax;

        if (x != null && y != null) {
            var offset = mat3.rotateVector([x * (newscale - scale)/scale, y *(newscale - scale)/scale], this.getCameraMatrix());
            positionX = this.camera.positionX - offset[0] ;
            positionY = this.camera.positionY - offset[1];
        }

        if(animation){
            this.zoomTo({
                positionX:positionX,
                positionY:positionY,
                scale:newscale
            },animation);
        }else {
            this.camera.positionX = positionX;
            this.camera.positionY = positionY;
            this.camera.scale = newscale;
        }
    }

    /**
     * zoom camera info
     * @param option
     * @param duration
     */
    zoomTo(option,duration){
        Tween.removeByType('camera');

        var _this = this;
        if(duration){
            new Tween(this.camera,'camera').to(option).duration(duration).on('change',function () {
                _this.forceRender();
            });
        }else {
            for (var attr in option) this.camera[attr] = option[attr];
            this.forceRender();
        }

    }

    saveData(){
        // debugger
        var gl = this.gl;

        this.sampleRatio = 16;
        var width = this.container.clientWidth*this.sampleRatio;
        var height =  this.container.clientHeight*this.sampleRatio;

        this.gl.viewport(0, 0,width,height);


        if(!this.saveDataFrame){
            this.saveDataFrame = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, this.saveDataFrame);
            this.saveDataTex = gl.createTexture();
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this.saveDataTex);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA,width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.saveDataTex, 0);
            gl.bindTexture(gl.TEXTURE_2D, null);

        }

        gl.bindFramebuffer(gl.FRAMEBUFFER, this.saveDataFrame);
        this.render();
        var pixels = new Uint8Array(width * height * 4);
        gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
        // console.log(pixels);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        this.sampleRatio = 1;
        this.gl.viewport(0, 0,this.container.clientWidth, this.container.clientHeight);


        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext('2d');
        var imageData = ctx.createImageData(width, height);
        for(var i = 0,len = imageData.data.length;i < len;i++)imageData.data[i] = pixels[i];
        ctx.putImageData(imageData,0,0);

        canvas.toBlob(function(blob) {
            saveAs(blob, "test.png");
        });

    }

    /**
     * check filter
     * @private
     */
    _checkFilters(filters, data) {
        var filter = false;
        for (var i = 0; i < filters.length; i++) {
            if (filter = filters[i](data)) break;
        }
        return filter;
    }

}

export default WebGLRender;