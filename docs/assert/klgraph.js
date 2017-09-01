(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["KLGraph"] = factory();
	else
		root["KLGraph"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 47);
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

utils.isInteger = Number.isInteger || function (value) {
    return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
};

utils.nextPow2 = function (n) {
    // var num = 1;
    // while(num < n) num <<= 1;
    // return num;

    n = n - 1;
    var i = 1;
    var offset;
    while ((offset = n >> i) > 0) {
        n |= offset;
        i *= 2;
    }
    return n + 1;
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

utils.inLine = function (x, y, x1, y1, x2, y2, lineSize) {
    var A = x - x1;
    var B = y - y1;
    var C = x2 - x1;
    var D = y2 - y1;

    var dot = A * C + B * D;
    var len_sq = C * C + D * D;

    if (dot < 0 || len_sq < 0.1) return false;

    if (dot * dot / len_sq > len_sq) return false;

    var param = -1;
    param = dot / len_sq;

    var xx, yy;

    xx = x1 + param * C;
    yy = y1 + param * D;

    var dx = x - xx;
    var dy = y - yy;
    var dis = Math.sqrt(dx * dx + dy * dy);

    return dis <= lineSize;
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
    var size = node.size;
    if (node.type == 'rect' && node.width) size = node.width;

    return size;
};

utils.getNodeSizeY = function (node) {
    var size = node.size;
    if (node.type == 'rect' && node.height) size = node.height;

    return size;
};

utils.getBBox = function (nodes) {

    if (!nodes || nodes.length == 0) return { x: 0, y: 0, w: 0, h: 0 };

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
        r = dP1 < dP2 ? -0.01 : 0.01,
        rThreshold = 0.001,
        i = 100,
        pt = utils.getPointOnQuadraticCurve(t, x1, y1, x2, y2, cpx, cpy),
        dt = utils.getDistance(x, y, pt[0], pt[1]),
        old_dt;

    // This algorithm minimizes the distance from the point to the curve. It
    // find the optimal t value where t=0 is the start point and t=1 is the end
    // point of the curve, starting from t=0.5.
    // It terminates because it runs a maximum of i interations.
    while (i-- > 0 && t >= 0 && t <= 1 && dt > epsilon && (r > rThreshold || r < -rThreshold)) {
        old_dt = dt;
        pt = utils.getPointOnQuadraticCurve(t, x1, y1, x2, y2, cpx, cpy);
        dt = utils.getDistance(x, y, pt[0], pt[1]);

        if (dt > old_dt) {
            // not the right direction:
            // halfstep in the opposite direction
            r = -r / 2;
            t += r;
        } else if (t + r < 0 || t + r > 1) {
            // oops, we've gone too far:
            // revert with a halfstep
            r = r / 2;
            dt = old_dt;
        } else {
            // progress:
            t += r;
        }
    }

    return dt < epsilon;
};

utils.getControlPos = function (x1, y1, x2, y2, count, order) {
    // var dis = utils.getDistance(x1,y1,x2,y2);
    // var factor = dis/8;
    var factor = 20;

    var ratio = count % 2 == 1 ? 1 : -1;
    ratio *= order ? 1 : -1;

    factor *= ratio * (count + 1 >> 1);

    var norV = utils.normalize([y1 - y2, x2 - x1]);
    return [norV[0] * factor + (x1 + x2) / 2, norV[1] * factor + (y1 + y2) / 2];
};

exports.default = utils;

// window.utils = utils;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventEmitter = function () {
    function EventEmitter() {
        _classCallCheck(this, EventEmitter);

        this.clearListeners();
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
            return this;
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
    }, {
        key: 'clearListeners',
        value: function clearListeners() {
            this._listener = {};
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

var _timer = __webpack_require__(11);

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

            if (elapsed >= this._duration) {
                this.stop(true);
            }
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
        value: function stop(emitEnd) {
            if (this.timer) {
                this.timer.stop();
                this.timer = null;
                this.objs = null;
                this.interpolates = null;

                if (emitEnd) this.emit('end');

                Tween.remove(this.objs);
            }
        }
    }], [{
        key: 'remove',
        value: function remove(obj, emitEnd) {
            var list = Tween.list;
            Tween.list = [];
            list.forEach(function (e) {
                if (e.objs == obj) {
                    e.stop(emitEnd);
                } else {
                    Tween.list.push(e);
                }
            });
        }
    }, {
        key: 'removeByType',
        value: function removeByType(type, emitEnd) {
            var list = Tween.list;
            Tween.list = [];
            list.forEach(function (e) {
                if (e.type === type) {
                    e.stop(emitEnd);
                } else {
                    Tween.list.push(e);
                }
            });
        }
    }, {
        key: 'removeAll',
        value: function removeAll(emitEnd) {
            Tween.list.forEach(function (e) {
                e.stop(emitEnd);
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


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GlType = exports.GLComType = undefined;
exports.getActiveAttributes = getActiveAttributes;
exports.getActiveUniforms = getActiveUniforms;
exports.calTypeOffset = calTypeOffset;
exports.vertexAttribPointer = vertexAttribPointer;
exports.checkAttrValid = checkAttrValid;
exports.calculateStrip = calculateStrip;
exports.setUniforms = setUniforms;
exports.loadShader = loadShader;
exports.loadProgram = loadProgram;

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GLComType = exports.GLComType = {
    FLOAT: { glType: 'FLOAT', bytes: 4 },
    BYTE: { glType: 'BYTE', bytes: 1 },
    SHORT: { glType: 'SHORT', bytes: 2 },
    UNSIGNED_BYTE: { glType: 'UNSIGNED_BYTE', bytes: 1 },
    UNSIGNED_SHORT: { glType: 'UNSIGNED_SHORT', bytes: 2 }
};

var GlType = exports.GlType = {
    FLOAT: { components: 1, glType: 'FLOAT' },
    FLOAT_VEC2: { components: 2, glType: 'FLOAT_VEC2' },
    FLOAT_VEC3: { components: 3, glType: 'FLOAT_VEC3' },
    FLOAT_VEC4: { components: 4, glType: 'FLOAT_VEC4' },
    INT: { components: 1, glType: 'INT' },
    INT_VEC2: { components: 2, glType: 'INT_VEC2' },
    INT_VEC3: { components: 3, glType: 'INT_VEC3' },
    INT_VEC4: { components: 4, glType: 'INT_VEC4' },
    BOOL: { components: 1, glType: 'BOOL' },
    BOOL_VEC2: { components: 2, glType: 'BOOL_VEC2' },
    BOOL_VEC3: { components: 3, glType: 'BOOL_VEC3' },
    BOOL_VEC4: { components: 4, glType: 'BOOL_VEC4' },
    FLOAT_MAT2: { components: 4, glType: 'FLOAT_MAT2' },
    FLOAT_MAT3: { components: 9, glType: 'FLOAT_MAT3' },
    FLOAT_MAT4: { components: 16, glType: 'FLOAT_MAT4' },
    SAMPLER_2D: { components: 1, glType: 'SAMPLER_2D' },
    SAMPLER_CUBE: { components: 1, glType: 'SAMPLER_CUBE' }
};

function getType(gl, typeNum) {
    var type = 'FLOAT';
    for (var name in GlType) {
        if (gl[name] == typeNum) return name;
    }
    console.error('gl type not found');
    return type;
}

function getActiveAttributes(gl, program) {
    var shaderAttrInfos = {};
    var numAttribs = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
    for (var i = 0; i < numAttribs; ++i) {
        var attribInfo = gl.getActiveAttrib(program, i);
        if (!attribInfo) {
            continue;
        }

        shaderAttrInfos[attribInfo.name] = {};
        shaderAttrInfos[attribInfo.name].type = getType(gl, attribInfo.type);
        shaderAttrInfos[attribInfo.name].size = attribInfo.size;
        shaderAttrInfos[attribInfo.name].location = gl.getAttribLocation(program, attribInfo.name);
    }
    return shaderAttrInfos;
}

function getActiveUniforms(gl, program) {
    var shaderUniformInfos = {};
    var numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (var i = 0; i < numUniforms; ++i) {
        var uniformInfo = gl.getActiveUniform(program, i);
        if (!uniformInfo) {
            continue;
        }

        var name = uniformInfo.name;
        // remove the array suffix.
        if (name.substr(-3) === "[0]") {
            name = name.substr(0, name.length - 3);
        }

        shaderUniformInfos[name] = {};
        shaderUniformInfos[name].type = getType(gl, uniformInfo.type);
        shaderUniformInfos[name].size = uniformInfo.size;
        shaderUniformInfos[name].location = gl.getUniformLocation(program, name);
    }
    return shaderUniformInfos;
}

function calTypeOffset(activeAttributes, config) {
    config = config || {};
    var offsetConfig = {
        config: {},
        strip: 0
    };
    var type,
        num = 0;
    for (var attr in activeAttributes) {
        type = activeAttributes[attr].type;
        offsetConfig.config[attr] = {};
        offsetConfig.config[attr].start = num;
        offsetConfig.config[attr].components = GlType[type].components;
        num += GlType[type].components;
    }
    offsetConfig.strip = num;
    return offsetConfig;
}

function vertexAttribPointer(gl, activeAttributes, offsetConfig) {
    // debugger
    var config = offsetConfig.config;
    var strip = offsetConfig.strip;
    var err = [];
    for (var attr in activeAttributes) {
        if (!(attr in config) || config[attr] == undefined) {
            err.push('shader need attribute: ' + attr);
            continue;
        }
        gl.vertexAttribPointer(activeAttributes[attr].location, config[attr].components, gl.FLOAT, false, strip * 4, config[attr].start * 4);
        gl.enableVertexAttribArray(activeAttributes[attr].location);
    }
    return err.length ? err.join('\n') : null;
}

function checkAttrValid(config, data) {

    var type;
    var err = [];
    for (var attr in config) {
        if (!config.hasOwnProperty(attr)) {
            err.push('shader need attribute: ' + attr);
            continue;
        }

        if (data[attr] == undefined) {
            err.push('attribute [' + attr + ']: is undefined');
            continue;
        }

        type = config[attr].type;
        if (_util2.default.isArray(data[attr]) && data[attr].length != GlType[type].components * config[attr].size) {
            err.push('attribute [' + attr + ']: size need ' + GlType[type].components);
        }
    }

    return err.length ? err : null;
}

function calculateStrip(attributes) {
    var strip = 0;
    for (var attr in attributes) {
        strip += attributes[attr].components;
    }
    return strip;
}

var uniformSetter = {
    FLOAT: function FLOAT(gl, location, v) {
        gl.uniform1f(location, v);
    },
    FLOAT_VEC2: function FLOAT_VEC2(gl, location, v) {
        gl.uniform2fv(location, v);
    },
    FLOAT_VEC3: function FLOAT_VEC3(gl, location, v) {
        gl.uniform3fv(location, v);
    },
    FLOAT_VEC4: function FLOAT_VEC4(gl, location, v) {
        gl.uniform4fv(location, v);
    },
    FLOAT_MAT2: function FLOAT_MAT2(gl, location, v) {
        gl.uniformMatrix2fv(location, false, v);
    },
    FLOAT_MAT3: function FLOAT_MAT3(gl, location, v) {
        gl.uniformMatrix3fv(location, false, v);
    },
    FLOAT_MAT4: function FLOAT_MAT4(gl, location, v) {
        gl.uniformMatrix4fv(location, false, v);
    },
    SAMPLER_2D: function SAMPLER_2D(gl, location, v) {
        if (v.length) gl.uniform1iv(location, v);else gl.uniform1i(location, v);
    }
};
function setUniforms(gl, activeUniforms, uniforms) {
    var type;
    var err = [];
    for (var attr in activeUniforms) {
        if (!(attr in uniforms) || uniforms[attr] == undefined) {
            err.push('shader need uniform: ' + attr);
            continue;
        }
        type = activeUniforms[attr].type;
        uniformSetter[type](gl, activeUniforms[attr].location, uniforms[attr]);
    }
    return err.length ? err.join('\n') : null;
}

//webgl shader tool
function loadShader(gl, shaderSource, shaderType, error) {
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

function loadProgram(gl, shaders, attribs, loc, error) {
    var i,
        linked,
        program = gl.createProgram();

    program.shaders = {};

    for (i = 0; i < shaders.length; ++i) {
        gl.attachShader(program, shaders[i]);
        program.shaders['shader' + i] = shaders[i];
    }

    if (attribs) for (i = 0; i < attribs.length; ++i) {
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

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var mat3 = {};

/**
 *
 * 返回一个单位矩阵
 */
mat3.normalize = function () {
    return [1, 0, 0, 0, 1, 0, 0, 0, 1];
};

/**
 * 从dx ,dy 创建一个平移矩阵。
 * @param dx
 * @param dy
 *
 */
mat3.matrixFromTranslate = function (dx, dy) {
    return [1, 0, 0, 0, 1, 0, dx, dy, 1];
};

/**
 * 从angle 创建一个旋转矩阵。
 * @param angle (弧度值)
 */
mat3.matrixFromRotation = function (angle) {
    var cos = Math.cos(angle),
        sin = Math.sin(angle);

    return [cos, sin, 0, -sin, cos, 0, 0, 0, 1];
};

/**
 * 从scalex ,scaley 创建一个缩放矩阵。
 * @param x
 * @param y
 */
mat3.matrixFromScale = function (x, y) {
    return [x, 0, 0, 0, y, 0, 0, 0, 1];
};

/**
 * 计算一个矩阵的逆矩阵。
 * @param a
 */
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

/**
 * 矩阵相乘，在a的基础上做b变换。
 * @param a
 * @param b
 */
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

/**
 * 对点p进行a矩阵变换。
 * @param p
 * @param a
 */
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

/**
 * 对向量v进行a矩阵变换。
 * @param v
 * @param a
 */
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

/**
 * 计算多个矩阵的变换。
 * @param matrixs
 */
mat3.multiMatrix = function (matrixs) {
    return matrixs.reduce(function (pre, cur) {
        return mat3.multiply(pre, cur);
    });
};

exports.default = mat3;

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

        _this.read(options);

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

            this.curveGroup = null;
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
                    // console.log(e);
                    console.error('some edge has not source id or not a node of the id');
                    return;
                }
                if (!e.target || !this.nodesIndex[e.target + '']) {
                    // console.log(e);
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

            this.createEdgeCurveCount();

            this.emit('reset');

            // this.quad.index(this.nodes);
        }
    }, {
        key: 'createEdgeCurveCount',
        value: function createEdgeCurveCount() {

            var map = this.curveGroup = {};

            var source, target, attr;
            this.edges.forEach(function (edge) {
                source = this.nodesIndex[edge.source];
                target = this.nodesIndex[edge.target];
                attr = edge.source + '&' + edge.target;
                if (!map[attr]) map[attr] = map[edge.target + '&' + edge.source] = { counter: 0, source: edge.source };

                edge._curveGroup = map[attr];

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
        value: function removeNode(nodeids) {
            if (!_util2.default.isArray()) nodeids = [nodeids];

            nodeids.forEach(function (nodeid) {
                this._removeNode(nodeid);
            }.bind(this));

            this.emit('remove', ['node', nodeids]);
        }

        /**
         *
         * @private
         */

    }, {
        key: '_removeNode',
        value: function _removeNode(nodeid) {
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

            this.createEdgeCurveCount();

            var ids = edges.map(function (e) {
                return e.id;
            });
            this.emit('add', ['edge', ids]);
        }
    }, {
        key: 'removeEdge',
        value: function removeEdge(edgeids) {

            if (!_util2.default.isArray(edgeids)) edgeids = [edgeids];

            edgeids.forEach(function (edgeid) {
                this._removeEdge(edgeid);
            }.bind(this));

            this.emit('remove', ['edge', edgeids]);
        }

        /**
         *
         * @private
         */

    }, {
        key: '_removeEdge',
        value: function _removeEdge(edgeid) {
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
        }
    }, {
        key: 'getNodes',
        value: function getNodes() {
            return this.nodes;
        }
    }, {
        key: 'setNodeData',
        value: function setNodeData(ids, objs) {
            // console.time('setNodeData')
            if (!_util2.default.isArray(ids)) {
                ids = [ids];
            }

            var objIsArr = _util2.default.isArray(objs);

            var nodeDirtyArr = [];
            var edgeDirtyArr = [];
            var edgeIdArr = [];

            ids.forEach(function (id, i) {
                var node = this.nodesIndex[id];
                var obj = objIsArr ? objs[i] : objs;
                var updatePos = false;

                if (obj.hasOwnProperty('x') || obj.hasOwnProperty('y')) updatePos = true;

                for (var attr in obj) {
                    node[attr] = obj[attr];
                }
                nodeDirtyArr.push(obj);

                if (updatePos) {
                    if (this.inEdgesIndex[id] && this.inEdgesIndex[id].length > 0) {
                        this.inEdgesIndex[id].forEach(function (id) {
                            edgeIdArr.push(id);
                            edgeDirtyArr.push({ source: true, target: true });
                        });
                    }

                    if (this.outEdgesIndex[id] && this.outEdgesIndex[id].length > 0) {
                        this.outEdgesIndex[id].forEach(function (id) {
                            edgeIdArr.push(id);
                            edgeDirtyArr.push({ source: true, target: true });
                        });
                    }
                }
            }.bind(this));

            this.emit('change', ['node', ids, nodeDirtyArr]);

            edgeIdArr.length > 0 && this.emit('change', ['edge', edgeIdArr, edgeDirtyArr]);

            // console.timeEnd('setNodeData')
        }
    }, {
        key: 'setEdgeData',
        value: function setEdgeData(ids, objs) {

            if (!_util2.default.isArray(ids)) {
                ids = [ids];
            }

            var objIsArr = _util2.default.isArray(objs);

            var edgeDirtyArr = [];

            ids.forEach(function (id, i) {
                var edge = this.edgesIndex[id];
                var obj = objIsArr ? objs[i] : objs;

                for (var attr in obj) {
                    edge[attr] = obj[attr];
                }
                edgeDirtyArr.push(obj);
            }.bind(this));

            this.emit('change', ['edge', ids, edgeDirtyArr]);
        }

        // updateNodeQuad(id,oldpos){
        //     var nodes = this.quad.point(oldpos.x,oldpos.y);
        //     if(nodes.length > 0){
        //         for(var i = 0,len = nodes.length;i<len;i++){
        //             if(nodes[i].id == id){
        //                 nodes.splice(i,1);
        //                 break;
        //             }
        //         }
        //         this.quad.insert(this.nodesIndex[id],this.quad.root);
        //     }
        // }

    }]);

    return Graph;
}(_EventEmitter3.default);

exports.default = Graph;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

var _Matrix = __webpack_require__(4);

var _Matrix2 = _interopRequireDefault(_Matrix);

var _EventEmitter2 = __webpack_require__(1);

var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);

var _TextureLoader = __webpack_require__(24);

var _TextureLoader2 = _interopRequireDefault(_TextureLoader);

var _TextureText = __webpack_require__(25);

var _TextureText2 = _interopRequireDefault(_TextureText);

var _TextureIcon = __webpack_require__(23);

var _TextureIcon2 = _interopRequireDefault(_TextureIcon);

var _Event = __webpack_require__(12);

var _Event2 = _interopRequireDefault(_Event);

var _tween = __webpack_require__(2);

var _tween2 = _interopRequireDefault(_tween);

var _GLUtil = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mouseType = {
    MOVE: 'move',
    DEFAULT: 'default',
    POINTER: 'pointer'
};

var WebGLRender = function (_EventEmitter) {
    _inherits(WebGLRender, _EventEmitter);

    function WebGLRender(context, container) {
        _classCallCheck(this, WebGLRender);

        //graphView obj
        var _this2 = _possibleConstructorReturn(this, (WebGLRender.__proto__ || Object.getPrototypeOf(WebGLRender)).call(this));

        _this2.context = context;
        //config
        _this2.config = _this2.context.config;

        //dom canvas
        _this2.container = container;
        //graph
        _this2.graph = context.graph;

        //render flag, render when  needUpdate is true;
        _this2.needUpdate = true;
        //sample Ratio,
        _this2.sampleRatio = 1;

        _this2._destroy = false;

        _this2.gl = null;

        //init webgl context and Extension
        _this2.initGl();

        // this.textureLoader = new TextureLoader();
        //manage icon texture for node
        _this2.textureIcon = new _TextureIcon2.default(_this2.config, _this2.gl, 0);
        //manager text texture for node ,edge
        _this2.textureText = new _TextureText2.default(_this2.config, _this2.gl, 1);

        //enum mouse type
        _this2.mouseType = mouseType;

        // matrix from camera coordinate to webgl coordinate[-1 ,1]
        _this2.projectMatrix = null;

        // camera transform info
        _this2.camera = {
            scale: 1, //scale
            positionX: 0, //position x
            positionY: 0, //position y
            rotation: 0 //rotation,(not use now)
        };

        // gl frame buffer to save png(not use now)
        _this2.saveDataFrame = null;
        // gl texture
        _this2.saveDataTex = null;

        /**
         ** render cache for context : graph ,node ,edge. for every node or edge , cache the render data for the
         * relative layers, and if need , the vertex buffer of render layers are composed of the vertex data of the contexts,
         *  the index buffer of render layers  are composed of the index data fo the contexts;
         *
         *  more info look at [updateCacheByData]
         *
         *  layers : relative layers of the context. example : 'node' 'nodeLabel' 'rectNode' for node context.
         *  index : a map that store the layer info for each context, the key is the id of a node or a edge.
         *
         *      vertexStart: the start vertex num at the vertex buffer of render layer,
         *      data.vertices: the vertex data array.
         *      data.indices: the index data array.
         *      oldVertexLength: the len of data.vertices in bytes.
         *      oldIndexLength: the len of data.indices in bytes.
         *
         *  filters : context relative filters
         *
         *  update : data to update
         *
         *  example:
         *  {
         *     node:{
         *       layers:['node','nodeLabel',...]
         *       index:{
         *             'nodeId1':{
         *                      'layername1': {vertexStart:-1,data:{vertices:[...],indices:[...]},oldVertexLength:-1,oldIndexLength:-1}
         *                      .....
         *                  }
         *               ....
         *              }
         *       filters:[filterNodeBySize,....]
         *       }
         *  }
         *
         */
        _this2.renderCache = {
            graph: { layers: [], index: {}, filters: [], update: { map: null, data: null } },
            node: { layers: [], index: {}, filters: [], update: { map: null, data: null } },
            edge: { layers: [], index: {}, filters: [], update: { map: null, data: null } }
        };
        // map for layers ,key is the layer name.
        _this2.renderLayerMap = Object.create(null);

        /**
         * render layer config, default is the WebGLRender.defaultLayersConfig .  more info in file [defaultConfig/index.js]
         * {
         *   mainLayer: {boolean} the main name that the layer belong to.
         *   enable: {boolean} render and update the layer or not
         *   show: {boolean} render the layer or not ,  don't affect update the layer.
         *   needResize: {boolean} need resize the vertex buffer of layer or not
         *   program: {WebGLProgram} the vertex buffer is initialized or not.
         *   tempVertex: temp data for vertex buffer.
         *   tempIndex: temp data for index buffer.
         *   cache:{boolean} vertex buffer cache flag.
         *   indexCache:{boolean} index buffer cache flag.
         *   check:{fun} check the node or the edge will be render at the layer
         *   option:{obj} custom args for the layer, pass to [getRenderData , getUniforms] of the layer render.
         *   filter:{array} layer filters.
         * }
         *
         */
        _this2.renderLayersConfig = _this2.config.renderLayersConfig || WebGLRender.defaultLayersConfig;

        //register events to graph,event 'change' 'add' 'remove' etc.
        _this2.initEvent();

        //init textureIcon for node
        _this2.initIconTexture();

        //init textureText for node label and edge label
        _this2.initTextTexture();

        //init render layers info
        _this2.initRenderLayer();

        // this.updateLayerData();

        // init mouse events
        _Event2.default.call(_this2);

        return _this2;
    }

    _createClass(WebGLRender, [{
        key: 'destroy',
        value: function destroy() {

            this.context = null;

            this.graph = null;

            this.textureIcon.destroy();
            this.textureText.destroy();

            this.container.parentNode.removeChild(this.container);
            this.container = null;

            this.renderCache = null;
            this.renderLayerMap = null;
            this.renderLayersConfig = null;

            this.clearRenderMap();

            this.clearListeners();

            this._destroy = true;
        }

        /**
         * init webgl info
         */

    }, {
        key: 'initGl',
        value: function initGl() {
            //webgl　默认初始化 option
            var option = {
                preserveDrawingBuffer: true,
                premultipliedAlpha: true,
                alpha: true,
                antialias: true
            };

            var canvas = this.container,
                gl;

            gl = canvas.getContext('experimental-webgl', option) || canvas.getContext('webgl', option);

            if (!gl) throw 'browser not support WebGL!';

            //加载　Extension
            gl.getExtension('OES_standard_derivatives');
            gl.getExtension('OES_element_index_uint');

            this.gl = gl;
        }

        /**
         * init event
         */

    }, {
        key: 'initEvent',
        value: function initEvent() {
            var _this = this;
            //graph node or edge 属性改变会触发　change 事件，
            this.graph.on('change', function (type, ids, dirtyAttrs) {
                if (type == 'node') {
                    updateTextureText(dirtyAttrs);
                    _this.updateNodeRenderData(ids, dirtyAttrs);
                } else if (type == 'edge') {
                    updateTextureText(dirtyAttrs);
                    _this.updateEdgeRenderData(ids, dirtyAttrs);
                }
            });

            // clear缓存，重新计算 icon 和　text texture
            this.graph.on('reset', function () {
                _this.clearRenderCache();
                _this.initIconTexture();
                _this.initTextTexture();
            });

            //node or edge 增加时，　需要重新计算cache, 更新text texture.
            this.graph.on('add', function (type, ids) {
                if (!_util2.default.isArray(ids)) ids = [ids];

                var objs = null;

                if (type == 'node') objs = ids.map(function (e) {
                    return _this.graph.nodesIndex[e];
                });else objs = ids.map(function (e) {
                    return _this.graph.edgesIndex[e];
                });

                updateTextureText(objs);
                _this.clearRenderCache();
            });

            // node or edge 移除时，　需要重新计算　index cache
            this.graph.on('remove', function (type, ids) {
                _this.forceRender();
                var contextRelativeLayers = _this.renderCache[type].layers;
                var renderLayerMap = _this.renderLayerMap;

                contextRelativeLayers.forEach(function (layer) {
                    renderLayerMap[layer].indexCache = false; // 重新计算index cache
                });
            });

            //更新 text texture
            function updateTextureText(objs) {
                // debugger
                var addtexts = getAddText(objs);
                if (addtexts.length > 0) {
                    // console.time('updateTextureText');
                    //是否需要　resize text texture
                    if (_this.textureText.needResize(addtexts.length)) {
                        //clear cache
                        _this.clearRenderCache();
                    }
                    //add texts
                    _this.textureText.addTexts(addtexts);
                    _this.textureText.attachGl(_this.gl);
                    // console.timeEnd('updateTextureText');
                }
            }

            function getAddText(objs) {
                var infos = _this.textureText.textinfo.infos;
                var char, len;
                var texts = [];
                var map = {};
                objs.forEach(function (e) {
                    if (!e.label) return;
                    len = e.label.length;
                    for (var i = 0; i < len; i++) {
                        char = e.label.charAt(i);
                        if (!infos[char] && !map[char]) {
                            texts.push(char);
                            map[char] = true;
                        }
                    }
                });

                return texts;
            }
        }

        /**
         * 初始化，text texture, 计算node.label 和　edge.label中的文字。
         */

    }, {
        key: 'initTextTexture',
        value: function initTextTexture() {

            console.time('initTextTexture');

            //clear
            this.textureText.clear();

            var nodes = this.graph.nodes;
            var edges = this.graph.edges;

            // node label
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

            //edge label
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

            // add text
            this.textureText.addTexts(texts);

            console.timeEnd('initTextTexture');
        }

        /**
         * 初始化 icon texture ,计算node.icon 中的 icon
         */

    }, {
        key: 'initIconTexture',
        value: function initIconTexture() {

            //clear
            this.textureIcon.clear();

            var nodes = this.graph.nodes;

            //node icon
            var map = {};
            var icons = [];

            if (this.config.textureIcons && this.config.textureIcons.length > 0) icons = this.config.textureIcons;else {
                nodes.forEach(function (e) {
                    if (e.icon) {
                        if (!map[e.icon]) {
                            map[e.icon] = true;
                            icons.push(e.icon);
                        }
                    }
                });
            }

            //create icon texture
            this.textureIcon.createIcons(icons);
        }

        /**
         * 初始化render layer
         */

    }, {
        key: 'initRenderLayer',
        value: function initRenderLayer() {
            var renderLayerMap = this.renderLayerMap;
            var gl = this.gl;
            var program,
                strip = 0;

            var _this = this;

            this.renderLayersConfig.forEach(function (layer) {

                layer.subLayers.forEach(function (subLayer) {

                    //default value
                    if (subLayer.enable == undefined) subLayer.enable = true;
                    if (subLayer.show == undefined) subLayer.show = true;
                    if (subLayer.option == undefined) subLayer.option = {};
                    if (subLayer.filters == undefined) subLayer.filters = [];

                    //layer map
                    renderLayerMap[subLayer.name] = subLayer;

                    //自定义layer ,没有下面的参数
                    if (subLayer.custom) return;

                    //create WebGLProgram
                    program = (0, _GLUtil.loadProgram)(gl, [(0, _GLUtil.loadShader)(gl, subLayer.render.shaderVert, gl.VERTEX_SHADER), (0, _GLUtil.loadShader)(gl, subLayer.render.shaderFrag, gl.FRAGMENT_SHADER)]);

                    // attributes in shader
                    program.activeAttributes = (0, _GLUtil.getActiveAttributes)(gl, program);
                    // uniforms in shader
                    program.activeUniforms = (0, _GLUtil.getActiveUniforms)(gl, program);

                    //strip of a point in the render layer。
                    strip = subLayer.render.strip;

                    //如果不存在strip ,　从attributes　config 中计算
                    if (!subLayer.render.strip) strip = (0, _GLUtil.calculateStrip)(subLayer.render.attributes);

                    //attributes offset in strip
                    program.offsetConfig = { config: subLayer.render.attributes, strip: strip };
                    program.uniforms = null;
                    //VBO buffer
                    program.vertexBuffer = gl.createBuffer();
                    //IBO buffer
                    program.indexBuffer = gl.createBuffer();
                    //IBO length
                    program.indexN = 0;

                    subLayer.mainLayer = layer.name;
                    subLayer.program = program;
                    subLayer.tempVertex = [];
                    subLayer.tempIndex = [];
                    subLayer.indexCache = false;
                    subLayer.needResize = false;

                    //layer check when create cache
                    if (subLayer.check == undefined) subLayer.check = function () {
                        return true;
                    };

                    _this.renderCache[subLayer.context].layers.push(subLayer.name);
                });
            }.bind(this));
        }
    }, {
        key: 'clearRenderMap',
        value: function clearRenderMap() {
            var renderLayerMap = this.renderLayerMap;
            var gl = this.gl;
            var layer;

            for (var name in renderLayerMap) {
                layer = renderLayerMap[name];

                layer.option = null;
                layer.filters = null;

                if (layer.custom) continue;

                layer.tempVertex = null;
                layer.tempIndex = null;

                layer.program.offsetConfig = null;
                layer.program.activeAttributes = null;
                layer.program.activeUniforms = null;
                layer.program.uniforms = null;

                for (var name1 in layer.program.shaders) {
                    gl.deleteShader(layer.program.shaders[name1]);
                }gl.deleteBuffer(layer.program.vertexBuffer);
                gl.deleteBuffer(layer.program.indexBuffer);

                gl.deleteProgram(layer.program);

                layer.program = null;
            }
        }

        /**
         * prepare the render data and draw
         */

    }, {
        key: 'render',
        value: function render() {

            if (this._destroy || !this.needUpdate) return;

            // resize canvas width and height ,update projectMatrix

            this.resizeCanvas();
            // console.time('render');

            this.updateChange();

            //更新node 相关的render layer的　cache.

            // console.time('updateContextCacheNode');
            this.updateContextCache('node');
            // console.timeEnd('updateContextCacheNode');

            //更新edge 相关的render layer的　cache.

            // console.time('updateContextCacheEdge');
            this.updateContextCache('edge');
            // console.timeEnd('updateContextCacheEdge');

            //计算uniforms

            // console.time('updateLayerUniformData');
            this.updateLayerUniformData();
            // console.timeEnd('updateLayerUniformData');

            //resize vertex buffer(VBO).

            // console.time('resizeLayerVertexData');
            this.resizeLayerVertexData('node');
            this.resizeLayerVertexData('edge');
            // console.timeEnd('resizeLayerVertexData');

            //update index buffer(IBO)
            this.updateLayerIndex('node'); //node first
            this.updateLayerIndex('edge');

            // console.time('draw');
            try {
                this.draw();
            } catch (e) {
                console.error(e);
            }

            // console.timeEnd('draw');
            // console.timeEnd('render');

            this.needUpdate = false;
        }

        /**
         * set default render flags
         */

    }, {
        key: '_setFlag',
        value: function _setFlag() {
            var gl = this.gl;
            // gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
            gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
            // gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA,gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
            gl.enable(gl.BLEND);
            gl.disable(gl.DEPTH_TEST);
        }
    }, {
        key: '_clear',
        value: function _clear() {
            var gl = this.gl;
            var bgColor = _util2.default.parseColor(this.config.defaultBackgroundColor);
            gl.clearColor(bgColor.r / 255, bgColor.g / 255, bgColor.b / 255, bgColor.a / 255);

            //clear viewport
            gl.clear(gl.COLOR_BUFFER_BIT);
        }

        /**
         * draw layer data
         */

    }, {
        key: 'draw',
        value: function draw() {

            var mainLayer, subLayers, layer, gl, err, renderLayerMap, program;
            renderLayerMap = this.renderLayerMap;

            gl = this.gl;
            //clear

            this._clear();

            //emit event
            this.emit('renderBefore', [this]);

            for (var i = 0; i < this.renderLayersConfig.length; i++) {

                mainLayer = this.renderLayersConfig[i];
                subLayers = mainLayer.subLayers;

                //for each layer
                for (var j = 0; j < subLayers.length; j++) {

                    this._setFlag();

                    layer = subLayers[j].name;

                    if (!subLayers[j].enable || !subLayers[j].show) continue;

                    //custom render
                    if (subLayers[j].custom && subLayers[j].render) {
                        subLayers[j].render.call(subLayers[j], this, subLayers[j].option);
                        continue;
                    }

                    //WebGLProgram
                    program = renderLayerMap[layer].program;

                    if (program.indexN == 0) continue;

                    //call renderBefore if exist
                    if (subLayers[j].render.renderBefore && _util2.default.isFunction(subLayers[j].render.renderBefore)) {
                        subLayers[j].render.renderBefore.call(subLayers[j], this, subLayers[j].option);
                    }

                    //gl call, use program
                    gl.useProgram(program);

                    //bind VBO IBO
                    gl.bindBuffer(gl.ARRAY_BUFFER, program.vertexBuffer);
                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, program.indexBuffer);

                    //set attributes offset and enable attributes location
                    if (err = (0, _GLUtil.vertexAttribPointer)(gl, program.activeAttributes, program.offsetConfig)) {
                        throw new Error('render layer[ ' + layer + ' ] err:\n ' + err);
                    }

                    //set uniform values
                    if (err = (0, _GLUtil.setUniforms)(gl, program.activeUniforms, program.uniforms)) {
                        throw new Error('render layer[ ' + layer + ' ] err:\n ' + err);
                    }

                    //draw data
                    gl.drawElements(gl.TRIANGLES, program.indexN, gl.UNSIGNED_INT, 0);

                    //call renderAfter if exist
                    if (subLayers[j].render.renderAfter && _util2.default.isFunction(subLayers[j].render.renderAfter)) {
                        subLayers[j].render.renderAfter.call(subLayers[j], this, subLayers[j].option);
                    }

                    //clear bind status
                    gl.bindBuffer(gl.ARRAY_BUFFER, null);
                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
                }
            }

            //emit event
            this.emit('renderAfter', [this]);

            // console.log('render count:',num);
        }

        /**
         * update change
         */

    }, {
        key: 'updateChange',
        value: function updateChange() {

            //update node
            var update, id, map;
            update = this.renderCache.node.update;
            if (update.data && update.data.length > 0) {
                map = update.map;
                for (id in map) {
                    this.updateCacheByData('node', this.graph.nodesIndex[id], map[id]);
                }update.data = null;
                update.map = null;
            }

            //update edge
            update = this.renderCache.edge.update;
            if (update.data && update.data.length > 0) {
                map = update.map;
                for (id in map) {
                    this.updateCacheByData('edge', this.graph.edgesIndex[id], map[id]);
                }update.data = null;
                update.map = null;
            }
        }

        /**
         * add change
         */

    }, {
        key: 'addChange',
        value: function addChange(context, id, changeData) {
            if (context != 'node' && context != 'edge' && context != 'graph') return;

            var map, data, temp;
            if (context === 'graph') {
                //reserve
            } else {
                map = this.renderCache[context].update.map = this.renderCache[context].update.map || Object.create(null);
                data = this.renderCache[context].update.data = this.renderCache[context].update.data || [];

                if (!map[id]) map[id] = temp = {}, data.push(temp);else temp = map[id];

                for (var attr in changeData) {
                    temp[attr] = changeData[attr];
                }
            }
        }

        /**
         * 计算cache chunk,
         * @param context : node ,edge ,graph etc;
         * @param data: a node or a edge obj,
         * @param dirtyAttr : changed attributes
         * @param needUpdateLayers : need update layers
         */

    }, {
        key: 'updateCacheByData',
        value: function updateCacheByData(context, data, dirtyAttr, needUpdateLayers) {

            var cacheIndex, temp, points, startBytes, strip;
            var contextRelativeLayers = this.renderCache[context].layers;
            var renderLayerMap = this.renderLayerMap;
            var gl = this.gl;

            //index map
            cacheIndex = this.renderCache[context].index[data.id] = this.renderCache[context].index[data.id] || {};

            needUpdateLayers = needUpdateLayers || contextRelativeLayers;

            //update cache
            needUpdateLayers.forEach(function (layer) {

                if (!renderLayerMap[layer].check(data) || !renderLayerMap[layer].enable) return;

                //dirtyAttr setData update,ignore update cache ,
                if (dirtyAttr && !renderLayerMap[layer].cache) return;

                //calculate cache
                temp = renderLayerMap[layer].render.getRenderData({
                    dirtyAttr: dirtyAttr, //dirty attributes
                    oldData: cacheIndex[layer] ? cacheIndex[layer].data : null, //cache data, 可以看情况复用
                    data: data, //a node or a edge
                    config: this.config,
                    graph: this.graph,
                    textureText: this.textureText,
                    option: renderLayerMap[layer].option, //custom  args
                    // textureLoader: this.textureLoader,
                    textureIcon: this.textureIcon
                });

                strip = renderLayerMap[layer].program.offsetConfig.strip;

                //cache 有效时，进行局部更新
                if (renderLayerMap[layer].cache) {
                    //updateNodeRenderData　updateEdgeRenderData　进行局部更新　主要执行这一部分

                    //no data
                    if (!temp) {
                        if (cacheIndex[layer].data) {
                            //need update index cache;
                            renderLayerMap[layer].indexCache = false;
                            cacheIndex[layer].data = null;
                        }
                        return;
                    }

                    //vertex size 和上一次不一致的时候，会resize vertex buffer
                    if (renderLayerMap[layer].needResize || temp && temp.vertices.length !== cacheIndex[layer].oldVertexLength) {
                        renderLayerMap[layer].indexCache = false;
                        renderLayerMap[layer].needResize = true; //set resize flag
                        cacheIndex[layer].data = temp;
                        cacheIndex[layer].oldVertexLength = temp.vertices.length;
                        cacheIndex[layer].oldIndexLength = temp.indices.length;
                    } else {

                        //每个float占4个bytes
                        startBytes = cacheIndex[layer].vertexStart * strip * 4; //float 4 bytes

                        //bind vertex buffer,局部更新vertex buffer data
                        gl.bindBuffer(gl.ARRAY_BUFFER, renderLayerMap[layer].program.vertexBuffer);
                        gl.bufferSubData(gl.ARRAY_BUFFER, startBytes, new Float32Array(temp.vertices));

                        cacheIndex[layer].data = temp;

                        //如果indices size 和　上一次不一致，需要更新index buffer
                        if (temp.indices.length !== cacheIndex[layer].oldIndexLength) renderLayerMap[layer].indexCache = false;
                    }
                } else {
                    //cache　无效时，　把数据保存到　temp array.

                    //updateContextCache 主要执行这一部分

                    //temp array中的point数
                    points = renderLayerMap[layer].tempVertex.length / strip;

                    /**
                     * chunk info
                     * vertexStart: 这个vertex chunk在vertex buffer中的第几个point，
                     * oldVertexLength: vertex chunk size，
                     * oldIndexLength: index chunk size，
                     */
                    cacheIndex[layer] = { vertexStart: -1, data: null, oldVertexLength: -1, oldIndexLength: -1 };

                    if (!temp) return;

                    //检查chunk中point 属性长度是否一致
                    if (!_util2.default.isInteger(temp.vertices.length / strip)) throw new Error('points num not bound to a integer');

                    cacheIndex[layer].data = temp; //cache old data
                    cacheIndex[layer].vertexStart = points;
                    cacheIndex[layer].oldVertexLength = temp.vertices.length;
                    cacheIndex[layer].oldIndexLength = temp.indices.length;

                    //add vertex chunk to temp array
                    temp.vertices.forEach(function (e) {
                        renderLayerMap[layer].tempVertex.push(e);
                    });
                }
            }.bind(this));
        }

        /**
         * 计算context 相关layer的cache.
         * @param context : node ,edge ,graph etc.
         */

    }, {
        key: 'updateContextCache',
        value: function updateContextCache(context) {
            if (context != 'node' && context != 'edge' && context != 'graph') return;

            var datas, contextRelativeLayers, needUpdateLayers;
            var gl = this.gl;
            var renderLayerMap = this.renderLayerMap;

            if (context === 'graph') {
                //reserve
            } else {

                //寻找需要计算cache　的layers
                needUpdateLayers = [];
                contextRelativeLayers = this.renderCache[context].layers;
                contextRelativeLayers.forEach(function (layer) {
                    if (!renderLayerMap[layer].cache && renderLayerMap[layer].enable) needUpdateLayers.push(layer);
                });

                if (needUpdateLayers.length < 1) return;

                datas = context == 'node' ? this.graph.nodes : this.graph.edges;
                for (var i = 0, len = datas.length; i < len; i++) {
                    //create cache for a node or a edge
                    this.updateCacheByData(context, datas[i], null, needUpdateLayers);
                }

                //创建vertex buffer 从 temp array
                needUpdateLayers.forEach(function (layer) {

                    //bind and crate buffer
                    gl.bindBuffer(gl.ARRAY_BUFFER, renderLayerMap[layer].program.vertexBuffer);
                    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(renderLayerMap[layer].tempVertex), gl.DYNAMIC_DRAW);

                    //set flag
                    renderLayerMap[layer].cache = true;

                    renderLayerMap[layer].tempVertex = [];
                    // renderLayerMap[layer].tempIndex = [];
                });
            }
        }

        /**
         * resize layer vertex buffer,
         * @param context
         */

    }, {
        key: 'resizeLayerVertexData',
        value: function resizeLayerVertexData(context) {
            if (context != 'node' && context != 'edge' && context != 'graph') return;

            var datas, contextRelativeLayers, cacheIndex;
            var data, needResizeLayer, points, strip, vertexLen;
            var gl = this.gl;
            var renderLayerMap = this.renderLayerMap;

            if (context === 'graph') {} else {
                datas = context == 'node' ? this.graph.nodes : this.graph.edges;
                contextRelativeLayers = this.renderCache[context].layers;

                //find need resize vertex layers
                needResizeLayer = [];
                contextRelativeLayers.forEach(function (layer) {
                    if (renderLayerMap[layer].needResize) {
                        needResizeLayer.push(layer);
                        renderLayerMap[layer].tempVertex = [];
                        renderLayerMap[layer].tempIndex = [];
                    }
                });

                if (needResizeLayer.length > 0) {
                    for (var i = 0, len = datas.length; i < len; i++) {
                        data = datas[i];

                        cacheIndex = this.renderCache[context].index[data.id];

                        //create temp array data from vertex chunk
                        for (var layer in cacheIndex) {
                            if (!renderLayerMap[layer].needResize) continue;

                            strip = renderLayerMap[layer].program.offsetConfig.strip;
                            points = renderLayerMap[layer].tempVertex.length / strip; //points in tempVertex
                            vertexLen = cacheIndex[layer].oldVertexLength; //vertex len

                            //当data 为null时候　，oldVertexLength > 0，说明上一次这个chunk有数据，暂时保留chunk的位置，初始化为０
                            if (vertexLen > 0) {
                                cacheIndex[layer].vertexStart = points;
                                for (var j = 0; j < vertexLen; j++) {
                                    renderLayerMap[layer].tempVertex.push(cacheIndex[layer].data ? cacheIndex[layer].data.vertices[j] : 0 //no data fill with 0
                                    );
                                }
                            }
                        }
                    }

                    //创建vertex buffer 从 temp array
                    needResizeLayer.forEach(function (layer) {

                        gl.bindBuffer(gl.ARRAY_BUFFER, renderLayerMap[layer].program.vertexBuffer);
                        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(renderLayerMap[layer].tempVertex), gl.DYNAMIC_DRAW);

                        renderLayerMap[layer].cache = true;
                        renderLayerMap[layer].needResize = false;

                        renderLayerMap[layer].tempVertex = [];
                        // renderLayerMap[layer].tempIndex = [];
                    });
                }
            }
        }

        /**
         * update index buffer.
         * @param context : node ,edge ,graph etc.
         */

    }, {
        key: 'updateLayerIndex',
        value: function updateLayerIndex(context) {
            if (context != 'node' && context != 'edge' && context != 'graph') return;

            var datas, contextRelativeLayers, cacheIndex, data, needUpdateLayer, check, startPoint;
            var gl = this.gl;
            var renderLayerMap = this.renderLayerMap;

            if (context === 'graph') {
                //reserve
                //todo
            } else {
                datas = context == 'node' ? this.graph.nodes : this.graph.edges;
                contextRelativeLayers = this.renderCache[context].layers;

                //find need update layers
                needUpdateLayer = [];
                contextRelativeLayers.forEach(function (layer) {
                    if (!renderLayerMap[layer].indexCache) needUpdateLayer.push(layer);
                });

                if (needUpdateLayer.length > 0) {
                    for (var i = 0, len = datas.length; i < len; i++) {
                        data = datas[i];

                        cacheIndex = this.renderCache[context].index[data.id];

                        //如果contex是edge的时候，edge的source,target中一个别过滤了，这条edge也会被过滤。
                        if (context == 'edge') {
                            if (this.graph.nodesIndex[data.source].filter || this.graph.nodesIndex[data.target].filter) {
                                data.filter = true;
                                continue;
                            }
                        }

                        //context filters
                        if (this.renderCache[context].filters && this.renderCache[context].filters.length) {
                            if (data.filter = this._checkFilters(this.renderCache[context].filters, data)) continue;
                        } else data.filter = false;

                        //crate temp array from index chunk data
                        for (var layer in cacheIndex) {
                            if (renderLayerMap[layer].indexCache || !cacheIndex[layer].data) continue;

                            //layer filters
                            if (renderLayerMap[layer].filters && renderLayerMap[layer].filters.length) {
                                if (check = this._checkFilters(renderLayerMap[layer].filters, data)) continue;
                            }

                            startPoint = cacheIndex[layer].vertexStart;

                            cacheIndex[layer].data.indices.forEach(function (id) {
                                renderLayerMap[layer].tempIndex.push(id + startPoint);
                            });
                        }
                    }

                    //crate index buffer from temp array
                    needUpdateLayer.forEach(function (layer) {
                        //bind and create buffer
                        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, renderLayerMap[layer].program.indexBuffer);
                        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(renderLayerMap[layer].tempIndex), gl.STATIC_DRAW);
                        renderLayerMap[layer].program.indexN = renderLayerMap[layer].tempIndex.length;
                        renderLayerMap[layer].tempIndex = [];
                        renderLayerMap[layer].indexCache = true; //set flag
                    });
                }
            }
        }

        /**
         * calculate uniforms every render frame.
         */

    }, {
        key: 'updateLayerUniformData',
        value: function updateLayerUniformData() {
            var uniforms, err;
            var renderLayerMap = this.renderLayerMap;

            for (var layer in renderLayerMap) {
                if (renderLayerMap[layer].custom) continue;
                uniforms = renderLayerMap[layer].render.getUniforms({
                    matrix: _Matrix2.default.multiMatrix([this.getCameraMatrix(true), this.projectMatrix]), //matrix transform from camera to gl
                    camera: this.camera, //camera info
                    config: this.config,
                    option: renderLayerMap[layer].option, //custom args
                    sampleRatio: this.sampleRatio,
                    textureText: this.textureText,
                    textureIcon: this.textureIcon
                    // textureLoader: this.textureLoader,
                });

                if (err = (0, _GLUtil.checkAttrValid)(renderLayerMap[layer].program.activeUniforms, uniforms)) {
                    throw err.join('\n');
                }

                renderLayerMap[layer].program.uniforms = uniforms;
            }
        }

        /**
         * 局部更新node data
         * @param ids: node ids
         * @param dirtyAttrs: dirty attributes
         */

    }, {
        key: 'updateNodeRenderData',
        value: function updateNodeRenderData(ids, dirtyAttrs) {

            if (!_util2.default.isArray(ids)) ids = [ids];
            if (!_util2.default.isArray(dirtyAttrs)) dirtyAttrs = [dirtyAttrs];

            this.forceRender();

            ids.forEach(function (id, i) {
                // this.updateCacheByData('node',this.graph.nodesIndex[id],dirtyAttrs[i]);
                this.addChange('node', id, dirtyAttrs[i]);
            }.bind(this));
        }

        /**
         * 局部更新edge data
         * @param ids: edge ids
         * @param dirtyAttrs: dirty attributes
         */

    }, {
        key: 'updateEdgeRenderData',
        value: function updateEdgeRenderData(ids, dirtyAttrs) {
            if (!Array.isArray(ids)) ids = [ids];
            if (!Array.isArray(dirtyAttrs)) dirtyAttrs = [dirtyAttrs];

            this.forceRender();

            ids.forEach(function (id, i) {
                // this.updateCacheByData('edge',this.graph.edgesIndex[id],dirtyAttrs[i]);
                this.addChange('edge', id, dirtyAttrs[i]);
            }.bind(this));
        }

        /**
         * clear layer cache, if layers omitted, clear all layer cache.
         * @param layers {string | [string]} :  layer name.
         */

    }, {
        key: 'clearRenderCache',
        value: function clearRenderCache(layers) {
            this.forceRender();
            var _this = this;
            if (layers) {
                if (!_util2.default.isArray(layers)) layers = [layers];
                layers.forEach(function (layer) {
                    if (_this.renderLayerMap[layer].custom) return;

                    _this.renderLayerMap[layer].cache = false;
                    _this.renderLayerMap[layer].needResize = false;
                    _this.renderLayerMap[layer].indexCache = false;
                    _this.renderLayerMap[layer].program.indexN = 0;
                });
            } else {
                for (var layer in _this.renderLayerMap) {
                    if (_this.renderLayerMap[layer].custom) continue;

                    _this.renderLayerMap[layer].cache = false;
                    _this.renderLayerMap[layer].needResize = false;
                    _this.renderLayerMap[layer].indexCache = false;
                    _this.renderLayerMap[layer].program.indexN = 0;
                }
                _this.renderCache.graph.index = {};
                _this.renderCache.node.index = {};
                _this.renderCache.edge.index = {};
            }
        }

        /**
         *  disable layer，disable之后，不会render，layer data也不会更新
         * @param layers {string | [string]}
         */

    }, {
        key: 'disableRenderLayer',
        value: function disableRenderLayer(layers) {
            this.forceRender();

            var renderLayerMap = this.renderLayerMap;

            if (!_util2.default.isArray(layers)) layers = [layers];

            layers.forEach(function (layer) {
                if (renderLayerMap[layer]) {
                    renderLayerMap[layer].enable = false;
                }
            });
        }

        /**
         *  enable layer，enable之后，layer cache 会重新计算一次
         * @param layers {string | [string]}
         */

    }, {
        key: 'enableRenderLayer',
        value: function enableRenderLayer(layers) {
            this.forceRender();

            var renderLayerMap = this.renderLayerMap;

            if (!_util2.default.isArray(layers)) layers = [layers];

            layers.forEach(function (layer) {
                if (renderLayerMap[layer]) {
                    renderLayerMap[layer].enable = true;
                    renderLayerMap[layer].cache = false;
                    renderLayerMap[layer].indexCache = false;
                    renderLayerMap[layer].program.indexN = 0;
                }
            });
        }

        /**
         * hide layer, 不会render　layer ,　但是layer cache data 会更新
         * @param layers {string | [string]}
         */

    }, {
        key: 'hideRenderLayer',
        value: function hideRenderLayer(layers) {
            this.forceRender();

            var renderLayerMap = this.renderLayerMap;

            if (!_util2.default.isArray(layers)) layers = [layers];
            layers.forEach(function (layer) {
                if (renderLayerMap[layer]) {
                    renderLayerMap[layer].show = false;
                }
            });
        }

        /**
         * show layer
         * @param layers {string | [string]}
         */

    }, {
        key: 'showRenderLayer',
        value: function showRenderLayer(layers) {
            this.forceRender();

            var renderLayerMap = this.renderLayerMap;

            if (!_util2.default.isArray(layers)) layers = [layers];
            layers.forEach(function (layer) {
                if (renderLayerMap[layer]) {
                    renderLayerMap[layer].show = true;
                }
            });
        }

        /**
         * 对layer 触发一次layer filter 更新，重新计算index buffer
         * @param layers {string | [string]}
         */

    }, {
        key: 'updateByLayerFilter',
        value: function updateByLayerFilter(layers) {
            if (!layers) return;

            this.forceRender();

            var renderLayerMap = this.renderLayerMap;
            if (!_util2.default.isArray(layers)) layers = [layers];

            layers.forEach(function (layer) {
                if (!renderLayerMap[layer]) return;
                renderLayerMap[layer].indexCache = false;
            });
        }

        /**
         * 对 context 相关的layer触发一次更新，重新计算index buffer
         * @param context
         */

    }, {
        key: 'updateByContextFilter',
        value: function updateByContextFilter(context) {
            var contextRelativeLayers = this.renderCache[context].layers;
            var renderLayerMap = this.renderLayerMap;

            this.forceRender();

            contextRelativeLayers.forEach(function (layer) {
                renderLayerMap[layer].indexCache = false;
            });
        }

        /**
         * set layer filter
         * @param layer {string}
         * @param filters {[fun]}
         */

    }, {
        key: 'setLayerFilters',
        value: function setLayerFilters(layer, filters) {
            var renderLayerMap = this.renderLayerMap;
            if (!renderLayerMap[layer]) return;

            this.forceRender();
            filters = filters || [];

            if (!_util2.default.isArray(filters)) filters = [filters];

            renderLayerMap[layer].indexCache = false;
            renderLayerMap[layer].filters = filters;
        }

        /**
         * get layer filter
         * @param layer
         */

    }, {
        key: 'getLayerFilters',
        value: function getLayerFilters(layer) {
            return this.renderLayerMap[layer] ? this.renderLayerMap[layer].filters : null;
        }

        /**
         * set context filter
         * @param context
         * @param filters
         */

    }, {
        key: 'setContextFilters',
        value: function setContextFilters(context, filters) {
            this.forceRender();
            filters = filters || [];

            if (!_util2.default.isArray(filters)) filters = [filters];

            var renderLayerMap = this.renderLayerMap;
            var contextRelativeLayers = this.renderCache[context].layers;

            contextRelativeLayers.forEach(function (layer) {
                renderLayerMap[layer].indexCache = false;
            });

            this.renderCache[context].filters = filters;
        }

        /**
         * get context filter
         * @param context
         * @returns {null}
         */

    }, {
        key: 'getContextFilters',
        value: function getContextFilters(context) {
            return this.renderCache[context] ? this.renderCache[context].filters : null;
        }

        /**
         * set layer custom args
         * @param layer
         * @param option
         */

    }, {
        key: 'setLayerOption',
        value: function setLayerOption(layer, option) {
            var renderLayerMap = this.renderLayerMap;
            if (!renderLayerMap[layer]) return;

            this.forceRender();

            for (var attr in option) {
                renderLayerMap[layer].option[attr] = option[attr];
            }
        }

        /**
         * set mouse type
         * @param type
         */

    }, {
        key: 'setMouseType',
        value: function setMouseType(type) {
            // if(mouseType[type]){
            this.container.style.cursor = type;
            // }
        }

        /**
         * get camera matrix ,
         * @param isInvert
         * @returns {*}
         */

    }, {
        key: 'getCameraMatrix',
        value: function getCameraMatrix(isInvert) {
            var mat = _Matrix2.default.multiMatrix([_Matrix2.default.matrixFromScale(this.camera.scale, this.camera.scale), _Matrix2.default.matrixFromRotation(this.camera.rotation), _Matrix2.default.matrixFromTranslate(this.camera.positionX, this.camera.positionY)]);
            return isInvert ? _Matrix2.default.invert(mat) : mat;
        }

        /**
         * resize render canvas and set viewport , update  projectMatrix
         * @private
         */

    }, {
        key: 'resizeCanvas',
        value: function resizeCanvas() {
            var canvas;
            var multiplier = this.sampleRatio;
            canvas = this.container;
            var width = canvas.clientWidth * multiplier | 0;
            var height = canvas.clientHeight * multiplier | 0;
            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width;
                canvas.height = height;
                this.gl.viewport(0, 0, canvas.width, canvas.height);
            }
            this.projectMatrix = _Matrix2.default.matrixFromScale(2 / this.container.clientWidth, 2 / this.container.clientHeight);
        }

        /**
         * translate point from graph to camera
         * @param pos obj {x:number,y:number}
         * @returns {{x: number, y: number}}
         */

    }, {
        key: 'graphToDomPos',
        value: function graphToDomPos(pos) {
            var container = this.container;
            var camPos = _Matrix2.default.transformPoint([pos.x, pos.y], this.getCameraMatrix(true));
            return { x: camPos[0] + container.clientWidth / 2, y: container.clientHeight / 2 - camPos[1] };
        }

        /**
         * translate point from dom to camera
         * @param pos obj {x:number,y:number}
         * @returns {{x: number, y: number}}
         */

    }, {
        key: 'domToCameraPos',
        value: function domToCameraPos(pos) {
            var container = this.container;
            return { x: pos.x - container.clientWidth / 2, y: container.clientHeight / 2 - pos.y };
        }

        /**
         * translate point from dom to camera
         * @param pos obj {x:number,y:number}
         * @returns {{x: number, y: number}}
         */

    }, {
        key: 'cameraToGraphPos',
        value: function cameraToGraphPos(pos, isVector) {
            var p = isVector ? _Matrix2.default.rotateVector([pos.x, pos.y], this.getCameraMatrix()) : _Matrix2.default.transformPoint([pos.x, pos.y], this.getCameraMatrix());
            return { x: p[0], y: p[1] };
        }

        /**
         * force render
         */

    }, {
        key: 'forceRender',
        value: function forceRender() {
            this.needUpdate = true;
        }

        /**
         * zoom from a point
         * @private
         * @param ratio
         * @param x
         * @param y
         * @param animation
         */

    }, {
        key: 'zoomFromPosition',
        value: function zoomFromPosition(ratio, x, y, animation) {
            // debugger

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
                this.zoomTo({
                    positionX: positionX,
                    positionY: positionY,
                    scale: newscale
                }, animation);
            } else {
                this.camera.positionX = positionX;
                this.camera.positionY = positionY;
                this.camera.scale = newscale;
            }
        }

        /**
         * zoom camera info
         * @param option
         * @param duration
         */

    }, {
        key: 'zoomTo',
        value: function zoomTo(option, duration) {
            _tween2.default.removeByType('camera');

            var _this = this;
            if (duration) {
                new _tween2.default(this.camera, 'camera').to(option).duration(duration).on('change', function () {
                    _this.forceRender();
                });
            } else {
                for (var attr in option) {
                    this.camera[attr] = option[attr];
                }this.forceRender();
            }
        }
    }, {
        key: 'saveData',
        value: function saveData() {
            // debugger
            var gl = this.gl;

            this.sampleRatio = 16;
            var width = this.container.clientWidth * this.sampleRatio;
            var height = this.container.clientHeight * this.sampleRatio;

            this.gl.viewport(0, 0, width, height);

            if (!this.saveDataFrame) {
                this.saveDataFrame = gl.createFramebuffer();
                gl.bindFramebuffer(gl.FRAMEBUFFER, this.saveDataFrame);
                this.saveDataTex = gl.createTexture();
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, this.saveDataTex);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

                gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.saveDataTex, 0);
                gl.bindTexture(gl.TEXTURE_2D, null);
            }

            gl.bindFramebuffer(gl.FRAMEBUFFER, this.saveDataFrame);
            this.render();
            var pixels = new Uint8Array(width * height * 4);
            gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
            // console.log(pixels);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);

            this.sampleRatio = 1;
            this.gl.viewport(0, 0, this.container.clientWidth, this.container.clientHeight);

            var canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            var ctx = canvas.getContext('2d');
            var imageData = ctx.createImageData(width, height);
            for (var i = 0, len = imageData.data.length; i < len; i++) {
                imageData.data[i] = pixels[i];
            }ctx.putImageData(imageData, 0, 0);

            canvas.toBlob(function (blob) {
                saveAs(blob, "test.png");
            });
        }

        /**
         * check filter
         * @private
         */

    }, {
        key: '_checkFilters',
        value: function _checkFilters(filters, data) {
            var filter = false;
            for (var i = 0; i < filters.length; i++) {
                if (filter = filters[i](data)) break;
            }
            return filter;
        }
    }]);

    return WebGLRender;
}(_EventEmitter3.default);

exports.default = WebGLRender;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = " precision mediump float;\n\nvarying vec2 v_texCoord;\nvarying float size;\nvarying vec4 label_color;\n\n\nuniform sampler2D u_image;\nuniform vec4 u_text_bg;\nuniform float u_camera_scale;\n\n\nvoid main() {\n    vec4 color = label_color / 255.0;\n    vec4 color_bg = u_text_bg/255.0;\n\n\n    float cutoff = 0.76;\n    float offset = 6.0/size * u_camera_scale;\n\n    offset = pow(offset,1.2);\n\n    offset = min((1.0-cutoff),offset);\n\n   float dist = texture2D(u_image, v_texCoord).r;\n   float alpha = smoothstep(cutoff - offset, cutoff + offset, dist);\n//   gl_FragColor = color *alpha;\n   gl_FragColor = mix(color_bg,color,alpha);\n}"

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = "attribute vec2 a_position;\nattribute vec2 a_uv;\nattribute float a_size;\nattribute vec4 a_color;\n\nuniform mat3 u_matrix;\nuniform sampler2D u_image;\n\n\nvarying vec2 v_texCoord;\nvarying vec4 label_color;\nvarying float size;\n\nvoid main() {\ngl_Position = vec4((u_matrix*vec3(a_position,1)).xy,0,1);\nv_texCoord = a_uv;\nsize = a_size;\nlabel_color = a_color;\n}\n"

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Graph = __webpack_require__(5);

var _Graph2 = _interopRequireDefault(_Graph);

var _render2 = __webpack_require__(6);

var _render3 = _interopRequireDefault(_render2);

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

var _tween = __webpack_require__(2);

var _tween2 = _interopRequireDefault(_tween);

var _Selection = __webpack_require__(13);

var _Selection2 = _interopRequireDefault(_Selection);

var _index = __webpack_require__(21);

var _index2 = _interopRequireDefault(_index);

var _config = __webpack_require__(14);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Core = function () {
    function Core(option) {
        _classCallCheck(this, Core);

        option = option || {};

        this.container = option.container;

        this.config = _util2.default.extend(option.config || {}, _config2.default);

        this.graph = option.graph ? option.graph : new _Graph2.default({
            nodes: option.nodes,
            edges: option.edges
        });

        this.debug = false;
        this._destroy = false;

        this.canvas = {};
        this.initCanvas();

        this.render = new _render3.default(this, this.canvas.render);

        this.selection = new _Selection2.default(this, this.canvas.mouse);

        this.on = this.render.on.bind(this.render);
        this.off = this.render.off.bind(this.render);

        this._start();

        this._initEvent();
    }

    _createClass(Core, [{
        key: 'destroy',
        value: function destroy() {

            if (this._destroy) return;

            this.graph.clear();
            this.graph.clearListeners();

            this.render.destroy();

            this.selection.destroy();

            this._destroy = true;
        }
    }, {
        key: 'initCanvas',
        value: function initCanvas() {

            this.container.style.position = 'relative';
            this.canvas.render = this.createElement('canvas');
            this.container.appendChild(this.canvas.render);

            this.canvas.mouse = this.createElement('canvas');
            this.canvas.mouse.style.display = 'none';
            this.canvas.mouse.style.cursor = 'crosshair';

            this.container.appendChild(this.canvas.mouse);
        }
    }, {
        key: 'createElement',
        value: function createElement(tag) {
            var ele = document.createElement(tag);
            ele.style.position = 'absolute';
            ele.style.left = '0px';
            ele.style.top = '0px';
            ele.style.width = '100%';
            ele.style.height = '100%';
            ele.style.border = 'none';
            ele.width = this.container.clientWidth;
            ele.height = this.container.clientHeight;

            ele.oncontextmenu = function (e) {
                e.preventDefault();
                return false;
            };

            return ele;
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
                        _this.debug && console.log('frames:' + n);
                        n = -1;
                        start = time;
                    }
                };
            }

            function render(time) {

                if (_this.render._destroy) return;

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
            if (this.render) {
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
            this.render.on('nodeMouseDown', function (node, e) {
                // debugger
                if (!_this.selection.isNodeSelected(node.id)) _this.selection.selectNodes(node.id, e.shiftKey);else if (e.shiftKey) _this.selection.unSelectNode(node.id);
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
            _tween2.default.removeByType('camera');
            option = option || this.getFitOptions(this.graph.nodes);
            this.render.zoomTo(option, duration);
        }
    }, {
        key: 'makeLayout',
        value: function makeLayout(type, option, cb) {
            option = option || {};

            var _this = this;
            var layout, data;
            var layoutConfig = Core.layout;

            var nodes = option.nodes;
            var duration = option.duration;
            var center = option.center;
            var fit = option.fit;

            _tween2.default.removeByType('layout');

            var edges = null;
            if (nodes == null) {
                nodes = this.graph.nodes;
                edges = this.graph.edges;
            } else {
                edges = getEdges(nodes);
            }

            if (!type || type == 'preset') {
                this.graph.nodes.forEach(function (e) {
                    if (!('x' in e)) e.x = Math.random() * _this.render.gl.clientWidth;
                    if (!('y' in e)) e.y = Math.random() * _this.render.gl.clientWidth;
                });
                this.render.clearRenderCache();
            } else if (layout = layoutConfig[type]) {

                layout = new layoutConfig[type]();
                data = layout.layout(nodes, edges, option);

                if (center) {
                    var bbox = _util2.default.getBBox(nodes);
                    var bbox1 = _util2.default.getBBox(data);

                    var offsetX = bbox.x + bbox.w / 2 - (bbox1.x + bbox1.w / 2);
                    var offsetY = bbox.y + bbox.h / 2 - (bbox1.y + bbox1.h / 2);

                    data.forEach(function (e) {
                        e.x += offsetX;
                        e.y += offsetY;
                    });
                }

                if (duration) {
                    new _tween2.default(nodes, 'layout').to(data).duration(duration).on('change', function (t) {
                        nodes.forEach(function (node) {
                            _this.graph.setNodeData(node.id, { x: node.x, y: node.y });
                        });
                    }).on('end', cb);

                    fit && this.fit(duration, this.getFitOptions(data));
                } else {
                    data.forEach(function (node, i) {
                        _this.graph.setNodeData(nodes[i].id, { x: node.x, y: node.y });
                    });
                    fit && this.fit(null, this.getFitOptions(data));
                    cb && cb();
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _render = __webpack_require__(6);

var _render2 = _interopRequireDefault(_render);

var _render3 = __webpack_require__(33);

var _render4 = _interopRequireDefault(_render3);

var _render5 = __webpack_require__(34);

var _render6 = _interopRequireDefault(_render5);

var _NodeLabel = __webpack_require__(31);

var _NodeLabel2 = _interopRequireDefault(_NodeLabel);

var _render7 = __webpack_require__(29);

var _render8 = _interopRequireDefault(_render7);

var _render9 = __webpack_require__(28);

var _render10 = _interopRequireDefault(_render9);

var _EdgeLabel = __webpack_require__(30);

var _EdgeLabel2 = _interopRequireDefault(_EdgeLabel);

var _render11 = __webpack_require__(32);

var _render12 = _interopRequireDefault(_render11);

var _index = __webpack_require__(27);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_render2.default.node = {};
_render2.default.edge = {};
_render2.default.nodeLabel = {};
_render2.default.edgeLabel = {};

_render2.default.node.default = _render4.default;
_render2.default.node.rect = _render6.default;

_render2.default.nodeLabel.default = _NodeLabel2.default;

_render2.default.edge.default = _render8.default;
_render2.default.edge.curve = _render10.default;

_render2.default.edgeLabel.default = _EdgeLabel2.default;
_render2.default.edgeLabel.curve = _render12.default;

(0, _index2.default)(_render2.default);

exports.default = _render2.default;

/***/ }),
/* 11 */
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = initEvent;

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function initEvent() {

    var _this = this;
    var mouseDown = false,
        mouseMove = false,
        disableMove = false,

    //over info
    overInfo = {
        currentNode: null,
        currentEdge: null
    };
    var config = _this.context.config;

    _this.context.overInfo = overInfo;

    var events = {
        // click:handlerWrap(_clickHandler),
        mousemove: handlerWrap(_moveHandler),
        mousedown: handlerWrap(_downHandler),
        mouseup: handlerWrap(_upHandler),
        mousewheel: handlerWrap(_wheelHandler),
        DOMMouseScroll: handlerWrap(_wheelHandler) };

    for (var e in events) {
        this.container.addEventListener(e, events[e], false);
    } //custom simulate click event
    events.click = handlerWrap(_clickHandler);

    //some little situation maybe need the trigger function.
    this.trigger = function (type, event) {
        if (events[type]) events[type](event);
    };

    //handler
    function _clickHandler(e) {
        var graphPos = _this.cameraToGraphPos({ x: e.cameraX, y: e.cameraY });
        var edge, node;

        node = getNode(graphPos);
        if (node) {
            _this.emit('nodeClick', [node, e]);
        } else if (config.enableEdgeEvent && (edge = getEdge(graphPos))) {
            _this.emit('edgeClick', [edge, e]);
        } else {
            _this.emit('stageClick', [e]);
        }
    }

    function _downHandler(e) {

        disableDocSelect();

        //right click

        if (!mouseLeft(e)) return;

        mouseDown = true;
        disableMove = true;

        var graphPos = _this.cameraToGraphPos({ x: e.cameraX, y: e.cameraY });
        var node = getNode(graphPos);
        var nodeSelected = node ? _this.context.selection.isNodeSelected(node.id) : false;

        handleDrag(!node);
        // _this.forceRender();

        function handleDrag(isCamera) {
            var moveFlag = false;
            var startx = graphPos.x,
                starty = graphPos.y;

            if (!isCamera) {
                _this.emit('nodeMouseDown', [node, e]);
            }

            var onmousemove = docPosToRelativePos(_this.container, handlerWrap(function (e) {

                if (!isCamera && !moveFlag) {
                    _this.emit('nodeDragStart', [node, e]);
                    moveFlag = true;
                }

                _this.forceRender();

                var graphPos = _this.cameraToGraphPos({ x: e.cameraX, y: e.cameraY }),
                    temp;
                var offsetx = graphPos.x - startx;
                var offsety = graphPos.y - starty;

                if (isCamera) {
                    _this.camera.positionX -= offsetx;
                    _this.camera.positionY -= offsety;
                    _this.setMouseType(_this.mouseType.MOVE);
                } else {

                    if (nodeSelected) {
                        _this.context.selection.data.nodes.forEach(function (id) {
                            temp = _this.context.graph.nodesIndex[id];
                            _this.graph.setNodeData(id, { x: temp.x + offsetx, y: temp.y + offsety });
                        });
                    } else _this.graph.setNodeData(node.id, { x: node.x + offsetx, y: node.y + offsety });

                    // fit(e);
                }

                if (isCamera) {
                    var newgraphPos = _this.cameraToGraphPos({ x: e.cameraX, y: e.cameraY });
                    startx = newgraphPos.x;
                    starty = newgraphPos.y;
                } else {
                    startx = graphPos.x;
                    starty = graphPos.y;
                }
                // console.timeEnd('move')
            }));

            var onmouseup = docPosToRelativePos(_this.container, handlerWrap(function (e) {

                if (!isCamera && moveFlag) _this.emit('nodeDragEnd', [node, e]);

                moveFlag = false;

                clear();
            }));

            document.addEventListener('mousemove', onmousemove);
            document.addEventListener('mouseup', onmouseup);

            function clear() {
                // _this.setMouseType(_this.mouseType.DEFAULT);
                onmousemove && document.removeEventListener('mousemove', onmousemove);
                onmouseup && document.removeEventListener('mouseup', onmouseup);

                onmouseup = onmousemove = null;

                disableMove = false;
            }
        }
    }

    function _moveHandler(e) {
        if (mouseDown) mouseMove = true;

        if (disableMove || !_this.config.enableOverEvent) return;

        var graphPos = _this.cameraToGraphPos({ x: e.cameraX, y: e.cameraY });
        var node = getNode(graphPos);
        var old;

        if (node && node !== overInfo.currentNode) {
            old = overInfo.currentNode;
            overInfo.currentNode = node;

            if (old) _this.emit('nodeOut', [old, e]);
            if (overInfo.currentEdge) {
                old = overInfo.currentEdge;
                overInfo.currentEdge = null;
                _this.emit('edgeOut', [old, e]);
            }
            _this.emit('nodeOver', [node, e]);
        } else if (!node && overInfo.currentNode) {
            old = overInfo.currentNode;
            overInfo.currentNode = null;
            _this.emit('nodeOut', [old, e]);
        }

        var edge;
        if (!node && config.enableEdgeEvent) {
            edge = getEdge(graphPos);
            if (edge && edge !== overInfo.currentEdge) {
                old = overInfo.currentEdge;
                overInfo.currentEdge = edge;

                if (old) _this.emit('edgeOut', [old, e]);
                _this.emit('edgeOver', [edge, e]);
            } else if (!edge && overInfo.currentEdge) {
                old = overInfo.currentEdge;
                overInfo.currentEdge = null;
                _this.emit('edgeOut', [old, e]);
            }
        }

        if (node || edge) {
            _this.setMouseType(_this.mouseType.POINTER);
        } else {
            _this.setMouseType(_this.mouseType.DEFAULT);
        }
    }

    function _upHandler(e) {

        //no move ,simulate click event
        if (mouseDown && !mouseMove && mouseLeft(e)) {
            _clickHandler(e);
        }

        if (mouseRight(e)) {
            var graphPos = _this.cameraToGraphPos({ x: e.cameraX, y: e.cameraY });
            var node = getNode(graphPos);
            var edge;
            if (node) {
                _this.emit('nodeRightClick', [node, e]);
            } else if (config.enableEdgeEvent && (edge = getEdge(graphPos))) {
                _this.emit('edgeRightClick', [edge, e]);
            } else {
                _this.emit('stageRightClick', [e]);
            }
        }

        mouseDown = false;
        mouseMove = false;
    }

    function _wheelHandler(e) {
        var value = e.wheelDelta !== undefined && e.wheelDelta || e.detail !== undefined && -e.detail;

        if (value == 0) return; // Mac OS maybe -0;


        _this.forceRender();
        var ratio = _this.config.zoomRatio;

        if (value > 0) {
            _this.zoomFromPosition(1 / ratio, e.cameraX, e.cameraY);
            _this.emit('zoom', [1 / ratio, _this.camera.scale, e]);
        } else {
            _this.zoomFromPosition(ratio, e.cameraX, e.cameraY);
            _this.emit('zoom', [ratio, _this.camera.scale, e]);
        }
    }

    //to camera pos
    function handlerWrap(handle) {
        return function (e) {

            if (!config.enableMouseEvent) return;

            var pos = _this.domToCameraPos({ x: e.offsetX, y: e.offsetY });
            e.cameraX = pos.x;
            e.cameraY = pos.y;
            handle(e);
        };
    }

    function docPosToRelativePos(dom, handle) {
        return function (e) {
            var bbox = dom.getBoundingClientRect();
            var newEvent = Object.create(null);

            for (var attr in e) {
                if (e.hasOwnProperty(attr)) newEvent[attr] = e[attr];
            }newEvent.offsetX = e.clientX - bbox.left;
            newEvent.offsetY = e.clientY - bbox.top;

            handle(newEvent);
        };
    }

    function disableDocSelect() {
        var oldOnSelect = document.onselectstart;
        document.onselectstart = function () {
            return false;
        };

        document.addEventListener('mouseup', onMouseUp);

        function onMouseUp() {
            document.onselectstart = oldOnSelect;
            document.removeEventListener('mouseup', onMouseUp);
        }
    }

    //default check function
    function defaultNodeCheck(posx, posy, node) {
        var check = false;
        var dis, sizeX, sizeY, size;
        if (node.type == 'rect') {
            sizeX = _util2.default.getNodeSizeX(node) || config.defaultNodeSize;
            sizeY = _util2.default.getNodeSizeY(node) || config.defaultNodeSize;
            check = _util2.default.inRect(posx, posy, node.x - sizeX, node.y - sizeY, sizeX * 2, sizeY * 2);
        } else {
            dis = _util2.default.getDistance(posx, posy, node.x, node.y);
            size = node.size || config.defaultNodeSize;
            check = dis <= size;
        }
        return check;
    }
    function defaultEdgeCheck(posx, posy, edge) {
        var check = false;
        var source = _this.graph.nodesIndex[edge.source];
        var target = _this.graph.nodesIndex[edge.target];
        var ctrolP;

        //line
        if (edge.curveCount == 0) {
            check = _util2.default.inLine(posx, posy, source.x, source.y, target.x, target.y, (edge.size || config.defaultEdgeSize) / 2);
        } else {
            //curve
            // debugger
            ctrolP = _util2.default.getControlPos(source.x, source.y, target.x, target.y, edge.curveCount, edge.curveOrder);
            check = _util2.default.isPointOnQuadraticCurve(posx, posy, source.x, source.y, target.x, target.y, ctrolP[0], ctrolP[1], (edge.size || config.defaultEdgeSize) / 2);
        }

        return check;
    }

    function checkInNode(posx, posy, node) {
        if (_this.context.customNodeCheck && _util2.default.isFunction(_this.context.customNodeCheck)) {
            return _this.context.customNodeCheck(posx, posy, node, defaultNodeCheck);
        } else return defaultNodeCheck(posx, posy, node);
    }
    function checkInEdge(posx, posy, edge) {
        if (_this.context.customEdgeCheck && _util2.default.isFunction(_this.context.customEdgeCheck)) {
            return _this.context.customEdgeCheck(posx, posy, edge, defaultEdgeCheck);
        } else return defaultEdgeCheck(posx, posy, edge);
    }

    function getNode(pos) {
        // console.time('getNode')
        var nodes = _this.graph.nodes;

        var node, dis, check;
        var findNode = null;

        var selectNodes = _this.context.selection.getNodes();

        var context = _this.renderCache.node;

        if (selectNodes.length > 0) {
            for (var i = selectNodes.length - 1; i >= 0; i--) {
                node = selectNodes[i];

                if (node.filter) continue;

                if (checkInNode(pos.x, pos.y, node)) {
                    findNode = node;
                    break;
                }
            }
        }

        if (!findNode && nodes.length > 0) {
            for (var i = nodes.length - 1; i >= 0; i--) {
                node = nodes[i];

                if (node.filter) continue;

                if (checkInNode(pos.x, pos.y, node)) {
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
        var edge, check;

        var context = _this.renderCache.edge;

        if (edges.length > 0) {
            for (var i = edges.length - 1; i >= 0; i--) {
                edge = edges[i];

                if (edge.filter) continue;

                if (checkInEdge(pos.x, pos.y, edge)) {
                    findEdge = edge;
                    break;
                }
            }
        }
        // console.timeEnd('getEdge')
        return findEdge;
    }

    function mouseLeft(e) {
        return e.which && e.which == 1 || e.button && e.button == 0;
    }
    function mouseRight(e) {
        return e.which && e.which == 3 || e.button && e.button == 2;
    }
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



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

    function Selection(context, canvas) {
        _classCallCheck(this, Selection);

        var _this2 = _possibleConstructorReturn(this, (Selection.__proto__ || Object.getPrototypeOf(Selection)).call(this));

        _this2.context = context;

        _this2.canvas = canvas;
        _this2.ctx = _this2.canvas.getContext('2d');

        _this2._mouseDownHandler = _this2.mouseDown.bind(_this2);
        _this2.canvas.addEventListener('mousedown', _this2._mouseDownHandler);

        _this2.flag = 0; // 0 rect 1 path
        _this2.rect = null;
        _this2.path = null;

        _this2.data = {
            edges: [],
            nodes: []
        };

        _this2.initGraphEvent();
        return _this2;
    }

    _createClass(Selection, [{
        key: 'destroy',
        value: function destroy() {
            this.context = null;

            this.canvas.removeEventListener('mousedown', this._mouseDownHandler);
            this.canvas.parentNode.removeChild(this.canvas);
            this.canvas = null;

            this.ctx = null;

            this.rect = null;
            this.path = null;

            this.data = null;
        }
    }, {
        key: 'enable',
        value: function enable() {
            var flag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;


            this.flag = flag;

            this.canvas.style.display = 'block';
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }, {
        key: 'render',
        value: function render() {

            var ctx = this.ctx;
            var config = this.context.config;
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            ctx.fillStyle = config.selectionFillStyle;
            ctx.strokeStyle = config.selectionStrokeStyle;
            ctx.beginPath();

            if (this.flag == 0) {
                var rect = this.rect;
                ctx.rect(rect.x, rect.y, rect.w, rect.h);
            } else if (this.flag == 1) {
                var first = this.path[0];
                ctx.moveTo(first.x, first.y);
                for (var i = 1; i < this.path.length; i++) {
                    ctx.lineTo(this.path[i].x, this.path[i].y);
                }
            }

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
            var map, dataType;
            this.context.graph.on('remove', function (type, ids) {
                dataType = type == 'node' ? 'nodes' : 'edges';
                if (_util2.default.isArray(ids) && ids.length > 1) {
                    map = {};
                    ids.forEach(function (id) {
                        map[id] = true;
                    });
                    _this.data[dataType] = _this.data[dataType].filter(function (id) {
                        return !map[id];
                    });
                } else {
                    ids = _util2.default.isArray(ids) ? ids[0] : ids;
                    for (var i = 0; i < _this.data[dataType].length; i++) {
                        if (_this.data[dataType][i] == ids) {
                            _this.data[dataType].splice(i, 1);
                            break;
                        }
                    }
                }
            });

            this.context.graph.on('reset', function () {
                _this.data = {
                    edges: [],
                    nodes: []
                };
            });
        }
    }, {
        key: 'mouseDown',
        value: function mouseDown(e) {
            var _this = this;

            if (this.flag == 0) {
                this.rect = { x: 0, y: 0, w: 0, h: 0 };
                this.rect.x = e.offsetX;
                this.rect.y = e.offsetY;
            } else if (this.flag == 1) {
                this.path = [];
                this.path.push({ x: e.offsetX, y: e.offsetY });
            }

            _this.emit('selectStart', [_this]);

            document.addEventListener('mousemove', mouseMove);
            document.addEventListener('mouseup', mouseUp);
            function mouseMove(e) {

                if (_this.flag == 0) {
                    _this.rect.w = e.offsetX - _this.rect.x;
                    _this.rect.h = e.offsetY - _this.rect.y;
                } else if (_this.flag == 1) {
                    _this.path.push({ x: e.offsetX, y: e.offsetY });
                }

                _this.render();
            }
            function mouseUp(e) {
                mouseMove(e);

                document.removeEventListener('mousemove', mouseMove);
                document.removeEventListener('mouseup', mouseUp);
                var nodesid = _this.filterNodes(_this.ctx);

                _this.disable();
                _this.selectNodes(nodesid);
                _this.emit('selectEnd', [_this]);
            }
        }
    }, {
        key: 'selectNodes',
        value: function selectNodes(nodesid, isAdd) {
            var sendMsg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

            var _this = this;

            if (!_util2.default.isArray(nodesid)) nodesid = [nodesid];

            if (isAdd) {
                nodesid.forEach(function (id) {
                    _this.context.graph.setNodeData(id, { selected: true });
                    _this.data.nodes.push(id);
                });
            } else {

                _this.data.nodes.forEach(function (id) {
                    if (_this.context.graph.nodesIndex[id]) _this.context.graph.setNodeData(id, { selected: false });
                });

                nodesid.forEach(function (id) {
                    _this.context.graph.setNodeData(id, { selected: true });
                });

                _this.data.nodes = nodesid;
            }

            sendMsg && _this.emit('select', ['node', _this.getNodes()]);
        }
    }, {
        key: 'selectEdges',
        value: function selectEdges(edgesid, isAdd) {
            var sendMsg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

            var _this = this;

            if (!_util2.default.isArray(edgesid)) edgesid = [edgesid];

            if (isAdd) {
                edgesid.forEach(function (id) {
                    _this.context.graph.setEdgeData(id, { selected: true });
                    _this.data.edges.push(id);
                });
            } else {

                _this.data.edges.forEach(function (id) {
                    if (_this.context.graph.edgesIndex[id]) _this.context.graph.setEdgeData(id, { selected: false });
                });

                edgesid.forEach(function (id) {
                    _this.context.graph.setEdgeData(id, { selected: true });
                });

                _this.data.edges = edgesid;
            }

            sendMsg && _this.emit('select', ['edge', _this.getEdges()]);
        }
    }, {
        key: 'unSelectNode',
        value: function unSelectNode(nodesid) {

            if (this.data.nodes.length == 0 || !nodesid) return;

            var _this = this;
            if (!_util2.default.isArray(nodesid)) nodesid = [nodesid];

            var map = {};

            nodesid.forEach(function (id) {
                map[id] = true;
            });

            var newSelected = [];
            this.data.nodes.forEach(function (id) {
                if (map[id]) _this.context.graph.setNodeData(id, { selected: false });else newSelected.push(id);
            });

            this.data.nodes = newSelected;

            _this.emit('select', ['node', _this.getNodes()]);
        }
    }, {
        key: 'unSelectEdge',
        value: function unSelectEdge(edgesid) {

            if (this.data.edges.length == 0 || !edgesid) return;

            var _this = this;
            if (!_util2.default.isArray(edgesid)) edgesid = [edgesid];

            var map = {};

            edgesid.forEach(function (id) {
                map[id] = true;
            });

            var newSelected = [];
            this.data.edges.forEach(function (id) {
                if (map[id]) _this.context.graph.setEdgeData(id, { selected: false });else newSelected.push(id);
            });

            this.data.edges = newSelected;

            _this.emit('select', ['edge', _this.getEdges()]);
        }
    }, {
        key: 'getNodes',
        value: function getNodes() {
            var _this3 = this;

            return this.data.nodes.map(function (id) {
                return _this3.context.graph.nodesIndex[id];
            });
        }
    }, {
        key: 'getEdges',
        value: function getEdges() {
            var _this4 = this;

            return this.data.edges.map(function (id) {
                return _this4.context.graph.edgesIndex[id];
            });
        }
    }, {
        key: 'isNodeSelected',
        value: function isNodeSelected(id) {
            var nodes = this.data.nodes;
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i] == id) {
                    return true;
                }
            }
            return false;
        }
    }, {
        key: 'isEdgeSelected',
        value: function isEdgeSelected(id) {
            var edges = this.data.edges;
            for (var i = 0; i < edges.length; i++) {
                if (edges[i] == id) {
                    return true;
                }
            }
            return false;
        }
    }, {
        key: 'filterNodes',
        value: function filterNodes(ctx) {
            var nodes = this.context.graph.nodes;
            var selects = [];
            var domPos;
            nodes.forEach(function (node) {
                domPos = this.context.render.graphToDomPos({ x: node.x, y: node.y });
                if (ctx.isPointInPath(domPos.x, domPos.y)) selects.push(node.id);
            }.bind(this));

            return selects;
        }
    }, {
        key: 'delete',
        value: function _delete(type) {
            var _this = this;

            var clearNode = type === 'node';
            var clearEdge = type === 'edge';

            if (!type) {
                clearEdge = true;
                clearNode = true;
            }

            if (clearNode) {
                var nodes = this.data.nodes;
                this.data.nodes = [];
                nodes.forEach(function (id) {
                    _this.context.graph.removeNode(id);
                });
            }

            if (clearEdge) {
                var edges = this.data.edges;
                this.data.edges = [];
                edges.forEach(function (id) {
                    _this.context.graph.removeEdge(id);
                });
            }
        }
    }]);

    return Selection;
}(_EventEmitter3.default);

exports.default = Selection;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {

    //default
    defaultBackgroundColor: '#ffffff',
    defaultTextBgColor: 'rgba(0,0,0,0)',
    defaultNodeSelectedBorder: '#d4525f',
    defaultEdgeSelectedColor: '#d4525f',

    // node
    defaultNodeSize: 10,
    defaultNodeColor: "#3a82a8",
    defaultNodeIconColor: "#ffffff",
    defaultNodeLabelColor: "#474d57",

    //edge
    defaultEdgeColor: "rgba(100,100,100,0.3)",
    defaultEdgeSize: 1.6,
    defaultEdgeArrowSize: 5,
    defaultEdgeLabelColor: "#474d57",

    zoomRatio: 1.2,
    zoomMin: 0.05,
    zoomMax: 20,

    textureIconWidth: 1024,
    textureIconHeight: 1024,
    textureIconFontFamily: 'FontAwesome',

    textureTextFontFamily: 'Arial',
    textureTextWidth: 1024,
    textureTextHeight: 1024,

    enableMouseEvent: true,
    enableOverEvent: true,
    enableEdgeEvent: true,
    enableSelectEdge: false,

    //selection
    selectionFillStyle: 'rgba(58, 75, 89, 0.3)',
    selectionStrokeStyle: '#4b7598'
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultConfig = {
    width: 40
};

function CircularLayout() {
    this.nodes = null;
    // this.links = null;
    this.posSet = null;
    this.depthPosSet = null;
    this.drawnBiComps = null;
    this.bc = null;
    this.nodeHeights = {};
    this.node2BiComp = {};

    this.width = defaultConfig.width;
}

var p = CircularLayout.prototype;

//必须有的方法
p.layout = function (nodes, edges, option, cb) {

    option = option || {};

    if (option.width) this.width = option.width;

    this.init(nodes, edges);

    this.posSet = new Array(this.nodes.length);
    this.depthPosSet = new Array(this.nodes.length);

    this.bc = this.createBicconnects();
    // var test = this.bc.filter(function (e) {
    //     return e.length > 3;
    // });

    if (!this.bc) {
        console.log('layout err');
        return null;
    }

    this.__layout(this.bc);

    var data = this.nodes.map(function (e) {
        return { x: e.x || 0, y: e.y || 0 };
    });

    // if(cb){
    //     cb(null,data);
    // }

    return data;
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
    var totalN = 0;

    pre[0] = -1;
    var num = 0;
    for (var i = 0; i < this.nodes.length; i++) {
        states[i] = 0;
    }

    dfs(0);

    return totalN == nodes.length ? biComponents : null;

    function dfs(current) {
        totalN++;
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
                    /*singleComponent.length > 2 && */
                    biComponents.push(singleComponent);
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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultConfig = {
    BBox: [1000, 1000],
    linkDistance: 10,
    initIterations: 20,
    userIterations: 0,
    allIterations: 2
};

var ColaLayout = function () {
    function ColaLayout() {
        _classCallCheck(this, ColaLayout);
    }

    _createClass(ColaLayout, [{
        key: 'layout',
        value: function layout(nodes, edges, option) {
            if (!cola || !cola.Layout) throw 'please add cola lib first';

            option = option || {};

            this.option = _util2.default.extend(option, defaultConfig);

            this.cola = new cola.Layout().convergenceThreshold(1e-4).size(this.option.BBox);

            var data = this._init(nodes, edges);

            this.cola.nodes(data.nodes).links(data.edges).symmetricDiffLinkLengths(this.option.linkDistance).start(this.option.initIterations, this.option.userIterations, this.option.allIterations, 0, false);

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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultConfig = {
    rankdir: 'TB',
    nodesep: 10,
    ranksep: 40,
    ranker: 'longest-path' //network-simplex  longest-path tight-tree
};

var DargeLayout = function () {
    function DargeLayout() {
        _classCallCheck(this, DargeLayout);
    }

    _createClass(DargeLayout, [{
        key: 'layout',
        value: function layout(nodes, edges, option) {
            // debugger
            if (!dagre || !dagre.graphlib) throw 'please add dagre lib first';
            var g = new dagre.graphlib.Graph();

            this.option = _util2.default.extend(option || {}, defaultConfig);

            g.setGraph(this.option);

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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultConfig = {
    BBox: [1000, 1000],
    flowAxis: 'y',
    flowSeparation: 30,
    linkDistance: 30,
    initIterations: 10,
    userIterations: 0,
    allIterations: 2
};

var FlowLayout = function () {
    function FlowLayout() {
        _classCallCheck(this, FlowLayout);
    }

    _createClass(FlowLayout, [{
        key: 'layout',
        value: function layout(nodes, edges, option) {
            if (!cola || !cola.Layout) throw 'please add cola lib first';

            option = option || {};

            this.option = _util2.default.extend(option, defaultConfig);

            this.cola = new cola.Layout().convergenceThreshold(1e-4).size(this.option.BBox);

            var data = this._init(nodes, edges);

            this.cola.nodes(data.nodes).links(data.edges).flowLayout(this.option.flowAxis, this.option.flowSeparation).symmetricDiffLinkLengths(this.option.linkDistance).start(this.option.initIterations, this.option.userIterations, this.option.allIterations, 0, false);

            return data.nodes.map(function (e) {
                return { x: e.x, y: -1 * e.y };
            });
        }
    }, {
        key: '_init',
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
        key: '_filterEdge',
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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultConfig = {
    forceManyBody: -50,
    forceLink: 100,
    forceCollide: 20,
    iterations: 100
};

function id(d) {
    return d.id;
}

var ForceD3Layout = function () {
    function ForceD3Layout() {
        _classCallCheck(this, ForceD3Layout);
    }

    _createClass(ForceD3Layout, [{
        key: 'layout',
        value: function layout(nodes, edges, option) {
            if (!d3 || !d3.forceSimulation) throw 'please add d3 lib first';

            this.option = _util2.default.extend(option || {}, defaultConfig);

            var data = this._init(nodes, edges);

            this.simulation = d3.forceSimulation(data.nodes).force("charge", d3.forceManyBody(this.option.forceManyBody)).force("link", d3.forceLink(data.edges).id(id).distance(this.option.forceLink)).force("collide", d3.forceCollide(this.option.forceCollide)).force("center", d3.forceCenter());

            this.simulation.stop();

            var n = this.option.iterations;
            while (n--) {
                this.simulation.tick();
            }return data.nodes.map(function (e) {
                return { x: e.x, y: e.y };
            });
        }
    }, {
        key: '_init',
        value: function _init(_nodes, _edges) {
            var nodes = [];
            var edges = [];
            _nodes.forEach(function (e, i) {
                nodes.push({
                    id: e.id
                });
            });

            _edges.forEach(function (e, i) {
                edges.push({
                    source: e.source,
                    target: e.target
                });
            });

            return {
                nodes: nodes,
                edges: edges
            };
        }
    }]);

    return ForceD3Layout;
}();

exports.default = ForceD3Layout;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultConfig = {
    offsetX: 50,
    offsetY: 50
};

var Grid = function () {
    function Grid() {
        _classCallCheck(this, Grid);
    }

    _createClass(Grid, [{
        key: 'layout',
        value: function layout(_nodes, _edges, option) {

            var nodes = [];

            this.option = _util2.default.extend(option || {}, defaultConfig);

            var width = this.option.offsetX;
            var height = this.option.offsetY;

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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _CircularLayout = __webpack_require__(15);

var _CircularLayout2 = _interopRequireDefault(_CircularLayout);

var _ColaLayout = __webpack_require__(16);

var _ColaLayout2 = _interopRequireDefault(_ColaLayout);

var _FlowLayout = __webpack_require__(18);

var _FlowLayout2 = _interopRequireDefault(_FlowLayout);

var _DargeLayout = __webpack_require__(17);

var _DargeLayout2 = _interopRequireDefault(_DargeLayout);

var _ForceD3Layout = __webpack_require__(19);

var _ForceD3Layout2 = _interopRequireDefault(_ForceD3Layout);

var _Grid = __webpack_require__(20);

var _Grid2 = _interopRequireDefault(_Grid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by chengang on 17-2-20.
 */

exports.default = {
    circular: _CircularLayout2.default,
    d3force: _ForceD3Layout2.default,
    cola: _ColaLayout2.default,
    flow: _FlowLayout2.default,
    darge: _DargeLayout2.default,
    grid: _Grid2.default
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = TextSDF;
var INF = 1e20;

function TextSDF(fontSize, buffer, radius, cutoff, fontFamily) {
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

    this.cache = {
        map: {},
        len: 0
    };
}

TextSDF.prototype.draw = function (char) {
    var cache = this.cache;

    if (cache.map[char]) return cache.map[char];

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

    var data = {
        data: imgData,
        charWidth: charSize + this.buffer * 2
    };

    this.addCache(char, data);

    return data;
};

TextSDF.maxCacheSize = 1024;

TextSDF.prototype.addCache = function (key, data) {
    var maxSize = TextSDF.maxCacheSize;
    var cache = this.cache;
    if (cache.len < maxSize && !cache.map[key]) {
        cache.map[key] = data;
        cache.len++;
    }
};

TextSDF.prototype.clearCache = function () {
    var cache = this.cache;
    cache.len = 0;
    cache.map = {};
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
/* 23 */
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

    function TextureIcon(config, gl, unit) {
        _classCallCheck(this, TextureIcon);

        var _this = _possibleConstructorReturn(this, (TextureIcon.__proto__ || Object.getPrototypeOf(TextureIcon)).call(this));

        _this.gl = gl;
        _this.unit = unit || 0;

        _this.textureIconWidth = config.textureIconWidth;
        _this.textureIconHeight = config.textureIconHeight;

        _this.fontSize = 60;
        _this.fontFamily = config.textureIconFontFamily;

        _this.border = 2;
        _this.width = 70; //char width
        _this.height = 80;
        _this.startx = _this.border + _this.width / 2;
        _this.starty = _this.border + _this.height / 2;

        _this.canvas = null;
        _this.iconinfo = null;
        _this.icons = [];
        _this.iconsToCreate = [];

        _this.texture = null;

        _this.fontLoaded = true;

        _this._init();
        return _this;
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

            this.attachGl();

            // document.body.appendChild(this.canvas);
            // this.updateGPUTexture();
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
        key: 'attachGl',
        value: function attachGl() {

            var gl = this.gl;

            gl.activeTexture(gl.TEXTURE0 + this.unit);
            this.createTexture(this.icons.length == 0);
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

            if (!this.texture) this.texture = gl.createTexture();

            gl.activeTexture(gl.TEXTURE0 + this.unit);
            gl.bindTexture(gl.TEXTURE_2D, this.texture);

            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

            if (empty) gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 4, 4, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);else gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.iconinfo.img);
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
    }, {
        key: 'destroy',
        value: function destroy() {

            if (this.texture) this.gl.deleteTexture(this.texture);

            this.ctx = null;
            this.gl = null;
            this.canvas = null;
            this.iconinfo = null;
            this.icons = [];
            this.iconsToCreate = [];
            this.texture = null;
        }
    }]);

    return TextureIcon;
}(_EventEmitter3.default);

exports.default = TextureIcon;

/***/ }),
/* 24 */
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

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextureLoader = function (_EventEmitter) {
    _inherits(TextureLoader, _EventEmitter);

    function TextureLoader() {
        _classCallCheck(this, TextureLoader);

        var _this = _possibleConstructorReturn(this, (TextureLoader.__proto__ || Object.getPrototypeOf(TextureLoader)).call(this));

        _this.cache = {};
        _this.textures = [];
        // this.defaultTexture = this.createTexture();
        _this.texturesIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        // this.updateGPUTexture();
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
        key: 'attachGl',
        value: function attachGl(gl) {
            this.defaultTexture = this.createTexture(gl);
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
        value: function createTexture(gl, img) {
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
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EventEmitter2 = __webpack_require__(1);

var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);

var _TextSDF = __webpack_require__(22);

var _TextSDF2 = _interopRequireDefault(_TextSDF);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextureText = function (_EventEmitter) {
    _inherits(TextureText, _EventEmitter);

    function TextureText(config, gl, unit) {
        _classCallCheck(this, TextureText);

        var _this = _possibleConstructorReturn(this, (TextureText.__proto__ || Object.getPrototypeOf(TextureText)).call(this));

        _this.border = 2;

        _this.gl = gl;

        _this.unit = unit || 1;
        _this.fontSize = 48;
        _this.fontFamily = config.textureTextFontFamily;

        _this.textureTextWidth = config.textureTextWidth;
        _this.textureTextHeight = config.textureTextHeight;

        _this.canvas = null;
        _this.textinfo = null;
        _this.texture = null;

        _this.startx = _this.border;
        _this.starty = _this.border;

        _this.texts = [];

        _this.sdf = new _TextSDF2.default(_this.fontSize, _this.fontSize / 8, _this.fontSize / 3, null, _this.fontFamily);

        _this.init();

        // test();
        return _this;
    }

    _createClass(TextureText, [{
        key: 'init',
        value: function init() {
            this.canvas = document.createElement('canvas');
            this.ctx = this.canvas.getContext("2d");
            this.resize(this.textureTextWidth, this.textureTextHeight);
        }
    }, {
        key: 'resize',
        value: function resize(width, height) {
            var ctx = this.ctx;
            this.canvas.width = width;
            this.canvas.height = height;

            ctx.fillStyle = "#000000";
            ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            ctx.font = 'bold ' + this.fontSize + 'px ' + this.fontFamily;
            ctx.textAlign = "left";
            ctx.textBaseline = "top";
            ctx.fillStyle = "#ff0000";

            this.textinfo = {
                fontSize: this.fontSize,
                img: this.canvas,
                width: this.canvas.width,
                height: this.canvas.height,
                infos: {}
            };

            this.startx = this.border;
            this.starty = this.border;

            this.texts = [];
        }
    }, {
        key: 'needResize',
        value: function needResize(num) {
            var width = this.canvas.width;
            var height = this.canvas.height;

            var size = this.sdf.size + 2;

            //leave column of no use in y
            var leaveNumY = Math.floor((height - this.starty - size - this.border) / size);
            //num of char in a row
            var numN = Math.floor((width - 2 * this.border) / size);
            // total num
            var leaveNum = leaveNumY * numN /*+ (width - this.startx - this.border) / this.sdf.size*/;

            return leaveNum <= num;
        }
    }, {
        key: 'getSize',
        value: function getSize(totalN) {
            var width = this.canvas.width;
            var height = this.canvas.height;
            var numY, numN, totalNum;
            var size = this.sdf.size + 2;

            do {
                if (width <= height) width *= 2;else height *= 2;

                numY = Math.floor((height - 2 * this.border) / size);
                numN = Math.floor((width - 2 * this.border) / size);
                totalNum = numY * numN;
            } while (totalNum < totalN);

            return { width: width, height: height };
        }
    }, {
        key: 'addTexts',
        value: function addTexts(texts) {

            if (!texts || texts.length < 1) return;

            var oldTexts, resizeInfo;
            if (this.needResize(texts.length)) {
                oldTexts = this.texts;
                // debugger
                resizeInfo = this.getSize(texts.length + this.texts.length);
                this.resize(resizeInfo.width, resizeInfo.height);

                texts.forEach(function (e) {
                    return oldTexts.push(e);
                });

                texts = oldTexts;
            }

            var c = this.canvas;
            var ctx = this.ctx;

            var startx = this.startx;
            var starty = this.starty;
            var infos = this.textinfo.infos,
                charWidth,
                data;

            for (var i = 0; i < texts.length; i++) {

                if (this.textinfo && infos[texts[i]]) continue;

                data = this.sdf.draw(texts[i]);
                charWidth = data.charWidth;

                if (startx + charWidth > c.width) {
                    startx = this.border;
                    starty += this.sdf.size;
                    if (starty + this.sdf.size > this.canvas.height) console.error('texture text height err');
                }

                ctx.putImageData(data.data, startx, starty, 0, 0, charWidth, this.sdf.size);

                infos[texts[i]] = {
                    uvs: [startx / c.width, starty / c.height, (startx + charWidth) / c.width, (starty + this.sdf.size) / c.height],
                    width: charWidth / this.sdf.size
                };

                this.texts.push(texts[i]);

                startx += charWidth;
            }

            this.startx = startx;
            this.starty = starty;

            // document.body.appendChild(c);
            // c.style.position = 'absolute';
            // c.style.top = '100px';

            this.attachGl();
        }
    }, {
        key: 'attachGl',
        value: function attachGl() {
            var gl = this.gl;

            gl.activeTexture(gl.TEXTURE0 + this.unit);
            this.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
        }
    }, {
        key: 'createTexture',
        value: function createTexture() {
            var gl = this.gl;

            if (!this.texture) this.texture = gl.createTexture();

            gl.activeTexture(gl.TEXTURE0 + this.unit);
            gl.bindTexture(gl.TEXTURE_2D, this.texture);

            //NEAREST LINEAR
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.textinfo.img);
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.resize(this.canvas.width, this.canvas.height);
        }
    }, {
        key: 'destroy',
        value: function destroy() {

            if (this.texture) this.gl.deleteTexture(this.texture);

            this.canvas = null;
            this.textinfo = null;
            this.texture = null;
            this.gl = null;
            this.texts = [];

            this.sdf.clearCache();

            this.sdf = null;
        }
    }]);

    return TextureText;
}(_EventEmitter3.default);

exports.default = TextureText;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = nodeOverCustom;

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

var _GLUtil = __webpack_require__(3);

var _vert = __webpack_require__(36);

var _vert2 = _interopRequireDefault(_vert);

var _frag = __webpack_require__(35);

var _frag2 = _interopRequireDefault(_frag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function renderLayerData(_ref) {
    var data = _ref.data,
        cacheIndex = _ref.cacheIndex,
        gl = _ref.gl,
        layers = _ref.layers,
        renderLayerMap = _ref.renderLayerMap;


    var temp, program, startPoint;
    var layerIndexMap = {};
    var _this = this;

    data.forEach(function (e) {
        if (e.filter) return;
        layers.forEach(function (layer) {
            if (!cacheIndex[e.id][layer] || !cacheIndex[e.id][layer].data || !renderLayerMap[layer].enable || !renderLayerMap[layer].show) return;

            layerIndexMap[layer] = layerIndexMap[layer] || [];
            temp = cacheIndex[e.id][layer].data.indices;

            startPoint = cacheIndex[e.id][layer].vertexStart;

            temp && temp.forEach(function (index) {
                layerIndexMap[layer].push(index + startPoint);
            });
        });
    });

    layers.forEach(function (layer) {
        if (!layerIndexMap[layer] || layerIndexMap[layer].length == 0) return;

        program = renderLayerMap[layer].program;

        gl.useProgram(program);

        gl.bindBuffer(gl.ARRAY_BUFFER, program.vertexBuffer);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, _this.indexBuffer);

        (0, _GLUtil.vertexAttribPointer)(gl, program.activeAttributes, program.offsetConfig);
        (0, _GLUtil.setUniforms)(gl, program.activeUniforms, program.uniforms);

        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(layerIndexMap[layer]), gl.STATIC_DRAW);
        gl.drawElements(gl.TRIANGLES, layerIndexMap[layer].length, gl.UNSIGNED_INT, 0);
    });
}
function renderBg(gl, grayBg, option) {
    var color = _util2.default.parseColor(option.bgColor || 'rgba(255,255,255,0.8)');
    gl.useProgram(grayBg.program);

    gl.bindBuffer(gl.ARRAY_BUFFER, grayBg.vertexBuffer);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, grayBg.indexBuffer);

    gl.vertexAttribPointer(grayBg.positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(grayBg.positionLocation);

    gl.uniform4f(grayBg.bgLocation, color.r, color.g, color.b, color.a);

    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_INT, 0);
}

function nodeOverCustom(render, option) {
    var renderLayerMap = render.renderLayerMap;
    var gl = render.gl;

    option = option || {};

    if (!this.indexBuffer) this.indexBuffer = gl.createBuffer();

    if (!this.grayBg) {
        this.grayBg = {};
        this.grayBg.program = (0, _GLUtil.loadProgram)(gl, [(0, _GLUtil.loadShader)(gl, _vert2.default, gl.VERTEX_SHADER), (0, _GLUtil.loadShader)(gl, _frag2.default, gl.FRAGMENT_SHADER)]);
        this.grayBg.vertexBuffer = gl.createBuffer();
        this.grayBg.indexBuffer = gl.createBuffer();

        this.grayBg.positionLocation = gl.getAttribLocation(this.grayBg.program, 'a_position');
        this.grayBg.bgLocation = gl.getUniformLocation(this.grayBg.program, 'u_bg_color');

        gl.bindBuffer(gl.ARRAY_BUFFER, this.grayBg.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.grayBg.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int32Array([0, 1, 2, 1, 2, 3]), gl.STATIC_DRAW);
    }

    var edgesid, selectedNodes;
    var overNode = render.context.overInfo.currentNode;
    var overNodes = [],
        overEdges = [];
    var graph = render.context.graph;

    selectedNodes = render.context.selection.getNodes();

    if (overNode && !(option && option.over === false)) {

        if (edgesid = graph.inEdgesIndex[overNode.id]) {
            edgesid.forEach(function (id) {
                overEdges.push(graph.edgesIndex[id]);
                overNodes.push(graph.nodesIndex[graph.edgesIndex[id].source]);
            });
        }

        if (edgesid = graph.outEdgesIndex[overNode.id]) {
            edgesid.forEach(function (id) {
                overEdges.push(graph.edgesIndex[id]);
                overNodes.push(graph.nodesIndex[graph.edgesIndex[id].target]);
            });
        }

        overNodes.push(overNode);

        //draw gray background
        renderBg(gl, this.grayBg, option);

        if (overEdges.length) {
            renderLayerData.call(this, {
                data: overEdges,
                cacheIndex: render.renderCache.edge.index,
                gl: gl,
                layers: ['edge', 'edgeCurve', 'edgeLabel', 'edgeCurveLabel'],
                renderLayerMap: renderLayerMap
            });
        }

        renderLayerData.call(this, {
            data: overNodes,
            cacheIndex: render.renderCache.node.index,
            gl: gl,
            layers: ['node', 'rectNode'],
            renderLayerMap: renderLayerMap
        });

        if (selectedNodes.length) {
            renderLayerData.call(this, {
                data: selectedNodes,
                cacheIndex: render.renderCache.node.index,
                gl: gl,
                layers: ['node', 'rectNode'],
                renderLayerMap: renderLayerMap
            });
        }

        renderLayerData.call(this, {
            data: overNodes,
            cacheIndex: render.renderCache.node.index,
            gl: gl,
            layers: ['nodeLabel'],
            renderLayerMap: renderLayerMap
        });
    } else {
        if (selectedNodes.length) {
            renderLayerData.call(this, {
                data: selectedNodes,
                cacheIndex: render.renderCache.node.index,
                gl: gl,
                layers: ['node', 'rectNode'],
                renderLayerMap: renderLayerMap
            });
        }
    }
}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (WebGLRender) {
    WebGLRender.defaultLayersConfig = [{
        name: 'base',
        subLayers: [{ name: 'nodeLabel', context: 'node', render: WebGLRender.nodeLabel.default }, { name: 'edge', context: 'edge', render: WebGLRender.edge.default, check: edgeCount(0) }, { name: 'edgeCurve', context: 'edge', render: WebGLRender.edge.curve, check: edgeCount(0, true) }, { name: 'edgeLabel', context: 'edge', render: WebGLRender.edgeLabel.default, check: edgeCount(0) }, { name: 'edgeCurveLabel', context: 'edge', render: WebGLRender.edgeLabel.curve, check: edgeCount(0, true) }, { name: 'node', context: 'node', render: WebGLRender.node.default, check: layerCheckDefault() }, { name: 'rectNode', context: 'node', render: WebGLRender.node.rect, check: layerCheck('rect') }, { name: 'nodeOver', custom: true, render: _customOverRender2.default, option: { over: false } }]
    }];
};

var _customOverRender = __webpack_require__(26);

var _customOverRender2 = _interopRequireDefault(_customOverRender);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function layerCheckDefault() {
    return function (data) {
        return !data.type || data.type == 'default';
    };
}
function layerCheck(type) {
    return function (data) {
        return data.type == type;
    };
}

function edgeCount(count, not) {
    return function (data) {
        var check = (!data.type || data.type == 'default') && data.curveCount == count;
        return not ? !check : check;
    };
}

;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



Object.defineProperty(exports, "__esModule", {
    value: true
});

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

var _vert = __webpack_require__(38);

var _vert2 = _interopRequireDefault(_vert);

var _frag = __webpack_require__(37);

var _frag2 = _interopRequireDefault(_frag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    shaderVert: _vert2.default,
    shaderFrag: _frag2.default,
    attributes: {
        a_position: { components: 2, start: 0 },
        a_uv: { components: 2, start: 2 },
        a_dis: { components: 1, start: 4 },
        a_flag: { components: 1, start: 5 },
        a_color: { components: 4, start: 6 },
        a_dashed: { components: 1, start: 10 },
        a_size: { components: 1, start: 11 },
        a_end_ratio: { components: 1, start: 12 },
        a_start_ratio: { components: 1, start: 13 }
    },
    getUniforms: function getUniforms(_ref) {
        var matrix = _ref.matrix,
            camera = _ref.camera,
            sampleRatio = _ref.sampleRatio,
            textureLoader = _ref.textureLoader;

        return {
            u_matrix: matrix,
            u_camera_scale: camera.scale
        };
    },
    getRenderData: function getRenderData(_ref2) {
        var data = _ref2.data,
            config = _ref2.config,
            textureLoader = _ref2.textureLoader,
            textureIcon = _ref2.textureIcon,
            graph = _ref2.graph;

        var target = graph.nodesIndex[data.target];
        var source = graph.nodesIndex[data.source];

        var defaultSize = config.defaultNodeSize;

        var renderData = [];
        var indices = [];

        // var dx = target.x - source.x;
        // var dy = target.y - source.y;

        var dis = _util2.default.getDistance(source.x, source.y, target.x, target.y);
        var tNodeW, tNodeH, sNodeW, sNodeH, targetSize, sourceSize;
        sNodeW = _util2.default.getNodeSizeX(source) || defaultSize;
        sNodeH = _util2.default.getNodeSizeY(source) || defaultSize;
        tNodeW = _util2.default.getNodeSizeX(target) || defaultSize;
        tNodeH = _util2.default.getNodeSizeY(target) || defaultSize;

        if (source.type == 'rect') {
            sourceSize = Math.sqrt(Math.pow(sNodeW, 2) + Math.pow(sNodeH, 2));
        } else {
            sourceSize = sNodeW;
        }

        if (target.type == 'rect') {
            targetSize = Math.sqrt(Math.pow(tNodeW, 2) + Math.pow(tNodeH, 2));
        } else {
            targetSize = tNodeW;
        }

        var size = (data.size || config.defaultEdgeSize) / 2;
        var aSize = data.arrowSize || config.defaultEdgeArrowSize;
        var vX, vY;

        // var tX = target.x - targetSize / dis * dx;
        // var tY = target.y - targetSize / dis * dy;
        var tX = target.x;
        var tY = target.y;

        var ctrlP = _util2.default.getControlPos(source.x, source.y, tX, tY, data.curveCount, data.curveOrder);

        //arrow
        var dis1 = _util2.default.getDistance(tX, tY, ctrlP[0], ctrlP[1]);

        var startPosRatio = sourceSize / dis1 * 0.5;
        var arrowPosRatio = (1 - (targetSize + aSize) / dis1) * 0.5 + 0.5;

        var arrowPos = _util2.default.getPointOnQuadraticCurve(arrowPosRatio, source.x, source.y, tX, tY, ctrlP[0], ctrlP[1]);
        var aTangent = _util2.default.getPointTangentOnQuadraticCurve(arrowPosRatio, source.x, source.y, tX, tY, ctrlP[0], ctrlP[1]);

        vX = aTangent[0] * aSize;
        vY = aTangent[1] * aSize;

        var arrowX = arrowPos[0],
            arrowY = arrowPos[1];

        //curve
        var color;
        if (data.selected) {
            color = _util2.default.parseColor(config.defaultEdgeSelectedColor);
        } else {
            color = _util2.default.parseColor(data.color || source.color || config.defaultEdgeColor);
        }

        var scalePos = scaleTrangles([source.x, source.y, ctrlP[0], ctrlP[1], tX, tY]);
        var scaleUV = scaleTrangles([1, 1, 0.5, 0, 0, 0]);

        var dashed = data.dashed ? 1 : 0;
        // debugger
        //curve
        addData(renderData, [scalePos[0], scalePos[1], scaleUV[0], scaleUV[1], dis, 0, color.r, color.g, color.b, color.a, dashed, size, arrowPosRatio, startPosRatio]);
        addData(renderData, [scalePos[2], scalePos[3], scaleUV[2], scaleUV[3], dis, 0, color.r, color.g, color.b, color.a, dashed, size, arrowPosRatio, startPosRatio]);
        addData(renderData, [scalePos[4], scalePos[5], scaleUV[4], scaleUV[5], dis, 0, color.r, color.g, color.b, color.a, dashed, size, arrowPosRatio, startPosRatio]);

        addIndices(indices, [0, 1, 2]);

        //arrow
        addData(renderData, [arrowX + vX, arrowY + vY, 0, 0, 0, 1, color.r, color.g, color.b, color.a, dashed, size, arrowPosRatio, startPosRatio]);
        addData(renderData, [arrowX + vY * 0.6, arrowY - vX * 0.6, 0, 0, 0, 1, color.r, color.g, color.b, color.a, dashed, size, arrowPosRatio, startPosRatio]);
        addData(renderData, [arrowX - vY * 0.6, arrowY + vX * 0.6, 0, 0, 0, 1, color.r, color.g, color.b, color.a, dashed, size, arrowPosRatio, startPosRatio]);

        addIndices(indices, [3, 4, 5]);

        return {
            vertices: renderData,
            indices: indices
        };
    }
};


function addData(arr, attrData) {
    for (var i = 0; i < attrData.length; i++) {
        arr.push(attrData[i]);
    }
}

function addIndices(indices, attrIndex) {
    attrIndex.forEach(function (data) {
        indices.push(data);
    });
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

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

var _defaultVert = __webpack_require__(40);

var _defaultVert2 = _interopRequireDefault(_defaultVert);

var _defaultFrag = __webpack_require__(39);

var _defaultFrag2 = _interopRequireDefault(_defaultFrag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    shaderVert: _defaultVert2.default,
    shaderFrag: _defaultFrag2.default,
    attributes: {
        a_position: { components: 2, start: 0 },
        a_normal: { components: 2, start: 2 },
        a_size: { components: 1, start: 4 },
        a_color: { components: 4, start: 5 },
        a_dis: { components: 1, start: 9 },
        a_dashed: { components: 1, start: 10 },
        a_flag: { components: 1, start: 11 },
        a_u: { components: 1, start: 12 }
    },
    renderBefore: function renderBefore(render, option) {
        var gl = render.gl;

        // gl.clearDepth(1.0);
        // gl.clear(gl.DEPTH_BUFFER_BIT);
        // //
        // gl.enable(gl.DEPTH_TEST);
        // gl.depthFunc(gl.LESS);
        //
        // gl.enable(gl.BLEND);
        // gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    },
    getUniforms: function getUniforms(_ref) {
        var matrix = _ref.matrix,
            camera = _ref.camera,
            sampleRatio = _ref.sampleRatio,
            textureLoader = _ref.textureLoader;

        return {
            u_matrix: matrix
        };
    },
    getRenderData: function getRenderData(_ref2) {
        var data = _ref2.data,
            config = _ref2.config,
            textureLoader = _ref2.textureLoader,
            textureIcon = _ref2.textureIcon,
            graph = _ref2.graph;

        var target = graph.nodesIndex[data.target];
        var source = graph.nodesIndex[data.source];
        var dx = target.x - source.x;
        var dy = target.y - source.y;
        var norV = _util2.default.normalize([dx, dy]);
        var dashed = data.dashed ? 1 : 0;

        var defaultSize = config.defaultNodeSize;

        var size = (data.size || config.defaultEdgeSize) / 2,
            arrowSize = data.arrowSize || config.defaultEdgeArrowSize;
        var crossVector = _util2.default.normalize([-dy, dx]);

        //arrow
        var tNodeW, tNodeH, sNodeW, sNodeH, targetSize, sourceSize;
        sNodeW = _util2.default.getNodeSizeX(source) || defaultSize;
        sNodeH = _util2.default.getNodeSizeY(source) || defaultSize;
        tNodeW = _util2.default.getNodeSizeX(target) || defaultSize;
        tNodeH = _util2.default.getNodeSizeY(target) || defaultSize;

        if (source.type == 'rect') {
            sourceSize = Math.sqrt(Math.pow(sNodeW, 2) + Math.pow(sNodeH, 2));
        } else {
            sourceSize = sNodeW;
        }

        if (target.type == 'rect') {
            targetSize = Math.sqrt(Math.pow(tNodeW, 2) + Math.pow(tNodeH, 2));
        } else {
            targetSize = tNodeW;
        }

        var dis = _util2.default.getDistance(source.x, source.y, target.x, target.y);
        var arrowX = target.x - (targetSize + arrowSize) / dis * dx;
        var arrowY = target.y - (targetSize + arrowSize) / dis * dy;

        var color;
        if (data.selected) {
            color = _util2.default.parseColor(config.defaultEdgeSelectedColor);
        } else {
            color = _util2.default.parseColor(data.color || source.color || config.defaultEdgeColor);
        }

        var renderData = [];
        var indices = [];

        addData(renderData, [source.x + norV[0] * sourceSize, source.y + norV[1] * sourceSize, crossVector[0], crossVector[1], size, color.r, color.g, color.b, color.a, dis, dashed, 0, 0]);
        addData(renderData, [source.x + norV[0] * sourceSize, source.y + norV[1] * sourceSize, -crossVector[0], -crossVector[1], size, color.r, color.g, color.b, color.a, dis, dashed, 0, 0]);
        addData(renderData, [arrowX, arrowY, crossVector[0], crossVector[1], size, color.r, color.g, color.b, color.a, dis, dashed, 0, 1]);
        addData(renderData, [arrowX, arrowY, -crossVector[0], -crossVector[1], size, color.r, color.g, color.b, color.a, dis, dashed, 0, 1]);

        addIndices(indices, [0, 1, 2, 1, 2, 3]);
        //arrow
        addData(renderData, [arrowX, arrowY, crossVector[0], crossVector[1], arrowSize / 2, color.r, color.g, color.b, color.a, dis, dashed, 1, 0]);
        addData(renderData, [arrowX, arrowY, -crossVector[0], -crossVector[1], arrowSize / 2, color.r, color.g, color.b, color.a, dis, dashed, 1, 0]);
        addData(renderData, [arrowX, arrowY, arrowSize / dis * dx, arrowSize / dis * dy, 1, color.r, color.g, color.b, color.a, dis, dashed, 1, 0]);

        addIndices(indices, [4, 5, 6]);

        return {
            vertices: renderData,
            indices: indices
        };
    }
}; /**
    * Created by chengang on 17-3-31.
    */

function addData(arr, attrData) {
    for (var i = 0; i < attrData.length; i++) {
        arr.push(attrData[i]);
    }
}

function addIndices(indices, attrIndex) {
    attrIndex.forEach(function (data) {
        indices.push(data);
    });
}

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

var _Matrix = __webpack_require__(4);

var _Matrix2 = _interopRequireDefault(_Matrix);

var _edgeLabelVert = __webpack_require__(8);

var _edgeLabelVert2 = _interopRequireDefault(_edgeLabelVert);

var _edgeLabelFrag = __webpack_require__(7);

var _edgeLabelFrag2 = _interopRequireDefault(_edgeLabelFrag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by chengang on 17-4-7.
 */

exports.default = {
    shaderVert: _edgeLabelVert2.default,
    shaderFrag: _edgeLabelFrag2.default,
    attributes: {
        a_position: { components: 2, start: 0 },
        a_uv: { components: 2, start: 2 },
        a_size: { components: 1, start: 4 },
        a_color: { components: 4, start: 5 }
    },
    getUniforms: function getUniforms(_ref) {
        var matrix = _ref.matrix,
            camera = _ref.camera,
            config = _ref.config,
            sampleRatio = _ref.sampleRatio,
            textureLoader = _ref.textureLoader,
            textureText = _ref.textureText;

        var color = _util2.default.parseColor(config.defaultTextBgColor);
        return {
            u_matrix: matrix,
            u_camera_scale: camera.scale,
            u_image: textureText.unit,
            u_text_bg: [color.r, color.g, color.b, color.a]
        };
    },
    getRenderData: function getRenderData(_ref2) {
        var data = _ref2.data,
            config = _ref2.config,
            textureLoader = _ref2.textureLoader,
            textureIcon = _ref2.textureIcon,
            textureText = _ref2.textureText,
            graph = _ref2.graph;

        var target = graph.nodesIndex[data.target];
        var source = graph.nodesIndex[data.source];

        if (!data.label) return null;

        var defaultSize = config.defaultNodeSize;
        var labelColor = _util2.default.parseColor(data.labelColor || config.defaultEdgeLabelColor);

        // debugger
        var str = data.label.split('');

        var renderData = [];
        var indices = [];

        var ratio = 0.33;
        var size = data.fontSize || Math.max(_util2.default.getNodeSizeX(source) || defaultSize, _util2.default.getNodeSizeY(source) || defaultSize) * ratio;
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

        var points = 0;
        for (var i = 0; i < str.length; i++) {
            char = str[i];
            if (!infos[char]) {
                console.log('no text texture info');
                continue;
            }

            width = infos[char].width * charWidth;
            uv = infos[char].uvs;
            x1 = uv[0], y1 = uv[1], x2 = uv[2], y2 = uv[3];

            addData(renderData, [startx, starty, x1, y1, width, labelColor.r, labelColor.g, labelColor.b, labelColor.a], centerX, centerY, angle);
            addData(renderData, [startx, starty - charHeight, x1, y2, width, labelColor.r, labelColor.g, labelColor.b, labelColor.a], centerX, centerY, angle);
            addData(renderData, [startx + width, starty, x2, y1, width, labelColor.r, labelColor.g, labelColor.b, labelColor.a], centerX, centerY, angle);
            addData(renderData, [startx + width, starty - charHeight, x2, y2, width, labelColor.r, labelColor.g, labelColor.b, labelColor.a], centerX, centerY, angle);

            addIndices(indices, [points + 0, points + 1, points + 2, points + 1, points + 2, points + 3]);

            startx += width * 7 / 8;
            points += 4;
        }

        return {
            vertices: renderData,
            indices: indices
        };
    }
};


function addData(arr, attrData, centerX, centerY, angle) {
    var rotate = _Matrix2.default.transformPoint([attrData[0], attrData[1]], _Matrix2.default.matrixFromRotation(angle));
    attrData[0] = rotate[0] + centerX;
    attrData[1] = rotate[1] + centerY;
    for (var i = 0; i < attrData.length; i++) {
        arr.push(attrData[i]);
    }
}

function addIndices(indices, attrIndex) {
    attrIndex.forEach(function (data) {
        indices.push(data);
    });
}

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _nodeLabelVert = __webpack_require__(42);

var _nodeLabelVert2 = _interopRequireDefault(_nodeLabelVert);

var _labelFrag = __webpack_require__(41);

var _labelFrag2 = _interopRequireDefault(_labelFrag);

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    shaderVert: _nodeLabelVert2.default,
    shaderFrag: _labelFrag2.default,
    attributes: {
        a_position: { components: 2, start: 0 },
        a_uv: { components: 2, start: 2 },
        a_size: { components: 1, start: 4 },
        a_color: { components: 4, start: 5 }
    },
    getUniforms: function getUniforms(_ref) {
        var matrix = _ref.matrix,
            camera = _ref.camera,
            sampleRatio = _ref.sampleRatio,
            textureLoader = _ref.textureLoader,
            textureText = _ref.textureText;

        return {
            u_matrix: matrix,
            u_camera_scale: camera.scale,
            u_image: textureText.unit
        };
    },
    getRenderData: function getRenderData(_ref2) {
        var data = _ref2.data,
            config = _ref2.config,
            textureLoader = _ref2.textureLoader,
            textureIcon = _ref2.textureIcon,
            textureText = _ref2.textureText,
            graph = _ref2.graph;

        // debugger
        if (!data.label) return null;

        var defaultSize = config.defaultNodeSize;
        var labelColor = _util2.default.parseColor(data.labelColor || config.defaultNodeLabelColor);

        var str = data.label.split('');

        var renderData = [];
        var indices = [];

        var labelSizeRatio = 0.4;
        var sizeX = _util2.default.getNodeSizeX(data) || defaultSize,
            sizeY = _util2.default.getNodeSizeY(data) || defaultSize;
        var size = Math.max(sizeX, sizeY);
        var infos = textureText.textinfo.infos,
            charWidth = size * labelSizeRatio,
            charHeight = size * labelSizeRatio,
            char,
            uv,
            width;

        var lines = getLines(str, 20, infos, charWidth);

        var x1, y1, x2, y2, startx, starty;
        var points = 0;

        lines.forEach(function (line, i) {
            startx = line.lineWidth / 2 * -1 + data.x;
            starty = data.y - sizeY - i * charHeight * 7 / 8;
            line.forEach(function (char) {
                if (!infos[char]) return;

                width = infos[char].width * charWidth;
                uv = infos[char].uvs;
                x1 = uv[0], y1 = uv[1], x2 = uv[2], y2 = uv[3];

                addData(renderData, [startx, starty, x1, y1, width, labelColor.r, labelColor.g, labelColor.b, labelColor.a]);
                addData(renderData, [startx, starty - charHeight, x1, y2, width, labelColor.r, labelColor.g, labelColor.b, labelColor.a]);
                addData(renderData, [startx + width, starty, x2, y1, width, labelColor.r, labelColor.g, labelColor.b, labelColor.a]);
                addData(renderData, [startx + width, starty - charHeight, x2, y2, width, labelColor.r, labelColor.g, labelColor.b, labelColor.a]);

                addIndices(indices, [points + 0, points + 1, points + 2, points + 1, points + 2, points + 3]);

                startx += width * 7 / 8;
                points += 4;
            });
        });

        return renderData.length > 0 ? { vertices: renderData, indices: indices } : null;
    }
}; /**
    * Created by chengang on 17-4-7.
    */

function getLines(str, lineChars, infos, charWidth) {
    var lines = [];
    var line = [];
    var lineWidth = 0;
    str.forEach(function (char) {
        if (line.length >= lineChars) {

            line.lineWidth = lineWidth;
            lines.push(line);

            line = [];
            lineWidth = 0;
        }

        if (!infos[char]) return;

        lineWidth += infos[char].width * charWidth * 7 / 8;
        line.push(char);
    });

    if (lineWidth > 0) {
        line.lineWidth = lineWidth;
        lines.push(line);
    }

    return lines;
}

function addData(arr, attrData) {
    for (var i = 0; i < attrData.length; i++) {
        arr.push(attrData[i]);
    }
}

function addIndices(indices, attrIndex) {
    attrIndex.forEach(function (data) {
        indices.push(data);
    });
}

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

var _Matrix = __webpack_require__(4);

var _Matrix2 = _interopRequireDefault(_Matrix);

var _edgeLabelVert = __webpack_require__(8);

var _edgeLabelVert2 = _interopRequireDefault(_edgeLabelVert);

var _edgeLabelFrag = __webpack_require__(7);

var _edgeLabelFrag2 = _interopRequireDefault(_edgeLabelFrag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by chengang on 17-4-7.
 */

exports.default = {
    shaderVert: _edgeLabelVert2.default,
    shaderFrag: _edgeLabelFrag2.default,
    attributes: {
        a_position: { components: 2, start: 0 },
        a_uv: { components: 2, start: 2 },
        a_size: { components: 1, start: 4 },
        a_color: { components: 4, start: 5 }
    },
    getUniforms: function getUniforms(_ref) {
        var matrix = _ref.matrix,
            camera = _ref.camera,
            config = _ref.config,
            sampleRatio = _ref.sampleRatio,
            textureLoader = _ref.textureLoader,
            textureText = _ref.textureText;

        var color = _util2.default.parseColor(config.defaultTextBgColor);
        return {
            u_matrix: matrix,
            u_camera_scale: camera.scale,
            u_image: textureText.unit,
            u_text_bg: [color.r, color.g, color.b, color.a]
        };
    },
    getRenderData: function getRenderData(_ref2) {
        var data = _ref2.data,
            config = _ref2.config,
            textureLoader = _ref2.textureLoader,
            textureIcon = _ref2.textureIcon,
            textureText = _ref2.textureText,
            graph = _ref2.graph;

        var target = graph.nodesIndex[data.target];
        var source = graph.nodesIndex[data.source];

        if (!data.label) return null;

        var defaultSize = config.defaultNodeSize;
        var labelColor = _util2.default.parseColor(data.labelColor || config.defaultEdgeLabelColor);

        // debugger
        var str = data.label.split('');

        var renderData = [];
        var indices = [];

        var ratio = 0.33;
        var size = data.fontSize || Math.max(_util2.default.getNodeSizeX(source) || defaultSize, _util2.default.getNodeSizeY(source) || defaultSize) * ratio;
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

        var tX = target.x;
        var tY = target.y;

        var ctrlP = _util2.default.getControlPos(source.x, source.y, tX, tY, data.curveCount, data.curveOrder);

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

        var points = 0;
        for (var i = 0; i < str.length; i++) {
            char = str[i];
            if (!infos[char]) {
                console.log('no text texture info');
                continue;
            }

            width = infos[char].width * charWidth;
            uv = infos[char].uvs;
            x1 = uv[0], y1 = uv[1], x2 = uv[2], y2 = uv[3];

            addData(renderData, [startx, starty, x1, y1, width, labelColor.r, labelColor.g, labelColor.b, labelColor.a], centerX, centerY, angle);
            addData(renderData, [startx, starty - charHeight, x1, y2, width, labelColor.r, labelColor.g, labelColor.b, labelColor.a], centerX, centerY, angle);
            addData(renderData, [startx + width, starty, x2, y1, width, labelColor.r, labelColor.g, labelColor.b, labelColor.a], centerX, centerY, angle);
            addData(renderData, [startx + width, starty - charHeight, x2, y2, width, labelColor.r, labelColor.g, labelColor.b, labelColor.a], centerX, centerY, angle);

            addIndices(indices, [points + 0, points + 1, points + 2, points + 1, points + 2, points + 3]);

            startx += width * 7 / 8;
            points += 4;
        }

        return {
            vertices: renderData,
            indices: indices
        };
    }
};


function addData(arr, attrData, centerX, centerY, angle) {
    var rotate = _Matrix2.default.transformPoint([attrData[0], attrData[1]], _Matrix2.default.matrixFromRotation(angle));
    attrData[0] = rotate[0] + centerX;
    attrData[1] = rotate[1] + centerY;
    for (var i = 0; i < attrData.length; i++) {
        arr.push(attrData[i]);
    }
}

function addIndices(indices, attrIndex) {
    attrIndex.forEach(function (data) {
        indices.push(data);
    });
}

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

var _defaultVert = __webpack_require__(44);

var _defaultVert2 = _interopRequireDefault(_defaultVert);

var _defaultFrag = __webpack_require__(43);

var _defaultFrag2 = _interopRequireDefault(_defaultFrag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    shaderVert: _defaultVert2.default,
    shaderFrag: _defaultFrag2.default,
    attributes: {
        a_position: { components: 2, start: 0 },
        a_color: { components: 4, start: 2 },
        a_uv: { components: 2, start: 6 },
        a_selected: { components: 1, start: 8 },
        a_flag: { components: 1, start: 9 },
        a_size: { components: 1, start: 10 },
        a_showicon: { components: 1, start: 11 },
        a_center: { components: 2, start: 12 },
        a_icon_color: { components: 4, start: 14 }
    },
    getUniforms: function getUniforms(_ref) {
        var matrix = _ref.matrix,
            camera = _ref.camera,
            config = _ref.config,
            sampleRatio = _ref.sampleRatio,
            textureLoader = _ref.textureLoader,
            textureIcon = _ref.textureIcon;

        var color = _util2.default.parseColor(config.defaultNodeSelectedBorder);
        return {
            u_matrix: matrix,
            u_camera_scale: camera.scale,
            // u_textures:textureLoader.texturesIndex,
            u_borderColor: [color.r, color.g, color.b, color.a],
            u_sample_ratio: sampleRatio,
            u_icons_texture: textureIcon.unit
        };
    },
    getRenderData: function getRenderData(_ref2) {
        var data = _ref2.data,
            config = _ref2.config,
            textureIcon = _ref2.textureIcon,
            oldData = _ref2.oldData,
            dirtyAttr = _ref2.dirtyAttr;

        //reuse old data
        if (oldData && dirtyAttr && Object.keys(dirtyAttr).length == 2 && dirtyAttr.hasOwnProperty('x') && dirtyAttr.hasOwnProperty('y')) {
            // debugger
            var offset = 18;
            var oldVertices = oldData.vertices;
            for (var i = 0; i < oldVertices.length; i += offset) {
                oldVertices[i + 12] = data.x; //x
                oldVertices[i + 13] = data.y; //y
            }
            return {
                vertices: oldVertices,
                indices: oldData.indices
            };
        }

        /**
         * width height selected color iconOrImg uv center
         */

        //init data
        data.size = data.size || config.defaultNodeSize;

        var isSelected = data.selected ? 1.0 : 0.0; //selected flag
        var color = _util2.default.parseColor(data.color || config.defaultNodeColor); //node color

        var iColor = _util2.default.parseColor(data.iconColor || config.defaultNodeIconColor); //icon color
        var hasIcon = data.icon && textureIcon.iconinfo.infos[data.icon],
            uvs;

        uvs = hasIcon ? textureIcon.iconinfo.infos[data.icon].uvs : [0, 0];
        hasIcon = hasIcon ? 1 : 0;

        var vertices = [];
        var indices = [];

        var points = 0;
        var bgScale = 1.35;

        // debugger

        //background
        addData(vertices, [-1 * data.size * bgScale, +1 * data.size * bgScale, color.r, color.g, color.b, color.a, 0, 0, isSelected, 0, data.size, hasIcon, data.x, data.y, iColor.r, iColor.g, iColor.b, iColor.a]);
        addData(vertices, [+1 * data.size * bgScale, +1 * data.size * bgScale, color.r, color.g, color.b, color.a, 1, 0, isSelected, 0, data.size, hasIcon, data.x, data.y, iColor.r, iColor.g, iColor.b, iColor.a]);
        addData(vertices, [-1 * data.size * bgScale, -1 * data.size * bgScale, color.r, color.g, color.b, color.a, 0, 1, isSelected, 0, data.size, hasIcon, data.x, data.y, iColor.r, iColor.g, iColor.b, iColor.a]);
        addData(vertices, [+1 * data.size * bgScale, -1 * data.size * bgScale, color.r, color.g, color.b, color.a, 1, 1, isSelected, 0, data.size, hasIcon, data.x, data.y, iColor.r, iColor.g, iColor.b, iColor.a]);

        addIndices(indices, [points + 0, points + 1, points + 2, points + 1, points + 2, points + 3]);
        points += 4;

        //base
        addData(vertices, [-1 * data.size, +1 * data.size, color.r, color.g, color.b, color.a, 0, 0, isSelected, 1, data.size, hasIcon, data.x, data.y, iColor.r, iColor.g, iColor.b, iColor.a]);
        addData(vertices, [+1 * data.size, +1 * data.size, color.r, color.g, color.b, color.a, 1, 0, isSelected, 1, data.size, hasIcon, data.x, data.y, iColor.r, iColor.g, iColor.b, iColor.a]);
        addData(vertices, [-1 * data.size, -1 * data.size, color.r, color.g, color.b, color.a, 0, 1, isSelected, 1, data.size, hasIcon, data.x, data.y, iColor.r, iColor.g, iColor.b, iColor.a]);
        addData(vertices, [+1 * data.size, -1 * data.size, color.r, color.g, color.b, color.a, 1, 1, isSelected, 1, data.size, hasIcon, data.x, data.y, iColor.r, iColor.g, iColor.b, iColor.a]);

        addIndices(indices, [points + 0, points + 1, points + 2, points + 1, points + 2, points + 3]);
        points += 4;

        //icon
        var iconInfo = data.icon ? getIconInfo(data) : { left: -1 * data.size, top: data.size, right: data.size, bottom: -1 * data.size };
        addData(vertices, [iconInfo.left, iconInfo.top, color.r, color.g, color.b, color.a, uvs[0], uvs[1], isSelected, 2, data.size, hasIcon, data.x, data.y, iColor.r, iColor.g, iColor.b, iColor.a]);
        addData(vertices, [iconInfo.right, iconInfo.top, color.r, color.g, color.b, color.a, uvs[2], uvs[1], isSelected, 2, data.size, hasIcon, data.x, data.y, iColor.r, iColor.g, iColor.b, iColor.a]);
        addData(vertices, [iconInfo.left, iconInfo.bottom, color.r, color.g, color.b, color.a, uvs[0], uvs[3], isSelected, 2, data.size, hasIcon, data.x, data.y, iColor.r, iColor.g, iColor.b, iColor.a]);
        addData(vertices, [iconInfo.right, iconInfo.bottom, color.r, color.g, color.b, color.a, uvs[2], uvs[3], isSelected, 2, data.size, hasIcon, data.x, data.y, iColor.r, iColor.g, iColor.b, iColor.a]);

        addIndices(indices, [points + 0, points + 1, points + 2, points + 1, points + 2, points + 3]);
        points += 4;

        return {
            vertices: vertices,
            indices: indices
        };
    }
}; /**
    * Created by chengang on 17-3-28.
    */

function addData(vertices, attrData) {
    attrData.forEach(function (data) {
        vertices.push(data);
    });
}

function addIndices(indices, attrIndex) {
    attrIndex.forEach(function (data) {
        indices.push(data);
    });
}

function getIconInfo(data) {
    var icon = data.icon;
    var defaultConfig = { content: '', offsetX: 0, offsetY: 0, scale: 0.65 };
    icon = _util2.default.isString(icon) ? _util2.default.extend({ content: icon }, defaultConfig) : _util2.default.extend(icon, defaultConfig);

    var size = data.size;

    return {
        left: size * -1 * icon.scale + icon.offsetX,
        right: size * icon.scale + icon.offsetX,
        top: size * icon.scale + icon.offsetY,
        bottom: size * -1 * icon.scale + icon.offsetY
    };
}

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

var _vert = __webpack_require__(46);

var _vert2 = _interopRequireDefault(_vert);

var _frag = __webpack_require__(45);

var _frag2 = _interopRequireDefault(_frag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    shaderVert: _vert2.default,
    shaderFrag: _frag2.default,
    attributes: {
        a_position: { components: 2, start: 0 },
        a_color: { components: 4, start: 2 },
        a_uv: { components: 2, start: 6 },
        a_img: { components: 1, start: 8 },
        a_selected: { components: 1, start: 9 },
        a_flag: { components: 1, start: 10 },
        a_showicon: { components: 1, start: 11 },
        a_icon_color: { components: 4, start: 12 }
    },
    getUniforms: function getUniforms(_ref) {
        var matrix = _ref.matrix,
            camera = _ref.camera,
            config = _ref.config,
            sampleRatio = _ref.sampleRatio,
            textureLoader = _ref.textureLoader,
            textureIcon = _ref.textureIcon;

        var color = _util2.default.parseColor(config.defaultNodeSelectedBorder);
        return {
            u_matrix: matrix,
            u_camera_scale: camera.scale,
            // u_textures:textureLoader.texturesIndex,
            u_borderColor: [color.r, color.g, color.b, color.a],
            u_sample_ratio: sampleRatio,
            u_icons_texture: textureIcon.unit
        };
    },
    getRenderData: function getRenderData(_ref2) {
        var data = _ref2.data,
            config = _ref2.config,
            textureLoader = _ref2.textureLoader,
            textureIcon = _ref2.textureIcon,
            graph = _ref2.graph;


        var color = _util2.default.parseColor(data.color || config.defaultNodeColor);
        var iColor = _util2.default.parseColor(data.iconColor || config.defaultNodeIconColor);

        var img = -1;
        if (data.img && textureLoader.cache.hasOwnProperty(data.img)) img = textureLoader.cache[data.img];

        var sizeX = data.width = data.width || data.size || config.defaultNodeSize;
        var sizeY = data.height = data.height || data.size || config.defaultNodeSize;
        var iconSize = Math.min(sizeX, sizeY);
        var bgSize = Math.max(sizeX, sizeY) * 1.414;
        var isSelected = data.selected ? 1.0 : 0.0;

        var hasIcon = data.icon && textureIcon.iconinfo.infos[data.icon],
            uvs;
        uvs = hasIcon ? textureIcon.iconinfo.infos[data.icon].uvs : [0, 0];
        hasIcon = hasIcon ? 1 : 0;

        var renderData = [];
        var indices = [];

        var points = 0;
        var bgScale = 1;

        addData(renderData, [data.x - bgSize * bgScale, data.y + bgSize * bgScale, color.r, color.g, color.b, color.a, 0, 0, img, isSelected, 0, hasIcon, iColor.r, iColor.g, iColor.b, iColor.a]);
        addData(renderData, [data.x + bgSize * bgScale, data.y + bgSize * bgScale, color.r, color.g, color.b, color.a, 1, 0, img, isSelected, 0, hasIcon, iColor.r, iColor.g, iColor.b, iColor.a]);
        addData(renderData, [data.x - bgSize * bgScale, data.y - bgSize * bgScale, color.r, color.g, color.b, color.a, 0, 1, img, isSelected, 0, hasIcon, iColor.r, iColor.g, iColor.b, iColor.a]);
        addData(renderData, [data.x + bgSize * bgScale, data.y - bgSize * bgScale, color.r, color.g, color.b, color.a, 1, 1, img, isSelected, 0, hasIcon, iColor.r, iColor.g, iColor.b, iColor.a]);

        addIndices(indices, [points + 0, points + 1, points + 2, points + 1, points + 2, points + 3]);
        points += 4;

        //base
        addData(renderData, [data.x - sizeX, data.y + sizeY, color.r, color.g, color.b, color.a, 0, 0, img, isSelected, 1, hasIcon, iColor.r, iColor.g, iColor.b, iColor.a]);
        addData(renderData, [data.x + sizeX, data.y + sizeY, color.r, color.g, color.b, color.a, 1, 0, img, isSelected, 1, hasIcon, iColor.r, iColor.g, iColor.b, iColor.a]);
        addData(renderData, [data.x - sizeX, data.y - sizeY, color.r, color.g, color.b, color.a, 0, 1, img, isSelected, 1, hasIcon, iColor.r, iColor.g, iColor.b, iColor.a]);
        addData(renderData, [data.x + sizeX, data.y - sizeY, color.r, color.g, color.b, color.a, 1, 1, img, isSelected, 1, hasIcon, iColor.r, iColor.g, iColor.b, iColor.a]);

        addIndices(indices, [points + 0, points + 1, points + 2, points + 1, points + 2, points + 3]);
        points += 4;

        var scale = 0.85;
        //icon

        var iconInfo = data.icon ? getIconInfo(data) : { left: -1 * data.size, top: data.size, right: data.size, bottom: -1 * data.size };
        addData(renderData, [data.x + iconInfo.left, data.y + iconInfo.top, color.r, color.g, color.b, color.a, uvs[0], uvs[1], -2, isSelected, 2, hasIcon, iColor.r, iColor.g, iColor.b, iColor.a]);
        addData(renderData, [data.x + iconInfo.right, data.y + iconInfo.top, color.r, color.g, color.b, color.a, uvs[2], uvs[1], -2, isSelected, 2, hasIcon, iColor.r, iColor.g, iColor.b, iColor.a]);
        addData(renderData, [data.x + iconInfo.left, data.y + iconInfo.bottom, color.r, color.g, color.b, color.a, uvs[0], uvs[3], -2, isSelected, 2, hasIcon, iColor.r, iColor.g, iColor.b, iColor.a]);
        addData(renderData, [data.x + iconInfo.right, data.y + iconInfo.bottom, color.r, color.g, color.b, color.a, uvs[2], uvs[3], -2, isSelected, 2, hasIcon, iColor.r, iColor.g, iColor.b, iColor.a]);

        addIndices(indices, [points + 0, points + 1, points + 2, points + 1, points + 2, points + 3]);
        points += 4;

        return {
            vertices: renderData,
            indices: indices
        };
    }
}; /**
    * Created by chengang on 17-3-28.
    */

function addData(arr, attrData) {
    for (var i = 0; i < attrData.length; i++) {
        arr.push(attrData[i]);
    }
}

function addIndices(indices, attrIndex) {
    attrIndex.forEach(function (data) {
        indices.push(data);
    });
}

function getIconInfo(data) {
    var icon = data.icon;
    var defaultConfig = { content: '', offsetX: 0, offsetY: 0, scale: 0.65 };
    icon = _util2.default.isString(icon) ? _util2.default.extend({ content: icon }, defaultConfig) : _util2.default.extend(icon, defaultConfig);

    var size = Math.min(data.width, data.height);

    return {
        left: size * -1 * icon.scale + icon.offsetX,
        right: size * icon.scale + icon.offsetX,
        top: size * icon.scale + icon.offsetY,
        bottom: size * -1 * icon.scale + icon.offsetY
    };
}

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = " precision mediump float;\n\nvec4 color = vec4(0.8,0.8,0.8,0.8);\n\n\nuniform vec4 u_bg_color;\n\n\nvoid main() {\n    vec4 color = u_bg_color / 255.0;\n    color = vec4(color.rgb * color.a,color.a);\n   gl_FragColor = color;\n}"

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = "attribute vec2 a_position;\n//attribute vec2 a_uv;\n\n//varying vec2 v_texCoord;\n//varying float size;\n\nvoid main() {\ngl_Position = vec4(a_position,0,1);\n//v_texCoord = a_uv;\n}\n"

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = "#ifdef GL_OES_standard_derivatives\n#extension GL_OES_standard_derivatives : enable\n#endif\n\nprecision mediump float;\nvarying vec4 color;\nvarying vec2 uv;\nvarying float dis;\nvarying float flag;\nvarying float dashed;\nvarying float size;\nvarying float end_ratio;\nvarying float start_ratio;\n\nuniform float u_camera_scale;\n\n\n\nvoid main(){\n        float width = size / u_camera_scale;\n        float blur = clamp(0.6,0.05,width*1.0) ;\n        width = width + blur;\n        float blur_ratio = blur / width;\n        float scale = 1.0;\n\n        if(flag > -0.5 && flag < 0.5){//curve\n                vec2 px = dFdx(uv);\n                vec2 py = dFdy(uv);\n\n                float fx = 2.0 * uv.x * px.x - px.y;\n                float fy = 2.0 * uv.y * py.x - py.y;\n\n                float sd = (uv.x * uv.x - uv.y) / sqrt(fx * fx + fy * fy);\n\n                float alpha = 1.0 - abs(sd) / width;\n                if (alpha < 0.0 || uv.x < end_ratio || uv.x > start_ratio) discard;\n\n                float n = 800.0/dis;\n                float dot = mod(uv.x*100.0,n);\n                if(dashed > 0.5 && dot > n*0.5 && dot < n) discard;\n\n                if(alpha < blur_ratio) scale = smoothstep(0.0,blur_ratio,alpha);\n\n                gl_FragColor = color*scale;\n\n        }else if(flag > 0.5 && flag < 1.5){//arrow\n                gl_FragColor = color;\n        }\n\n\n}"

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = "attribute vec2 a_position;\n//attribute vec2 a_normal;\nattribute vec4 a_color;\n//attribute float a_size;\nattribute vec2 a_uv;\nattribute float a_dis;\nattribute float a_dashed;\nattribute float a_flag;\nattribute float a_size;\nattribute float a_end_ratio;\nattribute float a_start_ratio;\n\nuniform mat3 u_matrix;\n\nvarying vec4 color;\nvarying vec2 uv;\nvarying float dis;\nvarying float dashed;\nvarying float flag;\nvarying float size;\nvarying float end_ratio;\nvarying float start_ratio;\n\nvoid main() {\n\n//vec2 pos  = a_position + a_normal * a_size;\ngl_Position = vec4((u_matrix*vec3(a_position,1)).xy,0,1);\nuv = a_uv;\ndis = a_dis;\nflag = a_flag;\ncolor = a_color/255.0;\ncolor = vec4(color.rgb * color.a,color.a);\ndashed = a_dashed;\nsize = a_size;\nend_ratio = 1.0 - a_end_ratio;\nstart_ratio = 1.0 - a_start_ratio;\n}\n"

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = "precision mediump float;\nvarying vec4 color;\nvarying float dis;\nvarying float dashed;\nvarying float flag;\nvarying float u;\n\n\nvoid main(){\n\nif(flag > -0.5 && flag < 0.5){//edge\n    float n = 800.0/dis;\n    float dot = mod(u*100.0,n);\n    if(dashed > 0.5 && dot > n*0.5 && dot < n) discard;\n}\n\n//gl_FragColor = vec4(u,u,u,1)*0.5;\ngl_FragColor = vec4(color.rgb * color.a,color.a);\n\n}"

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = "attribute vec2 a_position;\nattribute vec2 a_normal;\nattribute vec4 a_color;\nattribute float a_size;\nattribute float a_dis;\nattribute float a_dashed;\nattribute float a_flag;\nattribute float a_u;\n\nuniform mat3 u_matrix;\n\nvarying vec4 color;\nvarying float dis;\nvarying float dashed;\nvarying float flag;\nvarying float u;\n\nvoid main() {\n\nvec2 pos  = a_position + a_normal * a_size;\ngl_Position = vec4((u_matrix*vec3(pos,1)).xy,0.5,1);\ndis = a_dis;\ndashed = a_dashed;\nflag = a_flag;\ncolor = a_color/255.0;\nu = a_u;\n}\n"

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = " precision mediump float;\n\n//vec4 color = vec4(77, 72, 91,255);\n\nvarying vec2 v_texCoord;\nvarying float size;\nvarying vec4 label_color;\n\n\nuniform sampler2D u_image;\nuniform float u_camera_scale;\n\n\nvoid main() {\n    vec4 color = label_color / 255.0;\n\n    float cutoff = 0.72;\n    float offset = 6.0/size * u_camera_scale;\n\n    offset = pow(offset,1.4);\n\n    offset = min((1.0-cutoff),offset);\n\n   float dist = texture2D(u_image, v_texCoord).r;\n   float alpha = smoothstep(cutoff - offset, cutoff + offset, dist);\n   gl_FragColor = color *alpha;\n//   gl_FragColor =  vec4(0, 1,0,1);\n}"

/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = "attribute vec2 a_position;\nattribute vec2 a_uv;\nattribute float a_size;\nattribute vec4 a_color;\n\nuniform mat3 u_matrix;\nuniform sampler2D u_image;\n\n\nvarying vec2 v_texCoord;\nvarying float size;\nvarying vec4 label_color;\n\nvoid main() {\ngl_Position = vec4((u_matrix*vec3(a_position,1)).xy,0,1);\nv_texCoord = a_uv;\nsize = a_size;\nlabel_color = a_color;\n}\n"

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = "//#ifdef GL_OES_standard_derivatives\n//#extension GL_OES_standard_derivatives : enable\n//#endif\n\n precision mediump float;\n\nvarying vec4 color;\nvarying float selected;\nvarying vec2 uv;\nvarying float flag;\nvarying float size;\nvarying float showicon;\nvarying vec4 icon_color;\n\n\nuniform sampler2D u_icons_texture;\nuniform vec4 u_borderColor;\nuniform float u_sample_ratio;\n\nvec4 borderColor = u_borderColor/255.0;\n\nvoid main()\n{\n   float r = 0.0;\n   float alpha = 1.0;\n   float blur = min(0.05,4.0/size) ;\n   float border = min(0.75,0.06*size) ;\n\n    if(flag > 0.5 && flag < 1.5) //flag =1 base\n    {\n        vec4 nodecolor = color;\n        vec2 cxy = 2.0 * uv - 1.0;\n        r = length(cxy);\n\n        if(r > 1.0 ){\n            discard;\n        }\n\n        if(r > 1.0-blur){\n            alpha = 1.0 -  smoothstep(1.0-blur, 1.0, r) ;\n         }\n\n\n         if( selected > 0.5  && r > border && r < border + blur){\n            nodecolor = mix(nodecolor,borderColor,smoothstep(border, border + blur, r));\n        }\n\n         if( selected > 0.5  &&  r >= border + blur){\n            nodecolor = borderColor;\n         }\n\n          gl_FragColor = nodecolor * alpha;\n\n    }else if(flag > 1.5 && flag < 2.5) {//flag =2 icon\n        if(showicon < 0.5) discard;\n        gl_FragColor = texture2D(u_icons_texture,uv).w * icon_color;\n    }else if((flag > -0.5 && flag < 0.5)){//flat = 0 selected bg\n\n    //    float scale = 1.35;\n    //    float border_start = 1.0/1.35;\n    //    float border_end = border_start * 1.1;\n\n        if(selected < 0.5) discard;//selected = 0 ingore\n\n        vec2 cxy = 2.0 * uv - 1.0;\n        r = length(cxy);\n\n        if(r > 1.0 ){\n            gl_FragColor = vec4(0,0,0,0);\n        }else{\n    //         if(r >= border_start && r <= border_end){\n    //                 gl_FragColor = vec4(borderColor.rgb,0.75);\n    //         }else{\n                     r = smoothstep(0.7,1.0,r);\n                     gl_FragColor = vec4(borderColor.rgb,0.65)*(1.0-r);\n    //         }\n        }\n    }\n\n}\n"

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = "\n precision mediump float;\nattribute vec2 a_position;\nattribute vec4 a_color;\nattribute vec4 a_icon_color;\nattribute vec2 a_uv;\nattribute float a_selected;\nattribute float a_flag;\nattribute float a_size;\nattribute float a_showicon;\nattribute vec2 a_center;\n\nuniform mat3 u_matrix;\nuniform float u_camera_scale;\nuniform float u_sample_ratio;\n\nvarying vec4 color;\nvarying vec4 icon_color;\nvarying float selected;\nvarying vec2 uv;\nvarying float flag;\nvarying float size;\nvarying float showicon;\n\n\nvoid main() {\n\n    float zindex = 0.1;\n\n    if(a_selected > 0.5) zindex = 0.05;\n\n\n    gl_Position = vec4((u_matrix*vec3((a_position+a_center),1)).xy,zindex,1);\n    color = a_color/255.0;\n    selected = a_selected;\n    uv = a_uv;\n    flag = a_flag;\n\n    size = a_size / u_camera_scale ;\n    showicon = a_showicon;\n\n    icon_color = a_icon_color/255.0;\n}\n"

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = "//#ifdef GL_OES_standard_derivatives\n//#extension GL_OES_standard_derivatives : enable\n//#endif\n\n precision mediump float;\n\nvarying vec4 color;\nvarying vec4 icon_color;\nvarying float img;\nvarying float selected;\nvarying vec2 uv;\nvarying float flag;\nvarying float showicon;\n\n\n//uniform sampler2D u_textures[10];\nuniform sampler2D u_icons_texture;\nuniform vec4 u_borderColor;\nuniform float u_sample_ratio;\n\n\nvec4 borderColor = u_borderColor/255.0;\n\nvoid main()\n{\n   float r = 0.0, alpha = 1.0,\n   blur = 0.05 ,\n   border = 0.75 ;\n\n\nif(flag > 0.5 && flag < 1.5) //flag =1\n{\n    vec4 nodecolor = color;\n    vec2 cxy = 2.0 * uv - 1.0;\n    cxy = abs(cxy);\n\n\n//     if( selected > 0.5  && r > border && r < border + blur){\n//        nodecolor = mix(nodecolor,borderColor,smoothstep(border, border + blur, r));\n//    }\n\n     if(  selected > 0.5 && (cxy.x > 0.65  ||  cxy.y > 0.65)){\n        nodecolor = borderColor;\n     }\n\n      gl_FragColor = nodecolor * alpha;\n\n}else if(flag > 1.5 && flag < 2.5) {//flag =2\n    if(showicon < 0.5) discard;\n    gl_FragColor = texture2D(u_icons_texture,uv).w * icon_color;\n}else if((flag > -0.5 && flag < 0.5)){//flat = 0 selected background\n\n    if(selected < 0.5) discard;\n\n     vec2 cxy = 2.0 * uv - 1.0;\n     r = length(cxy);\n\n     if(r > 1.0 ){\n         discard;\n     }\n\n     r = smoothstep(0.6,1.0,r);\n\n      gl_FragColor = vec4(borderColor.rgb,0.8)*(1.0-r);\n }\n\n\n}\n"

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = "\n precision mediump float;\nattribute vec2 a_position;\nattribute vec4 a_color;\nattribute vec4 a_icon_color;\nattribute float a_img;\nattribute vec2 a_uv;\nattribute float a_selected;\nattribute float a_flag;\nattribute float a_showicon;\n\nuniform mat3 u_matrix;\nuniform float u_camera_scale;\nuniform float u_sample_ratio;\n\nvarying vec4 color;\nvarying vec4 icon_color;\nvarying float img;\nvarying float selected;\nvarying vec2 uv;\nvarying float flag;\nvarying float showicon;\n\n\nvoid main() {\n\n\n    gl_Position = vec4((u_matrix*vec3(a_position,1)).xy,0,1);\n    color = a_color/255.0;\n    img = a_img;\n    selected = a_selected;\n    uv = a_uv;\n    flag = a_flag;\n    showicon = a_showicon;\n    icon_color = a_icon_color/255.0;\n}\n"

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tween = exports.GLUtil = exports.util = exports.GraphView = exports.WebGLRender = exports.Graph = undefined;

var _Graph = __webpack_require__(5);

Object.defineProperty(exports, 'Graph', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Graph).default;
  }
});

var _index = __webpack_require__(10);

Object.defineProperty(exports, 'WebGLRender', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

var _index2 = __webpack_require__(9);

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

var _GLUtil2 = __webpack_require__(3);

var _GLUtil = _interopRequireWildcard(_GLUtil2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.GLUtil = _GLUtil;

/***/ })
/******/ ]);
});
//# sourceMappingURL=klgraph.js.map