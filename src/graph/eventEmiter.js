/**
 * Created by chengang on 17-2-16.
 */

export default
function EventEmitter() {
    this._listener = {};
}

EventEmitter.prototype.on=function (type,cb) {
    if(!type || !cb) return;
    this._listener[type] = this._listener[type] || [];

    var listener = this._listener[type];
    for(var i = 0,len = listener.length; i < len;i++){
        if(cb == listener[i]) return;
    }

    this._listener[type].push(cb);
    return cb;
};
EventEmitter.prototype.off = function (type,cb) {
    if(!type) return;
    var listener;
    if(!(listener = this._listener[type]) || listener.length < 1) return;

    if(cb){
        for(var i = 0,len = listener.length; i < len;i++){
            if(cb == listener[i]){
                listener.splice(i,1);
                break;
            }
        }
    }else {
        this._listener[type] = [];
    }
};
EventEmitter.prototype.emit = function (type,args) {
    if(!type) return;
    var listener,fn;
    if(!(listener = this._listener[type]) || listener.length < 1) return;

    listener = listener.slice();

    for(var i = 0,len = listener.length;i< len;i++){
        fn = listener[i];
        fn.apply(null,args);
    }
};
EventEmitter.init = function (target){
    EventEmitter.call(target);
    var p = EventEmitter.prototype;
    target.on = p.on;
    target.off = p.off;
    target.emit = target.dispatch = p.emit;
};

