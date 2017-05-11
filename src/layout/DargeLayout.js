/**
 * Created by chengang on 17-4-12.
 */

export default class DargeLayout{
    layout(nodes,edges){
        // debugger
        if(!dagre || !dagre.graphlib) throw 'please add dagre lib first';
        var g = new dagre.graphlib.Graph();

        g.setGraph({
            rankdir:'TB',
            nodesep:15,
            ranksep:40,
            ranker:'longest-path'//network-simplex  longest-path tight-tree
        });

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
