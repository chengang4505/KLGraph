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
        a_color: {components:4,start:5},
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
        var labelColor = util.parseColor(data.labelColor || config.defaultNodeLabelColor);

        var str = data.label.split('');

        var renderData = [];
        var indices = [];

        var labelSizeRatio = 0.4;
        var sizeX = util.getNodeSizeX(data) || defaultSize,sizeY = util.getNodeSizeY(data) || defaultSize;
        var size = Math.max(sizeX,sizeY);
        var infos = textureText.textinfo.infos,
            charWidth = size * labelSizeRatio,
            charHeight = size * labelSizeRatio,
            char,uv,width;

        var lines = getLines(str,20,infos,charWidth);

        var x1,y1,x2,y2,startx,starty;
        var points = 0;

        lines.forEach(function (line,i) {
            startx = line.lineWidth/2 * -1 + data.x;
            starty = data.y - sizeY - i * charHeight * 7/8;
            line.forEach(function (char) {
                if(!infos[char]) return;

                width = infos[char].width * charWidth;
                uv = infos[char].uvs;
                x1 = uv[0],y1 = uv[1],x2 = uv[2],y2 = uv[3];

                addData(renderData,[startx,starty,x1,y1,width,labelColor.r,labelColor.g,labelColor.b,labelColor.a]);
                addData(renderData,[startx,starty-charHeight,x1,y2,width,labelColor.r,labelColor.g,labelColor.b,labelColor.a]);
                addData(renderData,[startx+width,starty,x2,y1,width,labelColor.r,labelColor.g,labelColor.b,labelColor.a]);
                addData(renderData,[startx+width,starty-charHeight,x2,y2,width,labelColor.r,labelColor.g,labelColor.b,labelColor.a]);

                addIndices(indices,[
                    points+0,points+1,points+2,
                    points+1,points+2,points+3
                ]);

                startx += width*7/8;
                points += 4;
            });
        });

        return renderData.length > 0 ? {vertices:renderData, indices:indices} : null;
    }

}


function getLines(str,lineChars,infos,charWidth) {
    var lines = [];
    var line = [];
    var lineWidth = 0;
    str.forEach(function (char) {
        if(line.length >= lineChars){

            line.lineWidth = lineWidth;
            lines.push(line);

            line = [];
            lineWidth = 0;
        }

        if (!infos[char]) return;

        lineWidth +=infos[char].width * charWidth * 7/8;
        line.push(char);
    });

    if(lineWidth > 0){
        line.lineWidth = lineWidth;
        lines.push(line);
    }

    return lines;
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