/**
 * Created by chengang on 17-2-14.
 */

import render from '../render/register'
import drag from './drag'
import {eventInit} from './event'

var NODE_CLASS = 'graph_node';
var EDGE_CLASS = 'graph_edge';

function Ids(n) {
    n = n || 0;
    return function () {
        return n++;
    }
}

/**
 *
 * @param option  {container,nodes,edges} , nodes : {id,x,y,r,type} , edges:{source,target,type}
 * @constructor
 */
function Ngraph(option) {
    if (!(this instanceof Ngraph)) {
        return new Ngraph(option);
    }
    option = option || {};
    if (!option.container) throw 'no attr {container}, a dom or the id of it';
    if (typeof option.container === 'string') {
        option.container = '#' + option.container;
    }
    if (!(this.container = d3.select(option.container))) throw 'no container exist.';
    if (!(this.nodes = option.nodes)) throw 'no nodes data';
    this.edges = option.edges || [];

    this.container.node().oncontextmenu = function () { return false};

    this.NODE_CLASS = NODE_CLASS;
    this.EDGE_CLASS = EDGE_CLASS;


    this.init();
    this.render();
    this.initEvents();
}

var p = Ngraph.prototype;

/**
 * 初始化
 */
p.init = function () {
    this.zoomContainer = this.container.append('g');
    this.defsContainer = this.zoomContainer.append('defs');
    this.edgesContainer = this.zoomContainer.append('g');
    this.nodesContainer = this.zoomContainer.append('g');

    //map info

    this.getEdgeID = Ids();

    this.nodeToDom = {};
    this.edgeToDom = {};
    this.nodeToEdges = {};
    this.nodesMap = {};
    this.nodes.forEach(function (e) {
        this.nodesMap[e.id] = e;
        this.nodeToEdges[e.id] = {in: [], out: []};
    }.bind(this));

    this.edges.forEach(function (e, i) {
        if (!(e.source = this.nodesMap[e.source])) throw `no node id : ${e.source}`;
        this.nodeToEdges[e.source.id].out.push(e);
        if (!(e.target = this.nodesMap[e.target])) throw `no node id : ${e.target}`;
        this.nodeToEdges[e.target.id].in.push(e);

        e.id = 'edge' + this.getEdgeID();//todo
    }.bind(this));

    this.initDefs();
};

/**
 * 初始化 svg -defs
 */
p.initDefs = function () {
    var types = render.getTypes();
    for (var e in types.edge)
        types.edge[e].defs && types.edge[e].defs(this.defsContainer);

    for (var e in types.node)
        types.node[e].defs && types.node[e].defs(this.defsContainer);
};

/**
 * 初始化 事件
 */
p.initEvents = function () {

    eventInit(this);

    //drag
    var node_g = this.nodesContainer.selectAll(`g.${NODE_CLASS}`);//todo
    var handle = drag(this);
    this.dragHandler = d3.drag()
        .on("start", handle.dragStarted)
        .on("drag", handle.dragged)
        .on("end", handle.dragEnded);

    node_g.call(this.dragHandler);

    //zoom
    this.zoomHanle = d3.zoom()
        .scaleExtent([0.01, 20])
        .on("zoom", zoomed.bind(this));
    this.container.call(this.zoomHanle).on("dblclick.zoom", null);
    function zoomed() {
        this.zoomContainer.attr('transform',d3.event.transform.toString());
    }




};

/**
 *  render 整个graph
 */
p.render = function () {
    var nodes = this.nodes;
    var edges = this.edges;

    for (var i = 0, len = nodes.length; i < len; i++)
        this.renderNode(nodes[i]);

    for (var i = 0, len = edges.length; i < len; i++)
        this.renderEdge(edges[i]);
};

/**
 * 绘制 node
 * @param data
 */
p.renderNode = function (data) {
    var r = render.getNodeRender(data.type);
    if (!r || !r.render) {
        console.error(`no node {${data.type}} render`);
        return;
    }

    var p = this.nodesContainer.append('g').classed(NODE_CLASS, true).style('transform',`translate(${data.x}px,${data.y}px)`);
    r.render(p, data);
    // data.dom = p;
    this.nodeToDom[data.id] = p;
    p.datum(data);
};
/**
 * 绘制edge
 * @param data
 */
p.renderEdge = function (data) {
    var r = render.getEdgeRender(data.type);
    if (!r || !r.render) {
        console.error(`no edge {${data.type}} render`);
        return;
    }
    var p = this.edgesContainer.append('g').classed(EDGE_CLASS, true);
    r.render(p, data);
    // data.dom = p;
    this.edgeToDom[data.id] = p;
    p.datum(data);
};
/**
 * 更新 nodes 以及 关联的 links
 * @param nodes
 */
p.updateNodes = function (nodes) {
    var data, r, edgesIn, edgesOut;

    for (var i = 0, len = nodes.length; i < len; i++) {
        data = nodes[i];
        // r = render.getNodeRender(data.type);
        // r.update(data.dom, data);
        this.updateNode(data);
    }

    this.updateEdges(this.nodesToEdges(nodes));
};

p.updateNode = function (data) {
    this.nodeToDom[data.id].style('transform',`translate(${data.x}px,${data.y}px)`);
};

/**
 * 更新 edge
 * @param edges
 */
p.updateEdges = function (edges) {
    edges = edges || this.edges;
    var data, r;
    for (var i = 0, len = edges.length; i < len; i++) {
        data = edges[i];
        r = render.getEdgeRender(data.type);
        r.update(this.edgeToDom[data.id], data);
    }
};

//map
p.nodesToEdges = function (nodes) {
    nodes = nodes || [];
    var data, edgesIn, edgesOut;
    var map = {};
    var edges = [];

    for (var i = 0, len = nodes.length; i < len; i++) {
        data = nodes[i];

        edgesIn = this.nodeToEdges[data.id].in;
        edgesIn.forEach(function (e) {
            if (!map[e.id]) {
                map[e.id] = true;
                edges.push(e);
            }
        });

        edgesOut = this.nodeToEdges[data.id].out;
        edgesOut.forEach(function (e) {
            if (!map[e.id]) {
                map[e.id] = true;
                edges.push(e);
            }
        });

    }

    return edges;
};


export  default  Ngraph;