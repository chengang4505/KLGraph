/**
 * Created by chengang on 17-4-7.
 */

import util from '../../../util'
import mat3 from '../../../base/Matrix'

import vert from './glsl/node-label-vert.glsl'
import frag from './glsl/label-frag.glsl'


function addData(arr,attributes,attrData,centerX,centerY,angle) {
    var rotate = mat3.transformPoint([attrData[0],attrData[1]],mat3.matrixFromRotation(angle));
    attrData[0] = rotate[0] + centerX;
    attrData[1] = rotate[1] + centerY;

    for(var i = 0;i< attributes;i++){
        arr.push(attrData[i]);
    }
}

export default class NodeLabel{
    constructor(){
        // this.POINTS = 1;
        this.ATTRIBUTES = 5;

        this.shaderVert = vert;
        this.shaderFrag = frag;

        this.arrayBuffer = null;
        this.dataBuffer = null;
        this.strip = 4 * 5 ;
    }

    getRenderData({data,source,target,textureText}){
        var edge = data;
        if(!edge.label) return [];

        // debugger
        var str = edge.label.split('');

        data = [];

        var size = edge.fontSize ||  Math.max(util.getNodeSizeX(source),util.getNodeSizeY(source))/3;
        var infos = textureText.textinfo.infos,
            charWidth = size,
            charHeight = size,
            char,uv,width;

        var totalWidht = 0;
        for(var i = 0;i< str.length;i++) {
            char = str[i];
            if (!infos[char]) {
                console.log(1);
                continue;
            }
            totalWidht +=infos[char].width * charWidth
        }

        var dx = target.x - source.x;
        var dy = target.y - source.y;

        var angle = util.getAngle(1,0,dx,dy);

        angle = dy < 0 ? Math.PI-angle:angle;
        angle = angle > Math.PI/2 ? angle + Math.PI: angle;

        var centerX = (source.x + target.x)/2, centerY = (source.y + target.y)/2;
        var startx = totalWidht/2 * -1;
        var starty =  charHeight/2;
        var x1,y1,x2,y2;



        for(var i = 0;i< str.length;i++){
            char = str[i];
            if(!infos[char]){
                console.log('no text texture info');
                continue;
            }

            width = infos[char].width * charWidth;
            uv = infos[char].uvs;
            x1 = uv[0],y1 = uv[1],x2 = uv[2],y2 = uv[3];

            addData(data,this.ATTRIBUTES,[startx,starty,x1,y1,width],centerX,centerY,angle);
            addData(data,this.ATTRIBUTES,[startx,starty-charHeight,x1,y2,width],centerX,centerY,angle);
            addData(data,this.ATTRIBUTES,[startx+width,starty,x2,y1,width],centerX,centerY,angle);
            addData(data,this.ATTRIBUTES,[startx,starty-charHeight,x1,y2,width],centerX,centerY,angle);
            addData(data,this.ATTRIBUTES,[startx+width,starty,x2,y1,width],centerX,centerY,angle);
            addData(data,this.ATTRIBUTES,[startx+width,starty-charHeight,x2,y2,width],centerX,centerY,angle);

            startx += width;
        }

        return data;
    }

    render({gl,program,data,matrix,camera,textureLoader}){
        if(!this.dataBuffer) this.dataBuffer = gl.createBuffer();

        var positionLocation = gl.getAttribLocation(program, "a_position");
        var uvLocation = gl.getAttribLocation(program, "a_uv");
        var sizeLocation = gl.getAttribLocation(program, "a_size");

        var matrixLocation = gl.getUniformLocation(program, "u_matrix");
        var imageLocation = gl.getUniformLocation(program, "u_image");
        var cameaScaleLocation = gl.getUniformLocation(program, "u_camera_scale");


        var len = (data.length / this.ATTRIBUTES) | 0;

        if(!this.arrayBuffer || len * this.strip != this.arrayBuffer.byteLength){
            this.arrayBuffer = new ArrayBuffer(len * this.strip);
        }

        var float32View = new Float32Array(this.arrayBuffer);
        // var Uint8View = new Uint8Array(this.arrayBuffer);

        var offset32 = this.strip/4,offset8 = this.strip;
        for(var i = 0;i< len;i++){
            float32View[i*offset32+0] = data[i*this.ATTRIBUTES+0];
            float32View[i*offset32+1] = data[i*this.ATTRIBUTES+1];
            float32View[i*offset32+2] = data[i*this.ATTRIBUTES+2];
            float32View[i*offset32+3] = data[i*this.ATTRIBUTES+3];
            float32View[i*offset32+4] = data[i*this.ATTRIBUTES+4];
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, this.dataBuffer);
        gl.bufferData(gl.ARRAY_BUFFER,this.arrayBuffer , gl.STATIC_DRAW);

        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, this.strip, 0);
        gl.vertexAttribPointer(uvLocation, 2, gl.FLOAT, false, this.strip, 2*4);
        gl.vertexAttribPointer(sizeLocation, 1, gl.FLOAT, false, this.strip, 4*4);


        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.enableVertexAttribArray(positionLocation);
        gl.enableVertexAttribArray(uvLocation);

        gl.uniformMatrix3fv(matrixLocation, false,new Float32Array(matrix));
        gl.uniform1i(imageLocation, 10);
        gl.uniform1f(cameaScaleLocation, camera.scale);


        gl.drawArrays(gl.TRIANGLES, 0, len);
    }
}