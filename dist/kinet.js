(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Kinet"] = factory();
	else
		root["Kinet"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(1);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _index2.default; // this is here for webpack to expose Kinet as window.Kinet

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Kinet = function () {
    function Kinet(options) {
        _classCallCheck(this, Kinet);

        this._handlers = {
            start: [],
            tick: [],
            end: []
        };

        this._friction = options && options.friction ? 1 - options.friction : 1 - 0.3;
        this._acceleration = options && options.acceleration ? options.acceleration : 0.04;
        this._raf = null;
        this._target = options && options.initialValue ? options.initialValue : 0;

        this.current = options && options.initialValue ? options.initialValue : 0;
        this.velocity = 0;
    }

    _createClass(Kinet, [{
        key: 'animate',
        value: function animate() {
            var _this = this;

            var distance = this.update();

            if (Math.abs(this.current - this.target) > 0.1) {
                this._raf = requestAnimationFrame(this.animate.bind(this));
                this._handlers['tick'].forEach(function (handler) {
                    return handler(_this.current, _this.target);
                });
            } else {
                this.current = this.target;
                this._handlers['end'].forEach(function (handler) {
                    return handler(_this.current, _this.target);
                });
                this._raf = null;
            }
        }
    }, {
        key: 'update',
        value: function update() {
            var distance = this.target - this.current;
            var attraction = distance * this._acceleration;

            this.applyForce(attraction);

            this.velocity *= this._friction;
            this.current += this.velocity;

            return distance;
        }
    }, {
        key: 'applyForce',
        value: function applyForce(force) {
            this.velocity += force;
        }
    }, {
        key: 'on',
        value: function on(event, handler) {
            if (this._handlers[event]) {
                this._handlers[event].push(handler);
            } else {
                console.warn('Unsupported event ' + event + '.');
            }
        }
    }, {
        key: 'off',
        value: function off(event, handler) {
            if (event != null) {
                if (handler != null) {
                    if (this._handlers[event] && this._handlers[event].filter(function (savedHandler) {
                        return savedHandler === handler;
                    }).length) {
                        var toRemove = this._handlers[event].filter(function (savedHandler) {
                            return savedHandler === handler;
                        })[0];
                        var index = this._handlers[event].indexOf(toRemove);
                        if (index > -1) {
                            this._handlers[event].splice(index, 1);
                        }
                    } else {
                        console.warn('Handler for event ' + event + ' no found.');
                    }
                } else {
                    this._handlers[event] = [];
                }
            } else {
                this._handlers = {};
            }
        }
    }, {
        key: 'target',
        set: function set(num) {
            var _this2 = this;

            this._target = num;
            if (!this._raf) {
                this._handlers['start'].forEach(function (handler) {
                    return handler(_this2.current, _this2.target);
                });
                this.animate();
            }
            return this._target;
        },
        get: function get() {
            return this._target;
        }
    }]);

    return Kinet;
}();

exports.default = Kinet;

/***/ })
/******/ ]);
});