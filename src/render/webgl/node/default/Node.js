/**
 * Created by chengang on 17-3-28.
 */

import utils from '../../../../util'
import nodeVert from './default-vert.glsl'
import nodeFrag from './default-frag.glsl'


function addData(arr,attributes,attrData) {
    for(var i = 0;i< attributes;i++){
        arr.push(attrData[i]);
    }
}


class Node{
    constructor(){
        this.ATTRIBUTES = 12;

        this.shaderVert = nodeVert;
        this.shaderFrag = nodeFrag;

        this.arrayBuffer = null;
        this.dataBuffer = null;
        this.strip = 5 * 4+4+4+4;
    }

    getRenderData({data,textureLoader,textureIcon}){

        var node = data;
        var color = utils.parseColor(node.color || '#ff0000');

        var img = -1;
        if(node.img && textureLoader.cache.hasOwnProperty(node.img))
            img = textureLoader.cache[node.img];

        var size = node.size*2||10*2;
        var isSelected = node.selected ? 1.0 : 0.0;

        var data = [];


        //base
        addData(data,this.ATTRIBUTES,[node.x-node.size,node.y+node.size,color.r,color.g,color.b,color.a,0,0,img,isSelected,1,node.size]);
        addData(data,this.ATTRIBUTES,[node.x+node.size,node.y+node.size,color.r,color.g,color.b,color.a,1,0,img,isSelected,1,node.size]);
        addData(data,this.ATTRIBUTES,[node.x-node.size,node.y-node.size,color.r,color.g,color.b,color.a,0,1,img,isSelected,1,node.size]);
        addData(data,this.ATTRIBUTES,[node.x+node.size,node.y+node.size,color.r,color.g,color.b,color.a,1,0,img,isSelected,1,node.size]);
        addData(data,this.ATTRIBUTES,[node.x-node.size,node.y-node.size,color.r,color.g,color.b,color.a,0,1,img,isSelected,1,node.size]);
        addData(data,this.ATTRIBUTES,[node.x+node.size,node.y-node.size,color.r,color.g,color.b,color.a,1,1,img,isSelected,1,node.size]);


        var hasIcon = node.icon && textureIcon.iconinfo.infos[node.icon],uvs;
        var scale = 0.7;
        //icon
        if(hasIcon){

            uvs = textureIcon.iconinfo.infos[node.icon].uvs;
            addData(data,this.ATTRIBUTES,[node.x-node.size*scale,node.y+node.size*scale,color.r,color.g,color.b,color.a,uvs[0],uvs[1],-2,isSelected,2,node.size]);
            addData(data,this.ATTRIBUTES,[node.x+node.size*scale,node.y+node.size*scale,color.r,color.g,color.b,color.a,uvs[2],uvs[1],-2,isSelected,2,node.size]);
            addData(data,this.ATTRIBUTES,[node.x-node.size*scale,node.y-node.size*scale,color.r,color.g,color.b,color.a,uvs[0],uvs[3],-2,isSelected,2,node.size]);
            addData(data,this.ATTRIBUTES,[node.x+node.size*scale,node.y+node.size*scale,color.r,color.g,color.b,color.a,uvs[2],uvs[1],-2,isSelected,2,node.size]);
            addData(data,this.ATTRIBUTES,[node.x-node.size*scale,node.y-node.size*scale,color.r,color.g,color.b,color.a,uvs[0],uvs[3],-2,isSelected,2,node.size]);
            addData(data,this.ATTRIBUTES,[node.x+node.size*scale,node.y-node.size*scale,color.r,color.g,color.b,color.a,uvs[2],uvs[3],-2,isSelected,2,node.size]);
        }


        return data;
    }

    render({gl,program,data,matrix,camera,sampleRatio,textureLoader}){
        // debugger

        if(!this.dataBuffer) this.dataBuffer = gl.createBuffer();

        var positionLocation = gl.getAttribLocation(program, "a_position");
        var colorLocation = gl.getAttribLocation(program, "a_color");
        var imgLocation = gl.getAttribLocation(program, "a_img");
        var selectedLocation = gl.getAttribLocation(program, "a_selected");
        var uvLocation = gl.getAttribLocation(program, "a_uv");
        var flagLocation = gl.getAttribLocation(program, "a_flag");
        var sizeLocation = gl.getAttribLocation(program, "a_size");


        var matrixLocation = gl.getUniformLocation(program, "u_matrix");
        var cameraScaleLocation = gl.getUniformLocation(program, "u_camera_scale");
        var texturesLocation = gl.getUniformLocation(program, "u_textures");
        var borderColorLocation = gl.getUniformLocation(program, "u_borderColor");
        var sampleRatioLocation = gl.getUniformLocation(program, "u_sample_ratio");
        var iconTextureLocation = gl.getUniformLocation(program, "u_icons_texture");


        var len = (data.length / this.ATTRIBUTES) | 0;

        // debugger
        if(!this.arrayBuffer || len * this.strip != this.arrayBuffer.byteLength){
            this.arrayBuffer = new ArrayBuffer(len * this.strip);
        }

        var float32View = new Float32Array(this.arrayBuffer);
        var Uint8View = new Uint8Array(this.arrayBuffer);
        var int8View = new Int8Array(this.arrayBuffer);
        var int16View = new Int16Array(this.arrayBuffer);

        var offset32 = this.strip/4,offset16 = this.strip/2;
        for(var i = 0;i< len;i++){
            float32View[i*offset32+0] = data[i*this.ATTRIBUTES+0];//x
            float32View[i*offset32+1] = data[i*this.ATTRIBUTES+1];//y

            Uint8View[i*this.strip+8] = data[i*this.ATTRIBUTES+2];//color.r
            Uint8View[i*this.strip+9] = data[i*this.ATTRIBUTES+3];//color.g
            Uint8View[i*this.strip+10] = data[i*this.ATTRIBUTES+4];//color.b
            Uint8View[i*this.strip+11] = data[i*this.ATTRIBUTES+5];//color.a

            float32View[i*offset32+3] = data[i*this.ATTRIBUTES+6];//u
            float32View[i*offset32+4] = data[i*this.ATTRIBUTES+7];//v

            int16View[i*offset16+10] = data[i*this.ATTRIBUTES+8];//img
            int16View[i*offset16+11] = data[i*this.ATTRIBUTES+9];//selected

            float32View[i*offset32+6] = data[i*this.ATTRIBUTES+10];//flag
            float32View[i*offset32+7] = data[i*this.ATTRIBUTES+11];//size

        }

        // debugger

        gl.bindBuffer(gl.ARRAY_BUFFER, this.dataBuffer);
        gl.bufferData(gl.ARRAY_BUFFER,this.arrayBuffer , gl.STATIC_DRAW);


        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, this.strip, 0);
        gl.vertexAttribPointer(colorLocation, 4, gl.UNSIGNED_BYTE, false,  this.strip, 2*4);
        gl.vertexAttribPointer(uvLocation, 2, gl.FLOAT, false,  this.strip, 3*4);
        gl.vertexAttribPointer(imgLocation, 1, gl.SHORT, false, this.strip, 5*4);
        gl.vertexAttribPointer(selectedLocation, 1, gl.SHORT, false, this.strip,  5*4+2);
        gl.vertexAttribPointer(flagLocation, 1, gl.FLOAT, false, this.strip, 6*4);
        gl.vertexAttribPointer(sizeLocation, 1, gl.FLOAT, false, this.strip, 7*4);


        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.enableVertexAttribArray(positionLocation);
        gl.enableVertexAttribArray(colorLocation);
        gl.enableVertexAttribArray(imgLocation);
        gl.enableVertexAttribArray(selectedLocation);
        gl.enableVertexAttribArray(uvLocation);
        gl.enableVertexAttribArray(flagLocation);
        gl.enableVertexAttribArray(sizeLocation);


        gl.uniformMatrix3fv(matrixLocation, false,new Float32Array(matrix));
        gl.uniform1f(cameraScaleLocation,camera.scale);
        gl.uniform1f(sampleRatioLocation,sampleRatio);
        gl.uniform4f(borderColorLocation,212, 82, 95,255.0);

        gl.uniform1iv(texturesLocation,textureLoader.texturesIndex);
        gl.uniform1i(iconTextureLocation,11);

        gl.drawArrays(gl.TRIANGLES, 0, len);


    }
}


export default Node;