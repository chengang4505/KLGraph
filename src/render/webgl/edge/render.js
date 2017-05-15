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
    },
    getUniforms({matrix, camera, sampleRatio, textureLoader}){
        return {
            u_matrix:matrix
        }
    },
    getRenderData({data, textureLoader, textureIcon,graph}){
        var target = graph.nodesIndex[data.target];
        var source = graph.nodesIndex[data.source];
        var edge = data;
        var dx = target.x - source.x;
        var dy = target.y - source.y;

        data = [];
        var size = 0.8,arrowSize =6;
        var crossVector = util.normalize([-dy,dx]);

        //arrow
        var targetSize = Math.max(util.getNodeSizeX(target),util.getNodeSizeY(target));
        var dis = util.getDistance(source.x,source.y,target.x,target.y);
        var arrowX = target.x - (targetSize + arrowSize)/dis * dx;
        var arrowY = target.y - (targetSize + arrowSize)/dis * dy;

        var color = util.parseColor(edge.color||source.color || '#b3d2ff');

        var renderData = [];
        var indices = [];

        addData(renderData,[source.x,source.y,crossVector[0],crossVector[1],size,color.r,color.g,color.b,color.a]);
        addData(renderData,[arrowX,arrowY,crossVector[0],crossVector[1],size,color.r,color.g,color.b,color.a]);
        addData(renderData,[source.x,source.y,-crossVector[0],-crossVector[1],size,color.r,color.g,color.b,color.a]);
        // addData(renderData,[arrowX,arrowY,crossVector[0],crossVector[1],size,color.r,color.g,color.b,color.a]);
        // addData(renderData,[source.x,source.y,-crossVector[0],-crossVector[1],size,color.r,color.g,color.b,color.a]);
        addData(renderData,[arrowX,arrowY,-crossVector[0],-crossVector[1],size,color.r,color.g,color.b,color.a]);

        addIndices(indices,[0,1,2,1,2,3]);
        //arrow
        addData(renderData,[arrowX,arrowY,crossVector[0],crossVector[1],arrowSize/2,color.r,color.g,color.b,color.a]);
        addData(renderData,[arrowX,arrowY,-crossVector[0],-crossVector[1],arrowSize/2,color.r,color.g,color.b,color.a]);
        addData(renderData,[arrowX,arrowY,arrowSize/dis * dx,arrowSize/dis * dy,1,color.r,color.g,color.b,color.a]);

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
