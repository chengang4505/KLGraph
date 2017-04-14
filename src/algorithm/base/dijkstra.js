/**
 * Created by chengang on 17-2-21.
 */

function dijkstra(G,start) {
    var num = G.nodes.length;
    var dist = new Array(num);
    var prev = new Array(num);

    var map = {},temp;
    var nodes = G.nodes.map(function (e,i) {
        temp =  {id:e.id,_index:i};
        map[e.id] = temp;
        return temp;
    });
    var edges = G.edges;
    var S = new Array(num); //是否在S集合

    var E = new Array(num*num);
    for(var i = 0;i<E.length;i++) E[i] = Infinity;

    for(var i = 0;i<num;i++){
        E[i*num+1] = 0;
    }

    var x,y;
    for(var i = 0;i<edges.length;i++){
        x = map[edges[i].source.id]._index;
        y = map[edges[i].target.id]._index;
        E[x*num+y] = edges[i].value;
        E[y*num+x] = edges[i].value;
    }

    for(var i = 0;i< num;i++){
        dist[i] = E[i*num+start];
        S[i] = 0;
        if(dist[i] == Infinity || i == start){
            prev[i] = -1;
        }else {
            prev[i] = start;
        }
    }

    dist[start] = 0;
    S[start] = 1;

    console.time('dijkstra')
    for(var i = 1;i< num;i++){
        var min = Infinity;
        var u;
        for(var j = 0;j < num;j++){
            if(!S[j] && dist[j] < min){
                u = j;
                min = dist[j];
            }
        }
        S[u] = 1;
        for(var j = 0;j<num;j++){
            if(!S[j] && E[j*num+u] < Infinity){
                if(dist[u] + E[j*num+u] < dist[j]){
                    dist[j] = dist[u] + E[j*num+u];
                    prev[j] = u;
                }
            }
        }

    }

    console.timeEnd('dijkstra');



    for(var i =0;i<num;i++){
        var arr = [];
        path(i,arr);
        console.log(arr.join('->'));
    }

    function path(n,arr) {
        arr.push(nodes[n].id);
        if(prev[n] == -1) return;
        path(prev[n],arr);
    }

}
function dijkstra_multi(G,start) {
    var num = G.nodes.length;
    var dist = new Array(num);

    var map = {},temp;
    var nodes = G.nodes.map(function (e,i) {
        temp =  {id:e.id,_index:i};
        map[e.id] = temp;
        return temp;
    });

    var edges = G.edges;
    var S = new Array(num); //是否在S集合
    var E = new Array(num*num);//邻接矩阵

    for(var i = 0;i<E.length;i++) E[i] = Infinity;
    for(var i = 0;i<num;i++) E[i*num+1] = 0;

    var x,y;
    for(var i = 0;i<edges.length;i++){
        x = map[edges[i].source.id]._index;
        y = map[edges[i].target.id]._index;
        E[x*num+y] = edges[i].value;
        E[y*num+x] = edges[i].value;
    }

    for(var i = 0;i< num;i++){
        dist[i] = E[i*num+start];
        S[i] = 0;
        if(dist[i] == Infinity || i == start){
            nodes[i].prev = null;
        }else {
            nodes[i].prev = [start];
        }
    }

    dist[start] = 0;
    S[start] = 1;

    console.time('dijkstra_multi')
    for(var i = 1;i< num;i++){
        var min = Infinity;
        var u;
        for(var j = 0;j < num;j++){
            if(!S[j] && dist[j] < min){
                u = j;
                min = dist[j];
            }
        }
        S[u] = 1;
        for(var j = 0;j<num;j++){
            if(!S[j] && E[j*num+u] < Infinity){
                if(dist[u] + E[j*num+u] < dist[j]){
                    dist[j] = dist[u] + E[j*num+u];
                    nodes[j].prev = [u];
                }else if(dist[j] == dist[u] + E[j*num+u]) {
                    nodes[j].prev.push(u);
                }
            }
        }

    }
    console.timeEnd('dijkstra_multi');

}
function getShortestPath(G,id1,id2) {
    var map = {},temp;
    var nodes = G.nodes.map(function (e) {
        temp = {id:e.id};
        map[e.id] = temp;
        return temp;
    });
    var edges = G.edges.map(function (e) {
        return {
            source:map[e.source.id],
            target:map[e.target.id],
            value:e.value
        }
    });

    edges.forEach(function (e) {
        e.source.links = e.source.links || [];
        e.source.links.push(e);

        e.target.links = e.target.links || [];
        e.target.links.push(e);
    });

    var start = map[id1], end = map[id2];

    start.value = 0;
    start.flag = true;
    start.pre = null;

    console.time('getShortestPath')
    breadFirst(start);
    console.timeEnd('getShortestPath')

    function breadFirst(node) {
        var links = node.links;
        var temp,newVaule;

        var nodesTravers = [];
        for(var i = 0;i< links.length;i++){
            temp = links[i].source;
            if(temp == node) temp = links[i].target;

            newVaule = node.value + links[i].value;
            if(!temp.flag || newVaule < temp.value){
                temp.value = newVaule;
                temp.flag = true;
                temp.pre = [node.id];
                nodesTravers.push(temp);
            }else if(newVaule == temp.value){
                temp.pre.push(node.id);
            }

        }

        for(var i = 0;i<nodesTravers.length;i++) breadFirst(nodesTravers[i]);
    }
}

export default {
    dijkstra,dijkstra_multi,getShortestPath
}
