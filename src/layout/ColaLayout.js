/**
 * Created by chengang on 17-4-12.
 */

export default class ColaLayout{
    layout(nodes,edges){
        if(!cola || !cola.Layout) throw 'please add cola lib first';
        this.cola = new cola.Layout().convergenceThreshold(1e-4)
            .size([1000, 1000]);

        var data = this._init(nodes,edges);

        this.cola.nodes(data.nodes)
            .links(data.edges)
            .symmetricDiffLinkLengths(30)
            .start(60,0,0,0,false);

        return data.nodes.map(function (e) {
            return {x:e.x,y:e.y};
        })
    }

    _init(_nodes,_edges){
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

        _edges.forEach(function (e, i) {
            if (map.hasOwnProperty(e.source) && map.hasOwnProperty(e.target))
                edges.push({
                    source: map[e.source],
                    target: map[e.target],
                });
        })

        return {
            nodes:nodes,
            edges:edges
        }
    }
}
