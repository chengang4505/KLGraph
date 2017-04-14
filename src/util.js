/**
 * Created by chengang on 17-3-17.
 */

var utils = {};

var typeofstr = typeof '';
var typeofobj = typeof {};
var typeoffn = typeof function(){};

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



utils.loadShader = function(gl, shaderSource, shaderType, error) {
    var compiled,
        shader = gl.createShader(shaderType);

    // Load the shader source
    gl.shaderSource(shader, shaderSource);

    // Compile the shader
    gl.compileShader(shader);

    // Check the compile status
    compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

    // If something went wrong:
    if (!compiled) {
        if (error) {
            error('Error compiling shader "' + shader + '":' + gl.getShaderInfoLog(shader));
        }

        console.error('Error compiling shader "' + shader + '":' + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }

    return shader;
};



utils.loadProgram = function(gl, shaders, attribs, loc, error) {
    var i,
        linked,
        program = gl.createProgram();

    for (i = 0; i < shaders.length; ++i)
        gl.attachShader(program, shaders[i]);

    if (attribs)
        for (i = 0; i < attribs.length; ++i)
            gl.bindAttribLocation(
                program,
                locations ? locations[i] : i,
                opt_attribs[i]
            );

    gl.linkProgram(program);

    // Check the link status
    linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked) {
        if (error)
            error('Error in program linking: ' + gl.getProgramInfoLog(program));
        console.error('Error in program linking: ' + gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
    }

    return program;
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
            a:+m[4]
        }
    }else {
        throw 'not valid color format';
    }
}


export  default utils ;

window.utils = utils;