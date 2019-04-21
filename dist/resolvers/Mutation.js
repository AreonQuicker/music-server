'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _utils = require('../utils/utils');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var Mutation = {
  createSong: function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, args, _ref, info) {
      var prisma = _ref.prisma,
          request = _ref.request;
      var userId, song;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              userId = request.request.userId;

              if (userId) {
                _context.next = 3;
                break;
              }

              throw new Error('You must be signed in soooon');

            case 3:
              _context.next = 5;
              return prisma.mutation.createSong({
                data: _extends({}, args, {
                  uploadedAuthor: {
                    connect: {
                      id: userId
                    }
                  }
                })
              }, info);

            case 5:
              song = _context.sent;
              return _context.abrupt('return', song);

            case 7:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function createSong(_x, _x2, _x3, _x4) {
      return _ref2.apply(this, arguments);
    }

    return createSong;
  }(),
  signUp: function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(parent, args, _ref3, info) {
      var prisma = _ref3.prisma,
          request = _ref3.request;
      var password, createdUser, user, token;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if ((0, _utils.validateEmail)(args.email)) {
                _context2.next = 2;
                break;
              }

              throw new Error('Invalid email.');

            case 2:
              if ((0, _utils.validatePassword)(args.password)) {
                _context2.next = 4;
                break;
              }

              throw new Error('Invalid password.');

            case 4:
              _context2.next = 6;
              return bcrypt.hash(args.password, 10);

            case 6:
              password = _context2.sent;
              _context2.next = 9;
              return prisma.mutation.createUser({
                data: _extends({}, args, {
                  password: password
                })
              }, '{\n          id\n        }');

            case 9:
              createdUser = _context2.sent;
              _context2.next = 12;
              return prisma.query.user({
                where: {
                  id: createdUser.id
                }
              }, info);

            case 12:
              user = _context2.sent;
              token = jwt.sign({ userId: createdUser.id }, process.env.APP_SECRET);
              return _context2.abrupt('return', _extends({}, user, {
                token: token
              }));

            case 15:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function signUp(_x5, _x6, _x7, _x8) {
      return _ref4.apply(this, arguments);
    }

    return signUp;
  }(),
  signIn: function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(parent, _ref5, _ref6, info) {
      var email = _ref5.email,
          password = _ref5.password;
      var prisma = _ref6.prisma,
          request = _ref6.request;
      var validateUser, valid, user, token;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return prisma.query.user({ where: { email: email } });

            case 2:
              validateUser = _context3.sent;

              if (validateUser) {
                _context3.next = 5;
                break;
              }

              throw new Error('No such user found for email ' + email);

            case 5:
              _context3.next = 7;
              return bcrypt.compare(password, validateUser.password);

            case 7:
              valid = _context3.sent;

              if (valid) {
                _context3.next = 10;
                break;
              }

              throw new Error('Invalid Password!');

            case 10:
              _context3.next = 12;
              return prisma.query.user({
                where: {
                  id: validateUser.id
                }
              }, info);

            case 12:
              user = _context3.sent;
              token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
              return _context3.abrupt('return', _extends({}, user, {
                token: token
              }));

            case 15:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function signIn(_x9, _x10, _x11, _x12) {
      return _ref7.apply(this, arguments);
    }

    return signIn;
  }()
};

exports.default = Mutation;