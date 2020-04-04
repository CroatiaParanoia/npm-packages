"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tree = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireDefault(require("react"));

var _Checkbox = require("../Checkbox");

var _Radio = require("../Radio");

require("./style.css");

var TOP_VALUE = 'TOP_VALUE';

var getCheckboxRadioData = function getCheckboxRadioData() {
  var parentValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : TOP_VALUE;
  var optionArr = arguments.length > 1 ? arguments[1] : undefined;
  var result = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  optionArr.forEach(function (item) {
    if (item.children) {
      // 文件夹
      getCheckboxRadioData(item.value, item.children, result);
    } else {
      var tempData = result[parentValue];

      if (tempData) {
        tempData[item.showType].push(item.value);
      } else {
        result[parentValue] = {
          checkbox: [],
          radio: []
        };
        result[parentValue][item.showType].push(item.value);
      }
    }
  });
  return result;
};

var getAllFolderKey = function getAllFolderKey(optionArr) {
  var result = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  optionArr.forEach(function (item) {
    if (item.children) {
      result.push(item.value);
      getAllFolderKey(item.children, result);
    }
  });
  return result;
};

var hasIncludesKeywords = function hasIncludesKeywords(keywords, optionArr) {
  return optionArr.some(function (item) {
    if (item.children) {
      return hasIncludesKeywords(keywords, item.children);
    } else {
      return item.label.includes(keywords);
    }
  });
};

var optionForEach = function optionForEach(optionArr, cb) {
  optionArr.forEach(function (item) {
    if (item.children) {
      optionForEach(item.children, cb);
    } else {
      cb && cb({
        label: item.label,
        value: item.value
      });
    }
  });
};

var getOptionItemsByValue = function getOptionItemsByValue(valueArr, optionArr) {
  var resultArr = [];
  optionForEach(optionArr, function (data) {
    var isIncludes = valueArr.includes(data.value);

    if (isIncludes) {
      resultArr.push(data);
    }
  });
  return resultArr;
};

var Tree = function Tree(_ref) {
  var _ref$value = _ref.value,
      value = _ref$value === void 0 ? [] : _ref$value,
      options = _ref.options,
      onChange = _ref.onChange,
      _ref$expandAll = _ref.expandAll,
      expandAll = _ref$expandAll === void 0 ? false : _ref$expandAll;

  var _React$useState = _react.default.useState(''),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      inputText = _React$useState2[0],
      setInputText = _React$useState2[1];

  var normaOpenValue = _react.default.useMemo(function () {
    return expandAll ? getAllFolderKey(options) : [];
  }, [expandAll, options]);

  var _React$useState3 = _react.default.useState(normaOpenValue),
      _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2),
      openValue = _React$useState4[0],
      setOpenValue = _React$useState4[1];

  var folderRelation = _react.default.useMemo(function () {
    return getCheckboxRadioData(TOP_VALUE, options);
  }, [options]);

  var showHideChildren = _react.default.useCallback(function (optionValue, isShow) {
    var currentIsShow = openValue.includes(optionValue);

    if (isShow) {
      currentIsShow || setOpenValue([].concat((0, _toConsumableArray2.default)(openValue), [optionValue]));
    } else {
      currentIsShow && setOpenValue(openValue.filter(function (v) {
        return v !== optionValue;
      }));
    }
  }, [openValue, setOpenValue]);

  var onSelectboxChange = _react.default.useCallback(function (checked, itemValue, parentValue, showType) {
    var newValue = [];

    if (checked) {
      if (showType === 'checkbox') {
        newValue = [].concat((0, _toConsumableArray2.default)(value), [itemValue]);
      } else {
        newValue = [].concat((0, _toConsumableArray2.default)(value.filter(function (v) {
          return !folderRelation[parentValue]['radio'].includes(v);
        })), [itemValue]);
      }
    } else {
      newValue = value.filter(function (v) {
        return v !== itemValue;
      });
    }

    onChange && onChange(getOptionItemsByValue(newValue, options));
  }, [value, options, folderRelation]);

  var renderSelectBoxGroup = _react.default.useCallback(function (parentValue, optionItme) {
    var showType = optionItme && optionItme.showType;

    if (!showType) {
      return;
    }

    if (!optionItme.label.includes(inputText)) {
      return;
    }

    var Selectbox = showType === 'checkbox' ? _Checkbox.Checkbox : _Radio.Radio;
    return /*#__PURE__*/_react.default.createElement("div", {
      key: optionItme.value,
      className: "option-item"
    }, /*#__PURE__*/_react.default.createElement(Selectbox, {
      checked: value.includes(optionItme.value),
      layout: "column",
      onChange: function onChange(checked) {
        return onSelectboxChange(checked, optionItme.value, parentValue, showType);
      }
    }, optionItme.label));
  }, [value, inputText]);

  var renderFolder = _react.default.useCallback(function (optionItem) {
    var isShowChildren = openValue.includes(optionItem.value);
    var isShow = hasIncludesKeywords(inputText, optionItem.children);

    if (!isShow) {
      return;
    }

    return /*#__PURE__*/_react.default.createElement("div", {
      key: optionItem.value,
      className: "option-folder-item"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "option-folder-title",
      onClick: function onClick() {
        return showHideChildren(optionItem.value, !isShowChildren);
      }
    }, isShowChildren ? '├' : '└', " ", optionItem.label), isShowChildren ? /*#__PURE__*/_react.default.createElement("div", {
      style: {
        paddingLeft: 20
      },
      className: "option-folder-content"
    }, optionItem.children.map(function (item) {
      return item.children ? renderFolder(item) : renderSelectBoxGroup(optionItem.value, item);
    })) : null);
  }, [value, openValue, inputText]);

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "rc-tree"
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    value: inputText,
    onChange: function onChange(event) {
      return setInputText(event.target.value);
    }
  }), "123", /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("br", null), options.map(function (v) {
    return v.children ? renderFolder(v) : renderSelectBoxGroup(TOP_VALUE, v);
  }));
};

exports.Tree = Tree;