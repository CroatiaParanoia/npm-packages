import React from 'react';
import { Icon } from '../Icon';
import './style.css';
export var Radio = function Radio(_ref) {
  var checked = _ref.checked,
      disabled = _ref.disabled,
      onChange = _ref.onChange,
      children = _ref.children,
      _ref$layout = _ref.layout,
      layout = _ref$layout === void 0 ? 'inline' : _ref$layout;
  return /*#__PURE__*/React.createElement("label", {
    className: "rc-radio ".concat(disabled ? 'disabled' : '', " ").concat(layout),
    onClick: function onClick() {
      return disabled || checked || onChange && onChange(true);
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "".concat(checked ? 'icon-radioactive' : 'icon-radio'),
    size: 26,
    color: checked ? '#1890ff' : '#d9d9d9',
    style: {
      verticalAlign: 'middle'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "label-text"
  }, children));
};