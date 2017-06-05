# Render layer config/分层　{docsify-ignore-all}

<!--iframe[./examples/layout.html]-->

```javascript
gview.makeLayout('circular', option, function () {
    //do something
});

```
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

## Layout类型　

- `circular`:圆形布局.
- `d3force`:动力学布局，依赖d3.
- `cola`:动力学布局,依赖.
- `flow`:布局的name.
- `darge`:布局的name.
- `grid`:布局的name.
