# Event {docsify-ignore-all}

<!--iframe[./examples/event.html]-->


```javascript
var graph = document.getElementById('graph');

var nodes = [
    {id:'node1',label:'节点１', x:-200, y:0, size:15},
    {id:'node2',label:'节点2', x:0, y:0, size:15}
];

var edges = [            
    {source:'node1',target:'node2',label:'curve1'}
];

var gview = new KLGraph.GraphView({
    nodes: nodes,
    edges: edges,
    container: graph,
});


gview.on('nodeClick',function(node,e) {
console.log('nodeClick');
})

gview.on('nodeRightClick',function(node,e) {
console.log('nodeRightClick');
})

gview.on('stageClick',function(e) {
console.log('stageClick');
})

//and so on
```



> `nodeClick`
> `nodeOver`
> `nodeOut`
> `nodeRightClick`
> `nodeMouseDown`

参数：function(node,e)
- `node`: node节点信息。
- `e`:　事件对象，`e.cameraX|e.cameraY`为camera坐标系坐标。


> `edgeClick`
> `edgeOver`
> `edgeOut`
> `edgeRightClick`

参数：function(edge,e)
- `edge`: edge节点信息。
- `e`:　事件对象，`e.cameraX|e.cameraY`为camera坐标系坐标。


> `stageClick`
> `stageRightClick`

参数：function(e)
- `e`:　事件对象，`e.cameraX|e.cameraY`为camera坐标系坐标。


> `zoom`

参数：function(ratio,cameraScale,e)
- `ratio`:缩放ratio; `ratio > 1` camera　scale变大，视图缩小，`ratio < 1` camera　scale变小，视图变大
- `cameraScale`:现在的camera　scale。
- `e`:　事件对象，`e.cameraX|e.cameraY`为camera坐标系坐标。

