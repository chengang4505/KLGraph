/**
 * Created by chengang on 17-3-17.
 */

import  utils  from '../util.js'
import  Quad from '../base/Quad'
import EventEmitter from '../base/EventEmitter'

class Graph extends EventEmitter{

    constructor(options) {

        super();

        options = options || {};

        /**
         * node edge data
         */
        this.nodes = [];
        this.edges = [];

        /**
         * node edge index
         */
        this.nodesIndex = {};
        this.edgesIndex = {};

        /**
         *nodes degrees info
         */
        this.inEdgesIndex = {};
        this.outEdgesIndex = {};


        // this.quad = new Quad();

        if (options.nodes || options.edges) this.read(options);

    }

    /**
     * 读取 node ,edge 信息
     * @param options
     */
    read(options) {
        this.nodes = options.nodes || [];
        this.edges = options.edges || [];

        this.nodes.forEach(function (e) {
            if (!e.id) e.id = utils.uuid();
            e.id += '';
            this.nodesIndex[e.id] = e;
        }.bind(this));

        this.edges.forEach(function (e) {
            if (!e.id) e.id = utils.uuid();
            this.edgesIndex['' + e.id] = e;

            if (!e.source || !this.nodesIndex[e.source + '']) throw 'some edge has not source id or not a node of the id';
            if (!e.target || !this.nodesIndex[e.target + '']) throw 'some edge has not target id or not a node of the id';

            e.source += '';
            e.target += '';

            this.inEdgesIndex[e.target] = this.inEdgesIndex[e.target] || [];
            this.inEdgesIndex[e.target].push(e.id);

            this.outEdgesIndex[e.source] = this.outEdgesIndex[e.source] || [];
            this.outEdgesIndex[e.source].push(e.id);

        }.bind(this));

        this.emit('reset');

        // this.quad.index(this.nodes);

    }

    /**
     * add nodes
     * @param nodes
     */
    addNode(nodes) {
        nodes = nodes || [];

        if(nodes.length == 0) return;

        if (!utils.isArray(nodes)) nodes = [nodes];

        var node;
        for (var i = 0; i < nodes.length; i++) {
            node = nodes[i];
            if (!node.id) node.id = utils.uuid();
            if (this.nodesIndex[node.id]) throw 'node has existed.'
            this.nodes.push(node);
            this.nodesIndex[node.id] = node;
        }

        var ids = nodes.map(function (e) {return e.id});
        this.emit('add',['node',ids]);
    }


    /**
     * remove node
     * @param nodeid
     */
    removeNode(nodeid) {
        if (!nodeid || !this.nodesIndex[nodeid]) return;

        var nodes = this.nodes;
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].id == nodeid) {
                nodes.splice(i, 1);
                break
            }
        }
        var edges;
        edges = this.inEdgesIndex[nodeid];
        if (edges && edges.length > 0) {
            edges = edges.slice();
            edges.forEach(function (e) {
                this.removeEdge(e);
            }.bind(this));
        }

        edges = this.outEdgesIndex[nodeid];
        if (edges && edges.length > 0) {
            edges = edges.slice();
            edges.forEach(function (e) {
                this.removeEdge(e);
            }.bind(this));
        }

        this.nodesIndex[nodeid] = null;
        this.inEdgesIndex[nodeid] = null;
        this.outEdgesIndex[nodeid] = null;

        this.emit('remove',['node',nodeid]);

    }


    /**
     * add edges ,
     * @param edges
     */
    addEdge(edges) {
        edges = edges || [];

        if(edges.length  == 0) return;

        if (!utils.isArray(edges)) edges = [edges];

        var edge;
        for (var i = 0; i < edges.length; i++) {
            edge = edges[i];
            if (!edge.id) edge.id = utils.uuid();
            if (this.edgesIndex[edge.id]) throw 'edge has existed.';
            if (!edge.source || !this.nodesIndex[edge.source + '']) throw 'some edge has not source id or not a node of the id';
            if (!edge.target || !this.nodesIndex[edge.target + '']) throw 'some edge has not target id or not a node of the id';

            this.edges.push(edge);
            this.edgesIndex[edge.id] = edge;

            edge.source += '';
            edge.target += '';

            this.inEdgesIndex[edge.target] = this.inEdgesIndex[edge.target] || [];
            this.inEdgesIndex[edge.target].push(edge.id);

            this.outEdgesIndex[edge.source] = this.outEdgesIndex[edge.source] || [];
            this.outEdgesIndex[edge.source].push(edge.id);
        }

        var ids = edges.map(function (e) {return e.id});
        this.emit('add',['edge',ids]);
    }


    removeEdge(edgeid) {
        if (!edgeid || !this.edgesIndex[edgeid]) return;

        var edge = this.edgesIndex[edgeid], edges;
        var outEdgesIndex, inEdgesIndex;


        outEdgesIndex = this.outEdgesIndex[edge.source];
        if (outEdgesIndex.length > 0) {
            for (var i = 0; i < outEdgesIndex.length; i++) {
                if (outEdgesIndex[i] == edgeid) {
                    outEdgesIndex.splice(i, 1);
                    break;
                }
            }
        }
        inEdgesIndex = this.inEdgesIndex[edge.target];
        if (inEdgesIndex.length > 0) {
            for (var i = 0; i < inEdgesIndex.length; i++) {
                if (inEdgesIndex[i] == edgeid) {
                    inEdgesIndex.splice(i, 1);
                    break;
                }
            }
        }


        edges = this.edges;
        for (var i = 0; i < edges.length; i++) {
            if (edges[i].id == edgeid) {
                edges.splice(i, 1);
                break;
            }
        }

        this.edgesIndex[edgeid] = null;
        this.emit('remove',['edge',edgeid]);
    }

    getNodes(){
        return this.nodes;
    }

    setNodeData(id,obj){
        var node = this.nodesIndex[id];

        var updatePos = false;
        if(obj.hasOwnProperty('x') || obj.hasOwnProperty('y')) updatePos = true;

        for(var attr in obj) node[attr] = obj[attr];

        this.emit('change',['node',id]);
        if(updatePos){
            this.inEdgesIndex[id] && this.inEdgesIndex[id].length > 0 && this.emit('change',['edge',this.inEdgesIndex[id]]);
            this.outEdgesIndex[id] && this.outEdgesIndex[id].length > 0 && this.emit('change',['edge',this.outEdgesIndex[id]]);
        }
    }

    updateNodeQuad(id,oldpos){
        var nodes = this.quad.point(oldpos.x,oldpos.y);
        if(nodes.length > 0){
            for(var i = 0,len = nodes.length;i<len;i++){
                if(nodes[i].id == id){
                    nodes.splice(i,1);
                    break;
                }
            }
            this.quad.insert(this.nodesIndex[id],this.quad.root);
        }
    }
}

export default Graph;

