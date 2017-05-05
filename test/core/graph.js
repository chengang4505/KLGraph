import test from 'ava';
import Graph from '../../src/core/Graph';


var nodes = [
    {id: 'node1'},
    {id: 'node2'},
    {id: 'node3'},
    {id: 'node4'}
];

var edges = [
    {source: 'node1', target: 'node2'},
    {source: 'node2', target: 'node4'},
    {source: 'node2', target: 'node3'},
    {source: 'node3', target: 'node1'},
    {source: 'node4', target: 'node1'},
];


test.beforeEach(t => {
    t.context.graph = new Graph({
        nodes: nodes,
        edges: edges
    });
});


test('create a graph', t => {
    var graph = t.context.graph;
    t.is(graph.nodes.length,nodes.length,'node count');
    t.is(graph.edges.length,edges.length,'edge count');
    t.is(graph.outEdgesIndex['node2'].length,2);
    t.is(graph.inEdgesIndex['node1'].length,2);
});


test('update edge count', t => {

    var edges = [
        {source: 'node1', target: 'node2'},
        {source: 'node2', target: 'node4'},
        {source: 'node2', target: 'node4'},
        {source: 'node4', target: 'node2'},
    ];

    var graph = new Graph({
        nodes: nodes,
        edges: edges
    });
    t.is(graph.edges[0].curveCount,0);
    t.is(graph.edges[1].curveCount,0);
    t.is(graph.edges[2].curveCount,1);
    t.is(graph.edges[3].curveCount,2);
    t.is(graph.edges[3].curveOrder,false);
});


test('add a node', t => {
    var graph = t.context.graph;
    graph.on('add',function (type,data) {
        t.is(type,'node','event add node');
    });
    graph.addNode({id:'node5'});
    t.is(graph.nodes.length,nodes.length+1,'node count');
});

test('add a edge', t => {
    t.plan(2);
    var graph = t.context.graph;
    graph.on('add',function (type,data) {
        t.is(type,'edge');
    });
    graph.addEdge({source:'node3',target:'node4'});
    t.is(graph.edges.length,edges.length+1);
});

test('remove node', t => {
    t.plan(5);
    var graph = t.context.graph;

    var nodeN = 0,edgeN = 0;
    graph.on('remove',function (type,data) {
        if(type == 'node') nodeN++;
        else edgeN++;
    });
    graph.removeNode('node1');
    t.is(graph.nodes.length,nodes.length -1);
    t.is(graph.edges.length,edges.length -3);
    t.is(graph.nodesIndex['node1'],null);

    t.is(nodeN,1);
    t.is(edgeN,3);
});

test('remove edge', t => {
    var graph = t.context.graph;
    var edgeid = graph.edges[0].id;

    graph.on('remove',function (type,data) {
        t.is(type,'edge');
    });

    graph.removeEdge(edgeid);
    t.is(graph.edges.length,edges.length -1);
    t.is(graph.edgesIndex[edgeid],null);
});

test('set Node data', t => {
    var graph = t.context.graph;

    graph.setNodeData('node1',{test:'testdata'});

    t.is(graph.nodesIndex['node1'].test,'testdata');

    //pos
    var nodeN = 0,edgeN = 0;
    graph.on('change',function (type,ids) {
        if(type == 'node') nodeN++;
        else edgeN += ids.length;
    });
    graph.setNodeData('node1',{x:100});

    t.is(nodeN,1);
    t.is(edgeN,3);
});