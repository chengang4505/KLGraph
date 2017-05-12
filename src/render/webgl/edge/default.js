/**
 * Created by chengang on 17-3-31.
 */

import util from '../../../util'

import edgeVert from './glsl/default-vert.glsl'
import edgeFrag from './glsl/default-frag.glsl'

function addData(arr,attributes,attrData) {
    for(var i = 0;i< attributes;i++){
        arr.push(attrData[i]);
    }
}

export  default class Edge{
    constructor(){
        this.POINTS = 9;
        this.ATTRIBUTES = 9 ;

        this.shaderVert = edgeVert;
        this.shaderFrag = edgeFrag;

        this.arrayBuffer = null;
        this.dataBuffer = null;
        this.strip = 5*4 + 1*4;
    }

    getRenderData({data,source,target}){
        var edge = data;
        var dx = target.x - source.x;
        var dy = target.y - source.y;

        data = [];
        var size = 0.8,arrowSize =6;
        var crossVector = util.normalize([-dy,dx]);

        //arrow
        var targetSize = Math.max(util.getNodeSizeX(target),util.getNodeSizeY(target));
        var dis = util.getDistance(source.x,source.y,target.x,target.y);
        var arrowX = target.x - (targetSize + arrowSize)/dis * dx;
        var arrowY = target.y - (targetSize + arrowSize)/dis * dy;

        var color = util.parseColor(edge.color||source.color || '#b3d2ff');

        addData(data,this.ATTRIBUTES,[source.x,source.y,crossVector[0],crossVector[1],size,color.r,color.g,color.b,color.a]);
        addData(data,this.ATTRIBUTES,[arrowX,arrowY,crossVector[0],crossVector[1],size,color.r,color.g,color.b,color.a]);
        addData(data,this.ATTRIBUTES,[source.x,source.y,-crossVector[0],-crossVector[1],size,color.r,color.g,color.b,color.a]);
        addData(data,this.ATTRIBUTES,[arrowX,arrowY,crossVector[0],crossVector[1],size,color.r,color.g,color.b,color.a]);
        addData(data,this.ATTRIBUTES,[source.x,source.y,-crossVector[0],-crossVector[1],size,color.r,color.g,color.b,color.a]);
        addData(data,this.ATTRIBUTES,[arrowX,arrowY,-crossVector[0],-crossVector[1],size,color.r,color.g,color.b,color.a]);

        //arrow
        addData(data,this.ATTRIBUTES,[arrowX,arrowY,crossVector[0],crossVector[1],arrowSize/2,color.r,color.g,color.b,color.a]);
        addData(data,this.ATTRIBUTES,[arrowX,arrowY,-crossVector[0],-crossVector[1],arrowSize/2,color.r,color.g,color.b,color.a]);
        addData(data,this.ATTRIBUTES,[arrowX,arrowY,arrowSize/dis * dx,arrowSize/dis * dy,1,color.r,color.g,color.b,color.a]);


        return data;
    }

    render({gl,program,data,matrix,camera}){
        if(!this.dataBuffer) this.dataBuffer = gl.createBuffer();

        var positionLocation = gl.getAttribLocation(program, "a_position");
        var normalLocation = gl.getAttribLocation(program, "a_normal");
        var colorLocation = gl.getAttribLocation(program, "a_color");
        var sizeLocation = gl.getAttribLocation(program, "a_size");

        var matrixLocation = gl.getUniformLocation(program, "u_matrix");


        var len = (data.length / this.ATTRIBUTES) | 0;

        if(!this.arrayBuffer || len * this.strip != this.arrayBuffer.byteLength){
            this.arrayBuffer = new ArrayBuffer(len * this.strip);
        }

        var float32View = new Float32Array(this.arrayBuffer);
        var Uint8View = new Uint8Array(this.arrayBuffer);

        var offset32 = this.strip/4,offset8 = this.strip;
        for(var i = 0;i< len;i++){
            float32View[i*offset32+0] = data[i*this.ATTRIBUTES+0];
            float32View[i*offset32+1] = data[i*this.ATTRIBUTES+1];
            float32View[i*offset32+2] = data[i*this.ATTRIBUTES+2];
            float32View[i*offset32+3] = data[i*this.ATTRIBUTES+3];
            float32View[i*offset32+4] = data[i*this.ATTRIBUTES+4];

            Uint8View[i*offset8+20] = data[i*this.ATTRIBUTES+5];
            Uint8View[i*offset8+21] = data[i*this.ATTRIBUTES+6];
            Uint8View[i*offset8+22] = data[i*this.ATTRIBUTES+7];
            Uint8View[i*offset8+23] = data[i*this.ATTRIBUTES+8];
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, this.dataBuffer);
        gl.bufferData(gl.ARRAY_BUFFER,this.arrayBuffer , gl.STATIC_DRAW);

        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, this.strip, 0);
        gl.vertexAttribPointer(normalLocation, 2, gl.FLOAT, false, this.strip, 2*4);
        gl.vertexAttribPointer(sizeLocation, 1, gl.FLOAT, false, this.strip, 4*4);
        gl.vertexAttribPointer(colorLocation, 4, gl.UNSIGNED_BYTE, false, this.strip, 5*4);



        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.enableVertexAttribArray(positionLocation);
        gl.enableVertexAttribArray(normalLocation);
        gl.enableVertexAttribArray(sizeLocation);
        gl.enableVertexAttribArray(colorLocation);

        gl.uniformMatrix3fv(matrixLocation, false,new Float32Array(matrix));


        gl.drawArrays(gl.TRIANGLES, 0, len);
    }
}