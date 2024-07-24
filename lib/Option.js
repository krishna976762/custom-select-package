"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Option = function Option(_ref) {
  var children = _ref.children,
    value = _ref.value;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "option",
    "data-value": value
  }, children);
};
var _default = exports["default"] = Option;