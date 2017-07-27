/**
 * Created by chengang on 17-3-28.
 */

import utils from '../../../../util'
import vert from './vert.glsl'
import frag from './frag.glsl'


export default {
    shaderVert: vert,
    shaderFrag: frag,
    attributes: {
        a_position: {components: 2, start: 0},
        a_color: {components: 4, start: 2},
        a_uv: {components: 2, start: 6},
        a_img: {components: 1, start: 8},
        a_selected: {components: 1, start: 9},
        a_flag: {components: 1, start: 10},
        a_showicon: {components: 1, start: 11},
        a_icon_color: {components:4,start:12},
    },
    getUniforms({matrix, camera,config, sampleRatio,textureLoader,textureIcon}){
        var color = utils.parseColor(config.defaultNodeSelectedBorder);
        return {
            u_matrix: matrix,
            u_camera_scale: camera.scale,
            // u_textures:textureLoader.texturesIndex,
            u_borderColor: [color.r, color.g, color.b, color.a],
            u_sample_ratio: sampleRatio,
            u_icons_texture: textureIcon.unit,
        }
    },
    getRenderData({data, config, textureLoader, textureIcon, graph}){

        var color = utils.parseColor(data.color || config.defaultNodeColor);
        var iColor = utils.parseColor(data.iconColor || config.defaultNodeIconColor);

        var img = -1;
        if (data.img && textureLoader.cache.hasOwnProperty(data.img))
            img = textureLoader.cache[data.img];

        var sizeX = data.width = data.width || data.size || config.defaultNodeSize;
        var sizeY = data.height = data.height || data.size || config.defaultNodeSize;
        var iconSize = Math.min(sizeX, sizeY);
        var bgSize = Math.max(sizeX, sizeY) * 1.414;
        var isSelected = data.selected ? 1.0 : 0.0;

        var hasIcon = data.icon && textureIcon.iconinfo.infos[data.icon], uvs;
        uvs = hasIcon ? textureIcon.iconinfo.infos[data.icon].uvs : [0, 0];
        hasIcon = hasIcon ? 1 : 0;

        var renderData = [];
        var indices = [];

        var points = 0;
        var bgScale = 1;


        addData(renderData, [data.x - bgSize * bgScale, data.y + bgSize * bgScale, color.r, color.g, color.b, color.a, 0, 0, img, isSelected, 0, hasIcon,iColor.r,iColor.g,iColor.b,iColor.a]);
        addData(renderData, [data.x + bgSize * bgScale, data.y + bgSize * bgScale, color.r, color.g, color.b, color.a, 1, 0, img, isSelected, 0, hasIcon,iColor.r,iColor.g,iColor.b,iColor.a]);
        addData(renderData, [data.x - bgSize * bgScale, data.y - bgSize * bgScale, color.r, color.g, color.b, color.a, 0, 1, img, isSelected, 0, hasIcon,iColor.r,iColor.g,iColor.b,iColor.a]);
        addData(renderData, [data.x + bgSize * bgScale, data.y - bgSize * bgScale, color.r, color.g, color.b, color.a, 1, 1, img, isSelected, 0, hasIcon,iColor.r,iColor.g,iColor.b,iColor.a]);

        addIndices(indices, [
            points + 0, points + 1, points + 2,
            points + 1, points + 2, points + 3
        ]);
        points += 4;


        //base
        addData(renderData, [data.x - sizeX, data.y + sizeY, color.r, color.g, color.b, color.a, 0, 0, img, isSelected, 1, hasIcon,iColor.r,iColor.g,iColor.b,iColor.a]);
        addData(renderData, [data.x + sizeX, data.y + sizeY, color.r, color.g, color.b, color.a, 1, 0, img, isSelected, 1, hasIcon,iColor.r,iColor.g,iColor.b,iColor.a]);
        addData(renderData, [data.x - sizeX, data.y - sizeY, color.r, color.g, color.b, color.a, 0, 1, img, isSelected, 1, hasIcon,iColor.r,iColor.g,iColor.b,iColor.a]);
        addData(renderData, [data.x + sizeX, data.y - sizeY, color.r, color.g, color.b, color.a, 1, 1, img, isSelected, 1, hasIcon,iColor.r,iColor.g,iColor.b,iColor.a]);

        addIndices(indices, [
            points + 0, points + 1, points + 2,
            points + 1, points + 2, points + 3
        ]);
        points += 4;


        var scale = 0.85;
        //icon

        var iconInfo = data.icon ? getIconInfo(data) : {left:-1*data.size,top:data.size,right:data.size,bottom:-1*data.size};
        addData(renderData, [data.x + iconInfo.left, data.y + iconInfo.top, color.r, color.g, color.b, color.a, uvs[0], uvs[1], -2, isSelected, 2, hasIcon,iColor.r,iColor.g,iColor.b,iColor.a]);
        addData(renderData, [data.x + iconInfo.right, data.y + iconInfo.top, color.r, color.g, color.b, color.a, uvs[2], uvs[1], -2, isSelected, 2, hasIcon,iColor.r,iColor.g,iColor.b,iColor.a]);
        addData(renderData, [data.x + iconInfo.left, data.y + iconInfo.bottom, color.r, color.g, color.b, color.a, uvs[0], uvs[3], -2, isSelected, 2, hasIcon,iColor.r,iColor.g,iColor.b,iColor.a]);
        addData(renderData, [data.x + iconInfo.right, data.y + iconInfo.bottom, color.r, color.g, color.b, color.a, uvs[2], uvs[3], -2, isSelected, 2, hasIcon,iColor.r,iColor.g,iColor.b,iColor.a]);

        addIndices(indices, [
            points + 0, points + 1, points + 2,
            points + 1, points + 2, points + 3
        ]);
        points += 4;


        return {
            vertices: renderData,
            indices: indices,
        };
    }

}

function addData(arr, attrData) {
    for (var i = 0; i < attrData.length; i++) {
        arr.push(attrData[i]);
    }
}


function addIndices(indices, attrIndex) {
    attrIndex.forEach(function (data) {
        indices.push(data);
    });
}

function getIconInfo(data) {
    var icon = data.icon;
    var defaultConfig = {content:'',offsetX:0,offsetY:0,scale:0.65};
    icon = utils.isString(icon) ? utils.extend({content:icon},defaultConfig) : utils.extend(icon,defaultConfig);

    var size = Math.min(data.width,data.height);

    return {
        left: size * -1 * icon.scale + icon.offsetX,
        right: size * icon.scale + icon.offsetX,
        top: size  * icon.scale + icon.offsetY,
        bottom: size * -1 * icon.scale + icon.offsetY,
    }
}
