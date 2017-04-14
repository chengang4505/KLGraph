/**
 * Created by chengang on 17-3-29.
 */
import util from '../util'

export default function initEvent() {
    var _this = this;
    this.container.addEventListener('click', handlerWrap(_clickHandler), false);
    this.container.addEventListener('mousemove', handlerWrap(_moveHandler), false);
    this.container.addEventListener('mousedown', handlerWrap(_downHandler), false);
    this.container.addEventListener('mouseup', handlerWrap(_upHandler), false);
    this.container.addEventListener('mousewheel', handlerWrap(_wheelHandler), false);

    function handlerWrap(handle) {
        return function (e) {
            var pos = _this.toCameraPos({x: e.offsetX, y: e.offsetY});
            e.cameraX = pos.x;
            e.cameraY = pos.y;
            handle(e);
        }
    }

    function getNode(pos) {
        // var nodes = _this.graph.quad.point(pos.x, pos.y);
        var nodes = _this.graph.nodes;

        var node, dis;
        var findNode = null;
        if (nodes.length > 0) {
            for (var i = nodes.length - 1; i >= 0; i--) {
                node = nodes[i];
                // node = _this.graph.nodesIndex[node.id];
                dis = util.getDistance(pos.x, pos.y, node.x, node.y);
                if (dis <= node.size) {
                    findNode = node;
                    break;
                }
            }
        }
        return findNode;
    }



    function _clickHandler(e) {
        var graphPos = _this.toGraphPos({x:e.cameraX,y:e.cameraY});
        var node = getNode(graphPos);
        if(node) _this.emit('nodeclick',[node,e]);
        else _this.emit('stageclick',[e]);
    }

    function _moveHandler(e) {
        var graphPos = _this.toGraphPos({x:e.cameraX,y:e.cameraY});
        var node = getNode(graphPos);
    }


    function _downHandler(e) {
        var graphPos = _this.toGraphPos({x:e.cameraX,y:e.cameraY});
        var node = getNode(graphPos);
         handleDrag(!node);
        _this.forceRender();

        function handleDrag(isCamera) {
            var isDown = true;
            var startx = graphPos.x,starty = graphPos.y;

            var onmousemove =handlerWrap(function(e) {
                if(!isDown) return;
                // console.time('move')

                _this.forceRender();

                var graphPos = _this.toGraphPos({x:e.cameraX,y:e.cameraY});
                var offsetx = graphPos.x - startx;
                var offsety = graphPos.y - starty;

                if(isCamera){
                    _this.camera.position.x -= offsetx;
                    _this.camera.position.y -= offsety;
                }else {
                    _this.graph.setNodeData(node.id,{x:node.x+offsetx,y:node.y+offsety});
                }


                if(isCamera){
                    var newgraphPos = _this.toGraphPos({x:e.cameraX,y:e.cameraY});
                    startx = newgraphPos.x;
                    starty = newgraphPos.y;
                }else {
                    startx = graphPos.x;
                    starty = graphPos.y;
                }
                // console.timeEnd('move')
            });

            var onmouseup = handlerWrap(function(e) {
                isDown = false;
                clear();
            });

            var onmouseout = handlerWrap(function(e) {
                isDown = false;
                clear();
            });


            _this.container.addEventListener('mousemove',onmousemove);
            _this.container.addEventListener('mouseup',onmouseup);
            _this.container.addEventListener('mouseout',onmouseout);


            function clear() {
                onmousemove&&_this.container.removeEventListener('mousemove',onmousemove);
                onmouseup&&_this.container.removeEventListener('mouseup',onmouseup);
                onmouseout&&_this.container.removeEventListener('mouseout',onmouseout);
                onmousemove = onmouseup = onmouseout= null;
            }

        }

    }

    function _upHandler(e) {
    }

    function _wheelHandler(e) {
        _this.forceRender();
        var ratio = _this.option.zoomRatio;
        if(e.wheelDelta > 0){
            _this.zoomTo(1/ratio,e.cameraX,e.cameraY);
        }else {
            _this.zoomTo(ratio,e.cameraX,e.cameraY);
        }

    }

    //drag
}
