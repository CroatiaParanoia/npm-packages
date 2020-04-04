"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = void 0;

var _react = _interopRequireDefault(require("react"));

require("./style.css");

var Button = function Button(props) {
  var _props$type = props.type,
      type = _props$type === void 0 ? 'default' : _props$type,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      onClick = props.onClick,
      children = props.children;
  return /*#__PURE__*/_react.default.createElement("button", {
    disabled: disabled,
    onClick: onClick,
    className: "button-base ".concat(disabled ? 'disabled' : type)
  }, children);
};

exports.Button = Button;