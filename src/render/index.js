/**
 * Created by chengang on 17-3-28.
 */


import WebGLRender from './webgl/render'
WebGLRender.node = {};
WebGLRender.edge = {};
WebGLRender.nodeLabel = {};
WebGLRender.edgeLabel = {};

import node from './webgl/node/index'
import edge from './webgl/edge/default'
WebGLRender.node.default = node;
WebGLRender.edge.default = edge;

import NodeLabel from './webgl/label/NodeLabel'
import EdgeLabel from './webgl/label/EdgeLabel'
WebGLRender.nodeLabel.default = NodeLabel;
WebGLRender.edgeLabel.default = EdgeLabel;


export {
    WebGLRender
};
