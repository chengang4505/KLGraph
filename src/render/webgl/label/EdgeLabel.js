/**
 * Created by chengang on 17-4-7.
 */

import util from '../../../util'
import mat3 from '../../../base/Matrix'

import vert from './glsl/edge-label-vert.glsl'
import frag from './glsl/label-frag.glsl'


export default {
    shaderVert: vert,
    shaderFrag: frag,
    getUniforms({matrix, camera, sampleRatio, textureLoader}){
        return {
            u_matrix:matrix,
            u_camera_scale:camera.scale,
            u_image:10,
        }
    },
    getRenderData({data, textureLoader, textureIcon,textureText,graph}){
        var target = graph.nodesIndex[data.target];
        var source = graph.nodesIndex[data.source];

        if(!data.label) return [];

        // debugger
        var str = data.label.split('');

        var renderData = [];

        var size = data.fontSize ||  Math.max(util.getNodeSizeX(source),util.getNodeSizeY(source))/3;
        var infos = textureText.textinfo.infos,
            charWidth = size,
            charHeight = size,
            char,uv,width;

        var totalWidht = 0;
        for(var i = 0;i< str.length;i++) {
            char = str[i];
            if (!infos[char]) {
                console.log(1);
                continue;
            }
            totalWidht +=infos[char].width * charWidth
        }

        var dx = target.x - source.x;
        var dy = target.y - source.y;

        var angle = util.getAngle(1,0,dx,dy);

        angle = dy < 0 ? Math.PI-angle:angle;
        angle = angle > Math.PI/2 ? angle + Math.PI: angle;

        var centerX = (source.x + target.x)/2, centerY = (source.y + target.y)/2;
        var startx = totalWidht/2 * -1;
        var starty =  charHeight/2;
        var x1,y1,x2,y2;



        for(var i = 0;i< str.length;i++){
            char = str[i];
            if(!infos[char]){
                console.log('no text texture info');
                continue;
            }

            width = infos[char].width * charWidth;
            uv = infos[char].uvs;
            x1 = uv[0],y1 = uv[1],x2 = uv[2],y2 = uv[3];

            renderData.push(getData([startx,starty,x1,y1,width],centerX,centerY,angle));
            renderData.push(getData([startx,starty-charHeight,x1,y2,width],centerX,centerY,angle));
            renderData.push(getData([startx+width,starty,x2,y1,width],centerX,centerY,angle));
            renderData.push(getData([startx,starty-charHeight,x1,y2,width],centerX,centerY,angle));
            renderData.push(getData([startx+width,starty,x2,y1,width],centerX,centerY,angle));
            renderData.push(getData([startx+width,starty-charHeight,x2,y2,width],centerX,centerY,angle));

            startx += width*7/8;
        }

        return renderData;
    }

}

function getData(data,centerX,centerY,angle) {
    var rotate = mat3.transformPoint([data[0],data[1]],mat3.matrixFromRotation(angle));
    data[0] = rotate[0] + centerX;
    data[1] = rotate[1] + centerY;
    return {
        a_position: [data[0], data[1]],
        a_uv:[data[2],data[3]],
        a_size: data[4],
    }
}