
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


        // this.initTexture = false;
        // this.textureLoader = new TextureLoader();
        this.textureIcon = new TextureIcon(this.config);
        this.textureText = new TextureText();

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
                    {name:'edgeCurve',context:'edge',render:WebGLRender.edge.curve,check:layerCheck('curve')},

                    // {name:'edgeLabel',context:'edge',render:WebGLRender.edgeLabel.default,check:layerCheckDefault()},
                    // {name:'edgeCurveLabel',context:'edge',render:WebGLRender.edgeLabel.curve,check:layerCheck('curve')},

                    {name:'node',context:'node',render:WebGLRender.node.default,check:layerCheckDefault()},
                    {name:'rectNode',context:'node',render:WebGLRender.node.rect,check:layerCheck('rect')},

                    // {name:'nodeLabel',context:'node',render:WebGLRender.nodeLabel.default,check:function () {return true}},
                ]
            },
            // {
            //     name:'base1',
            //     subLayers:[
            //         // {name:'edge',context:'edge',render:WebGLRender.edge.default,check:layerCheckDefault()},
            //         // {name:'edgeCurve',context:'edge',render:WebGLRender.edge.curve,check:layerCheck('curve')},
            //         //
            //         // {name:'edgeLabel',context:'edge',render:WebGLRender.edgeLabel.default,check:layerCheckDefault()},
            //         // {name:'edgeCurveLabel',context:'edge',render:WebGLRender.edgeLabel.curve,check:layerCheck('curve')},
            //
            //         {name:'node',context:'node',render:WebGLRender.node.default,check:layerCheckDefault()},
            //         {name:'rectNode',context:'node',render:WebGLRender.node.rect,check:layerCheck('rect')},
            //
            //         {name:'nodeLabel',context:'node',render:WebGLRender.nodeLabel.default,check:function () {return true}},
            //     ]
            // }
        ];
        this.initRenderLayer();
        // debugger
        initEvent.call(this);

    }

    initRenderLayer(){
        var  renderLayerMap = this.renderLayerMap;
        var gl;
        var program,strip = 0;

        var _this = this;
        this.renderLayersConfig.forEach(function (layer) {

            layer.dom = _this.createLayerDom(layer.name);
            _this.container.appendChild(layer.dom);
            layer.gl = _this.initGl(layer.dom);
            gl = layer.gl;

            this.textureText.attachGl(gl);
            this.textureIcon.attachGl(gl);
            // this.textureLoader.attachGl(gl);

            layer.subLayers.forEach(function (subLayer) {

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

                subLayer.mainLayer = layer.name;
                subLayer.program = program;
                subLayer.uniforms = null;
                subLayer.index = [];

                _this.renderCache[subLayer.context].layers.push(subLayer.name);

                renderLayerMap[subLayer.name] = subLayer
            })
        }.bind(this));
    }
    
    createLayerDom(layer) {
        var ele = document.createElement('canvas');
        ele.style.position = 'absolute';
        ele.style.left = '0px';
        ele.style.top = '0px';
        ele.style.width = '100%';
        ele.style.height = '100%';
        ele.style.border = 'none';
        ele.classList.add(layer);
        ele.width = this.container.clientWidth;
        ele.height = this.container.clientHeight;

        ele.oncontextmenu = function (e) {
            e.preventDefault();
        };

        return ele;
    }
    updateCacheByData(context,data,layerIndex = true){

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
                // textureLoader: this.textureLoader,
                textureIcon: this.textureIcon
            });

            if(!(
                (temp && temp.length)
                ||
                (temp && temp.vertices && temp.indices && temp.vertices.length && temp.indices.length)
                ))
            {
                cacheIndex[layer] = null;
                return;
            }

            if(temp.vertices && temp.indices){
                cacheIndex[layer]  = {
                    vertices:new Float32Array(temp.vertices),
                    indices:new Uint16Array(temp.indices),
                }
            }else {
                cacheIndex[layer] = new Float32Array(temp);
            }


            layerIndex && renderLayerMap[layer].index.push(data.id);

        }.bind(this))
    }
    updateContextCache(context){
        if(context != 'node' &&  context != 'edge' && context != 'graph') return;

        if(this.renderCache[context].flag)  return;

        var datas,contextRelativeLayers;
        var  renderLayerMap = this.renderLayerMap;

        if(context === 'graph'){

        }else {
            // debugger
            datas = context == 'node' ? this.graph.nodes : this.graph.edges;
            for(var i = 0,len = datas.length;i < len ; i++){
                this.updateCacheByData(context,datas[i]);
            }
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


        // console.time('updateLayerUniformData');
        this.updateLayerUniformData();
        // console.timeEnd('updateLayerUniformData');

    }
    draw(){

        var mainLayer, subLayers, layer, gl,
            renderLayerMap, program, layerIndex, data, uniforms;
        renderLayerMap = this.renderLayerMap;

        // debugger
        for (var i = 0; i < this.renderLayersConfig.length; i++) {
            mainLayer = this.renderLayersConfig[i];
            subLayers = mainLayer.subLayers;

            // debugger
            gl = mainLayer.gl;
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.viewport(0, 0,mainLayer.dom.width, mainLayer.dom.height);

            for (var j = 0; j < subLayers.length; j++) {
                layer = subLayers[j].name;

                program = renderLayerMap[layer].program;
                gl.useProgram(program);

                gl.bindBuffer(gl.ARRAY_BUFFER, program.vertexBuffer);
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, program.indexBuffer);

                layerIndex = renderLayerMap[layer].index;

                vertexAttribPointer(gl, program.activeAttributes, program.offsetConfig);

                setUniforms(gl, program.activeUniforms, renderLayerMap[layer].uniforms);

                layerIndex.forEach(function (id) {

                    // debugger
                    data = this.renderCache[renderLayerMap[layer].context].index[id][layer];

                    if (!data) return;

                    if (data.indices && data.vertices) {
                        gl.bufferData(gl.ARRAY_BUFFER, data.vertices, gl.STATIC_DRAW);
                        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data.indices, gl.STATIC_DRAW);
                        gl.drawElements(gl.TRIANGLES, data.indices.length, gl.UNSIGNED_SHORT, 0);
                    } else {
                        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
                        gl.drawArrays(
                            gl.TRIANGLES, 0,
                            data.length / program.offsetConfig.strip
                        );
                    }
                }.bind(this));

                gl.bindBuffer(gl.ARRAY_BUFFER, null);
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

            }
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
                // textureLoader: this.textureLoader,
            });

            if (err = checkAttrValid(renderLayerMap[layer].program.activeUniforms, uniforms)) {
                throw err.join('\n');
            }

            renderLayerMap[layer].uniforms = uniforms;
        }
    }

    updateNodeRenderData(ids){
        this.forceRender();
        if(!Array.isArray(ids)) ids = [ids];
        var cacheIndex;
        ids.forEach(function (id) {
            this.updateCacheByData('node',this.graph.nodesIndex[id],false);
            cacheIndex = this.renderCache.node.index[id];
            for(var layer in cacheIndex){
                // this.renderLayerMap[layer].cache = false;
            }
        }.bind(this));

    }

    updateEdgeRenderData(ids){
        this.forceRender();
        if(!Array.isArray(ids)) ids = [ids];
        var cacheIndex;
        ids.forEach(function (id) {
            this.updateCacheByData('edge',this.graph.edgesIndex[id],false);
            cacheIndex = this.renderCache.edge.index[id];
            for(var layer in cacheIndex){
                // this.renderLayerMap[layer].cache = false;
            }
        }.bind(this));
    }

    //render
    render() {
        // debugger
        this.resizeCanvas();
        // setTimeout(this.render2.bind(this),500);
        console.time('render');

        this.updateLayerData();

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
    initGl(canvas) {
        var option = {
            preserveDrawingBuffer:true
        }
        
        var gl = canvas.getContext('experimental-webgl',option) || canvas.getContext('webgl',option);

        if (!gl) {
            throw '浏览器不支持webGl';
        }

        gl.getExtension('OES_standard_derivatives');

        // this.resizeCanvas();
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.enable(gl.BLEND);
        gl.disable(gl.DEPTH_TEST);
        // this.gl.clearColor(218/255, 224/255, 231/255, 1);
        gl.clearColor(0,0,0,0);
        
        return gl;
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
            this.renderLayersConfig.forEach(function (layer) {
                this.textureIcon.attachGl(layer.gl);
            }.bind(this));
            this.clearRenderCache();
        }.bind(this));


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
        this.renderLayersConfig.forEach(function (layer) {
            canvas = layer.dom;
            var width = canvas.clientWidth * multiplier | 0;
            var height = canvas.clientHeight * multiplier | 0;
            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width;
                canvas.height = height;
            }
        });
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

    //cache update
    clearRenderCache(layers){
        this.forceRender();
        var _this = this;
        if(layers){
            layers.forEach(function (layer) {
                // _this.renderLayerMap[layer].cache = false;
            });
        }else {
            for(var layer in _this.renderLayerMap){
                // _this.renderLayerMap[layer].cache = false;
                _this.renderLayerMap[layer].index = [];
            }
            _this.renderCache.graph.flag = false;
            _this.renderCache.node.flag = false;
            _this.renderCache.edge.flag = false;
        }
    }



}

export default WebGLRender;