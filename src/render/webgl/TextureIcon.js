/**
 * Created by chengang on 17-4-7.
 */

import EventEmitter from '../../base/EventEmitter'

export default class TextureIcon extends EventEmitter{
    constructor(gl,option){
        super();

        this.gl = gl;
        this.texture = null;

        this.textureIconWidth = option.textureIconWidth;
        this.textureIconHeight = option.textureIconHeight;

        this.fontSize = 60;
        this.fontFamily = 'FontAwesome';

        this.border = 2;
        this.width = 70;//char width
        this.height = 80;
        this.startx =this.border+this.width/2;
        this.starty =this.border+this.height/2;

        this.canvas = null;
        this.iconinfo = null;
        this.icons = [];
        this.iconsToCreate = [];

        this.fontLoaded = false;

        this._init();

        this.updateGPUTexture(true);

        var _this = this;
        if (document.fonts) {
            var fontsReady = document.fonts.ready;
            if (typeof(fontsReady) == "function") {
                fontsReady = document.fonts.ready();
            }
            fontsReady.then(function () {
                _this.fontLoaded  = true;
                _this.createIcons();
                _this.emit('load')
            });
        }
    }

    _init(){
        this.canvas = document.createElement('canvas');

        this.canvas.width  = this.textureIconWidth;
        this.canvas.height  = this.textureIconHeight;

        var ctx = this.canvas.getContext("2d");

        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        ctx.font = `${this.fontSize}px ${this.fontFamily}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#ff0000";

        this.iconinfo =  {
            fontSize:this.fontSize,
            img:this.canvas,
            width:this.width,
            height:this.height,
            infos:{}
        };

        this.ctx = ctx;

    }

    createIcons(icons) {

        icons = icons || this.iconsToCreate;

        if(icons.length == 0) return;

        if(!this.fontLoaded){
            icons.forEach(function (e) {
                this.iconsToCreate.push(e);
            }.bind(this));
            return;
        }

        for (var i = 0; i < icons.length; i++) {
            this.createIcon(icons[i]);
        }
        this.computeAlpha();


        // document.body.appendChild(this.canvas);
        this.updateGPUTexture();
    }

    createIcon(icon){

        var ctx = this.ctx,
            c = this.canvas;

        if(this.iconinfo && this.iconinfo.infos[icon]) return;

        if(this.startx + this.width + this.border > c.width){
            this.startx = this.border;
            this.starty += this.height + this.border;

            if(this.starty + this.height > c.height){
                console.warn('icon texture no space');
                return;
            }
        }


        ctx.fillText(icon, this.startx, this.starty);
        this.iconinfo.infos[icon] = {
            uvs:[
                (this.startx-this.width/2)/c.width, (this.starty - this.height/2)/c.height,
                (this.startx + this.width/2)/c.width, (this.starty + this.height/2)/c.height,
            ],
            width:this.width/this.width
        };

        this.icons.push(icon);

        this.startx += this.width + this.border;
    }


    computeAlpha() {

        var ctx = this.ctx;

        var imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
        for (var i = 0; i < imgData.data.length; i += 4) {
            imgData.data[i + 3] = imgData.data[i];
        }
        ctx.putImageData(imgData,0,0);
    }

    updateGPUTexture(empty){
        var gl = this.gl;

        this.createTexture(empty);

        gl.activeTexture(gl.TEXTURE11);
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
    }

    addIcons(icons){
        var char;
        var map = {};
        for(var i = 0,len = icons.length;i< len;i++){
            char = icons[i];
            if(!this.iconinfo.infos[char] && !map[char]){
                if(this.fontLoaded){
                    this.createIcon(char);
                }else {
                    this.iconsToCreate.push(char);
                }
                map[char] = true;
            }
        }
        this.updateGPUTexture();
    }

    createTexture(empty){

        var gl = this.gl;

        if(!this.texture) {
            this.texture = gl.createTexture();
        }
        gl.activeTexture(gl.TEXTURE11);
        gl.bindTexture(gl.TEXTURE_2D, this.texture);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

        if(empty)gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 2, 2, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        else gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.iconinfo.img);
    }

    clear(){
        this.startx =this.border+this.width/2;
        this.starty =this.border+this.height/2;
        this.icons = [];
        this.iconsToCreate = [];
        this.iconinfo.infos = {};

        var ctx = this.ctx;
        ctx.save();
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.restore();
    }

}