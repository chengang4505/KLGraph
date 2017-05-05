/**
 * Created by chengang on 17-3-28.
 */

'use strict';


var mat3 = {};

mat3.normalize = function () {
    return [
        1, 0, 0,
        0, 1, 0,
        0, 0, 1
    ];
};

mat3.matrixFromTranslate = function(dx, dy) {
    return [
        1, 0, 0,
        0, 1, 0,
        dx, dy, 1
    ];
};

mat3.matrixFromRotation = function(angle) {
    var cos = Math.cos(angle),
        sin = Math.sin(angle);

    return  [
        cos, sin, 0,
        -sin, cos, 0,
        0, 0, 1
    ];
};

mat3.matrixFromScale = function(x,y) {
    return  [
        x, 0, 0,
        0, y, 0,
        0, 0, 1
    ];
};

mat3.invert = function (a) {
    var l =  3,
        a11 = a[0 * l + 0],
        a12 = a[0 * l + 1],
        a13 = a[0 * l + 2],
        a21 = a[1 * l + 0],
        a22 = a[1 * l + 1],
        a23 = a[1 * l + 2],
        a31 = a[2 * l + 0],
        a32 = a[2 * l + 1],
        a33 = a[2 * l + 2];

    var del = a11*(a22*a33-a23*a32)-a12*(a21*a33-a23*a31)+a13*(a21*a32-a22*a31);

    return [
        (a22*a33-a23*a32)/del,(a13*a32-a12*a33)/del,(a12*a23-a13*a22)/del,
        (a23*a31-a21*a33)/del,(a11*a33-a13*a31)/del,(a13*a21-a11*a23)/del,
        (a21*a32-a22*a31)/del,(a12*a31-a11*a32)/del,(a11*a22-a12*a21)/del
    ];
}

mat3.multiply = function(a, b) {
    var l =  3,
        a00 = a[0 * l + 0],
        a01 = a[0 * l + 1],
        a02 = a[0 * l + 2],
        a10 = a[1 * l + 0],
        a11 = a[1 * l + 1],
        a12 = a[1 * l + 2],
        a20 = a[2 * l + 0],
        a21 = a[2 * l + 1],
        a22 = a[2 * l + 2],
        b00 = b[0 * l + 0],
        b01 = b[0 * l + 1],
        b02 = b[0 * l + 2],
        b10 = b[1 * l + 0],
        b11 = b[1 * l + 1],
        b12 = b[1 * l + 2],
        b20 = b[2 * l + 0],
        b21 = b[2 * l + 1],
        b22 = b[2 * l + 2];

    return [
        a00 * b00 + a01 * b10 + a02 * b20,
        a00 * b01 + a01 * b11 + a02 * b21,
        a00 * b02 + a01 * b12 + a02 * b22,
        a10 * b00 + a11 * b10 + a12 * b20,
        a10 * b01 + a11 * b11 + a12 * b21,
        a10 * b02 + a11 * b12 + a12 * b22,
        a20 * b00 + a21 * b10 + a22 * b20,
        a20 * b01 + a21 * b11 + a22 * b21,
        a20 * b02 + a21 * b12 + a22 * b22
    ];
};

mat3.transformPoint = function (p,a) {
    var x = p[0],
        y = p[1];
    var l =  3,
        a00 = a[0 * l + 0],
        a01 = a[0 * l + 1],
        a02 = a[0 * l + 2],
        a10 = a[1 * l + 0],
        a11 = a[1 * l + 1],
        a12 = a[1 * l + 2],
        a20 = a[2 * l + 0],
        a21 = a[2 * l + 1],
        a22 = a[2 * l + 2];

    return [x*a00+y*a10+a20,x*a01+y*a11+a21];
}

mat3.rotateVector = function (v,a) {
    var x = v[0],
        y = v[1];
    var l =  3,
        a00 = a[0 * l + 0],
        a01 = a[0 * l + 1],
        a02 = a[0 * l + 2],
        a10 = a[1 * l + 0],
        a11 = a[1 * l + 1],
        a12 = a[1 * l + 2],
        a20 = a[2 * l + 0],
        a21 = a[2 * l + 1],
        a22 = a[2 * l + 2];

    return [x*a00+y*a10,x*a01+y*a11];
};


mat3.multiMatrix = function (matrixs) {
    return matrixs.reduce(function (pre,cur) {
        return mat3.multiply(pre,cur);
    })
};

export default mat3;
