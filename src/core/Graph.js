
'use strict';


import  utils  from '../util.js'
// import  Quad from '../base/Quad'
import EventEmitter from '../base/EventEmitter'

class Graph extends EventEmitter{

    constructor(options) {

        super();

        options = options || {};

        // this.quad = new Quad();

        this.read(options);

    }

    clear(){
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
        
        this.curveGroup = null;
    }

    /**
     * 读取 node ,edge 信息
     * @param options
     */
    read(options) {

        this.clear();

        (options.nodes || []).forEach(function (e) {
            if (!e.id) e.id = utils.uuid();
            e.id += '';
            this.nodesIndex[e.id] = e;
            this.nodes.push(e);
        }.bind(this));

        (options.edges || []).forEach(function (e) {
            if (!e.id) e.id = utils.uuid();

            if (!e.source || !this.nodesIndex[e.source + ''])
            {
                // console.log(e);
                console.error('some edge has not source id or not a node of the id') ;
                return
            }
            if (!e.target || !this.nodesIndex[e.target + '']){
                // console.log(e);
                console.error('some edge has not target id or not a node of the id');
                return
            }

            this.edgesIndex['' + e.id] = e;

            e.source += '';
            e.target += '';

            this.inEdgesIndex[e.target] = this.inEdgesIndex[e.target] || [];
            this.inEdgesIndex[e.target].push(e.id);

            this.outEdgesIndex[e.source] = this.outEdgesIndex[e.source] || [];
            this.outEdgesIndex[e.source].push(e.id);

            this.edges.push(e);

        }.bind(this));

        this.createEdgeCurveCount();

        this.emit('reset');

        // this.quad.index(this.nodes);

    }

    createEdgeCurveCount(){
        
        var map = this.curveGroup = {};
        
        var source,target,attr;
        this.edges.forEach(function (edge) {
            source = this.nodesIndex[edge.source];
            target = this.nodesIndex[edge.target];
            attr = edge.source+edge.target;
            if(!map[attr]) map[attr] = map[edge.target+edge.source] = {counter:0,source:edge.source};

            edge._curveGroup = map[attr];

            edge.curveCount = map[attr].counter;
            map[attr].counter++;
            edge.curveOrder = edge.source == map[attr].source;
        }.bind(this));
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
            if (this.nodesIndex[node.id]) {
                throw 'node has existed.'
            }
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
            if (this.edgesIndex[edge.id]){
                // debugger
                throw 'edge has existed.';
            }
            if (!edge.source || !this.nodesIndex[edge.source + '']){
                console.log(edge);
                throw 'some edge has not source id or not a node of the id';
            }
            if (!edge.target || !this.nodesIndex[edge.target + '']) {
                console.log(edge);
                throw 'some edge has not target id or not a node of the id';
            }

            this.edges.push(edge);
            this.edgesIndex[edge.id] = edge;

            edge.source += '';
            edge.target += '';

            this.inEdgesIndex[edge.target] = this.inEdgesIndex[edge.target] || [];
            this.inEdgesIndex[edge.target].push(edge.id);

            this.outEdgesIndex[edge.source] = this.outEdgesIndex[edge.source] || [];
            this.outEdgesIndex[edge.source].push(edge.id);
        }

        this.createEdgeCurveCount();

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

    setNodeData(ids,objs){
        // console.time('setNodeData')
        if(!utils.isArray(ids)){
            ids = [ids];
        }

        var objIsArr = utils.isArray(objs);

        var nodeDirtyArr = [];
        var edgeDirtyArr = [];
        var edgeIdArr = [];

        ids.forEach(function (id,i) {
            var node = this.nodesIndex[id];
            var obj = objIsArr ? objs[i] : objs;
            var updatePos = false;

            if(obj.hasOwnProperty('x') || obj.hasOwnProperty('y')) updatePos = true;

            for(var attr in obj){
                node[attr] = obj[attr];
            }
            nodeDirtyArr.push(obj);

            if(updatePos){
                if (this.inEdgesIndex[id] && this.inEdgesIndex[id].length > 0) {
                    this.inEdgesIndex[id].forEach(id => {
                        edgeIdArr.push(id);
                        edgeDirtyArr.push({source: true, target: true});
                    });
                }

                if (this.outEdgesIndex[id] && this.outEdgesIndex[id].length > 0) {
                    this.outEdgesIndex[id].forEach(id => {
                        edgeIdArr.push(id);
                        edgeDirtyArr.push({source: true, target: true});
                    });
                }
            }
        }.bind(this));

        this.emit('change',['node',ids,nodeDirtyArr]);

        edgeIdArr.length > 0 && this.emit('change',['edge',edgeIdArr,edgeDirtyArr]);

        // console.timeEnd('setNodeData')
    }

    setEdgeData(ids,objs){

        if(!utils.isArray(ids)){
            ids = [ids];
        }

        var objIsArr = utils.isArray(objs);

        var edgeDirtyArr = [];

        ids.forEach(function (id,i) {
            var edge = this.edgesIndex[id];
            var obj = objIsArr? objs[i] : objs;

            for(var attr in obj){
                edge[attr] = obj[attr];
            }
            edgeDirtyArr.push(obj);
        }.bind(this));


        this.emit('change',['edge',ids,edgeDirtyArr])
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


