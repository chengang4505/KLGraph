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
        a_size: {type: type.FLOAT, comType: comType.FLOAT},
        a_position: {type: type.FLOAT_VEC2, comType: comType.FLOAT},
        a_color: {type: type.FLOAT_VEC4, comType: comType.FLOAT},
        a_img: {type: type.FLOAT, comType: comType.FLOAT},
        a_selected: {type: type.FLOAT, comType: comType.FLOAT},
        a_uv: {type: type.FLOAT_VEC2, comType: comType.FLOAT},
        a_flag: {type: type.FLOAT, comType: comType.FLOAT},
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

        renderData.push(getData([data.x-data.size,data.y+data.size,color.r,color.g,color.b,color.a,0,0,img,isSelected,1,data.size]));
        renderData.push(getData([data.x+data.size,data.y+data.size,color.r,color.g,color.b,color.a,1,0,img,isSelected,1,data.size]));
        renderData.push(getData([data.x-data.size,data.y-data.size,color.r,color.g,color.b,color.a,0,1,img,isSelected,1,data.size]));
        renderData.push(getData([data.x+data.size,data.y+data.size,color.r,color.g,color.b,color.a,1,0,img,isSelected,1,data.size]));
        renderData.push(getData([data.x-data.size,data.y-data.size,color.r,color.g,color.b,color.a,0,1,img,isSelected,1,data.size]));
        renderData.push(getData([data.x+data.size,data.y-data.size,color.r,color.g,color.b,color.a,1,1,img,isSelected,1,data.size]));

        var hasIcon = data.icon && textureIcon.iconinfo.infos[data.icon],uvs;
        var scale = 0.7;
        //icon
        if(hasIcon){

            uvs = textureIcon.iconinfo.infos[data.icon].uvs;
            renderData.push(getData([data.x-data.size*scale,data.y+data.size*scale,color.r,color.g,color.b,color.a,uvs[0],uvs[1],-2,isSelected,2,data.size]));
            renderData.push(getData([data.x+data.size*scale,data.y+data.size*scale,color.r,color.g,color.b,color.a,uvs[2],uvs[1],-2,isSelected,2,data.size]));
            renderData.push(getData([data.x-data.size*scale,data.y-data.size*scale,color.r,color.g,color.b,color.a,uvs[0],uvs[3],-2,isSelected,2,data.size]));
            renderData.push(getData([data.x+data.size*scale,data.y+data.size*scale,color.r,color.g,color.b,color.a,uvs[2],uvs[1],-2,isSelected,2,data.size]));
            renderData.push(getData([data.x-data.size*scale,data.y-data.size*scale,color.r,color.g,color.b,color.a,uvs[0],uvs[3],-2,isSelected,2,data.size]));
            renderData.push(getData([data.x+data.size*scale,data.y-data.size*scale,color.r,color.g,color.b,color.a,uvs[2],uvs[3],-2,isSelected,2,data.size]));
        }
        
        
        return renderData;
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
