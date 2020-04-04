import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React from 'react';
import { Checkbox } from '../Checkbox';
import { Radio } from '../Radio';
import './style.css';
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

export var Tree = function Tree(_ref) {
  var _ref$value = _ref.value,
      value = _ref$value === void 0 ? [] : _ref$value,
      options = _ref.options,
      onChange = _ref.onChange,
      _ref$expandAll = _ref.expandAll,
      expandAll = _ref$expandAll === void 0 ? false : _ref$expandAll;

  var _React$useState = React.useState(''),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      inputText = _React$useState2[0],
      setInputText = _React$useState2[1];

  var normaOpenValue = React.useMemo(function () {
    return expandAll ? getAllFolderKey(options) : [];
  }, [expandAll, options]);

  var _React$useState3 = React.useState(normaOpenValue),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      openValue = _React$useState4[0],
      setOpenValue = _React$useState4[1];

  var folderRelation = React.useMemo(function () {
    return getCheckboxRadioData(TOP_VALUE, options);
  }, [options]);
  var showHideChildren = React.useCallback(function (optionValue, isShow) {
    var currentIsShow = openValue.includes(optionValue);

    if (isShow) {
      currentIsShow || setOpenValue([].concat(_toConsumableArray(openValue), [optionValue]));
    } else {
      currentIsShow && setOpenValue(openValue.filter(function (v) {
        return v !== optionValue;
      }));
    }
  }, [openValue, setOpenValue]);
  var onSelectboxChange = React.useCallback(function (checked, itemValue, parentValue, showType) {
    var newValue = [];

    if (checked) {
      if (showType === 'checkbox') {
        newValue = [].concat(_toConsumableArray(value), [itemValue]);
      } else {
        newValue = [].concat(_toConsumableArray(value.filter(function (v) {
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
  var renderSelectBoxGroup = React.useCallback(function (parentValue, optionItme) {
    var showType = optionItme && optionItme.showType;

    if (!showType) {
      return;
    }

    if (!optionItme.label.includes(inputText)) {
      return;
    }

    var Selectbox = showType === 'checkbox' ? Checkbox : Radio;
    return /*#__PURE__*/React.createElement("div", {
      key: optionItme.value,
      className: "option-item"
    }, /*#__PURE__*/React.createElement(Selectbox, {
      checked: value.includes(optionItme.value),
      layout: "column",
      onChange: function onChange(checked) {
        return onSelectboxChange(checked, optionItme.value, parentValue, showType);
      }
    }, optionItme.label));
  }, [value, inputText]);
  var renderFolder = React.useCallback(function (optionItem) {
    var isShowChildren = openValue.includes(optionItem.value);
    var isShow = hasIncludesKeywords(inputText, optionItem.children);

    if (!isShow) {
      return;
    }

    return /*#__PURE__*/React.createElement("div", {
      key: optionItem.value,
      className: "option-folder-item"
    }, /*#__PURE__*/React.createElement("div", {
      className: "option-folder-title",
      onClick: function onClick() {
        return showHideChildren(optionItem.value, !isShowChildren);
      }
    }, isShowChildren ? '├' : '└', " ", optionItem.label), isShowChildren ? /*#__PURE__*/React.createElement("div", {
      style: {
        paddingLeft: 20
      },
      className: "option-folder-content"
    }, optionItem.children.map(function (item) {
      return item.children ? renderFolder(item) : renderSelectBoxGroup(optionItem.value, item);
    })) : null);
  }, [value, openValue, inputText]);
  return /*#__PURE__*/React.createElement("div", {
    className: "rc-tree"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: inputText,
    onChange: function onChange(event) {
      return setInputText(event.target.value);
    }
  }), "123", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), options.map(function (v) {
    return v.children ? renderFolder(v) : renderSelectBoxGroup(TOP_VALUE, v);
  }));
};