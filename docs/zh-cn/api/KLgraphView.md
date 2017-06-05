# KLgraphView {docsify-ignore}

## 属性

- `render`: WebGLRender对象。
- `graph`: 对node,edge管理。
- `selection`: node,edge选择器。
- `config`: 配置。
- `container`: container dom。

## Event


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


## 方法

> ### fit(duration,option)

设置context相关的filters。
- `duration{number}`:　值为`node`,`edge`.
- `option{obj}`: fun 有一个参数function(node|edge)，返回`true`时，被过滤掉。

> ### makeLayout(type,option,cb)

对graph进行布局。
- `type{string}`:　布局的name.如:`circular`,`cola`
- `option{obj}`: 传入布局的参数。
    >基本参数
    
    - `nodes{[obj]}`: 需要布局的node,不传就是对graph所有的node布局。
    - `duration{number}`: 动画的时间,不传没有动画。
    - `center{boolean}`: 是否对布局之后的中心对齐布局前的中心。
    - `fit{boolean}`: 是否对布局之后node适应显示视图。
    
    >其他布局相关的参数

- `cb{fun}`: 布局完成后的callback。

> ### on(type,cb)

注册事件。
- `type{string}`:　事件name,如：`nodeClick`,`nodeOver`
- `cb{fun}`:　callback,返回参的数因不同的事件不同。


> ### off(type,cb)

取消注册事件
- `type{string}`:　事件name
- `cb{fun}`:　callback.

