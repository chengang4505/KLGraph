/**
 * Created by chengang on 17-2-15.
 */
import EventEmiter from './eventEmiter'

//MatchesSelector
if (typeof document !== "undefined") {
    var element = document.documentElement;
    if (!element.matches) {
        var vendorMatches = element.webkitMatchesSelector
            || element.msMatchesSelector
            || element.mozMatchesSelector
            || element.oMatchesSelector;
        element.matches = function(selector) {
            return function() {
                return vendorMatches.call(this, selector);
            };
        };
    }
}

var events = ['nodeClick','nodeRClick'];

export  function eventInit(graph) {
    var _this = graph;

    EventEmiter.init(_this);

    var nodesContainerDom = _this.nodesContainer.node();
    nodesContainerDom.addEventListener('click',function (e) {
        var node = getTargetNode(e.target);
        _this.emit('nodeClick',[e,node.__data__,node]);
    });

    nodesContainerDom.addEventListener('mouseup',function (e) {
        if(e.button == 2){
            var node = getTargetNode(e.target);
            _this.emit('nodeRClick',[e,node.__data__,node]);
        }

    });











    //tools
    function getTargetNode(target) {
        var p;
        p = target;
        while(p){
            if(p.matches('g.'+_this.NODE_CLASS)) break;
            p = p.parentNode;
        }
        return p ;
    }

}


