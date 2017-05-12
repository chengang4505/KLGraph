window["KLGraph"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 40);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Created by chengang on 17-3-17.
 */

var typeofstr = _typeof('');
var typeofobj = _typeof({});
var typeoffn = _typeof(function () {});

var utils = {};

utils.uuid = function (a, b) {
    for ( // loop :)
    b = a = ''; // b - result , a - numeric variable
    a++ < 36; //
    b += a * 51 & 52 // if "a" is not 9 or 14 or 19 or 24
    ? //  return a random number or 4
    (a ^ 15 // if "a" is not 15
    ? // genetate a random number from 0 to 15
    8 ^ Math.random() * (a ^ 20 ? 16 : 4) // unless "a" is 20, in which case a random number from 8 to 11
    : 4 //  otherwise 4
    ).toString(16) : '-' //  in other cases (if "a" is 9,14,19,24) insert "-"
    ) {}
    return b;
};

//is tool
utils.isArray = function (obj) {
    return Array.isArray ? Array.isArray(obj) : obj != null && obj instanceof Array;
};
utils.isString = function (obj) {
    return obj != null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) == typeofstr;
};
utils.isObject = function (obj) {
    return obj != null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === typeofobj;
};
utils.isFunction = function (obj) {
    return obj != null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === typeoffn;
};

//webgl shader tool

utils.loadShader = function (gl, shaderSource, shaderType, error) {
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

utils.loadProgram = function (gl, shaders, attribs, loc, error) {
    var i,
        linked,
        program = gl.createProgram();

    for (i = 0; i < shaders.length; ++i) {
        gl.attachShader(program, shaders[i]);
    }if (attribs) for (i = 0; i < attribs.length; ++i) {
        gl.bindAttribLocation(program, locations ? locations[i] : i, opt_attribs[i]);
    }gl.linkProgram(program);

    // Check the link status
    linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked) {
        if (error) error('Error in program linking: ' + gl.getProgramInfoLog(program));
        console.error('Error in program linking: ' + gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
    }

    return program;
};

utils.extend = function () {
    var i,
        k,
        res = {},
        l = arguments.length;

    for (i = l - 1; i >= 0; i--) {
        for (k in arguments[i]) {
            res[k] = arguments[i][k];
        }
    }return res;
};

// math tool

utils.getDistance = function (x1, y1, x2, y2) {
    var dx = x1 - x2;
    var dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
};

utils.normalize = function (vector) {
    var len = Math.sqrt(vector[0] * vector[0] + vector[1] * vector[1]);
    if (len == 0) return [0, 0];
    return [vector[0] / len, vector[1] / len];
};

utils.getAngle = function (x1, y1, x2, y2) {
    var cos = (x1 * x2 + y1 * y2) / (Math.sqrt(x1 * x1 + y1 * y1) * Math.sqrt(x2 * x2 + y2 * y2));
    return Math.acos(cos);
};

utils.inRect = function (posx, posy, x, y, w, h) {
    return posx >= x && posx <= x + w && posy >= y && posy <= y + h;
};

//color parse

var reI = "\\s*([+-]?\\d+)\\s*",
    reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*";
var reHex6 = /^#([0-9a-f]{6})$/;
var reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$");
utils.parseColor = function (format) {
    format = (format + "").trim().toLowerCase();
    var m, n;
    if (m = reHex6.exec(format)) {
        n = parseInt(m[1], 16);
        return {
            r: n >> 16 & 0xff,
            g: n >> 8 & 0xff,
            b: n & 0xff,
            a: 255
        };
    } else if (m = reRgbaInteger.exec(format)) {
        return {
            r: +m[1],
            g: +m[2],
            b: +m[3],
            a: +m[4] * 255
        };
    } else {
        throw 'not valid color format';
    }
};

utils.getNodeSizeX = function (node) {
    var size = node.size || 10;
    if (node.type == 'rect' && node.width) size = node.width;

    return size;
};

utils.getNodeSizeY = function (node) {
    var size = node.size || 10;
    if (node.type == 'rect' && node.height) size = node.height;

    return size;
};

utils.getBBox = function (nodes) {
    var x0 = Infinity,
        y0 = Infinity,
        x1 = -Infinity,
        y1 = -Infinity;
    nodes.forEach(function (e) {
        if (e.x < x0) x0 = e.x;
        if (e.x > x1) x1 = e.x;
        if (e.y < y0) y0 = e.y;
        if (e.y > y1) y1 = e.y;
    });

    return {
        x: x0,
        y: y0,
        w: x1 - x0,
        h: y1 - y0
    };
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
utils.getPointOnQuadraticCurve = function (t, x1, y1, x2, y2, xi, yi) {
    // http://stackoverflow.com/a/5634528
    return [Math.pow(1 - t, 2) * x1 + 2 * (1 - t) * t * xi + Math.pow(t, 2) * x2, Math.pow(1 - t, 2) * y1 + 2 * (1 - t) * t * yi + Math.pow(t, 2) * y2];
};

utils.getPointTangentOnQuadraticCurve = function (t, x1, y1, x2, y2, xi, yi) {
    var pos1 = utils.getPointOnQuadraticCurve(t, x1, y1, x2, y2, xi, yi);
    var pos2 = utils.getPointOnQuadraticCurve(t + 0.001, x1, y1, x2, y2, xi, yi);
    return utils.normalize([pos2[0] - pos1[0], pos2[1] - pos1[1]]);
};

utils.getControlPos = function (x1, y1, x2, y2, count, order) {
    var dis = utils.getDistance(x1, y1, x2, y2);
    var factor = dis / 8;

    var ratio = (count + 1) % 2 == 1 ? 1 : -1;
    ratio *= order ? 1 : -1;

    factor *= ratio * ((count >> 1) + 1);

    var norV = utils.normalize([y1 - y2, x2 - x1]);
    return [norV[0] * factor + (x1 + x2) / 2, norV[1] * factor + (y1 + y2) / 2];
};

exports.default = utils;

// window.utils = utils;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by chengang on 17-2-16.
 */



Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventEmitter = function () {
    function EventEmitter() {
        _classCallCheck(this, EventEmitter);

        this._listener = {};
    }

    _createClass(EventEmitter, [{
        key: 'on',
        value: function on(type, cb) {
            if (!type || !cb) return;
            this._listener[type] = this._listener[type] || [];

            var listener = this._listener[type];
            for (var i = 0, len = listener.length; i < len; i++) {
                if (cb == listener[i]) return;
            }

            this._listener[type].push(cb);
            return cb;
        }
    }, {
        key: 'off',
        value: function off(type, cb) {
            if (!type) return;
            var listener;
            if (!(listener = this._listener[type]) || listener.length < 1) return;

            if (cb) {
                for (var i = 0, len = listener.length; i < len; i++) {
                    if (cb == listener[i]) {
                        listener.splice(i, 1);
                        break;
                    }
                }
            } else {
                this._listener[type] = [];
            }
        }
    }, {
        key: 'emit',
        value: function emit(type, args) {
            if (!type) return;
            var listener, fn;
            if (!(listener = this._listener[type]) || listener.length < 1) return;

            listener = listener.slice();

            for (var i = 0, len = listener.length; i < len; i++) {
                fn = listener[i];
                fn.apply(null, args);
            }
        }
    }]);

    return EventEmitter;
}();

exports.default = EventEmitter;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by chengang on 17-2-16.
 */



Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EventEmitter2 = __webpack_require__(1);

var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);

var _timer = __webpack_require__(9);

var _timer2 = _interopRequireDefault(_timer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * from d3-interpolate
 */
function interpolateNumber(a, b) {
    return a = +a, b -= a, function (t) {
        return a + b * t;
    };
}

var Tween = function (_EventEmitter) {
    _inherits(Tween, _EventEmitter);

    function Tween(objs, type) {
        _classCallCheck(this, Tween);

        var _this = _possibleConstructorReturn(this, (Tween.__proto__ || Object.getPrototypeOf(Tween)).call(this));

        if (!objs) throw 'must have a obj';

        type = type || '';

        _this.objs = objs;
        _this.type = type;
        _this.interpolates = null;
        _this.timer = (0, _timer2.default)(_this.timerHandle.bind(_this));
        _this._duration = 0;

        Tween.list.push(_this);
        return _this;
    }

    _createClass(Tween, [{
        key: 'timerHandle',
        value: function timerHandle(elapsed) {
            var t = elapsed / this._duration;

            t = Math.min(t, 1);

            var obj, attr, attrInterpolater;
            if (Array.isArray(this.interpolates)) {
                for (var i = 0, len = this.interpolates.length; i < len; i++) {
                    obj = this.objs[i];
                    attrInterpolater = this.interpolates[i];
                    for (attr in attrInterpolater) {
                        obj[attr] = attrInterpolater[attr](t);
                    }
                }
            } else {
                obj = this.objs;
                attrInterpolater = this.interpolates;
                for (attr in attrInterpolater) {
                    obj[attr] = attrInterpolater[attr](t);
                }
            }

            this.emit('change', [t]);

            if (elapsed >= this._duration) this.stop();
        }
    }, {
        key: 'duration',
        value: function duration(time) {
            this._duration = time;
            return this;
        }
    }, {
        key: 'to',
        value: function to(toObjs) {
            if (Array.isArray(toObjs) && toObjs.length !== this.objs.length) {
                console.error('toObjs lenght not eq objs length');
                this.stop();
                return this;
            }

            var obj, attr, attrInterpolater;
            if (Array.isArray(toObjs)) {
                this.interpolates = [];
                for (var i = 0, len = toObjs.length; i < len; i++) {
                    obj = toObjs[i];
                    attrInterpolater = {};
                    for (attr in obj) {
                        attrInterpolater[attr] = interpolateNumber(this.objs[i][attr], obj[attr]);
                    }
                    this.interpolates.push(attrInterpolater);
                }
            } else {
                obj = toObjs;
                attrInterpolater = {};
                for (attr in obj) {
                    attrInterpolater[attr] = interpolateNumber(this.objs[attr], obj[attr]);
                }
                this.interpolates = attrInterpolater;
            }

            return this;
        }
    }, {
        key: 'stop',
        value: function stop() {
            if (this.timer) {
                this.timer.stop();
                this.timer = null;
                this.objs = null;
                this.interpolates = null;

                Tween.remove(this.objs);
            }
        }
    }], [{
        key: 'remove',
        value: function remove(obj) {
            var list = Tween.list;
            Tween.list = [];
            list.forEach(function (e) {
                if (e.objs == obj) {
                    e.stop();
                } else {
                    Tween.list.push(e);
                }
            });
        }
    }, {
        key: 'removeByType',
        value: function removeByType(type) {
            var list = Tween.list;
            Tween.list = [];
            list.forEach(function (e) {
                if (e.type === type) {
                    e.stop();
                } else {
                    Tween.list.push(e);
                }
            });
        }
    }, {
        key: 'removeAll',
        value: function removeAll() {
            Tween.list.forEach(function (e) {
                e.stop();
            });

            Tween.list = [];
        }
    }]);

    return Tween;
}(_EventEmitter3.default);

Tween.list = [];
exports.default = Tween;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by chengang on 17-3-28.
 */



Object.defineProperty(exports, "__esModule", {
    value: true
});
var mat3 = {};

mat3.normalize = function () {
    return [1, 0, 0, 0, 1, 0, 0, 0, 1];
};

mat3.matrixFromTranslate = function (dx, dy) {
    return [1, 0, 0, 0, 1, 0, dx, dy, 1];
};

mat3.matrixFromRotation = function (angle) {
    var cos = Math.cos(angle),
        sin = Math.sin(angle);

    return [cos, sin, 0, -sin, cos, 0, 0, 0, 1];
};

mat3.matrixFromScale = function (x, y) {
    return [x, 0, 0, 0, y, 0, 0, 0, 1];
};

mat3.invert = function (a) {
    var l = 3,
        a11 = a[0 * l + 0],
        a12 = a[0 * l + 1],
        a13 = a[0 * l + 2],
        a21 = a[1 * l + 0],
        a22 = a[1 * l + 1],
        a23 = a[1 * l + 2],
        a31 = a[2 * l + 0],
        a32 = a[2 * l + 1],
        a33 = a[2 * l + 2];

    var del = a11 * (a22 * a33 - a23 * a32) - a12 * (a21 * a33 - a23 * a31) + a13 * (a21 * a32 - a22 * a31);

    return [(a22 * a33 - a23 * a32) / del, (a13 * a32 - a12 * a33) / del, (a12 * a23 - a13 * a22) / del, (a23 * a31 - a21 * a33) / del, (a11 * a33 - a13 * a31) / del, (a13 * a21 - a11 * a23) / del, (a21 * a32 - a22 * a31) / del, (a12 * a31 - a11 * a32) / del, (a11 * a22 - a12 * a21) / del];
};

mat3.multiply = function (a, b) {
    var l = 3,
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

    return [a00 * b00 + a01 * b10 + a02 * b20, a00 * b01 + a01 * b11 + a02 * b21, a00 * b02 + a01 * b12 + a02 * b22, a10 * b00 + a11 * b10 + a12 * b20, a10 * b01 + a11 * b11 + a12 * b21, a10 * b02 + a11 * b12 + a12 * b22, a20 * b00 + a21 * b10 + a22 * b20, a20 * b01 + a21 * b11 + a22 * b21, a20 * b02 + a21 * b12 + a22 * b22];
};

mat3.transformPoint = function (p, a) {
    var x = p[0],
        y = p[1];
    var l = 3,
        a00 = a[0 * l + 0],
        a01 = a[0 * l + 1],
        a02 = a[0 * l + 2],
        a10 = a[1 * l + 0],
        a11 = a[1 * l + 1],
        a12 = a[1 * l + 2],
        a20 = a[2 * l + 0],
        a21 = a[2 * l + 1],
        a22 = a[2 * l + 2];

    return [x * a00 + y * a10 + a20, x * a01 + y * a11 + a21];
};

mat3.rotateVector = function (v, a) {
    var x = v[0],
        y = v[1];
    var l = 3,
        a00 = a[0 * l + 0],
        a01 = a[0 * l + 1],
        a02 = a[0 * l + 2],
        a10 = a[1 * l + 0],
        a11 = a[1 * l + 1],
        a12 = a[1 * l + 2],
        a20 = a[2 * l + 0],
        a21 = a[2 * l + 1],
        a22 = a[2 * l + 2];

    return [x * a00 + y * a10, x * a01 + y * a11];
};

mat3.multiMatrix = function (matrixs) {
    return matrixs.reduce(function (pre, cur) {
        return mat3.multiply(pre, cur);
    });
};

exports.default = mat3;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = " precision mediump float;\n\nvec4 color = vec4(77, 72, 91,255);\n\nvarying vec2 v_texCoord;\nvarying float size;\n\n\nuniform sampler2D u_image;\nuniform float u_camera_scale;\n\n\nvoid main() {\n    color = color / 255.0;\n\n    float offset = size * u_camera_scale * 0.12;\n\n    offset = pow(offset,1.5);\n\n    offset = min((1.0-0.72),offset);\n\n   float dist = texture2D(u_image, v_texCoord).r;\n   float alpha = smoothstep(0.72 - offset, 0.72 + offset, dist);\n   gl_FragColor = color *alpha;\n}"

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

var _Matrix = __webpack_require__(3);

var _Matrix2 = _interopRequireDefault(_Matrix);

var _EventEmitter2 = __webpack_require__(1);

var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);

var _TextureLoader = __webpack_require__(22);

var _TextureLoader2 = _interopRequireDefault(_TextureLoader);

var _TextureText = __webpack_require__(23);

var _TextureText2 = _interopRequireDefault(_TextureText);

var _TextureIcon = __webpack_require__(21);

var _TextureIcon2 = _interopRequireDefault(_TextureIcon);

var _Event = __webpack_require__(10);

var _Event2 = _interopRequireDefault(_Event);

var _tween = __webpack_require__(2);

var _tween2 = _interopRequireDefault(_tween);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WebGLRender = function (_EventEmitter) {
    _inherits(WebGLRender, _EventEmitter);

    function WebGLRender(context, config) {
        _classCallCheck(this, WebGLRender);

        var _this2 = _possibleConstructorReturn(this, (WebGLRender.__proto__ || Object.getPrototypeOf(WebGLRender)).call(this));

        _this2.context = context;
        _this2.config = config;

        _this2.container = config.container;
        _this2.graph = context.graph;

        _this2.needUpdate = true;
        _this2.sampleRatio = 1.5;

        _this2.initRender();

        _this2.initTexture = false;
        _this2.textureLoader = new _TextureLoader2.default(_this2.gl);
        _this2.textureIcon = new _TextureIcon2.default(_this2.gl, _this2.config);
        _this2.textureText = new _TextureText2.default(_this2.gl);

        _this2.initEvent();
        _this2.initIconTexture();
        _this2.initTextTexture();

        _this2.projectMatrix = null;

        _this2.camera = {
            scale: 1,
            positionX: 0,
            positionY: 0,
            rotation: 0
        };

        //cache
        _this2.renderType = {
            node: { index: {}, type: {}, cache: false },
            nodeLabel: { index: {}, type: {}, cache: false },
            edge: { index: {}, type: {}, cache: false },
            edgeLabel: { index: {}, type: {}, cache: false }
        };
        _Event2.default.call(_this2);

        return _this2;
    }
    //render


    _createClass(WebGLRender, [{
        key: 'render',
        value: function render() {
            // debugger

            this.resizeCanvas();

            var gl = this.gl;
            gl.clear(gl.COLOR_BUFFER_BIT);

            if (!this.initTexture) {
                var imgs = {};
                var nodes = this.graph.nodes;
                nodes.forEach(function (node) {
                    node.img && (imgs[node.img] = true);
                });

                this.textureLoader.loadImgs(Object.keys(imgs));
                this.initTexture = true;
            }

            // console.time('render')

            // console.time('renderEdge');
            this.config.renderEdge && this.renderEdge();
            // console.timeEnd('renderEdge');

            // console.time('renderEdgeLabel');
            this.config.renderEdge && this.config.renderEdgeLabel && this.renderEdgeLabel();
            // console.timeEnd('renderEdgeLabel');

            // console.time('renderNode');
            this.config.renderNode && this.renderNode();
            // console.timeEnd('renderNode');

            // console.time('renderNodeLabel');
            this.config.renderNode && this.config.renderNodeLabel && this.renderNodeLabel();
            // console.timeEnd('renderNodeLabel');


            // console.timeEnd('render')


            this.needUpdate = false;
        }
    }, {
        key: 'renderNode',
        value: function renderNode() {
            // debugger

            this.createRenderCache('node', this.graph.nodes, function (data) {
                return {
                    data: data,
                    textureLoader: this.textureLoader,
                    textureIcon: this.textureIcon
                };
            }.bind(this));

            this.renderCacheData('node', this.graph.nodes);
        }
    }, {
        key: 'renderNodeLabel',
        value: function renderNodeLabel() {

            this.createRenderCache('nodeLabel', this.graph.nodes, function (data) {
                return {
                    data: data,
                    textureText: this.textureText
                };
            }.bind(this));

            this.renderCacheData('nodeLabel', this.graph.nodes);
        }
    }, {
        key: 'renderEdge',
        value: function renderEdge() {
            this.createRenderCache('edge', this.graph.edges, function (data) {
                return {
                    data: data,
                    source: this.graph.nodesIndex[data.source],
                    target: this.graph.nodesIndex[data.target]
                };
            }.bind(this));

            this.renderCacheData('edge', this.graph.edges);
        }
    }, {
        key: 'renderEdgeLabel',
        value: function renderEdgeLabel() {

            this.createRenderCache('edgeLabel', this.graph.edges, function (data) {
                return {
                    data: data,
                    source: this.graph.nodesIndex[data.source],
                    target: this.graph.nodesIndex[data.target],
                    textureText: this.textureText
                };
            }.bind(this));

            this.renderCacheData('edgeLabel', this.graph.edges);
        }
    }, {
        key: 'clearClusterCacheCounter',
        value: function clearClusterCacheCounter(type) {
            var renderType = this.renderType[type].type;
            var layers;
            for (var e in renderType) {
                layers = renderType[e].layers;
                for (var name in layers) {
                    layers[name].counter = 0;
                }
            }
        }
    }, {
        key: 'fixClusterCacheLength',
        value: function fixClusterCacheLength(type) {
            var renderType = this.renderType[type].type;
            var layers;
            for (var e in renderType) {
                layers = renderType[e].layers;
                for (var name in layers) {
                    layers[name].data.length = layers[name].counter;
                }
            }
        }
    }, {
        key: 'createRenderCache',
        value: function createRenderCache(rootType, data, argFn) {
            var nodeData, cacheIndex;
            var start, offset, layers, type;

            var rootType1 = this.renderType[rootType].type;

            if (!this.renderType[rootType].cache) {
                this.clearClusterCacheCounter(rootType);

                data.forEach(function (e) {

                    type = e.type || 'default';
                    if (!rootType1[type]) this.initRenderLayers(rootType, type);

                    //cache info
                    cacheIndex = this.renderType[rootType].index[e.id] = this.renderType[rootType].index[e.id] || {};
                    cacheIndex.type = type;
                    cacheIndex.start = {}; //layer start

                    layers = rootType1[type].layers;
                    for (var name in layers) {

                        start = layers[name].counter;
                        offset = 0;

                        nodeData = layers[name].render.getRenderData(argFn(e));

                        // no data
                        if (!nodeData || nodeData.length == 0) {
                            // cacheIndex.start[name] = null;
                            continue;
                        }

                        nodeData.forEach(function (data) {
                            layers[name].data[start + offset] = data;
                            offset++;
                        }.bind(this));

                        //cache info
                        cacheIndex.start[name] = start;

                        layers[name].counter += offset;
                    }
                }.bind(this));

                this.fixClusterCacheLength(rootType);

                this.renderType[rootType].cache = true;
            }
        }
    }, {
        key: 'renderCacheData',
        value: function renderCacheData(rootType, data) {
            var renderType, type, layers, camMatrixInvert, orders, cacheIndex;

            camMatrixInvert = this.getCameraMatrix(true);

            renderType = this.renderType[rootType].type;

            for (type in renderType) {

                layers = renderType[type].layers;

                renderType[type].order.forEach(function (name) {

                    if (layers[name].data.length > 0) {

                        this.gl.useProgram(layers[name].program);

                        layers[name].render.render({
                            gl: this.gl,
                            program: layers[name].program,
                            data: layers[name].data,
                            matrix: _Matrix2.default.multiMatrix([camMatrixInvert, this.projectMatrix]),
                            camera: this.camera,
                            sampleRatio: this.sampleRatio,
                            textureLoader: this.textureLoader
                        });
                    }
                }.bind(this));
            }
        }
    }, {
        key: 'initRender',
        value: function initRender() {
            var option = {
                preserveDrawingBuffer: true
            };
            this.gl = this.container.getContext('experimental-webgl', option) || this.container.getContext('webgl', option);

            if (!this.gl) {
                throw '浏览器不支持webGl';
            }

            this.gl.getExtension('OES_standard_derivatives');

            this.resizeCanvas();
            this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
            this.gl.enable(this.gl.BLEND);
            this.gl.disable(this.gl.DEPTH_TEST);
            // this.gl.clearColor(218/255, 224/255, 231/255, 1);
            this.gl.clearColor(0, 0, 0, 0);
        }
    }, {
        key: 'initEvent',
        value: function initEvent() {
            var _this = this;
            this.graph.on('change', function (type, ids) {
                if (type == 'node') {
                    // console.time('updateNode');
                    _this.config.renderNode && _this.updateNodeRenderData(ids);
                    // console.timeEnd('updateNode');
                    // console.time('updateNodeLabel');
                    _this.config.renderNode && _this.config.renderNodeLabel && _this.updateNodeLabelRenderData(ids);
                    // console.timeEnd('updateNodeLabel');
                } else if (type == 'edge') {
                    // console.time('updateEdge');
                    _this.config.renderEdge && _this.updateEdgeRenderData(ids);
                    // console.timeEnd('updateEdge');
                    // console.time('updateEdgeLabel');
                    _this.config.renderEdge && _this.config.renderEdgeLabel && _this.updateEdgeLabelRenderData(ids);
                    // console.timeEnd('updateEdgeLabel');
                }
            });
            this.graph.on('reset', function () {
                _this.clearRenderCache();
                _this.initIconTexture();
                _this.initTextTexture();
            });
            this.graph.on('add', function (type, ids) {
                if (!_util2.default.isArray(ids)) ids = [ids];

                var objs = null;

                if (type == 'node') objs = ids.map(function (e) {
                    return _this.graph.nodesIndex[e];
                });else objs = ids.map(function (e) {
                    return _this.graph.edgesIndex[e];
                });

                _this.textureText.addTexts(getAddText(objs));
                _this.clearRenderCache();
            });
            this.graph.on('remove', function (type, ids) {
                _this.clearRenderCache();
            });

            this.textureIcon.on('load', function () {
                this.clearRenderCache('node');
            }.bind(this));

            this.textureLoader.on('load', function (url) {
                var nodes = _this.graph.nodes;
                nodes.forEach(function (e) {
                    if (e.img && e.img == url) _this.updateNodeRenderData(e.id);
                });
            });

            function getAddText(objs) {
                var text = '';
                objs.forEach(function (e) {
                    e.label && (text += e.label);
                });

                return text;
            }
        }
    }, {
        key: 'initTextTexture',
        value: function initTextTexture() {

            this.textureText.clear();

            var nodes = this.graph.nodes;
            var edges = this.graph.edges;

            var map = {};
            var texts = [];
            nodes.forEach(function (e) {
                if (e.label) {
                    var chars = e.label.split('');
                    chars.forEach(function (e) {
                        if (e && !map[e]) {
                            map[e] = true;
                            texts.push(e);
                        }
                    });
                }
            });

            edges.forEach(function (e) {
                if (e.label) {
                    var chars = e.label.split('');
                    chars.forEach(function (e) {
                        if (e && !map[e]) {
                            map[e] = true;
                            texts.push(e);
                        }
                    });
                }
            });

            this.textureText.createCanvasImg(texts);
        }
    }, {
        key: 'initRenderLayers',
        value: function initRenderLayers(root, type) {
            var renderType = type;
            var typeRoot = WebGLRender[root];

            var renderRoot;

            renderRoot = this.renderType[root].type;

            if (!typeRoot[type]) {
                console.error(root + ': no type[' + type + '],use default');
                type = 'default';
            }

            var temp, layersConfig;
            if (!renderRoot[renderType]) {

                layersConfig = typeRoot[type];
                if (_util2.default.isFunction(layersConfig)) {
                    layersConfig = {
                        layers: [{ name: 'base', layer: layersConfig }]
                    };
                }
                renderRoot[renderType] = { layers: {}, order: [] };
                layersConfig.layers.forEach(function (config) {
                    temp = {};
                    temp.counter = 0;
                    temp.data = [];
                    temp.render = new config.layer();
                    temp.program = _util2.default.loadProgram(this.gl, [_util2.default.loadShader(this.gl, temp.render.shaderVert, this.gl.VERTEX_SHADER), _util2.default.loadShader(this.gl, temp.render.shaderFrag, this.gl.FRAGMENT_SHADER)]);
                    renderRoot[renderType].layers[config.name] = temp;
                    renderRoot[renderType].order.push(config.name);
                }.bind(this));
            }
        }
    }, {
        key: 'initIconTexture',
        value: function initIconTexture() {

            this.textureIcon.clear();

            var nodes = this.graph.nodes;

            var map = {};
            var icons = [];
            nodes.forEach(function (e) {
                if (e.icon) {
                    if (!map[e.icon]) {
                        map[e.icon] = true;
                        icons.push(e.icon);
                    }
                }
            });

            this.textureIcon.createIcons(icons);
        }
    }, {
        key: 'getCameraMatrix',
        value: function getCameraMatrix(isInvert) {
            var mat = _Matrix2.default.multiMatrix([_Matrix2.default.matrixFromScale(this.camera.scale, this.camera.scale), _Matrix2.default.matrixFromRotation(this.camera.rotation), _Matrix2.default.matrixFromTranslate(this.camera.positionX, this.camera.positionY)]);
            return isInvert ? _Matrix2.default.invert(mat) : mat;
        }
    }, {
        key: 'resizeCanvas',
        value: function resizeCanvas() {
            var canvas = this.gl.canvas;
            var multiplier = this.sampleRatio;
            var width = canvas.clientWidth * multiplier | 0;
            var height = canvas.clientHeight * multiplier | 0;
            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width;
                canvas.height = height;
            }

            this.projectMatrix = _Matrix2.default.matrixFromScale(2 / canvas.clientWidth, 2 / canvas.clientHeight);
            this.gl.viewport(0, 0, canvas.width, canvas.height);
        }
    }, {
        key: 'graphToDomPos',
        value: function graphToDomPos(pos) {
            var canvas = this.gl.canvas;
            var camPos = _Matrix2.default.transformPoint([pos.x, pos.y], this.getCameraMatrix(true));
            return { x: camPos[0] + canvas.clientWidth / 2, y: canvas.clientHeight / 2 - camPos[1] };
        }
    }, {
        key: 'toCameraPos',
        value: function toCameraPos(pos) {
            var canvas = this.gl.canvas;
            return { x: pos.x - canvas.clientWidth / 2, y: canvas.clientHeight / 2 - pos.y };
        }
    }, {
        key: 'toGraphPos',
        value: function toGraphPos(pos, isVector) {
            var p = isVector ? _Matrix2.default.rotateVector([pos.x, pos.y], this.getCameraMatrix()) : _Matrix2.default.transformPoint([pos.x, pos.y], this.getCameraMatrix());
            return { x: p[0], y: p[1] };
        }
    }, {
        key: 'forceRender',
        value: function forceRender() {
            this.needUpdate = true;
        }
    }, {
        key: 'zoomTo',
        value: function zoomTo(ratio, x, y, animation) {

            var scale = this.camera.scale;
            var positionX, positionY;

            var newscale = ratio * scale;
            if (newscale < this.config.zoomMin) newscale = this.config.zoomMin;
            if (newscale > this.config.zoomMax) newscale = this.config.zoomMax;

            if (x != null && y != null) {
                var offset = _Matrix2.default.rotateVector([x * (newscale - scale) / scale, y * (newscale - scale) / scale], this.getCameraMatrix());
                positionX = this.camera.positionX - offset[0];
                positionY = this.camera.positionY - offset[1];
            }

            if (animation) {
                this.zoomToAnimation({
                    positionX: positionX,
                    positionY: positionY,
                    scale: newscale
                });
            } else {
                this.camera.positionX = positionX;
                this.camera.positionY = positionY;
                this.camera.scale = newscale;
            }
        }
    }, {
        key: 'zoomToAnimation',
        value: function zoomToAnimation(option, time) {
            _tween2.default.removeByType('camera');
            time = time || 100;

            var _this = this;
            new _tween2.default(this.camera, 'camera').to(option).duration(time).on('change', function () {
                _this.forceRender();
            });
        }

        //cache update

    }, {
        key: 'clearRenderCache',
        value: function clearRenderCache(rootType) {
            if (rootType && this.renderType[rootType]) {
                this.forceRender();
                this.renderType[rootType].cache = false;
            } else if (!rootType) {
                this.forceRender();
                this.renderType.node.cache = false;
                this.renderType.nodeLabel.cache = false;
                this.renderType.edge.cache = false;
                this.renderType.edgeLabel.cache = false;
            }
        }
    }, {
        key: 'updateRenderData',
        value: function updateRenderData(rootType, id, argFn) {
            if (!this.renderType[rootType].cache) return;

            var cache = this.renderType[rootType].index[id]; //
            var type = cache.type;
            var start = cache.start;

            var renderType = this.renderType[rootType].type[type];

            for (var layer in renderType.layers) {
                var renderData = renderType.layers[layer].render.getRenderData(argFn());

                if (!renderData || renderData.length == 0 || renderData && renderData.length > 0 && start[layer] === null) continue;

                renderData.forEach(function (e, i) {
                    renderType.layers[layer].data[start[layer] + i] = e;
                });
            }
        }
    }, {
        key: 'updateNodeRenderData',
        value: function updateNodeRenderData(ids) {
            // debugger
            this.forceRender();
            if (!Array.isArray(ids)) ids = [ids];
            ids.forEach(function (id) {
                this.updateRenderData('node', id, function () {
                    return {
                        data: this.graph.nodesIndex[id],
                        textureLoader: this.textureLoader,
                        textureIcon: this.textureIcon
                    };
                }.bind(this));
            }.bind(this));
        }
    }, {
        key: 'updateNodeLabelRenderData',
        value: function updateNodeLabelRenderData(ids) {
            // debugger
            this.forceRender();
            if (!Array.isArray(ids)) ids = [ids];
            ids.forEach(function (id) {
                this.updateRenderData('nodeLabel', id, function () {
                    return {
                        data: this.graph.nodesIndex[id],
                        textureText: this.textureText
                    };
                }.bind(this));
            }.bind(this));
        }
    }, {
        key: 'updateEdgeRenderData',
        value: function updateEdgeRenderData(ids) {
            this.forceRender();
            if (!Array.isArray(ids)) ids = [ids];
            ids.forEach(function (id) {
                this.updateRenderData('edge', id, function () {
                    return {
                        data: this.graph.edgesIndex[id],
                        source: this.graph.nodesIndex[this.graph.edgesIndex[id].source],
                        target: this.graph.nodesIndex[this.graph.edgesIndex[id].target]
                    };
                }.bind(this));
            }.bind(this));
        }
    }, {
        key: 'updateEdgeLabelRenderData',
        value: function updateEdgeLabelRenderData(ids) {
            // debugger
            this.forceRender();
            if (!Array.isArray(ids)) ids = [ids];
            ids.forEach(function (id) {
                this.updateRenderData('edgeLabel', id, function () {
                    return {
                        data: this.graph.edgesIndex[id],
                        source: this.graph.nodesIndex[this.graph.edgesIndex[id].source],
                        target: this.graph.nodesIndex[this.graph.edgesIndex[id].target],
                        textureText: this.textureText
                    };
                }.bind(this));
            }.bind(this));
        }
    }]);

    return WebGLRender;
}(_EventEmitter3.default);

exports.default = WebGLRender;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = "attribute vec2 a_position;\nattribute vec2 a_uv;\nattribute float a_size;\n\nuniform mat3 u_matrix;\nuniform sampler2D u_image;\n\n\nvarying vec2 v_texCoord;\nvarying float size;\n\nvoid main() {\ngl_Position = vec4((u_matrix*vec3(a_position,1)).xy,0,1);\nv_texCoord = a_uv;\nsize = a_size;\n}\n"

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by chengang on 17-4-6.
 */



Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Graph = __webpack_require__(11);

var _Graph2 = _interopRequireDefault(_Graph);

var _render2 = __webpack_require__(5);

var _render3 = _interopRequireDefault(_render2);

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

var _tween = __webpack_require__(2);

var _tween2 = _interopRequireDefault(_tween);

var _Selection = __webpack_require__(12);

var _Selection2 = _interopRequireDefault(_Selection);

var _index = __webpack_require__(19);

var _index2 = _interopRequireDefault(_index);

var _config = __webpack_require__(13);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Core = function () {
    function Core(option) {
        _classCallCheck(this, Core);

        option = option || {};

        this.config = _util2.default.extend(_config2.default, option.config || {});

        this.graph = new _Graph2.default({
            nodes: option.nodes,
            edges: option.edges
        });

        this.container = option.container;

        this.canvas = {};
        this.initCanvas();

        this.render = new _render3.default(this, _util2.default.extend({ container: this.canvas.render }, this.config));

        this.selection = new _Selection2.default(this.canvas.mouse, this);

        this.on = this.render.on.bind(this.render);
        this.off = this.render.off.bind(this.render);

        if (this.graph.nodes.length > 0) this.makeLayout(option.layout || 'preset');

        this._start();

        this._initEvent();
    }

    _createClass(Core, [{
        key: 'initCanvas',
        value: function initCanvas() {

            this.container.style.position = 'relative';

            this.canvas.render = this._createCanvas();
            this.container.appendChild(this.canvas.render);

            this.container.oncontextmenu = function (e) {
                e.preventDefault();
            };

            this.canvas.mouse = this._createCanvas();
            this.canvas.mouse.style.display = 'none';
            this.canvas.mouse.style.cursor = 'cell';

            this.container.appendChild(this.canvas.mouse);
        }
    }, {
        key: '_createCanvas',
        value: function _createCanvas() {
            var canvas = document.createElement('canvas');
            canvas.style.position = 'absolute';
            canvas.style.left = '0px';
            canvas.style.top = '0px';
            canvas.width = this.container.clientWidth;
            canvas.height = this.container.clientHeight;
            canvas.style.width = '100%';
            canvas.style.height = '100%';

            return canvas;
        }
    }, {
        key: '_start',
        value: function _start() {
            var _this = this;
            var frames = state();

            function state() {
                var n = -1,
                    start = 0;
                return function (time) {
                    n++;
                    time = time / 1000;
                    if (time - start > 1) {
                        // console.log(n);
                        n = -1;
                        start = time;
                    }
                };
            }

            function render(time) {
                _this._render();
                frames(time);
                requestAnimationFrame(render);
            }

            requestAnimationFrame(render);
        }
    }, {
        key: '_render',
        value: function _render() {
            this.resize();

            if (this.render && this.render.needUpdate) {
                // console.time('render')
                // debugger
                this.render.render();
                // console.timeEnd('render')
            }
        }
    }, {
        key: '_initEvent',
        value: function _initEvent() {
            var _this = this;
            this.render.on('nodeclick', function (node, e) {
                if (!_this.selection.isSelected(node)) _this.selection.select(node, e.shiftKey);else if (e.shiftKey) _this.selection.unSelect(node);
            });

            this.render.on('rightclick', function (type, node, e) {
                if (type == 'node' && !_this.selection.isSelected(node)) _this.selection.select(node);
            });
        }
    }, {
        key: 'resize',
        value: function resize() {
            if (this.canvas.mouse.width != this.container.clientWidth || this.canvas.mouse.height != this.container.clientHeight) {
                this.canvas.mouse.width = this.container.clientWidth;
                this.canvas.mouse.height = this.container.clientHeight;
                this.render.forceRender();
            }
        }
    }, {
        key: 'getFitOptions',
        value: function getFitOptions(nodes) {
            var x0 = Infinity,
                y0 = Infinity,
                x1 = -Infinity,
                y1 = -Infinity;
            nodes.forEach(function (e) {
                if (e.x < x0) x0 = e.x;
                if (e.x > x1) x1 = e.x;
                if (e.y < y0) y0 = e.y;
                if (e.y > y1) y1 = e.y;
            });

            return {
                scale: Math.max((x1 - x0) / this.render.container.clientWidth, (y1 - y0) / this.render.container.clientHeight),
                positionX: (x0 + x1) / 2,
                positionY: (y0 + y1) / 2
            };
        }
    }, {
        key: 'fit',
        value: function fit(duration, option) {
            var _this = this;
            _tween2.default.removeByType('camera');
            duration = duration || 1000;
            option = option || this.getFitOptions(this.graph.nodes);
            new _tween2.default(this.render.camera, 'camera').to(option).duration(duration).on('change', function () {
                _this.render.forceRender();
            });
        }
    }, {
        key: 'makeLayout',
        value: function makeLayout(type, nodes) {

            var _this = this;
            var layout, data;
            var layoutConfig = Core.layout;

            _tween2.default.removeByType('layout');

            var edges = null;
            if (nodes == null) {
                nodes = this.graph.nodes;
                edges = this.graph.edges;
            } else {
                edges = getEdges(nodes);
            }

            if (type == 'preset') {
                this.graph.nodes.forEach(function (e) {
                    if (!('x' in e)) e.x = Math.random() * _this.render.gl.clientWidth;
                    if (!('y' in e)) e.y = Math.random() * _this.render.gl.clientWidth;
                });
                this.render.clearRenderCache();
            } else if (layout = layoutConfig[type]) {

                layout = new layoutConfig[type]();
                data = layout.layout(nodes, edges);

                if (data.length > this.graph.nodes.length * 4 / 5) {
                    new _tween2.default(nodes, 'layout').to(data).duration(2000).on('change', function (t) {
                        _this.render.clearRenderCache();
                    });

                    this.fit(2000, this.getFitOptions(data));
                } else {

                    var bbox = _util2.default.getBBox(nodes);
                    var bbox1 = _util2.default.getBBox(data);

                    var offsetX = bbox.x + bbox.w / 2 - (bbox1.x + bbox1.w / 2);
                    var offsetY = bbox.y + bbox.h / 2 - (bbox1.y + bbox1.h / 2);

                    data.forEach(function (e) {
                        e.x += offsetX;
                        e.y += offsetY;
                    });

                    new _tween2.default(nodes, 'layout').to(data).duration(2000).on('change', function (t) {
                        nodes.forEach(function (node) {
                            _this.graph.setNodeData(node.id, { x: node.x });
                        });
                    });
                }
            }

            function getEdges(nodes) {
                var map = {};
                var edges = [];
                nodes.forEach(function (e) {
                    map[e.id] = true;
                });

                _this.graph.edges.forEach(function (e) {
                    if (map[e.source] && map[e.target]) edges.push(e);
                });

                return edges;
            }
        }
    }]);

    return Core;
}();

Core.layout = _index2.default;
exports.default = Core;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebGLRender = undefined;

var _render = __webpack_require__(5);

var _render2 = _interopRequireDefault(_render);

var _Node = __webpack_require__(29);

var _Node2 = _interopRequireDefault(_Node);

var _Rect = __webpack_require__(30);

var _Rect2 = _interopRequireDefault(_Rect);

var _default = __webpack_require__(25);

var _default2 = _interopRequireDefault(_default);

var _curve = __webpack_require__(24);

var _curve2 = _interopRequireDefault(_curve);

var _NodeLabel = __webpack_require__(27);

var _NodeLabel2 = _interopRequireDefault(_NodeLabel);

var _EdgeLabel = __webpack_require__(26);

var _EdgeLabel2 = _interopRequireDefault(_EdgeLabel);

var _curveLabel = __webpack_require__(28);

var _curveLabel2 = _interopRequireDefault(_curveLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_render2.default.node = {}; /**
                             * Created by chengang on 17-3-28.
                             */

_render2.default.edge = {};
_render2.default.nodeLabel = {};
_render2.default.edgeLabel = {};

_render2.default.node.default = _Node2.default;
_render2.default.node.rect = _Rect2.default;

_render2.default.edge.default = _default2.default;
_render2.default.edge.curve = _curve2.default;

_render2.default.nodeLabel.default = _NodeLabel2.default;
_render2.default.nodeLabel.rect = _NodeLabel2.default;

_render2.default.edgeLabel.default = _EdgeLabel2.default;
_render2.default.edgeLabel.curve = _curveLabel2.default;

exports.WebGLRender = _render2.default;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 *from d3-timer
 */



Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.now = now;
exports.Timer = Timer;
exports.default = timer;
exports.timerFlush = timerFlush;
var frame = 0,
    // is an animation frame pending?
timeout = 0,
    // is a timeout pending?
interval = 0,
    // are any timers active?
pokeDelay = 1000,
    // how frequently we check for clock skew
taskHead,
    taskTail,
    clockLast = 0,
    clockNow = 0,
    clockSkew = 0,
    clock = (typeof performance === "undefined" ? "undefined" : _typeof(performance)) === "object" && performance.now ? performance : Date,
    setFrame = typeof requestAnimationFrame === "function" ? requestAnimationFrame : function (f) {
    // setTimeout(f, 17);
    setTimeout(f, 30);
}; //

function now() {
    return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}

function clearNow() {
    clockNow = 0;
}

function Timer() {
    this._call = this._time = this._next = null;
}

Timer.prototype = timer.prototype = {
    constructor: Timer,
    restart: function restart(callback, delay, time) {
        if (typeof callback !== "function") throw new TypeError("callback is not a function");
        time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
        if (!this._next && taskTail !== this) {
            if (taskTail) taskTail._next = this;else taskHead = this;
            taskTail = this;
        }
        this._call = callback;
        this._time = time;
        sleep();
    },
    stop: function stop() {
        if (this._call) {
            this._call = null;
            this._time = Infinity;
            sleep();
        }
    }
};

function timer(callback, delay, time) {
    var t = new Timer();
    t.restart(callback, delay, time);
    return t;
}

function timerFlush() {
    now(); // Get the current time, if not already set.
    ++frame; // Pretend we’ve set an alarm, if we haven’t already.
    var t = taskHead,
        e;
    while (t) {
        if ((e = clockNow - t._time) >= 0) t._call.call(null, e);
        t = t._next;
    }
    --frame;
}

function wake() {
    clockNow = (clockLast = clock.now()) + clockSkew;
    frame = timeout = 0;
    try {
        timerFlush();
    } finally {
        frame = 0;
        nap();
        clockNow = 0;
    }
}

function poke() {
    var now = clock.now(),
        delay = now - clockLast;
    if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
}

function nap() {
    var t0,
        t1 = taskHead,
        t2,
        time = Infinity;
    while (t1) {
        if (t1._call) {
            if (time > t1._time) time = t1._time;
            t0 = t1, t1 = t1._next;
        } else {
            t2 = t1._next, t1._next = null;
            t1 = t0 ? t0._next = t2 : taskHead = t2;
        }
    }
    taskTail = t0;
    sleep(time);
}

function sleep(time) {
    if (frame) return; // Soonest alarm already set, or will be.
    if (timeout) timeout = clearTimeout(timeout);
    var delay = time - clockNow;
    if (delay > 24) {
        if (time < Infinity) timeout = setTimeout(wake, delay);
        if (interval) interval = clearInterval(interval);
    } else {
        if (!interval) interval = setInterval(poke, pokeDelay);
        frame = 1, setFrame(wake);
    }
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by chengang on 17-3-29.
 */



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = initEvent;

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function initEvent() {

    function handlerWrap(handle) {
        return function (e) {
            var pos = _this.toCameraPos({ x: e.offsetX, y: e.offsetY });
            e.cameraX = pos.x;
            e.cameraY = pos.y;
            handle(e);
        };
    }

    var _this = this;
    var mouseDown = false,
        mouseMove = false;

    var events = {
        // click:handlerWrap(_clickHandler),
        mousemove: handlerWrap(_moveHandler),
        mousedown: handlerWrap(_downHandler),
        mouseup: handlerWrap(_upHandler),
        mousewheel: handlerWrap(_wheelHandler)
    };

    for (var e in events) {
        this.container.addEventListener(e, events[e], false);
    }events.click = handlerWrap(_clickHandler);

    //some little situation maybe need the trigger function.
    this.trigger = function (type, event) {
        if (events[type]) events[type](event);
    };

    function checkInNode(posx, posy, node) {
        var isFind = false;
        var dis, sizeX, sizeY;
        if (node.type == 'rect') {
            sizeX = _util2.default.getNodeSizeX(node);
            sizeY = _util2.default.getNodeSizeY(node);
            isFind = _util2.default.inRect(posx, posy, node.x - sizeX, node.y - sizeY, sizeX * 2, sizeY * 2);
        } else {
            dis = _util2.default.getDistance(posx, posy, node.x, node.y);
            isFind = dis <= node.size;
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
                if (checkInNode(pos.x, pos.y, node)) {
                    findNode = node;
                    break;
                }
            }
        }
        return findNode;
    }

    function _clickHandler(e) {
        var graphPos = _this.toGraphPos({ x: e.cameraX, y: e.cameraY });
        var node = getNode(graphPos);
        if (node) _this.emit('nodeclick', [node, e]);else _this.emit('stageclick', [e]);
    }

    function _moveHandler(e) {
        if (mouseDown) mouseMove = true;
        // var graphPos = _this.toGraphPos({x:e.cameraX,y:e.cameraY});
        // var node = getNode(graphPos);
    }

    function _downHandler(e) {

        mouseDown = true;

        var graphPos = _this.toGraphPos({ x: e.cameraX, y: e.cameraY });
        var node = getNode(graphPos);
        handleDrag(!node);
        _this.forceRender();

        function handleDrag(isCamera) {
            var isDown = true;
            var startx = graphPos.x,
                starty = graphPos.y;

            var onmousemove = handlerWrap(function (e) {
                if (!isDown) return;
                // console.time('move')

                _this.forceRender();

                var graphPos = _this.toGraphPos({ x: e.cameraX, y: e.cameraY });
                var offsetx = graphPos.x - startx;
                var offsety = graphPos.y - starty;

                if (isCamera) {
                    _this.camera.positionX -= offsetx;
                    _this.camera.positionY -= offsety;
                } else {

                    if (_this.context.selection.isSelected(node)) {
                        _this.context.selection.data.forEach(function (node) {
                            _this.graph.setNodeData(node.id, { x: node.x + offsetx, y: node.y + offsety });
                        });
                    } else _this.graph.setNodeData(node.id, { x: node.x + offsetx, y: node.y + offsety });
                    // _this.emit('drag',['node',offsetx,offsety]);

                    // fit(e);
                }

                if (isCamera) {
                    var newgraphPos = _this.toGraphPos({ x: e.cameraX, y: e.cameraY });
                    startx = newgraphPos.x;
                    starty = newgraphPos.y;
                } else {
                    startx = graphPos.x;
                    starty = graphPos.y;
                }
                // console.timeEnd('move')
            });

            var onmouseup = handlerWrap(function (e) {
                e.preventDefault();
                isDown = false;
                clear();
            });

            var onmouseout = handlerWrap(function (e) {
                isDown = false;
                clear();
            });

            _this.container.addEventListener('mousemove', onmousemove);
            _this.container.addEventListener('mouseup', onmouseup);
            _this.container.addEventListener('mouseout', onmouseout);

            function clear() {
                onmousemove && _this.container.removeEventListener('mousemove', onmousemove);
                onmouseup && _this.container.removeEventListener('mouseup', onmouseup);
                onmouseout && _this.container.removeEventListener('mouseout', onmouseout);
                onmousemove = onmouseup = onmouseout = null;
            }
        }
    }

    function _upHandler(e) {

        if (mouseDown && !mouseMove) {
            _clickHandler(e);
        }
        mouseDown = false;
        mouseMove = false;

        if (e.which && e.which == 3 || e.button && e.button == 2) {
            var graphPos = _this.toGraphPos({ x: e.cameraX, y: e.cameraY });
            var node = getNode(graphPos);
            if (node) {
                _this.emit('rightclick', ['node', node, e]);
            } else {
                _this.emit('rightclick', ['stage', null, e]);
            }
        }
    }

    function _wheelHandler(e) {
        _this.forceRender();
        var ratio = _this.config.zoomRatio;
        if (e.wheelDelta > 0) {
            _this.zoomTo(1 / ratio, e.cameraX, e.cameraY);
            _this.emit('zoom', [1 / ratio]);
        } else {
            _this.zoomTo(ratio, e.cameraX, e.cameraY);
            _this.emit('zoom', [ratio]);
        }
    }

    //drag


    function fit(e) {
        var x = e.offsetX,
            y = e.offsetY;

        var camearaX = _this.camera.positionX;
        var camearaY = _this.camera.positionY;
        var scale = _this.camera.scale;

        var offset = 20 / scale;
        var update = false;

        if (x < 100) {
            update = true;
            camearaX -= offset;
        }
        if (x > _this.container.clientWidth - 100) {
            update = true;
            camearaX += offset;
        }

        if (y < 100) {
            update = true;
            camearaY += offset;
        }

        if (y > _this.container.clientHeight - 100) {
            update = true;
            camearaY -= offset;
        }

        // if(update) _this.zoomToAnimation({
        //     positionX:camearaX,
        //     positionY:camearaY,
        //     scale:scale
        // });

        if (update) _this.zoomTo(1.01, e.cameraX, e.cameraY, true);
    }
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

var _EventEmitter2 = __webpack_require__(1);

var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import  Quad from '../base/Quad'


var Graph = function (_EventEmitter) {
    _inherits(Graph, _EventEmitter);

    function Graph(options) {
        _classCallCheck(this, Graph);

        var _this = _possibleConstructorReturn(this, (Graph.__proto__ || Object.getPrototypeOf(Graph)).call(this));

        options = options || {};

        // this.quad = new Quad();

        if (options.nodes || options.edges) _this.read(options);

        return _this;
    }

    _createClass(Graph, [{
        key: 'clear',
        value: function clear() {
            /**
             * node edge data
             */
            this.nodes = [];
            this.edges = [];

            /**
             * node edge index
             */
            this.nodesIndex = {};
            this.edgesIndex = {};

            /**
             *nodes degrees info
             */
            this.inEdgesIndex = {};
            this.outEdgesIndex = {};
        }

        /**
         * 读取 node ,edge 信息
         * @param options
         */

    }, {
        key: 'read',
        value: function read(options) {

            this.clear();

            (options.nodes || []).forEach(function (e) {
                if (!e.id) e.id = _util2.default.uuid();
                e.id += '';
                this.nodesIndex[e.id] = e;
                this.nodes.push(e);
            }.bind(this));

            (options.edges || []).forEach(function (e) {
                if (!e.id) e.id = _util2.default.uuid();

                if (!e.source || !this.nodesIndex[e.source + '']) {
                    console.log(e);
                    console.error('some edge has not source id or not a node of the id');
                    return;
                }
                if (!e.target || !this.nodesIndex[e.target + '']) {
                    console.log(e);
                    console.error('some edge has not target id or not a node of the id');
                    return;
                }

                this.edgesIndex['' + e.id] = e;

                e.source += '';
                e.target += '';

                this.inEdgesIndex[e.target] = this.inEdgesIndex[e.target] || [];
                this.inEdgesIndex[e.target].push(e.id);

                this.outEdgesIndex[e.source] = this.outEdgesIndex[e.source] || [];
                this.outEdgesIndex[e.source].push(e.id);

                this.edges.push(e);
            }.bind(this));

            this.updateEdgeCount();

            this.emit('reset');

            // this.quad.index(this.nodes);
        }
    }, {
        key: 'updateEdgeCount',
        value: function updateEdgeCount() {
            var source,
                target,
                attr,
                map = {};
            this.edges.forEach(function (edge) {
                source = this.nodesIndex[edge.source];
                target = this.nodesIndex[edge.target];
                attr = edge.source + edge.target;
                if (!map[attr]) map[attr] = map[edge.target + edge.source] = { counter: 0, source: edge.source };

                edge.curveCount = map[attr].counter;
                map[attr].counter++;
                edge.curveOrder = edge.source == map[attr].source;
            }.bind(this));
        }

        /**
         * add nodes
         * @param nodes
         */

    }, {
        key: 'addNode',
        value: function addNode(nodes) {
            nodes = nodes || [];

            if (nodes.length == 0) return;

            if (!_util2.default.isArray(nodes)) nodes = [nodes];

            var node;
            for (var i = 0; i < nodes.length; i++) {
                node = nodes[i];
                if (!node.id) node.id = _util2.default.uuid();
                if (this.nodesIndex[node.id]) {
                    throw 'node has existed.';
                }
                this.nodes.push(node);
                this.nodesIndex[node.id] = node;
            }

            var ids = nodes.map(function (e) {
                return e.id;
            });
            this.emit('add', ['node', ids]);
        }

        /**
         * remove node
         * @param nodeid
         */

    }, {
        key: 'removeNode',
        value: function removeNode(nodeid) {
            if (!nodeid || !this.nodesIndex[nodeid]) return;

            var nodes = this.nodes;
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].id == nodeid) {
                    nodes.splice(i, 1);
                    break;
                }
            }
            var edges;
            edges = this.inEdgesIndex[nodeid];
            if (edges && edges.length > 0) {
                edges = edges.slice();
                edges.forEach(function (e) {
                    this.removeEdge(e);
                }.bind(this));
            }

            edges = this.outEdgesIndex[nodeid];
            if (edges && edges.length > 0) {
                edges = edges.slice();
                edges.forEach(function (e) {
                    this.removeEdge(e);
                }.bind(this));
            }

            this.nodesIndex[nodeid] = null;
            this.inEdgesIndex[nodeid] = null;
            this.outEdgesIndex[nodeid] = null;

            this.emit('remove', ['node', nodeid]);
        }

        /**
         * add edges ,
         * @param edges
         */

    }, {
        key: 'addEdge',
        value: function addEdge(edges) {
            edges = edges || [];

            if (edges.length == 0) return;

            if (!_util2.default.isArray(edges)) edges = [edges];

            var edge;
            for (var i = 0; i < edges.length; i++) {
                edge = edges[i];
                if (!edge.id) edge.id = _util2.default.uuid();
                if (this.edgesIndex[edge.id]) {
                    // debugger
                    throw 'edge has existed.';
                }
                if (!edge.source || !this.nodesIndex[edge.source + '']) {
                    console.log(edge);
                    throw 'some edge has not source id or not a node of the id';
                }
                if (!edge.target || !this.nodesIndex[edge.target + '']) {
                    console.log(edge);
                    throw 'some edge has not target id or not a node of the id';
                }

                this.edges.push(edge);
                this.edgesIndex[edge.id] = edge;

                edge.source += '';
                edge.target += '';

                this.inEdgesIndex[edge.target] = this.inEdgesIndex[edge.target] || [];
                this.inEdgesIndex[edge.target].push(edge.id);

                this.outEdgesIndex[edge.source] = this.outEdgesIndex[edge.source] || [];
                this.outEdgesIndex[edge.source].push(edge.id);
            }

            var ids = edges.map(function (e) {
                return e.id;
            });
            this.emit('add', ['edge', ids]);
        }
    }, {
        key: 'removeEdge',
        value: function removeEdge(edgeid) {
            if (!edgeid || !this.edgesIndex[edgeid]) return;

            var edge = this.edgesIndex[edgeid],
                edges;
            var outEdgesIndex, inEdgesIndex;

            outEdgesIndex = this.outEdgesIndex[edge.source];
            if (outEdgesIndex.length > 0) {
                for (var i = 0; i < outEdgesIndex.length; i++) {
                    if (outEdgesIndex[i] == edgeid) {
                        outEdgesIndex.splice(i, 1);
                        break;
                    }
                }
            }
            inEdgesIndex = this.inEdgesIndex[edge.target];
            if (inEdgesIndex.length > 0) {
                for (var i = 0; i < inEdgesIndex.length; i++) {
                    if (inEdgesIndex[i] == edgeid) {
                        inEdgesIndex.splice(i, 1);
                        break;
                    }
                }
            }

            edges = this.edges;
            for (var i = 0; i < edges.length; i++) {
                if (edges[i].id == edgeid) {
                    edges.splice(i, 1);
                    break;
                }
            }

            this.edgesIndex[edgeid] = null;
            this.emit('remove', ['edge', edgeid]);
        }
    }, {
        key: 'getNodes',
        value: function getNodes() {
            return this.nodes;
        }
    }, {
        key: 'setNodeData',
        value: function setNodeData(id, obj) {
            var node = this.nodesIndex[id];

            var updatePos = false;
            if (obj.hasOwnProperty('x') || obj.hasOwnProperty('y')) updatePos = true;

            for (var attr in obj) {
                node[attr] = obj[attr];
            }this.emit('change', ['node', id]);
            if (updatePos) {
                this.inEdgesIndex[id] && this.inEdgesIndex[id].length > 0 && this.emit('change', ['edge', this.inEdgesIndex[id]]);
                this.outEdgesIndex[id] && this.outEdgesIndex[id].length > 0 && this.emit('change', ['edge', this.outEdgesIndex[id]]);
            }
        }
    }, {
        key: 'updateNodeQuad',
        value: function updateNodeQuad(id, oldpos) {
            var nodes = this.quad.point(oldpos.x, oldpos.y);
            if (nodes.length > 0) {
                for (var i = 0, len = nodes.length; i < len; i++) {
                    if (nodes[i].id == id) {
                        nodes.splice(i, 1);
                        break;
                    }
                }
                this.quad.insert(this.nodesIndex[id], this.quad.root);
            }
        }
    }]);

    return Graph;
}(_EventEmitter3.default);

exports.default = Graph;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by chengang on 17-4-19.
 */



Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EventEmitter2 = __webpack_require__(1);

var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Selection = function (_EventEmitter) {
    _inherits(Selection, _EventEmitter);

    function Selection(canvas, context) {
        _classCallCheck(this, Selection);

        var _this2 = _possibleConstructorReturn(this, (Selection.__proto__ || Object.getPrototypeOf(Selection)).call(this));

        _this2.context = context;

        _this2.canvas = canvas;
        _this2.ctx = _this2.canvas.getContext('2d');

        _this2.canvas.addEventListener('mousedown', _this2.mouseDown.bind(_this2));

        _this2.rect = {
            x: 0,
            y: 0,
            w: 0,
            h: 0
        };

        _this2.data = [];

        _this2.initGraphEvent();
        return _this2;
    }

    _createClass(Selection, [{
        key: 'enable',
        value: function enable() {
            this.canvas.style.display = 'block';
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }, {
        key: 'renderRect',
        value: function renderRect() {
            var rect = this.rect;
            var ctx = this.ctx;
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            ctx.fillStyle = 'rgba(58, 75, 89, 0.3)';
            ctx.strokeStyle = "#4b7598";
            ctx.beginPath();
            ctx.rect(rect.x, rect.y, rect.w, rect.h);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }
    }, {
        key: 'disable',
        value: function disable() {
            this.canvas.style.display = 'none';
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }, {
        key: 'initGraphEvent',
        value: function initGraphEvent() {
            var _this = this;
            this.context.graph.on('remove', function (type, id) {
                if (type == 'node') {
                    for (var i = 0; i < _this.data.length; i++) {
                        if (_this.data[i].id == id) {
                            _this.data.splice(i, 1);
                            break;
                        }
                    }
                }
            });

            this.context.graph.on('reset', function () {
                _this.data = [];
            });
        }
    }, {
        key: 'mouseDown',
        value: function mouseDown(e) {
            var _this = this;

            this.rect.x = e.offsetX;
            this.rect.y = e.offsetY;

            _this.emit('selectstart');

            document.addEventListener('mousemove', mouseMove);
            document.addEventListener('mouseup', mouseUp);
            function mouseMove(e) {
                _this.rect.w = e.offsetX - _this.rect.x;
                _this.rect.h = e.offsetY - _this.rect.y;

                _this.renderRect();
            }
            function mouseUp(e) {
                document.removeEventListener('mousemove', mouseMove);
                document.removeEventListener('mouseup', mouseUp);
                var data = _this.filter(_this.ctx);

                _this.disable();
                _this.select(data);
                _this.emit('selectend', [data]);
            }
        }
    }, {
        key: 'select',
        value: function select(nodes, isAdd) {
            var sendMessage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

            var _this = this;

            if (!_util2.default.isArray(nodes)) nodes = [nodes];

            if (isAdd) {
                nodes.forEach(function (node) {
                    _this.context.graph.setNodeData(node.id, { selected: true });
                    _this.data.push(node);
                });
            } else {

                _this.data.forEach(function (e) {
                    if (_this.context.graph.nodesIndex[e.id]) _this.context.graph.setNodeData(e.id, { selected: false });
                });

                nodes.forEach(function (node) {
                    _this.context.graph.setNodeData(node.id, { selected: true });
                });

                _this.data = nodes;
            }

            sendMessage && _this.emit('select', [_this.getSelection()]);
        }
    }, {
        key: 'unSelect',
        value: function unSelect(nodes) {

            if (this.data.length == 0 || !nodes) return;

            var _this = this;
            if (!_util2.default.isArray(nodes)) nodes = [nodes];

            var map = {};

            nodes.forEach(function (node) {
                map[node.id] = true;
            });

            var newSelected = [];
            this.data.forEach(function (node) {
                if (map[node.id]) _this.context.graph.setNodeData(node.id, { selected: false });else newSelected.push(node);
            });

            this.data = newSelected;

            _this.emit('select', [_this.getSelection()]);
        }
    }, {
        key: 'getSelection',
        value: function getSelection() {
            return this.data.slice();
        }
    }, {
        key: 'isSelected',
        value: function isSelected(node) {
            for (var i = 0; i < this.data.length; i++) {
                if (this.data[i].id == node.id) {
                    return true;
                }
            }
            return false;
        }
    }, {
        key: 'filter',
        value: function filter(ctx) {
            var nodes = this.context.graph.nodes;
            var selects = [];
            var domPos;
            nodes.forEach(function (node) {
                domPos = this.context.render.graphToDomPos({ x: node.x, y: node.y });
                if (ctx.isPointInPath(domPos.x, domPos.y)) selects.push(node);
            }.bind(this));

            return selects;
        }
    }, {
        key: 'delete',
        value: function _delete() {
            var _this = this;
            var data = this.data;
            this.data = [];
            data.forEach(function (node) {
                _this.context.graph.removeNode(node.id);
            });
        }
    }]);

    return Selection;
}(_EventEmitter3.default);

exports.default = Selection;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by chengang on 17-4-12.
 */



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    zoomRatio: 1.2,
    zoomMin: 0.05,
    zoomMax: 20,

    renderNode: true,
    renderNodeLabel: true,
    renderEdge: true,
    renderEdgeLabel: false,

    textureIconWidth: 1024,
    textureIconHeight: 1024
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by chengang on 17-2-20.
 */
function CircularLayout() {
    this.nodes = null;
    // this.links = null;
    this.posSet = null;
    this.depthPosSet = null;
    this.drawnBiComps = null;
    this.bc = null;
    this.nodeHeights = {};
    this.node2BiComp = {};

    this.width = 60;
}

var p = CircularLayout.prototype;

//必须有的方法
p.layout = function (nodes, edges) {
    this.init(nodes, edges);

    this.posSet = new Array(this.nodes.length);
    this.depthPosSet = new Array(this.nodes.length);

    this.bc = this.createBicconnects();
    // var test = this.bc.filter(function (e) {
    //     return e.length > 3;
    // });
    this.__layout(this.bc);
    return this.nodes.map(function (e) {
        return { x: e.x || 0, y: e.y || 0 };
    });
};
p.init = function (nodes, edges) {
    var oldNodes = nodes,
        oldLinks = edges;
    var tempNodes = [],
        map = {},
        temp;
    oldNodes.forEach(function (e, i) {
        temp = {
            id: e.id,
            _index: i,
            links: []
        };
        tempNodes.push(temp);
        map[temp.id] = temp;
    });

    var s, t;
    oldLinks.forEach(function (e, i) {
        s = map[e.source];
        t = map[e.target];

        s.links = s.links || [];
        s.links.push(t._index);

        t.links = t.links || [];
        t.links.push(s._index);
    });

    this.nodes = tempNodes;
};
p.createBicconnects = function () {
    var nodes = this.nodes;
    var states = new Array(this.nodes.length),
        dfsn = new Array(this.nodes.length),
        low = new Array(this.nodes.length),
        edgesStack = [],
        pre = new Array(this.nodes.length);

    var biComponents = [];

    pre[0] = -1;
    var num = 0;
    for (var i = 0; i < this.nodes.length; i++) {
        states[i] = 0;
    }

    dfs(0);
    return biComponents;

    function dfs(current) {
        states[current] = 1;
        low[current] = dfsn[current] = ++num;

        var neigh;
        var neighNodes = nodes[current].links;

        for (var i = 0; i < neighNodes.length; i++) {
            neigh = neighNodes[i];

            if (states[neigh] == 0) {
                pre[neigh] = current;
                edgesStack.push({ source: current, target: neigh });
                dfs(neigh);
                low[current] = Math.min(low[current], low[neigh]);

                if (pre[current] == -1 && nodes[current].links.length >= 2 || low[neigh] >= dfsn[current]) {
                    //                        var children = nodes[current].links;
                    //                        if(children.length >=2){
                    var singleComponent = [];
                    var map = {};
                    singleComponent.push(edgesStack[edgesStack.length - 1].target);
                    map[edgesStack[edgesStack.length - 1].target] = true;
                    while (edgesStack[edgesStack.length - 1].source != current) {
                        var edge = edgesStack.pop();
                        if (!map[edge.source]) {
                            singleComponent.push(edge.source);
                            map[edge.source] = true;
                        }
                        if (!map[edge.target]) {
                            singleComponent.push(edge.target);
                            map[edge.target] = true;
                        }
                    }
                    edgesStack.pop();
                    if (!map[current]) {
                        singleComponent.push(current);
                        map[current] = true;
                    }
                    /*singleComponent.length > 2 && */biComponents.push(singleComponent);
                    //                        }
                }
                //                    states[neigh]
            } else if (neigh != pre[current]) {
                low[current] = Math.min(low[current], low[neigh]);
            }
        }
    }
};
p.__layout = function (biconncts) {

    var max = -1;
    var maxIndex = null;
    var nodes = this.nodes;

    biconncts.forEach(function (e, i) {
        if (e.length > max) {
            max = e.length;
            maxIndex = i;
        }
    });

    biconncts[maxIndex].forEach(function (e) {
        nodes[e].delete = true;
    });

    for (var i = 0; i < biconncts.length; i++) {
        if (biconncts[i].length > 3) {
            for (var j = 0; j < biconncts[i].length; j++) {
                this.node2BiComp[biconncts[i][j]] = i;
            }
        }
    }var bc = biconncts[maxIndex];

    this.drawnBiComps = new Array(bc.length);
    this.drawnBiComps[maxIndex] = true;

    var maxSize = bc.length;
    var radius = this.width * maxSize / (Math.PI * 2);
    var deltaAngle = 2 * Math.PI / maxSize;
    var angle = 0;

    var startX = radius | 0;
    var startY = radius | 0;

    bc = this.sortInnerCircle(bc);

    for (var i = 0; i < bc.length; i++) {
        nodes[bc[i]].test = i;
        nodes[bc[i]].x = startX + Math.cos(angle) * radius;
        nodes[bc[i]].y = startY - Math.sin(angle) * radius;
        this.posSet[bc[i]] = true;
        angle += deltaAngle;
    }

    this.SetOuterCircle(maxIndex, radius, startX, startY, -1);
};
p.sortInnerCircle = function (icNodes) {
    var greedyNodes = [];
    var modestNodes = [];

    var forFunct = {};

    for (var i = 0; i < icNodes.length; i++) {
        forFunct[icNodes[i]] = true;
    }for (var i = 0; i < icNodes.length; i++) {
        var tmp = this.NoOfChildren(icNodes[i], forFunct);

        if (tmp > 4) greedyNodes.push(icNodes[i]);else modestNodes.push(icNodes[i]);
    }

    var toReturn = new Array(icNodes.length);
    var gNo = greedyNodes.length;
    var mNo = modestNodes.length;
    var deltaM;
    var deltaG;

    if (gNo == 0) {
        deltaM = mNo;
        deltaG = 0;
    } else if (mNo == 0) {
        deltaG = gNo;
        deltaM = 0;
    } else if (gNo > mNo) {
        deltaM = 1;
        deltaG = gNo / mNo | 0;
    } else {
        deltaG = 1;
        deltaM = mNo / gNo | 0;
    }

    var x = 0;
    var i, g, m;
    for (g = 0, m = 0; g < greedyNodes.length && m < modestNodes.length;) {
        for (i = 0; i < deltaG && g < greedyNodes.length; i++) {
            toReturn[x++] = greedyNodes[g++];
        }for (i = 0; i < deltaM && m < modestNodes.length; i++) {
            toReturn[x++] = modestNodes[m++];
        }
    }

    while (g < greedyNodes.length) {
        toReturn[x++] = greedyNodes[g++];
    }while (m < modestNodes.length) {
        toReturn[x++] = modestNodes[m++];
    }return toReturn;
};
p.NoOfChildren = function (nodeId, outerCircle) {
    var toReturn = 0;
    var nodes = this.nodes;
    var links = nodes[nodeId].links;

    for (var i = 0; i < links.length; i++) {
        var currNeigh = links[i];

        if (!this.posSet[currNeigh] && !outerCircle[currNeigh]) toReturn++;
    }

    if (toReturn > 7) toReturn = 7;

    return toReturn;
};
p.SetOuterCircle = function (compIndex, innerCircleRadius, startX, startY, firstTouched) {
    var nodes = this.nodes;
    var outerNodesCount = 0;
    var rnc = 0;
    var iter;
    var outerCircle = {};

    for (var i = 0; i < this.bc[compIndex].length; i++) {
        iter = nodes[this.bc[compIndex][i]].links;

        for (var j = 0; j < iter.length; j++) {
            var currNeighbour = iter[j];

            if (!this.posSet[currNeighbour]) {
                outerNodesCount += this.NoOfChildren(currNeighbour, outerCircle) + 1;
                outerCircle[currNeighbour] = true;
                rnc++;
            }
        }
    }

    var outerRadius = 1.5 * innerCircleRadius;

    // + 5 * nodeHorizontalSpacing;
    var tryCount = 2 * Math.PI * outerRadius / 32 | 0;
    var outerDeltaAngle = 2 * Math.PI / tryCount;

    if (tryCount < 1.2 * outerNodesCount) {
        outerRadius = 1.2 * 32 * outerNodesCount / (2 * Math.PI);
        outerDeltaAngle = 2 * Math.PI / (1.2 * outerNodesCount);
        outerNodesCount *= 1.2;
    } else outerNodesCount = tryCount;

    if (outerNodesCount > 10 && firstTouched != -1) outerNodesCount += 5;

    // 5 places on outer circle for connection with other biconn. comp.
    //System.out.println("tryCount = " + tryCount);

    // setting nodes on outer circle
    outerNodesCount = outerNodesCount | 0;
    var outerPositionsTaken = new Array(outerNodesCount);
    var outerPositionsOwners = new Array(outerNodesCount);

    for (var i = 0; i < outerPositionsTaken.length; i++) {
        outerPositionsTaken[i] = -1;
        outerPositionsOwners[i] = -1;
    }

    var pointX;
    var pointY;
    var theAngle;
    var theAngleHlp;
    var innerDeltaAngle;
    innerDeltaAngle = 2 * Math.PI / this.bc[compIndex].length;

    if (firstTouched != -1) {
        pointX = nodes[firstTouched].x;
        pointY = nodes[firstTouched].y;
        theAngle = Math.asin((startY - pointY) / Math.sqrt((pointX - startX) * (pointX - startX) + (pointY - startY) * (pointY - startY)));
        theAngleHlp = Math.acos((pointX - startX) / Math.sqrt((pointX - startX) * (pointX - startX) + (pointY - startY) * (pointY - startY)));

        if (theAngleHlp > Math.PI / 2) theAngle = Math.PI - theAngle;

        if (theAngle < 0) theAngle += 2 * Math.PI;

        var idPos = (theAngle / outerDeltaAngle | 0) % outerPositionsTaken.length;
        outerPositionsTaken[idPos] = theAngle / innerDeltaAngle | 0;
        outerPositionsOwners[idPos] = -2; // must not be even moved because that node is coming from another bicomp.

        if (outerPositionsTaken.length > 10) {
            outerPositionsTaken[(idPos + 1) % outerPositionsTaken.length] = theAngle / innerDeltaAngle | 0;
            outerPositionsTaken[(idPos + 2) % outerPositionsTaken.length] = 0 | theAngle / innerDeltaAngle;
            outerPositionsTaken[(idPos - 1 + outerPositionsTaken.length) % outerPositionsTaken.length] = 0 | theAngle / innerDeltaAngle;
            outerPositionsTaken[(idPos - 2 + outerPositionsTaken.length) % outerPositionsTaken.length] = 0 | theAngle / innerDeltaAngle;

            outerPositionsOwners[(idPos + 1) % outerPositionsOwners.length] = -2;
            outerPositionsOwners[(idPos + 2) % outerPositionsOwners.length] = -2;
            outerPositionsOwners[(idPos - 1 + outerPositionsOwners.length) % outerPositionsOwners.length] = -2;
            outerPositionsOwners[(idPos - 2 + outerPositionsOwners.length) % outerPositionsOwners.length] = -2;
        }
    }

    var addedNeighbours = {};

    for (var i = 0; i < this.bc[compIndex].length; i++) {
        iter = nodes[this.bc[compIndex][i]].links;

        var currentNeighbour;
        var noOfNeighbours = 0;

        for (var j = 0; j < iter.length; j++) {
            currentNeighbour = iter[j];

            if (!this.posSet[currentNeighbour]) {
                noOfNeighbours += this.NoOfChildren(currentNeighbour, addedNeighbours) + 1;
                addedNeighbours[currentNeighbour] = true;
            }
        }

        if (noOfNeighbours == 0) continue;

        pointX = nodes[this.bc[compIndex][i]].x;
        pointY = nodes[this.bc[compIndex][i]].y;

        theAngle = Math.asin((startY - pointY) / Math.sqrt((pointX - startX) * (pointX - startX) + (pointY - startY) * (pointY - startY)));
        theAngleHlp = Math.acos((pointX - startX) / Math.sqrt((pointX - startX) * (pointX - startX) + (pointY - startY) * (pointY - startY)));

        if (theAngleHlp > Math.PI / 2) theAngle = Math.PI - theAngle;

        if (theAngle < 0) theAngle += 2 * Math.PI;

        //			iter = edgesFrom[this.bc[compIndex][i]].iterator();

        var startPos = this.BestFreePositionsForAll(0 | theAngle / outerDeltaAngle - noOfNeighbours / 2.0, outerPositionsTaken, outerPositionsOwners, noOfNeighbours, 0 | theAngle / innerDeltaAngle, startX, startY, outerDeltaAngle, outerRadius, this.bc[compIndex].length);
        var startAngle = startPos * outerDeltaAngle;

        if (startAngle < 0) continue;

        //			iter = nodes[this.bc[compIndex][i]].iterator();

        for (var m = 0; m < iter.length; m++) {
            currentNeighbour = iter[m];

            if (!this.posSet[currentNeighbour]) {
                this.posSet[currentNeighbour] = true;

                var holeDepth = this.NoOfChildren(currentNeighbour, addedNeighbours);

                for (var j = 0; j < holeDepth / 2; j++) {
                    outerPositionsOwners[startPos % outerPositionsOwners.length] = -3;
                    // free but it must not be used (add. space for tree-like struct.)
                    outerPositionsTaken[startPos % outerPositionsOwners.length] = 0 | theAngle / innerDeltaAngle;
                    startPos++;
                    startAngle += outerDeltaAngle;

                    if (startAngle > 2 * Math.PI) startAngle -= 2 * Math.PI;
                }

                nodes[currentNeighbour].x = startX + Math.cos(startAngle) * outerRadius;
                nodes[currentNeighbour].y = startY - Math.sin(startAngle) * outerRadius;

                outerPositionsOwners[startPos % outerPositionsOwners.length] = currentNeighbour;
                outerPositionsTaken[startPos % outerPositionsOwners.length] = 0 | theAngle / innerDeltaAngle;
                startPos++;
                startAngle += outerDeltaAngle;

                if (startAngle > 2 * Math.PI) startAngle -= 2 * Math.PI;

                for (var j = 0; j < holeDepth / 2; j++) {
                    outerPositionsOwners[startPos % outerPositionsOwners.length] = -3;
                    outerPositionsTaken[startPos % outerPositionsOwners.length] = 0 | theAngle / innerDeltaAngle;
                    startPos++;
                    startAngle += outerDeltaAngle;

                    if (startAngle > 2 * Math.PI) startAngle -= 2 * Math.PI;
                }
            }
        }
    }

    // laying out the rest of nodes
    for (var i = 0; i < this.bc[compIndex].length; i++) {
        iter = nodes[this.bc[compIndex][i]].links;

        var currentNeighbour;

        for (var m = 0; m < iter.length; m++) {
            currentNeighbour = iter[m];

            if (!addedNeighbours[currentNeighbour]) {
                continue;
            }

            pointX = nodes[currentNeighbour].x;
            pointY = nodes[currentNeighbour].y;

            theAngle = Math.asin((startY - pointY) / Math.sqrt((pointX - startX) * (pointX - startX) + (pointY - startY) * (pointY - startY)));
            theAngleHlp = Math.acos((pointX - startX) / Math.sqrt((pointX - startX) * (pointX - startX) + (pointY - startY) * (pointY - startY)));

            if (theAngleHlp > Math.PI / 2) theAngle = Math.PI - theAngle;

            if (theAngle < 0) theAngle += 2 * Math.PI;

            for (var j = 0; j < this.posSet.length; j++) {
                this.depthPosSet[j] = this.posSet[j];
            }this.EachNodeHeight(currentNeighbour);

            this.DFSSetPos(currentNeighbour, theAngle, outerRadius - innerCircleRadius);
        }
    }
};
p.BestFreePositionsForAll = function (idealPosition, outerPositionsTaken, outerPositionsOwners, noOfPos, innerCirclePos, startX, startY, outerDeltaAngle, outerRadius, innerCSize) {
    var startPos = idealPosition;
    var nodes = this.nodes;

    if (idealPosition < 0) startPos += outerPositionsTaken.length;

    var i = 0;
    var alreadyFound = 0;
    var startOfAlFound = -1;
    var found = false;
    var goDown = false;
    var goUp = false;

    //An infinite loop occurs when there is no place in the outerPositionsTaken array where all the number
    //of positions that we need (noOfPos) can fit contiguously. In such a case, an infinite loop occurs.
    //Experiment: Create a count. If the count exceeds outPositionsTaken.length, then we have looked at every
    //possible startPos. Set startPos to the best startPos (meaning, the most contingious spaces) and set found
    //to true.

    //Experiment: int goUpCount = 0;
    var goUpCount = 0;
    //Experiment: int biggestGap = 0;
    var biggestGap = 0;
    //Experiment: int bestStartPos;
    var bestStartPos = 0;

    while (!found && !(goUp && goDown)) {
        //System.out.print(startPos + " ");
        for (i = startPos; i < startPos + noOfPos && outerPositionsTaken[i % outerPositionsTaken.length] == -1; i++) {}

        if (i < startPos + noOfPos) {
            if (outerPositionsTaken[i % outerPositionsTaken.length] > innerCirclePos && outerPositionsTaken[i % outerPositionsTaken.length] - innerCirclePos < 0.7 * innerCSize || innerCirclePos - outerPositionsTaken[i % outerPositionsTaken.length] > 0.7 * innerCSize) {
                alreadyFound = (i - startPos + outerPositionsTaken.length) % outerPositionsTaken.length;
                startOfAlFound = startPos;
                startPos -= noOfPos - alreadyFound;

                if (startPos < 0) startPos += outerPositionsTaken.length;

                goDown = true;
            } else {
                //Experiment: goUpCount++;
                goUpCount++;
                //Experiment: int thisGap = i - startPos;
                var thisGap = i - startPos;
                //Experiment: if( thisGap > biggestGap )
                if (thisGap > biggestGap) {
                    biggestGap = thisGap;
                    bestStartPos = startPos;
                }
                //Experiment: if( count > outerPositionsTaken.length )
                if (goUpCount > outerPositionsTaken.length * 3) {
                    startPos = bestStartPos;
                    found = true;
                }
                //Experiment: else
                else {
                        startPos = (i + 1) % outerPositionsTaken.length;
                        goUp = true;
                    }
            }
        } else found = true;
    }

    if (goUp && goDown) {
        i = startOfAlFound - 1;

        var j = i - 1;
        var count = 0;
        //System.out.print(j + " ");

        var index = (i % outerPositionsTaken.length + outerPositionsTaken.length) % outerPositionsTaken.length;
        if (outerPositionsTaken[index] > innerCirclePos && outerPositionsTaken[index] - innerCirclePos < 0.7 * innerCSize || innerCirclePos - outerPositionsTaken[index] > 0.7 * innerCSize) {
            j--;
            i--;
        }

        while (count < noOfPos - alreadyFound) {
            //System.out.print(j + " ");

            if (outerPositionsTaken[(j + outerPositionsTaken.length) % outerPositionsTaken.length] == -1) {
                // move all for one place left
                //	System.out.print(" moving ");
                if (outerPositionsOwners[(j + outerPositionsTaken.length) % outerPositionsTaken.length] == -2) {
                    //System.out.println("BUUUUUUUUUUUUUUUUUUU");

                    return -1;
                }

                for (var k = j; k < i - count; k++) {
                    if (outerPositionsOwners[(k + 1 + outerPositionsTaken.length) % outerPositionsTaken.length] > 0) {
                        nodes[outerPositionsOwners[(k + 1 + outerPositionsTaken.length) % outerPositionsTaken.length]].x = startX + Math.cos(outerDeltaAngle * k) * outerRadius;
                        nodes[outerPositionsOwners[(k + 1 + outerPositionsTaken.length) % outerPositionsTaken.length]].y = startY - Math.sin(outerDeltaAngle * k) * outerRadius;
                    }

                    outerPositionsOwners[(k + outerPositionsTaken.length) % outerPositionsTaken.length] = outerPositionsOwners[(k + 1 + outerPositionsTaken.length) % outerPositionsTaken.length];
                    outerPositionsTaken[(k + outerPositionsTaken.length) % outerPositionsTaken.length] = outerPositionsTaken[(k + 1 + outerPositionsTaken.length) % outerPositionsTaken.length];
                }

                count++;
            }

            j--;
        }

        startPos = (i - count + 1 + outerPositionsOwners.length) % outerPositionsOwners.length;
    }

    /*    for (i = startPos; i < startPos + noOfPos; i++)
     {
     outerPositionsTaken[i % outerPositionsTaken.length] = innerCirclePos;
     }*/
    return startPos;
};
p.EachNodeHeight = function (nodeID) {
    var nodes = this.nodes;
    var links = nodes[nodeID].links;
    var currentNeighbour;
    var noOfChildren = 0;
    var tmp = {};

    for (var m = 0; m < links.length; m++) {
        currentNeighbour = links[m];

        if (!this.depthPosSet[currentNeighbour] && !tmp[currentNeighbour]) {
            this.depthPosSet[currentNeighbour] = true;
            tmp[currentNeighbour] = true;
        }
    }

    for (var m = 0; m < links.length; m++) {
        currentNeighbour = links[m];

        if (tmp[currentNeighbour]) {
            noOfChildren += this.EachNodeHeight(currentNeighbour);
        }
    }

    //		if (this.nodeHeights[nodeID])
    //			this.nodeHeights.remove(Integer.valueOf(nodeID));

    this.nodeHeights[nodeID] = noOfChildren;

    return noOfChildren + 1;
};
p.DFSSetPos = function (nodeID, theAngle, theRadius) {
    var component = this.node2BiComp[nodeID];
    var nodes = this.nodes;
    if (component != undefined && !this.drawnBiComps[component]) {
        var comp = component;
        var centerX = nodes[nodeID].x;
        var centerY = nodes[nodeID].y;
        var radius = this.width * this.bc[comp].length / (2 * Math.PI);
        var deltaAngle = 2 * Math.PI / this.bc[comp].length;
        var currAngle = theAngle - Math.PI - deltaAngle;

        if (currAngle < 0) currAngle += 2 * Math.PI;

        centerX += Math.cos(theAngle) * radius * 4.0;
        centerY -= Math.sin(theAngle) * radius * 4.0;

        this.drawnBiComps[comp] = true;

        // sorting nodes on inner circle
        this.bc[comp] = this.sortInnerCircle(this.bc[comp]);

        /*if (this.bc[comp].length > 20)
         this.bc[comp] = ReduceInnerCircleCrossings(this.bc[comp]);*/
        var oneAtLeast = false;

        for (var i = 0; i < this.bc[comp].length; i++) {
            if (this.posSet[this.bc[comp][i]]) continue;

            nodes[this.bc[comp][i]].x = centerX + Math.cos(currAngle) * radius;
            nodes[this.bc[comp][i]].y = centerY - Math.sin(currAngle) * radius;

            this.posSet[this.bc[comp][i]] = true;

            oneAtLeast = true;
            currAngle -= deltaAngle;

            if (currAngle < 0) currAngle += 2 * Math.PI;
        }

        if (oneAtLeast) {

            nodes[nodeID].x += Math.cos(theAngle) * 3 * radius;
            nodes[nodeID].y -= Math.sin(theAngle) * 3 * radius;

            this.SetOuterCircle(comp, radius, centerX, centerY, nodeID);
        }
    } else {
        var iter = nodes[nodeID].links;
        var currentNeighbour;
        var startAngle = theAngle + Math.PI / 2;

        if (startAngle > 2 * Math.PI) startAngle -= 2 * Math.PI;

        var neighboursCount = 0;
        var min1 = 1000;
        var min2 = 1000;
        var max = -1;
        var min1Id = -1;
        var min2Id = -2;
        var maxId = -3;
        var tmp = {};

        for (var m = 0; m < iter.length; m++) {
            currentNeighbour = iter[m];

            if (!this.posSet[currentNeighbour] && !tmp[currentNeighbour]) {
                neighboursCount++;
                tmp[currentNeighbour] = true;

                if (this.nodeHeights[currentNeighbour] < min1) {
                    min2 = min1;
                    min2Id = min1Id;
                    min1 = this.nodeHeights[currentNeighbour];
                    min1Id = currentNeighbour;
                } else if (this.nodeHeights[currentNeighbour] < min2) {
                    min2 = this.nodeHeights[currentNeighbour];
                    min2Id = currentNeighbour;
                }

                if (this.nodeHeights[currentNeighbour] >= max) //&& currentNeighbour != min2Id && currentNeighbour != min1Id)
                    {
                        max = this.nodeHeights[currentNeighbour];
                        maxId = currentNeighbour;
                    }
            }
        }

        if (neighboursCount == 0) return;

        var deltaAngle = Math.PI / (neighboursCount + 1);

        startAngle -= deltaAngle;

        if (startAngle < 0) startAngle += 2 * Math.PI;

        var remStartAngle = startAngle;

        if (neighboursCount > 2) {
            deltaAngle = 2 * Math.PI / neighboursCount;
            startAngle = theAngle + Math.PI - 3 * deltaAngle / 2;

            if (startAngle > 2 * Math.PI) startAngle -= 2 * Math.PI;

            remStartAngle = theAngle + Math.PI - deltaAngle / 2;

            if (remStartAngle > 2 * Math.PI) remStartAngle -= 2 * Math.PI;
        }

        iter = nodes[nodeID].links;

        var r = 72;
        var rTry;

        if (this.width * neighboursCount / (2 * Math.PI) > r) r = this.width * neighboursCount / (2 * Math.PI);

        rTry = r;

        var hlp = 100.0;
        var startX = nodes[nodeID].x;
        var startY = nodes[nodeID].y;

        if (neighboursCount > 2) {
            nodes[nodeID].x = startX + Math.cos(theAngle) * r * ((min2 + 1) % 100);
            nodes[nodeID].y = startY - Math.sin(theAngle) * r * ((min2 + 1) % 100);

            startX = nodes[nodeID].x;
            startY = nodes[nodeID].y;

            //System.out.println("theAngle = " + theAngle + ", startAngle = " + startAngle + ", remStartAngle = " + remStartAngle + ", deltaAngle = " + deltaAngle);
            //System.out.println("min1Id = " + min1Id + ", min2Id" + min2Id + ", maxId" + maxId);
            setOffset(nodes[min1Id], startX + Math.cos(remStartAngle) * r, startY - Math.sin(remStartAngle) * r);
            nodes[min1Id].test = 'min1';
            setOffset(nodes[min2Id], startX + Math.cos(remStartAngle + deltaAngle) * r, startY - Math.sin(remStartAngle + deltaAngle) * r);
            nodes[min2Id].test = 'min2';

            if (this.nodeHeights[maxId] > 8) r = 256;

            setOffset(nodes[maxId], startX + Math.cos(remStartAngle - neighboursCount / 2 * deltaAngle) * r, startY - Math.sin(remStartAngle - neighboursCount / 2 * deltaAngle) * r);
            nodes[maxId].test = 'maxId';

            //System.out.println("Ugao za maxID "
            //                  + (remStartAngle - ((neighboursCount / 2) * deltaAngle)));
        }

        tmp = {};

        for (var m = 0; m < iter.length; m++) {
            currentNeighbour = iter[m];

            if (!this.posSet[currentNeighbour] && !tmp[currentNeighbour]) {
                if (this.nodeHeights[currentNeighbour] > 8) r = 256;else r = rTry;

                this.posSet[currentNeighbour] = true;
                tmp[currentNeighbour] = true;

                if (currentNeighbour != min1Id && currentNeighbour != min2Id && currentNeighbour != maxId || neighboursCount <= 2) {
                    setOffset(nodes[currentNeighbour], startX + Math.cos(startAngle) * r, startY - Math.sin(startAngle) * r);

                    startAngle -= deltaAngle;

                    if (startAngle < 0) startAngle += 2 * Math.PI;

                    if ((Math.abs(startAngle - (remStartAngle - neighboursCount / 2 * deltaAngle)) < 0.0001 || Math.abs(startAngle - (remStartAngle - neighboursCount / 2 * deltaAngle + 2 * Math.PI)) < 0.0001) && neighboursCount > 2) {
                        startAngle -= deltaAngle;

                        if (startAngle < 0) startAngle += 2 * Math.PI;
                    }
                }
            }
        }

        iter = nodes[nodeID].links;

        if (neighboursCount > 2) {
            this.DFSSetPos(min1Id, remStartAngle, theRadius * Math.sin(deltaAngle / 2));
            this.DFSSetPos(min2Id, remStartAngle + deltaAngle, theRadius * Math.sin(deltaAngle / 2));
            this.DFSSetPos(maxId, remStartAngle - neighboursCount / 2 * deltaAngle, theRadius * Math.sin(deltaAngle / 2));
            hlp = remStartAngle;
            remStartAngle -= deltaAngle;
        }

        for (var m = 0; m < iter.length; m++) {
            currentNeighbour = iter[m];

            if (tmp[currentNeighbour]) {
                if (currentNeighbour != min1Id && currentNeighbour != min2Id && currentNeighbour != maxId || neighboursCount <= 2) {
                    this.DFSSetPos(currentNeighbour, remStartAngle, theRadius * Math.sin(deltaAngle / 2));

                    remStartAngle -= deltaAngle;

                    if ((remStartAngle == hlp - neighboursCount / 2 * deltaAngle || remStartAngle == hlp - neighboursCount / 2 * deltaAngle + 2 * Math.PI) && neighboursCount > 2) startAngle -= deltaAngle;

                    if (remStartAngle < 0) remStartAngle += 2 * Math.PI;
                }
            }
        }
    }
};

function setOffset(node, x, y) {
    node.x = x;
    node.y = y;
}

exports.default = CircularLayout;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by chengang on 17-4-12.
 */

var ColaLayout = function () {
    function ColaLayout() {
        _classCallCheck(this, ColaLayout);
    }

    _createClass(ColaLayout, [{
        key: 'layout',
        value: function layout(nodes, edges) {
            if (!cola || !cola.Layout) throw 'please add cola lib first';
            this.cola = new cola.Layout().convergenceThreshold(1e-4).size([1000, 1000]);

            var data = this._init(nodes, edges);

            this.cola.nodes(data.nodes).links(data.edges).symmetricDiffLinkLengths(30).start(60, 0, 0, 0, false);

            return data.nodes.map(function (e) {
                return { x: e.x, y: e.y };
            });
        }
    }, {
        key: '_init',
        value: function _init(_nodes, _edges) {
            var nodes = [];
            var edges = [];
            var map = {};
            _nodes.forEach(function (e, i) {
                nodes.push({
                    width: 100,
                    height: 100
                });
                map[e.id] = i;
            });

            _edges.forEach(function (e, i) {
                if (map.hasOwnProperty(e.source) && map.hasOwnProperty(e.target)) edges.push({
                    source: map[e.source],
                    target: map[e.target]
                });
            });

            return {
                nodes: nodes,
                edges: edges
            };
        }
    }]);

    return ColaLayout;
}();

exports.default = ColaLayout;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by chengang on 17-4-12.
 */

var DargeLayout = function () {
    function DargeLayout() {
        _classCallCheck(this, DargeLayout);
    }

    _createClass(DargeLayout, [{
        key: 'layout',
        value: function layout(nodes, edges) {
            // debugger
            if (!dagre || !dagre.graphlib) throw 'please add dagre lib first';
            var g = new dagre.graphlib.Graph();

            g.setGraph({
                rankdir: 'TB',
                nodesep: 15,
                ranksep: 40,
                ranker: 'longest-path' //network-simplex  longest-path tight-tree
            });

            g.setDefaultEdgeLabel(function () {
                return {};
            });

            nodes.forEach(function (e) {
                g.setNode(e.id, { width: 20, height: 20 });
            });

            edges.forEach(function (e) {
                g.setEdge(e.source, e.target);
            });

            dagre.layout(g);

            var data = g.nodes().map(function (e) {
                var d = g.node(e);
                return { x: d.x, y: -1 * d.y };
            });

            return data;
        }
    }]);

    return DargeLayout;
}();

exports.default = DargeLayout;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by chengang on 17-4-12.
 */

var FlowLayout = function () {
    function FlowLayout() {
        _classCallCheck(this, FlowLayout);
    }

    _createClass(FlowLayout, [{
        key: "layout",
        value: function layout(nodes, edges) {
            if (!cola || !cola.Layout) throw 'please add cola lib first';
            this.cola = new cola.Layout().convergenceThreshold(1e-4).size([1000, 800]);

            var data = this._init(nodes, edges);

            this.cola.nodes(data.nodes).links(data.edges).flowLayout("y", 30).symmetricDiffLinkLengths(30).start(10, 20, 20, 0, false);

            return data.nodes.map(function (e) {
                return { x: e.x, y: -1 * e.y };
            });
        }
    }, {
        key: "_init",
        value: function _init(_nodes, _edges) {

            // var filterEdge = this._filterEdge(nodes,edges);

            var nodes = [];
            var edges = [];
            var map = {};
            _nodes.forEach(function (e, i) {
                nodes.push({
                    width: 100,
                    height: 100
                });
                map[e.id] = i;
            });

            _edges.forEach(function (e, i) {
                edges.push({
                    source: map[e.source],
                    target: map[e.target]
                });
            });

            return {
                nodes: nodes,
                edges: edges
            };
        }
    }, {
        key: "_filterEdge",
        value: function _filterEdge(nodes, edges) {
            var filterEdges = [];

            var flag = {};
            var first = nodes[0];

            breadFirst(first);

            return filterEdges;

            function breadFirst(node) {
                // debugger
                flag[node.id] = true;

                var nodes = [];

                var edges = graph.inEdgesIndex[node.id],
                    edge;
                if (edges && edges.length > 0) {
                    edges.forEach(function (e) {
                        edge = graph.edgesIndex[e];
                        if (!flag[edge.source]) {
                            filterEdges.push(edge);
                            nodes.push(graph.nodesIndex[edge.source]);
                        }
                    });
                }

                edges = graph.outEdgesIndex[node.id];
                if (edges && edges.length > 0) {
                    edges.forEach(function (e) {
                        edge = graph.edgesIndex[e];
                        if (!flag[edge.target]) {
                            filterEdges.push(edge);
                            nodes.push(graph.nodesIndex[edge.target]);
                        }
                    });
                }

                nodes.forEach(function (e) {
                    breadFirst(e);
                });
            }
        }
    }]);

    return FlowLayout;
}();

exports.default = FlowLayout;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by chengang on 17-4-12.
 */

var Grid = function () {
    function Grid() {
        _classCallCheck(this, Grid);
    }

    _createClass(Grid, [{
        key: "layout",
        value: function layout(_nodes, _edges) {

            var nodes = [];

            var width = 50;
            var height = 50;

            var num = (Math.sqrt(_nodes.length) | 0) + 1;

            var nx, ny;

            _nodes.forEach(function (e, id) {
                nx = id % num | 0;
                ny = id / num | 0;
                nodes.push({
                    x: nx * width,
                    y: ny * height
                });
            });

            return nodes;
        }
    }]);

    return Grid;
}();

exports.default = Grid;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _CircularLayout = __webpack_require__(14);

var _CircularLayout2 = _interopRequireDefault(_CircularLayout);

var _ColaLayout = __webpack_require__(15);

var _ColaLayout2 = _interopRequireDefault(_ColaLayout);

var _FlowLayout = __webpack_require__(17);

var _FlowLayout2 = _interopRequireDefault(_FlowLayout);

var _DargeLayout = __webpack_require__(16);

var _DargeLayout2 = _interopRequireDefault(_DargeLayout);

var _Grid = __webpack_require__(18);

var _Grid2 = _interopRequireDefault(_Grid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    circular: _CircularLayout2.default,
    cola: _ColaLayout2.default,
    flow: _FlowLayout2.default,
    darge: _DargeLayout2.default,
    grid: _Grid2.default
}; /**
    * Created by chengang on 17-2-20.
    */

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = TextSdf;
var INF = 1e20;

function TextSdf(fontSize, buffer, radius, cutoff, fontFamily) {
    this.fontSize = fontSize || 24;
    this.buffer = buffer === undefined ? 3 : buffer;
    this.cutoff = cutoff || 0.25;
    this.fontFamily = fontFamily || 'sans-serif';
    this.radius = radius || 8;
    var size = this.size = this.fontSize + this.buffer * 2;

    this.canvas = document.createElement('canvas');
    this.canvas.width = this.canvas.height = size;

    this.ctx = this.canvas.getContext('2d');
    this.ctx.font = fontSize + 'px ' + this.fontFamily;
    this.ctx.textBaseline = 'middle';
    this.ctx.fillStyle = 'black';

    // temporary arrays for the distance transform
    this.gridOuter = new Float64Array(size * size);
    this.gridInner = new Float64Array(size * size);
    this.f = new Float64Array(size);
    this.d = new Float64Array(size);
    this.z = new Float64Array(size + 1);
    this.v = new Int16Array(size);

    // hack around https://bugzilla.mozilla.org/show_bug.cgi?id=737852
    this.middle = Math.round(size / 2 * (navigator.userAgent.indexOf('Gecko/') >= 0 ? 1.2 : 1));
}

TextSdf.prototype.draw = function (char) {
    this.ctx.clearRect(0, 0, this.size, this.size);
    this.ctx.fillText(char, this.buffer, this.middle);

    var charSize = this.ctx.measureText(char).width + 1 | 0;
    var imgData = this.ctx.getImageData(0, 0, this.size, this.size);
    var data = imgData.data;

    for (var i = 0; i < this.size * this.size; i++) {
        var a = data[i * 4 + 3] / 255; // alpha value
        this.gridOuter[i] = a === 1 ? 0 : a === 0 ? INF : Math.pow(Math.max(0, 0.5 - a), 2);
        this.gridInner[i] = a === 1 ? INF : a === 0 ? 0 : Math.pow(Math.max(0, a - 0.5), 2);
    }

    edt(this.gridOuter, this.size, this.size, this.f, this.d, this.v, this.z);
    edt(this.gridInner, this.size, this.size, this.f, this.d, this.v, this.z);

    for (i = 0; i < this.size * this.size; i++) {
        var d = this.gridOuter[i] - this.gridInner[i];
        var c = Math.max(0, Math.min(255, Math.round(255 - 255 * (d / this.radius + this.cutoff))));
        data[4 * i + 0] = c;
        data[4 * i + 1] = c;
        data[4 * i + 2] = c;
        data[4 * i + 3] = 255;
    }

    return {
        data: imgData,
        charWidth: charSize + this.buffer * 2
    };
};

// 2D Euclidean distance transform by Felzenszwalb & Huttenlocher https://cs.brown.edu/~pff/dt/
function edt(data, width, height, f, d, v, z) {
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            f[y] = data[y * width + x];
        }
        edt1d(f, d, v, z, height);
        for (y = 0; y < height; y++) {
            data[y * width + x] = d[y];
        }
    }
    for (y = 0; y < height; y++) {
        for (x = 0; x < width; x++) {
            f[x] = data[y * width + x];
        }
        edt1d(f, d, v, z, width);
        for (x = 0; x < width; x++) {
            data[y * width + x] = Math.sqrt(d[x]);
        }
    }
}

// 1D squared distance transform
function edt1d(f, d, v, z, n) {
    v[0] = 0;
    z[0] = -INF;
    z[1] = +INF;

    for (var q = 1, k = 0; q < n; q++) {
        var s = (f[q] + q * q - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]);
        while (s <= z[k]) {
            k--;
            s = (f[q] + q * q - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]);
        }
        k++;
        v[k] = q;
        z[k] = s;
        z[k + 1] = +INF;
    }

    for (q = 0, k = 0; q < n; q++) {
        while (z[k + 1] < q) {
            k++;
        }d[q] = (q - v[k]) * (q - v[k]) + f[v[k]];
    }
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EventEmitter2 = __webpack_require__(1);

var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by chengang on 17-4-7.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var TextureIcon = function (_EventEmitter) {
    _inherits(TextureIcon, _EventEmitter);

    function TextureIcon(gl, option) {
        _classCallCheck(this, TextureIcon);

        var _this2 = _possibleConstructorReturn(this, (TextureIcon.__proto__ || Object.getPrototypeOf(TextureIcon)).call(this));

        _this2.gl = gl;
        _this2.texture = null;

        _this2.textureIconWidth = option.textureIconWidth;
        _this2.textureIconHeight = option.textureIconHeight;

        _this2.fontSize = 60;
        _this2.fontFamily = 'FontAwesome';

        _this2.border = 2;
        _this2.width = 70; //char width
        _this2.height = 80;
        _this2.startx = _this2.border + _this2.width / 2;
        _this2.starty = _this2.border + _this2.height / 2;

        _this2.canvas = null;
        _this2.iconinfo = null;
        _this2.icons = [];
        _this2.iconsToCreate = [];

        _this2.fontLoaded = false;

        _this2._init();

        _this2.updateGPUTexture(true);

        var _this = _this2;
        if (document.fonts) {
            var fontsReady = document.fonts.ready;
            if (typeof fontsReady == "function") {
                fontsReady = document.fonts.ready();
            }
            fontsReady.then(function () {
                _this.fontLoaded = true;
                _this.createIcons();
                _this.emit('load');
            });
        }
        return _this2;
    }

    _createClass(TextureIcon, [{
        key: '_init',
        value: function _init() {
            this.canvas = document.createElement('canvas');

            this.canvas.width = this.textureIconWidth;
            this.canvas.height = this.textureIconHeight;

            var ctx = this.canvas.getContext("2d");

            ctx.fillStyle = "#000000";
            ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            ctx.font = this.fontSize + 'px ' + this.fontFamily;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#ff0000";

            this.iconinfo = {
                fontSize: this.fontSize,
                img: this.canvas,
                width: this.width,
                height: this.height,
                infos: {}
            };

            this.ctx = ctx;
        }
    }, {
        key: 'createIcons',
        value: function createIcons(icons) {

            icons = icons || this.iconsToCreate;

            if (icons.length == 0) return;

            if (!this.fontLoaded) {
                icons.forEach(function (e) {
                    this.iconsToCreate.push(e);
                }.bind(this));
                return;
            }

            for (var i = 0; i < icons.length; i++) {
                this.createIcon(icons[i]);
            }
            this.computeAlpha();

            // document.body.appendChild(this.canvas);
            this.updateGPUTexture();
        }
    }, {
        key: 'createIcon',
        value: function createIcon(icon) {

            var ctx = this.ctx,
                c = this.canvas;

            if (this.iconinfo && this.iconinfo.infos[icon]) return;

            if (this.startx + this.width + this.border > c.width) {
                this.startx = this.border;
                this.starty += this.height + this.border;

                if (this.starty + this.height > c.height) {
                    console.warn('icon texture no space');
                    return;
                }
            }

            ctx.fillText(icon, this.startx, this.starty);
            this.iconinfo.infos[icon] = {
                uvs: [(this.startx - this.width / 2) / c.width, (this.starty - this.height / 2) / c.height, (this.startx + this.width / 2) / c.width, (this.starty + this.height / 2) / c.height],
                width: this.width / this.width
            };

            this.icons.push(icon);

            this.startx += this.width + this.border;
        }
    }, {
        key: 'computeAlpha',
        value: function computeAlpha() {

            var ctx = this.ctx;

            var imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
            for (var i = 0; i < imgData.data.length; i += 4) {
                imgData.data[i + 3] = imgData.data[i];
            }
            ctx.putImageData(imgData, 0, 0);
        }
    }, {
        key: 'updateGPUTexture',
        value: function updateGPUTexture(empty) {
            var gl = this.gl;

            this.createTexture(empty);

            gl.activeTexture(gl.TEXTURE11);
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
        }
    }, {
        key: 'addIcons',
        value: function addIcons(icons) {
            var char;
            var map = {};
            for (var i = 0, len = icons.length; i < len; i++) {
                char = icons[i];
                if (!this.iconinfo.infos[char] && !map[char]) {
                    if (this.fontLoaded) {
                        this.createIcon(char);
                    } else {
                        this.iconsToCreate.push(char);
                    }
                    map[char] = true;
                }
            }
            this.updateGPUTexture();
        }
    }, {
        key: 'createTexture',
        value: function createTexture(empty) {

            var gl = this.gl;

            if (!this.texture) {
                this.texture = gl.createTexture();
            }
            gl.activeTexture(gl.TEXTURE11);
            gl.bindTexture(gl.TEXTURE_2D, this.texture);

            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

            if (empty) gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 2, 2, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);else gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.iconinfo.img);
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.startx = this.border + this.width / 2;
            this.starty = this.border + this.height / 2;
            this.icons = [];
            this.iconsToCreate = [];
            this.iconinfo.infos = {};

            var ctx = this.ctx;
            ctx.save();
            ctx.fillStyle = "#000000";
            ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            ctx.restore();
        }
    }]);

    return TextureIcon;
}(_EventEmitter3.default);

exports.default = TextureIcon;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EventEmitter2 = __webpack_require__(1);

var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by chengang on 17-4-5.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var TextureLoader = function (_EventEmitter) {
    _inherits(TextureLoader, _EventEmitter);

    function TextureLoader(gl) {
        _classCallCheck(this, TextureLoader);

        var _this = _possibleConstructorReturn(this, (TextureLoader.__proto__ || Object.getPrototypeOf(TextureLoader)).call(this));

        _this.gl = gl;
        _this.cache = {};
        _this.textures = [];
        _this.defaultTexture = _this.createTexture();
        _this.texturesIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        _this.updateGPUTexture();
        return _this;
    }

    _createClass(TextureLoader, [{
        key: 'loadImgs',
        value: function loadImgs(urls) {
            if (Array.isArray(urls)) {
                urls.forEach(function (url) {
                    this._load(url);
                }.bind(this));
            } else {
                this._load(urls);
            }
        }
    }, {
        key: '_load',
        value: function _load(url) {
            if (!this.cache[url]) {
                var image = document.createElement('IMG');
                // image.setAttribute('crossOrigin', imgCrossOrigin);
                image.src = url;
                image.onload = function () {
                    var tx = this.createTexture(image);
                    this.cache[url] = this.textures.length; //index
                    this.textures.push(tx);
                    this.updateGPUTexture();
                    this.emit('load', [url]);
                }.bind(this);
            }
        }
    }, {
        key: 'updateGPUTexture',
        value: function updateGPUTexture() {
            var gl = this.gl;
            this.texturesIndex.forEach(function (e) {
                gl.activeTexture(gl['TEXTURE' + e]);
                if (e > this.textures.length - 1) {
                    gl.bindTexture(gl.TEXTURE_2D, this.defaultTexture);
                } else {
                    gl.bindTexture(gl.TEXTURE_2D, this.textures[e]);
                }
            }.bind(this));
        }
    }, {
        key: 'createTexture',
        value: function createTexture(img) {
            var gl = this.gl;
            var texture = gl.createTexture();
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, texture);

            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

            if (img) gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);else gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 2, 2, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

            return texture;
        }
    }]);

    return TextureLoader;
}(_EventEmitter3.default);

exports.default = TextureLoader;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EventEmitter2 = __webpack_require__(1);

var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);

var _TextSdf = __webpack_require__(20);

var _TextSdf2 = _interopRequireDefault(_TextSdf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextureText = function (_EventEmitter) {
    _inherits(TextureText, _EventEmitter);

    function TextureText(gl) {
        _classCallCheck(this, TextureText);

        var _this = _possibleConstructorReturn(this, (TextureText.__proto__ || Object.getPrototypeOf(TextureText)).call(this));

        _this.gl = gl;

        _this.texture = null;

        _this.border = 2;

        _this.fontSize = 48;
        _this.fontFamily = 'Arial';

        _this.canvas = null;

        _this.textinfo = null;

        _this.texts = null;

        _this.sdf = new _TextSdf2.default(_this.fontSize, _this.fontSize / 8, _this.fontSize / 3, null, _this.fontFamily);

        // test();
        return _this;
    }

    _createClass(TextureText, [{
        key: 'createCanvasImg',
        value: function createCanvasImg(texts) {

            if (!this.canvas) this.canvas = document.createElement('canvas');

            var c = this.canvas;

            var width = this.sdf.size;
            var height = width;
            var num = Math.ceil(Math.sqrt(texts.length));

            c.width = num * width + 2 * this.border;
            c.height = num * height + 2 * this.border;

            var ctx = c.getContext("2d");

            ctx.fillStyle = "#000000";
            ctx.fillRect(0, 0, c.width, c.height);

            ctx.font = 'bold ' + this.fontSize + 'px ' + this.fontFamily;
            ctx.textAlign = "left";
            ctx.textBaseline = "top";
            ctx.fillStyle = "#ff0000";

            var startx = this.border;
            var starty = this.border;
            var infos = {},
                px,
                py,
                charWidth,
                data;

            this.texts = [];

            for (var i = 0; i < texts.length; i++) {

                if (this.textinfo && this.textinfo.infos[texts[i]]) continue;

                data = this.sdf.draw(texts[i]);
                charWidth = data.charWidth;

                // charWidth = ctx.measureText(texts[i]).width;

                if (startx + charWidth > c.width) {
                    startx = this.border;
                    starty += height;
                }

                ctx.putImageData(data.data, startx, starty, 0, 0, charWidth, data.data.height);

                // ctx.fillText(texts[i], startx, starty);


                infos[texts[i]] = {
                    uvs: [startx / c.width, starty / c.height, (startx + charWidth) / c.width, (starty + height) / c.height],
                    width: charWidth / width
                };

                this.texts.push(texts[i]);

                startx += charWidth;
            }
            // this.computeAlpha(ctx);
            this.textinfo = {
                fontSize: this.fontSize,
                img: c,
                width: c.width,
                height: c.height,
                infos: infos
            };
            //
            // document.body.appendChild(c);
            // c.style.position = 'absolute';
            // c.style.top = '100px';

            this.updateGPUTexture();
        }
    }, {
        key: 'computeAlpha',
        value: function computeAlpha(ctx) {

            var imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
            for (var i = 0; i < imgData.data.length; i += 4) {
                imgData.data[i + 3] = imgData.data[i];
            }

            ctx.putImageData(imgData, 0, 0);
        }
    }, {
        key: 'updateGPUTexture',
        value: function updateGPUTexture() {
            var gl = this.gl;

            this.createTexture();

            gl.activeTexture(gl.TEXTURE10);
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
        }
    }, {
        key: 'addTexts',
        value: function addTexts(strs) {
            var len = strs.length;
            var char,
                num = 0;

            var texts = this.texts;
            var map = {};
            for (var i = 0; i < len; i++) {
                char = strs.charAt(i);
                if (!this.textinfo.infos[char] && !map[char]) {
                    num++;
                    map[char] = true;
                    texts.push(char);
                }
            }

            if (num > 0) {
                this.clear();
                this.createCanvasImg(texts);
            }
        }
    }, {
        key: 'createTexture',
        value: function createTexture() {

            var gl = this.gl;

            if (!this.texture) {
                this.texture = gl.createTexture();
            }
            gl.activeTexture(gl.TEXTURE10);
            gl.bindTexture(gl.TEXTURE_2D, this.texture);

            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.textinfo.img);
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.textinfo = null;
            this.texts = null;
        }
    }]);

    return TextureText;
}(_EventEmitter3.default);

exports.default = TextureText;


function test() {
    var chars = '泽材abcdefghkilmnopqrstuvwxyz灭逐莫笔亡鲜';
    var fontSize = 24;

    var sdf = new _TextSdf2.default(fontSize, fontSize / 8, fontSize / 3, null, 'Arial');

    var canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    canvas.style.position = 'absolute';
    canvas.style.top = '200px';

    var ctx = canvas.getContext('2d');

    var now = performance.now();
    var startx = 0,
        stary = 0,
        data;
    for (var i = 0; i < chars.length; i++) {
        data = sdf.draw(chars[i]);
        if (startx + data.charWidth + 0 >= canvas.width) {
            stary += sdf.size;
            startx = 0;
        }

        ctx.putImageData(data.data, startx, stary, 0, 0, data.charWidth, data.data.height);

        startx += data.charWidth + 0;
    }
    console.log(Math.round(performance.now() - now) + 'ms.');

    document.body.appendChild(canvas);
}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

var _vert = __webpack_require__(32);

var _vert2 = _interopRequireDefault(_vert);

var _frag = __webpack_require__(31);

var _frag2 = _interopRequireDefault(_frag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function addData(arr, attributes, attrData) {
    for (var i = 0; i < attributes; i++) {
        arr.push(attrData[i]);
    }
}

function scaleTrangles(points, scale) {
    scale = scale || 1.4;
    var p1_x = points[0],
        p1_y = points[1],
        p2_x = points[2],
        p2_y = points[3],
        p3_x = points[4],
        p3_y = points[5];

    var avg_x = (p1_x + p2_x + p3_x) / 3,
        avg_y = (p1_y + p2_y + p3_y) / 3;

    var p1_x_new = avg_x + (p1_x - avg_x) * scale,
        p1_y_new = avg_y + (p1_y - avg_y) * scale,
        p2_x_new = avg_x + (p2_x - avg_x) * scale,
        p2_y_new = avg_y + (p2_y - avg_y) * scale,
        p3_x_new = avg_x + (p3_x - avg_x) * scale,
        p3_y_new = avg_y + (p3_y - avg_y) * scale;

    return [p1_x_new, p1_y_new, p2_x_new, p2_y_new, p3_x_new, p3_y_new];
}

var Curve = function () {
    function Curve() {
        _classCallCheck(this, Curve);

        // this.POINTS = 9;
        this.ATTRIBUTES = 11;

        this.shaderVert = _vert2.default;
        this.shaderFrag = _frag2.default;

        this.arrayBuffer = null;
        this.dataBuffer = null;
        this.strip = 6 * 4 + 4 + 4;
    }

    _createClass(Curve, [{
        key: 'getRenderData',
        value: function getRenderData(_ref) {
            var data = _ref.data,
                source = _ref.source,
                target = _ref.target;

            var edge = data;
            var dx = target.x - source.x;
            var dy = target.y - source.y;

            var dis = _util2.default.getDistance(source.x, source.y, target.x, target.y);
            var tSize = Math.max(_util2.default.getNodeSizeX(target), _util2.default.getNodeSizeY(target));

            var aSize = 3,
                vX,
                vY;

            var tX = target.x - tSize / dis * dx;
            var tY = target.y - tSize / dis * dy;

            var ctrlP = _util2.default.getControlPos(source.x, source.y, tX, tY, edge.curveCount, edge.curveOrder);

            data = [];

            //arrow
            var dx1 = tX - ctrlP[0],
                dy1 = tY - ctrlP[1];
            var dis1 = _util2.default.getDistance(tX, tY, ctrlP[0], ctrlP[1]);

            vX = aSize / dis1 * dx1;
            vY = aSize / dis1 * dy1;

            var arrowX = tX - vX,
                arrowY = tY - vY;

            //curve
            var color = _util2.default.parseColor(edge.color || source.color || '#b3d2ff');

            var scalePos = scaleTrangles([source.x, source.y, ctrlP[0], ctrlP[1], tX - vX, tY - vY]);
            var scaleUV = scaleTrangles([1, 1, 0.5, 0, 0, 0]);

            var dashed = edge.dashed ? 1 : 0;
            // debugger
            //curve
            addData(data, this.ATTRIBUTES, [scalePos[0], scalePos[1], scaleUV[0], scaleUV[1], dis, 0, color.r, color.g, color.b, color.a, dashed]);
            addData(data, this.ATTRIBUTES, [scalePos[2], scalePos[3], scaleUV[2], scaleUV[3], dis, 0, color.r, color.g, color.b, color.a, dashed]);
            addData(data, this.ATTRIBUTES, [scalePos[4], scalePos[5], scaleUV[4], scaleUV[5], dis, 0, color.r, color.g, color.b, color.a, dashed]);

            //arrow
            addData(data, this.ATTRIBUTES, [arrowX + vX, arrowY + vY, 0, 0, 0, 1, color.r, color.g, color.b, color.a, dashed]);
            addData(data, this.ATTRIBUTES, [arrowX + vY * 0.6, arrowY - vX * 0.6, 0, 0, 0, 1, color.r, color.g, color.b, color.a, dashed]);
            addData(data, this.ATTRIBUTES, [arrowX - vY * 0.6, arrowY + vX * 0.6, 0, 0, 0, 1, color.r, color.g, color.b, color.a, dashed]);

            return data;
        }
    }, {
        key: 'render',
        value: function render(_ref2) {
            var gl = _ref2.gl,
                program = _ref2.program,
                data = _ref2.data,
                matrix = _ref2.matrix,
                camera = _ref2.camera;

            if (!this.dataBuffer) this.dataBuffer = gl.createBuffer();

            // debugger
            var positionLocation = gl.getAttribLocation(program, "a_position");
            var uvLocation = gl.getAttribLocation(program, "a_uv");
            var disLocation = gl.getAttribLocation(program, "a_dis");
            var flagLocation = gl.getAttribLocation(program, "a_flag");
            var colorLocation = gl.getAttribLocation(program, "a_color");
            var dashedLocation = gl.getAttribLocation(program, "a_dashed");

            var matrixLocation = gl.getUniformLocation(program, "u_matrix");
            var cameraScaleLocation = gl.getUniformLocation(program, "u_camera_scale");

            var len = data.length / this.ATTRIBUTES | 0;

            if (!this.arrayBuffer || len * this.strip != this.arrayBuffer.byteLength) {
                this.arrayBuffer = new ArrayBuffer(len * this.strip);
            }

            var float32View = new Float32Array(this.arrayBuffer);
            var Uint8View = new Uint8Array(this.arrayBuffer);

            var offset32 = this.strip / 4,
                offset8 = this.strip;
            for (var i = 0; i < len; i++) {
                float32View[i * offset32 + 0] = data[i * this.ATTRIBUTES + 0];
                float32View[i * offset32 + 1] = data[i * this.ATTRIBUTES + 1];
                float32View[i * offset32 + 2] = data[i * this.ATTRIBUTES + 2];
                float32View[i * offset32 + 3] = data[i * this.ATTRIBUTES + 3];
                float32View[i * offset32 + 4] = data[i * this.ATTRIBUTES + 4];
                float32View[i * offset32 + 5] = data[i * this.ATTRIBUTES + 5];

                Uint8View[i * offset8 + 25] = data[i * this.ATTRIBUTES + 6];
                Uint8View[i * offset8 + 26] = data[i * this.ATTRIBUTES + 7];
                Uint8View[i * offset8 + 27] = data[i * this.ATTRIBUTES + 8];
                Uint8View[i * offset8 + 28] = data[i * this.ATTRIBUTES + 9];

                float32View[i * offset32 + 7] = data[i * this.ATTRIBUTES + 10];
            }

            gl.bindBuffer(gl.ARRAY_BUFFER, this.dataBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, this.arrayBuffer, gl.STATIC_DRAW);

            gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, this.strip, 0);
            gl.vertexAttribPointer(uvLocation, 2, gl.FLOAT, false, this.strip, 2 * 4);
            gl.vertexAttribPointer(disLocation, 1, gl.FLOAT, false, this.strip, 4 * 4);
            gl.vertexAttribPointer(flagLocation, 1, gl.FLOAT, false, this.strip, 5 * 4);
            gl.vertexAttribPointer(colorLocation, 4, gl.UNSIGNED_BYTE, false, this.strip, 6 * 4);
            gl.vertexAttribPointer(dashedLocation, 1, gl.FLOAT, false, this.strip, 7 * 4);

            gl.bindBuffer(gl.ARRAY_BUFFER, null);
            gl.enableVertexAttribArray(positionLocation);
            gl.enableVertexAttribArray(uvLocation);
            gl.enableVertexAttribArray(disLocation);
            gl.enableVertexAttribArray(flagLocation);
            gl.enableVertexAttribArray(colorLocation);
            gl.enableVertexAttribArray(dashedLocation);

            gl.uniformMatrix3fv(matrixLocation, false, new Float32Array(matrix));
            gl.uniform1f(cameraScaleLocation, camera.scale);

            gl.drawArrays(gl.TRIANGLES, 0, len);
        }
    }]);

    return Curve;
}();

exports.default = Curve;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by chengang on 17-3-31.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

var _defaultVert = __webpack_require__(34);

var _defaultVert2 = _interopRequireDefault(_defaultVert);

var _defaultFrag = __webpack_require__(33);

var _defaultFrag2 = _interopRequireDefault(_defaultFrag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function addData(arr, attributes, attrData) {
    for (var i = 0; i < attributes; i++) {
        arr.push(attrData[i]);
    }
}

var Edge = function () {
    function Edge() {
        _classCallCheck(this, Edge);

        this.POINTS = 9;
        this.ATTRIBUTES = 9;

        this.shaderVert = _defaultVert2.default;
        this.shaderFrag = _defaultFrag2.default;

        this.arrayBuffer = null;
        this.dataBuffer = null;
        this.strip = 5 * 4 + 1 * 4;
    }

    _createClass(Edge, [{
        key: 'getRenderData',
        value: function getRenderData(_ref) {
            var data = _ref.data,
                source = _ref.source,
                target = _ref.target;

            var edge = data;
            var dx = target.x - source.x;
            var dy = target.y - source.y;

            data = [];
            var size = 0.8,
                arrowSize = 6;
            var crossVector = _util2.default.normalize([-dy, dx]);

            //arrow
            var targetSize = Math.max(_util2.default.getNodeSizeX(target), _util2.default.getNodeSizeY(target));
            var dis = _util2.default.getDistance(source.x, source.y, target.x, target.y);
            var arrowX = target.x - (targetSize + arrowSize) / dis * dx;
            var arrowY = target.y - (targetSize + arrowSize) / dis * dy;

            var color = _util2.default.parseColor(edge.color || source.color || '#b3d2ff');

            addData(data, this.ATTRIBUTES, [source.x, source.y, crossVector[0], crossVector[1], size, color.r, color.g, color.b, color.a]);
            addData(data, this.ATTRIBUTES, [arrowX, arrowY, crossVector[0], crossVector[1], size, color.r, color.g, color.b, color.a]);
            addData(data, this.ATTRIBUTES, [source.x, source.y, -crossVector[0], -crossVector[1], size, color.r, color.g, color.b, color.a]);
            addData(data, this.ATTRIBUTES, [arrowX, arrowY, crossVector[0], crossVector[1], size, color.r, color.g, color.b, color.a]);
            addData(data, this.ATTRIBUTES, [source.x, source.y, -crossVector[0], -crossVector[1], size, color.r, color.g, color.b, color.a]);
            addData(data, this.ATTRIBUTES, [arrowX, arrowY, -crossVector[0], -crossVector[1], size, color.r, color.g, color.b, color.a]);

            //arrow
            addData(data, this.ATTRIBUTES, [arrowX, arrowY, crossVector[0], crossVector[1], arrowSize / 2, color.r, color.g, color.b, color.a]);
            addData(data, this.ATTRIBUTES, [arrowX, arrowY, -crossVector[0], -crossVector[1], arrowSize / 2, color.r, color.g, color.b, color.a]);
            addData(data, this.ATTRIBUTES, [arrowX, arrowY, arrowSize / dis * dx, arrowSize / dis * dy, 1, color.r, color.g, color.b, color.a]);

            return data;
        }
    }, {
        key: 'render',
        value: function render(_ref2) {
            var gl = _ref2.gl,
                program = _ref2.program,
                data = _ref2.data,
                matrix = _ref2.matrix,
                camera = _ref2.camera;

            if (!this.dataBuffer) this.dataBuffer = gl.createBuffer();

            var positionLocation = gl.getAttribLocation(program, "a_position");
            var normalLocation = gl.getAttribLocation(program, "a_normal");
            var colorLocation = gl.getAttribLocation(program, "a_color");
            var sizeLocation = gl.getAttribLocation(program, "a_size");

            var matrixLocation = gl.getUniformLocation(program, "u_matrix");

            var len = data.length / this.ATTRIBUTES | 0;

            if (!this.arrayBuffer || len * this.strip != this.arrayBuffer.byteLength) {
                this.arrayBuffer = new ArrayBuffer(len * this.strip);
            }

            var float32View = new Float32Array(this.arrayBuffer);
            var Uint8View = new Uint8Array(this.arrayBuffer);

            var offset32 = this.strip / 4,
                offset8 = this.strip;
            for (var i = 0; i < len; i++) {
                float32View[i * offset32 + 0] = data[i * this.ATTRIBUTES + 0];
                float32View[i * offset32 + 1] = data[i * this.ATTRIBUTES + 1];
                float32View[i * offset32 + 2] = data[i * this.ATTRIBUTES + 2];
                float32View[i * offset32 + 3] = data[i * this.ATTRIBUTES + 3];
                float32View[i * offset32 + 4] = data[i * this.ATTRIBUTES + 4];

                Uint8View[i * offset8 + 20] = data[i * this.ATTRIBUTES + 5];
                Uint8View[i * offset8 + 21] = data[i * this.ATTRIBUTES + 6];
                Uint8View[i * offset8 + 22] = data[i * this.ATTRIBUTES + 7];
                Uint8View[i * offset8 + 23] = data[i * this.ATTRIBUTES + 8];
            }

            gl.bindBuffer(gl.ARRAY_BUFFER, this.dataBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, this.arrayBuffer, gl.STATIC_DRAW);

            gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, this.strip, 0);
            gl.vertexAttribPointer(normalLocation, 2, gl.FLOAT, false, this.strip, 2 * 4);
            gl.vertexAttribPointer(sizeLocation, 1, gl.FLOAT, false, this.strip, 4 * 4);
            gl.vertexAttribPointer(colorLocation, 4, gl.UNSIGNED_BYTE, false, this.strip, 5 * 4);

            gl.bindBuffer(gl.ARRAY_BUFFER, null);
            gl.enableVertexAttribArray(positionLocation);
            gl.enableVertexAttribArray(normalLocation);
            gl.enableVertexAttribArray(sizeLocation);
            gl.enableVertexAttribArray(colorLocation);

            gl.uniformMatrix3fv(matrixLocation, false, new Float32Array(matrix));

            gl.drawArrays(gl.TRIANGLES, 0, len);
        }
    }]);

    return Edge;
}();

exports.default = Edge;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by chengang on 17-4-7.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

var _Matrix = __webpack_require__(3);

var _Matrix2 = _interopRequireDefault(_Matrix);

var _nodeLabelVert = __webpack_require__(6);

var _nodeLabelVert2 = _interopRequireDefault(_nodeLabelVert);

var _labelFrag = __webpack_require__(4);

var _labelFrag2 = _interopRequireDefault(_labelFrag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function addData(arr, attributes, attrData, centerX, centerY, angle) {
    var rotate = _Matrix2.default.transformPoint([attrData[0], attrData[1]], _Matrix2.default.matrixFromRotation(angle));
    attrData[0] = rotate[0] + centerX;
    attrData[1] = rotate[1] + centerY;

    for (var i = 0; i < attributes; i++) {
        arr.push(attrData[i]);
    }
}

var NodeLabel = function () {
    function NodeLabel() {
        _classCallCheck(this, NodeLabel);

        // this.POINTS = 1;
        this.ATTRIBUTES = 5;

        this.shaderVert = _nodeLabelVert2.default;
        this.shaderFrag = _labelFrag2.default;

        this.arrayBuffer = null;
        this.dataBuffer = null;
        this.strip = 4 * 5;
    }

    _createClass(NodeLabel, [{
        key: 'getRenderData',
        value: function getRenderData(_ref) {
            var data = _ref.data,
                source = _ref.source,
                target = _ref.target,
                textureText = _ref.textureText;

            var edge = data;
            if (!edge.label) return [];

            // debugger
            var str = edge.label.split('');

            data = [];

            var size = edge.fontSize || Math.max(_util2.default.getNodeSizeX(source), _util2.default.getNodeSizeY(source)) / 3;
            var infos = textureText.textinfo.infos,
                charWidth = size,
                charHeight = size,
                char,
                uv,
                width;

            var totalWidht = 0;
            for (var i = 0; i < str.length; i++) {
                char = str[i];
                if (!infos[char]) {
                    console.log(1);
                    continue;
                }
                totalWidht += infos[char].width * charWidth;
            }

            var dx = target.x - source.x;
            var dy = target.y - source.y;

            var angle = _util2.default.getAngle(1, 0, dx, dy);

            angle = dy < 0 ? Math.PI - angle : angle;
            angle = angle > Math.PI / 2 ? angle + Math.PI : angle;

            var centerX = (source.x + target.x) / 2,
                centerY = (source.y + target.y) / 2;
            var startx = totalWidht / 2 * -1;
            var starty = charHeight / 2;
            var x1, y1, x2, y2;

            for (var i = 0; i < str.length; i++) {
                char = str[i];
                if (!infos[char]) {
                    console.log('no text texture info');
                    continue;
                }

                width = infos[char].width * charWidth;
                uv = infos[char].uvs;
                x1 = uv[0], y1 = uv[1], x2 = uv[2], y2 = uv[3];

                addData(data, this.ATTRIBUTES, [startx, starty, x1, y1, width], centerX, centerY, angle);
                addData(data, this.ATTRIBUTES, [startx, starty - charHeight, x1, y2, width], centerX, centerY, angle);
                addData(data, this.ATTRIBUTES, [startx + width, starty, x2, y1, width], centerX, centerY, angle);
                addData(data, this.ATTRIBUTES, [startx, starty - charHeight, x1, y2, width], centerX, centerY, angle);
                addData(data, this.ATTRIBUTES, [startx + width, starty, x2, y1, width], centerX, centerY, angle);
                addData(data, this.ATTRIBUTES, [startx + width, starty - charHeight, x2, y2, width], centerX, centerY, angle);

                startx += width;
            }

            return data;
        }
    }, {
        key: 'render',
        value: function render(_ref2) {
            var gl = _ref2.gl,
                program = _ref2.program,
                data = _ref2.data,
                matrix = _ref2.matrix,
                camera = _ref2.camera,
                textureLoader = _ref2.textureLoader;

            if (!this.dataBuffer) this.dataBuffer = gl.createBuffer();

            var positionLocation = gl.getAttribLocation(program, "a_position");
            var uvLocation = gl.getAttribLocation(program, "a_uv");
            var sizeLocation = gl.getAttribLocation(program, "a_size");

            var matrixLocation = gl.getUniformLocation(program, "u_matrix");
            var imageLocation = gl.getUniformLocation(program, "u_image");
            var cameaScaleLocation = gl.getUniformLocation(program, "u_camera_scale");

            var len = data.length / this.ATTRIBUTES | 0;

            if (!this.arrayBuffer || len * this.strip != this.arrayBuffer.byteLength) {
                this.arrayBuffer = new ArrayBuffer(len * this.strip);
            }

            var float32View = new Float32Array(this.arrayBuffer);
            // var Uint8View = new Uint8Array(this.arrayBuffer);

            var offset32 = this.strip / 4,
                offset8 = this.strip;
            for (var i = 0; i < len; i++) {
                float32View[i * offset32 + 0] = data[i * this.ATTRIBUTES + 0];
                float32View[i * offset32 + 1] = data[i * this.ATTRIBUTES + 1];
                float32View[i * offset32 + 2] = data[i * this.ATTRIBUTES + 2];
                float32View[i * offset32 + 3] = data[i * this.ATTRIBUTES + 3];
                float32View[i * offset32 + 4] = data[i * this.ATTRIBUTES + 4];
            }

            gl.bindBuffer(gl.ARRAY_BUFFER, this.dataBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, this.arrayBuffer, gl.STATIC_DRAW);

            gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, this.strip, 0);
            gl.vertexAttribPointer(uvLocation, 2, gl.FLOAT, false, this.strip, 2 * 4);
            gl.vertexAttribPointer(sizeLocation, 1, gl.FLOAT, false, this.strip, 4 * 4);

            gl.bindBuffer(gl.ARRAY_BUFFER, null);
            gl.enableVertexAttribArray(positionLocation);
            gl.enableVertexAttribArray(uvLocation);

            gl.uniformMatrix3fv(matrixLocation, false, new Float32Array(matrix));
            gl.uniform1i(imageLocation, 10);
            gl.uniform1f(cameaScaleLocation, camera.scale);

            gl.drawArrays(gl.TRIANGLES, 0, len);
        }
    }]);

    return NodeLabel;
}();

exports.default = NodeLabel;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by chengang on 17-4-7.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _nodeLabelVert = __webpack_require__(6);

var _nodeLabelVert2 = _interopRequireDefault(_nodeLabelVert);

var _labelFrag = __webpack_require__(4);

var _labelFrag2 = _interopRequireDefault(_labelFrag);

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function addData(arr, attributes, attrData) {
    for (var i = 0; i < attributes; i++) {
        arr.push(attrData[i]);
    }
}

var NodeLabel = function () {
    function NodeLabel() {
        _classCallCheck(this, NodeLabel);

        // this.POINTS = 1;
        this.ATTRIBUTES = 5;

        this.shaderVert = _nodeLabelVert2.default;
        this.shaderFrag = _labelFrag2.default;

        this.arrayBuffer = null;
        this.dataBuffer = null;
        this.strip = 4 * 5;
    }

    _createClass(NodeLabel, [{
        key: 'getRenderData',
        value: function getRenderData(_ref) {
            var data = _ref.data,
                textureText = _ref.textureText;

            var node = data;
            if (!node.label) return [];

            // debugger
            var str = node.label.split('');

            var data = [];

            var sizeX = _util2.default.getNodeSizeX(node),
                sizeY = _util2.default.getNodeSizeY(node);
            var size = Math.max(sizeX, sizeY);
            var infos = textureText.textinfo.infos,
                charWidth = size / 2,
                charHeight = size / 2,
                char,
                uv,
                width;

            var totalWidht = 0;
            for (var i = 0; i < str.length; i++) {
                char = str[i];
                if (!infos[char]) {
                    // console.log(1);
                    continue;
                }
                totalWidht += infos[char].width * charWidth;
            }

            var startx = totalWidht / 2 * -1 + node.x;
            var starty = node.y - sizeY;
            var x1, y1, x2, y2;

            for (var i = 0; i < str.length; i++) {
                char = str[i];
                if (!infos[char]) {
                    // console.log(1);
                    continue;
                }

                width = infos[char].width * charWidth;
                uv = infos[char].uvs;
                x1 = uv[0], y1 = uv[1], x2 = uv[2], y2 = uv[3];

                addData(data, this.ATTRIBUTES, [startx, starty, x1, y1, width]);
                addData(data, this.ATTRIBUTES, [startx, starty - charHeight, x1, y2, width]);
                addData(data, this.ATTRIBUTES, [startx + width, starty, x2, y1, width]);
                addData(data, this.ATTRIBUTES, [startx, starty - charHeight, x1, y2, width]);
                addData(data, this.ATTRIBUTES, [startx + width, starty, x2, y1, width]);
                addData(data, this.ATTRIBUTES, [startx + width, starty - charHeight, x2, y2, width]);

                startx += width;
            }

            return data;
        }
    }, {
        key: 'render',
        value: function render(_ref2) {
            var gl = _ref2.gl,
                program = _ref2.program,
                data = _ref2.data,
                matrix = _ref2.matrix,
                camera = _ref2.camera,
                textureLoader = _ref2.textureLoader;

            if (!this.dataBuffer) this.dataBuffer = gl.createBuffer();

            var positionLocation = gl.getAttribLocation(program, "a_position");
            var uvLocation = gl.getAttribLocation(program, "a_uv");
            var sizeLocation = gl.getAttribLocation(program, "a_size");

            var matrixLocation = gl.getUniformLocation(program, "u_matrix");
            var imageLocation = gl.getUniformLocation(program, "u_image");
            var cameaScaleLocation = gl.getUniformLocation(program, "u_camera_scale");

            var len = data.length / this.ATTRIBUTES | 0;

            if (!this.arrayBuffer || len * this.strip != this.arrayBuffer.byteLength) {
                this.arrayBuffer = new ArrayBuffer(len * this.strip);
            }

            var float32View = new Float32Array(this.arrayBuffer);
            // var Uint8View = new Uint8Array(this.arrayBuffer);

            var offset32 = this.strip / 4,
                offset8 = this.strip;
            for (var i = 0; i < len; i++) {
                float32View[i * offset32 + 0] = data[i * this.ATTRIBUTES + 0];
                float32View[i * offset32 + 1] = data[i * this.ATTRIBUTES + 1];
                float32View[i * offset32 + 2] = data[i * this.ATTRIBUTES + 2];
                float32View[i * offset32 + 3] = data[i * this.ATTRIBUTES + 3];
                float32View[i * offset32 + 4] = data[i * this.ATTRIBUTES + 4];
            }

            gl.bindBuffer(gl.ARRAY_BUFFER, this.dataBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, this.arrayBuffer, gl.STATIC_DRAW);

            gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, this.strip, 0);
            gl.vertexAttribPointer(uvLocation, 2, gl.FLOAT, false, this.strip, 2 * 4);
            gl.vertexAttribPointer(sizeLocation, 1, gl.FLOAT, false, this.strip, 4 * 4);

            gl.bindBuffer(gl.ARRAY_BUFFER, null);
            gl.enableVertexAttribArray(positionLocation);
            gl.enableVertexAttribArray(uvLocation);

            gl.uniformMatrix3fv(matrixLocation, false, new Float32Array(matrix));
            gl.uniform1i(imageLocation, 10);
            gl.uniform1f(cameaScaleLocation, camera.scale);

            gl.drawArrays(gl.TRIANGLES, 0, len);
        }
    }]);

    return NodeLabel;
}();

exports.default = NodeLabel;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by chengang on 17-4-7.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

var _Matrix = __webpack_require__(3);

var _Matrix2 = _interopRequireDefault(_Matrix);

var _edgeLabelVert = __webpack_require__(35);

var _edgeLabelVert2 = _interopRequireDefault(_edgeLabelVert);

var _labelFrag = __webpack_require__(4);

var _labelFrag2 = _interopRequireDefault(_labelFrag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function addData(arr, attributes, attrData, centerX, centerY, angle) {
    var rotate = _Matrix2.default.transformPoint([attrData[0], attrData[1]], _Matrix2.default.matrixFromRotation(angle));
    attrData[0] = rotate[0] + centerX;
    attrData[1] = rotate[1] + centerY;

    for (var i = 0; i < attributes; i++) {
        arr.push(attrData[i]);
    }
}

var CurveLabel = function () {
    function CurveLabel() {
        _classCallCheck(this, CurveLabel);

        // this.POINTS = 1;
        this.ATTRIBUTES = 4;

        this.shaderVert = _edgeLabelVert2.default;
        this.shaderFrag = _labelFrag2.default;

        this.arrayBuffer = null;
        this.dataBuffer = null;
        this.strip = 4 * 4;
    }

    _createClass(CurveLabel, [{
        key: 'getRenderData',
        value: function getRenderData(_ref) {
            var data = _ref.data,
                source = _ref.source,
                target = _ref.target,
                textureText = _ref.textureText;

            var edge = data;
            if (!edge.label) return [];

            // debugger
            var str = edge.label.split('');

            data = [];

            var size = edge.fontSize || Math.max(_util2.default.getNodeSizeX(source), _util2.default.getNodeSizeY(source)) / 3;
            var infos = textureText.textinfo.infos,
                charWidth = size,
                charHeight = size,
                char,
                uv,
                width;

            var totalWidht = 0;
            for (var i = 0; i < str.length; i++) {
                char = str[i];
                if (!infos[char]) {
                    console.log(1);
                    continue;
                }
                totalWidht += infos[char].width * charWidth;
            }

            var dx = target.x - source.x;
            var dy = target.y - source.y;

            //curve
            var dis = _util2.default.getDistance(source.x, source.y, target.x, target.y);
            var tSize = Math.max(_util2.default.getNodeSizeX(target), _util2.default.getNodeSizeY(target));

            var tX = target.x - tSize / dis * dx;
            var tY = target.y - tSize / dis * dy;

            var ctrlP = _util2.default.getControlPos(source.x, source.y, tX, tY, edge.curveCount, edge.curveOrder);

            var tangent = _util2.default.getPointTangentOnQuadraticCurve(0.5, source.x, source.y, tX, tY, ctrlP[0], ctrlP[1]);

            dx = tangent[0], dy = tangent[1];

            var angle = _util2.default.getAngle(1, 0, dx, dy);

            angle = dy < 0 ? Math.PI - angle : angle;
            angle = angle > Math.PI / 2 ? angle + Math.PI : angle;

            var center = _util2.default.getPointOnQuadraticCurve(0.5, source.x, source.y, tX, tY, ctrlP[0], ctrlP[1]);

            var centerX = center[0],
                centerY = center[1];
            var startx = totalWidht / 2 * -1;
            var starty = charHeight / 2;
            var x1, y1, x2, y2;

            for (var i = 0; i < str.length; i++) {
                char = str[i];
                if (!infos[char]) {
                    console.log('no text texture info');
                    continue;
                }

                width = infos[char].width * charWidth;
                uv = infos[char].uvs;
                x1 = uv[0], y1 = uv[1], x2 = uv[2], y2 = uv[3];

                addData(data, this.ATTRIBUTES, [startx, starty, x1, y1], centerX, centerY, angle);
                addData(data, this.ATTRIBUTES, [startx, starty - charHeight, x1, y2], centerX, centerY, angle);
                addData(data, this.ATTRIBUTES, [startx + width, starty, x2, y1], centerX, centerY, angle);
                addData(data, this.ATTRIBUTES, [startx, starty - charHeight, x1, y2], centerX, centerY, angle);
                addData(data, this.ATTRIBUTES, [startx + width, starty, x2, y1], centerX, centerY, angle);
                addData(data, this.ATTRIBUTES, [startx + width, starty - charHeight, x2, y2], centerX, centerY, angle);

                startx += width;
            }

            return data;
        }
    }, {
        key: 'render',
        value: function render(_ref2) {
            var gl = _ref2.gl,
                program = _ref2.program,
                data = _ref2.data,
                matrix = _ref2.matrix,
                camera = _ref2.camera,
                textureLoader = _ref2.textureLoader;

            if (!this.dataBuffer) this.dataBuffer = gl.createBuffer();

            var positionLocation = gl.getAttribLocation(program, "a_position");
            var uvLocation = gl.getAttribLocation(program, "a_uv");

            var matrixLocation = gl.getUniformLocation(program, "u_matrix");
            var imageLocation = gl.getUniformLocation(program, "u_image");

            var len = data.length / this.ATTRIBUTES | 0;

            if (!this.arrayBuffer || len * this.strip != this.arrayBuffer.byteLength) {
                this.arrayBuffer = new ArrayBuffer(len * this.strip);
            }

            var float32View = new Float32Array(this.arrayBuffer);
            // var Uint8View = new Uint8Array(this.arrayBuffer);

            var offset32 = this.strip / 4,
                offset8 = this.strip;
            for (var i = 0; i < len; i++) {
                float32View[i * offset32 + 0] = data[i * this.ATTRIBUTES + 0];
                float32View[i * offset32 + 1] = data[i * this.ATTRIBUTES + 1];
                float32View[i * offset32 + 2] = data[i * this.ATTRIBUTES + 2];
                float32View[i * offset32 + 3] = data[i * this.ATTRIBUTES + 3];
            }

            gl.bindBuffer(gl.ARRAY_BUFFER, this.dataBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, this.arrayBuffer, gl.STATIC_DRAW);

            gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, this.strip, 0);
            gl.vertexAttribPointer(uvLocation, 2, gl.FLOAT, false, this.strip, 2 * 4);

            gl.bindBuffer(gl.ARRAY_BUFFER, null);
            gl.enableVertexAttribArray(positionLocation);
            gl.enableVertexAttribArray(uvLocation);

            gl.uniformMatrix3fv(matrixLocation, false, new Float32Array(matrix));
            gl.uniform1i(imageLocation, 10);

            gl.drawArrays(gl.TRIANGLES, 0, len);
        }
    }]);

    return CurveLabel;
}();

exports.default = CurveLabel;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by chengang on 17-3-28.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

var _defaultVert = __webpack_require__(37);

var _defaultVert2 = _interopRequireDefault(_defaultVert);

var _defaultFrag = __webpack_require__(36);

var _defaultFrag2 = _interopRequireDefault(_defaultFrag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function addData(arr, attributes, attrData) {
    for (var i = 0; i < attributes; i++) {
        arr.push(attrData[i]);
    }
}

var Node = function () {
    function Node() {
        _classCallCheck(this, Node);

        this.ATTRIBUTES = 12;

        this.shaderVert = _defaultVert2.default;
        this.shaderFrag = _defaultFrag2.default;

        this.arrayBuffer = null;
        this.dataBuffer = null;
        this.strip = 5 * 4 + 4 + 4 + 4;
    }

    _createClass(Node, [{
        key: 'getRenderData',
        value: function getRenderData(_ref) {
            var data = _ref.data,
                textureLoader = _ref.textureLoader,
                textureIcon = _ref.textureIcon;


            var node = data;
            var color = _util2.default.parseColor(node.color || '#ff0000');

            var img = -1;
            if (node.img && textureLoader.cache.hasOwnProperty(node.img)) img = textureLoader.cache[node.img];

            var size = node.size * 2 || 10 * 2;
            var isSelected = node.selected ? 1.0 : 0.0;

            var data = [];

            //base
            addData(data, this.ATTRIBUTES, [node.x - node.size, node.y + node.size, color.r, color.g, color.b, color.a, 0, 0, img, isSelected, 1, node.size]);
            addData(data, this.ATTRIBUTES, [node.x + node.size, node.y + node.size, color.r, color.g, color.b, color.a, 1, 0, img, isSelected, 1, node.size]);
            addData(data, this.ATTRIBUTES, [node.x - node.size, node.y - node.size, color.r, color.g, color.b, color.a, 0, 1, img, isSelected, 1, node.size]);
            addData(data, this.ATTRIBUTES, [node.x + node.size, node.y + node.size, color.r, color.g, color.b, color.a, 1, 0, img, isSelected, 1, node.size]);
            addData(data, this.ATTRIBUTES, [node.x - node.size, node.y - node.size, color.r, color.g, color.b, color.a, 0, 1, img, isSelected, 1, node.size]);
            addData(data, this.ATTRIBUTES, [node.x + node.size, node.y - node.size, color.r, color.g, color.b, color.a, 1, 1, img, isSelected, 1, node.size]);

            var hasIcon = node.icon && textureIcon.iconinfo.infos[node.icon],
                uvs;
            var scale = 0.7;
            //icon
            if (hasIcon) {

                uvs = textureIcon.iconinfo.infos[node.icon].uvs;
                addData(data, this.ATTRIBUTES, [node.x - node.size * scale, node.y + node.size * scale, color.r, color.g, color.b, color.a, uvs[0], uvs[1], -2, isSelected, 2, node.size]);
                addData(data, this.ATTRIBUTES, [node.x + node.size * scale, node.y + node.size * scale, color.r, color.g, color.b, color.a, uvs[2], uvs[1], -2, isSelected, 2, node.size]);
                addData(data, this.ATTRIBUTES, [node.x - node.size * scale, node.y - node.size * scale, color.r, color.g, color.b, color.a, uvs[0], uvs[3], -2, isSelected, 2, node.size]);
                addData(data, this.ATTRIBUTES, [node.x + node.size * scale, node.y + node.size * scale, color.r, color.g, color.b, color.a, uvs[2], uvs[1], -2, isSelected, 2, node.size]);
                addData(data, this.ATTRIBUTES, [node.x - node.size * scale, node.y - node.size * scale, color.r, color.g, color.b, color.a, uvs[0], uvs[3], -2, isSelected, 2, node.size]);
                addData(data, this.ATTRIBUTES, [node.x + node.size * scale, node.y - node.size * scale, color.r, color.g, color.b, color.a, uvs[2], uvs[3], -2, isSelected, 2, node.size]);
            }

            return data;
        }
    }, {
        key: 'render',
        value: function render(_ref2) {
            var gl = _ref2.gl,
                program = _ref2.program,
                data = _ref2.data,
                matrix = _ref2.matrix,
                camera = _ref2.camera,
                sampleRatio = _ref2.sampleRatio,
                textureLoader = _ref2.textureLoader;

            // debugger

            if (!this.dataBuffer) this.dataBuffer = gl.createBuffer();

            var positionLocation = gl.getAttribLocation(program, "a_position");
            var colorLocation = gl.getAttribLocation(program, "a_color");
            var imgLocation = gl.getAttribLocation(program, "a_img");
            var selectedLocation = gl.getAttribLocation(program, "a_selected");
            var uvLocation = gl.getAttribLocation(program, "a_uv");
            var flagLocation = gl.getAttribLocation(program, "a_flag");
            var sizeLocation = gl.getAttribLocation(program, "a_size");

            var matrixLocation = gl.getUniformLocation(program, "u_matrix");
            var cameraScaleLocation = gl.getUniformLocation(program, "u_camera_scale");
            var texturesLocation = gl.getUniformLocation(program, "u_textures");
            var borderColorLocation = gl.getUniformLocation(program, "u_borderColor");
            var sampleRatioLocation = gl.getUniformLocation(program, "u_sample_ratio");
            var iconTextureLocation = gl.getUniformLocation(program, "u_icons_texture");

            var len = data.length / this.ATTRIBUTES | 0;

            // debugger
            if (!this.arrayBuffer || len * this.strip != this.arrayBuffer.byteLength) {
                this.arrayBuffer = new ArrayBuffer(len * this.strip);
            }

            var float32View = new Float32Array(this.arrayBuffer);
            var Uint8View = new Uint8Array(this.arrayBuffer);
            var int8View = new Int8Array(this.arrayBuffer);
            var int16View = new Int16Array(this.arrayBuffer);

            var offset32 = this.strip / 4,
                offset16 = this.strip / 2;
            for (var i = 0; i < len; i++) {
                float32View[i * offset32 + 0] = data[i * this.ATTRIBUTES + 0]; //x
                float32View[i * offset32 + 1] = data[i * this.ATTRIBUTES + 1]; //y

                Uint8View[i * this.strip + 8] = data[i * this.ATTRIBUTES + 2]; //color.r
                Uint8View[i * this.strip + 9] = data[i * this.ATTRIBUTES + 3]; //color.g
                Uint8View[i * this.strip + 10] = data[i * this.ATTRIBUTES + 4]; //color.b
                Uint8View[i * this.strip + 11] = data[i * this.ATTRIBUTES + 5]; //color.a

                float32View[i * offset32 + 3] = data[i * this.ATTRIBUTES + 6]; //u
                float32View[i * offset32 + 4] = data[i * this.ATTRIBUTES + 7]; //v

                int16View[i * offset16 + 10] = data[i * this.ATTRIBUTES + 8]; //img
                int16View[i * offset16 + 11] = data[i * this.ATTRIBUTES + 9]; //selected

                float32View[i * offset32 + 6] = data[i * this.ATTRIBUTES + 10]; //flag
                float32View[i * offset32 + 7] = data[i * this.ATTRIBUTES + 11]; //size
            }

            // debugger

            gl.bindBuffer(gl.ARRAY_BUFFER, this.dataBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, this.arrayBuffer, gl.STATIC_DRAW);

            gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, this.strip, 0);
            gl.vertexAttribPointer(colorLocation, 4, gl.UNSIGNED_BYTE, false, this.strip, 2 * 4);
            gl.vertexAttribPointer(uvLocation, 2, gl.FLOAT, false, this.strip, 3 * 4);
            gl.vertexAttribPointer(imgLocation, 1, gl.SHORT, false, this.strip, 5 * 4);
            gl.vertexAttribPointer(selectedLocation, 1, gl.SHORT, false, this.strip, 5 * 4 + 2);
            gl.vertexAttribPointer(flagLocation, 1, gl.FLOAT, false, this.strip, 6 * 4);
            gl.vertexAttribPointer(sizeLocation, 1, gl.FLOAT, false, this.strip, 7 * 4);

            gl.bindBuffer(gl.ARRAY_BUFFER, null);
            gl.enableVertexAttribArray(positionLocation);
            gl.enableVertexAttribArray(colorLocation);
            gl.enableVertexAttribArray(imgLocation);
            gl.enableVertexAttribArray(selectedLocation);
            gl.enableVertexAttribArray(uvLocation);
            gl.enableVertexAttribArray(flagLocation);
            gl.enableVertexAttribArray(sizeLocation);

            gl.uniformMatrix3fv(matrixLocation, false, new Float32Array(matrix));
            gl.uniform1f(cameraScaleLocation, camera.scale);
            gl.uniform1f(sampleRatioLocation, sampleRatio);
            gl.uniform4f(borderColorLocation, 212, 82, 95, 255.0);

            gl.uniform1iv(texturesLocation, textureLoader.texturesIndex);
            gl.uniform1i(iconTextureLocation, 11);

            gl.drawArrays(gl.TRIANGLES, 0, len);
        }
    }]);

    return Node;
}();

exports.default = Node;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by chengang on 17-3-28.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

var _vert = __webpack_require__(39);

var _vert2 = _interopRequireDefault(_vert);

var _frag = __webpack_require__(38);

var _frag2 = _interopRequireDefault(_frag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function addData(arr, attributes, attrData) {
    for (var i = 0; i < attributes; i++) {
        arr.push(attrData[i]);
    }
}

var Rect = function () {
    function Rect() {
        _classCallCheck(this, Rect);

        this.ATTRIBUTES = 11;

        this.shaderVert = _vert2.default;
        this.shaderFrag = _frag2.default;

        this.arrayBuffer = null;
        this.dataBuffer = null;
        this.strip = 5 * 4 + 4 + 4;
    }

    _createClass(Rect, [{
        key: 'getRenderData',
        value: function getRenderData(_ref) {
            var data = _ref.data,
                textureLoader = _ref.textureLoader,
                textureIcon = _ref.textureIcon;


            var node = data;
            var color = _util2.default.parseColor(node.color || '#34e1ff');

            var img = -1;
            if (node.img && textureLoader.cache.hasOwnProperty(node.img)) img = textureLoader.cache[node.img];

            var sizeX = node.width || node.size || 10;
            var sizeY = node.height || node.size || 10;
            var isSelected = node.selected ? 1.0 : 0.0;

            data = [];

            //base
            addData(data, this.ATTRIBUTES, [node.x - sizeX, node.y + sizeY, color.r, color.g, color.b, color.a, 0, 0, img, isSelected, 1]);
            addData(data, this.ATTRIBUTES, [node.x + sizeX, node.y + sizeY, color.r, color.g, color.b, color.a, 1, 0, img, isSelected, 1]);
            addData(data, this.ATTRIBUTES, [node.x - sizeX, node.y - sizeY, color.r, color.g, color.b, color.a, 0, 1, img, isSelected, 1]);
            addData(data, this.ATTRIBUTES, [node.x + sizeX, node.y + sizeY, color.r, color.g, color.b, color.a, 1, 0, img, isSelected, 1]);
            addData(data, this.ATTRIBUTES, [node.x - sizeX, node.y - sizeY, color.r, color.g, color.b, color.a, 0, 1, img, isSelected, 1]);
            addData(data, this.ATTRIBUTES, [node.x + sizeX, node.y - sizeY, color.r, color.g, color.b, color.a, 1, 1, img, isSelected, 1]);

            var hasIcon = node.icon && textureIcon.iconinfo.infos[node.icon],
                uvs;
            var scale = 0.85;
            var iconSize = Math.min(sizeX, sizeY);
            //icon
            if (hasIcon) {
                // debugger
                uvs = textureIcon.iconinfo.infos[node.icon].uvs;
                addData(data, this.ATTRIBUTES, [node.x - iconSize * scale, node.y + iconSize * scale, color.r, color.g, color.b, color.a, uvs[0], uvs[1], -2, isSelected, 2]);
                addData(data, this.ATTRIBUTES, [node.x + iconSize * scale, node.y + iconSize * scale, color.r, color.g, color.b, color.a, uvs[2], uvs[1], -2, isSelected, 2]);
                addData(data, this.ATTRIBUTES, [node.x - iconSize * scale, node.y - iconSize * scale, color.r, color.g, color.b, color.a, uvs[0], uvs[3], -2, isSelected, 2]);
                addData(data, this.ATTRIBUTES, [node.x + iconSize * scale, node.y + iconSize * scale, color.r, color.g, color.b, color.a, uvs[2], uvs[1], -2, isSelected, 2]);
                addData(data, this.ATTRIBUTES, [node.x - iconSize * scale, node.y - iconSize * scale, color.r, color.g, color.b, color.a, uvs[0], uvs[3], -2, isSelected, 2]);
                addData(data, this.ATTRIBUTES, [node.x + iconSize * scale, node.y - iconSize * scale, color.r, color.g, color.b, color.a, uvs[2], uvs[3], -2, isSelected, 2]);
            }

            return data;
        }
    }, {
        key: 'render',
        value: function render(_ref2) {
            var gl = _ref2.gl,
                program = _ref2.program,
                data = _ref2.data,
                matrix = _ref2.matrix,
                camera = _ref2.camera,
                sampleRatio = _ref2.sampleRatio,
                textureLoader = _ref2.textureLoader;

            // debugger

            if (!this.dataBuffer) this.dataBuffer = gl.createBuffer();

            var positionLocation = gl.getAttribLocation(program, "a_position");
            var colorLocation = gl.getAttribLocation(program, "a_color");
            var imgLocation = gl.getAttribLocation(program, "a_img");
            var selectedLocation = gl.getAttribLocation(program, "a_selected");
            var uvLocation = gl.getAttribLocation(program, "a_uv");
            var flagLocation = gl.getAttribLocation(program, "a_flag");

            var matrixLocation = gl.getUniformLocation(program, "u_matrix");
            var cameraScaleLocation = gl.getUniformLocation(program, "u_camera_scale");
            var texturesLocation = gl.getUniformLocation(program, "u_textures");
            var borderColorLocation = gl.getUniformLocation(program, "u_borderColor");
            var sampleRatioLocation = gl.getUniformLocation(program, "u_sample_ratio");
            var iconTextureLocation = gl.getUniformLocation(program, "u_icons_texture");

            var len = data.length / this.ATTRIBUTES | 0;

            // debugger
            if (!this.arrayBuffer || len * this.strip != this.arrayBuffer.byteLength) {
                this.arrayBuffer = new ArrayBuffer(len * this.strip);
            }

            var float32View = new Float32Array(this.arrayBuffer);
            var Uint8View = new Uint8Array(this.arrayBuffer);
            var int8View = new Int8Array(this.arrayBuffer);
            var int16View = new Int16Array(this.arrayBuffer);

            var offset32 = this.strip / 4,
                offset16 = this.strip / 2;
            for (var i = 0; i < len; i++) {
                float32View[i * offset32 + 0] = data[i * this.ATTRIBUTES + 0]; //x
                float32View[i * offset32 + 1] = data[i * this.ATTRIBUTES + 1]; //y

                Uint8View[i * this.strip + 8] = data[i * this.ATTRIBUTES + 2]; //color.r
                Uint8View[i * this.strip + 9] = data[i * this.ATTRIBUTES + 3]; //color.g
                Uint8View[i * this.strip + 10] = data[i * this.ATTRIBUTES + 4]; //color.b
                Uint8View[i * this.strip + 11] = data[i * this.ATTRIBUTES + 5]; //color.a

                float32View[i * offset32 + 3] = data[i * this.ATTRIBUTES + 6]; //u
                float32View[i * offset32 + 4] = data[i * this.ATTRIBUTES + 7]; //v

                int16View[i * offset16 + 10] = data[i * this.ATTRIBUTES + 8]; //img
                int16View[i * offset16 + 11] = data[i * this.ATTRIBUTES + 9]; //selected

                float32View[i * offset32 + 6] = data[i * this.ATTRIBUTES + 10]; //flag
            }

            // debugger

            gl.bindBuffer(gl.ARRAY_BUFFER, this.dataBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, this.arrayBuffer, gl.STATIC_DRAW);

            gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, this.strip, 0);
            gl.vertexAttribPointer(colorLocation, 4, gl.UNSIGNED_BYTE, false, this.strip, 2 * 4);
            gl.vertexAttribPointer(uvLocation, 2, gl.FLOAT, false, this.strip, 3 * 4);
            gl.vertexAttribPointer(imgLocation, 1, gl.SHORT, false, this.strip, 5 * 4);
            gl.vertexAttribPointer(selectedLocation, 1, gl.SHORT, false, this.strip, 5 * 4 + 2);
            gl.vertexAttribPointer(flagLocation, 1, gl.FLOAT, false, this.strip, 6 * 4);

            gl.bindBuffer(gl.ARRAY_BUFFER, null);
            gl.enableVertexAttribArray(positionLocation);
            gl.enableVertexAttribArray(colorLocation);
            gl.enableVertexAttribArray(imgLocation);
            gl.enableVertexAttribArray(selectedLocation);
            gl.enableVertexAttribArray(uvLocation);
            gl.enableVertexAttribArray(flagLocation);

            gl.uniformMatrix3fv(matrixLocation, false, new Float32Array(matrix));
            gl.uniform1f(cameraScaleLocation, camera.scale);
            gl.uniform1f(sampleRatioLocation, sampleRatio);
            gl.uniform4f(borderColorLocation, 222, 19, 19, 255.0);

            gl.uniform1iv(texturesLocation, textureLoader.texturesIndex);
            gl.uniform1i(iconTextureLocation, 11);

            gl.drawArrays(gl.TRIANGLES, 0, len);
        }
    }]);

    return Rect;
}();

exports.default = Rect;

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = "#ifdef GL_OES_standard_derivatives\n#extension GL_OES_standard_derivatives : enable\n#endif\n\nprecision mediump float;\nvarying vec4 color;\nvarying vec2 uv;\nvarying float dis;\nvarying float flag;\nvarying float dashed;\n\nuniform float u_camera_scale;\n\n\n\nvoid main(){\n        float a = 0.6;\n        float width = a / u_camera_scale;\n        float scale = 1.0;\n        float base = 0.6;\n        float smooth_factor = 0.4;\n\n        if(flag > -0.5 && flag < 0.5){//curve\n                vec2 px = dFdx(uv);\n                vec2 py = dFdy(uv);\n\n                float fx = 2.0 * uv.x * px.x - px.y;\n                float fy = 2.0 * uv.y * py.x - py.y;\n\n                float sd = (uv.x * uv.x - uv.y) / sqrt(fx * fx + fy * fy);\n\n                float alpha = 1.0 - abs(sd) / width;\n                if (alpha < 0.0 || uv.x < 0.0 || uv.x > 1.0) discard;\n\n                float n = 800.0/dis;\n                float dot = mod(uv.x*100.0,n);\n                if(dashed > 0.5 && dot > n*0.5 && dot < n) discard;\n\n                if(alpha < 0.2) scale = smoothstep(0.0,smooth_factor,alpha);\n\n                gl_FragColor = color*scale;\n\n        }else if(flag > 0.5 && flag < 1.5){//arrow\n                gl_FragColor = color;\n        }\n\n\n}"

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = "attribute vec2 a_position;\n//attribute vec2 a_normal;\nattribute vec4 a_color;\n//attribute float a_size;\nattribute vec2 a_uv;\nattribute float a_dis;\nattribute float a_flag;\nattribute float a_dashed;\n\nuniform mat3 u_matrix;\n\nvarying vec4 color;\nvarying vec2 uv;\nvarying float dis;\nvarying float flag;\nvarying float dashed;\n\nvoid main() {\n\n//vec2 pos  = a_position + a_normal * a_size;\ngl_Position = vec4((u_matrix*vec3(a_position,1)).xy,0,1);\nuv = a_uv;\ndis = a_dis;\nflag = a_flag;\ncolor = a_color/255.0;\ndashed = a_dashed;\n}\n"

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = "precision mediump float;\nvarying vec4 color;\nvoid main(){\ngl_FragColor = color;\n}"

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = "attribute vec2 a_position;\nattribute vec2 a_normal;\nattribute vec4 a_color;\nattribute float a_size;\n\nuniform mat3 u_matrix;\n\nvarying vec4 color;\n\nvoid main() {\n\nvec2 pos  = a_position + a_normal * a_size;\ngl_Position = vec4((u_matrix*vec3(pos,1)).xy,0,1);\n\ncolor = a_color/255.0;\n}\n"

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = "attribute vec2 a_position;\nattribute vec2 a_uv;\nattribute float a_size;\n\nuniform mat3 u_matrix;\nuniform sampler2D u_image;\n\n\nvarying vec2 v_texCoord;\nvarying float size;\n\nvoid main() {\ngl_Position = vec4((u_matrix*vec3(a_position,1)).xy,0,1);\nv_texCoord = a_uv;\nsize = a_size;\n}\n"

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = "//#ifdef GL_OES_standard_derivatives\n//#extension GL_OES_standard_derivatives : enable\n//#endif\n\n precision mediump float;\n\nvarying vec4 color;\nvarying float img;\nvarying float selected;\nvarying vec2 uv;\nvarying float flag;\nvarying float size;\n\n\nuniform sampler2D u_textures[10];\nuniform sampler2D u_icons_texture;\nuniform vec4 u_borderColor;\nuniform float u_sample_ratio;\n\n\n\n\n\n\n\n//todo\nvec4 getSampleColore(int index,vec2 uv){\n    vec4 c;\n    if(index == 0){\n        c = texture2D(u_textures[0],uv);\n    }else if(index == 1){\n        c = texture2D(u_textures[1],uv);\n    }else if(index == 2){\n        c = texture2D(u_textures[2],uv);\n    }else if(index == 3){\n        c = texture2D(u_textures[3],uv);\n    }else if(index == 4){\n        c = texture2D(u_textures[4],uv);\n    }else if(index == 5){\n        c = texture2D(u_textures[5],uv);\n    }\n    return c;\n}\n\nvec4 borderColor = u_borderColor/255.0;\n\nvoid main()\n{\n   float r = 0.0, alpha = 1.0,\n   blur = min(0.05,4.0/size) ,\n   border = min(0.75,0.04*size) ;\n\nif(flag > 0.5 && flag < 1.5) //flag =1 base\n{\n    vec4 nodecolor = color;\n    vec2 cxy = 2.0 * uv - 1.0;\n    r = length(cxy);\n\n    if(r > 1.0 ){\n        discard;\n    }\n\n    if(img >= 0.0){\n        nodecolor = getSampleColore(int(img),uv);\n    }\n\n    if(r > 1.0-blur && r <=1.0){\n        alpha = 1.0 - smoothstep(1.0-blur, 1.0, r);\n     }\n\n\n     if( selected > 0.5  && r > border && r < border + blur){\n        nodecolor = mix(nodecolor,borderColor,smoothstep(border, border + blur, r));\n    }\n\n     if( selected > 0.5  &&  r >= border + blur){\n        nodecolor = borderColor;\n     }\n\n      gl_FragColor = nodecolor * alpha;\n\n}else if(flag > 1.5 && flag < 2.5) {//flag =2 icon\n    gl_FragColor = texture2D(u_icons_texture,uv).w * vec4(1,1,1,1);\n}\n\n\n}\n"

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = "\n precision mediump float;\nattribute vec2 a_position;\nattribute vec4 a_color;\nattribute float a_img;\nattribute vec2 a_uv;\nattribute float a_selected;\nattribute float a_flag;\nattribute float a_size;\n\nuniform mat3 u_matrix;\nuniform float u_camera_scale;\nuniform float u_sample_ratio;\n\nvarying vec4 color;\nvarying float img;\nvarying float selected;\nvarying vec2 uv;\nvarying float flag;\nvarying float size;\n\n\nvoid main() {\n\ngl_Position = vec4((u_matrix*vec3(a_position,1)).xy,0,1);\ncolor = a_color/255.0;\nimg = a_img;\nselected = a_selected;\nuv = a_uv;\nflag = a_flag;\n\nsize = a_size / u_camera_scale ;\n}\n"

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = "//#ifdef GL_OES_standard_derivatives\n//#extension GL_OES_standard_derivatives : enable\n//#endif\n\n precision mediump float;\n\nvarying vec4 color;\nvarying float img;\nvarying float selected;\nvarying vec2 uv;\nvarying float flag;\n\n\nuniform sampler2D u_textures[10];\nuniform sampler2D u_icons_texture;\nuniform vec4 u_borderColor;\nuniform float u_sample_ratio;\n\n//todo\nvec4 getSampleColore(int index,vec2 uv){\n    vec4 c;\n    if(index == 0){\n        c = texture2D(u_textures[0],uv);\n    }else if(index == 1){\n        c = texture2D(u_textures[1],uv);\n    }else if(index == 2){\n        c = texture2D(u_textures[2],uv);\n    }else if(index == 3){\n        c = texture2D(u_textures[3],uv);\n    }else if(index == 4){\n        c = texture2D(u_textures[4],uv);\n    }else if(index == 5){\n        c = texture2D(u_textures[5],uv);\n    }\n    return c;\n}\n\nvec4 borderColor = u_borderColor/255.0;\n\nvoid main()\n{\n   float r = 0.0, alpha = 1.0,\n   blur = 0.05 ,\n   border = 0.75 ;\n\n\nif(flag > 0.5 && flag < 1.5) //flag =1\n{\n    vec4 nodecolor = color;\n    vec2 cxy = 2.0 * uv - 1.0;\n    r = length(cxy);\n\n    if(img >= 0.0){\n        nodecolor = getSampleColore(int(img),uv);\n    }\n\n     if( selected > 0.5  && r > border && r < border + blur){\n        nodecolor = mix(nodecolor,borderColor,smoothstep(border, border + blur, r));\n    }\n\n     if( selected > 0.5  &&  r >= border + blur){\n        nodecolor = borderColor;\n     }\n\n      gl_FragColor = nodecolor * alpha;\n\n}else if(flag > 1.5 && flag < 2.5) {//flag =2\n    gl_FragColor = texture2D(u_icons_texture,uv).w * vec4(1,1,1,1);\n}\n\n\n}\n"

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = "\n precision mediump float;\nattribute vec2 a_position;\nattribute vec4 a_color;\nattribute float a_img;\nattribute vec2 a_uv;\nattribute float a_selected;\nattribute float a_flag;\n\nuniform mat3 u_matrix;\nuniform float u_camera_scale;\nuniform float u_sample_ratio;\n\nvarying vec4 color;\nvarying float img;\nvarying float selected;\nvarying vec2 uv;\nvarying float flag;\n\n\nvoid main() {\n\ngl_Position = vec4((u_matrix*vec3(a_position,1)).xy,0,1);\ncolor = a_color/255.0;\nimg = a_img;\nselected = a_selected;\nuv = a_uv;\nflag = a_flag;\n}\n"

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(8);

Object.defineProperty(exports, 'WebGLRender', {
  enumerable: true,
  get: function get() {
    return _index.WebGLRender;
  }
});

var _index2 = __webpack_require__(7);

Object.defineProperty(exports, 'GraphView', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index2).default;
  }
});

var _util = __webpack_require__(0);

Object.defineProperty(exports, 'util', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_util).default;
  }
});

var _tween = __webpack_require__(2);

Object.defineProperty(exports, 'Tween', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_tween).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ })
/******/ ]);
//# sourceMappingURL=klgraph.js.map