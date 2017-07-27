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
        a_icon_color: {components:4,start:14},
    },
    getUniforms({matrix, camera,config, sampleRatio, textureLoader,textureIcon}){
        var color = utils.parseColor(config.defaultNodeSelectedBorder);
        return {
            u_matrix:matrix,
            u_camera_scale:camera.scale,
            // u_textures:textureLoader.texturesIndex,
            u_borderColor: [color.r, color.g, color.b, color.a],
            u_sample_ratio:sampleRatio,
            u_icons_texture:textureIcon.unit,
        }
    },
    getRenderData({data,config, textureIcon,oldData,dirtyAttr}){
        //reuse old data
        if(oldData && dirtyAttr
            && Object.keys(dirtyAttr).length == 2
            && dirtyAttr.hasOwnProperty('x')
            && dirtyAttr.hasOwnProperty('y')
        ){
            // debugger
            var offset = 18;
            var oldVertices = oldData.vertices;
            for(var i = 0;i< oldVertices.length;i+=offset){
                oldVertices[i+12] = data.x;//x
                oldVertices[i+13] = data.y;//y
            }
            return {
                vertices:oldVertices,
                indices:oldData.indices
            };
        }

        /**
         * width height selected color iconOrImg uv center
         */

        //init data
        data.size = data.size || config.defaultNodeSize;

        var isSelected = data.selected ? 1.0 : 0.0;//selected flag
        var color = utils.parseColor(data.color || config.defaultNodeColor);//node color

        var iColor = utils.parseColor(data.iconColor || config.defaultNodeIconColor);//icon color
        var hasIcon = data.icon && textureIcon.iconinfo.infos[data.icon], uvs;

        uvs = hasIcon ? textureIcon.iconinfo.infos[data.icon].uvs : [0,0];
        hasIcon = hasIcon ? 1:0;

        var vertices = [];
        var indices = [];

        var points = 0;
        var bgScale = 1.35;

        // debugger

        //background
        addData(vertices,[-1*data.size*bgScale,+1*data.size*bgScale,color.r,color.g,color.b,color.a,0,0,isSelected,0,data.size,hasIcon,data.x,data.y,iColor.r,iColor.g,iColor.b,iColor.a]);
        addData(vertices,[+1*data.size*bgScale,+1*data.size*bgScale,color.r,color.g,color.b,color.a,1,0,isSelected,0,data.size,hasIcon,data.x,data.y,iColor.r,iColor.g,iColor.b,iColor.a]);
        addData(vertices,[-1*data.size*bgScale,-1*data.size*bgScale,color.r,color.g,color.b,color.a,0,1,isSelected,0,data.size,hasIcon,data.x,data.y,iColor.r,iColor.g,iColor.b,iColor.a]);
        addData(vertices,[+1*data.size*bgScale,-1*data.size*bgScale,color.r,color.g,color.b,color.a,1,1,isSelected,0,data.size,hasIcon,data.x,data.y,iColor.r,iColor.g,iColor.b,iColor.a]);

        addIndices(indices,[
            points+0,points+1,points+2,
            points+1,points+2,points+3
        ]);
        points += 4;


        //base
        addData(vertices,[-1*data.size,+1*data.size,color.r,color.g,color.b,color.a,0,0,isSelected,1,data.size,hasIcon,data.x,data.y,iColor.r,iColor.g,iColor.b,iColor.a]);
        addData(vertices,[+1*data.size,+1*data.size,color.r,color.g,color.b,color.a,1,0,isSelected,1,data.size,hasIcon,data.x,data.y,iColor.r,iColor.g,iColor.b,iColor.a]);
        addData(vertices,[-1*data.size,-1*data.size,color.r,color.g,color.b,color.a,0,1,isSelected,1,data.size,hasIcon,data.x,data.y,iColor.r,iColor.g,iColor.b,iColor.a]);
        addData(vertices,[+1*data.size,-1*data.size,color.r,color.g,color.b,color.a,1,1,isSelected,1,data.size,hasIcon,data.x,data.y,iColor.r,iColor.g,iColor.b,iColor.a]);

        addIndices(indices,[
            points+0,points+1,points+2,
            points+1,points+2,points+3
        ]);
        points += 4;

        //icon
        var iconInfo = data.icon ? getIconInfo(data) : {left:-1*data.size,top:data.size,right:data.size,bottom:-1*data.size};
        addData(vertices,[iconInfo.left,iconInfo.top,color.r,color.g,color.b,color.a,uvs[0],uvs[1],isSelected,2,data.size,hasIcon,data.x,data.y,iColor.r,iColor.g,iColor.b,iColor.a]);
        addData(vertices,[iconInfo.right,iconInfo.top,color.r,color.g,color.b,color.a,uvs[2],uvs[1],isSelected,2,data.size,hasIcon,data.x,data.y,iColor.r,iColor.g,iColor.b,iColor.a]);
        addData(vertices,[iconInfo.left,iconInfo.bottom,color.r,color.g,color.b,color.a,uvs[0],uvs[3],isSelected,2,data.size,hasIcon,data.x,data.y,iColor.r,iColor.g,iColor.b,iColor.a]);
        addData(vertices,[iconInfo.right,iconInfo.bottom,color.r,color.g,color.b,color.a,uvs[2],uvs[3],isSelected,2,data.size,hasIcon,data.x,data.y,iColor.r,iColor.g,iColor.b,iColor.a]);

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

function getIconInfo(data) {
    var icon = data.icon;
    var defaultConfig = {content:'',offsetX:0,offsetY:0,scale:0.65};
    icon = utils.isString(icon) ? utils.extend({content:icon},defaultConfig) : utils.extend(icon,defaultConfig);

    var size = data.size;

    return {
        left: size * -1 * icon.scale + icon.offsetX,
        right: size * icon.scale + icon.offsetX,
        top: size  * icon.scale + icon.offsetY,
        bottom: size * -1 * icon.scale + icon.offsetY,
    }
}
