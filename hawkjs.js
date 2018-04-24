(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["HawkJs"] = factory();
	else
		root["HawkJs"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = undefined;

var _core = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
/**
 * HawkJs
 * @version 1.0.0
 * @authers Ali Nawaz, Farrukh Ayaz
 */

var App = exports.App = function App(props) {
  _classCallCheck(this, App);

  new _core.Reactivity(props);
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Http = exports.Component = exports.Reactivity = undefined;

var _reactor = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           *
                                                                                                                                                           * Core Class
                                                                                                                                                           * @verison 1.0.0
                                                                                                                                                           *
                                                                                                                                                           */

var Reactivity = exports.Reactivity = function Reactivity(props) {
  _classCallCheck(this, Reactivity);

  return new _reactor.Reactor(props);
};

// TODO


var Component = exports.Component = function Component() {
  _classCallCheck(this, Component);
};

// TODO


var Http = exports.Http = function Http() {
  _classCallCheck(this, Http);
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Reactor = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Reactor Class
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @version 1.0.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _parser = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Reactor = exports.Reactor = function () {
	function Reactor(props) {
		_classCallCheck(this, Reactor);

		this.props = props;
		this.signals = {};
		this.parser = new _parser.Parser(props);
		this.boot(props);
	}

	_createClass(Reactor, [{
		key: 'boot',
		value: function boot(props) {
			for (var key in props.data) {
				if (props.data.hasOwnProperty(key)) {
					this.globalize(props.data, key);
				}
			}
			this.dom();
		}
	}, {
		key: 'globalize',
		value: function globalize(obj, key) {
			var val = obj[key];
			var lastVal = val;
			var me = this;
			Object.defineProperty(obj, key, {
				get: function get() {
					return val;
				},
				set: function set(newVal) {
					val = newVal;
					me.notify(key);
				}
			});
		}
	}, {
		key: 'react',
		value: function react(node, observable, property) {
			if (node.tagName == 'INPUT') {
				node.value = observable[property];
				this.observe(property, function () {
					return node.value = observable[property];
				});
				node.onkeydown = function (e) {
					observable[property] = this.value;
				};
			} else if (node.directive == 'if') {
				var variableName = node.getAttribute('h-if');
				this.observe(variableName, function () {
					if (!observable[variableName]) {
						node.style.display = 'none';
					} else {
						node.style.display = '';
					}
				});
			} else if (node.directive == 'for') {
				var me = this;
				var statement = node.getAttribute('h-for');
				var chunk = statement.split(' ');
				me.processFor(node, observable, chunk);
				observable[chunk[2]].push = function () {
					Array.prototype.push.apply(this, arguments);
					me.processFor(node, observable, chunk);
					node.style.display = 'none';
				};
				node.style.display = 'none';
			} else {
				node.textContent = observable[property];
				this.observe(property, function () {
					return node.textContent = observable[property];
				});
			}
		}
	}, {
		key: 'processFor',
		value: function processFor(node, observable, chunk) {
			node.removeAttribute('style');
			var childs = Array.from(node.parentElement.childNodes);
			while (node.parentElement.childNodes.length > 2) {
				node.parentElement.removeChild(node.parentElement.lastChild);
			}
			console.log(node.parentElement);
			var parent = node.parentElement;
			var iterable = observable[chunk[2]];
			for (var i = 0; i < iterable.length; i++) {
				var nodeClone = node.cloneNode(true);
				var content = nodeClone.textContent.replace(chunk[0], '');
				content = content.replace('{{', '');
				content = content.replace('}}', '');
				content = content.trim();
				if (content == '') {
					nodeClone.textContent = nodeClone.textContent.replace(nodeClone.textContent, iterable[i]);
				} else {
					if (content.charAt(0) == '.') content = content.substr(1);
					nodeClone.textContent = nodeClone.textContent.replace(nodeClone.textContent, this.resolveMethodChaining(iterable[i], content));
				}
				nodeClone.removeAttribute('h-for');
				parent.appendChild(nodeClone);
			}
		}
	}, {
		key: 'resolveMethodChaining',
		value: function resolveMethodChaining(chainedObject, pathString) {
			pathString = pathString.split('.');
			var current = chainedObject;
			while (pathString.length) {
				if ((typeof current === 'undefined' ? 'undefined' : _typeof(current)) !== 'object') return undefined;
				current = current[pathString.shift()];
			}
			return current;
		}
	}, {
		key: 'observe',
		value: function observe(property, signalHandler) {
			if (!this.signals[property]) this.signals[property] = [];
			this.signals[property].push(signalHandler);
		}
	}, {
		key: 'notify',
		value: function notify(signal) {
			if (!this.signals[signal] || this.signals[signal].length < 1) return;
			this.signals[signal].forEach(function (signalHandler) {
				return signalHandler();
			});
		}
	}, {
		key: 'dom',
		value: function dom() {
			var me = this;
			this.parser.directive('[h-text]', function (node, props, property) {
				node.directive = 'text';
				me.react(node, props.data, property);
			});
			this.parser.directive('[h-model]', function (node, props, property) {
				node.directive = 'model';
				me.react(node, props.data, property);
			});
			this.parser.directive('[h-if]', function (node, props, property) {
				node.directive = 'if';
				me.react(node, props.data, property);
			});
			this.parser.directive('[h-for]', function (node, props, property) {
				node.directive = 'for';
				me.react(node, props.data, property);
			});
			this.parser.directive('[h-click]', function (node, props, property) {
				var methodName = node.getAttribute('h-click');
				node.directive = 'click';
				node.onclick = props.methods[methodName].bind(Object.assign(props.data, props.methods));
			});
		}
	}]);

	return Reactor;
}();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *
 * Parser Class
 * @version 1.0.0
 *
 */

var Parser = exports.Parser = function () {
  function Parser(props) {
    _classCallCheck(this, Parser);

    this.props = props;
  }

  _createClass(Parser, [{
    key: 'query',
    value: function query(queryString) {
      var el = document.getElementById(this.props.el);
      return el.querySelectorAll(queryString);
    }
  }, {
    key: 'directive',
    value: function directive(nameString, callback) {
      var nameStringSimple = nameString.replace('[', '').replace(']', '');
      var directives = this.query(nameString);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = directives[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var node = _step.value;

          callback(node, this.props, node.attributes[nameStringSimple].value);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }]);

  return Parser;
}();

/***/ })
/******/ ]);
});