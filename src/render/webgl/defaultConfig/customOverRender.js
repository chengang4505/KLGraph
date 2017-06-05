'use strict';

import util from '../../../util'
import {
    loadShader,loadProgram,
    vertexAttribPointer,
    setUniforms
} from '../../../base/GLUtil'


import vert from './vert.glsl'
import frag from './frag.glsl'



function renderLayerData({data,cacheIndex,gl,layers,renderLayerMap}) {

    var temp,program;
    var layerIndexMap = {};
    var _this = this;

    data.forEach(function (e) {
        if(e.filter) return;
        layers.forEach(function (layer) {
            if(!cacheIndex[e.id][layer] || !renderLayerMap[layer].enable || !renderLayerMap[layer].show) return;

            layerIndexMap[layer] = layerIndexMap[layer] || [];
            temp = cacheIndex[e.id][layer].data.indices;
            temp && temp.forEach(function (index) {
                layerIndexMap[layer].push(index);
            });
        });
    });

    layers.forEach(function (layer) {
        if (!layerIndexMap[layer] || layerIndexMap[layer].length == 0) return;

        program = renderLayerMap[layer].program;

        gl.useProgram(program);

        gl.bindBuffer(gl.ARRAY_BUFFER, program.vertexBuffer);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, _this.indexBuffer);

        vertexAttribPointer(gl, program.activeAttributes, program.offsetConfig);
        setUniforms(gl, program.activeUniforms,program.uniforms);

        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(layerIndexMap[layer]), gl.STATIC_DRAW);
        gl.drawElements(gl.TRIANGLES, layerIndexMap[layer].length, gl.UNSIGNED_INT, 0);

    });
}
function renderBg(gl,grayBg,option) {
    var color = util.parseColor(option.bgColor || 'rgba(255,255,255,0.8)');
    gl.useProgram(grayBg.program);

    gl.bindBuffer(gl.ARRAY_BUFFER, grayBg.vertexBuffer);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, grayBg.indexBuffer);

    gl.vertexAttribPointer(
        grayBg.positionLocation,
        2,
        gl.FLOAT, false, 0,0
    );
    gl.enableVertexAttribArray(grayBg.positionLocation);

    gl.uniform4f(grayBg.bgLocation,color.r,color.g,color.b,color.a);

    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_INT, 0);
}

export default  function nodeOverCustom(render,option) {
    var renderLayerMap = render.renderLayerMap;
    var gl = render.gl;

    option = option || {};

    if(!this.indexBuffer) this.indexBuffer = gl.createBuffer();

    if(!this.grayBg){
        this.grayBg = {};
        this.grayBg.program = loadProgram(gl, [
            loadShader(gl, vert, gl.VERTEX_SHADER),
            loadShader(gl, frag, gl.FRAGMENT_SHADER)
        ]);
        this.grayBg.vertexBuffer = gl.createBuffer();
        this.grayBg.indexBuffer = gl.createBuffer();

        this.grayBg.positionLocation = gl.getAttribLocation(this.grayBg.program, 'a_position');
        this.grayBg.bgLocation = gl.getUniformLocation(this.grayBg.program, 'u_bg_color');

        gl.bindBuffer(gl.ARRAY_BUFFER, this.grayBg.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.grayBg.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int32Array([0,1,2,1,2,3]), gl.STATIC_DRAW);

    }

    var edgesid,selectedNodes;
    var overNode = render.context.overInfo.currentNode;
    var overNodes = [] ,overEdges = [];
    var graph = render.context.graph;

    selectedNodes = render.context.selection.getNodes();

    if(overNode && !(option && option.over === false)){

        if(edgesid = graph.inEdgesIndex[overNode.id]){
            edgesid.forEach(function (id) {
                overEdges.push(graph.edgesIndex[id]);
                overNodes.push(graph.nodesIndex[graph.edgesIndex[id].source]);
            });
        }

        if(edgesid = graph.outEdgesIndex[overNode.id]){
            edgesid.forEach(function (id) {
                overEdges.push(graph.edgesIndex[id]);
                overNodes.push(graph.nodesIndex[graph.edgesIndex[id].target]);
            });
        }

        overNodes.push(overNode);

        //draw gray background
        renderBg(gl,this.grayBg,option);

        if(overEdges.length){
            renderLayerData.call(this,{
                data:overEdges,
                cacheIndex:render.renderCache.edge.index,
                gl,
                layers:['edge','edgeCurve','edgeLabel','edgeCurveLabel'],
                renderLayerMap
            });
        }

        renderLayerData.call(this,{
            data:overNodes,
            cacheIndex:render.renderCache.node.index,
            gl,
            layers:['node','rectNode'],
            renderLayerMap
        });

        if(selectedNodes.length){
            renderLayerData.call(this,{
                data:selectedNodes,
                cacheIndex:render.renderCache.node.index,
                gl,
                layers:['node','rectNode'],
                renderLayerMap
            });

        }

        renderLayerData.call(this,{
            data:overNodes,
            cacheIndex:render.renderCache.node.index,
            gl,
            layers:['nodeLabel'],
            renderLayerMap
        });

    }else {
        if(selectedNodes.length){
            renderLayerData.call(this,{
                data:selectedNodes,
                cacheIndex:render.renderCache.node.index,
                gl,
                layers:['node','rectNode'],
                renderLayerMap
            });

        }
    }
}
