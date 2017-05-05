/**
 * Created by chengang on 17-3-28.
 */

import util from '../../util'
import mat3 from '../../base/Matrix'
import EventEmitter from '../../base/EventEmitter'
import TextureLoader from './TextureLoader'
import TextureText from './TextureText'
import TextureIcon from './TextureIcon'
import initEvent from '../../core/Event'

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

        //cache
        this.renderType = {
            node: {index:{},type:{},cache:false},
            nodeLabel: {index:{},type:{},cache:false},
            edge: {index:{},type:{},cache:false},
            edgeLabel: {index:{},type:{},cache:false}
        };
        initEvent.call(this);

    }
    //render
    render() {
        // debugger

        this.resizeCanvas();

        var gl = this.gl;
        gl.clear(gl.COLOR_BUFFER_BIT);

        if(!this.initTexture){
            var imgs = {};
            var nodes = this.graph.nodes;
            nodes.forEach(function (node) {
                node.img && (imgs[node.img] = true);
            });

            this.textureLoader.loadImgs(Object.keys(imgs));
            this.initTexture = true;
        }

        // console.time('render')

        // console.time('renderEdge');
        this.config.renderEdge && this.renderEdge();
        // console.timeEnd('renderEdge');

        // console.time('renderEdgeLabel');
        this.config.renderEdge && this.config.renderEdgeLabel && this.renderEdgeLabel();
        // console.timeEnd('renderEdgeLabel');

        // console.time('renderNode');
        this.config.renderNode && this.renderNode();
        // console.timeEnd('renderNode');

        // console.time('renderNodeLabel');
        this.config.renderNode && this.config.renderNodeLabel && this.renderNodeLabel();
        // console.timeEnd('renderNodeLabel');


        // console.timeEnd('render')


        this.needUpdate = false;
    }
    renderNode(){
        // debugger

        this.createRenderCache('node',this.graph.nodes,function (data) {
            return {
                data:data,
                textureLoader:this.textureLoader,
                textureIcon:this.textureIcon
            }
        }.bind(this));

        this.renderCacheData('node',this.graph.nodes);
    }
    renderNodeLabel(){

        this.createRenderCache('nodeLabel',this.graph.nodes,function (data) {
            return {
                data:data,
                textureText:this.textureText
            }
        }.bind(this));

        this.renderCacheData('nodeLabel',this.graph.nodes);

    }
    renderEdge(){
        this.createRenderCache('edge',this.graph.edges,function (data) {
            return {
                data:data,
                source:this.graph.nodesIndex[data.source],
                target:this.graph.nodesIndex[data.target]
            }
        }.bind(this));

        this.renderCacheData('edge',this.graph.edges);
    }
    renderEdgeLabel(){

        this.createRenderCache('edgeLabel',this.graph.edges,function (data) {
            return {
                data:data,
                source:this.graph.nodesIndex[data.source],
                target:this.graph.nodesIndex[data.target],
                textureText:this.textureText
            }
        }.bind(this));

        this.renderCacheData('edgeLabel',this.graph.edges);

    }

    clearClusterCacheCounter(type) {
        var renderType = this.renderType[type].type;
        var layers;
        for (var e in renderType){
            layers  = renderType[e].layers;
            for(var name in layers){
                layers[name].counter = 0;
            }
        }
    }
    fixClusterCacheLength(type){
        var renderType = this.renderType[type].type;
        var layers;
        for (var e in renderType){
            layers  = renderType[e].layers;
            for(var name in layers){
                layers[name].data.length = layers[name].counter;
            }
        }
    }

    createRenderCache(rootType,data,argFn){
        var nodeData, cacheIndex;
        var start, offset, layers, type;

        var rootType1 = this.renderType[rootType].type;

        if (!this.renderType[rootType].cache) {
            this.clearClusterCacheCounter(rootType);

            data.forEach(function (e) {

                type = e.type || 'default';
                if (!rootType1[type]) this.initRenderLayers(rootType, type);

                //cache info
                cacheIndex = this.renderType[rootType].index[e.id] = this.renderType[rootType].index[e.id] || {};
                cacheIndex.type = type;
                cacheIndex.start = {};//layer start

                layers = rootType1[type].layers;
                for (var name in layers) {

                    start = layers[name].counter;
                    offset = 0;

                    nodeData = layers[name].render.getRenderData(argFn(e));

                    // no data
                    if (!nodeData || nodeData.length == 0) {
                        // cacheIndex.start[name] = null;
                        continue;
                    }

                    nodeData.forEach(function (data) {
                        layers[name].data[start + offset] = data;
                        offset++;
                    }.bind(this));

                    //cache info
                    cacheIndex.start[name] = start;

                    layers[name].counter += offset;
                }
            }.bind(this));

            this.fixClusterCacheLength(rootType);

            this.renderType[rootType].cache = true;
        }
    }
    renderCacheData(rootType,data){
        var renderType, type, layers, camMatrixInvert, orders, cacheIndex;

        camMatrixInvert = this.getCameraMatrix(true);

        renderType = this.renderType[rootType].type;

        for (type in renderType) {

            layers = renderType[type].layers;

            renderType[type].order.forEach(function (name) {

                if (layers[name].data.length > 0) {

                    this.gl.useProgram(layers[name].program);

                    layers[name].render.render({
                        gl: this.gl,
                        program: layers[name].program,
                        data: layers[name].data,
                        matrix: mat3.multiMatrix([camMatrixInvert, this.projectMatrix]),
                        camera: this.camera,
                        sampleRatio: this.sampleRatio,
                        textureLoader: this.textureLoader,
                    });

                }

            }.bind(this));
        }

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
        this.gl.clearColor(1.0, 1.0, 1.0, 1);
    }
    initEvent(){
        var _this = this;
        this.graph.on('change',function (type,ids) {
            if(type =='node'){
                // console.time('updateNode');
                _this.config.renderNode && _this.updateNodeRenderData(ids);
                // console.timeEnd('updateNode');
                // console.time('updateNodeLabel');
                _this.config.renderNode && _this.config.renderNodeLabel && _this.updateNodeLabelRenderData(ids);
                // console.timeEnd('updateNodeLabel');
            }else if(type == 'edge'){
                // console.time('updateEdge');
                _this.config.renderEdge && _this.updateEdgeRenderData(ids);
                // console.timeEnd('updateEdge');
                // console.time('updateEdgeLabel');
                _this.config.renderEdge && _this.config.renderEdgeLabel && _this.updateEdgeLabelRenderData(ids);
                // console.timeEnd('updateEdgeLabel');
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
            this.clearRenderCache('node');
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
    zoomTo(ratio,x,y){

        var scale = this.camera.scale;

        var newscale = ratio * scale;
        if(newscale < this.config.zoomMin) newscale = this.config.zoomMin;
        if(newscale > this.config.zoomMax) newscale = this.config.zoomMax;

        if (x != null && y != null) {
            var offset = mat3.rotateVector([x * (newscale - scale)/scale, y *(newscale - scale)/scale], this.getCameraMatrix());
            this.camera.positionX -= offset[0] ;
            this.camera.positionY -= offset[1];
        }

        this.camera.scale = newscale;
    }

    //cache update
    clearRenderCache(rootType){
        if(rootType　&& this.renderType[rootType]){
            this.forceRender();
            this.renderType[rootType].cache = false;
        }else if(!rootType){
            this.forceRender();
            this.renderType.node.cache = false;
            this.renderType.nodeLabel.cache = false;
            this.renderType.edge.cache = false;
            this.renderType.edgeLabel.cache = false;
        }
    }
    updateRenderData(rootType,id,argFn){
        if(!this.renderType[rootType].cache) return;

        var cache = this.renderType[rootType].index[id];//
        var type = cache.type;
        var start = cache.start;

        var renderType = this.renderType[rootType].type[type];

        for(var layer in renderType.layers){
            var renderData = renderType.layers[layer].render.getRenderData(argFn());


            if (
                (!renderData || renderData.length == 0)
                ||
                (renderData && renderData.length > 0 && start[layer] === null)
            ) continue;

            renderData.forEach(function (e,i) {
                renderType.layers[layer].data[start[layer]+i] = e;
            });
        }
    }
    updateNodeRenderData(ids){
        // debugger
        this.forceRender();
        if(!Array.isArray(ids)) ids = [ids];
        ids.forEach(function (id) {
            this.updateRenderData('node',id,function () {
                return {
                    data:this.graph.nodesIndex[id],
                    textureLoader:this.textureLoader,
                    textureIcon:this.textureIcon
                }
            }.bind(this));

        }.bind(this));

    }
    updateNodeLabelRenderData(ids){
        // debugger
        this.forceRender();
        if(!Array.isArray(ids)) ids = [ids];
        ids.forEach(function (id) {
            this.updateRenderData('nodeLabel',id,function () {
                return {
                    data:this.graph.nodesIndex[id],
                    textureText:this.textureText
                }
            }.bind(this));
        }.bind(this));

    }
    updateEdgeRenderData(ids){
        this.forceRender();
        if(!Array.isArray(ids)) ids = [ids];
        ids.forEach(function (id) {
            this.updateRenderData('edge',id,function () {
                return {
                    data:this.graph.edgesIndex[id],
                    source:this.graph.nodesIndex[this.graph.edgesIndex[id].source],
                    target:this.graph.nodesIndex[this.graph.edgesIndex[id].target]
                }
            }.bind(this));
        }.bind(this));
    }
    updateEdgeLabelRenderData(ids){
        // debugger
        this.forceRender();
        if(!Array.isArray(ids)) ids = [ids];
        ids.forEach(function (id) {
            this.updateRenderData('edgeLabel',id,function () {
                return {
                    data:this.graph.edgesIndex[id],
                    source:this.graph.nodesIndex[this.graph.edgesIndex[id].source],
                    target:this.graph.nodesIndex[this.graph.edgesIndex[id].target],
                    textureText:this.textureText
                }
            }.bind(this));
        }.bind(this));

    }



}

export default WebGLRender;