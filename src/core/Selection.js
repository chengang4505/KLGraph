
'use strict';

import  EventEmitter from '../base/EventEmitter'
import  utils from '../util'

export default class Selection extends EventEmitter{
    constructor(context,canvas){
        super();

        this.context = context;

        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');

        this._mouseDownHandler = this.mouseDown.bind(this);
        this.canvas.addEventListener('mousedown',this._mouseDownHandler);

        this.flag = 0;// 0 rect 1 path
        this.rect = null;
        this.path = null;

        this.data = {
            edges:[],
            nodes:[]
        };

        this.initGraphEvent();
    }

    destroy(){
        this.context = null;

        this.canvas.removeEventListener('mousedown',this._mouseDownHandler);
        this.canvas.parentNode.removeChild(this.canvas);
        this.canvas = null;

        this.ctx = null;

        this.rect = null;
        this.path = null;

        this.data = null;


    }

    enable(flag = 0){

        this.flag  = flag;

        this.canvas.style.display = 'block';
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    }
    render(){

        var ctx = this.ctx;
        var config = this.context.config;
        ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        ctx.fillStyle = config.selectionFillStyle;
        ctx.strokeStyle= config.selectionStrokeStyle;
        ctx.beginPath();

        if(this.flag == 0){
            var rect = this.rect;
            ctx.rect(rect.x,rect.y,rect.w,rect.h);
        }else if(this.flag == 1){
            var first = this.path[0];
            ctx.moveTo(first.x,first.y);
            for(var i = 1;i<this.path.length;i++) ctx.lineTo(this.path[i].x,this.path[i].y);
        }

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
        var map,dataType;
        this.context.graph.on('remove',function (type,ids) {
            dataType = type == 'node' ? 'nodes' : 'edges';
            if(utils.isArray(ids) && ids.length > 1){
                map = {};
                ids.forEach( id =>{ map[id] = true});
                _this.data[dataType] = _this.data[dataType].filter( id => !map[id]);
            }else {
                ids = utils.isArray(ids) ? ids[0] : ids;
                for(var i = 0;i<_this.data[dataType].length;i++){
                    if(_this.data[dataType][i] == ids){
                        _this.data[dataType].splice(i,1);
                        break;
                    }
                }
            }
        });

        this.context.graph.on('reset',function () {
            _this.data = {
                edges:[],
                nodes:[]
            };
        })
    }
    mouseDown(e){
        var _this = this;

        if(this.flag == 0){
            this.rect = {x:0, y:0, w:0, h:0};
            this.rect.x = e.offsetX;
            this.rect.y = e.offsetY;
        }else if(this.flag == 1){
            this.path = [];
            this.path.push({x:e.offsetX,y:e.offsetY});
        }



        _this.emit('selectStart',[_this]);

        document.addEventListener('mousemove',mouseMove);
        document.addEventListener('mouseup',mouseUp);
        function mouseMove(e) {


            if(_this.flag == 0){
                _this.rect.w = e.offsetX - _this.rect.x;
                _this.rect.h = e.offsetY - _this.rect.y;
            }else if(_this.flag == 1){
                _this.path.push({x:e.offsetX,y:e.offsetY});
            }

            _this.render();
        }
        function mouseUp(e) {
            mouseMove(e);

            document.removeEventListener('mousemove',mouseMove);
            document.removeEventListener('mouseup',mouseUp);
            var nodesid = _this.filterNodes(_this.ctx);

            _this.disable();
            _this.selectNodes(nodesid);
            _this.emit('selectEnd',[_this]);
        }
    }

    selectNodes(nodesid,isAdd,sendMsg = true){
        var _this = this;

        if(!utils.isArray(nodesid)) nodesid = [nodesid];

        if(isAdd){
            nodesid.forEach(function (id) {
                _this.context.graph.setNodeData(id,{selected:true});
                _this.data.nodes.push(id);
            });

        }else {

            _this.data.nodes.forEach(function (id) {
                if(_this.context.graph.nodesIndex[id])
                    _this.context.graph.setNodeData(id,{selected:false});
            });

            nodesid.forEach(function (id) {
                _this.context.graph.setNodeData(id,{selected:true});
            });

            _this.data.nodes = nodesid;

        }

        sendMsg && _this.emit('select',['node',_this.getNodes()]);
    }
    selectEdges(edgesid,isAdd,sendMsg = true){
        var _this = this;

        if(!utils.isArray(edgesid)) edgesid = [edgesid];

        if(isAdd){
            edgesid.forEach(function (id) {
                _this.context.graph.setEdgeData(id,{selected:true});
                _this.data.edges.push(id);
            });

        }else {

            _this.data.edges.forEach(function (id) {
                if(_this.context.graph.edgesIndex[id])
                    _this.context.graph.setEdgeData(id,{selected:false});
            });

            edgesid.forEach(function (id) {
                _this.context.graph.setEdgeData(id,{selected:true});
            });

            _this.data.edges = edgesid;

        }

        sendMsg && _this.emit('select',['edge',_this.getEdges()]);
    }

    unSelectNode(nodesid){

        if(this.data.nodes.length == 0 || !nodesid) return;

        var _this = this;
        if(!utils.isArray(nodesid)) nodesid = [nodesid];

        var map = {};

        nodesid.forEach(function (id) {
            map[id] = true;
        });

        var newSelected = [];
        this.data.nodes.forEach(function (id) {
            if(map[id]) _this.context.graph.setNodeData(id,{selected:false});
            else newSelected.push(id);
        });

        this.data.nodes = newSelected;

        _this.emit('select',['node',_this.getNodes()]);
    }

    unSelectEdge(edgesid){

        if(this.data.edges.length == 0 || !edgesid) return;

        var _this = this;
        if(!utils.isArray(edgesid)) edgesid = [edgesid];

        var map = {};

        edgesid.forEach(function (id) {
            map[id] = true;
        });

        var newSelected = [];
        this.data.edges.forEach(function (id) {
            if(map[id]) _this.context.graph.setEdgeData(id,{selected:false});
            else newSelected.push(id);
        });

        this.data.edges = newSelected;

        _this.emit('select',['edge',_this.getEdges()]);
    }

    getNodes(){
        return this.data.nodes.map( id => this.context.graph.nodesIndex[id]);
    }
    getEdges(){
        return this.data.edges.map( id => this.context.graph.edgesIndex[id]);
    }

    isNodeSelected(id){
        var nodes = this.data.nodes;
        for(var i = 0;i< nodes.length;i++){
            if(nodes[i] == id){
                return true
            }
        }
        return false;
    }
    isEdgeSelected(id){
        var edges = this.data.edges;
        for(var i = 0;i< edges.length;i++){
            if(edges[i] == id){
                return true
            }
        }
        return false;
    }

    filterNodes(ctx){
        var nodes = this.context.graph.nodes;
        var selects = [];
        var domPos;
        nodes.forEach(function (node) {
            domPos = this.context.render.graphToDomPos({x:node.x,y:node.y});
            if(ctx.isPointInPath(domPos.x,domPos.y)) selects.push(node.id);
        }.bind(this));

        return selects;
    }
    delete(type){
        var _this = this;

        var clearNode = type === 'node';
        var clearEdge = type === 'edge';

        if(!type){
            clearEdge = true;
            clearNode = true;
        }


        if(clearNode){
            var nodes = this.data.nodes;
            this.data.nodes = [];
            nodes.forEach(function (id) {
                _this.context.graph.removeNode(id);
            });
        }

        if(clearEdge){
            var edges = this.data.edges;
            this.data.edges = [];
            edges.forEach(function (id) {
                _this.context.graph.removeEdge(id);
            });
        }

    }
}