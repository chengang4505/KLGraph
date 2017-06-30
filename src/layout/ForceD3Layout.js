
'use strict';

import util from '../util'

var defaultConfig = {
    forceManyBody:-50,
    forceLink:100,
    forceCollide:20,
    iterations:100
};

function id(d) {
    return d.id;
}


export default class ColaLayout{
    layout(nodes,edges,option){
        if(!d3 || !d3.forceSimulation) throw 'please add d3 lib first';

        this.option = util.extend(option || {},defaultConfig);

        var data = this._init(nodes,edges);

        this.simulation = d3.forceSimulation(data.nodes)
            .force("charge", d3.forceManyBody(this.option.forceManyBody))
            .force("link", d3.forceLink(data.edges).id(id).distance(this.option.forceLink))
            .force("collide",d3.forceCollide(this.option.forceCollide))
            .force("center", d3.forceCenter());

        this.simulation.stop();

        var n = this.option.iterations;
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
