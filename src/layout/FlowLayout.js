/**
 * Created by chengang on 17-4-12.
 */

export default class FlowLayout{
    layout(nodes,edges){
        if(!cola || !cola.Layout) throw 'please add cola lib first';
        this.cola = new cola.Layout().convergenceThreshold(1e-4)
            .size([1000, 800]);

        var data = this._init(nodes,edges);

        this.cola.nodes(data.nodes)
            .links(data.edges)
            .flowLayout("y", 30)
            .symmetricDiffLinkLengths(30)
            .start(10,20,20,0,false);

        return data.nodes.map(function (e) {
            return {x:e.x,y:-1*e.y};
        })
    }

    _init(_nodes,_edges){

        // var filterEdge = this._filterEdge(nodes,edges);

        var nodes = [];
        var edges = [];
        var map = {};
        _nodes.forEach(function (e,i) {
            nodes.push({
                width:100,
                height:100
            });
            map[e.id] = i;
        })

        _edges.forEach(function (e,i) {
            edges.push({
                source:map[e.source],
                target:map[e.target],
            });
        })

        return {
            nodes:nodes,
            edges:edges
        }
    }

    _filterEdge(nodes,edges){
        var filterEdges = [];

        var flag = {};
        var first = nodes[0];

        breadFirst(first);

        return filterEdges;

        function breadFirst(node) {
            // debugger
            flag[node.id] = true;

            var nodes = [];

            var edges = graph.inEdgesIndex[node.id],edge;
            if(edges && edges.length > 0){
                edges.forEach(function (e) {
                    edge = graph.edgesIndex[e];
                    if(!flag[edge.source]) {
                        filterEdges.push(edge);
                        nodes.push(graph.nodesIndex[edge.source]);
                    }
                });
            }

            edges = graph.outEdgesIndex[node.id];
            if(edges && edges.length > 0){
                edges.forEach(function (e) {
                    edge = graph.edgesIndex[e];
                    if(!flag[edge.target]) {
                        filterEdges.push(edge);
                        nodes.push(graph.nodesIndex[edge.target]);
                    }
                });
            }

            nodes.forEach(function (e) {
                breadFirst(e);
            })

        }
    }
}
