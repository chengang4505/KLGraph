/**
 * Created by chengang on 17-3-28.
 */

import utils from '../../../../util'
import nodeVert from './default-vert.glsl'
import nodeFrag from './default-frag.glsl'

import {GlType as type, GLComType as comType} from '../../../../base/GLUtil'

export default {
    shaderVert: nodeVert,
    shaderFrag: nodeFrag,
    attributes: {
        a_position: {components:2,start:0},
        a_color: {components:4,start:2},
        a_uv:{components:2,start:6},
        a_img: {components:1,start:8},
        a_selected: {components:1,start:9},
        a_flag: {components:1,start:10},
        a_size: {components:1,start:11},
    },
    getUniforms({matrix, camera, sampleRatio, textureLoader}){
        return {
            u_matrix:matrix,
            u_camera_scale:camera.scale,
            u_textures:textureLoader.texturesIndex,
            u_borderColor:[212, 82, 95,255.0],
            u_sample_ratio:sampleRatio,
            u_icons_texture:11,
        }
    },
    getRenderData({data, textureLoader, textureIcon}){
        var size = data.size * 2 || 10 * 2;
        var isSelected = data.selected ? 1.0 : 0.0;
        var color = utils.parseColor(data.color || '#62ffb7');

        var img = -1;
        if (data.img && textureLoader.cache[data.img])
            img = textureLoader.cache[data.img];


        var renderData = [];

        addData(renderData,[data.x-data.size,data.y+data.size,color.r,color.g,color.b,color.a,0,0,img,isSelected,1,data.size]);
        addData(renderData,[data.x+data.size,data.y+data.size,color.r,color.g,color.b,color.a,1,0,img,isSelected,1,data.size]);
        addData(renderData,[data.x-data.size,data.y-data.size,color.r,color.g,color.b,color.a,0,1,img,isSelected,1,data.size]);
        addData(renderData,[data.x+data.size,data.y+data.size,color.r,color.g,color.b,color.a,1,0,img,isSelected,1,data.size]);
        addData(renderData,[data.x-data.size,data.y-data.size,color.r,color.g,color.b,color.a,0,1,img,isSelected,1,data.size]);
        addData(renderData,[data.x+data.size,data.y-data.size,color.r,color.g,color.b,color.a,1,1,img,isSelected,1,data.size]);

        var hasIcon = data.icon && textureIcon.iconinfo.infos[data.icon],uvs;
        var scale = 0.7;
        //icon
        if(hasIcon){

            uvs = textureIcon.iconinfo.infos[data.icon].uvs;
            addData(renderData,[data.x-data.size*scale,data.y+data.size*scale,color.r,color.g,color.b,color.a,uvs[0],uvs[1],-2,isSelected,2,data.size]);
            addData(renderData,[data.x+data.size*scale,data.y+data.size*scale,color.r,color.g,color.b,color.a,uvs[2],uvs[1],-2,isSelected,2,data.size]);
            addData(renderData,[data.x-data.size*scale,data.y-data.size*scale,color.r,color.g,color.b,color.a,uvs[0],uvs[3],-2,isSelected,2,data.size]);
            addData(renderData,[data.x+data.size*scale,data.y+data.size*scale,color.r,color.g,color.b,color.a,uvs[2],uvs[1],-2,isSelected,2,data.size]);
            addData(renderData,[data.x-data.size*scale,data.y-data.size*scale,color.r,color.g,color.b,color.a,uvs[0],uvs[3],-2,isSelected,2,data.size]);
            addData(renderData,[data.x+data.size*scale,data.y-data.size*scale,color.r,color.g,color.b,color.a,uvs[2],uvs[3],-2,isSelected,2,data.size]);
        }
        
        
        return renderData;
    }

}

function addData(arr,attrData) {
    for(var i = 0;i< attrData.length;i++){
        arr.push(attrData[i]);
    }
}


function getData(data) {
    return {
        a_position: [data[0], data[1]],
        a_color: [data[2], data[3], data[4], data[5]],
        a_uv:[data[6],data[7]],
        a_img: data[8],
        a_selected: data[9],
        a_flag: data[10],
        a_size: data[11],
    }
}
