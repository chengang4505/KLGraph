/**
 * Created by chengang on 17-4-6.
 */
import Graph from './Graph'
import WebGLRender from  '../render/webgl/render'
import utils from '../util'

import Tween from '../animation/tween'

import layout from '../layout/index'

import defaultConfig from './config'

export  default  class Core{

    static layout = layout;

    constructor(option){
        option = option || {};

        this.selected = [];

        this.option = utils.extend(defaultConfig,option.config || {});

        this.graph  = new Graph({
            nodes:option.nodes,
            edges:option.edges,
        });

        this.render = new WebGLRender(
            this.graph,
            utils.extend({container:option.container},this.option)
        );

        this.on = this.render.on.bind(this.render);
        this.off = this.render.off.bind(this.render);

        this.makeLayout(option.layout || 'preset');

        this._start();

        this._initEvent();
    }

    _start(){
        var _this = this;
        var frames = state();
        function state() {
            var n = -1,start = 0;
            return function (time) {
                n++;
                time = time/1000;
                if((time - start) > 1){
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

    _render(){

        if(this.render && this.render.needUpdate){
            // console.time('render')
            // debugger
            this.render.render();
            // console.timeEnd('render')
        }


    }


    _initEvent(){
        var _this = this;
        this.render.on('nodeclick',function (node,e) {
            _this.selected.forEach(function (e) {
                if(_this.graph.nodesIndex[e.id])
                _this.graph.setNodeData(e.id,{selected:false});
            });

            _this.selected = [node];
            _this.graph.setNodeData(node.id,{selected:true});
        });
    }

    makeLayout(type){

        var _this = this;
        var layout,data;
        var layoutConfig = Core.layout;

        if (type == 'preset') {
            this.graph.nodes.forEach(function (e) {
                if (!('x' in e)) e.x = Math.random() * _this.render.gl.clientWidth;
                if (!('y' in e)) e.y = Math.random() * _this.render.gl.clientWidth;
            });

            this.graph.emit('reset');
        } else if (layout = layoutConfig[type]) {

            layout = new layoutConfig[type]();
            data = layout.layout(this.graph);

            Tween(this.graph.nodes).to(data).duration(2000).on('change', function (t) {
                _this.graph.emit('reset');
            })
        }
    }

    getSelection(){
        var _this = this;
        var nodes = this.selected.filter(function (e) {
            return _this.graph.nodesIndex[e.id];
        })
        return nodes;
    }
}
