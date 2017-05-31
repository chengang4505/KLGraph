# usage

添加js文件
```html
    <script src="js/klgraph.js"></script>
```

graph container

```html
<div id="graph"></div>
```

创建graph

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

```