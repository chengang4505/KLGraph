# Edge/边 {docsify-ignore-all}

<!--iframe[./examples/edge.html]-->

## edge add/remove

```javascript
//add
gview.graph.addEdge(edge)
```

```javascript
//remove
gview.graph.removeEdge(edgeid)
```

## 属性 

```javascript
var edges = [];

edges.push({
    label: 'edge',
    source: 'nodeid1',
    target: 'nodeid2',
    dashed: true,
    size:1.6,
    color: 'rgba(31, 73, 107, 0.3)',
    arrowSize:6
})


```

- `label`:edge 的label.
- `source`:edge 的　source node id.
- `target`:edge 的　target node id.
- `dashed`: edge 是否为dashed.
- `size`: edge 的　粗细大小.
- `color`: edge 的　颜色.
- `arrowSize`：edge的箭头大小.