'use strict';

require('@babel/polyfill/noConflict');

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _server = require('./server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var jwt = require('jsonwebtoken');

_server2.default.express.use((0, _cookieParser2.default)());

// TODO
_server2.default.express.use(function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var _ref2, token, _jwt$verify, userId;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref2 = req.headers || {}, token = _ref2.authorization;

            if (token && token !== 'null') {
              try {
                _jwt$verify = jwt.verify(token, process.env.APP_SECRET), userId = _jwt$verify.userId;

                req.userId = userId;
              } catch (error) {}
            }
            next();

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());

// TODO SET Credentials
_server2.default.start({
  port: process.env.PORT || 4000,
  cors: {
    credentials: true,
    origin: true
  }
}, function (deets) {
  console.log('Server is now running on port http://localhost:' + deets.port);
});