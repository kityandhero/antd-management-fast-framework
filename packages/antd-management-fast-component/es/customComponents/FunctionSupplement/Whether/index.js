import { _ as _objectSpread } from '../../../objectSpread2.js';
import { u as unlimitedWithStringFlag, s as unknownLabel } from '../../../constants.js';
import '@ant-design/icons';
import 'react';
import { modelCollection } from 'antd-management-fast-common/es/utils/globalModel';
import { O as refitCommonData, P as isInvalid, Q as searchFromList } from '../../../tools.js';
import { j as isNull, k as isUndefined } from '../../../core.js';
import { buildOptionItem, buildRadioItem, buildSearchFormSelect, buildFormSelect, buildFormRadio } from '../../FunctionComponent/index.js';
import '../../../_commonjsHelpers.js';
import '../../../defineProperty.js';
import '../../../toPropertyKey.js';
import 'antd';
import 'array-move';
import 'copy-to-clipboard';
import 'lodash';
import 'moment';
import 'numeral';
import 'nzh';
import 'qs';
import 'queue';
import 'randomcolor';
import 'umi';
import 'uuid';
import 'path-to-regexp';
import '../../../objectWithoutProperties.js';
import '../../../extends.js';
import 'rc-texty';
import 'react-json-view';
import 'react-player';
import 'react-syntax-highlighter';
import '../../AnimalBox/FadeBox/index.js';
import '../../../getPrototypeOf.js';
import 'rc-animate';
import '../../AnimalBox/QueueBox/index.js';
import '../../AnimalBox/QueueListBox/index.js';
import 'rc-queue-anim';
import '../../AnimalBox/RotateBox/index.js';
import 'rc-tween-one';
import '../../ColorText/index.js';
import '../../EllipsisCustom/index.js';
import 'classnames';
import '../../FlexBox/index.js';
import '../../FlexText/index.js';
import '../../IconInfo/index.js';
import '../../Ellipsis/index.js';
import '../../ImageBox/index.js';
import '../../CustomBase/index.js';
import '../../VerticalBox/index.js';

function refitWhetherList(_ref) {
  var _ref$withUnlimited = _ref.withUnlimited,
    withUnlimited = _ref$withUnlimited === void 0 ? true : _ref$withUnlimited;
  var _whetherList = _objectSpread(_objectSpread({}, {
      whetherList: []
    }), modelCollection || {}),
    list = _whetherList.whetherList;
  if (withUnlimited) {
    return refitCommonData(list, unlimitedWithStringFlag);
  }
  return refitCommonData(list);
}
function getWhetherName(_ref2) {
  var value = _ref2.value,
    _ref2$defaultValue = _ref2.defaultValue,
    defaultValue = _ref2$defaultValue === void 0 ? '' : _ref2$defaultValue;
  if (isInvalid(value)) {
    return defaultValue;
  }
  var item = searchFromList('flag', "".concat(isNull(isUndefined(value) ? null : value) ? '' : value), refitWhetherList({
    withUnlimited: false
  }));
  return item == null ? '未知' : item.name;
}
function renderWhetherOption(_ref3) {
  var _ref3$withUnlimited = _ref3.withUnlimited,
    withUnlimited = _ref3$withUnlimited === void 0 ? true : _ref3$withUnlimited,
    _ref3$adjustListDataC = _ref3.adjustListDataCallback,
    adjustListDataCallback = _ref3$adjustListDataC === void 0 ? null : _ref3$adjustListDataC;
  var listData = refitWhetherList({
    withUnlimited: withUnlimited
  });
  return buildOptionItem({
    list: listData,
    adjustListDataCallback: adjustListDataCallback
  });
}
function renderWhetherRadio(_ref4) {
  var _ref4$withUnlimited = _ref4.withUnlimited,
    withUnlimited = _ref4$withUnlimited === void 0 ? true : _ref4$withUnlimited,
    _ref4$adjustListDataC = _ref4.adjustListDataCallback,
    adjustListDataCallback = _ref4$adjustListDataC === void 0 ? null : _ref4$adjustListDataC;
  var listData = refitWhetherList({
    withUnlimited: withUnlimited
  });
  return buildRadioItem({
    list: listData,
    adjustListDataCallback: adjustListDataCallback
  });
}
function renderSearchWhetherSelect(_ref5) {
  var _ref5$withUnlimited = _ref5.withUnlimited,
    withUnlimited = _ref5$withUnlimited === void 0 ? true : _ref5$withUnlimited,
    _ref5$label = _ref5.label,
    label = _ref5$label === void 0 ? '调用时设置' : _ref5$label,
    _ref5$name = _ref5.name,
    name = _ref5$name === void 0 ? 'whether' : _ref5$name,
    _ref5$helper = _ref5.helper,
    helper = _ref5$helper === void 0 ? null : _ref5$helper;
  var title = label || unknownLabel;
  return buildSearchFormSelect({
    label: title,
    name: name,
    options: renderWhetherOption({
      withUnlimited: withUnlimited
    }),
    helper: helper
  });
}
function renderFormWhetherSelect(_ref6) {
  var _ref6$helper = _ref6.helper,
    helper = _ref6$helper === void 0 ? null : _ref6$helper,
    onChangeCallback = _ref6.onChangeCallback,
    _ref6$label = _ref6.label,
    label = _ref6$label === void 0 ? '调用时设置' : _ref6$label,
    _ref6$formItemLayout = _ref6.formItemLayout,
    formItemLayout = _ref6$formItemLayout === void 0 ? null : _ref6$formItemLayout,
    _ref6$required = _ref6.required,
    required = _ref6$required === void 0 ? true : _ref6$required,
    _ref6$name = _ref6.name,
    name = _ref6$name === void 0 ? 'whether' : _ref6$name,
    _ref6$otherProps = _ref6.otherProps,
    otherProps = _ref6$otherProps === void 0 ? null : _ref6$otherProps;
  var title = label || unknownLabel;
  return buildFormSelect({
    label: title,
    name: name,
    renderItemFunction: function renderItemFunction() {
      return renderWhetherOption({
        withUnlimited: false
      });
    },
    helper: helper,
    onChangeCallback: onChangeCallback,
    formItemLayout: formItemLayout,
    required: required,
    otherProps: otherProps
  });
}
function renderFormWhetherRadio(_ref7) {
  var _ref7$helper = _ref7.helper,
    helper = _ref7$helper === void 0 ? null : _ref7$helper,
    onChangeCallback = _ref7.onChangeCallback,
    _ref7$label = _ref7.label,
    label = _ref7$label === void 0 ? '调用时设置' : _ref7$label,
    _ref7$formItemLayout = _ref7.formItemLayout,
    formItemLayout = _ref7$formItemLayout === void 0 ? null : _ref7$formItemLayout,
    _ref7$required = _ref7.required,
    required = _ref7$required === void 0 ? true : _ref7$required,
    _ref7$name = _ref7.name,
    name = _ref7$name === void 0 ? 'whether' : _ref7$name,
    _ref7$otherProps = _ref7.otherProps,
    otherProps = _ref7$otherProps === void 0 ? null : _ref7$otherProps;
  var title = label || unknownLabel;
  return buildFormRadio({
    label: title,
    name: name,
    renderItemFunction: function renderItemFunction() {
      return renderWhetherRadio({
        withUnlimited: false
      });
    },
    helper: helper,
    onChangeCallback: onChangeCallback,
    formItemLayout: formItemLayout,
    required: required,
    otherProps: otherProps
  });
}

/**
 * 占位函数
 *
 * @export
 * @returns
 */
function empty() {
  return {};
}

export { empty, getWhetherName, refitWhetherList, renderFormWhetherRadio, renderFormWhetherSelect, renderSearchWhetherSelect, renderWhetherOption, renderWhetherRadio };
