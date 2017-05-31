
import nodeOverCustom from './customOverRender'

function layerCheckDefault() {
    return function (data) {
        return !data.type || data.type == 'default';
    }
}
function layerCheck(type) {
    return function (data) {
        return data.type == type;
    }
}

function edgeCount(count,not) {
    return　function (data) {
        var check = (!data.type || data.type == 'default') && data.curveCount == count;
        return not ? !check : check;
    }
}

export default function (WebGLRender) {
    WebGLRender.defaultLayersConfig = [
        {
            name:'base',
            subLayers:[
                {name:'edge',context:'edge',render:WebGLRender.edge.default,check:edgeCount(0)},
                {name:'edgeCurve',context:'edge',render:WebGLRender.edge.curve,check:edgeCount(0,true)},

                {name:'edgeLabel',context:'edge',render:WebGLRender.edgeLabel.default,check:edgeCount(0)},
                {name:'edgeCurveLabel',context:'edge',render:WebGLRender.edgeLabel.curve,check:edgeCount(0,true)},

                {name:'node',context:'node',render:WebGLRender.node.default,check:layerCheckDefault()},
                {name:'rectNode',context:'node',render:WebGLRender.node.rect,check:layerCheck('rect')},

                {name:'nodeLabel',context:'node',render:WebGLRender.nodeLabel.default},

                {name:'nodeOver',custom:true,render:nodeOverCustom,option:{over:false}},
            ]
        },
    ];
};

