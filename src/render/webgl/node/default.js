/**
 * Created by chengang on 17-3-28.
 */

import utils from '../../../util'
import nodeVert from './glsl/default-vert.glsl'
import nodeFrag from './glsl/default-frag.glsl'

class Node{
    constructor(){
        this.POINTS = 1;
        this.ATTRIBUTES = 9;

        this.shaderVert = nodeVert;
        this.shaderFrag = nodeFrag;

        this.arrayBuffer = null;
        this.dataBuffer = null;
        this.strip = 4 * 4 + 4 + 4;
    }

    getRenderData({data,textureLoader,textureIcon}){
        var node = data;
        var color = utils.parseColor(node.color || '#ff0000');
        var img = -1;
        if(node.img && textureLoader.cache[node.img])
            img = textureLoader.cache[node.img];

        var size = node.size*2||10*2;
        var isSelected = node.selected ? 1.0 : 0.0;

        return [
            node.x,node.y,size,
            color.r,color.g,color.b,color.a,
            img,isSelected
        ];
    }

    render({gl,program,data,matrix,camera,sampleRatio,textureLoader}){
        // debugger

       if(!this.dataBuffer) this.dataBuffer = gl.createBuffer();

        var positionLocation = gl.getAttribLocation(program, "a_position");
        var sizeLocation = gl.getAttribLocation(program, "a_size");
        var colorLocation = gl.getAttribLocation(program, "a_color");
        var imgLocation = gl.getAttribLocation(program, "a_img");
        var selectedLocation = gl.getAttribLocation(program, "a_selected");


        var matrixLocation = gl.getUniformLocation(program, "u_matrix");
        var cameraScaleLocation = gl.getUniformLocation(program, "u_camera_scale");
        var texturesLocation = gl.getUniformLocation(program, "u_textures");
        var borderColorLocation = gl.getUniformLocation(program, "u_borderColor");
        var sampleRatioLocation = gl.getUniformLocation(program, "u_sample_ratio");


        var len = (data.length / this.ATTRIBUTES) | 0;

        // debugger
        if(!this.arrayBuffer || len * this.strip != this.arrayBuffer.byteLength){
            this.arrayBuffer = new ArrayBuffer(len * this.strip);
        }

        var float32View = new Float32Array(this.arrayBuffer);
        var int8View = new Uint8Array(this.arrayBuffer);

        var offset32 = this.strip/4;
        for(var i = 0;i< len;i++){
            float32View[i*offset32+0] = data[i*this.ATTRIBUTES+0];//x
            float32View[i*offset32+1] = data[i*this.ATTRIBUTES+1];//y
            float32View[i*offset32+2] = data[i*this.ATTRIBUTES+2];//size
            float32View[i*offset32+4] = data[i*this.ATTRIBUTES+7];//img
            float32View[i*offset32+5] = data[i*this.ATTRIBUTES+8];//selected

            int8View[i*this.strip+12] = data[i*this.ATTRIBUTES+3];//color.r
            int8View[i*this.strip+13] = data[i*this.ATTRIBUTES+4];//color.g
            int8View[i*this.strip+14] = data[i*this.ATTRIBUTES+5];//color.b
            int8View[i*this.strip+15] = data[i*this.ATTRIBUTES+6];//color.a
        }

        // debugger

        gl.bindBuffer(gl.ARRAY_BUFFER, this.dataBuffer);
        gl.bufferData(gl.ARRAY_BUFFER,this.arrayBuffer , gl.STATIC_DRAW);


        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, this.strip, 0);
        gl.vertexAttribPointer(sizeLocation, 1, gl.FLOAT, false, this.strip, 2*4);
        gl.vertexAttribPointer(colorLocation, 4, gl.UNSIGNED_BYTE, false,  this.strip, 3*4);
        gl.vertexAttribPointer(imgLocation, 1, gl.FLOAT, false, this.strip, 4*4);
        gl.vertexAttribPointer(selectedLocation, 1, gl.FLOAT, false, this.strip, 5*4);


        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.enableVertexAttribArray(positionLocation);
        gl.enableVertexAttribArray(sizeLocation);
        gl.enableVertexAttribArray(colorLocation);
        gl.enableVertexAttribArray(imgLocation);
        gl.enableVertexAttribArray(selectedLocation);


        gl.uniformMatrix3fv(matrixLocation, false,new Float32Array(matrix));
        gl.uniform1f(cameraScaleLocation,camera.scale);
        gl.uniform1f(sampleRatioLocation,sampleRatio);
        gl.uniform4f(borderColorLocation,194.0, 97.0, 54.0,255.0);

        gl.uniform1iv(texturesLocation,textureLoader.texturesIndex);

        gl.drawArrays(gl.POINTS, 0, len);


    }
}


export default Node;