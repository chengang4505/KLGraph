# Icon/图标 {docsify-ignore-all}
<!--iframe[./examples/icon.html]-->

node 可以支持第三方字体ICON.

## font-awesome字体

```html
	<link rel="stylesheet" href="../assert/font-awesome-4.7.0/css/font-awesome.css">
```

```html
//告诉brower加载font，但不显示
<i class="fa fa-university" style="transform: scale(0)"></i>
```

```javascript
//add
    var icons = ['\uf19c', '\uf1a7', '\uf19e', '\uf1a0'];
    var nodes = [];
    nodes.push({
        //.....
        icon:icons[2],
    })
```

```javascript
//等待字体加载完成
    if (document.fonts) {
        var fontsReady = document.fonts.ready;
        if (typeof(fontsReady) == "function") {
            fontsReady = document.fonts.ready();
        }
        fontsReady.then(function () {
            main();
        });
    }

    function main() {
        var gview = new KLGraph.GraphView({
            nodes: nodes,
            edges: edges,
            container: graph,
        });
    }
```