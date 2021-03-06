// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"src/keyboarder.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Keyboarder = function () {
  function Keyboarder() {
    _classCallCheck(this, Keyboarder);

    this.keyState = {};

    window.addEventListener('keydown', function (e) {
      this.keyState[e.keyCode] = true;
    }.bind(this));

    window.addEventListener('keyup', function (e) {
      this.keyState[e.keyCode] = false;
    }.bind(this));
  }

  _createClass(Keyboarder, [{
    key: 'isDown',
    value: function isDown(keyCode) {
      return this.keyState[keyCode] === true;
    }
  }, {
    key: 'on',
    value: function on(keyCode, callback) {
      window.addEventListener('keydown', function (e) {
        if (e.keyCode === keyCode) {
          callback();
        }
      });
    }
  }]);

  return Keyboarder;
}();

Keyboarder.KEYS = { LEFT: 37, RIGHT: 39, UP: 38, DOWN: 40, S: 83 };

exports.default = Keyboarder;
},{}],"src/constants.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var canvas = exports.canvas = document.getElementById('game-canvas');
var screenSize = exports.screenSize = { x: canvas.width, y: canvas.height
};
},{}],"src/Player.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _keyboarder = require('./keyboarder');

var _keyboarder2 = _interopRequireDefault(_keyboarder);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
  function Player(game) {
    _classCallCheck(this, Player);

    this.game = game;
    this.keyboard = new _keyboarder2.default();
    // this.bullet = new Bullet()
    this.center = {
      x: _constants.screenSize.x / 2 - 10,
      y: 520
    };
    this.size = {
      x: 20,
      y: 20
    };
  }

  _createClass(Player, [{
    key: 'update',
    value: function update() {
      if (this.keyboard.isDown(_keyboarder2.default.KEYS.LEFT)) {
        this.center.x -= 5;
        if (this.center.x < 0) this.center.x = 550;
      }
      if (this.keyboard.isDown(_keyboarder2.default.KEYS.RIGHT)) {
        this.center.x += 5;
        if (this.center.x > _constants.canvas.width) this.center.x = 0;
      }
      if (this.keyboard.isDown(_keyboarder2.default.KEYS.UP)) {
        this.center.y -= 3;
        if (this.center.y < 0) this.center.y = 530;
      }
      if (this.keyboard.isDown(_keyboarder2.default.KEYS.DOWN)) {
        this.center.y += 3;
        if (this.center.y >= 530) this.center.y = 530;
      }
    }
  }, {
    key: 'draw',
    value: function draw() {
      this.game.context.fillStyle = 'grey';
      this.game.context.fillRect(this.center.x, this.center.y, this.size.x, this.size.y);
    }
  }]);

  return Player;
}();

exports.default = Player;
},{"./keyboarder":"src/keyboarder.js","./constants":"src/constants.js"}],"src/SmallStar.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _keyboarder = require('./keyboarder');

var _keyboarder2 = _interopRequireDefault(_keyboarder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SmallStar = function () {
  function SmallStar(game) {
    _classCallCheck(this, SmallStar);

    this.game = game;
    this.keyboard = new _keyboarder2.default();
    this.center = {
      x: Math.floor(Math.random() * 550),
      y: Math.floor(Math.random() * 550)
    };
    this.size = {
      x: 1,
      y: 1
    };
  }

  _createClass(SmallStar, [{
    key: 'draw',
    value: function draw() {
      this.game.context.fillStyle = 'white';
      this.game.context.fillRect(this.center.x, this.center.y, this.size.x, this.size.y);
    }
  }, {
    key: 'update',
    value: function update() {
      this.center.y += 0.2;
      if (this.center.y >= 530) {
        this.center.y = 0;this.center.x = Math.floor(Math.random() * 550);
      }
      if (this.keyboard.isDown(_keyboarder2.default.KEYS.UP)) {
        this.center.y += 0.5;
      }
    }
  }]);

  return SmallStar;
}();

exports.default = SmallStar;
},{"./keyboarder":"src/keyboarder.js"}],"src/Star.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _keyboarder = require('./keyboarder');

var _keyboarder2 = _interopRequireDefault(_keyboarder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Star = function () {
  function Star(game) {
    _classCallCheck(this, Star);

    this.game = game;
    this.center = {
      x: Math.floor(Math.random() * 550),
      y: Math.floor(Math.random() * 550)
    };
    this.keyboard = new _keyboarder2.default();
    this.size = {
      x: 4,
      y: 4
    };
  }

  _createClass(Star, [{
    key: 'draw',
    value: function draw() {
      this.game.context.fillStyle = 'white';
      this.game.context.fillRect(this.center.x, this.center.y, this.size.x, this.size.y);
    }
  }, {
    key: 'update',
    value: function update() {
      this.center.y += 1;
      if (this.keyboard.isDown(_keyboarder2.default.KEYS.UP)) {
        this.center.y += 1;
      }
      if (this.keyboard.isDown(_keyboarder2.default.KEYS.DOWN)) {
        this.center.y -= 0.25;
      }
      if (this.center.y >= 530) {
        this.center.y = 0;this.center.x = Math.floor(Math.random() * 550);
      }
    }
  }]);

  return Star;
}();

exports.default = Star;
},{"./keyboarder":"src/keyboarder.js"}],"src/invaders.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Invaders = function () {
  function Invaders(game) {
    _classCallCheck(this, Invaders);

    this.game = game;
    this.center = {
      x: Math.floor(Math.random() * 550),
      y: 10
    };
    this.speed = Math.random() * 3 + 2;
    this.size = {
      x: 20,
      y: 20
    };
  }

  _createClass(Invaders, [{
    key: 'update',
    value: function update() {
      this.center.y += this.speed + 0;
      if (this.center.y >= 530) {
        this.center.y = 0;
        this.center.x = Math.floor(Math.random() * 550);
        this.speed = Math.random() * 4 + 1;
      }
    }
  }, {
    key: 'draw',
    value: function draw() {
      this.game.context.fillStyle = 'red';
      this.game.context.fillRect(this.center.x, this.center.y, this.size.x, this.size.y);
    }
  }]);

  return Invaders;
}();

exports.default = Invaders;
},{}],"src/game.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Player = require('./Player');

var _Player2 = _interopRequireDefault(_Player);

var _SmallStar = require('./SmallStar');

var _SmallStar2 = _interopRequireDefault(_SmallStar);

var _Star = require('./Star');

var _Star2 = _interopRequireDefault(_Star);

var _invaders = require('./invaders');

var _invaders2 = _interopRequireDefault(_invaders);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // import Keyboarder from './keyboarder'

// import { screenSize, canvas } from './constants'


function startGame() {
  var game = new Game('game-canvas');
  game.start();
}

var Game = function () {
  function Game(canvasId) {
    var _this = this;

    _classCallCheck(this, Game);

    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext('2d');
    this.size = { width: this.canvas.width, height: this.canvas.height };
    this.player = new _Player2.default(this);
    this.invaders = [];
    for (var i = 0; i < 10; i++) {
      this.invaders.push(new _invaders2.default(this));
    }
    this.star = [];
    for (var i = 0; i < 25; i++) {
      this.star.push(new _Star2.default(this));
    }
    this.smallstar = [];
    for (var i = 0; i < 25; i++) {
      this.smallstar.push(new _SmallStar2.default(this));
    }
    this.ticks = 0;

    var tick = function tick() {
      _this.ticks++;
      _this.update();
      _this.draw();
      window.requestAnimationFrame(_this.tick.bind(_this));
    };
    this.tick = tick;
  }

  _createClass(Game, [{
    key: 'start',
    value: function start() {
      this.tick();
    }
  }, {
    key: 'update',
    value: function update() {
      this.player.update();
      this.invaders.forEach(function (invaders) {
        invaders.update();
      });
      this.star.forEach(function (star) {
        star.update();
      });
      this.smallstar.forEach(function (smallstar) {
        smallstar.update();
      });
    }
  }, {
    key: 'draw',
    value: function draw() {
      this.context.clearRect(0, 0, this.size.width, this.size.height);
      this.star.forEach(function (star) {
        star.draw();
      });
      this.smallstar.forEach(function (smallstar) {
        smallstar.draw();
      });
      this.player.draw();
      this.invaders.forEach(function (invaders) {
        invaders.draw();
      });
    }
  }]);

  return Game;
}();

startGame();
exports.default = Game;
},{"./Player":"src/Player.js","./SmallStar":"src/SmallStar.js","./Star":"src/Star.js","./invaders":"src/invaders.js"}],"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '62173' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/game.js"], null)
//# sourceMappingURL=/game.5ea2b669.map