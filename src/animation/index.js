/**
 * Created by chengang on 17-2-15.
 */

import Tween from './tween'

function objsAnimation(graph,objs,to) {
    var nodes = graph.nodes;
    var toObjs = graph.nodes.map(function () {
        return {x:Math.random()*800,y:Math.random()*800};
    });
    Tween(nodes).to(toObjs).duration(2000).on('change',function (t) {
        console.log(t);
    })
}


export default {
    objsAnimation
}