/**
 * Created by chengang on 17-3-17.
 */

var typeofstr = typeof '';
var typeofobj = typeof {};
var typeoffn = typeof function(){};

var utils = {};


utils.uuid = function(a,b){
    for(               // loop :)
        b=a='';        // b - result , a - numeric variable
        a++<36;        //
        b+=a*51&52  // if "a" is not 9 or 14 or 19 or 24
            ?  //  return a random number or 4
            (
                a^15      // if "a" is not 15
                    ?      // genetate a random number from 0 to 15
                    8^Math.random()*
                    (a^20?16:4)  // unless "a" is 20, in which case a random number from 8 to 11
                    :
                    4            //  otherwise 4
            ).toString(16)
            :
            '-'            //  in other cases (if "a" is 9,14,19,24) insert "-"
    );
    return b;
};


//is tool
utils.isArray = function( obj ){
    return Array.isArray ? Array.isArray( obj ) : obj != null && obj instanceof Array;
};
utils.isString = function( obj ){
    return obj != null && typeof obj == typeofstr;
};
utils.isObject = function( obj ){
    return obj != null && typeof obj === typeofobj;
};
utils.isFunction =  function( obj ){
    return obj != null && typeof obj === typeoffn;
};

utils.isInteger = Number.isInteger || function(value) {
        return typeof value === "number" &&
            isFinite(value) &&
            Math.floor(value) === value;
};

utils.nextPow2 = function (n) {
    // var num = 1;
    // while(num < n) num <<= 1;
    // return num;

    n = n -1;
    var i = 1;
    var offset;
    while((offset = n>>i) > 0){
        n |= offset;
        i *= 2;
    }
    return n+1;
};


utils.extend = function() {
    var i,
        k,
        res = {},
        l = arguments.length;

    for (i = l - 1; i >= 0; i--)
        for (k in arguments[i])
            res[k] = arguments[i][k];

    return res;
};

// math tool

utils.getDistance = function (x1,y1,x2,y2) {
    var dx =x1 - x2;
    var dy =y1 - y2;
    return Math.sqrt(dx*dx+dy*dy);
};

utils.normalize = function (vector) {
  var len = Math.sqrt(vector[0]*vector[0]+vector[1]*vector[1]);
  if(len == 0) return [0,0];
  return [vector[0]/len,vector[1]/len];
};

utils.getAngle = function (x1,y1,x2,y2) {
    var cos = (x1*x2+y1*y2)/(Math.sqrt(x1*x1+y1*y1)*Math.sqrt(x2*x2+y2*y2));
    return Math.acos(cos);
};

utils.inRect = function (posx,posy,x,y,w,h) {
  return posx >= x && posx <= x+w && posy >= y && posy <= y+h;
};

utils.inLine = function (x,y,x1,y1,x2,y2,lineSize) {
    var A = x - x1;
    var B = y - y1;
    var C = x2 - x1;
    var D = y2 - y1;

    var dot = A * C + B * D;
    var len_sq = C * C + D * D;

    if(dot < 0 || len_sq < 0.1) return false;

    if(dot * dot  / len_sq > len_sq) return false;

    var param = -1;
    param = dot / len_sq;

    var xx, yy;

    xx = x1 + param * C;
    yy = y1 + param * D;

    var dx = x - xx;
    var dy = y - yy;
    var dis =  Math.sqrt(dx * dx + dy * dy);

   return dis <= lineSize;
};


//color parse

var reI = "\\s*([+-]?\\d+)\\s*",
    reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*";
var reHex6 = /^#([0-9a-f]{6})$/;
var reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$");
utils.parseColor = function (format) {
    format = (format + "").trim().toLowerCase();
    var m,n;
    if(m = reHex6.exec(format)){
        n = parseInt(m[1], 16);
        return{
            r:n >> 16 & 0xff,
            g: n >> 8 & 0xff,
            b: n & 0xff,
            a:255
        }
    }else if(m = reRgbaInteger.exec(format)){
        return{
            r:+m[1],
            g:+m[2],
            b:+m[3],
            a:+m[4]*255
        }
    }else {
        throw 'not valid color format';
    }
}


utils.getNodeSizeX = function (node) {
    var size = node.size ;
    if(node.type == 'rect' && node.width) size = node.width;

    return size;
};

utils.getNodeSizeY = function (node) {
    var size = node.size ;
    if(node.type == 'rect' && node.height) size = node.height;

    return size;
};

utils.getBBox = function (nodes) {
    var x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    nodes.forEach(function (e) {
        if (e.x < x0) x0 = e.x;
        if (e.x > x1) x1 = e.x;
        if (e.y < y0) y0 = e.y;
        if (e.y > y1) y1 = e.y;
    });

    return {
        x:x0,
        y:y0,
        w:x1-x0,
        h:y1-y0
    }
};




/**
 * Compute the coordinates of the point positioned
 * at length t in the quadratic bezier curve.
 *
 * @param  {number} t  In [0,1] the step percentage to reach
 *                     the point in the curve from the context point.
 * @param  {number} x1 The X coordinate of the context point.
 * @param  {number} y1 The Y coordinate of the context point.
 * @param  {number} x2 The X coordinate of the ending point.
 * @param  {number} y2 The Y coordinate of the ending point.
 * @param  {number} xi The X coordinate of the control point.
 * @param  {number} yi The Y coordinate of the control point.
 * @return {object}    {x,y}.
 */
utils.getPointOnQuadraticCurve = function(t, x1, y1, x2, y2, xi, yi) {
    // http://stackoverflow.com/a/5634528
    return [
        Math.pow(1 - t, 2) * x1 + 2 * (1 - t) * t * xi + Math.pow(t, 2) * x2,
        Math.pow(1 - t, 2) * y1 + 2 * (1 - t) * t * yi + Math.pow(t, 2) * y2
    ];
};

utils.getPointTangentOnQuadraticCurve = function(t, x1, y1, x2, y2, xi, yi) {
    var pos1 = utils.getPointOnQuadraticCurve(t, x1, y1, x2, y2, xi, yi);
    var pos2 = utils.getPointOnQuadraticCurve(t+0.001, x1, y1, x2, y2, xi, yi);
    return utils.normalize([pos2[0]-pos1[0],pos2[1] - pos1[1]]);
};

/**
 * Check if a point is on a quadratic bezier curve segment with a thickness.
 *
 * @param  {number} x       The X coordinate of the point to check.
 * @param  {number} y       The Y coordinate of the point to check.
 * @param  {number} x1      The X coordinate of the curve start point.
 * @param  {number} y1      The Y coordinate of the curve start point.
 * @param  {number} x2      The X coordinate of the curve end point.
 * @param  {number} y2      The Y coordinate of the curve end point.
 * @param  {number} cpx     The X coordinate of the curve control point.
 * @param  {number} cpy     The Y coordinate of the curve control point.
 * @param  {number} epsilon The precision (consider the line thickness).
 * @return {boolean}        True if (x,y) is on the curve segment,
 *                          false otherwise.
 */
utils.isPointOnQuadraticCurve = function (x, y, x1, y1, x2, y2, cpx, cpy, epsilon) {
    // Fails if the point is too far from the extremities of the segment,
    // preventing for more costly computation:
    var dP1P2 = utils.getDistance(x1, y1, x2, y2);
    if (Math.abs(x - x1) > dP1P2 || Math.abs(y - y1) > dP1P2) {
        return false;
    }

    var dP1 = utils.getDistance(x, y, x1, y1),
        dP2 = utils.getDistance(x, y, x2, y2),
        t = 0.5,
        r = (dP1 < dP2) ? -0.01 : 0.01,
        rThreshold = 0.001,
        i = 100,
        pt = utils.getPointOnQuadraticCurve(t, x1, y1, x2, y2, cpx, cpy),
        dt = utils.getDistance(x, y, pt[0], pt[1]),
        old_dt;

    // This algorithm minimizes the distance from the point to the curve. It
    // find the optimal t value where t=0 is the start point and t=1 is the end
    // point of the curve, starting from t=0.5.
    // It terminates because it runs a maximum of i interations.
    while (i-- > 0 &&
    t >= 0 && t <= 1 &&
    (dt > epsilon) &&
    (r > rThreshold || r < -rThreshold)) {
        old_dt = dt;
        pt = utils.getPointOnQuadraticCurve(t, x1, y1, x2, y2, cpx, cpy);
        dt = utils.getDistance(x, y, pt[0], pt[1]);

        if (dt > old_dt) {
            // not the right direction:
            // halfstep in the opposite direction
            r = -r / 2;
            t += r;
        }
        else if (t + r < 0 || t + r > 1) {
            // oops, we've gone too far:
            // revert with a halfstep
            r = r / 2;
            dt = old_dt;
        }
        else {
            // progress:
            t += r;
        }
    }

    return dt < epsilon;
}


utils.getControlPos = function(x1,y1,x2,y2,count,order) {
    // var dis = utils.getDistance(x1,y1,x2,y2);
    // var factor = dis/8;
    var factor = 20;

    var ratio = (count)%2 == 1 ? 1 : -1;
    ratio *= order ? 1 : -1;

    factor *= ratio * ((count + 1) >> 1);

    var norV = utils.normalize([y1-y2,x2-x1]);
    return [norV[0]*factor+(x1+x2)/2,norV[1]*factor+(y1+y2)/2];
};


export  default utils ;

// window.utils = utils;