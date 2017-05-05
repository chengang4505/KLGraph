/**
 * Created by chengang on 17-3-28.
 */


import WebGLRender from './webgl/render'
WebGLRender.node = {};
WebGLRender.edge = {};
WebGLRender.nodeLabel = {};
WebGLRender.edgeLabel = {};

import node from './webgl/node/default/Node'
import rect from './webgl/node/rect/Rect'
// import node from './webgl/node/index'
WebGLRender.node.default = node;
WebGLRender.node.rect = rect;


import edge from './webgl/edge/default'
import curve from './webgl/edge/curve/curve'
WebGLRender.edge.default = edge;
WebGLRender.edge.curve = curve;

import NodeLabel from './webgl/label/NodeLabel'
WebGLRender.nodeLabel.default = NodeLabel;
WebGLRender.nodeLabel.rect = NodeLabel;


import EdgeLabel from './webgl/label/EdgeLabel'
import curveLabel from './webgl/label/curveLabel/curveLabel'
WebGLRender.edgeLabel.default = EdgeLabel;
WebGLRender.edgeLabel.curve = curveLabel;


export {
    WebGLRender
};
