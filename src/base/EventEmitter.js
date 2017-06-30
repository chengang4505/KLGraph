
'use strict';

export default class EventEmitter {
    constructor(){
        this._listener = {};
    }

    on(type,cb){
        if(!type || !cb) return;
        this._listener[type] = this._listener[type] || [];

        var listener = this._listener[type];
        for(var i = 0,len = listener.length; i < len;i++){
            if(cb == listener[i]) return;
        }

        this._listener[type].push(cb);
        return this;
    }

    off(type,cb){
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
    }

    emit(type,args){
        if(!type) return;
        var listener,fn;
        if(!(listener = this._listener[type]) || listener.length < 1) return;

        listener = listener.slice();

        for(var i = 0,len = listener.length;i< len;i++){
            fn = listener[i];
            fn.apply(null,args);
        }
    }
}


