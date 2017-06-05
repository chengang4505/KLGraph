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
/******/ 	return __webpack_require__(__webpack_require__.s = 46);
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

/***/ }),
/* 4 */
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
/* 5 */
/***/ (function(module, exports) {

module.exports = " precision mediump float;\n\nvec4 color = vec4(77, 72, 91,255);\n\nvarying vec2 v_texCoord;\nvarying float size;\n\n\nuniform sampler2D u_image;\nuniform float u_camera_scale;\n\n\nvoid main() {\n    color = color / 255.0;\n\n    float cutoff = 0.76;\n    float offset = 6.0/size * u_camera_scale;\n\n    offset = pow(offset,1.2);\n\n    offset = min((1.0-cutoff),offset);\n\n   float dist = texture2D(u_image, v_texCoord).r;\n   float alpha = smoothstep(cutoff - offset, cutoff + offset, dist);\n   gl_FragColor = color *alpha;\n}"

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
                attr = edge.source + edge.target;
                if (!map[attr]) map[attr] = map[edge.target + edge.source] = { counter: 0, source: edge.source };

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

            this.createEdgeCurveCount();

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
            // console.time('setNodeData')
            var node = this.nodesIndex[id];

            var updatePos = false;
            if (obj.hasOwnProperty('x') || obj.hasOwnProperty('y')) updatePos = true;

            for (var attr in obj) {
                node[attr] = obj[attr];
                obj[attr] = true;
            }

            this.emit('change', ['node', id, obj]);
            if (updatePos) {
                obj = { source: true, target: true };
                this.inEdgesIndex[id] && this.inEdgesIndex[id].length > 0 && this.emit('change', ['edge', this.inEdgesIndex[id], obj]);
                this.outEdgesIndex[id] && this.outEdgesIndex[id].length > 0 && this.emit('change', ['edge', this.outEdgesIndex[id], obj]);
            }
            // console.timeEnd('setNodeData')
        }
    }, {
        key: 'setEdgeData',
        value: function setEdgeData(id, obj) {
            var edge = this.edgesIndex[id];
            for (var attr in obj) {
                edge[attr] = obj[attr];
                obj[attr] = true;
            }
            this.emit('change', ['edge', id, obj]);
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
/* 7 */
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

        var _this2 = _possibleConstructorReturn(this, (WebGLRender.__proto__ || Object.getPrototypeOf(WebGLRender)).call(this));

        _this2.context = context;
        _this2.config = _this2.context.config;

        _this2.container = container;
        _this2.graph = context.graph;

        _this2.needUpdate = true;
        _this2.sampleRatio = 1;

        // this.initTexture = false;
        // this.textureLoader = new TextureLoader();
        _this2.textureIcon = new _TextureIcon2.default(_this2.config, 0);
        _this2.textureText = new _TextureText2.default(_this2.config, 1);

        _this2.mouseType = mouseType;
        _this2.initGl();
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

        _this2.saveDataFrame = null;
        _this2.saveDataTex = null;

        /**
         * layers:　相关的layer
         * index: cache索引 map
         * flag:
         */
        _this2.renderCache = {
            graph: { layers: [], index: {}, flag: false, filters: [] },
            node: { layers: [], index: {}, flag: false, filters: [] },
            edge: { layers: [], index: {}, flag: false, filters: [] }
        };
        // this.clearAllFlag = true;
        _this2.renderLayerMap = {};
        _this2.renderLayersConfig = _this2.config.renderLayersConfig || WebGLRender.defaultLayersConfig;
        _this2.initRenderLayer();

        _this2.updateLayerData();

        // debugger
        _Event2.default.call(_this2);

        return _this2;
    }

    _createClass(WebGLRender, [{
        key: 'initGl',
        value: function initGl() {
            var option = {
                preserveDrawingBuffer: true,
                premultipliedAlpha: true,
                alpha: true,
                antialias: true
            };

            var canvas = this.container,
                gl;

            gl = canvas.getContext('experimental-webgl', option) || canvas.getContext('webgl', option);

            if (!gl) {
                throw 'browser not support webGl!';
            }

            gl.getExtension('OES_standard_derivatives');
            gl.getExtension('OES_element_index_uint');

            this.gl = gl;
        }
    }, {
        key: 'initEvent',
        value: function initEvent() {
            var _this = this;
            this.graph.on('change', function (type, ids, dirtyAttr) {
                if (type == 'node') {
                    _this.updateNodeRenderData(ids, dirtyAttr);
                } else if (type == 'edge') {
                    _this.updateEdgeRenderData(ids, dirtyAttr);
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

                var addtexts = getAddText(objs);
                if (addtexts.length > 0) {
                    _this.textureText.addTexts(addtexts);
                    _this.textureText.attachGl(_this.gl);
                }
                _this.clearRenderCache();
            });
            this.graph.on('remove', function (type, ids) {
                _this.forceRender();
                var contextRelativeLayers = _this.renderCache[type].layers;
                var renderLayerMap = _this.renderLayerMap;

                contextRelativeLayers.forEach(function (layer) {
                    renderLayerMap[layer].indexCache = false;
                });
            });

            function getAddText(objs) {
                var infos = _this.textureText.textinfo.infos;
                var char, len;
                var texts = [];
                objs.forEach(function (e) {
                    if (!e.label) return;
                    len = e.label.length;
                    for (var i = 0; i < len; i++) {
                        char = e.label.charAt(i);
                        if (!infos[char]) {
                            texts.push(char);
                        }
                    }
                });

                return texts;
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

            this.textureText.attachGl(this.gl);
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

            this.textureIcon.attachGl(this.gl);
        }
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

                    if (subLayer.enable == undefined) subLayer.enable = true;
                    if (subLayer.show == undefined) subLayer.show = true;
                    if (subLayer.option == undefined) subLayer.option = {};
                    if (subLayer.filters == undefined) subLayer.filters = [];

                    renderLayerMap[subLayer.name] = subLayer;

                    if (subLayer.custom) return;

                    program = (0, _GLUtil.loadProgram)(gl, [(0, _GLUtil.loadShader)(gl, subLayer.render.shaderVert, gl.VERTEX_SHADER), (0, _GLUtil.loadShader)(gl, subLayer.render.shaderFrag, gl.FRAGMENT_SHADER)]);

                    program.activeAttributes = (0, _GLUtil.getActiveAttributes)(gl, program);
                    program.activeUniforms = (0, _GLUtil.getActiveUniforms)(gl, program);

                    strip = subLayer.render.strip;

                    if (!subLayer.render.strip) strip = (0, _GLUtil.calculateStrip)(subLayer.render.attributes);

                    program.offsetConfig = { config: subLayer.render.attributes, strip: strip };
                    program.uniforms = null;
                    program.vertexBuffer = gl.createBuffer();
                    program.indexBuffer = gl.createBuffer();
                    program.indexN = 0;

                    subLayer.mainLayer = layer.name;
                    subLayer.program = program;
                    subLayer.initBuffer = false;
                    subLayer.tempVertex = [];
                    subLayer.tempIndex = [];
                    subLayer.index = [];
                    subLayer.indexCache = false;

                    if (subLayer.check == undefined) subLayer.check = function () {
                        return true;
                    };

                    _this.renderCache[subLayer.context].layers.push(subLayer.name);
                });
            }.bind(this));
        }
        //render

    }, {
        key: 'render',
        value: function render() {
            // debugger
            this.resizeCanvas();
            // setTimeout(this.render2.bind(this),500);
            // console.time('render');

            this.updateLayerData();

            // console.time('updateLayerUniformData');
            this.updateLayerUniformData();
            // console.timeEnd('updateLayerUniformData');

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
    }, {
        key: 'setDefaultRenderFlag',
        value: function setDefaultRenderFlag() {
            var gl = this.gl;
            // gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
            gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
            // gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA,gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
            gl.enable(gl.BLEND);
            gl.disable(gl.DEPTH_TEST);
            gl.clearColor(1, 1, 1, 1);
        }
    }, {
        key: 'draw',
        value: function draw() {

            var num = 0;
            var mainLayer, subLayers, layer, gl, err, renderLayerMap, program;
            renderLayerMap = this.renderLayerMap;

            gl = this.gl;
            gl.clear(gl.COLOR_BUFFER_BIT);
            this.setDefaultRenderFlag();

            this.emit('renderBefore', [this]);

            for (var i = 0; i < this.renderLayersConfig.length; i++) {
                mainLayer = this.renderLayersConfig[i];
                subLayers = mainLayer.subLayers;

                for (var j = 0; j < subLayers.length; j++) {

                    if (!subLayers[j].enable || !subLayers[j].show) continue;

                    //custom render
                    if (subLayers[j].custom && subLayers[j].render) {
                        subLayers[j].render.call(subLayers[j], this, subLayers[j].option);
                        continue;
                    }

                    if (subLayers[j].render.renderBefore && _util2.default.isFunction(subLayers[j].render.renderBefore)) {
                        subLayers[j].renderBefore.render.call(subLayers[j], this, subLayers[j].option);
                    }

                    layer = subLayers[j].name;

                    program = renderLayerMap[layer].program;

                    if (program.indexN == 0) continue;

                    gl.useProgram(program);

                    gl.bindBuffer(gl.ARRAY_BUFFER, program.vertexBuffer);
                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, program.indexBuffer);

                    if (err = (0, _GLUtil.vertexAttribPointer)(gl, program.activeAttributes, program.offsetConfig)) {
                        throw new Error('render layer[ ' + layer + ' ] err:\n ' + err);
                    }

                    if (err = (0, _GLUtil.setUniforms)(gl, program.activeUniforms, program.uniforms)) {
                        throw new Error('render layer[ ' + layer + ' ] err:\n ' + err);
                    }

                    gl.drawElements(gl.TRIANGLES, program.indexN, gl.UNSIGNED_INT, 0);

                    if (subLayers[j].render.renderAfter && _util2.default.isFunction(subLayers[j].render.renderAfter)) {
                        subLayers[j].render.renderAfter.call(subLayers[j], this, subLayers[j].option);
                    }

                    gl.bindBuffer(gl.ARRAY_BUFFER, null);
                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
                }
            }

            this.emit('renderAfter', [this]);

            // console.log('render count:',num);
        }
    }, {
        key: 'updateCacheByData',
        value: function updateCacheByData(context, data, dirtyAttr, needUpdateLayers) {

            var cacheIndex, temp, points;
            var contextRelativeLayers = this.renderCache[context].layers;
            var renderLayerMap = this.renderLayerMap;
            var gl = this.gl;

            cacheIndex = this.renderCache[context].index[data.id] = this.renderCache[context].index[data.id] || {};

            needUpdateLayers = needUpdateLayers || contextRelativeLayers;

            // debugger
            needUpdateLayers.forEach(function (layer) {

                if (!renderLayerMap[layer].check(data) || !renderLayerMap[layer].enable) return;

                //dirtyAttr setData update
                if (dirtyAttr && !renderLayerMap[layer].cache) return;

                temp = renderLayerMap[layer].render.getRenderData({
                    dirtyAttr: dirtyAttr,
                    oldData: cacheIndex[layer] ? cacheIndex[layer].data : null,
                    data: data,
                    config: this.config,
                    graph: this.graph,
                    textureText: this.textureText,
                    option: renderLayerMap[layer].option,
                    // textureLoader: this.textureLoader,
                    textureIcon: this.textureIcon
                });

                if (!temp) return;

                if (renderLayerMap[layer].cache) {
                    gl.bindBuffer(gl.ARRAY_BUFFER, renderLayerMap[layer].program.vertexBuffer);
                    gl.bufferSubData(gl.ARRAY_BUFFER, cacheIndex[layer].vertexStart, new Float32Array(temp.vertices));

                    cacheIndex[layer].data.vertices = temp.vertices; //cache old data
                } else {
                    points = renderLayerMap[layer].tempVertex.length / renderLayerMap[layer].program.offsetConfig.strip;

                    cacheIndex[layer] = cacheIndex[layer] || { vertexStart: -1, data: null };

                    cacheIndex[layer].data = temp; //cache old data

                    cacheIndex[layer].vertexStart = renderLayerMap[layer].tempVertex.length * 4;
                    temp.vertices.forEach(function (e) {
                        renderLayerMap[layer].tempVertex.push(e);
                    });
                    temp.indices.forEach(function (e, i) {
                        temp.indices[i] = e + points;
                        // renderLayerMap[layer].tempIndex.push(temp.indices[i])
                    });
                }
            }.bind(this));
        }
    }, {
        key: 'updateContextCache',
        value: function updateContextCache(context) {
            if (context != 'node' && context != 'edge' && context != 'graph') return;

            var datas, contextRelativeLayers, needUpdateLayers;
            var gl = this.gl;
            var renderLayerMap = this.renderLayerMap;

            if (context === 'graph') {} else {

                needUpdateLayers = [];
                contextRelativeLayers = this.renderCache[context].layers;
                contextRelativeLayers.forEach(function (layer) {
                    if (!renderLayerMap[layer].cache && renderLayerMap[layer].enable) needUpdateLayers.push(layer);
                });

                if (needUpdateLayers.length < 1) return;

                datas = context == 'node' ? this.graph.nodes : this.graph.edges;
                for (var i = 0, len = datas.length; i < len; i++) {
                    this.updateCacheByData(context, datas[i], null, needUpdateLayers);
                }

                needUpdateLayers.forEach(function (layer) {

                    gl.bindBuffer(gl.ARRAY_BUFFER, renderLayerMap[layer].program.vertexBuffer);
                    // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, renderLayerMap[layer].program.indexBuffer);

                    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(renderLayerMap[layer].tempVertex), gl.DYNAMIC_DRAW);
                    // gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(renderLayerMap[layer].tempIndex), gl.STATIC_DRAW);

                    renderLayerMap[layer].cache = true;

                    renderLayerMap[layer].tempVertex = [];
                    renderLayerMap[layer].tempIndex = [];
                });
            }
        }
    }, {
        key: 'updateLayerData',
        value: function updateLayerData() {
            // console.time('updateContextCacheNode');
            this.updateContextCache('node');
            // console.timeEnd('updateContextCacheNode');

            // console.time('updateContextCacheEdge');
            this.updateContextCache('edge');
            // console.timeEnd('updateContextCacheEdge');

            this.clearAllFlag = false;
        }
    }, {
        key: 'updateLayerIndex',
        value: function updateLayerIndex(context) {
            if (context != 'node' && context != 'edge' && context != 'graph') return;

            var datas, contextRelativeLayers, cacheIndex, data, needUpdateLayer, check;
            var gl = this.gl;
            var renderLayerMap = this.renderLayerMap;

            if (context === 'graph') {} else {
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

                        cacheIndex = this.renderCache[context].index[data.id];
                        for (var layer in cacheIndex) {
                            if (renderLayerMap[layer].indexCache) continue;

                            //layer filters
                            if (renderLayerMap[layer].filters && renderLayerMap[layer].filters.length) {
                                if (check = this._checkFilters(renderLayerMap[layer].filters, data)) continue;
                            }

                            cacheIndex[layer].data.indices.forEach(function (id) {
                                renderLayerMap[layer].index.push(id);
                            });
                        }
                    }

                    needUpdateLayer.forEach(function (layer) {
                        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, renderLayerMap[layer].program.indexBuffer);
                        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(renderLayerMap[layer].index), gl.STATIC_DRAW);
                        renderLayerMap[layer].program.indexN = renderLayerMap[layer].index.length;
                        renderLayerMap[layer].index = [];
                        renderLayerMap[layer].indexCache = true;
                    });
                }
            }
        }
    }, {
        key: 'updateLayerUniformData',
        value: function updateLayerUniformData() {
            var uniforms, err;
            var renderLayerMap = this.renderLayerMap;

            for (var layer in renderLayerMap) {
                if (renderLayerMap[layer].custom) continue;
                uniforms = renderLayerMap[layer].render.getUniforms({
                    matrix: _Matrix2.default.multiMatrix([this.getCameraMatrix(true), this.projectMatrix]),
                    camera: this.camera,
                    config: this.config,
                    option: renderLayerMap[layer].option,
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
    }, {
        key: 'updateNodeRenderData',
        value: function updateNodeRenderData(id, dirtyAttr) {
            // debugger
            this.forceRender();
            // if(this.clearAllFlag) return;
            this.updateCacheByData('node', this.graph.nodesIndex[id], dirtyAttr);
        }
    }, {
        key: 'updateEdgeRenderData',
        value: function updateEdgeRenderData(ids, dirtyAttr) {
            this.forceRender();
            // if(this.clearAllFlag) return;
            if (!Array.isArray(ids)) ids = [ids];
            ids.forEach(function (id) {
                this.updateCacheByData('edge', this.graph.edgesIndex[id], dirtyAttr);
            }.bind(this));
        }
        //cache update

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
                    _this.renderLayerMap[layer].indexCache = false;
                    _this.renderLayerMap[layer].program.indexN = 0;
                });
            } else {
                for (var layer in _this.renderLayerMap) {
                    if (_this.renderLayerMap[layer].custom) continue;

                    _this.renderLayerMap[layer].cache = false;
                    _this.renderLayerMap[layer].indexCache = false;
                    _this.renderLayerMap[layer].program.indexN = 0;
                }
                _this.renderCache.graph.index = {};
                _this.renderCache.node.index = {};
                _this.renderCache.edge.index = {};
            }
        }
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
    }, {
        key: 'enableRenderLayer',
        value: function enableRenderLayer(layers) {
            var updateCache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            this.forceRender();

            var renderLayerMap = this.renderLayerMap;

            if (!_util2.default.isArray(layers)) layers = [layers];

            layers.forEach(function (layer) {
                if (renderLayerMap[layer]) {
                    renderLayerMap[layer].enable = true;
                    if (updateCache) {
                        renderLayerMap[layer].cache = false;
                        renderLayerMap[layer].indexCache = false;
                        renderLayerMap[layer].program.indexN = 0;
                    }
                }
            });
        }
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
    }, {
        key: 'getLayerFilters',
        value: function getLayerFilters(layer) {
            return this.renderLayerMap[layer] ? this.renderLayerMap[layer].filters : null;
        }
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
    }, {
        key: 'getContextFilters',
        value: function getContextFilters(context) {
            return this.renderCache[context] ? this.renderCache[context].filters : null;
        }
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
    }, {
        key: 'setMouseType',
        value: function setMouseType(type) {
            // if(mouseType[type]){
            this.container.style.cursor = type;
            // }
        }
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
    }, {
        key: 'getCameraMatrix',
        value: function getCameraMatrix(isInvert) {
            var mat = _Matrix2.default.multiMatrix([_Matrix2.default.matrixFromScale(this.camera.scale, this.camera.scale), _Matrix2.default.matrixFromRotation(this.camera.rotation), _Matrix2.default.matrixFromTranslate(this.camera.positionX, this.camera.positionY)]);
            return isInvert ? _Matrix2.default.invert(mat) : mat;
        }
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
    }, {
        key: 'forceRender',
        value: function forceRender() {
            this.needUpdate = true;
        }
    }, {
        key: 'zoomFromPostion',
        value: function zoomFromPostion(ratio, x, y, animation) {
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
/* 8 */
/***/ (function(module, exports) {

module.exports = "attribute vec2 a_position;\nattribute vec2 a_uv;\nattribute float a_size;\n\nuniform mat3 u_matrix;\nuniform sampler2D u_image;\n\n\nvarying vec2 v_texCoord;\nvarying float size;\n\nvoid main() {\ngl_Position = vec4((u_matrix*vec3(a_position,1)).xy,0,1);\nv_texCoord = a_uv;\nsize = a_size;\n}\n"

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Graph = __webpack_require__(6);

var _Graph2 = _interopRequireDefault(_Graph);

var _render2 = __webpack_require__(7);

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

        this.graph = new _Graph2.default({
            nodes: option.nodes,
            edges: option.edges
        });

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
            this.render.on('nodeMouseDown', function (node, e) {
                // debugger
                if (!_this.selection.isNodeSelected(node.id)) _this.selection.selectNodes(node.id, e.shiftKey);else if (e.shiftKey) _this.selection.unSelectNode(node.id);
            });

            this.render.on('nodeRightClick', function (type, node, e) {
                if (type == 'node' && !_this.selection.isNodeSelected(node)) _this.selection.selectNodes(node);
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

var _render = __webpack_require__(7);

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
    }events.click = handlerWrap(_clickHandler);

    //some little situation maybe need the trigger function.
    this.trigger = function (type, event) {
        if (events[type]) events[type](event);
    };

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

        if (edge.curveCount == 0) {
            check = _util2.default.inLine(posx, posy, source.x, source.y, target.x, target.y, (edge.size || config.defaultEdgeSize) / 2);
        } else {
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

        var isRight = e.which && e.which == 3 || e.button && e.button == 2;

        if (isRight) return;

        mouseDown = true;
        disableMove = true;

        var graphPos = _this.cameraToGraphPos({ x: e.cameraX, y: e.cameraY });
        var node = getNode(graphPos);

        if (node) _this.emit('nodeMouseDown', [node, e]);

        handleDrag(!node);
        // _this.forceRender();

        function handleDrag(isCamera) {
            var isDown = true;
            var startx = graphPos.x,
                starty = graphPos.y;

            var onmousemove = handlerWrap(function (e) {
                if (!isDown) return;
                // console.time('move')

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

                    if (_this.context.selection.isNodeSelected(node.id)) {
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

            _this.container.removeEventListener('mousemove', onmousemove);
            _this.container.removeEventListener('mouseup', onmouseup);
            _this.container.removeEventListener('mouseout', onmouseout);

            _this.container.addEventListener('mousemove', onmousemove);
            _this.container.addEventListener('mouseup', onmouseup);
            _this.container.addEventListener('mouseout', onmouseout);

            function clear() {
                // _this.setMouseType(_this.mouseType.DEFAULT);
                onmousemove && _this.container.removeEventListener('mousemove', onmousemove);
                onmouseup && _this.container.removeEventListener('mouseup', onmouseup);
                onmouseout && _this.container.removeEventListener('mouseout', onmouseout);
                onmousemove = onmouseup = onmouseout = null;

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

        var isRight = e.which && e.which == 3 || e.button && e.button == 2;

        if (mouseDown && !mouseMove && !isRight) {
            _clickHandler(e);
        }

        if (isRight) {
            var graphPos = _this.cameraToGraphPos({ x: e.cameraX, y: e.cameraY });
            var node = getNode(graphPos);
            var edge;
            if (node) {
                _this.emit('nodeRightClick', [node, e]);
            } else if (edge = getEdge(graphPos)) {
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
            _this.zoomFromPostion(1 / ratio, e.cameraX, e.cameraY);
            _this.emit('zoom', [1 / ratio, _this.camera.scale, e]);
        } else {
            _this.zoomFromPostion(ratio, e.cameraX, e.cameraY);
            _this.emit('zoom', [ratio, _this.camera.scale, e]);
        }
    }

    //drag

    function handlerWrap(handle) {
        return function (e) {
            var pos = _this.domToCameraPos({ x: e.offsetX, y: e.offsetY });
            e.cameraX = pos.x;
            e.cameraY = pos.y;
            handle(e);
        };
    }

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

        _this2.canvas.addEventListener('mousedown', _this2.mouseDown.bind(_this2));

        _this2.rect = null;

        _this2.data = {
            edges: [],
            nodes: []
        };

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
            var config = this.context.config;
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            ctx.fillStyle = config.selectionFillStyle;
            ctx.strokeStyle = config.selectionStrokeStyle;
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

            this.rect = { x: 0, y: 0, w: 0, h: 0 };

            this.rect.x = e.offsetX;
            this.rect.y = e.offsetY;

            _this.emit('selectStart', [_this]);

            document.addEventListener('mousemove', mouseMove);
            document.addEventListener('mouseup', mouseUp);
            function mouseMove(e) {
                _this.rect.w = e.offsetX - _this.rect.x;
                _this.rect.h = e.offsetY - _this.rect.y;

                _this.renderRect();
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
        value: function _delete() {
            var _this = this;
            var nodes = this.data.nodes;
            this.data.nodes = [];
            nodes.forEach(function (id) {
                _this.context.graph.removeNode(id);
            });
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
    defaultNodeBorder: '#d4525f',
    // node
    defaultNodeSize: 10,
    defaultNodeColor: "#3a82a8",
    //edge
    defaultEdgeColor: "rgba(100,100,100,0.3)",
    defaultEdgeSize: 1.6,
    defaultEdgeArrowSize: 5,

    zoomRatio: 1.2,
    zoomMin: 0.05,
    zoomMax: 20,

    textureIconWidth: 1024,
    textureIconHeight: 1024,
    textureIconFontFamily: 'FontAwesome',

    textureTextFontFamily: 'Arial',

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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function id(d) {
    return d.id;
}

var ColaLayout = function () {
    function ColaLayout() {
        _classCallCheck(this, ColaLayout);
    }

    _createClass(ColaLayout, [{
        key: 'layout',
        value: function layout(nodes, edges) {
            if (!d3 || !d3.forceSimulation) throw 'please add d3 lib first';

            var data = this._init(nodes, edges);

            this.simulation = d3.forceSimulation(data.nodes).force("charge", d3.forceManyBody(-50)).force("link", d3.forceLink(data.edges).id(id).distance(100)).force("collide", d3.forceCollide(20)).force("center", d3.forceCenter());

            this.simulation.stop();

            var n = 100;
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

    return ColaLayout;
}();

exports.default = ColaLayout;

/***/ }),
/* 20 */
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
}

TextSDF.prototype.draw = function (char) {
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

    function TextureIcon(config, unit) {
        _classCallCheck(this, TextureIcon);

        // this.gl = gl;
        var _this = _possibleConstructorReturn(this, (TextureIcon.__proto__ || Object.getPrototypeOf(TextureIcon)).call(this));

        _this.texture = null;
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
        value: function attachGl(gl, unit) {
            if (unit !== undefined && unit !== null) this.unit = unit;
            gl.activeTexture(gl.TEXTURE0 + this.unit);
            gl.bindTexture(gl.TEXTURE_2D, this.createTexture(gl, this.icons.length == 0));
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
        value: function createTexture(gl, empty) {

            var texture = gl.createTexture();
            gl.activeTexture(gl.TEXTURE0 + this.unit);
            gl.bindTexture(gl.TEXTURE_2D, texture);

            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

            if (empty) gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 4, 4, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);else gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.iconinfo.img);
            return texture;
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

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by chengang on 17-4-5.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


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

    function TextureText(config, unit) {
        _classCallCheck(this, TextureText);

        var _this = _possibleConstructorReturn(this, (TextureText.__proto__ || Object.getPrototypeOf(TextureText)).call(this));

        _this.border = 2;

        _this.unit = unit || 1;
        _this.fontSize = 48;
        _this.fontFamily = config.textureTextFontFamily;

        _this.canvas = null;

        _this.textinfo = null;

        _this.texts = [];

        _this.sdf = new _TextSDF2.default(_this.fontSize, _this.fontSize / 8, _this.fontSize / 3, null, _this.fontFamily);

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

            c.width = (num + 1) * width + 2 * this.border;
            c.height = (num + 1) * height + 2 * this.border;

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

            // document.body.appendChild(c);
            // c.style.position = 'absolute';
            // c.style.top = '100px';

            // this.updateGPUTexture();
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
        key: 'attachGl',
        value: function attachGl(gl, unit) {
            if (unit !== undefined && unit !== null) this.unit = unit;
            gl.activeTexture(gl.TEXTURE0 + this.unit);
            gl.bindTexture(gl.TEXTURE_2D, this.createTexture(gl));
        }
    }, {
        key: 'addTexts',
        value: function addTexts(strs) {
            if (strs.length == 0) return;

            strs.forEach(function (e) {
                this.texts.push(e);
            }.bind(this));

            var texts = this.texts;

            this.clear();
            this.createCanvasImg(texts);
        }
    }, {
        key: 'createTexture',
        value: function createTexture(gl) {

            var texture = gl.createTexture();

            gl.activeTexture(gl.TEXTURE0 + this.unit);
            gl.bindTexture(gl.TEXTURE_2D, texture);

            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.textinfo.img);

            return texture;
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.textinfo = null;
            this.texts = [];
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


    var temp, program;
    var layerIndexMap = {};
    var _this = this;

    data.forEach(function (e) {
        if (e.filter) return;
        layers.forEach(function (layer) {
            if (!cacheIndex[e.id][layer] || !renderLayerMap[layer].enable || !renderLayerMap[layer].show) return;

            layerIndexMap[layer] = layerIndexMap[layer] || [];
            temp = cacheIndex[e.id][layer].data.indices;
            temp && temp.forEach(function (index) {
                layerIndexMap[layer].push(index);
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
        subLayers: [{ name: 'edge', context: 'edge', render: WebGLRender.edge.default, check: edgeCount(0) }, { name: 'edgeCurve', context: 'edge', render: WebGLRender.edge.curve, check: edgeCount(0, true) }, { name: 'edgeLabel', context: 'edge', render: WebGLRender.edgeLabel.default, check: edgeCount(0) }, { name: 'edgeCurveLabel', context: 'edge', render: WebGLRender.edgeLabel.curve, check: edgeCount(0, true) }, { name: 'node', context: 'node', render: WebGLRender.node.default, check: layerCheckDefault() }, { name: 'rectNode', context: 'node', render: WebGLRender.node.rect, check: layerCheck('rect') }, { name: 'nodeLabel', context: 'node', render: WebGLRender.nodeLabel.default }, { name: 'nodeOver', custom: true, render: _customOverRender2.default, option: { over: false } }]
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
        a_ratio: { components: 1, start: 12 }
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

        var dx = target.x - source.x;
        var dy = target.y - source.y;

        var dis = _util2.default.getDistance(source.x, source.y, target.x, target.y);
        var tNodeW, tNodeH, tSize;
        tNodeW = _util2.default.getNodeSizeX(target);
        tNodeH = _util2.default.getNodeSizeY(target);

        if (tNodeH && tNodeW && tNodeH == tNodeW) {
            tSize = tNodeW;
        } else {
            tSize = Math.sqrt(Math.pow(tNodeW || defaultSize, 2) + Math.pow(tNodeH || defaultSize, 2));
        }

        var size = (data.size || config.defaultEdgeSize) / 2;
        var aSize = data.arrowSize || config.defaultEdgeArrowSize;
        var vX, vY;

        // var tX = target.x - tSize / dis * dx;
        // var tY = target.y - tSize / dis * dy;
        var tX = target.x;
        var tY = target.y;

        var ctrlP = _util2.default.getControlPos(source.x, source.y, tX, tY, data.curveCount, data.curveOrder);

        //arrow
        var dis1 = _util2.default.getDistance(tX, tY, ctrlP[0], ctrlP[1]);
        var arrowPosRatio = (1 - (tSize + aSize) / dis1) * 0.5 + 0.5;
        var arrowPos = _util2.default.getPointOnQuadraticCurve(arrowPosRatio, source.x, source.y, tX, tY, ctrlP[0], ctrlP[1]);
        var aTangent = _util2.default.getPointTangentOnQuadraticCurve(arrowPosRatio, source.x, source.y, tX, tY, ctrlP[0], ctrlP[1]);

        vX = aTangent[0] * aSize;
        vY = aTangent[1] * aSize;

        var arrowX = arrowPos[0],
            arrowY = arrowPos[1];

        //curve
        var color = _util2.default.parseColor(data.color || source.color || config.defaultEdgeColor);

        var scalePos = scaleTrangles([source.x, source.y, ctrlP[0], ctrlP[1], tX, tY]);
        var scaleUV = scaleTrangles([1, 1, 0.5, 0, 0, 0]);

        var dashed = data.dashed ? 1 : 0;
        // debugger
        //curve
        addData(renderData, [scalePos[0], scalePos[1], scaleUV[0], scaleUV[1], dis, 0, color.r, color.g, color.b, color.a, dashed, size, arrowPosRatio]);
        addData(renderData, [scalePos[2], scalePos[3], scaleUV[2], scaleUV[3], dis, 0, color.r, color.g, color.b, color.a, dashed, size, arrowPosRatio]);
        addData(renderData, [scalePos[4], scalePos[5], scaleUV[4], scaleUV[5], dis, 0, color.r, color.g, color.b, color.a, dashed, size, arrowPosRatio]);

        addIndices(indices, [0, 1, 2]);

        //arrow
        addData(renderData, [arrowX + vX, arrowY + vY, 0, 0, 0, 1, color.r, color.g, color.b, color.a, dashed, size, arrowPosRatio]);
        addData(renderData, [arrowX + vY * 0.6, arrowY - vX * 0.6, 0, 0, 0, 1, color.r, color.g, color.b, color.a, dashed, size, arrowPosRatio]);
        addData(renderData, [arrowX - vY * 0.6, arrowY + vX * 0.6, 0, 0, 0, 1, color.r, color.g, color.b, color.a, dashed, size, arrowPosRatio]);

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
    scale = scale || 1.6;
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
        var edge = data;
        var dx = target.x - source.x;
        var dy = target.y - source.y;
        // var dis = util.getDistance(source.x,source.y,target.x,target.y);
        var dashed = data.dashed ? 1 : 0;

        var defaultSize = config.defaultNodeSize;

        var size = (data.size || config.defaultEdgeSize) / 2,
            arrowSize = data.arrowSize || config.defaultEdgeArrowSize;
        var crossVector = _util2.default.normalize([-dy, dx]);

        //arrow
        var tNodeW, tNodeH, targetSize;
        tNodeW = _util2.default.getNodeSizeX(target);
        tNodeH = _util2.default.getNodeSizeY(target);

        if (tNodeH && tNodeW && tNodeH == tNodeW) {
            targetSize = tNodeW;
        } else {
            targetSize = Math.sqrt(Math.pow(tNodeW || defaultSize, 2) + Math.pow(tNodeH || defaultSize, 2));
        }

        var dis = _util2.default.getDistance(source.x, source.y, target.x, target.y);
        var arrowX = target.x - (targetSize + arrowSize) / dis * dx;
        var arrowY = target.y - (targetSize + arrowSize) / dis * dy;

        var color = _util2.default.parseColor(edge.color || source.color || config.defaultEdgeColor);

        var renderData = [];
        var indices = [];

        addData(renderData, [source.x, source.y, crossVector[0], crossVector[1], size, color.r, color.g, color.b, color.a, dis, dashed, 0, 0]);
        addData(renderData, [source.x, source.y, -crossVector[0], -crossVector[1], size, color.r, color.g, color.b, color.a, dis, dashed, 0, 0]);
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

var _labelFrag = __webpack_require__(5);

var _labelFrag2 = _interopRequireDefault(_labelFrag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by chengang on 17-4-7.
 */

exports.default = {
    shaderVert: _edgeLabelVert2.default,
    shaderFrag: _labelFrag2.default,
    attributes: {
        a_position: { components: 2, start: 0 },
        a_uv: { components: 2, start: 2 },
        a_size: { components: 1, start: 4 }
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

        var target = graph.nodesIndex[data.target];
        var source = graph.nodesIndex[data.source];

        if (!data.label) return null;

        var defaultSize = config.defaultNodeSize;

        // debugger
        var str = data.label.split('');

        var renderData = [];
        var indices = [];

        var size = data.fontSize || Math.max(_util2.default.getNodeSizeX(source) || defaultSize, _util2.default.getNodeSizeY(source) || defaultSize) / 3;
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

            addData(renderData, [startx, starty, x1, y1, width], centerX, centerY, angle);
            addData(renderData, [startx, starty - charHeight, x1, y2, width], centerX, centerY, angle);
            addData(renderData, [startx + width, starty, x2, y1, width], centerX, centerY, angle);
            addData(renderData, [startx + width, starty - charHeight, x2, y2, width], centerX, centerY, angle);

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

var _nodeLabelVert = __webpack_require__(41);

var _nodeLabelVert2 = _interopRequireDefault(_nodeLabelVert);

var _labelFrag = __webpack_require__(5);

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
        a_size: { components: 1, start: 4 }
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

        var str = data.label.split('');

        var renderData = [];
        var indices = [];

        var sizeX = _util2.default.getNodeSizeX(data) || defaultSize,
            sizeY = _util2.default.getNodeSizeY(data) || defaultSize;
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

        var startx = totalWidht / 2 * -1 + data.x;
        var starty = data.y - sizeY;
        var x1, y1, x2, y2;

        var points = 0;
        for (var i = 0; i < str.length; i++) {
            char = str[i];
            if (!infos[char]) {
                // console.log(1);
                continue;
            }

            width = infos[char].width * charWidth;
            uv = infos[char].uvs;
            x1 = uv[0], y1 = uv[1], x2 = uv[2], y2 = uv[3];

            addData(renderData, [startx, starty, x1, y1, width]);
            addData(renderData, [startx, starty - charHeight, x1, y2, width]);
            addData(renderData, [startx + width, starty, x2, y1, width]);
            addData(renderData, [startx + width, starty - charHeight, x2, y2, width]);

            addIndices(indices, [points + 0, points + 1, points + 2, points + 1, points + 2, points + 3]);

            startx += width * 7 / 8;
            points += 4;
        }
        return {
            vertices: renderData,
            indices: indices
        };
    }
}; /**
    * Created by chengang on 17-4-7.
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

var _labelFrag = __webpack_require__(5);

var _labelFrag2 = _interopRequireDefault(_labelFrag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by chengang on 17-4-7.
 */

exports.default = {
    shaderVert: _edgeLabelVert2.default,
    shaderFrag: _labelFrag2.default,
    attributes: {
        a_position: { components: 2, start: 0 },
        a_uv: { components: 2, start: 2 },
        a_size: { components: 1, start: 4 }
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

        var target = graph.nodesIndex[data.target];
        var source = graph.nodesIndex[data.source];

        if (!data.label) return null;

        var defaultSize = config.defaultNodeSize;

        // debugger
        var str = data.label.split('');

        var renderData = [];
        var indices = [];

        var size = data.fontSize || Math.max(_util2.default.getNodeSizeX(source) || defaultSize, _util2.default.getNodeSizeY(source) || defaultSize) / 3;
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

            addData(renderData, [startx, starty, x1, y1, width], centerX, centerY, angle);
            addData(renderData, [startx, starty - charHeight, x1, y2, width], centerX, centerY, angle);
            addData(renderData, [startx + width, starty, x2, y1, width], centerX, centerY, angle);
            addData(renderData, [startx + width, starty - charHeight, x2, y2, width], centerX, centerY, angle);

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

var _defaultVert = __webpack_require__(43);

var _defaultVert2 = _interopRequireDefault(_defaultVert);

var _defaultFrag = __webpack_require__(42);

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
        a_center: { components: 2, start: 12 }
    },
    getUniforms: function getUniforms(_ref) {
        var matrix = _ref.matrix,
            camera = _ref.camera,
            config = _ref.config,
            sampleRatio = _ref.sampleRatio,
            textureLoader = _ref.textureLoader,
            textureIcon = _ref.textureIcon;

        var color = _util2.default.parseColor(config.defaultNodeBorder);
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
            oldData = _ref2.oldData,
            dirtyAttr = _ref2.dirtyAttr;


        data.size = data.size || config.defaultNodeSize;
        var isSelected = data.selected ? 1.0 : 0.0;
        var color = _util2.default.parseColor(data.color || config.defaultNodeColor);

        // debugger
        // var img = -1;
        // if (data.img && textureLoader.cache[data.img])
        //     img = textureLoader.cache[data.img];

        if (oldData && dirtyAttr && Object.keys(dirtyAttr).length == 2 && dirtyAttr.hasOwnProperty('x') && dirtyAttr.hasOwnProperty('y')) {
            // debugger
            var offset = 14;
            var oldVertices = oldData.vertices;
            for (var i = 0; i < oldVertices.length; i += offset) {
                oldVertices[i + 12] = data.x;
                oldVertices[i + 13] = data.y;
            }
            return {
                vertices: oldVertices
            };
        }

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
        addData(vertices, [-1 * data.size * bgScale, +1 * data.size * bgScale, color.r, color.g, color.b, color.a, 0, 0, isSelected, 0, data.size, hasIcon, data.x, data.y]);
        addData(vertices, [+1 * data.size * bgScale, +1 * data.size * bgScale, color.r, color.g, color.b, color.a, 1, 0, isSelected, 0, data.size, hasIcon, data.x, data.y]);
        addData(vertices, [-1 * data.size * bgScale, -1 * data.size * bgScale, color.r, color.g, color.b, color.a, 0, 1, isSelected, 0, data.size, hasIcon, data.x, data.y]);
        addData(vertices, [+1 * data.size * bgScale, -1 * data.size * bgScale, color.r, color.g, color.b, color.a, 1, 1, isSelected, 0, data.size, hasIcon, data.x, data.y]);

        addIndices(indices, [points + 0, points + 1, points + 2, points + 1, points + 2, points + 3]);
        points += 4;

        //base
        addData(vertices, [-1 * data.size, +1 * data.size, color.r, color.g, color.b, color.a, 0, 0, isSelected, 1, data.size, hasIcon, data.x, data.y]);
        addData(vertices, [+1 * data.size, +1 * data.size, color.r, color.g, color.b, color.a, 1, 0, isSelected, 1, data.size, hasIcon, data.x, data.y]);
        addData(vertices, [-1 * data.size, -1 * data.size, color.r, color.g, color.b, color.a, 0, 1, isSelected, 1, data.size, hasIcon, data.x, data.y]);
        addData(vertices, [+1 * data.size, -1 * data.size, color.r, color.g, color.b, color.a, 1, 1, isSelected, 1, data.size, hasIcon, data.x, data.y]);

        addIndices(indices, [points + 0, points + 1, points + 2, points + 1, points + 2, points + 3]);
        points += 4;

        var scale = 0.7;

        //icon
        addData(vertices, [-1 * data.size * scale, +1 * data.size * scale, color.r, color.g, color.b, color.a, uvs[0], uvs[1], isSelected, 2, data.size, hasIcon, data.x, data.y]);
        addData(vertices, [+1 * data.size * scale, +1 * data.size * scale, color.r, color.g, color.b, color.a, uvs[2], uvs[1], isSelected, 2, data.size, hasIcon, data.x, data.y]);
        addData(vertices, [-1 * data.size * scale, -1 * data.size * scale, color.r, color.g, color.b, color.a, uvs[0], uvs[3], isSelected, 2, data.size, hasIcon, data.x, data.y]);
        addData(vertices, [+1 * data.size * scale, -1 * data.size * scale, color.r, color.g, color.b, color.a, uvs[2], uvs[3], isSelected, 2, data.size, hasIcon, data.x, data.y]);

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

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

var _vert = __webpack_require__(45);

var _vert2 = _interopRequireDefault(_vert);

var _frag = __webpack_require__(44);

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
        a_showicon: { components: 1, start: 11 }
    },
    getUniforms: function getUniforms(_ref) {
        var matrix = _ref.matrix,
            camera = _ref.camera,
            config = _ref.config,
            sampleRatio = _ref.sampleRatio,
            textureLoader = _ref.textureLoader,
            textureIcon = _ref.textureIcon;

        var color = _util2.default.parseColor(config.defaultNodeBorder);
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

        var img = -1;
        if (data.img && textureLoader.cache.hasOwnProperty(data.img)) img = textureLoader.cache[data.img];

        var sizeX = data.width || data.size || config.defaultNodeSize;
        var sizeY = data.height || data.size || config.defaultNodeSize;
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
        var bgScale = 1.2;

        addData(renderData, [data.x - bgSize * bgScale, data.y + bgSize * bgScale, color.r, color.g, color.b, color.a, 0, 0, img, isSelected, 0, hasIcon]);
        addData(renderData, [data.x + bgSize * bgScale, data.y + bgSize * bgScale, color.r, color.g, color.b, color.a, 1, 0, img, isSelected, 0, hasIcon]);
        addData(renderData, [data.x - bgSize * bgScale, data.y - bgSize * bgScale, color.r, color.g, color.b, color.a, 0, 1, img, isSelected, 0, hasIcon]);
        addData(renderData, [data.x + bgSize * bgScale, data.y - bgSize * bgScale, color.r, color.g, color.b, color.a, 1, 1, img, isSelected, 0, hasIcon]);

        addIndices(indices, [points + 0, points + 1, points + 2, points + 1, points + 2, points + 3]);
        points += 4;

        //base
        addData(renderData, [data.x - sizeX, data.y + sizeY, color.r, color.g, color.b, color.a, 0, 0, img, isSelected, 1, hasIcon]);
        addData(renderData, [data.x + sizeX, data.y + sizeY, color.r, color.g, color.b, color.a, 1, 0, img, isSelected, 1, hasIcon]);
        addData(renderData, [data.x - sizeX, data.y - sizeY, color.r, color.g, color.b, color.a, 0, 1, img, isSelected, 1, hasIcon]);
        addData(renderData, [data.x + sizeX, data.y - sizeY, color.r, color.g, color.b, color.a, 1, 1, img, isSelected, 1, hasIcon]);

        addIndices(indices, [points + 0, points + 1, points + 2, points + 1, points + 2, points + 3]);
        points += 4;

        var scale = 0.85;
        //icon

        // debugger
        addData(renderData, [data.x - iconSize * scale, data.y + iconSize * scale, color.r, color.g, color.b, color.a, uvs[0], uvs[1], -2, isSelected, 2, hasIcon]);
        addData(renderData, [data.x + iconSize * scale, data.y + iconSize * scale, color.r, color.g, color.b, color.a, uvs[2], uvs[1], -2, isSelected, 2, hasIcon]);
        addData(renderData, [data.x - iconSize * scale, data.y - iconSize * scale, color.r, color.g, color.b, color.a, uvs[0], uvs[3], -2, isSelected, 2, hasIcon]);
        addData(renderData, [data.x + iconSize * scale, data.y - iconSize * scale, color.r, color.g, color.b, color.a, uvs[2], uvs[3], -2, isSelected, 2, hasIcon]);

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

module.exports = "#ifdef GL_OES_standard_derivatives\n#extension GL_OES_standard_derivatives : enable\n#endif\n\nprecision mediump float;\nvarying vec4 color;\nvarying vec2 uv;\nvarying float dis;\nvarying float flag;\nvarying float dashed;\nvarying float size;\nvarying float ratio;\n\nuniform float u_camera_scale;\n\n\n\nvoid main(){\n        float width = size / u_camera_scale;\n        float blur = clamp(0.6,0.05,width*1.0) ;\n        width = width + blur;\n        float blur_ratio = blur / width;\n        float scale = 1.0;\n\n        if(flag > -0.5 && flag < 0.5){//curve\n                vec2 px = dFdx(uv);\n                vec2 py = dFdy(uv);\n\n                float fx = 2.0 * uv.x * px.x - px.y;\n                float fy = 2.0 * uv.y * py.x - py.y;\n\n                float sd = (uv.x * uv.x - uv.y) / sqrt(fx * fx + fy * fy);\n\n                float alpha = 1.0 - abs(sd) / width;\n                if (alpha < 0.0 || uv.x < ratio || uv.x > 1.0) discard;\n\n                float n = 800.0/dis;\n                float dot = mod(uv.x*100.0,n);\n                if(dashed > 0.5 && dot > n*0.5 && dot < n) discard;\n\n                if(alpha < blur_ratio) scale = smoothstep(0.0,blur_ratio,alpha);\n\n                gl_FragColor = color*scale;\n\n        }else if(flag > 0.5 && flag < 1.5){//arrow\n                gl_FragColor = color;\n        }\n\n\n}"

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = "attribute vec2 a_position;\n//attribute vec2 a_normal;\nattribute vec4 a_color;\n//attribute float a_size;\nattribute vec2 a_uv;\nattribute float a_dis;\nattribute float a_dashed;\nattribute float a_flag;\nattribute float a_size;\nattribute float a_ratio;\n\nuniform mat3 u_matrix;\n\nvarying vec4 color;\nvarying vec2 uv;\nvarying float dis;\nvarying float dashed;\nvarying float flag;\nvarying float size;\nvarying float ratio;\n\nvoid main() {\n\n//vec2 pos  = a_position + a_normal * a_size;\ngl_Position = vec4((u_matrix*vec3(a_position,1)).xy,0,1);\nuv = a_uv;\ndis = a_dis;\nflag = a_flag;\ncolor = a_color/255.0;\ncolor = vec4(color.rgb * color.a,color.a);\ndashed = a_dashed;\nsize = a_size;\nratio = 1.0 - a_ratio;\n}\n"

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = "precision mediump float;\nvarying vec4 color;\nvarying float dis;\nvarying float dashed;\nvarying float flag;\nvarying float u;\n\n\nvoid main(){\n\nif(flag > -0.5 && flag < 0.5){//edge\n    float n = 800.0/dis;\n    float dot = mod(u*100.0,n);\n    if(dashed > 0.5 && dot > n*0.5 && dot < n) discard;\n}\n\n//gl_FragColor = vec4(u,u,u,1)*0.5;\ngl_FragColor = vec4(color.rgb * color.a,color.a);\n\n}"

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = "attribute vec2 a_position;\nattribute vec2 a_normal;\nattribute vec4 a_color;\nattribute float a_size;\nattribute float a_dis;\nattribute float a_dashed;\nattribute float a_flag;\nattribute float a_u;\n\nuniform mat3 u_matrix;\n\nvarying vec4 color;\nvarying float dis;\nvarying float dashed;\nvarying float flag;\nvarying float u;\n\nvoid main() {\n\nvec2 pos  = a_position + a_normal * a_size;\ngl_Position = vec4((u_matrix*vec3(pos,1)).xy,0,1);\ndis = a_dis;\ndashed = a_dashed;\nflag = a_flag;\ncolor = a_color/255.0;\nu = a_u;\n}\n"

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = "attribute vec2 a_position;\nattribute vec2 a_uv;\nattribute float a_size;\n\nuniform mat3 u_matrix;\nuniform sampler2D u_image;\n\n\nvarying vec2 v_texCoord;\nvarying float size;\n\nvoid main() {\ngl_Position = vec4((u_matrix*vec3(a_position,1)).xy,0,1);\nv_texCoord = a_uv;\nsize = a_size;\n}\n"

/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = "//#ifdef GL_OES_standard_derivatives\n//#extension GL_OES_standard_derivatives : enable\n//#endif\n\n precision mediump float;\n\nvarying vec4 color;\nvarying float selected;\nvarying vec2 uv;\nvarying float flag;\nvarying float size;\nvarying float showicon;\n\n\n\nuniform sampler2D u_icons_texture;\nuniform vec4 u_borderColor;\nuniform float u_sample_ratio;\n\nvec4 borderColor = u_borderColor/255.0;\n\nvoid main()\n{\n   float r = 0.0;\n   float alpha = 1.0;\n   float blur = min(0.05,4.0/size) ;\n   float border = min(0.75,0.06*size) ;\n\nif(flag > 0.5 && flag < 1.5) //flag =1 base\n{\n    vec4 nodecolor = color;\n    vec2 cxy = 2.0 * uv - 1.0;\n    r = length(cxy);\n\n    if(r > 1.0 ){\n        discard;\n    }\n\n    if(r > 1.0-blur){\n        alpha = 1.0 -  smoothstep(1.0-blur, 1.0, r) ;\n     }\n\n\n     if( selected > 0.5  && r > border && r < border + blur){\n        nodecolor = mix(nodecolor,borderColor,smoothstep(border, border + blur, r));\n    }\n\n     if( selected > 0.5  &&  r >= border + blur){\n        nodecolor = borderColor;\n     }\n\n      gl_FragColor = nodecolor * alpha;\n\n}else if(flag > 1.5 && flag < 2.5) {//flag =2 icon\n    if(showicon < 0.5) discard;\n    gl_FragColor = texture2D(u_icons_texture,uv).w * vec4(1,1,1,1);\n}else if((flag > -0.5 && flag < 0.5)){//flat = 0 selected bg\n\n    if(selected < 0.5) discard;\n\n    vec2 cxy = 2.0 * uv - 1.0;\n    r = length(cxy);\n\n    if(r > 1.0 ){\n        discard;\n    }\n\n    r = smoothstep(0.7,1.0,r);\n\n     gl_FragColor = vec4(borderColor.rgb,0.8)*(1.0-r);\n//     gl_FragColor = vec4(1.0,0.0,0.0,0.8);\n}\n\n\n//     gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n\n\n}\n"

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = "\n precision mediump float;\nattribute vec2 a_position;\nattribute vec4 a_color;\nattribute vec2 a_uv;\nattribute float a_selected;\nattribute float a_flag;\nattribute float a_size;\nattribute float a_showicon;\nattribute vec2 a_center;\n\nuniform mat3 u_matrix;\nuniform float u_camera_scale;\nuniform float u_sample_ratio;\n\nvarying vec4 color;\nvarying float selected;\nvarying vec2 uv;\nvarying float flag;\nvarying float size;\nvarying float showicon;\n\n\nvoid main() {\n\nfloat zindex = 0.1;\n\nif(a_selected > 0.5) zindex = 0.05;\n\n\ngl_Position = vec4((u_matrix*vec3((a_position+a_center),1)).xy,zindex,1);\ncolor = a_color/255.0;\nselected = a_selected;\nuv = a_uv;\nflag = a_flag;\n\nsize = a_size / u_camera_scale ;\nshowicon = a_showicon;\n}\n"

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = "//#ifdef GL_OES_standard_derivatives\n//#extension GL_OES_standard_derivatives : enable\n//#endif\n\n precision mediump float;\n\nvarying vec4 color;\nvarying float img;\nvarying float selected;\nvarying vec2 uv;\nvarying float flag;\nvarying float showicon;\n\n\n//uniform sampler2D u_textures[10];\nuniform sampler2D u_icons_texture;\nuniform vec4 u_borderColor;\nuniform float u_sample_ratio;\n\n\nvec4 borderColor = u_borderColor/255.0;\n\nvoid main()\n{\n   float r = 0.0, alpha = 1.0,\n   blur = 0.05 ,\n   border = 0.75 ;\n\n\nif(flag > 0.5 && flag < 1.5) //flag =1\n{\n    vec4 nodecolor = color;\n    vec2 cxy = 2.0 * uv - 1.0;\n    cxy = abs(cxy);\n\n\n//     if( selected > 0.5  && r > border && r < border + blur){\n//        nodecolor = mix(nodecolor,borderColor,smoothstep(border, border + blur, r));\n//    }\n\n     if(  selected > 0.5 && (cxy.x > 0.65  ||  cxy.y > 0.65)){\n        nodecolor = borderColor;\n     }\n\n      gl_FragColor = nodecolor * alpha;\n\n}else if(flag > 1.5 && flag < 2.5) {//flag =2\n    if(showicon < 0.5) discard;\n    gl_FragColor = texture2D(u_icons_texture,uv).w * vec4(1,1,1,1);\n}else if((flag > -0.5 && flag < 0.5)){//flat = 0 selected background\n\n    if(selected < 0.5) discard;\n\n     vec2 cxy = 2.0 * uv - 1.0;\n     r = length(cxy);\n\n     if(r > 1.0 ){\n         discard;\n     }\n\n     r = smoothstep(0.6,1.0,r);\n\n      gl_FragColor = vec4(borderColor.rgb,0.8)*(1.0-r);\n }\n\n\n}\n"

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = "\n precision mediump float;\nattribute vec2 a_position;\nattribute vec4 a_color;\nattribute float a_img;\nattribute vec2 a_uv;\nattribute float a_selected;\nattribute float a_flag;\nattribute float a_showicon;\n\nuniform mat3 u_matrix;\nuniform float u_camera_scale;\nuniform float u_sample_ratio;\n\nvarying vec4 color;\nvarying float img;\nvarying float selected;\nvarying vec2 uv;\nvarying float flag;\nvarying float showicon;\n\n\nvoid main() {\n\n\ngl_Position = vec4((u_matrix*vec3(a_position,1)).xy,0,1);\ncolor = a_color/255.0;\nimg = a_img;\nselected = a_selected;\nuv = a_uv;\nflag = a_flag;\nshowicon = a_showicon;\n}\n"

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tween = exports.GLUtil = exports.util = exports.GraphView = exports.WebGLRender = exports.Graph = undefined;

var _Graph = __webpack_require__(6);

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