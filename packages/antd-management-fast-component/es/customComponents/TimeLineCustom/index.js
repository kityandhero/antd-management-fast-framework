import { _ as _objectSpread } from '../../objectSpread2.js';
import { _ as _inherits, a as _classCallCheck, b as _createClass, c as _getPrototypeOf, d as _possibleConstructorReturn } from '../../getPrototypeOf.js';
import { List } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { j as iconCollection, h as datetimeFormat } from '../../constants.js';
import 'react';
import { x as formatDatetime } from '../../tools.js';
import CustomBase from '../CustomBase/index.js';
import '../../_commonjsHelpers.js';
import '../../defineProperty.js';
import '../../toPropertyKey.js';
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
import '../../core.js';
import 'path-to-regexp';

var styles = undefined;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var TimeLineCustom = /*#__PURE__*/function (_CustomBase) {
  _inherits(TimeLineCustom, _CustomBase);
  var _super = _createSuper(TimeLineCustom);
  function TimeLineCustom(props) {
    var _this;
    _classCallCheck(this, TimeLineCustom);
    _this = _super.call(this, props);
    _this.doWhenGetSnapshotBeforeUpdate = function (preProps, preState) {
      _this.currentTime = null;
      _this.currentPageStart = true;
      return null;
    };
    _this.getCreateTimeDatePart = function (v) {
      return formatDatetime({
        data: v,
        format: datetimeFormat.yearMonthDay
      });
    };
    _this.getCreateTimeTimePart = function (v) {
      return formatDatetime({
        data: v,
        format: datetimeFormat.hourMinute
      });
    };
    _this.handleTableChange = function (pageNo, pageSize) {
      var onChange = _this.props.onChange;
      onChange(pageNo, pageSize);
    };
    _this.renderDateLabel = function (v) {
      _this.currentTime = _this.currentTime || v;
      var preTime = _this.currentTime || v;
      if (!_this.currentPageStart && new Date(preTime).getDay() === new Date(v).getDay()) {
        return false;
      }
      _this.currentPageStart = false;
      _this.currentTime = v;
      return /*#__PURE__*/React.createElement("div", {
        className: "".concat(styles.timeLabel, " ").concat(styles.listItem)
      }, /*#__PURE__*/React.createElement("span", {
        className: styles.backgroundRed
      }, _this.getCreateTimeDatePart(v)));
    };
    _this.renderInfo = function (item) {
      var _this$props = _this.props,
        getTime = _this$props.getTime,
        getTitle = _this$props.getTitle,
        getDescription = _this$props.getDescription,
        getBottomLeft = _this$props.getBottomLeft,
        getBottomRight = _this$props.getBottomRight,
        getIcon = _this$props.getIcon;

      // const iconStyle = {
      //   ...{
      //     backgroundColor: getRandomColor({
      //       seed: getBackgroundColorKey(item),
      //     }),
      //   },
      //   ...(iconStyleValue || {}),
      // };

      return /*#__PURE__*/React.createElement("div", {
        className: styles.listItem
      }, /*#__PURE__*/React.createElement("span", {
        className: styles.fa
      }, /*#__PURE__*/React.createElement("div", {
        className: styles.faInner
      }, /*#__PURE__*/React.createElement("div", {
        className: styles.faInnerBg
        //  style={iconStyle}
      }), /*#__PURE__*/React.createElement("div", {
        className: styles.faInnerBody
      }, getIcon(item)))), /*#__PURE__*/React.createElement("div", {
        className: styles.timeLineExItem
      }, /*#__PURE__*/React.createElement("span", {
        className: styles.time
      }, /*#__PURE__*/React.createElement(ClockCircleOutlined, {
        style: {
          marginLeft: '20px',
          position: 'inherit',
          width: '12px',
          height: '12px',
          lineHeight: '12px',
          fontSize: '12px',
          marginRight: '2px'
        }
      }), _this.getCreateTimeTimePart(getTime(item))), /*#__PURE__*/React.createElement("h3", {
        className: styles.timeLineExHeader
      }, getTitle(item)), /*#__PURE__*/React.createElement("div", {
        className: styles.timeLineExBody,
        style: {
          fontSize: '13px'
        }
      }, getDescription(item)), /*#__PURE__*/React.createElement("div", {
        className: styles.timeLineExFooter
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: '13px'
        }
      }, getBottomLeft(item)), /*#__PURE__*/React.createElement("span", {
        style: {
          marginLeft: '20px',
          fontSize: '13px'
        }
      }, getBottomRight(item)))));
    };
    _this.currentTime = null;
    _this.currentPageStart = true;
    _this.state = {
      list: [],
      pagination: {}
    };
    return _this;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _createClass(TimeLineCustom, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props2 = this.props,
        loading = _this$props2.loading,
        getDateLabel = _this$props2.getDateLabel,
        showPagination = _this$props2.showPagination;
      var _this$state = this.state,
        list = _this$state.list,
        pagination = _this$state.pagination;
      var paginationProps = false;
      if (showPagination) {
        paginationProps = _objectSpread(_objectSpread({
          showSizeChanger: true,
          showQuickJumper: true
        }, pagination), {}, {
          onChange: this.handleTableChange
        });
      }
      return /*#__PURE__*/React.createElement("div", {
        className: styles.timeLineExBox
      }, /*#__PURE__*/React.createElement("div", {
        className: "".concat(styles.timeLineEx, " ").concat(styles.timeLineExInverse)
      }, /*#__PURE__*/React.createElement(List, {
        loading: loading,
        itemLayout: "vertical",
        size: "large",
        pagination: paginationProps,
        dataSource: list,
        renderItem: function renderItem(item) {
          return /*#__PURE__*/React.createElement(List.Item, {
            key: item.title,
            style: {
              // paddingTop: '0px',
              // paddingBottom: '0px',
              padding: 0,
              borderBottom: '0px'
            }
          }, /*#__PURE__*/React.createElement("div", null, _this2.renderDateLabel(getDateLabel(item)), _this2.renderInfo(item)));
        }
      })));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var _nextProps$data = nextProps.data,
        list = _nextProps$data.list,
        pagination = _nextProps$data.pagination;
      return {
        list: list,
        pagination: pagination
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  }]);
  return TimeLineCustom;
}(CustomBase);
TimeLineCustom.defaultProps = {
  showPagination: false,
  iconStyle: {},
  links: [],
  getIcon: function getIcon() {
    return iconCollection.message;
  },
  getBackgroundColorKey: function getBackgroundColorKey() {
    return '';
  },
  getDateLabel: function getDateLabel() {
    return '';
  },
  getTime: function getTime() {
    return '';
  },
  getTitle: function getTitle() {
    return '';
  },
  getDescription: function getDescription() {
    return '';
  },
  getBottomLeft: function getBottomLeft() {
    return '';
  },
  getBottomRight: function getBottomRight() {
    return '';
  }
};

export { TimeLineCustom as default };
