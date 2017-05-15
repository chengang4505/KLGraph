/**
 * Created by chengang on 17-4-6.
 */

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

        this.config = utils.extend(defaultConfig, option.config || {});

        this.graph = new Graph({
            nodes: option.nodes,
            edges: option.edges,
        });

        this.container = option.container;

        this.canvas = {};
        this.initCanvas();

        this.render = new WebGLRender(
            this,
            utils.extend({container: this.canvas.render}, this.config)
        );

        this.selection = new Selection(this.canvas.mouse, this);

        this.on = this.render.on.bind(this.render);
        this.off = this.render.off.bind(this.render);

        if(this.graph.nodes.length > 0) this.makeLayout(option.layout || 'preset');

        this._start();

        this._initEvent();
    }

    initCanvas() {

        this.container.style.position = 'relative';
        this.canvas.render = this.createElement('div');
        this.container.appendChild(this.canvas.render);

        this.canvas.mouse = this.createElement('canvas');
        this.canvas.mouse.style.display = 'none';
        this.canvas.mouse.style.cursor = 'cell';

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
                    // console.log(n);
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

        if (this.render && this.render.needUpdate) {
            // console.time('render')
            // debugger
            this.render.render();
            // console.timeEnd('render')
        }


    }


    _initEvent() {
        var _this = this;
        this.render.on('nodeclick', function (node, e) {
            if (!_this.selection.isSelected(node))
                _this.selection.select(node,e.shiftKey);
            else if(e.shiftKey) _this.selection.unSelect(node);
        });

        this.render.on('rightclick', function (type,node, e) {
            if (type == 'node' && !_this.selection.isSelected(node))
                _this.selection.select(node);
        });
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
        var _this = this;
        Tween.removeByType('camera');
        duration = duration || 1000;
        option = option || this.getFitOptions(this.graph.nodes);
        new Tween(this.render.camera,'camera').to(option).duration(duration).on('change',function () {
            _this.render.forceRender();
        });
    }


    makeLayout(type,nodes) {

        var _this = this;
        var layout, data;
        var layoutConfig = Core.layout;

        Tween.removeByType('layout');

        var edges = null;
        if(nodes == null){
            nodes =  this.graph.nodes;
            edges =  this.graph.edges;
        }else {
            edges = getEdges(nodes);
        }

        if (type == 'preset') {
            this.graph.nodes.forEach(function (e) {
                if (!('x' in e)) e.x = Math.random() * _this.render.gl.clientWidth;
                if (!('y' in e)) e.y = Math.random() * _this.render.gl.clientWidth;
            });
            this.render.clearRenderCache();
        } else if (layout = layoutConfig[type]) {

            layout = new layoutConfig[type]();
            data = layout.layout(nodes,edges);

            if(data.length > this.graph.nodes.length * 4/5){
                new Tween(nodes, 'layout').to(data).duration(2000).on('change', function (t) {
                    _this.render.clearRenderCache();
                });

                this.fit(2000,this.getFitOptions(data));
            }else {

                var bbox = utils.getBBox(nodes);
                var bbox1 = utils.getBBox(data);

                var offsetX = bbox.x+bbox.w/2 - (bbox1.x + bbox1.w/2);
                var offsetY = bbox.y+bbox.h/2 - (bbox1.y + bbox1.h/2);

                data.forEach(function (e) {
                    e.x += offsetX;
                    e.y += offsetY;
                });

                new Tween(nodes, 'layout').to(data).duration(2000).on('change', function (t) {
                    nodes.forEach(function (node) {
                       _this.graph.setNodeData(node.id,{x:node.x});
                    });
                });
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


