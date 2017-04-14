/**
 * Created by chengang on 17-3-28.
 */

import utils from '../../../util'
import vert from './glsl/flag-vert.glsl'
import frag from './glsl/flag-frag.glsl'

class Flag{
    constructor(){
        this.POINTS = 1;
        this.ATTRIBUTES = 3;

        this.shaderVert = vert;
        this.shaderFrag = frag;

        this.arrayBuffer = null;
        this.dataBuffer = null;
        this.strip = 3 * 4;
    }

    getRenderData({data,textureLoader}){
        var node = data;
        return node.flag ? [node.x+node.size*0.5,node.y+node.size*0.5,node.size] : null;
    }

    render({gl,program,data,matrix,camera,sampleRatio,textureLoader}){
        // debugger

        if(!this.dataBuffer) this.dataBuffer = gl.createBuffer();

        var positionLocation = gl.getAttribLocation(program, "a_position");
        var sizeLocation = gl.getAttribLocation(program, "a_size");


        var matrixLocation = gl.getUniformLocation(program, "u_matrix");
        var cameraScaleLocation = gl.getUniformLocation(program, "u_camera_scale");
        var sampleRatioLocation = gl.getUniformLocation(program, "u_sample_ratio");


        var len = (data.length / this.ATTRIBUTES) | 0;

        // debugger
        if(!this.arrayBuffer || len * this.strip != this.arrayBuffer.byteLength){
            this.arrayBuffer = new ArrayBuffer(len * this.strip);
        }

        var float32View = new Float32Array(this.arrayBuffer);

        var offset32 = this.strip/4;
        for(var i = 0;i< len;i++){
            float32View[i*offset32+0] = data[i*this.ATTRIBUTES+0];//x
            float32View[i*offset32+1] = data[i*this.ATTRIBUTES+1];//y
            float32View[i*offset32+2] = data[i*this.ATTRIBUTES+2];//size
        }

        // debugger

        gl.bindBuffer(gl.ARRAY_BUFFER, this.dataBuffer);
        gl.bufferData(gl.ARRAY_BUFFER,this.arrayBuffer , gl.STATIC_DRAW);


        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, this.strip, 0);
        gl.vertexAttribPointer(sizeLocation, 1, gl.FLOAT, false, this.strip, 2*4);



        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.enableVertexAttribArray(positionLocation);
        gl.enableVertexAttribArray(sizeLocation);

        gl.uniformMatrix3fv(matrixLocation, false,new Float32Array(matrix));
        gl.uniform1f(cameraScaleLocation,camera.scale);
        gl.uniform1f(sampleRatioLocation,sampleRatio);

        gl.drawArrays(gl.POINTS, 0, len);


    }
}


export default Flag;