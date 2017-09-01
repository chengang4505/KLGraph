/**
 * Created by chengang on 17-3-31.
 */

import util from '../../../util'

import edgeVert from './glsl/default-vert.glsl'
import edgeFrag from './glsl/default-frag.glsl'


export default {
    shaderVert: edgeVert,
    shaderFrag: edgeFrag,
    attributes: {
        a_position: {components:2,start:0},
        a_normal:{components:2,start:2},
        a_size: {components:1,start:4},
        a_color: {components:4,start:5},
        a_dis: {components:1,start:9},
        a_dashed: {components:1,start:10},
        a_flag: {components:1,start:11},
        a_u: {components:1,start:12},
    },
    renderBefore(render,option){
        var gl = render.gl;


        // gl.clearDepth(1.0);
        // gl.clear(gl.DEPTH_BUFFER_BIT);
        // //
        // gl.enable(gl.DEPTH_TEST);
        // gl.depthFunc(gl.LESS);
        //
        // gl.enable(gl.BLEND);
        // gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    },
    getUniforms({matrix, camera, sampleRatio, textureLoader}){
        return {
            u_matrix:matrix
        }
    },
    getRenderData({data,config, textureLoader, textureIcon,graph}){
        var target = graph.nodesIndex[data.target];
        var source = graph.nodesIndex[data.source];
        var dx = target.x - source.x;
        var dy = target.y - source.y;
        var norV = util.normalize([dx,dy]);
        var dashed = data.dashed ? 1:0;


        var defaultSize = config.defaultNodeSize;

        var size = (data.size || config.defaultEdgeSize)/2,
            arrowSize = data.arrowSize || config.defaultEdgeArrowSize;
        var crossVector = util.normalize([-dy,dx]);

        //arrow
        var tNodeW,tNodeH,sNodeW,sNodeH,targetSize,sourceSize;
        sNodeW = util.getNodeSizeX(source) || defaultSize;
        sNodeH = util.getNodeSizeY(source) || defaultSize;
        tNodeW = util.getNodeSizeX(target) || defaultSize;
        tNodeH = util.getNodeSizeY(target) || defaultSize;

        if(source.type == 'rect'){
            sourceSize = Math.sqrt(Math.pow(sNodeW,2)+Math.pow(sNodeH,2));
        }else {
            sourceSize = sNodeW;
        }

        if(target.type == 'rect'){
            targetSize = Math.sqrt(Math.pow(tNodeW,2)+Math.pow(tNodeH,2));
        }else {
            targetSize = tNodeW;
        }

        var dis = util.getDistance(source.x,source.y,target.x,target.y);
        var arrowX = target.x - (targetSize + arrowSize)/dis * dx;
        var arrowY = target.y - (targetSize + arrowSize)/dis * dy;

        var color ;
        if(data.selected){
            color = util.parseColor(config.defaultEdgeSelectedColor);
        }else {
            color = util.parseColor(data.color||source.color || config.defaultEdgeColor);
        }


        var renderData = [];
        var indices = [];

        addData(renderData,[source.x+norV[0]*sourceSize,source.y+norV[1]*sourceSize,crossVector[0],crossVector[1],size,color.r,color.g,color.b,color.a,dis,dashed,0,0]);
        addData(renderData,[source.x+norV[0]*sourceSize,source.y+norV[1]*sourceSize,-crossVector[0],-crossVector[1],size,color.r,color.g,color.b,color.a,dis,dashed,0,0]);
        addData(renderData,[arrowX,arrowY,crossVector[0],crossVector[1],size,color.r,color.g,color.b,color.a,dis,dashed,0,1]);
        addData(renderData,[arrowX,arrowY,-crossVector[0],-crossVector[1],size,color.r,color.g,color.b,color.a,dis,dashed,0,1]);

        addIndices(indices,[0,1,2,1,2,3]);
        //arrow
        addData(renderData,[arrowX,arrowY,crossVector[0],crossVector[1],arrowSize/2,color.r,color.g,color.b,color.a,dis,dashed,1,0]);
        addData(renderData,[arrowX,arrowY,-crossVector[0],-crossVector[1],arrowSize/2,color.r,color.g,color.b,color.a,dis,dashed,1,0]);
        addData(renderData,[arrowX,arrowY,arrowSize/dis * dx,arrowSize/dis * dy,1,color.r,color.g,color.b,color.a,dis,dashed,1,0]);

        addIndices(indices,[4,5,6]);

        return {
            vertices:renderData,
            indices:indices,
        };
    }

}

function addData(arr,attrData) {
    for(var i = 0;i< attrData.length;i++){
        arr.push(attrData[i]);
    }
}

function addIndices(indices,attrIndex) {
    attrIndex.forEach(function (data) {
        indices.push(data);
    });
}
