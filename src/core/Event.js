
'use strict';

import util from '../util'



export default function initEvent() {

    var _this = this;
    var mouseDown= false,
        mouseMove = false,
        disableMove = false,
        //over info
        overInfo = {
            currentNode:null,
            currentEdge:null,
        };
    var config = _this.context.config;

    _this.context.overInfo = overInfo;


    var events = {
        // click:handlerWrap(_clickHandler),
        mousemove:handlerWrap(_moveHandler),
        mousedown:handlerWrap(_downHandler),
        mouseup:handlerWrap(_upHandler),
        mousewheel:handlerWrap(_wheelHandler),
        DOMMouseScroll:handlerWrap(_wheelHandler),//firfox
    };

    for(var e in events)    this.container.addEventListener(e, events[e], false);

    //custom simulate click event
    events.click = handlerWrap(_clickHandler);

    //some little situation maybe need the trigger function.
    this.trigger = function (type,event) {
        if(events[type]) events[type](event);
    };

    //handler
    function _clickHandler(e) {
        var graphPos = _this.cameraToGraphPos({x:e.cameraX,y:e.cameraY});
        var edge ,node;

       node = getNode(graphPos);
       if(node){
           _this.emit('nodeClick',[node,e]);
       }else if(config.enableEdgeEvent && (edge = getEdge(graphPos))){
           _this.emit('edgeClick',[edge,e]);
       }else {
           _this.emit('stageClick',[e]);
       }

    }

    function _downHandler(e) {

        disableDocSelect();

        //right click

        if(!mouseLeft(e)) return;

        mouseDown = true;
        disableMove = true;

        var graphPos = _this.cameraToGraphPos({x:e.cameraX,y:e.cameraY});
        var node = getNode(graphPos);
        var nodeSelected = node ? _this.context.selection.isNodeSelected(node.id) : false;

         handleDrag(!node);
        // _this.forceRender();

        function handleDrag(isCamera) {
            var moveFlag = false;
            var startx = graphPos.x,starty = graphPos.y;

            if(!isCamera){
                _this.emit('nodeMouseDown',[node,e]);
            }

            var onmousemove =docPosToRelativePos(_this.container,handlerWrap(function(e) {

                if(!isCamera && !moveFlag){
                    _this.emit('nodeDragStart',[node,e]);
                    moveFlag = true;
                }

                _this.forceRender();

                var graphPos = _this.cameraToGraphPos({x:e.cameraX,y:e.cameraY}),temp;
                var offsetx = graphPos.x - startx;
                var offsety = graphPos.y - starty;

                if(isCamera){
                    _this.camera.positionX -= offsetx;
                    _this.camera.positionY -= offsety;
                    _this.setMouseType(_this.mouseType.MOVE);
                }else {

                    if(nodeSelected){
                        _this.context.selection.data.nodes.forEach(function (id) {
                            temp = _this.context.graph.nodesIndex[id];
                            _this.graph.setNodeData(id,{x:temp.x+offsetx,y:temp.y+offsety});
                        });
                    }else _this.graph.setNodeData(node.id,{x:node.x+offsetx,y:node.y+offsety});

                    // fit(e);
                }


                if(isCamera){
                    var newgraphPos = _this.cameraToGraphPos({x:e.cameraX,y:e.cameraY});
                    startx = newgraphPos.x;
                    starty = newgraphPos.y;
                }else {
                    startx = graphPos.x;
                    starty = graphPos.y;
                }
                // console.timeEnd('move')
            }));

            var onmouseup = docPosToRelativePos(_this.container,handlerWrap(function(e) {

                if(!isCamera && moveFlag) _this.emit('nodeDragEnd',[node,e]);

                moveFlag = false;

                clear();
            }));

            document.addEventListener('mousemove',onmousemove);
            document.addEventListener('mouseup',onmouseup);


            function clear() {
                // _this.setMouseType(_this.mouseType.DEFAULT);
                onmousemove&&document.removeEventListener('mousemove',onmousemove);
                onmouseup&&document.removeEventListener('mouseup',onmouseup);

                onmouseup = onmousemove = null;

                disableMove = false;
            }


        }

    }

    function _moveHandler(e) {
        if(mouseDown)   mouseMove = true;
        
        if(disableMove || !_this.config.enableOverEvent) return;

        var graphPos = _this.cameraToGraphPos({x:e.cameraX,y:e.cameraY});
        var node = getNode(graphPos);
        var old;

        if(node && node !== overInfo.currentNode){
            old = overInfo.currentNode;
            overInfo.currentNode = node;

           if(old) _this.emit('nodeOut', [old,e]);
           if(overInfo.currentEdge){
               old = overInfo.currentEdge;
               overInfo.currentEdge = null;
               _this.emit('edgeOut',[old,e]);
           }
            _this.emit('nodeOver', [node,e]);

        }else if(!node && overInfo.currentNode){
            old = overInfo.currentNode;
            overInfo.currentNode = null;
            _this.emit('nodeOut', [old,e]);
        }

        var edge;
        if(!node && config.enableEdgeEvent){
            edge = getEdge(graphPos);
            if(edge && edge !== overInfo.currentEdge){
                old = overInfo.currentEdge;
                overInfo.currentEdge = edge;

                if(old) _this.emit('edgeOut',[old,e]);
                _this.emit('edgeOver',[edge,e]);
            }else if(!edge && overInfo.currentEdge){
                old = overInfo.currentEdge;
                overInfo.currentEdge = null;
                _this.emit('edgeOut',[old,e]);
            }
        }

        if(node || edge){
            _this.setMouseType(_this.mouseType.POINTER);
        }else {
            _this.setMouseType(_this.mouseType.DEFAULT);
        }

    }

    function _upHandler(e) {

        //no move ,simulate click event
        if(mouseDown && !mouseMove && mouseLeft(e)){
            _clickHandler(e);
        }

        if (mouseRight(e)){
            var graphPos = _this.cameraToGraphPos({x:e.cameraX,y:e.cameraY});
            var node = getNode(graphPos);
            var edge;
            if(node){
                _this.emit('nodeRightClick',[node,e]);
            }else if(config.enableEdgeEvent && (edge = getEdge(graphPos))) {
                _this.emit('edgeRightClick',[edge,e]);
            }else {
                _this.emit('stageRightClick',[e]);
            }
        }

        mouseDown = false;
        mouseMove = false;

    }

    function _wheelHandler(e) {
        var value = (
            (e.wheelDelta !== undefined && e.wheelDelta) ||
            (e.detail !== undefined && -e.detail)
        );

        if(value == 0) return; // Mac OS maybe -0;


        _this.forceRender();
        var ratio = _this.config.zoomRatio;


        if(value > 0){
            _this.zoomFromPosition(1/ratio,e.cameraX,e.cameraY);
            _this.emit('zoom',[1/ratio,_this.camera.scale,e])
        }else {
            _this.zoomFromPosition(ratio,e.cameraX,e.cameraY);
            _this.emit('zoom',[ratio,_this.camera.scale,e])
        }
    }


    //to camera pos
    function handlerWrap(handle) {
        return function (e) {

            if(!config.enableMouseEvent) return;

            var pos = _this.domToCameraPos({x: e.offsetX, y: e.offsetY});
            e.cameraX = pos.x;
            e.cameraY = pos.y;
            handle(e);
        }
    }

    function docPosToRelativePos(dom,handle) {
        return function (e) {
            var bbox = dom.getBoundingClientRect();
            var newEvent = Object.create(null);

            for(var attr in e)
                if(e.hasOwnProperty(attr)) newEvent[attr] = e[attr];

            newEvent.offsetX = e.clientX - bbox.left;
            newEvent.offsetY = e.clientY - bbox.top;

            handle(newEvent);
        }
    }


    function disableDocSelect() {
        var oldOnSelect = document.onselectstart;
        document.onselectstart = function () { return false };

        document.addEventListener('mouseup',onMouseUp);

        function onMouseUp() {
            document.onselectstart = oldOnSelect;
            document.removeEventListener('mouseup',onMouseUp);
        }
    }


    //default check function
    function defaultNodeCheck(posx,posy,node) {
        var check = false;
        var dis,sizeX,sizeY,size;
        if(node.type == 'rect'){
            sizeX = util.getNodeSizeX(node) || config.defaultNodeSize;
            sizeY = util.getNodeSizeY(node) || config.defaultNodeSize;
            check = util.inRect(posx,posy,node.x-sizeX,node.y-sizeY,sizeX*2,sizeY*2);
        }else {
            dis = util.getDistance(posx, posy, node.x, node.y);
            size = node.size || config.defaultNodeSize;
            check = dis <= size;
        }
        return check;
    }
    function defaultEdgeCheck(posx,posy,edge) {
        var check = false;
        var source = _this.graph.nodesIndex[edge.source];
        var target = _this.graph.nodesIndex[edge.target];
        var ctrolP;

        //line
        if(edge.curveCount == 0){
            check = util.inLine(posx,posy,source.x,source.y,target.x,target.y,(edge.size || config.defaultEdgeSize)/2);
        }else {//curve
            // debugger
            ctrolP = util.getControlPos(source.x,source.y,target.x,target.y,edge.curveCount,edge.curveOrder);
            check = util.isPointOnQuadraticCurve(
                posx,posy,
                source.x,source.y,
                target.x,target.y,
                ctrolP[0],ctrolP[1],
                (edge.size || config.defaultEdgeSize) / 2
            )
        }

        return check;
    }

    function checkInNode(posx,posy,node) {
        if(_this.context.customNodeCheck && util.isFunction(_this.context.customNodeCheck)){
            return _this.context.customNodeCheck(posx,posy,node,defaultNodeCheck);
        }
        else return defaultNodeCheck(posx,posy,node);
    }
    function checkInEdge(posx,posy,edge) {
        if(_this.context.customEdgeCheck && util.isFunction(_this.context.customEdgeCheck)){
            return _this.context.customEdgeCheck(posx,posy,edge,defaultEdgeCheck);
        }
        else return defaultEdgeCheck(posx,posy,edge);
    }

    function getNode(pos) {
        // console.time('getNode')
        var nodes = _this.graph.nodes;

        var node, dis,check;
        var findNode = null;

        var selectNodes = _this.context.selection.getNodes();

        var context  = _this.renderCache.node;

        if(selectNodes.length > 0){
            for(var i = selectNodes.length-1;i >= 0;i--){
                node = selectNodes[i];

                if(node.filter)continue;

                if (checkInNode(pos.x,pos.y,node)) {
                    findNode = node;
                    break;
                }
            }
        }


        if (!findNode && nodes.length > 0) {
            for (var i = nodes.length - 1; i >= 0; i--) {
                node = nodes[i];

                if(node.filter)continue;

                if (checkInNode(pos.x,pos.y,node)) {
                    findNode = node;
                    break;
                }
            }
        }
        // console.timeEnd('getNode')
        return findNode;
    }
    function getEdge(pos) {
        // console.time('getEdge')
        var edges = _this.graph.edges;

        var findEdge = null;
        var edge,check;

        var context  = _this.renderCache.edge;


        if (edges.length > 0) {
            for (var i = edges.length - 1; i >= 0; i--) {
                edge = edges[i];

                if(edge.filter)continue;

                if (checkInEdge(pos.x,pos.y,edge)) {
                    findEdge = edge;
                    break;
                }
            }
        }
        // console.timeEnd('getEdge')
        return findEdge;
    }


    function mouseLeft(e) {return (e.which && e.which == 1) || (e.button && e.button == 0);}
    function mouseRight(e) {return (e.which && e.which == 3) || (e.button && e.button == 2);}

}
