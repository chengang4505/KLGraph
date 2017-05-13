/**
 * Created by chengang on 17-3-28.
 */

import utils from '../../../../util'
import vert from './vert.glsl'
import frag from './frag.glsl'



export default {
    shaderVert: vert,
    shaderFrag: frag,
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
    getRenderData({data, textureLoader, textureIcon,graph}){

        var color = utils.parseColor(data.color || '#34e1ff');

        var img = -1;
        if(data.img && textureLoader.cache.hasOwnProperty(data.img))
            img = textureLoader.cache[data.img];

        var sizeX = data.width||data.size||10;
        var sizeY = data.height||data.size||10;
        var isSelected = data.selected ? 1.0 : 0.0;

        var renderData = [];


        //base
        renderData.push(getData([data.x-sizeX,data.y+sizeY,color.r,color.g,color.b,color.a,0,0,img,isSelected,1]));
        renderData.push(getData([data.x+sizeX,data.y+sizeY,color.r,color.g,color.b,color.a,1,0,img,isSelected,1]));
        renderData.push(getData([data.x-sizeX,data.y-sizeY,color.r,color.g,color.b,color.a,0,1,img,isSelected,1]));
        renderData.push(getData([data.x+sizeX,data.y+sizeY,color.r,color.g,color.b,color.a,1,0,img,isSelected,1]));
        renderData.push(getData([data.x-sizeX,data.y-sizeY,color.r,color.g,color.b,color.a,0,1,img,isSelected,1]));
        renderData.push(getData([data.x+sizeX,data.y-sizeY,color.r,color.g,color.b,color.a,1,1,img,isSelected,1]));


        var hasIcon = data.icon && textureIcon.iconinfo.infos[data.icon],uvs;
        var scale = 0.85;
        var iconSize = Math.min(sizeX,sizeY);
        //icon
        if(hasIcon){
            // debugger
            uvs = textureIcon.iconinfo.infos[data.icon].uvs;
            renderData.push(getData([data.x-iconSize*scale,data.y+iconSize*scale,color.r,color.g,color.b,color.a,uvs[0],uvs[1],-2,isSelected,2]));
            renderData.push(getData([data.x+iconSize*scale,data.y+iconSize*scale,color.r,color.g,color.b,color.a,uvs[2],uvs[1],-2,isSelected,2]));
            renderData.push(getData([data.x-iconSize*scale,data.y-iconSize*scale,color.r,color.g,color.b,color.a,uvs[0],uvs[3],-2,isSelected,2]));
            renderData.push(getData([data.x+iconSize*scale,data.y+iconSize*scale,color.r,color.g,color.b,color.a,uvs[2],uvs[1],-2,isSelected,2]));
            renderData.push(getData([data.x-iconSize*scale,data.y-iconSize*scale,color.r,color.g,color.b,color.a,uvs[0],uvs[3],-2,isSelected,2]));
            renderData.push(getData([data.x+iconSize*scale,data.y-iconSize*scale,color.r,color.g,color.b,color.a,uvs[2],uvs[3],-2,isSelected,2]));
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
    }
}
