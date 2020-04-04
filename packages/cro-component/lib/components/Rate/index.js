"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Rate = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

require("./style.css");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function Icon() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? '20px' : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? '20px' : _ref$height,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? 'orange' : _ref$color,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? {} : _ref$style;

  return /*#__PURE__*/_react.default.createElement("svg", {
    viewBox: "64 64 896 896",
    focusable: "false",
    "data-icon": "star",
    width: width,
    height: height,
    fill: "currentColor",
    "aria-hidden": "true",
    style: _objectSpread({
      color: color
    }, style)
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"
  }));
}

var Rate = function Rate(RateProps) {
  var _RateProps$value = RateProps.value,
      inputValue = _RateProps$value === void 0 ? 0 : _RateProps$value,
      _RateProps$count = RateProps.count,
      count = _RateProps$count === void 0 ? 5 : _RateProps$count,
      _RateProps$allowHalf = RateProps.allowHalf,
      allowHalf = _RateProps$allowHalf === void 0 ? false : _RateProps$allowHalf,
      _RateProps$allowClear = RateProps.allowClear,
      allowClear = _RateProps$allowClear === void 0 ? true : _RateProps$allowClear,
      _RateProps$disabled = RateProps.disabled,
      disabled = _RateProps$disabled === void 0 ? false : _RateProps$disabled;

  var _useState = (0, _react.useState)(inputValue),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      lastValue = _useState2[0],
      setLastValue = _useState2[1];

  var _useState3 = (0, _react.useState)(inputValue),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      value = _useState4[0],
      setValue = _useState4[1];

  (0, _react.useEffect)(function () {
    // value 受props控制
    setValue(inputValue);
    setLastValue(inputValue);
  }, [inputValue]);
  (0, _react.useEffect)(function () {
    if (!allowHalf) {
      setLastValue(parseInt(lastValue.toString()));
    }
  }, [allowHalf]);

  var onStarMouseMove = function onStarMouseMove(e, index) {
    var v = e.clientX - e.currentTarget.offsetLeft > 10 || !allowHalf ? 1 : 0.5;
    var newValue = index + v;

    if (disabled || value === newValue) {
      return;
    }

    setValue(newValue);
  };

  var onStarClick = function onStarClick() {
    if (disabled) {
      return;
    }

    setLastValue(value);

    if (lastValue === value && allowClear) {
      setLastValue(0);
    }
  };

  var onStarBoxMouseLeave = function onStarBoxMouseLeave() {
    if (disabled) {
      return;
    }

    setValue(lastValue);
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "df",
    style: {
      marginLeft: 66
    },
    onMouseLeave: onStarBoxMouseLeave
  }, // @ts-ignore
  new Array(count).fill('').map(function (item, index) {
    var halfIsActive = index + 1 <= value + 0.5;
    var starIsACtive = index + 1 <= value;
    return /*#__PURE__*/_react.default.createElement("div", {
      key: item + index,
      style: {
        marginRight: 5
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "df jsb pr star-event-mask",
      onMouseMove: function onMouseMove(e) {
        return onStarMouseMove(e, index);
      },
      onClick: onStarClick,
      style: {
        cursor: disabled ? 'default' : 'pointer'
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "half-star-box pa l0 t0"
    }, /*#__PURE__*/_react.default.createElement(Icon, {
      color: halfIsActive ? '#ffa500' : '#ccc'
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: "star-box"
    }, /*#__PURE__*/_react.default.createElement(Icon, {
      color: starIsACtive ? '#ffa500' : '#ccc'
    }))));
  }));
};

exports.Rate = Rate;