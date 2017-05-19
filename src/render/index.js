

import WebGLRender from './webgl/render'
WebGLRender.node = {};
WebGLRender.edge = {};
WebGLRender.nodeLabel = {};
WebGLRender.edgeLabel = {};

import node from './webgl/node/default/render'
import rect from './webgl/node/rect/render'
WebGLRender.node.default = node;
WebGLRender.node.rect = rect;


import NodeLabel from './webgl/label/NodeLabel'
WebGLRender.nodeLabel.default = NodeLabel;
WebGLRender.nodeLabel.rect = NodeLabel;

import edge from './webgl/edge/render'
import curve from './webgl/edge/curve/render'
WebGLRender.edge.default = edge;
WebGLRender.edge.curve = curve;


import EdgeLabel from './webgl/label/EdgeLabel'
import curveLabel from './webgl/label/curveLabel/render'
WebGLRender.edgeLabel.default = EdgeLabel;
WebGLRender.edgeLabel.curve = curveLabel;




import initDefaultConfig from  './webgl/defaultLayerConfig'
initDefaultConfig(WebGLRender);

export {
    WebGLRender
};
