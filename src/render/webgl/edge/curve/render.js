
'use strict'

import util from '../../../../util'

import vert from './vert.glsl'
import frag from './frag.glsl'



export default {
    shaderVert: vert,
    shaderFrag: frag,
    attributes: {
        a_position: {components:2,start:0},
        a_uv: {components:2,start:2},
        a_dis: {components:1,start:4},
        a_flag: {components:1,start:5},
        a_color: {components:4,start:6},
        a_dashed:{components:1,start:10},
        a_size:{components:1,start:11},
        a_ratio:{components:1,start:12},
    },
    getUniforms({matrix, camera, sampleRatio, textureLoader}){
        return {
            u_matrix:matrix,
            u_camera_scale:camera.scale
        }
    },
    getRenderData({data,config, textureLoader, textureIcon,graph}){
        var target = graph.nodesIndex[data.target];
        var source = graph.nodesIndex[data.source];

        var defaultSize = config.defaultNodeSize;

        var renderData = [];
        var indices = [];

        var dx = target.x - source.x;
        var dy = target.y - source.y;

        var dis = util.getDistance(source.x,source.y,target.x,target.y);
        var tNodeW,tNodeH,tSize;
        tNodeW = util.getNodeSizeX(target);
        tNodeH = util.getNodeSizeY(target);

        if(tNodeH && tNodeW && tNodeH == tNodeW){
            tSize = tNodeW;
        }else {
            tSize = Math.sqrt(Math.pow((tNodeW || defaultSize),2)+Math.pow((tNodeH || defaultSize),2));
        }

        var size = (data.size || config.defaultEdgeSize)/2;
        var aSize = data.arrowSize || config.defaultEdgeArrowSize;
        var vX, vY;

        // var tX = target.x - tSize / dis * dx;
        // var tY = target.y - tSize / dis * dy;
        var tX = target.x;
        var tY = target.y;


        var ctrlP = util.getControlPos(source.x,source.y,tX,tY,data.curveCount,data.curveOrder);

        //arrow
        var dis1 = util.getDistance(tX,tY,ctrlP[0],ctrlP[1]);
        var arrowPosRatio = (1 - (tSize + aSize)/dis1)*0.5 + 0.5;
        var arrowPos = util.getPointOnQuadraticCurve(arrowPosRatio,source.x,source.y,tX,tY,ctrlP[0],ctrlP[1]);
        var aTangent = util.getPointTangentOnQuadraticCurve(arrowPosRatio,source.x,source.y,tX,tY,ctrlP[0],ctrlP[1]);

        vX =aTangent[0]*aSize;
        vY =aTangent[1]*aSize;

        var arrowX = arrowPos[0],
            arrowY = arrowPos[1];


        //curve
        var color = util.parseColor(data.color||source.color || config.defaultEdgeColor);

        var scalePos = scaleTrangles([source.x,source.y,ctrlP[0],ctrlP[1],tX,tY]);
        var scaleUV = scaleTrangles([1,1,0.5,0,0,0]);


        var dashed = data.dashed ? 1:0;
        // debugger
        //curve
        addData(renderData,[scalePos[0],scalePos[1],scaleUV[0],scaleUV[1],dis,0,color.r,color.g,color.b,color.a,dashed,size,arrowPosRatio]);
        addData(renderData,[scalePos[2],scalePos[3],scaleUV[2],scaleUV[3],dis,0,color.r,color.g,color.b,color.a,dashed,size,arrowPosRatio]);
        addData(renderData,[scalePos[4],scalePos[5],scaleUV[4],scaleUV[5],dis,0,color.r,color.g,color.b,color.a,dashed,size,arrowPosRatio]);

        addIndices(indices,[0,1,2]);

        //arrow
        addData(renderData,[arrowX+vX,arrowY+vY,0,0,0,1,color.r,color.g,color.b,color.a,dashed,size,arrowPosRatio]);
        addData(renderData,[arrowX + vY * 0.6,arrowY - vX * 0.6,0,0,0,1,color.r,color.g,color.b,color.a,dashed,size,arrowPosRatio]);
        addData(renderData,[arrowX - vY * 0.6,arrowY + vX * 0.6,0,0,0,1,color.r,color.g,color.b,color.a,dashed,size,arrowPosRatio]);

        addIndices(indices,[3,4,5]);

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


function scaleTrangles(points, scale) {
    scale = scale || 1.6;
    var p1_x = points[0],
        p1_y = points[1],
        p2_x = points[2],
        p2_y = points[3],
        p3_x = points[4],
        p3_y = points[5];

    var avg_x = (p1_x + p2_x + p3_x) / 3,
        avg_y = (p1_y + p2_y + p3_y) / 3;

    var p1_x_new = avg_x + (p1_x - avg_x) * scale,
        p1_y_new = avg_y + (p1_y - avg_y) * scale,
        p2_x_new = avg_x + (p2_x - avg_x) * scale,
        p2_y_new = avg_y + (p2_y - avg_y) * scale,
        p3_x_new = avg_x + (p3_x - avg_x) * scale,
        p3_y_new = avg_y + (p3_y - avg_y) * scale;

    return [p1_x_new, p1_y_new, p2_x_new, p2_y_new, p3_x_new, p3_y_new];
}
