

import EventEmitter from '../../base/EventEmitter'
import TextSdf from './TextSdf'

export default class TextureText extends EventEmitter{
    constructor(){
        super();

        this.border = 2;

        this.fontSize = 48;
        this.fontFamily = 'Arial';

        this.canvas = null;

        this.textinfo = null;

        this.texts = [];

        this.sdf = new TextSdf(this.fontSize, this.fontSize/8, this.fontSize/3,null,this.fontFamily);


        // test();
    }

    createCanvasImg(texts) {

        if(!this.canvas) this.canvas = document.createElement('canvas');

        var c = this.canvas;


        var width = this.sdf.size;
        var height = width;
        var num = Math.ceil(Math.sqrt(texts.length));

        c.width  = num * (width) + 2* this.border;
        c.height  = num * (height) + 2* this.border;


        var ctx = c.getContext("2d");

        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, c.width, c.height);

        ctx.font = `bold ${this.fontSize}px ${this.fontFamily}`;
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillStyle = "#ff0000";


        var startx =this.border;
        var starty =this.border;
        var infos = {}, px, py, charWidth,data;

        this.texts = [];

        for (var i = 0; i < texts.length; i++) {

            if(this.textinfo && this.textinfo.infos[texts[i]]) continue;

            data = this.sdf.draw(texts[i]);
            charWidth = data.charWidth;

            // charWidth = ctx.measureText(texts[i]).width;

            if(startx + charWidth > c.width){
                startx = this.border;
                starty += height
            }

            ctx.putImageData(data.data, startx, starty,0,0,charWidth,data.data.height);

            // ctx.fillText(texts[i], startx, starty);


            infos[texts[i]] = {
                uvs:[
                    startx/c.width, starty/c.height,
                    (startx + charWidth)/c.width, (starty + height)/c.height,
                ],
                width:charWidth/width
            };

            this.texts.push(texts[i]);

            startx += charWidth;
        }
        // this.computeAlpha(ctx);
        this.textinfo =  {
            fontSize:this.fontSize,
            img:c,
            width:c.width,
            height:c.height,
            infos:infos
        };

        // document.body.appendChild(c);
        // c.style.position = 'absolute';
        // c.style.top = '100px';

        // this.updateGPUTexture();
    }

    computeAlpha(ctx) {

        var imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
        for (var i = 0; i < imgData.data.length; i += 4) {
            imgData.data[i + 3] = imgData.data[i];
        }

        ctx.putImageData(imgData,0,0);

    }

    attachGl(gl){

        gl.activeTexture(gl.TEXTURE10);
        gl.bindTexture(gl.TEXTURE_2D, this.createTexture(gl));
    }

    addTexts(strs){
        var len = strs.length;
        var char,num = 0;

        var texts = this.texts;
        var map = {};
        for(var i = 0;i< len;i++){
            char = strs.charAt(i);
            if(!this.textinfo.infos[char] && !map[char]){
                num++;
                map[char] = true;
                texts.push(char);
            }
        }

        if(num > 0) {
           this.clear();
            this.createCanvasImg(texts);
        }
    }

    createTexture(gl){


        var texture = gl.createTexture();

        gl.activeTexture(gl.TEXTURE10);
        gl.bindTexture(gl.TEXTURE_2D, texture);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.textinfo.img);

        return texture;
    }

    clear(){
        this.textinfo = null;
        this.texts = [];
    }

}