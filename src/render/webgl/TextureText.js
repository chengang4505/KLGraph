

import EventEmitter from '../../base/EventEmitter'
import TextSdf from './TextSdf'

export default class TextureText extends EventEmitter{
    constructor(gl){
        super();

        this.gl = gl;

        this.texture = null;

        this.border = 2;

        this.fontSize = 48;
        this.fontFamily = 'Arial';

        this.canvas = null;

        this.textinfo = null;

        this.texts = null;

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

        this.updateGPUTexture();
    }

    computeAlpha(ctx) {

        var imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
        for (var i = 0; i < imgData.data.length; i += 4) {
            imgData.data[i + 3] = imgData.data[i];
        }

        ctx.putImageData(imgData,0,0);

    }

    updateGPUTexture(){
        var gl = this.gl;

        this.createTexture();

        gl.activeTexture(gl.TEXTURE10);
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
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

    createTexture(){

        var gl = this.gl;

        if(!this.texture) {
            this.texture = gl.createTexture();
        }
        gl.activeTexture(gl.TEXTURE10);
        gl.bindTexture(gl.TEXTURE_2D, this.texture);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.textinfo.img);
    }

    clear(){
        this.textinfo = null;
        this.texts = null;
    }

}

function test() {
    var chars = '泽材abcdefghkilmnopqrstuvwxyz灭逐莫笔亡鲜';
    var fontSize = 24;

    var sdf = new TextSdf(fontSize, fontSize/8, fontSize/3,null,'Arial');

    var canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    canvas.style.position = 'absolute';
    canvas.style.top = '200px';

    var ctx = canvas.getContext('2d');

    var now = performance.now();
    var startx = 0,stary=0,data;
    for (var i = 0;i< chars.length;i++) {
        data = sdf.draw(chars[i]);
        if(startx + data.charWidth + 0 >= canvas.width){
            stary += sdf.size;
            startx = 0;
        }

        ctx.putImageData(data.data, startx, stary,0,0,data.charWidth,data.data.height);

        startx += data.charWidth + 0;
    }
   console.log(Math.round(performance.now() - now) + 'ms.');

    document.body.appendChild(canvas);

}