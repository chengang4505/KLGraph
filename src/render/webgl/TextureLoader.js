'use strict';

import EventEmitter from '../../base/EventEmitter'

export  default  class  TextureLoader extends EventEmitter {
    constructor(){
        super();
        this.cache = {};
        this.textures = [];
        // this.defaultTexture = this.createTexture();
        this.texturesIndex = [0,1,2,3,4,5,6,7,8,9];
        // this.updateGPUTexture();
    }

    loadImgs(urls){
        if(Array.isArray(urls)){
            urls.forEach(function (url) {
                this._load(url);
            }.bind(this));
        }else {
            this._load(urls);
        }
    }

    _load(url){
        if(!this.cache[url]){
            var image = document.createElement('IMG');
            // image.setAttribute('crossOrigin', imgCrossOrigin);
            image.src = url;
            image.onload = function() {
                var tx = this.createTexture(image);
                this.cache[url] = this.textures.length;//index
                this.textures.push(tx);
                this.updateGPUTexture();
                this.emit('load',[url]);
            }.bind(this);
        }
    }

    attachGl(gl){
        this.defaultTexture = this.createTexture(gl);
        this.texturesIndex.forEach(function (e) {
            gl.activeTexture(gl['TEXTURE'+e]);
            if(e > this.textures.length - 1){
                gl.bindTexture(gl.TEXTURE_2D, this.defaultTexture);
            }else {
                gl.bindTexture(gl.TEXTURE_2D, this.textures[e]);
            }
        }.bind(this));
    }

    createTexture(gl,img){
        var texture = gl.createTexture();
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

        if(img)gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        else gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 2, 2, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

        return texture;
    }
}