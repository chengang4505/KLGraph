/**
 * Created by chengang on 17-2-16.
 */

'use strict';

import EventEmitter from '../base/EventEmitter';
import timer from '../base/timer'

/**
 * from d3-interpolate
 */
function interpolateNumber(a, b) {
    return a = +a, b -= a, function(t) {
        return a + b * t;
    };
}



export  default class Tween extends  EventEmitter{

    static list = [];

    constructor(objs,type){
        super();
        if(!objs) throw 'must have a obj';

        type = type || '';

        this.objs = objs;
        this.type = type;
        this.interpolates = null;
        this.timer = timer(this.timerHandle.bind(this));
        this._duration = 0;

        Tween.list.push(this);
    }


    timerHandle(elapsed) {
        var t = elapsed / this._duration;

        t = Math.min(t,1);

        var obj,attr,attrInterpolater;
        if(Array.isArray(this.interpolates)){
            for(var i = 0,len = this.interpolates.length;i< len;i++){
                obj = this.objs[i];
                attrInterpolater = this.interpolates[i];
                for(attr in attrInterpolater){
                    obj[attr] = attrInterpolater[attr](t);
                }
            }
        }else {
            obj = this.objs;
            attrInterpolater = this.interpolates;
            for(attr in attrInterpolater){
                obj[attr] = attrInterpolater[attr](t);
            }
        }

        this.emit('change',[t]);

        if(elapsed >=this._duration){
            this.stop(true);
        }

    }


    duration(time) {
        this._duration = time;
        return this;
    }

    to(toObjs) {
        if(Array.isArray(toObjs) && toObjs.length !== this.objs.length){
            console.error('toObjs lenght not eq objs length');
            this.stop();
            return this;
        }

        var obj,attr,attrInterpolater;
        if(Array.isArray(toObjs)){
            this.interpolates = [];
            for(var i = 0,len = toObjs.length;i<len;i++){
                obj = toObjs[i];
                attrInterpolater = {};
                for(attr in obj){
                    attrInterpolater[attr] = interpolateNumber(this.objs[i][attr],obj[attr]);
                }
                this.interpolates.push(attrInterpolater);
            }
        }else {
            obj = toObjs;
            attrInterpolater = {};
            for(attr in obj){
                attrInterpolater[attr] = interpolateNumber(this.objs[attr],obj[attr]);
            }
            this.interpolates = attrInterpolater;
        }

        return this;

    };

    stop(emitEnd) {
        if(this.timer){
            this.timer.stop();
            this.timer = null;
            this.objs = null;
            this.interpolates = null;

            if(emitEnd) this.emit('end');

            Tween.remove(this.objs);
        }
    }

    static remove(obj,emitEnd){
        var list = Tween.list;
        Tween.list = [];
        list.forEach(function (e) {
            if(e.objs == obj){
                e.stop(emitEnd);
            }else {
                Tween.list.push(e);
            }
        })
    }

    static removeByType(type,emitEnd){
        var list = Tween.list;
        Tween.list = [];
        list.forEach(function (e) {
            if(e.type === type){
                e.stop(emitEnd);
            }else {
                Tween.list.push(e);
            }
        })
    }

    static removeAll(emitEnd){
        Tween.list.forEach(function (e) {
            e.stop(emitEnd);
        })

        Tween.list = [];
    }

}

