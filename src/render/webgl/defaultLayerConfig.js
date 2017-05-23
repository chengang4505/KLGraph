
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
function constantTrue() {
    return function () {
        return true;
    }
}


function nodeOverCustom(render) {
    var renderLayerMap = render.renderLayerMap;
    var program;
    var gl = render.gl;
    var selection = render.context.selection.getSelection();

    if(selection.length < 1) return;

    if(!this.indexBuffer) this.indexBuffer = gl.createBuffer();

    var indexsNode, cacheIndex,temp;

    indexsNode = [];
    cacheIndex = render.renderCache.node.index;


    selection.forEach(function (e) {
        temp = cacheIndex[e.id]['node'].data.indices;
        temp && temp.forEach(function (index) {
            indexsNode.push(index);
        });

    });

    program = renderLayerMap['node'].program;

    gl.useProgram(program);

    gl.bindBuffer(gl.ARRAY_BUFFER, program.vertexBuffer);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(indexsNode), gl.STATIC_DRAW);
    gl.drawElements(gl.TRIANGLES, indexsNode.length, gl.UNSIGNED_INT, 0);



}


export default function (WebGLRender) {
    WebGLRender.defaultLayersConfig = [
        {
            name:'base',
            subLayers:[
                {name:'edge',context:'edge',render:WebGLRender.edge.default,check:layerCheckDefault()},
                // {name:'edgeCurve',context:'edge',render:WebGLRender.edge.curve,check:layerCheck('curve')},
                //
                {name:'edgeLabel',context:'edge',render:WebGLRender.edgeLabel.default,check:layerCheckDefault()},
                // {name:'edgeCurveLabel',context:'edge',render:WebGLRender.edgeLabel.curve,check:layerCheck('curve')},

                {name:'node',context:'node',render:WebGLRender.node.default,cacheOldData:true,check:layerCheckDefault()},
                // {name:'rectNode',context:'node',render:WebGLRender.node.rect,check:layerCheck('rect')},

                // {name:'nodeOver',custom:true,render:nodeOverCustom},

                {name:'nodeLabel',context:'node',render:WebGLRender.nodeLabel.default,check:constantTrue()},
            ]
        },
    ];
};

