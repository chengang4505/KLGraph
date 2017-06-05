
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

        this.context = context;
        this.config = this.context.config;

        this.container = container;
        this.graph = context.graph;

        this.needUpdate = true;
        this.sampleRatio = 1;


        // this.initTexture = false;
        // this.textureLoader = new TextureLoader();
        this.textureIcon = new TextureIcon(this.config,0);
        this.textureText = new TextureText(this.config,1);

        this.mouseType = mouseType;
        this.initGl();
        this.initEvent();

        this.initIconTexture();
        this.initTextTexture();

        this.projectMatrix = null;

        this.camera = {
            scale:1,
            positionX:0,
            positionY:0,
            rotation:0
        };

        this.saveDataFrame = null;
        this.saveDataTex = null;

        /**
         * layers:　相关的layer
         * index: cache索引 map
         * flag:
         */
        this.renderCache = {
            graph:{layers:[],index:{},flag:false,filters:[]},
            node:{layers:[],index:{},flag:false,filters:[]},
            edge:{layers:[],index:{},flag:false,filters:[]}
        };
        // this.clearAllFlag = true;
        this.renderLayerMap = {};
        this.renderLayersConfig = this.config.renderLayersConfig || WebGLRender.defaultLayersConfig;
        this.initRenderLayer();

        this.updateLayerData();

        // debugger
        initEvent.call(this);

    }

    initGl() {
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

        gl.getExtension('OES_standard_derivatives');
        gl.getExtension('OES_element_index_uint');

        this.gl = gl;
    }
    initEvent(){
        var _this = this;
        this.graph.on('change',function (type,ids,dirtyAttr) {
            if(type =='node'){
                 _this.updateNodeRenderData(ids,dirtyAttr);
            }else if(type == 'edge'){
                 _this.updateEdgeRenderData(ids,dirtyAttr);
            }

        });
        this.graph.on('reset',function () {
            _this.clearRenderCache();
            _this.initIconTexture();
            _this.initTextTexture();
        });
        this.graph.on('add',function (type,ids) {
            if(!util.isArray(ids)) ids = [ids];

            var objs = null;

            if(type == 'node') objs = ids.map(function (e) {return _this.graph.nodesIndex[e]});
            else objs = ids.map(function (e) {return _this.graph.edgesIndex[e]});

            var addtexts = getAddText(objs);
            if(addtexts.length > 0){
                _this.textureText.addTexts(addtexts);
                _this.textureText.attachGl(_this.gl);
            }
            _this.clearRenderCache();

        });
        this.graph.on('remove',function (type,ids) {
            _this.forceRender();
            var contextRelativeLayers = _this.renderCache[type].layers;
            var  renderLayerMap = _this.renderLayerMap;

            contextRelativeLayers.forEach(function (layer) {
                renderLayerMap[layer].indexCache = false;
            });
        });


        function getAddText(objs) {
            var infos = _this.textureText.textinfo.infos;
            var char,len;
            var texts = [];
            objs.forEach(function (e) {
                if(!e.label) return;
                len = e.label.length;
                for(var i = 0;i< len;i++){
                    char = e.label.charAt(i);
                    if(!infos[char]){
                        texts.push(char);
                    }
                }
            });

            return texts;
        }

    }
    initTextTexture(){

        this.textureText.clear();

        var nodes = this.graph.nodes;
        var edges = this.graph.edges;

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


        this.textureText.createCanvasImg(texts);

        this.textureText.attachGl(this.gl);
    }
    initIconTexture(){

        this.textureIcon.clear();

        var nodes = this.graph.nodes;

        var map = {};
        var icons = [];
        nodes.forEach(function (e) {
            if(e.icon){
                if(!map[e.icon]){
                    map[e.icon] = true;
                    icons.push(e.icon);
                }
            }
        });

        this.textureIcon.createIcons(icons);

        this.textureIcon.attachGl(this.gl);

    }
    initRenderLayer(){
        var  renderLayerMap = this.renderLayerMap;
        var gl = this.gl;
        var program,strip = 0;

        var _this = this;


        this.renderLayersConfig.forEach(function (layer) {

            layer.subLayers.forEach(function (subLayer) {

                if(subLayer.enable == undefined) subLayer.enable = true;
                if(subLayer.show == undefined) subLayer.show = true;
                if(subLayer.option == undefined) subLayer.option = {};
                if(subLayer.filters == undefined) subLayer.filters = [];

                renderLayerMap[subLayer.name] = subLayer;

                if(subLayer.custom) return;

                program = loadProgram(gl, [
                    loadShader(gl, subLayer.render.shaderVert, gl.VERTEX_SHADER),
                    loadShader(gl, subLayer.render.shaderFrag, gl.FRAGMENT_SHADER)
                ]);

                program.activeAttributes = getActiveAttributes(gl,program);
                program.activeUniforms = getActiveUniforms(gl,program);

                strip = subLayer.render.strip;

                if(!subLayer.render.strip) strip = calculateStrip(subLayer.render.attributes);

                program.offsetConfig = {config:subLayer.render.attributes,strip:strip};
                program.uniforms = null;
                program.vertexBuffer = gl.createBuffer();
                program.indexBuffer = gl.createBuffer();
                program.indexN = 0;

                subLayer.mainLayer = layer.name;
                subLayer.program = program;
                subLayer.initBuffer = false;
                subLayer.tempVertex = [];
                subLayer.tempIndex = [];
                subLayer.index = [];
                subLayer.indexCache = false;

                if(subLayer.check == undefined) subLayer.check = function () {return true};

                _this.renderCache[subLayer.context].layers.push(subLayer.name);

            })
        }.bind(this));
    }
    //render
    render() {
        // debugger
        this.resizeCanvas();
        // setTimeout(this.render2.bind(this),500);
        // console.time('render');

        this.updateLayerData();

        // console.time('updateLayerUniformData');
        this.updateLayerUniformData();
        // console.timeEnd('updateLayerUniformData');

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
    setDefaultRenderFlag(){
        var gl = this.gl;
        // gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        // gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA,gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
        gl.enable(gl.BLEND);
        gl.disable(gl.DEPTH_TEST);
        gl.clearColor(1,1,1,1);
    }
    draw(){

        var num = 0;
        var mainLayer, subLayers, layer, gl,err,
            renderLayerMap, program;
        renderLayerMap = this.renderLayerMap;

        gl = this.gl;
        gl.clear(gl.COLOR_BUFFER_BIT);
       this.setDefaultRenderFlag();

       this.emit('renderBefore',[this]);

        for (var i = 0; i < this.renderLayersConfig.length; i++) {
            mainLayer = this.renderLayersConfig[i];
            subLayers = mainLayer.subLayers;

            for (var j = 0; j < subLayers.length; j++) {

                if(!subLayers[j].enable || !subLayers[j].show) continue;

                //custom render
                if(subLayers[j].custom && subLayers[j].render){
                    subLayers[j].render.call(subLayers[j],this,subLayers[j].option);
                    continue;
                }

                if(subLayers[j].render.renderBefore && util.isFunction(subLayers[j].render.renderBefore)){
                    subLayers[j].renderBefore.render.call(subLayers[j],this,subLayers[j].option);
                }

                layer = subLayers[j].name;

                program = renderLayerMap[layer].program;

                if(program.indexN == 0) continue;

                gl.useProgram(program);

                gl.bindBuffer(gl.ARRAY_BUFFER, program.vertexBuffer);
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, program.indexBuffer);

                if(err = vertexAttribPointer(gl, program.activeAttributes, program.offsetConfig)){
                    throw new Error(`render layer[ ${layer} ] err:\n ${err}`);
                }

                if(err = setUniforms(gl, program.activeUniforms, program.uniforms)){
                    throw new Error(`render layer[ ${layer} ] err:\n ${err}`);
                }

                gl.drawElements(gl.TRIANGLES, program.indexN, gl.UNSIGNED_INT, 0);


                if(subLayers[j].render.renderAfter && util.isFunction(subLayers[j].render.renderAfter)){
                    subLayers[j].render.renderAfter.call(subLayers[j],this,subLayers[j].option);
                }

                gl.bindBuffer(gl.ARRAY_BUFFER, null);
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);


            }
        }

        this.emit('renderAfter',[this]);

        // console.log('render count:',num);
    }

    updateCacheByData(context,data,dirtyAttr,needUpdateLayers){

        var cacheIndex,temp,points;
        var contextRelativeLayers = this.renderCache[context].layers;
        var renderLayerMap = this.renderLayerMap;
        var gl = this.gl;

        cacheIndex = this.renderCache[context].index[data.id] =  this.renderCache[context].index[data.id]  || {};

        needUpdateLayers = needUpdateLayers || contextRelativeLayers;

        // debugger
        needUpdateLayers.forEach(function(layer) {

            if(!renderLayerMap[layer].check(data) || !renderLayerMap[layer].enable) return;

            //dirtyAttr setData update
            if(dirtyAttr && !renderLayerMap[layer].cache) return;

            temp = renderLayerMap[layer].render.getRenderData({
                dirtyAttr:dirtyAttr,
                oldData:cacheIndex[layer] ? cacheIndex[layer].data : null,
                data: data,
                config:this.config,
                graph: this.graph,
                textureText: this.textureText,
                option: renderLayerMap[layer].option,
                // textureLoader: this.textureLoader,
                textureIcon: this.textureIcon
            });

            if(!temp) return;

            if(renderLayerMap[layer].cache){
                gl.bindBuffer(gl.ARRAY_BUFFER, renderLayerMap[layer].program.vertexBuffer);
                gl.bufferSubData(gl.ARRAY_BUFFER, cacheIndex[layer].vertexStart,new Float32Array(temp.vertices));

                cacheIndex[layer].data.vertices = temp.vertices;//cache old data
            }else {
                points = renderLayerMap[layer].tempVertex.length / renderLayerMap[layer].program.offsetConfig.strip;

                cacheIndex[layer] = cacheIndex[layer] || {vertexStart:-1,data:null};

                cacheIndex[layer].data = temp;//cache old data

                cacheIndex[layer].vertexStart = renderLayerMap[layer].tempVertex.length*4;
                temp.vertices.forEach(function (e) {renderLayerMap[layer].tempVertex.push(e)});
                temp.indices.forEach(function (e,i) {
                    temp.indices[i] = e+points;
                    // renderLayerMap[layer].tempIndex.push(temp.indices[i])
                });
            }

        }.bind(this))
    }
    updateContextCache(context){
        if(context != 'node' &&  context != 'edge' && context != 'graph') return;

        var datas,contextRelativeLayers,needUpdateLayers;
        var gl = this.gl;
        var  renderLayerMap = this.renderLayerMap;

        if(context === 'graph'){

        }else {

            needUpdateLayers = [];
            contextRelativeLayers = this.renderCache[context].layers;
            contextRelativeLayers.forEach(function (layer) {
                if(!renderLayerMap[layer].cache && renderLayerMap[layer].enable)
                    needUpdateLayers.push(layer)
            });

            if(needUpdateLayers.length < 1) return;

            datas = context == 'node' ? this.graph.nodes : this.graph.edges;
            for(var i = 0,len = datas.length;i < len ; i++){
                this.updateCacheByData(context,datas[i],null,needUpdateLayers);
            }

            needUpdateLayers.forEach(function (layer) {
                
                gl.bindBuffer(gl.ARRAY_BUFFER, renderLayerMap[layer].program.vertexBuffer);
                // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, renderLayerMap[layer].program.indexBuffer);

                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(renderLayerMap[layer].tempVertex), gl.DYNAMIC_DRAW);
                // gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(renderLayerMap[layer].tempIndex), gl.STATIC_DRAW);

                renderLayerMap[layer].cache = true;

                renderLayerMap[layer].tempVertex = [];
                renderLayerMap[layer].tempIndex = [];
            })
        }

    }
    updateLayerData(){
        // console.time('updateContextCacheNode');
        this.updateContextCache('node');
        // console.timeEnd('updateContextCacheNode');

        // console.time('updateContextCacheEdge');
        this.updateContextCache('edge');
        // console.timeEnd('updateContextCacheEdge');

        this.clearAllFlag = false;


    }
    updateLayerIndex(context){
        if(context != 'node' &&  context != 'edge' && context != 'graph') return;

        var datas,contextRelativeLayers,cacheIndex,data,needUpdateLayer,check;
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

                    cacheIndex = this.renderCache[context].index[data.id];
                    for(var layer in cacheIndex){
                        if(renderLayerMap[layer].indexCache) continue;

                        //layer filters
                        if(renderLayerMap[layer].filters && renderLayerMap[layer].filters.length){
                            if(check = this._checkFilters(renderLayerMap[layer].filters,data)) continue;
                        }

                        cacheIndex[layer].data.indices.forEach(function (id) {
                            renderLayerMap[layer].index.push(id);
                        });
                    }
                }

                needUpdateLayer.forEach(function (layer) {
                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, renderLayerMap[layer].program.indexBuffer);
                    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(renderLayerMap[layer].index), gl.STATIC_DRAW);
                    renderLayerMap[layer].program.indexN = renderLayerMap[layer].index.length;
                    renderLayerMap[layer].index = [];
                    renderLayerMap[layer].indexCache = true;
                })
            }


        }

    }
    updateLayerUniformData(){
        var uniforms,err;
        var renderLayerMap = this.renderLayerMap;

        for(var layer in renderLayerMap){
            if(renderLayerMap[layer].custom) continue;
            uniforms = renderLayerMap[layer].render.getUniforms({
                matrix: mat3.multiMatrix([this.getCameraMatrix(true), this.projectMatrix]),
                camera: this.camera,
                config: this.config,
                option: renderLayerMap[layer].option,
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
    updateNodeRenderData(id,dirtyAttr){
        // debugger
        this.forceRender();
        // if(this.clearAllFlag) return;
        this.updateCacheByData('node',this.graph.nodesIndex[id],dirtyAttr);
    }
    updateEdgeRenderData(ids,dirtyAttr){
        this.forceRender();
        // if(this.clearAllFlag) return;
        if(!Array.isArray(ids)) ids = [ids];
        ids.forEach(function (id) {
            this.updateCacheByData('edge',this.graph.edgesIndex[id],dirtyAttr);
        }.bind(this));
    }
    //cache update
    clearRenderCache(layers){
        this.forceRender();
        var _this = this;
        if(layers){
            if(!util.isArray(layers)) layers = [layers];
            layers.forEach(function (layer) {
                if(_this.renderLayerMap[layer].custom) return;

                _this.renderLayerMap[layer].cache = false;
                _this.renderLayerMap[layer].indexCache = false;
                _this.renderLayerMap[layer].program.indexN = 0;
            });
        }else {
            for(var layer in _this.renderLayerMap){
                if(_this.renderLayerMap[layer].custom) continue;

                _this.renderLayerMap[layer].cache = false;
                _this.renderLayerMap[layer].indexCache = false;
                _this.renderLayerMap[layer].program.indexN = 0;
            }
            _this.renderCache.graph.index = {};
            _this.renderCache.node.index = {};
            _this.renderCache.edge.index = {};
        }
    }
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
    enableRenderLayer(layers,updateCache = true){
        this.forceRender();

        var renderLayerMap = this.renderLayerMap;

        if(!util.isArray(layers)) layers = [layers];

        layers.forEach(function (layer) {
            if(renderLayerMap[layer])
            {
                renderLayerMap[layer].enable = true;
                if(updateCache){
                    renderLayerMap[layer].cache = false;
                    renderLayerMap[layer].indexCache = false;
                    renderLayerMap[layer].program.indexN = 0;
                }
            }
        });
    }

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
    updateByContextFilter(context){
        var contextRelativeLayers = this.renderCache[context].layers;
        var renderLayerMap = this.renderLayerMap;

        this.forceRender();

        contextRelativeLayers.forEach(function (layer) {
            renderLayerMap[layer].indexCache = false;
        });
    }


    setLayerFilters(layer,filters){
        var  renderLayerMap = this.renderLayerMap;
        if(!renderLayerMap[layer]) return;

        this.forceRender();
        filters = filters || [];

        if(!util.isArray(filters)) filters = [filters];

        renderLayerMap[layer].indexCache = false;
        renderLayerMap[layer].filters = filters;

    }
    getLayerFilters(layer){
        return  this.renderLayerMap[layer] ?  this.renderLayerMap[layer].filters : null;
    }
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
    getContextFilters(context){
        return  this.renderCache[context] ?  this.renderCache[context].filters : null;
    }

    setLayerOption(layer,option){
        var renderLayerMap = this.renderLayerMap;
        if(!renderLayerMap[layer]) return;

        this.forceRender();

        for(var attr in option){
            renderLayerMap[layer].option[attr] = option[attr];
        }
    }

    setMouseType(type){
        // if(mouseType[type]){
        this.container.style.cursor = type;
        // }
    }

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

    getCameraMatrix(isInvert){
        var mat = mat3.multiMatrix([
            mat3.matrixFromScale(this.camera.scale,this.camera.scale),
            mat3.matrixFromRotation(this.camera.rotation),
            mat3.matrixFromTranslate(this.camera.positionX,this.camera.positionY)
        ]);
        return isInvert  ? mat3.invert(mat) : mat;
    }
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

    forceRender(){
        this.needUpdate = true;
    }
    zoomFromPostion(ratio,x,y,animation){
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
            this.zoomToAnimation({
                positionX:positionX,
                positionY:positionY,
                scale:newscale
            });
        }else {
            this.camera.positionX = positionX;
            this.camera.positionY = positionY;
            this.camera.scale = newscale;
        }
    }

    zoomToAnimation(option,time){
        Tween.removeByType('camera');
        time = time || 100;

        var _this = this;
        new Tween(this.camera,'camera').to(option).duration(time).on('change',function () {
            _this.forceRender();
        });

    }

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

    _checkFilters(filters, data) {
        var filter = false;
        for (var i = 0; i < filters.length; i++) {
            if (filter = filters[i](data)) break;
        }
        return filter;
    }

}

export default WebGLRender;