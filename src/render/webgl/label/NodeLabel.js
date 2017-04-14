/**
 * Created by chengang on 17-4-7.
 */
import vert from './glsl/node-label-vert.glsl'
import frag from './glsl/label-frag.glsl'


function addData(arr,attributes,attrData) {
    for(var i = 0;i< attributes;i++){
        arr.push(attrData[i]);
    }
}

export default class NodeLabel{
    constructor(){
        // this.POINTS = 1;
        this.ATTRIBUTES = 4;

        this.shaderVert = vert;
        this.shaderFrag = frag;

        this.arrayBuffer = null;
        this.dataBuffer = null;
        this.strip = 4 * 4 ;
    }

    getRenderData({data,textureText}){
        var node  = data;
        if(!node.label) return [];

        // debugger
        var str = node.label.split('');

        var data = [];

        var infos = textureText.textinfo.infos,
            charWidth = node.size/2,
            charHeight = node.size/2,
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


        var startx = totalWidht/2 * -1 + node.x;
        var starty =  node.y - node.size;
        var x1,y1,x2,y2;

        for(var i = 0;i< str.length;i++){
            char = str[i];
            if(!infos[char]){
                console.log(1);
                continue;
            }

            width = infos[char].width * charWidth;
            uv = infos[char].uvs;
            x1 = uv[0],y1 = uv[1],x2 = uv[2],y2 = uv[3];

            addData(data,this.ATTRIBUTES,[startx,starty,x1,y1]);
            addData(data,this.ATTRIBUTES,[startx,starty-charHeight,x1,y2]);
            addData(data,this.ATTRIBUTES,[startx+width,starty,x2,y1]);
            addData(data,this.ATTRIBUTES,[startx,starty-charHeight,x1,y2]);
            addData(data,this.ATTRIBUTES,[startx+width,starty,x2,y1]);
            addData(data,this.ATTRIBUTES,[startx+width,starty-charHeight,x2,y2]);

            startx += width;
        }

        return data;
    }

    render({gl,program,data,matrix,camera,textureLoader}){
        if(!this.dataBuffer) this.dataBuffer = gl.createBuffer();

        var positionLocation = gl.getAttribLocation(program, "a_position");
        var uvLocation = gl.getAttribLocation(program, "a_uv");

        var matrixLocation = gl.getUniformLocation(program, "u_matrix");
        var imageLocation = gl.getUniformLocation(program, "u_image");


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
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, this.dataBuffer);
        gl.bufferData(gl.ARRAY_BUFFER,this.arrayBuffer , gl.STATIC_DRAW);

        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, this.strip, 0);
        gl.vertexAttribPointer(uvLocation, 2, gl.FLOAT, false, this.strip, 2*4);



        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.enableVertexAttribArray(positionLocation);
        gl.enableVertexAttribArray(uvLocation);

        gl.uniformMatrix3fv(matrixLocation, false,new Float32Array(matrix));
        gl.uniform1i(imageLocation, 10);


        gl.drawArrays(gl.TRIANGLES, 0, len);
    }
}