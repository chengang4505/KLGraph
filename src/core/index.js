
'use strict';

import Graph from './Graph'
import WebGLRender from  '../render/webgl/render'
import utils from '../util'

import Tween from '../animation/tween'
import Selection from './Selection'
import layout from '../layout/index'
import defaultConfig from './config'

export  default  class Core {

    static layout = layout;

    constructor(option) {
        option = option || {};

        this.container = option.container;

        this.config = utils.extend(option.config || {},defaultConfig);

        this.graph = new Graph({
            nodes: option.nodes,
            edges: option.edges
        });

        this.debug = false;

        this.canvas = {};
        this.initCanvas();

        this.render = new WebGLRender(this, this.canvas.render);

        this.selection = new Selection(this,this.canvas.mouse);

        this.on = this.render.on.bind(this.render);
        this.off = this.render.off.bind(this.render);

        this._start();

        this._initEvent();
    }

    initCanvas() {

        this.container.style.position = 'relative';
        this.canvas.render = this.createElement('canvas');
        this.container.appendChild(this.canvas.render);

        this.canvas.mouse = this.createElement('canvas');
        this.canvas.mouse.style.display = 'none';
        this.canvas.mouse.style.cursor = 'crosshair';

        this.container.appendChild(this.canvas.mouse);
    }
    createElement(tag) {
        var ele = document.createElement(tag);
        ele.style.position = 'absolute';
        ele.style.left = '0px';
        ele.style.top = '0px';
        ele.style.width = '100%';
        ele.style.height = '100%';
        ele.style.border = 'none';
        ele.width = this.container.clientWidth;
        ele.height = this.container.clientHeight;

        ele.oncontextmenu = function (e) {
            e.preventDefault();
            return false;
        };

        return ele;
    }
    _start() {
        var _this = this;
        var frames = state();

        function state() {
            var n = -1, start = 0;
            return function (time) {
                n++;
                time = time / 1000;
                if ((time - start) > 1) {
                    _this.debug && console.log('frames:'+n);
                    n = -1;
                    start = time;
                }

            }
        }

        function render(time) {
            _this._render();
            frames(time);
            requestAnimationFrame(render)
        }

        requestAnimationFrame(render);
    }
    _render() {
        this.resize();
        if (this.render) {
            // console.time('render')
            // debugger
            this.render.render();
            // console.timeEnd('render')
        }


    }
    _initEvent() {
        // var _this = this;
        // this.render.on('nodeMouseDown', function (node, e) {
        //     // debugger
        //     if (!_this.selection.isNodeSelected(node.id))
        //         _this.selection.selectNodes(node.id,e.shiftKey);
        //     else if(e.shiftKey) _this.selection.unSelectNode(node.id);
        // });
    }
    resize() {
        if (this.canvas.mouse.width != this.container.clientWidth || this.canvas.mouse.height != this.container.clientHeight) {
            this.canvas.mouse.width = this.container.clientWidth;
            this.canvas.mouse.height = this.container.clientHeight;
            this.render.forceRender();
        }
    }
    getFitOptions(nodes) {
        var x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
        nodes.forEach(function (e) {
            if (e.x < x0) x0 = e.x;
            if (e.x > x1) x1 = e.x;
            if (e.y < y0) y0 = e.y;
            if (e.y > y1) y1 = e.y;
        });

        return {
            scale:Math.max((x1-x0)/this.render.container.clientWidth,(y1-y0)/this.render.container.clientHeight),
            positionX:(x0+x1)/2,
            positionY:(y0+y1)/2,
        }
    }

    fit(duration,option){
        Tween.removeByType('camera');
        option = option || this.getFitOptions(this.graph.nodes);
        this.render.zoomTo(option,duration);
    }
    makeLayout(type,option,cb) {
        option = option || {};

        var _this = this;
        var layout, data;
        var layoutConfig = Core.layout;

        var nodes = option.nodes;
        var duration = option.duration;
        var center = option.center;
        var fit = option.fit;

        Tween.removeByType('layout');

        var edges = null;
        if(nodes == null){
            nodes =  this.graph.nodes;
            edges =  this.graph.edges;
        }else {
            edges = getEdges(nodes);
        }

        if (!type || type == 'preset') {
            this.graph.nodes.forEach(function (e) {
                if (!('x' in e)) e.x = Math.random() * _this.render.gl.clientWidth;
                if (!('y' in e)) e.y = Math.random() * _this.render.gl.clientWidth;
            });
            this.render.clearRenderCache();
        } else if (layout = layoutConfig[type]) {

            layout = new layoutConfig[type]();
            data = layout.layout(nodes,edges,option);


            if(center){
                var bbox = utils.getBBox(nodes);
                var bbox1 = utils.getBBox(data);

                var offsetX = bbox.x+bbox.w/2 - (bbox1.x + bbox1.w/2);
                var offsetY = bbox.y+bbox.h/2 - (bbox1.y + bbox1.h/2);

                data.forEach(function (e) {
                    e.x += offsetX;
                    e.y += offsetY;
                });
            }

            if(duration){
                new Tween(nodes, 'layout').to(data).duration(duration)
                    .on('change', function (t) {
                        nodes.forEach(function (node) {
                            _this.graph.setNodeData(node.id, {x: node.x, y: node.y});
                        });
                    })
                    .on('end', cb);

                fit && this.fit(duration,this.getFitOptions(data));
            }else {
                data.forEach(function (node,i) {
                    _this.graph.setNodeData(nodes[i].id, {x: node.x, y: node.y});
                });
                fit && this.fit(null,this.getFitOptions(data));
                cb&&cb();
            }


        }


        function getEdges(nodes) {
            var map = {};
            var edges = [];
            nodes.forEach(function (e) {
                map[e.id] = true;
            });

            _this.graph.edges.forEach(function (e) {
                if(map[e.source] && map[e.target])
                    edges.push(e);
            });

            return edges;

        }
    }
}


