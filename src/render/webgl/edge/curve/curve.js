
'use strict'

import util from '../../../../util'

import vert from './vert.glsl'
import frag from './frag.glsl'

function addData(arr,attributes,attrData) {
    for(var i = 0;i< attributes;i++){
        arr.push(attrData[i]);
    }
}


function scaleTrangles(points, scale) {
    scale = scale || 1.4;
    var p1_x = points[0],
        p1_y = points[1],
        p2_x = points[2],
        p2_y = points[3],
        p3_x = points[4],
        p3_y = points[5];

    var avg_x = (p1_x + p2_x + p3_x) / 3,
        avg_y = (p1_y + p2_y + p3_y) / 3;

    var p1_x_new = avg_x + (p1_x - avg_x) * scale,
        p1_y_new = avg_y + (p1_y - avg_y) * scale,
        p2_x_new = avg_x + (p2_x - avg_x) * scale,
        p2_y_new = avg_y + (p2_y - avg_y) * scale,
        p3_x_new = avg_x + (p3_x - avg_x) * scale,
        p3_y_new = avg_y + (p3_y - avg_y) * scale;

    return [p1_x_new, p1_y_new, p2_x_new, p2_y_new, p3_x_new, p3_y_new];
}



export  default class Curve{
    constructor(){
        // this.POINTS = 9;
        this.ATTRIBUTES = 11 ;

        this.shaderVert = vert;
        this.shaderFrag = frag;

        this.arrayBuffer = null;
        this.dataBuffer = null;
        this.strip = 6*4 + 4 + 4;
    }

    getRenderData({data,source,target}){
        var edge = data;
        var dx = target.x - source.x;
        var dy = target.y - source.y;

        var dis = util.getDistance(source.x,source.y,target.x,target.y);
        var tSize = Math.max(util.getNodeSizeX(target),util.getNodeSizeY(target));

        var aSize = 3, vX, vY;

        var tX = target.x - tSize / dis * dx;
        var tY = target.y - tSize / dis * dy;


        var ctrlP = util.getControlPos(source.x,source.y,tX,tY,edge.curveCount,edge.curveOrder);

        data = [];

        //arrow
        var dx1 = tX - ctrlP[0],dy1 = tY - ctrlP[1];
        var dis1 = util.getDistance(tX,tY,ctrlP[0],ctrlP[1]);

        vX = aSize/dis1 * dx1;
        vY = aSize/dis1 * dy1;

        var arrowX = tX - vX,
            arrowY = tY - vY;


        //curve
        var color = util.parseColor(edge.color||source.color || '#b3d2ff');

        var scalePos = scaleTrangles([source.x,source.y,ctrlP[0],ctrlP[1],tX-vX,tY-vY]);
        var scaleUV = scaleTrangles([1,1,0.5,0,0,0]);


        var dashed = edge.dashed ? 1:0;
        // debugger
        //curve
        addData(data,this.ATTRIBUTES,[scalePos[0],scalePos[1],scaleUV[0],scaleUV[1],dis,0,color.r,color.g,color.b,color.a,dashed]);
        addData(data,this.ATTRIBUTES,[scalePos[2],scalePos[3],scaleUV[2],scaleUV[3],dis,0,color.r,color.g,color.b,color.a,dashed]);
        addData(data,this.ATTRIBUTES,[scalePos[4],scalePos[5],scaleUV[4],scaleUV[5],dis,0,color.r,color.g,color.b,color.a,dashed]);


        //arrow
        addData(data,this.ATTRIBUTES,[arrowX+vX,arrowY+vY,0,0,0,1,color.r,color.g,color.b,color.a,dashed]);
        addData(data,this.ATTRIBUTES,[arrowX + vY * 0.6,arrowY - vX * 0.6,0,0,0,1,color.r,color.g,color.b,color.a,dashed]);
        addData(data,this.ATTRIBUTES,[arrowX - vY * 0.6,arrowY + vX * 0.6,0,0,0,1,color.r,color.g,color.b,color.a,dashed]);


        return data;
    }

    render({gl,program,data,matrix,camera}){
        if(!this.dataBuffer) this.dataBuffer = gl.createBuffer();

        // debugger
        var positionLocation = gl.getAttribLocation(program, "a_position");
        var uvLocation = gl.getAttribLocation(program, "a_uv");
        var disLocation = gl.getAttribLocation(program, "a_dis");
        var flagLocation = gl.getAttribLocation(program, "a_flag");
        var colorLocation = gl.getAttribLocation(program, "a_color");
        var dashedLocation = gl.getAttribLocation(program, "a_dashed");

        var matrixLocation = gl.getUniformLocation(program, "u_matrix");
        var cameraScaleLocation = gl.getUniformLocation(program, "u_camera_scale");


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
            float32View[i*offset32+5] = data[i*this.ATTRIBUTES+5];

            Uint8View[i*offset8+25] = data[i*this.ATTRIBUTES+6];
            Uint8View[i*offset8+26] = data[i*this.ATTRIBUTES+7];
            Uint8View[i*offset8+27] = data[i*this.ATTRIBUTES+8];
            Uint8View[i*offset8+28] = data[i*this.ATTRIBUTES+9];

            float32View[i*offset32+7] = data[i*this.ATTRIBUTES+10];

        }

        gl.bindBuffer(gl.ARRAY_BUFFER, this.dataBuffer);
        gl.bufferData(gl.ARRAY_BUFFER,this.arrayBuffer , gl.STATIC_DRAW);

        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, this.strip, 0);
        gl.vertexAttribPointer(uvLocation, 2, gl.FLOAT, false, this.strip, 2*4);
        gl.vertexAttribPointer(disLocation, 1, gl.FLOAT, false, this.strip, 4*4);
        gl.vertexAttribPointer(flagLocation, 1, gl.FLOAT, false, this.strip, 5*4);
        gl.vertexAttribPointer(colorLocation, 4, gl.UNSIGNED_BYTE, false, this.strip, 6*4);
        gl.vertexAttribPointer(dashedLocation, 1, gl.FLOAT, false, this.strip, 7*4);



        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.enableVertexAttribArray(positionLocation);
        gl.enableVertexAttribArray(uvLocation);
        gl.enableVertexAttribArray(disLocation);
        gl.enableVertexAttribArray(flagLocation);
        gl.enableVertexAttribArray(colorLocation);
        gl.enableVertexAttribArray(dashedLocation);

        gl.uniformMatrix3fv(matrixLocation, false,new Float32Array(matrix));
        gl.uniform1f(cameraScaleLocation,camera.scale);


        gl.drawArrays(gl.TRIANGLES, 0, len);
    }
}