
    (function(modules) {
        const require = function(id) {
            let { code, deps } = modules[id]

            const localRequire = function(name) {
                return require(deps[name])
            }

            const localModule = {
                exports: {

                }
            }

            // 执行代码
            code(localRequire, localModule, localModule.exports)

            return localModule.exports
        }

        require(1)
    })({
            1: {
                code: function(require, modules, exports) { "use strict";

var _util = require("./util");

var _math = require("./math");

var calculate = function calculate() {
  return (0, _math.add)(1, 2);
};

(0, _util.log)('calculate() :', calculate());
document.body.innerHTML = "calculate() : ".concat(calculate()); },
                deps: {
    "./util": 2,
    "./math": 3
}
            },
        
            2: {
                code: function(require, modules, exports) { "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.log = void 0;
var log = console.log.bind(console);
exports.log = log; },
                deps: {}
            },
        
            3: {
                code: function(require, modules, exports) { "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.log2 = exports.add = void 0;

var _util = require("./util");

var _number = require("./number");

var add = function add(a, b) {
  return a + b;
};

exports.add = add;

var add1 = function add1(a) {
  return add(a, _number.one);
};

var log2 = function log2() {
  return (0, _util.log)('fake log');
};

exports.log2 = log2; },
                deps: {
    "./util": 4,
    "./number": 5
}
            },
        
            4: {
                code: function(require, modules, exports) { "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.log = void 0;
var log = console.log.bind(console);
exports.log = log; },
                deps: {}
            },
        
            5: {
                code: function(require, modules, exports) { "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.one = void 0;
var one = 1;
exports.one = one; },
                deps: {}
            },
        })
    