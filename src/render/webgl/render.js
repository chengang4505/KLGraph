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
    constructor(graph,option) {
        super();

        this.option = option;

        this.container = option.container;
        this.graph = graph;
        this.needUpdate = true;

        this.sampleRatio = 1.5;

        this.initRender();
        this.initGraphChangeEvent();

        this.initTexture = false;
        this.textureLoader = new TextureLoader(this.gl);
        this.textureLoader.on('load',this.textureUpdate.bind(this));

        this.initTextureText();

        this.textureText = new TextureText(this.gl);
        this.initTextTexture();

        this.projectMatrix = mat3.matrixFromScale(2/(this.gl.canvas.clientWidth),2/(this.gl.canvas.clientHeight));

        this.camera = {
            scale:1,
            position:{
                x:0,y:0
            },
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
        this.option.renderEdge && this.renderEdge();
        // console.timeEnd('renderEdge');

        // console.time('renderEdgeLabel');
        this.option.renderEdge && this.option.renderEdgeLabel && this.renderEdgeLabel();
        // console.timeEnd('renderEdgeLabel');

        // console.time('renderNode');
        this.option.renderNode && this.renderNode();
        // console.timeEnd('renderNode');

        // console.time('renderNodeLabel');
        this.option.renderNode && this.option.renderNodeLabel && this.renderNodeLabel();
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

        this.renderCacheData('node');
    }
    renderNodeLabel(){

        this.createRenderCache('nodeLabel',this.graph.nodes,function (data) {
            return {
                data:data,
                textureText:this.textureText
            }
        }.bind(this));

        this.renderCacheData('nodeLabel');

    }
    renderEdge(){
        this.createRenderCache('edge',this.graph.edges,function (data) {
            return {
                data:data,
                source:this.graph.nodesIndex[data.source],
                target:this.graph.nodesIndex[data.target]
            }
        }.bind(this));

        this.renderCacheData('edge');
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

        this.renderCacheData('edgeLabel');

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

        var nodeData,cacheIndex;
        var start,offset,layers,type;

        var rootType1 = this.renderType[rootType].type;

        if(!this.renderType[rootType].cache){
            this.clearClusterCacheCounter(rootType);

            data.forEach(function (e) {

                type = e.type || 'default';
                if (!rootType1[type]) this.initRenderLayers(rootType, type);

                //cache info
                cacheIndex = this.renderType[rootType].index[e.id] = this.renderType[rootType].index[e.id] || {};
                cacheIndex.type = type;
                cacheIndex.start = {};//layer start

                layers = rootType1[type].layers;
                for(var name in layers){

                    start = layers[name].counter;
                    offset = 0;

                    nodeData = layers[name].render.getRenderData(argFn(e));

                    // no data
                    if(!nodeData || nodeData.length == 0){
                        // cacheIndex.start[name] = null;
                        continue;
                    }

                    nodeData.forEach(function (data) {
                        layers[name].data[start+offset] = data;
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
    renderCacheData(rootType){
        var renderType,type,layers,camMatrixInvert;
        renderType = this.renderType[rootType].type;

        for(type in renderType){

            layers = renderType[type].layers;

            renderType[type].order.forEach(function (name) {

                if(layers[name].data.length > 0){

                    camMatrixInvert = this.getCameraMatrix(true);
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
        this.gl = this.container.getContext('experimental-webgl') || this.container.getContext('webgl');

        if (!this.gl) {
            throw '浏览器不支持webGl';
        }

        this.gl.getExtension('OES_standard_derivatives');

        this.resizeCanvas(this.gl.canvas);
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
        this.gl.enable(this.gl.BLEND);
        this.gl.disable(this.gl.DEPTH_TEST);
        this.gl.clearColor(1.0, 1.0, 1.0, 1);
    }
    initGraphChangeEvent(){
        var _this = this;
        this.graph.on('change',function (type,ids) {
            if(type =='node'){
                // console.time('updateNode');
                _this.option.renderNode && _this.updateNodeRenderData(ids);
                // console.timeEnd('updateNode');
                // console.time('updateNodeLabel');
                _this.option.renderNode && _this.option.renderNodeLabel && _this.updateNodeLabelRenderData(ids);
                // console.timeEnd('updateNodeLabel');
            }else if(type == 'edge'){
                // console.time('updateEdge');
                _this.option.renderEdge && _this.updateEdgeRenderData(ids);
                // console.timeEnd('updateEdge');
                // console.time('updateEdgeLabel');
                _this.option.renderEdge && _this.option.renderEdgeLabel && _this.updateEdgeLabelRenderData(ids);
                // console.timeEnd('updateEdgeLabel');
            }

        });

        this.graph.on('reset',function () {
            _this.clearRenderCache()
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


        function getAddText(objs) {
            var text = '';
            objs.forEach(function (e) {
                e.label && (text += e.label);
            });

            return text;
        }
        
    }
    initTextTexture(){
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

        var renderRoot = this.renderType[root].type;

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
    initTextureText(){

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

        this.textureIcon = new TextureIcon(this.gl,this.option);

        this.textureIcon.createIcons(icons);

        this.textureIcon.on('load',function () {
            this.clearRenderCache('node');
        }.bind(this))
    }

    getCameraMatrix(isInvert){
        var mat = mat3.multiMatrix([
            mat3.matrixFromScale(this.camera.scale,this.camera.scale),
            mat3.matrixFromRotation(this.camera.rotation),
            mat3.matrixFromTranslate(this.camera.position.x,this.camera.position.y)
        ]);
        return isInvert  ? mat3.invert(mat) : mat;
    }
    resizeCanvas(canvas) {
        var multiplier = this.sampleRatio;
        var width = canvas.clientWidth * multiplier | 0;
        var height = canvas.clientHeight * multiplier | 0;
        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
        }
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
        if(newscale < this.option.zoomMin) newscale = this.option.zoomMin;
        if(newscale > this.option.zoomMax) newscale = this.option.zoomMax;

        if (x != null && y != null) {
            var offset = mat3.rotateVector([x * (newscale - scale)/scale, y *(newscale - scale)/scale], this.getCameraMatrix());
            this.camera.position.x -= offset[0] ;
            this.camera.position.y -= offset[1];
        }

        this.camera.scale = newscale;
    }
    textureUpdate(url){
        var nodes = this.graph.nodes;
        nodes.forEach(function (e) {
            if(e.img && e.img == url) this.updateNodeRenderData(e.id);
        }.bind(this));
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