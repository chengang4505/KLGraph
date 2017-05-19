
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
    getActiveUniforms,
    getActiveAttributes,
    vertexAttribPointer,
    setUniforms,
    checkAttrValid,
} from '../../base/GLUtil'


class WebGLRender extends EventEmitter{
    constructor(context,config) {
        super();

        this.context = context;
        this.config = config;

        this.container = config.container;
        this.graph = context.graph;

        this.needUpdate = true;
        this.sampleRatio = 1;


        // this.initTexture = false;
        // this.textureLoader = new TextureLoader();
        this.textureIcon = new TextureIcon(this.config);
        this.textureText = new TextureText();

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

        /**
         * layers:　相关的layer
         * index: cache索引 map
         * flag:
         */
        this.renderCache = {
            graph:{layers:[],index:{},flag:false},
            node:{layers:[],index:{},flag:false},
            edge:{layers:[],index:{},flag:false}
        };
        this.renderLayerMap = {};
        this.renderLayersConfig = config.renderLayersConfig || WebGLRender.defaultLayersConfig;
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

        // canvas.style.background = 'black';

        if (!gl) {
            throw '浏览器不支持webGl';
        }

        gl.getExtension('OES_standard_derivatives');

        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        // gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA,gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
        // gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.BLEND);
        gl.disable(gl.DEPTH_TEST);
        gl.clearColor(1,1,1,1);

        
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

            _this.textureText.addTexts(getAddText(objs));
            _this.clearRenderCache();
        });
        this.graph.on('remove',function (type,ids) {
            _this.clearRenderCache();
        });



        // this.textureIcon.on('load',function () {
        //     this.forceRender();
        //     this.textureIcon.attachGl(this.gl);
        //     this.renderCache.node.flag = false;
        // }.bind(this));


        // this.textureLoader.on('load',function (url) {
        //     var nodes = _this.graph.nodes;
        //     nodes.forEach(function (e) {
        //         if(e.img && e.img == url) _this.updateNodeRenderData(e.id);
        //     });
        // });


        function getAddText(objs) {
            var text = '';
            objs.forEach(function (e) {
                e.label && (text += e.label);
            });

            return text;
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
    }
    initRenderLayers(root, type) {
        var renderType = type;
        var typeRoot = WebGLRender[root];

        var renderRoot;

        renderRoot= this.renderType[root].type;



        if(!typeRoot[type]){
            console.error(`${root}: no type[${type}],use default`);
            type = 'default';
        }

        var temp,layersConfig;
        if(!renderRoot[renderType]){

            layersConfig = typeRoot[type];
            if(util.isFunction(layersConfig)){
                layersConfig = {
                    layers:[
                        {name:'base',layer:layersConfig}
                    ]
                }
            }
            renderRoot[renderType] = {layers:{},order:[]};
            layersConfig.layers.forEach(function (config) {
                temp = {};
                temp.counter = 0;
                temp.data = [];
                temp.render = new config.layer();
                temp.program = util.loadProgram(this.gl, [
                    util.loadShader(this.gl, temp.render.shaderVert, this.gl.VERTEX_SHADER),
                    util.loadShader(this.gl, temp.render.shaderFrag, this.gl.FRAGMENT_SHADER)
                ]);
                renderRoot[renderType].layers[config.name] = temp;
                renderRoot[renderType].order.push(config.name);
            }.bind(this));

        }
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

    }
    initRenderLayer(){
        var  renderLayerMap = this.renderLayerMap;
        var gl = this.gl;
        var program,strip = 0;

        var _this = this;

        this.textureText.attachGl(gl);
        this.textureIcon.attachGl(gl);

        this.renderLayersConfig.forEach(function (layer) {

            layer.subLayers.forEach(function (subLayer) {

                subLayer.enable = true;

                if(subLayer.custom) return;

                program = util.loadProgram(gl, [
                    util.loadShader(gl, subLayer.render.shaderVert, gl.VERTEX_SHADER),
                    util.loadShader(gl, subLayer.render.shaderFrag, gl.FRAGMENT_SHADER)
                ]);

                program.activeAttributes = getActiveAttributes(gl,program);
                program.activeUniforms = getActiveUniforms(gl,program);

                strip = 0;
                for(var attr in subLayer.render.attributes){
                    strip += subLayer.render.attributes[attr].components;
                }
                program.offsetConfig = {config:subLayer.render.attributes,strip:strip};
                program.vertexBuffer = gl.createBuffer();
                program.indexBuffer = gl.createBuffer();
                program.indexN = 0;

                subLayer.mainLayer = layer.name;
                subLayer.program = program;
                subLayer.uniforms = null;
                subLayer.initBuffer = false;
                subLayer.tempVertex = [];
                subLayer.tempIndex = [];
                subLayer.index = [];

                _this.renderCache[subLayer.context].layers.push(subLayer.name);

                renderLayerMap[subLayer.name] = subLayer;

            })
        }.bind(this));
    }
    //render
    render() {
        // debugger
        this.resizeCanvas();
        // setTimeout(this.render2.bind(this),500);
        console.time('render');

        this.updateLayerData();

        // console.time('updateLayerUniformData');
        this.updateLayerUniformData();
        // console.timeEnd('updateLayerUniformData');

        // console.time('draw');
        this.draw();
        // console.timeEnd('draw');
        console.timeEnd('render');

        this.needUpdate = false;

        // debugger
        // return;
        //
        // if(!this.initTexture){
        //     var imgs = {};
        //     var nodes = this.graph.nodes;
        //     nodes.forEach(function (node) {
        //         node.img && (imgs[node.img] = true);
        //     });
        //
        //     this.textureLoader.loadImgs(Object.keys(imgs));
        //     this.initTexture = true;
        // }

    }
    draw(){

        var num = 0;
        var mainLayer, subLayers, layer, gl,
            renderLayerMap, program, layerIndex, data, uniforms;
        renderLayerMap = this.renderLayerMap;

        gl = this.gl;
        gl.clear(gl.COLOR_BUFFER_BIT);
        // gl.enable(gl.DEPTH_TEST);
        // gl.depthFunc(gl.LEQUAL);
        // gl.depthMask(true);

        for (var i = 0; i < this.renderLayersConfig.length; i++) {
            mainLayer = this.renderLayersConfig[i];
            subLayers = mainLayer.subLayers;

            for (var j = 0; j < subLayers.length; j++) {

                if(!subLayers[j].enable) continue;

                //custom render
                if(subLayers[j].custom && subLayers[j].render){
                    subLayers[j].render.call(subLayers[j],this);
                    continue;
                }

                layer = subLayers[j].name;

                program = renderLayerMap[layer].program;

                if(program.indexN == 0) continue;

                gl.useProgram(program);

                gl.bindBuffer(gl.ARRAY_BUFFER, program.vertexBuffer);
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, program.indexBuffer);

                layerIndex = renderLayerMap[layer].index;

                vertexAttribPointer(gl, program.activeAttributes, program.offsetConfig);
                setUniforms(gl, program.activeUniforms, renderLayerMap[layer].uniforms);

                gl.drawElements(gl.TRIANGLES, program.indexN, gl.UNSIGNED_SHORT, 0);

                gl.bindBuffer(gl.ARRAY_BUFFER, null);
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

            }
        }
        // console.log('render count:',num);
    }

    updateCacheByData(context,data,dirtyAttr,forceUpdate){

        var cacheIndex,temp,points;
        var contextRelativeLayers = this.renderCache[context].layers;
        var renderLayerMap = this.renderLayerMap;
        var gl = this.gl;

        cacheIndex = this.renderCache[context].index[data.id] =  this.renderCache[context].index[data.id]  || {};

        // debugger
        contextRelativeLayers.forEach(function(layer) {

            if(!renderLayerMap[layer].enable || !renderLayerMap[layer].check(data)) return;

            if (!forceUpdate && renderLayerMap[layer].cache) return;

            temp = renderLayerMap[layer].render.getRenderData({
                dirtyAttr:dirtyAttr,
                oldData:cacheIndex[layer],
                data: data,
                graph: this.graph,
                textureText: this.textureText,
                // textureLoader: this.textureLoader,
                textureIcon: this.textureIcon
            });

            if(renderLayerMap[layer].initBuffer){
                gl.bindBuffer(gl.ARRAY_BUFFER, renderLayerMap[layer].program.vertexBuffer);
                gl.bufferSubData(gl.ARRAY_BUFFER, cacheIndex[layer].vertexStart,new Float32Array(temp.vertices));

                renderLayerMap[layer].cacheOldData && (cacheIndex[layer].data.vertices = temp.vertices);//cache old data
            }else {
                points = renderLayerMap[layer].tempVertex.length / renderLayerMap[layer].program.offsetConfig.strip;

                cacheIndex[layer] = cacheIndex[layer] || {vertexStart:0,data:null};

                renderLayerMap[layer].cacheOldData && (cacheIndex[layer].data = temp);//cache old data

                cacheIndex[layer].vertexStart = renderLayerMap[layer].tempVertex.length*4;
                temp.vertices.forEach(function (e) {renderLayerMap[layer].tempVertex.push(e)});
                temp.indices.forEach(function (e,i) {
                    temp.indices[i] = e+points;
                    renderLayerMap[layer].tempIndex.push(temp.indices[i])
                });
            }

        }.bind(this))
    }
    updateContextCache(context){
        if(context != 'node' &&  context != 'edge' && context != 'graph') return;

        if(this.renderCache[context].flag)  return;

        var datas,contextRelativeLayers;
        var gl = this.gl;
        var  renderLayerMap = this.renderLayerMap;

        if(context === 'graph'){

        }else {
            datas = context == 'node' ? this.graph.nodes : this.graph.edges;
            for(var i = 0,len = datas.length;i < len ; i++){
                this.updateCacheByData(context,datas[i]);
            }

            contextRelativeLayers = this.renderCache[context].layers;

            contextRelativeLayers.forEach(function (layer) {

                renderLayerMap[layer].cache = true;

                if(renderLayerMap[layer].initBuffer) return;

                gl.bindBuffer(gl.ARRAY_BUFFER, renderLayerMap[layer].program.vertexBuffer);
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, renderLayerMap[layer].program.indexBuffer);

                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(renderLayerMap[layer].tempVertex), gl.DYNAMIC_DRAW);
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(renderLayerMap[layer].tempIndex), gl.STATIC_DRAW);

                renderLayerMap[layer].program.indexN = renderLayerMap[layer].tempIndex.length;
                renderLayerMap[layer].initBuffer = true;

                renderLayerMap[layer].tempVertex = [];
                renderLayerMap[layer].tempIndex = [];
            })
        }

        this.renderCache[context].flag = true;
    }
    updateLayerData(){
        // console.time('updateContextCacheNode');
        this.updateContextCache('node');
        // console.timeEnd('updateContextCacheNode');

        // console.time('updateContextCacheEdge');
        this.updateContextCache('edge');
        // console.timeEnd('updateContextCacheEdge');


    }
    updateLayerUniformData(){
        var uniforms,err;
        var renderLayerMap = this.renderLayerMap;

        for(var layer in renderLayerMap){
            uniforms = renderLayerMap[layer].render.getUniforms({
                matrix: mat3.multiMatrix([this.getCameraMatrix(true), this.projectMatrix]),
                camera: this.camera,
                sampleRatio: this.sampleRatio,
                // textureLoader: this.textureLoader,
            });

            if (err = checkAttrValid(renderLayerMap[layer].program.activeUniforms, uniforms)) {
                throw err.join('\n');
            }

            renderLayerMap[layer].uniforms = uniforms;
        }
    }
    updateNodeRenderData(id,dirtyAttr){
        // debugger
        this.forceRender();
        // if(!Array.isArray(ids)) ids = [ids];
        // ids.forEach(function (id) {
        this.updateCacheByData('node',this.graph.nodesIndex[id],dirtyAttr,true);
        // }.bind(this));

    }
    updateEdgeRenderData(ids,dirtyAttr){
        this.forceRender();
        if(!Array.isArray(ids)) ids = [ids];
        ids.forEach(function (id) {
            this.updateCacheByData('edge',this.graph.edgesIndex[id],dirtyAttr,true);
        }.bind(this));
    }
    //cache update
    clearRenderCache(layers){
        this.forceRender();
        var _this = this;
        if(layers){
            if(!util.isArray(layers)) layers = [layers];
            layers.forEach(function (layer) {
                _this.renderLayerMap[layer].initBuffer = false;
                _this.renderLayerMap[layer].cache = false;
                _this.renderCache[_this.renderLayerMap[layer].context].flag = false
            });
        }else {
            for(var layer in _this.renderLayerMap){
                _this.renderLayerMap[layer].initBuffer = false;
                _this.renderLayerMap[layer].cache = false;
            }
            _this.renderCache.graph.flag = false;
            _this.renderCache.node.flag = false;
            _this.renderCache.edge.flag = false;
        }
    }
    disableRenderLayer(layers){

        var renderLayerMap = this.renderLayerMap;

        if(!util.isArray(layers)) layers = [layers];

        layers.forEach(function (layer) {
            if(renderLayerMap[layer]){
                renderLayerMap[layer].enable = false;
            }
        });
    }
    enableRenderLayer(layers){

        var renderLayerMap = this.renderLayerMap;
        var renderCache = this.renderCache;

        if(!util.isArray(layers)) layers = [layers];

        layers.forEach(function (layer) {
            if(renderLayerMap[layer])
            {
                renderCache[renderLayerMap[layer].context].flag = 0;
                renderLayerMap[layer].enable = true;
                renderLayerMap[layer].cache = false;
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

    graphToDomPos(pos){
        var container = this.container;
        var camPos =  mat3.transformPoint([pos.x,pos.y],this.getCameraMatrix(true));
        return {x:camPos[0]+container.clientWidth/2,y:container.clientHeight/2-camPos[1]};
    }
    toCameraPos(pos){
        var container = this.container;
        return {x:pos.x-container.clientWidth/2,y:container.clientHeight/2-pos.y};
    }
    toGraphPos(pos,isVector){
        var p = isVector ?
            mat3.rotateVector([pos.x,pos.y],this.getCameraMatrix())
            :
            mat3.transformPoint([pos.x,pos.y],this.getCameraMatrix());
        return {x:p[0],y:p[1]};
    }

    forceRender(){
        this.needUpdate = true;
    }
    zoomTo(ratio,x,y,animation){

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

}

export default WebGLRender;