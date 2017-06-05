# WebGLRender {docsify-ignore}

 　webGL-based渲染引擎。
 
## Event

参数：function(render) , `render`是render本身.

### `renderBefore`

render之前调用。

### `renderAfter`

render之后调用.

```javascript
render.on('renderBefore',function(render) {
  //call before render
})

render.on('renderAfter',function(render) {
  //call after render
})

```



## 方法

> ### setContextFilters(context,filters)

设置context相关的filters。
- `context{string}`:　值为`node`,`edge`.
- `filters{fun|[fun]}`: fun 有一个参数function(node|edge)，返回`true`时，被过滤掉,filters为null时，移除filters.

> ### getContextFilters(context)

获取相应context的filters,返回一个数组filters。
- `context{string}`:　值为`node`,`edge`.

> ### setLayerFilters(layer,filters)

设置layer相关的filters。
- `layer{string}`:　值为渲染层的name，如：`nodeLabel`.
- `filters{fun|[fun]}`: fun 有一个参数function(node|edge)，当`layer`是`node`相关的layer时为一个node对象,
当`layer`是`edge`相关的layer时为一个edge对象,返回`true`时，被过滤掉;filters为`null`时，移除filters.

> ### getLayerFilters(layer)

获取相应layer的filters,返回一个数组filters。
- `layer{string}`:　值为渲染层的name，如：`nodeLabel`.

> ### forceRender()

强制render下一个frame渲染。

> ### setLayerOption(layer,option)

设置layer的option。
- `layer{string}`: 渲染层的name.
- `option{obj}`: 设置自定义的`option`,`option`的属性会覆盖之前设置的属性。如：`{flag:'test'}`


> ### hideRenderLayer(layers)

只是隐藏渲染层，但是不会影响该渲染层数据的更新。
- `layers{string|[string]}`: 渲染层的name.

> ### showRenderLayer(layers)

显示渲染层。
- `layers{string|[string]}`: 渲染层的name.

> ### getCameraMatrix(isInvert)

返回camera的变换矩阵(3x3).
- `isInvert`: 为`true`时，返回逆矩阵。

> ### updateByLayerFilter(layers)

清除相应layer的index cache，更新视图
- `layers{string|[string]}`: 渲染层的name.

> ### updateByContextFilter(context)

清除context相关layer的index cache，更新视图。
- `context{string}`: 值为`node`,`edge`.

> ### disableRenderLayer(layers)

disable渲染层，该层的数据不会更新，也不会被渲染。
- `layers{string|[string]}`: 渲染层的name.

> ### enableRenderLayer(layers)

enable渲染层，该层的数据会重新计算。
- `layers{string|[string]}`: 渲染层的name.

> ### zoomTo(option[,time])

缩放相机。
- `option{obj}`: camera 的参数，`option`的属性会覆盖camera原有的属性.
- `time{number}`: 有time时，为动画的持续时间。 
```javascript
this.zoomTo({
    scale:1,//缩放
    positionX:0,//x 坐标
    positionY:0,//y 坐标
    rotation:0//旋转
},1000)
```

> ### clearRenderCache([layers])

清除渲染层的vertex　cache.不传参数，清除所有渲染层的vertex　cache.
- `layers{string|[string]}`: 渲染层的name.

> ### graphToDomPos(pos)

从graph坐标系转换到Dom坐标系。
- `pos{obj}`:　坐标。如`{x:0,y:100}`

> ### domToCameraPos

从Dom坐标系转换到camera坐标系。
- `pos{obj}`:　坐标。如`{x:0,y:100}`

> ### cameraToGraphPos

从camera坐标系转换到graph坐标系。
- `pos{obj}`:　坐标。如`{x:0,y:100}`

