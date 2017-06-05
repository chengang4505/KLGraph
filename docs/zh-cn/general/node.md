# Node/节点 {docsify-ignore-all}

<!--iframe[./examples/node.html]-->

## node add/remove

```javascript
//add
gview.graph.addNode(node)
```

```javascript
//remove
gview.graph.removeNode(nodeid)
```

## node属性

```javascript
var nodes = [];

nodes.push({
    type:'default',
    id: 'node1',
    label:'node1',
    x: 100,
    y: 100,
    size: 16,
    color: '#ff00',
    icon: '\uf1a7',
})

nodes.push({
    type:'rect',
    id: 'node2',
    label:'node2',
    x: 200,
    y: 200,
    width: 16,
    height: 10,
    color: '#ff00',
    icon: '\uf1a7',
})

```

- `type` : 支持两中node 类型: `default` `rect`;`default` node 是圆形，`rect` node 是矩形， default:`default`。
- `id`: node 的 id，没有会自动生成一个uuid.
- `label`: node 的 label.
- `x/y`: x / y坐标.
- `size`: `type` 为 `default`时的圆半径. default为`config.defaultNodeSize`
- `width/height`: `type` 为 `rect`时的宽高. 没有赋值时为`size`的值，`size`没有值时为`config.defaultNodeSize`
- `color`: node的颜色.　支持两只格式:`#ff0000`,`rgba(100,100,100,0.5)`; default为`config.defaultNodeColor`
- `icon`:图标的content（支持字体图标），默认是`FontAwesome`,
