import React from 'react';
import './style.css';
export var Button = function Button(props) {
  var _props$type = props.type,
      type = _props$type === void 0 ? 'default' : _props$type,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      onClick = props.onClick,
      children = props.children;
  return /*#__PURE__*/React.createElement("button", {
    disabled: disabled,
    onClick: onClick,
    className: "button-base ".concat(disabled ? 'disabled' : type)
  }, children);
};