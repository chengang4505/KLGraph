
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
    calTypeOffset,
    vertexAttribPointer,
    setUniforms,
    checkAttrValid,
    GlType,GLComType
} from '../../base/GLUtil'


function layerCheckDefault() {
    return function (data) {
        return !data.type || data.type == 'default';
    }
}

function layerCheck(type) {
    return function (data) {
        return data.type == type;
    }
}



class WebGLRender extends EventEmitter{
    constructor(context,config) {
        super();

        this.context = context;
        this.config = config;

        this.container = config.container;
        this.graph = context.graph;

        this.needUpdate = true;
        this.sampleRatio = 1.5;

        this.initRender();

        this.initTexture = false;
        this.textureLoader = new TextureLoader(this.gl);
        this.textureIcon = new TextureIcon(this.gl,this.config);
        this.textureText = new TextureText(this.gl);

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


        this.renderCache = {
            graph:{layers:[],index:{},flag:false},
            node:{layers:[],index:{},flag:false},
            edge:{layers:[],index:{},flag:false}
        };
        this.renderLayerMap = {};
        this.renderLayersConfig = [
            {
                name:'base',
                subLayers:[
                    {name:'edge',context:'edge',render:WebGLRender.edge.default,check:layerCheckDefault()},
                    {name:'node',context:'node',render:WebGLRender.node.default,check:layerCheckDefault()},
                    {name:'rectNode',context:'node',render:WebGLRender.node.rect,check:layerCheck('rect')},
                    {name:'edgeLabel',context:'edge',render:WebGLRender.edgeLabel.default,check:layerCheckDefault()},
                    {name:'nodeLabel',context:'node',render:WebGLRender.nodeLabel.default,check:function () {return true}},
                ]
            }
        ];
        this.initRenderLayerMap();

        initEvent.call(this);



    }

    initRenderLayerMap(){
        var  renderLayerMap = this.renderLayerMap;
        var gl = this.gl;
        var program;

        var _this = this;
        this.renderLayersConfig.forEach(function (layer) {
            layer.subLayers.forEach(function (subLayer) {

                program = util.loadProgram(gl, [
                    util.loadShader(gl, subLayer.render.shaderVert, gl.VERTEX_SHADER),
                    util.loadShader(gl, subLayer.render.shaderFrag, gl.FRAGMENT_SHADER)
                ]);

                program.activeAttributes = getActiveAttributes(gl,program);
                program.activeUniforms = getActiveUniforms(gl,program);
                program.offsetConfig = calTypeOffset(program.activeAttributes);
                program.buffer = gl.createBuffer();

                subLayer.program = program;

                subLayer.renderData = {
                    uniforms:null,
                    data:null,
                    bytes:0
                };

                _this.renderCache[subLayer.context].layers.push(subLayer.name);

                renderLayerMap[subLayer.name] = subLayer
            })
        }.bind(this));
    }
    putData(buffer,datas,offsetConfig){
        // debugger
        var arrView = new Float32Array(buffer);
        var offset = 0;
        var config = offsetConfig.config;
        datas.forEach(function (data) {
            for(var attr in config){
                if(util.isArray(data[attr])){
                    data[attr].forEach(function (e,i) {
                        arrView[offset+config[attr].start+i] = data[attr][i];
                    });
                }else {
                    arrView[offset+config[attr].start] = data[attr];
                }
            }
            offset += offsetConfig.strip;
        }.bind(this));
    }
    updateCacheByData(context,data){

        var cacheIndex,temp,err,totalLen;
        var contextRelativeLayers = this.renderCache[context].layers;
        var renderLayerMap = this.renderLayerMap;

        cacheIndex = this.renderCache[context].index[data.id] =  this.renderCache[context].index[data.id]  || {};

        contextRelativeLayers.forEach(function(layer) {
            if(!renderLayerMap[layer].check(data)) return;

            temp = renderLayerMap[layer].render.getRenderData({
                data: data,
                graph: this.graph,
                textureText: this.textureText,
                textureLoader: this.textureLoader,
                textureIcon: this.textureIcon
            });

            if (!util.isArray(temp)) temp = [temp];

            temp.forEach(function (data) {
                if (err = checkAttrValid(renderLayerMap[layer].program.activeAttributes, data)) {
                    throw err.join('\n');
                }
            }.bind(this));

            totalLen = temp.length * renderLayerMap[layer].program.offsetConfig.strip * 4;
            if (!cacheIndex[layer] || cacheIndex[layer].byteLength != totalLen) {
                cacheIndex[layer] = new ArrayBuffer(totalLen);
            }

            this.putData(cacheIndex[layer], temp, renderLayerMap[layer].program.offsetConfig);

        }.bind(this))
    }
    updateContextCache(context){
        if(context != 'node' &&  context != 'edge' && context != 'graph') return;

        if(this.renderCache[context].flag)  return;

        var datas;
        var  renderLayerMap = this.renderLayerMap;

        if(context === 'graph'){

        }else {
            datas = context == 'node' ? this.graph.nodes : this.graph.edges;
            for(var i = 0,len = datas.length;i < len ; i++){
                this.updateCacheByData(context,datas[i]);
            }
        }

        this.renderCache[context].flag = true;
    }
    updateLayerData(){
        console.time('updateContextCacheNode');
        this.updateContextCache('node');
        console.timeEnd('updateContextCacheNode');

        console.time('updateContextCacheEdge');
        this.updateContextCache('edge');
        console.timeEnd('updateContextCacheEdge');

        console.time('updateLayerRenderData');
        this.updateLayerRenderData();
        console.timeEnd('updateLayerRenderData');

        console.time('updateLayerUniformData');
        this.updateLayerUniformData();
        console.timeEnd('updateLayerUniformData');


        for(var layer in this.renderLayerMap){
            this.renderLayerMap[layer].cache = true;
        }
    }
    updateLayerRenderData(){
        var datas;
        var data,cacheIndex,renderLayerMap,int8ViewS,int8ViewT,start,uniforms,err;

        //clear bytes 0
        renderLayerMap = this.renderLayerMap;
        for(var layer in renderLayerMap){
            if(renderLayerMap[layer].cache) continue;
            renderLayerMap[layer].renderData.bytes = 0;
        }

        //calculate total byte per layer
        datas = this.graph.nodes;
        for(var i = 0;i< datas.length;i++){
            data = datas[i];
            cacheIndex = this.renderCache.node.index[data.id];
            for(var layer in cacheIndex){
                if(renderLayerMap[layer].cache) continue;
                
                renderLayerMap[layer].renderData.bytes += cacheIndex[layer].byteLength;
            }
        }

        datas = this.graph.edges;
        for(var i = 0;i< datas.length;i++){
            data = datas[i];
            cacheIndex = this.renderCache.edge.index[data.id];
            for(var layer in cacheIndex){
                if(renderLayerMap[layer].cache) continue;

                renderLayerMap[layer].renderData.bytes += cacheIndex[layer].byteLength;
            }
        }

        //gather render data per layer
        for(var layer in renderLayerMap){
            if(renderLayerMap[layer].cache) continue;

            if(!renderLayerMap[layer].renderData.data
                || renderLayerMap[layer].renderData.data.byteLength != renderLayerMap[layer].renderData.bytes
            )
                renderLayerMap[layer].renderData.data = new ArrayBuffer(renderLayerMap[layer].renderData.bytes);

            renderLayerMap[layer].renderData.bytes = 0;

        }

        datas = this.graph.nodes;
        for(var i = 0;i< datas.length;i++){
            data = datas[i];
            cacheIndex = this.renderCache.node.index[data.id];
            for(var layer in cacheIndex){

                if(renderLayerMap[layer].cache) continue;

                int8ViewS = new Int8Array(cacheIndex[layer]);
                int8ViewT = new Int8Array(renderLayerMap[layer].renderData.data);
                start = renderLayerMap[layer].renderData.bytes;
                for(var m = 0; m < int8ViewS.length;m++){
                    int8ViewT[start+m] = int8ViewS[m];
                    renderLayerMap[layer].renderData.bytes++;
                }
            }
        }

        datas = this.graph.edges;
        for(var i = 0;i< datas.length;i++){
            data = datas[i];
            cacheIndex = this.renderCache.edge.index[data.id];
            for(var layer in cacheIndex){

                if(renderLayerMap[layer].cache) continue;

                int8ViewS = new Int8Array(cacheIndex[layer]);
                int8ViewT = new Int8Array(renderLayerMap[layer].renderData.data);
                start = renderLayerMap[layer].renderData.bytes;
                for(var m = 0; m < int8ViewS.length;m++){
                    int8ViewT[start+m] = int8ViewS[m];
                    renderLayerMap[layer].renderData.bytes++;
                }
            }
        }

    }
    draw(){
        var gl = this.gl,
            renderLayerMap,program;
        renderLayerMap = this.renderLayerMap;

        gl.clear(gl.COLOR_BUFFER_BIT);

        // debugger
        for(var layer in renderLayerMap){
            program = renderLayerMap[layer].program;
            gl.useProgram(program);

            gl.bindBuffer(gl.ARRAY_BUFFER, program.buffer);
            gl.bufferData(gl.ARRAY_BUFFER,renderLayerMap[layer].renderData.data , gl.STATIC_DRAW);

            vertexAttribPointer(gl,program.activeAttributes,program.offsetConfig);

            setUniforms(gl,program.activeUniforms,renderLayerMap[layer].renderData.uniforms);

            gl.bindBuffer(gl.ARRAY_BUFFER, null);

            gl.drawArrays(
                gl.TRIANGLES, 0,
                renderLayerMap[layer].renderData.data.byteLength/(program.offsetConfig.strip*4)
            );
        }
    }
    updateLayerUniformData(){
        var uniforms,err;
        var renderLayerMap = this.renderLayerMap;

        for(var layer in renderLayerMap){
            uniforms = renderLayerMap[layer].render.getUniforms({
                matrix: mat3.multiMatrix([this.getCameraMatrix(true), this.projectMatrix]),
                camera: this.camera,
                sampleRatio: this.sampleRatio,
                textureLoader: this.textureLoader,
            });

            if (err = checkAttrValid(renderLayerMap[layer].program.activeUniforms, uniforms)) {
                throw err.join('\n');
            }

            renderLayerMap[layer].renderData.uniforms = uniforms;
        }
    }
    render2(){

        // if(this.renderflag) return;

        this.renderflag = true;
        console.time('render')

        this.updateLayerData();

        // this.updateLayerData('edge');
        // this.draw();
        console.timeEnd('render')

        // debugger
    }

    updateNodeRenderData(ids){
        this.forceRender();
        if(!Array.isArray(ids)) ids = [ids];
        var cacheIndex;
        ids.forEach(function (id) {
            this.updateCacheByData('node',this.graph.nodesIndex[id]);
            cacheIndex = this.renderCache.node.index[id];
            for(var layer in cacheIndex){
                this.renderLayerMap[layer].cache = false;
            }
        }.bind(this));

    }

    updateEdgeRenderData(ids){
        this.forceRender();
        if(!Array.isArray(ids)) ids = [ids];
        var cacheIndex;
        ids.forEach(function (id) {
            this.updateCacheByData('edge',this.graph.edgesIndex[id]);
            cacheIndex = this.renderCache.edge.index[id];
            for(var layer in cacheIndex){
                this.renderLayerMap[layer].cache = false;
            }
        }.bind(this));
    }

    //render
    render() {
        // debugger
        this.resizeCanvas();
        // setTimeout(this.render2.bind(this),500);
        this.render2();

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
    initRender() {
        var option = {
            preserveDrawingBuffer:true
        }
        this.gl = this.container.getContext('experimental-webgl',option) || this.container.getContext('webgl',option);

        if (!this.gl) {
            throw '浏览器不支持webGl';
        }

        this.gl.getExtension('OES_standard_derivatives');

        this.resizeCanvas();
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
        this.gl.enable(this.gl.BLEND);
        this.gl.disable(this.gl.DEPTH_TEST);
        // this.gl.clearColor(218/255, 224/255, 231/255, 1);
        this.gl.clearColor(0,0,0,0);
    }
    initEvent(){
        var _this = this;
        this.graph.on('change',function (type,ids) {
            if(type =='node'){
                 _this.updateNodeRenderData(ids);
            }else if(type == 'edge'){
                 _this.updateEdgeRenderData(ids);
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



        this.textureIcon.on('load',function () {
            this.clearRenderCache();
        }.bind(this));


        this.textureLoader.on('load',function (url) {
            var nodes = _this.graph.nodes;
            nodes.forEach(function (e) {
                if(e.img && e.img == url) _this.updateNodeRenderData(e.id);
            });
        });


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

    getCameraMatrix(isInvert){
        var mat = mat3.multiMatrix([
            mat3.matrixFromScale(this.camera.scale,this.camera.scale),
            mat3.matrixFromRotation(this.camera.rotation),
            mat3.matrixFromTranslate(this.camera.positionX,this.camera.positionY)
        ]);
        return isInvert  ? mat3.invert(mat) : mat;
    }
    resizeCanvas() {
        var canvas = this.gl.canvas;
        var multiplier = this.sampleRatio;
        var width = canvas.clientWidth * multiplier | 0;
        var height = canvas.clientHeight * multiplier | 0;
        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
        }

        this.projectMatrix = mat3.matrixFromScale(2/(canvas.clientWidth),2/(canvas.clientHeight));
        this.gl.viewport(0, 0,canvas.width, canvas.height);

    }

    graphToDomPos(pos){
        var canvas = this.gl.canvas;
        var camPos =  mat3.transformPoint([pos.x,pos.y],this.getCameraMatrix(true));
        return {x:camPos[0]+canvas.clientWidth/2,y:canvas.clientHeight/2-camPos[1]};
    }
    toCameraPos(pos){
        var canvas = this.gl.canvas;
        return {x:pos.x-canvas.clientWidth/2,y:canvas.clientHeight/2-pos.y};
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

    //cache update
    clearRenderCache(layers){
        this.forceRender();
        var _this = this;
        if(layers){
            layers.forEach(function (layer) {
                _this.renderLayerMap[layer].cache = false;
            });
        }else {
            for(var layer in _this.renderLayerMap){
                _this.renderLayerMap[layer].cache = false;
            }
            _this.renderCache.graph.flag = false;
            _this.renderCache.node.flag = false;
            _this.renderCache.edge.flag = false;
        }
    }



}

export default WebGLRender;