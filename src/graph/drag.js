/**
 * Created by chengang on 17-2-15.
 */

export default function (graph) {

    var _this = graph;
    function dragStarted(d) {
        d3.select(this).raise();
    }
    function dragged(d) {
        d.x = d3.event.x;
        d.y = d3.event.y;
        _this.updateNodes([d]);
    }
    function dragEnded(d) {

    }

    return  {
        dragStarted,dragged,dragEnded
    }
}
