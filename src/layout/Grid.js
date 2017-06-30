'use strict';

import util from '../util'

var defaultConfig = {
    offsetX:50,
    offsetY:50,
};

export default class Grid{
    layout(_nodes,_edges,option){

        var nodes = [];

        this.option = util.extend(option || {},defaultConfig);

        var width = this.option.offsetX;
        var height = this.option.offsetY;

        var num = (Math.sqrt(_nodes.length) | 0) + 1;

        var nx,ny;

        _nodes.forEach(function (e,id) {
            nx = (id % num) | 0;
            ny = (id / num) | 0;
            nodes.push({
                x:  nx * width,
                y:  ny * height,
            });
        });

        return nodes;
    }
}
