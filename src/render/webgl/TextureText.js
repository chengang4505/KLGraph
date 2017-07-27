

import EventEmitter from '../../base/EventEmitter'
import TextSDF from './TextSDF'

export default class TextureText extends EventEmitter{
    constructor(config,unit){
        super();

        this.border = 2;

        this.unit = unit || 1;
        this.fontSize = 48;
        this.fontFamily = config.textureTextFontFamily;

        this.textureTextWidth = config.textureTextWidth;
        this.textureTextHeight = config.textureTextHeight;

        this.canvas = null;
        this.textinfo = null;

        this.startx = this.border;
        this.starty = this.border;

        this.texts = [];

        this.sdf = new TextSDF(this.fontSize, this.fontSize/8, this.fontSize/3,null,this.fontFamily);

        this.init();

        // test();
    }

    init(){
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext("2d");
        this.resize(this.textureTextWidth,this.textureTextHeight);
    }

    resize(width,height){
        var ctx = this.ctx;
        this.canvas.width = width;
        this.canvas.height = height;

        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        ctx.font = `bold ${this.fontSize}px ${this.fontFamily}`;
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillStyle = "#ff0000";

        this.textinfo =  {
            fontSize:this.fontSize,
            img:this.canvas,
            width:this.canvas.width,
            height:this.canvas.height,
            infos:{}
        };

        this.startx = this.border;
        this.starty = this.border;

        this.texts = [];
    }

    needResize(num){
        var width = this.canvas.width;
        var height = this.canvas.height;

        var size = this.sdf.size + 2;

        //leave column of no use in y
        var leaveNumY = Math.floor((height - this.starty - size - this.border) / size);
        //num of char in a row
        var numN = Math.floor((width - 2*this.border) / size);
        // total num
        var leaveNum = leaveNumY * numN /*+ (width - this.startx - this.border) / this.sdf.size*/;

        return  leaveNum <= num;
    }

    getSize(totalN){
        var width = this.canvas.width;
        var height = this.canvas.height;
        var numY,numN,totalNum;
        var size = this.sdf.size + 2;

        do{
            if(width <= height)width *= 2;
            else height *= 2;

            numY = Math.floor((height - 2 * this.border) / size);
            numN = Math.floor((width - 2*this.border) / size);
            totalNum = numY * numN;
        }while (totalNum < totalN);

        return {width:width,height:height};

    }

    addTexts(texts) {

        if(!texts || texts.length < 1) return;

        var oldTexts,resizeInfo;
        if(this.needResize(texts.length)){
            oldTexts = this.texts;
// debugger
            resizeInfo = this.getSize(texts.length + this.texts.length);
            this.resize(resizeInfo.width,resizeInfo.height);

            texts.forEach(e => oldTexts.push(e));

            texts = oldTexts;

        }


        var c = this.canvas;
        var ctx = this.ctx;

        var startx =this.startx;
        var starty =this.starty;
        var infos = this.textinfo.infos, charWidth,data;


        for (var i = 0; i < texts.length; i++) {

            if(this.textinfo && infos[texts[i]]) continue;

            data = this.sdf.draw(texts[i]);
            charWidth = data.charWidth;

            if(startx + charWidth > c.width){
                startx = this.border;
                starty += this.sdf.size;
                if((starty + this.sdf.size) > this.canvas.height) console.error('texture text height err')
            }

            ctx.putImageData(data.data, startx, starty,0,0,charWidth,this.sdf.size);

            infos[texts[i]] = {
                uvs:[
                    startx/c.width, starty/c.height,
                    (startx + charWidth)/c.width, (starty + this.sdf.size)/c.height,
                ],
                width:charWidth/this.sdf.size
            };

            this.texts.push(texts[i]);

            startx += charWidth;
        }

        this.startx = startx;
        this.starty = starty;

        // document.body.appendChild(c);
        // c.style.position = 'absolute';
        // c.style.top = '100px';

    }

    attachGl(gl,unit){
        if(unit !== undefined && unit !== null)  this.unit = unit;
        gl.activeTexture(gl.TEXTURE0+this.unit);
        gl.bindTexture(gl.TEXTURE_2D, this.createTexture(gl));
    }

    createTexture(gl){
        var texture = gl.createTexture();

        gl.activeTexture(gl.TEXTURE0+this.unit);
        gl.bindTexture(gl.TEXTURE_2D, texture);

        //NEAREST LINEAR
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.textinfo.img);

        return texture;
    }

    clear(){
        this.resize(this.canvas.width,this.canvas.height);
    }

}