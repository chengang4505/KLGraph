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
    },
    getUniforms({matrix, camera,config, sampleRatio,textureLoader,textureIcon}){
        var color = utils.parseColor(config.defaultNodeBorder);
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

        var img = -1;
        if (data.img && textureLoader.cache.hasOwnProperty(data.img))
            img = textureLoader.cache[data.img];

        var sizeX = data.width || data.size || config.defaultNodeSize;
        var sizeY = data.height || data.size || config.defaultNodeSize;
        var iconSize = Math.min(sizeX, sizeY);
        var bgSize = Math.max(sizeX, sizeY) * 1.414;
        var isSelected = data.selected ? 1.0 : 0.0;

        var hasIcon = data.icon && textureIcon.iconinfo.infos[data.icon], uvs;
        uvs = hasIcon ? textureIcon.iconinfo.infos[data.icon].uvs : [0, 0];
        hasIcon = hasIcon ? 1 : 0;

        var renderData = [];
        var indices = [];

        var points = 0;
        var bgScale = 1.2;


        addData(renderData, [data.x - bgSize * bgScale, data.y + bgSize * bgScale, color.r, color.g, color.b, color.a, 0, 0, img, isSelected, 0, hasIcon]);
        addData(renderData, [data.x + bgSize * bgScale, data.y + bgSize * bgScale, color.r, color.g, color.b, color.a, 1, 0, img, isSelected, 0, hasIcon]);
        addData(renderData, [data.x - bgSize * bgScale, data.y - bgSize * bgScale, color.r, color.g, color.b, color.a, 0, 1, img, isSelected, 0, hasIcon]);
        addData(renderData, [data.x + bgSize * bgScale, data.y - bgSize * bgScale, color.r, color.g, color.b, color.a, 1, 1, img, isSelected, 0, hasIcon]);

        addIndices(indices, [
            points + 0, points + 1, points + 2,
            points + 1, points + 2, points + 3
        ]);
        points += 4;


        //base
        addData(renderData, [data.x - sizeX, data.y + sizeY, color.r, color.g, color.b, color.a, 0, 0, img, isSelected, 1, hasIcon]);
        addData(renderData, [data.x + sizeX, data.y + sizeY, color.r, color.g, color.b, color.a, 1, 0, img, isSelected, 1, hasIcon]);
        addData(renderData, [data.x - sizeX, data.y - sizeY, color.r, color.g, color.b, color.a, 0, 1, img, isSelected, 1, hasIcon]);
        addData(renderData, [data.x + sizeX, data.y - sizeY, color.r, color.g, color.b, color.a, 1, 1, img, isSelected, 1, hasIcon]);

        addIndices(indices, [
            points + 0, points + 1, points + 2,
            points + 1, points + 2, points + 3
        ]);
        points += 4;


        var scale = 0.85;
        //icon

        // debugger
        addData(renderData, [data.x - iconSize * scale, data.y + iconSize * scale, color.r, color.g, color.b, color.a, uvs[0], uvs[1], -2, isSelected, 2, hasIcon]);
        addData(renderData, [data.x + iconSize * scale, data.y + iconSize * scale, color.r, color.g, color.b, color.a, uvs[2], uvs[1], -2, isSelected, 2, hasIcon]);
        addData(renderData, [data.x - iconSize * scale, data.y - iconSize * scale, color.r, color.g, color.b, color.a, uvs[0], uvs[3], -2, isSelected, 2, hasIcon]);
        addData(renderData, [data.x + iconSize * scale, data.y - iconSize * scale, color.r, color.g, color.b, color.a, uvs[2], uvs[3], -2, isSelected, 2, hasIcon]);

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
