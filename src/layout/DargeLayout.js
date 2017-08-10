'use strict';

import util from '../util'

var defaultConfig = {
    rankdir:'TB',
    nodesep:10,
    ranksep:40,
    ranker:'longest-path'//network-simplex  longest-path tight-tree
};
export default class DargeLayout{
    layout(nodes,edges,option){
        // debugger
        if(!dagre || !dagre.graphlib) throw 'please add dagre lib first';
        var g = new dagre.graphlib.Graph();

        this.option = util.extend(option || {}, defaultConfig);

        g.setGraph(this.option);

        g.setDefaultEdgeLabel(function() { return {}; });

        nodes.forEach(function (e) {
            g.setNode(e.id,{width:20,height:20});
        });

        edges.forEach(function (e) {
            g.setEdge(e.source,e.target);
        });

        dagre.layout(g);

        var data = g.nodes().map(function (e) {
            var d = g.node(e);
            return {x:d.x,y:-1*d.y};
        });

        return data;
    }
}
