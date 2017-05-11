/**
 * Created by chengang on 17-3-29.
 */

'use strict';

import util from '../util'

export default function initEvent() {

    function handlerWrap(handle) {
        return function (e) {
            var pos = _this.toCameraPos({x: e.offsetX, y: e.offsetY});
            e.cameraX = pos.x;
            e.cameraY = pos.y;
            handle(e);
        }
    }


    var _this = this;
    var mouseDown= false,mouseMove = false;

    var events = {
        // click:handlerWrap(_clickHandler),
        mousemove:handlerWrap(_moveHandler),
        mousedown:handlerWrap(_downHandler),
        mouseup:handlerWrap(_upHandler),
        mousewheel:handlerWrap(_wheelHandler),
    };


    for(var e in events)    this.container.addEventListener(e, events[e], false);

    events.click = handlerWrap(_clickHandler);

    //some little situation maybe need the trigger function.
    this.trigger = function (type,event) {
        if(events[type]) events[type](event);
    };


    function checkInNode(posx,posy,node) {
        var isFind = false;
        var dis,sizeX,sizeY;
        if(node.type == 'rect'){
            sizeX = util.getNodeSizeX(node);
            sizeY = util.getNodeSizeY(node);
            isFind = util.inRect(posx,posy,node.x-sizeX,node.y-sizeY,sizeX*2,sizeY*2);
        }else {
            dis = util.getDistance(posx, posy, node.x, node.y);
            isFind = dis <= node.size
        }
        return isFind;
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
                if (checkInNode(pos.x,pos.y,node)) {
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
        if(mouseDown)   mouseMove = true;
        // var graphPos = _this.toGraphPos({x:e.cameraX,y:e.cameraY});
        // var node = getNode(graphPos);
    }


    function _downHandler(e) {

        mouseDown = true;

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
                    _this.camera.positionX -= offsetx;
                    _this.camera.positionY -= offsety;
                }else {

                    if(_this.context.selection.isSelected(node)){
                        _this.context.selection.data.forEach(function (node) {
                            _this.graph.setNodeData(node.id,{x:node.x+offsetx,y:node.y+offsety});
                        });
                    }else _this.graph.setNodeData(node.id,{x:node.x+offsetx,y:node.y+offsety});
                    // _this.emit('drag',['node',offsetx,offsety]);

                    // fit(e);
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
                e.preventDefault();
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

        if(mouseDown && !mouseMove){
            _clickHandler(e);
        }
        mouseDown = false;
        mouseMove = false;

        if ((e.which && e.which == 3) || (e.button && e.button == 2)){
            var graphPos = _this.toGraphPos({x:e.cameraX,y:e.cameraY});
            var node = getNode(graphPos);
            if(node){
                _this.emit('rightclick',['node',node,e]);
            }else {
                _this.emit('rightclick',['stage',null,e]);
            }
        }



    }

    function _wheelHandler(e) {
        _this.forceRender();
        var ratio = _this.config.zoomRatio;
        if(e.wheelDelta > 0){
            _this.zoomTo(1/ratio,e.cameraX,e.cameraY);
            _this.emit('zoom',[1/ratio])
        }else {
            _this.zoomTo(ratio,e.cameraX,e.cameraY);
            _this.emit('zoom',[ratio])
        }
    }

    //drag


    function fit(e) {
        var x = e.offsetX,y = e.offsetY;

        var camearaX = _this.camera.positionX;
        var camearaY = _this.camera.positionY;
        var scale = _this.camera.scale;

        var offset = 20/scale;
        var update = false;

        if(x < 100 ){
            update = true;
            camearaX -= offset;
        }
        if(x > _this.container.clientWidth - 100){
            update = true;
            camearaX += offset;
        }

        if(y < 100){
            update = true;
            camearaY += offset;
        }

        if(y > _this.container.clientHeight - 100){
            update = true;
            camearaY -= offset;
        }

        // if(update) _this.zoomToAnimation({
        //     positionX:camearaX,
        //     positionY:camearaY,
        //     scale:scale
        // });

        if(update) _this.zoomTo(1.01,e.cameraX,e.cameraY,true);
    }
}
