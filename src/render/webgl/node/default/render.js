/**
 * Created by chengang on 17-3-28.
 */

import utils from '../../../../util'
import nodeVert from './default-vert.glsl'
import nodeFrag from './default-frag.glsl'

export default {
    shaderVert: nodeVert,
    shaderFrag: nodeFrag,
    attributes: {
        a_position: {components:2,start:0},
        a_color: {components:4,start:2},
        a_uv:{components:2,start:6},
        a_selected: {components:1,start:8},
        a_flag: {components:1,start:9},
        a_size: {components:1,start:10},
        a_showicon: {components:1,start:11},
        a_center: {components:2,start:12},
    },
    getUniforms({matrix, camera, sampleRatio, textureLoader}){
        return {
            u_matrix:matrix,
            u_camera_scale:camera.scale,
            // u_textures:textureLoader.texturesIndex,
            u_borderColor:[212, 82, 95,255.0],
            u_sample_ratio:sampleRatio,
            u_icons_texture:11,
        }
    },
    getRenderData({data, textureLoader, textureIcon,oldData,dirtyAttr}){
        var size = data.size * 2 || 10 * 2;
        var isSelected = data.selected ? 1.0 : 0.0;
        var color = utils.parseColor(data.color || '#62ffb7');

        // debugger
        // var img = -1;
        // if (data.img && textureLoader.cache[data.img])
        //     img = textureLoader.cache[data.img];

        if(oldData && dirtyAttr && Object.keys(dirtyAttr).length == 2 && dirtyAttr.hasOwnProperty('x') && dirtyAttr.hasOwnProperty('y')){
            // debugger
            var offset = 14;
            var oldVertices = oldData.data.vertices;
            for(var i = 0;i< oldVertices.length;i+=offset){
                oldVertices[i+12] = data.x;
                oldVertices[i+13] = data.y;
            }
            return {
                vertices:oldVertices,
            };
        }

        var hasIcon = data.icon && textureIcon.iconinfo.infos[data.icon],uvs;
        uvs = hasIcon ? textureIcon.iconinfo.infos[data.icon].uvs : [0,0];
        hasIcon = hasIcon ? 1:0;

        var vertices = [];
        var indices = [];

        var points = 0;
        var bgScale = 1.35;

        // debugger

        addData(vertices,[-1*data.size*bgScale,+1*data.size*bgScale,color.r,color.g,color.b,color.a,0,0,isSelected,0,data.size,hasIcon,data.x,data.y]);
        addData(vertices,[+1*data.size*bgScale,+1*data.size*bgScale,color.r,color.g,color.b,color.a,1,0,isSelected,0,data.size,hasIcon,data.x,data.y]);
        addData(vertices,[-1*data.size*bgScale,-1*data.size*bgScale,color.r,color.g,color.b,color.a,0,1,isSelected,0,data.size,hasIcon,data.x,data.y]);
        addData(vertices,[+1*data.size*bgScale,-1*data.size*bgScale,color.r,color.g,color.b,color.a,1,1,isSelected,0,data.size,hasIcon,data.x,data.y]);

        addIndices(indices,[
            points+0,points+1,points+2,
            points+1,points+2,points+3
        ]);
        points += 4;



        addData(vertices,[-1*data.size,+1*data.size,color.r,color.g,color.b,color.a,0,0,isSelected,1,data.size,hasIcon,data.x,data.y]);
        addData(vertices,[+1*data.size,+1*data.size,color.r,color.g,color.b,color.a,1,0,isSelected,1,data.size,hasIcon,data.x,data.y]);
        addData(vertices,[-1*data.size,-1*data.size,color.r,color.g,color.b,color.a,0,1,isSelected,1,data.size,hasIcon,data.x,data.y]);
        addData(vertices,[+1*data.size,-1*data.size,color.r,color.g,color.b,color.a,1,1,isSelected,1,data.size,hasIcon,data.x,data.y]);

        addIndices(indices,[
            points+0,points+1,points+2,
            points+1,points+2,points+3
        ]);
        points += 4;


        var scale = 0.7;


        addData(vertices,[-1*data.size*scale,+1*data.size*scale,color.r,color.g,color.b,color.a,uvs[0],uvs[1],isSelected,2,data.size,hasIcon,data.x,data.y]);
        addData(vertices,[+1*data.size*scale,+1*data.size*scale,color.r,color.g,color.b,color.a,uvs[2],uvs[1],isSelected,2,data.size,hasIcon,data.x,data.y]);
        addData(vertices,[-1*data.size*scale,-1*data.size*scale,color.r,color.g,color.b,color.a,uvs[0],uvs[3],isSelected,2,data.size,hasIcon,data.x,data.y]);
        addData(vertices,[+1*data.size*scale,-1*data.size*scale,color.r,color.g,color.b,color.a,uvs[2],uvs[3],isSelected,2,data.size,hasIcon,data.x,data.y]);

        addIndices(indices,[
            points+0,points+1,points+2,
            points+1,points+2,points+3
        ]);
        points += 4;

        
        
        return {
            vertices:vertices,
            indices:indices,
        };
    }

}

function addData(vertices,attrData) {
    attrData.forEach(function (data) {
        vertices.push(data);
    });
}

function addIndices(indices,attrIndex) {
    attrIndex.forEach(function (data) {
        indices.push(data);
    });
}
