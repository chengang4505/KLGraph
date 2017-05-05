/**
 * Created by chengang on 17-4-19.
 */

'use strict';

import  EventEmitter from '../base/EventEmitter'
import  utils from '../util'

export default class Selection extends EventEmitter{
    constructor(canvas,context){
        super();

        this.context = context;

        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');

        this.canvas.addEventListener('mousedown',this.mouseDown.bind(this));

        this.rect = {
            x:0,
            y:0,
            w:0,
            h:0
        };

        this.data = [];

        this.initGraphEvent();
    }

    enable(){
        this.canvas.style.display = 'block';
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    }

    renderRect(){
        var rect = this.rect;
        var ctx = this.ctx;
        ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        ctx.fillStyle = 'rgba(58, 75, 89, 0.3)';
        ctx.strokeStyle="#4b7598";
        ctx.beginPath();
        ctx.rect(rect.x,rect.y,rect.w,rect.h);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    disable(){
        this.canvas.style.display = 'none';
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    }

    initGraphEvent(){
        var _this = this;
        this.context.graph.on('remove',function (type,id) {
            if(type == 'node'){
                for(var i = 0;i<_this.data.length;i++){
                    if(_this.data[i].id == id){
                        _this.data.splice(i,1);
                        break;
                    }
                }
            }
        });

        this.context.graph.on('reset',function () {
            _this.data = [];
        })
    }

    mouseDown(e){
        var _this = this;

        this.rect.x = e.offsetX;
        this.rect.y = e.offsetY;

        _this.emit('selectstart');

        document.addEventListener('mousemove',mouseMove);
        document.addEventListener('mouseup',mouseUp);
        function mouseMove(e) {
            _this.rect.w = e.offsetX - _this.rect.x;
            _this.rect.h = e.offsetY - _this.rect.y;

            _this.renderRect();
        }
        function mouseUp(e) {
            document.removeEventListener('mousemove',mouseMove);
            document.removeEventListener('mouseup',mouseUp);
            var data = _this.filter(_this.ctx);

            _this.disable();
            _this.select(data);
            _this.emit('selectend',[data]);
        }
    }

    select(nodes,isAdd,sendMessage = true){
        var _this = this;

        if(!utils.isArray(nodes)) nodes = [nodes];

        if(isAdd){
            nodes.forEach(function (node) {
                _this.context.graph.setNodeData(node.id,{selected:true});
                _this.data.push(node);
            });

        }else {

            _this.data.forEach(function (e) {
                if(_this.context.graph.nodesIndex[e.id])
                    _this.context.graph.setNodeData(e.id,{selected:false});
            });

            nodes.forEach(function (node) {
                _this.context.graph.setNodeData(node.id,{selected:true});
            });

            _this.data = nodes;

        }

        sendMessage && _this.emit('select',[_this.getSelection()]);
    }

    unSelect(nodes){

        if(this.data.length == 0 || !nodes) return;

        var _this = this;
        if(!utils.isArray(nodes)) nodes = [nodes];

        var map = {};

        nodes.forEach(function (node) {
            map[node.id] = true;
        });

        var newSelected = [];
        this.data.forEach(function (node) {
            if(map[node.id]) _this.context.graph.setNodeData(node.id,{selected:false});
            else newSelected.push(node);
        });

        this.data = newSelected;

        _this.emit('select',[_this.getSelection()]);
    }

    getSelection(){
        return this.data.slice();
    }


    isSelected(node){
        for(var i = 0;i< this.data.length;i++){
            if(this.data[i].id == node.id){
                return true
            }
        }
        return false;
    }

    filter(ctx){
        var nodes = this.context.graph.nodes;
        var selects = [];
        var domPos;
        nodes.forEach(function (node) {
            domPos = this.context.render.graphToDomPos({x:node.x,y:node.y});
            if(ctx.isPointInPath(domPos.x,domPos.y)) selects.push(node);
        }.bind(this));

        return selects;
    }

    delete(){
        var _this = this;
        var data = this.data;
        this.data = [];
        data.forEach(function (node) {
            _this.context.graph.removeNode(node.id);
        });
    }
}