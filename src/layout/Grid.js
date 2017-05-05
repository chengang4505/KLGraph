/**
 * Created by chengang on 17-4-12.
 */

export default class Grid{
    layout(_nodes,_edges){

        var nodes = [];

        var width = 50;
        var height = 50;

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
