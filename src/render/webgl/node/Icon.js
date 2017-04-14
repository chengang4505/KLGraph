/**
 * Created by chengang on 17-3-28.
 */

import utils from '../../../util'
import vert from './glsl/icon-vert.glsl'
import frag from './glsl/icon-frag.glsl'

class Icon{
    constructor(){
        this.POINTS = 1;
        this.ATTRIBUTES = 7;

        this.shaderVert = vert;
        this.shaderFrag = frag;

        this.arrayBuffer = null;
        this.dataBuffer = null;
        this.strip = 7 * 4;
    }

    getRenderData({data,textureLoader,textureIcon}){
        var node = data;

        var iconx1,icony1,iconx2,icony2,uvs;
        var hasIcon = node.icon && textureIcon.iconinfo.infos[node.icon];

        if(hasIcon){
            uvs = textureIcon.iconinfo.infos[node.icon].uvs;
            iconx1 = uvs[0],icony1 = uvs[1],iconx2 = uvs[2], icony2 = uvs[3];
        }

        return hasIcon ? [node.x,node.y,node.size*2*0.7,iconx1 , icony1 , iconx2 , icony2] : null;
    }

    render({gl,program,data,matrix,camera,sampleRatio,textureLoader}){
        // debugger

        if(!this.dataBuffer) this.dataBuffer = gl.createBuffer();

        var positionLocation = gl.getAttribLocation(program, "a_position");
        var sizeLocation = gl.getAttribLocation(program, "a_size");

        var iconUVLocation1 = gl.getAttribLocation(program, "a_icon_uvx1");
        var iconUVLocation2 = gl.getAttribLocation(program, "a_icon_uvy1");
        var iconUVLocation3 = gl.getAttribLocation(program, "a_icon_uvx2");
        var iconUVLocation4 = gl.getAttribLocation(program, "a_icon_uvy2");


        var matrixLocation = gl.getUniformLocation(program, "u_matrix");
        var cameraScaleLocation = gl.getUniformLocation(program, "u_camera_scale");
        var sampleRatioLocation = gl.getUniformLocation(program, "u_sample_ratio");
        var iconTextureLocation = gl.getUniformLocation(program, "u_icons_texture");


        var len = (data.length / this.ATTRIBUTES) | 0;

        // debugger
        if(!this.arrayBuffer || len * this.strip != this.arrayBuffer.byteLength){
            this.arrayBuffer = new ArrayBuffer(len * this.strip);
        }

        var float32View = new Float32Array(this.arrayBuffer);

        var offset32 = this.strip/4;
        for(var i = 0;i< len;i++){
            float32View[i*offset32+0] = data[i*this.ATTRIBUTES+0];
            float32View[i*offset32+1] = data[i*this.ATTRIBUTES+1];
            float32View[i*offset32+2] = data[i*this.ATTRIBUTES+2];

            float32View[i*offset32+3] = data[i*this.ATTRIBUTES+3];
            float32View[i*offset32+4] = data[i*this.ATTRIBUTES+4];
            float32View[i*offset32+5] = data[i*this.ATTRIBUTES+5];
            float32View[i*offset32+6] = data[i*this.ATTRIBUTES+6];
        }

        // debugger

        gl.bindBuffer(gl.ARRAY_BUFFER, this.dataBuffer);
        gl.bufferData(gl.ARRAY_BUFFER,this.arrayBuffer , gl.STATIC_DRAW);


        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, this.strip, 0);
        gl.vertexAttribPointer(sizeLocation, 1, gl.FLOAT, false, this.strip, 2*4);
        gl.vertexAttribPointer(iconUVLocation1, 1, gl.FLOAT, false, this.strip, 3*4);
        gl.vertexAttribPointer(iconUVLocation2, 1, gl.FLOAT, false, this.strip, 4*4);
        gl.vertexAttribPointer(iconUVLocation3, 1, gl.FLOAT, false, this.strip, 5*4);
        gl.vertexAttribPointer(iconUVLocation4, 1, gl.FLOAT, false, this.strip, 6*4);



        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.enableVertexAttribArray(positionLocation);
        gl.enableVertexAttribArray(sizeLocation);
        gl.enableVertexAttribArray(iconUVLocation1);
        gl.enableVertexAttribArray(iconUVLocation2);
        gl.enableVertexAttribArray(iconUVLocation3);
        gl.enableVertexAttribArray(iconUVLocation4);

        gl.uniformMatrix3fv(matrixLocation, false,new Float32Array(matrix));
        gl.uniform1f(cameraScaleLocation,camera.scale);
        gl.uniform1f(sampleRatioLocation,sampleRatio);
        gl.uniform1i(iconTextureLocation,11);


        gl.drawArrays(gl.POINTS, 0, len);


    }
}


export default Icon;