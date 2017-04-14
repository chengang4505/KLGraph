/**
 * Created by chengang on 17-2-16.
 */

'use strict';

import EventEmiter from '../graph/eventEmiter';

export  default function Tween(objs) {
    if(!(this instanceof Tween)){
        return new Tween(objs);
    }

    EventEmiter.init(this);

    if(!Array.isArray(objs)) objs = [objs];
    this.objs = objs;
    this.interpolates = [];
    this.timer = d3.timer(this.timerHandle.bind(this));
    this._duration = 0;
}
var p = Tween.prototype;

p.timerHandle = function (elapsed) {
    var t = elapsed / this._duration;

    t = Math.min(t,1);
    var obj,attr,attrInterpolater;
    for(var i = 0,len = Math.min(this.interpolates.length,this.objs.length);i< len;i++){
        obj = this.objs[i];
        attrInterpolater = this.interpolates[i];
        for(attr in attrInterpolater){
            obj[attr] = attrInterpolater[attr](t);
        }
    }

    this.emit('change',[t]);

    if(elapsed >=this._duration) this.stop();

};

p.duration = function (time) {
    this._duration = time;
    return this;
};
p.to = function (toObjs) {
    var interpolateNumber = d3.interpolateNumber;
    if(!Array.isArray(toObjs)) toObjs = [toObjs];

    var obj,attr,attrInterpolater;
    for(var i = 0,len = Math.min(toObjs.length,this.objs.length);i<len;i++){
        obj = toObjs[i];
        attrInterpolater = {};
        for(attr in obj){
            attrInterpolater[attr] = interpolateNumber(this.objs[i][attr],obj[attr]);
        }
        this.interpolates.push(attrInterpolater);
    }

    return this;

};

p.stop = function () {
    this.timer.stop();
    this.timer = null;
    this.objs = null;
    this.interpolates = null
}