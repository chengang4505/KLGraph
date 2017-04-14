/**
 * Created by chengang on 17-4-12.
 */

export default class ColaLayout{
    layout(graph){
        if(!cola || !cola.Layout) throw 'please add cola lib first';
        this.cola = new cola.Layout().convergenceThreshold(1e-4)
            .size([1000, 800]);

        var data = this._init(graph);

        this.cola.nodes(data.nodes)
            .links(data.edges)
            .symmetricDiffLinkLengths(50)
            .start(60,0,0,0,false);

        return data.nodes.map(function (e) {
            return {x:e.x,y:e.y};
        })
    }

    _init(graph){
        var nodes = [];
        var edges = [];
        var map = {};
        graph.nodes.forEach(function (e,i) {
            nodes.push({
                width:100,
                height:100
            });
            map[e.id] = i;
        })

        graph.edges.forEach(function (e,i) {
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
}
