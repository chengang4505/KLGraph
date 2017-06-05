/**
 * Created by chengang on 17-4-7.
 */
import vert from './glsl/node-label-vert.glsl'
import frag from './glsl/label-frag.glsl'
import util from '../../../util'


export default {
    shaderVert: vert,
    shaderFrag: frag,
    attributes: {
        a_position: {components:2,start:0},
        a_uv:{components:2,start:2},
        a_size: {components:1,start:4},
    },
    getUniforms({matrix, camera, sampleRatio, textureLoader,textureText}){
        return {
            u_matrix:matrix,
            u_camera_scale:camera.scale,
            u_image:textureText.unit,
        }
    },
    getRenderData({data,config, textureLoader, textureIcon,textureText,graph}){
        // debugger
        if(!data.label) return null;

        var defaultSize = config.defaultNodeSize;

        var str = data.label.split('');

        var renderData = [];
        var indices = [];

        var sizeX = util.getNodeSizeX(data) || defaultSize,sizeY = util.getNodeSizeY(data) || defaultSize;
        var size = Math.max(sizeX,sizeY);
        var infos = textureText.textinfo.infos,
            charWidth = size/2,
            charHeight = size/2,
            char,uv,width;

        var totalWidht = 0;
        for(var i = 0;i< str.length;i++) {
            char = str[i];
            if (!infos[char]) {
                // console.log(1);
                continue;
            }
            totalWidht +=infos[char].width * charWidth
        }


        var startx = totalWidht/2 * -1 + data.x;
        var starty =  data.y - sizeY;
        var x1,y1,x2,y2;

        var points = 0;
        for(var i = 0;i< str.length;i++){
            char = str[i];
            if(!infos[char]){
                // console.log(1);
                continue;
            }

            width = infos[char].width * charWidth;
            uv = infos[char].uvs;
            x1 = uv[0],y1 = uv[1],x2 = uv[2],y2 = uv[3];

            addData(renderData,[startx,starty,x1,y1,width]);
            addData(renderData,[startx,starty-charHeight,x1,y2,width]);
            addData(renderData,[startx+width,starty,x2,y1,width]);
            addData(renderData,[startx+width,starty-charHeight,x2,y2,width]);

            addIndices(indices,[
                points+0,points+1,points+2,
                points+1,points+2,points+3
            ]);

            startx += width*7/8;
            points += 4;
        }
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