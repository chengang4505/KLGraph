/**
 * Created by chengang on 17-3-31.
 */

import util from '../../../util'

import edgeVert from './glsl/default-vert.glsl'
import edgeFrag from './glsl/default-frag.glsl'


export default {
    shaderVert: edgeVert,
    shaderFrag: edgeFrag,
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

        renderData.push(getData([source.x,source.y,crossVector[0],crossVector[1],size,color.r,color.g,color.b,color.a]));
        renderData.push(getData([arrowX,arrowY,crossVector[0],crossVector[1],size,color.r,color.g,color.b,color.a]));
        renderData.push(getData([source.x,source.y,-crossVector[0],-crossVector[1],size,color.r,color.g,color.b,color.a]));
        renderData.push(getData([arrowX,arrowY,crossVector[0],crossVector[1],size,color.r,color.g,color.b,color.a]));
        renderData.push(getData([source.x,source.y,-crossVector[0],-crossVector[1],size,color.r,color.g,color.b,color.a]));
        renderData.push(getData([arrowX,arrowY,-crossVector[0],-crossVector[1],size,color.r,color.g,color.b,color.a]));

        //arrow
        renderData.push(getData([arrowX,arrowY,crossVector[0],crossVector[1],arrowSize/2,color.r,color.g,color.b,color.a]));
        renderData.push(getData([arrowX,arrowY,-crossVector[0],-crossVector[1],arrowSize/2,color.r,color.g,color.b,color.a]));
        renderData.push(getData([arrowX,arrowY,arrowSize/dis * dx,arrowSize/dis * dy,1,color.r,color.g,color.b,color.a]));


        return renderData;
    }

}

function getData(data) {
    return {
        a_position: [data[0], data[1]],
        a_normal: [data[2],data[3]],
        a_size: data[4],
        a_color: [data[5], data[6], data[7], data[8]],
    }
}