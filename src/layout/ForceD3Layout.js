
'use strict';

function id(d) {
    return d.id;
}


export default class ColaLayout{
    layout(nodes,edges){
        if(!d3 || !d3.forceSimulation) throw 'please add d3 lib first';

        var data = this._init(nodes,edges);

        this.simulation = d3.forceSimulation(data.nodes)
            .force("charge", d3.forceManyBody(-50))
            .force("link", d3.forceLink(data.edges).id(id).distance(100))
            .force("collide",d3.forceCollide(20))
            .force("center", d3.forceCenter());

        this.simulation.stop();

        var n = 100;
        while (n--) this.simulation.tick();


        return data.nodes.map(function (e) {
            return {x:e.x,y:e.y};
        })
    }

    _init(_nodes,_edges){
        var nodes = [];
        var edges = [];
        _nodes.forEach(function (e,i) {
            nodes.push({
                id:e.id
            });
        });

        _edges.forEach(function (e, i) {
            edges.push({
                source:e.source,
                target:e.target,
            });
        });

        return {
            nodes:nodes,
            edges:edges
        }
    }
}
