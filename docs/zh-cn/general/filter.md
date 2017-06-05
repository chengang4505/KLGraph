# Filter/过滤器 {docsify-ignore-all}
<!--iframe[./examples/filter.html]-->

### 分层
render采用分层渲染的机制，有三种context相关的layer。如： `node`相关的layer,`edge`相关的layer,
`graph`相关的layer.

render默认layer配置：
```javascript
{name:'edge',context:'edge',render:WebGLRender.edge.default,check:edgeCount(0)},
{name:'edgeCurve',context:'edge',render:WebGLRender.edge.curve,check:edgeCount(0,true)},

{name:'edgeLabel',context:'edge',render:WebGLRender.edgeLabel.default,check:edgeCount(0)},
{name:'edgeCurveLabel',context:'edge',render:WebGLRender.edgeLabel.curve,check:edgeCount(0,true)},

{name:'node',context:'node',render:WebGLRender.node.default,check:layerCheckDefault()},
{name:'rectNode',context:'node',render:WebGLRender.node.rect,check:layerCheck('rect')},

{name:'nodeLabel',context:'node',render:WebGLRender.nodeLabel.default},

//custom　layer
{name:'nodeOver',custom:true,render:nodeOverCustom,option:{over:false}},
```



### Filter有两种：
- `context filter`:
    如:`node`filter `edge`filter,过滤与该context相关的layer；`node`filter会把node相关的边的layer也过滤掉。
    - **setContextFilters(context,filters)**:
    设置context filter,filters 为`null`时移除filter;
    - **getContextFilters(context)**:
    获取context filter.
- `layer filter`:
    过滤渲染layer相关的filter,只过滤该layer.
    - **setLayerFilters(layer,filters)**:
        设置layer filter,filters 为`null`时移除filter;
    - **getLayerFilters(layer)**:
        获取layer filter.

### 例子

```html
<input id="node" value="10" type="range" name="range" step="0.1"  min="10" max="20"/>
<input id="edge" value="1.6" type="range" name="range" step="0.01"  min="1.6" max="2"/>
```


```javascript
 var filterNodeSize = 0;
function filterNode(node) {
    var size = node.size;
    return size <= filterNodeSize;
}

var filterEdgeSize = 0;
function filterEdge(edge) {
    var size = edge.size;
    return size <= filterEdgeSize;
}

var filterN = document.getElementById('node');
var filterE = document.getElementById('edge');

//设置filter
gview.render.setContextFilters('node',[filterNode]);
gview.render.setContextFilters('edge',[filterEdge]);


filterN.addEventListener('input',function (e) {
    //更新视图
    filterNodeSize = parseFloat(filterN.value);
    //update indexCache
    gview.render.updateByContextFilter('node');
    //与node 相关的edge也会过滤掉，
    gview.render.updateByContextFilter('edge');
})

filterE.addEventListener('input',function (e) {
    //更新视图
    filterEdgeSize = parseFloat(filterE.value);
    //update indexCache
    gview.render.updateByContextFilter('edge');
})


```