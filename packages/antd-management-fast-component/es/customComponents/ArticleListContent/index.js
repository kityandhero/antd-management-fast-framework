import { Avatar } from 'antd';
import { h as datetimeFormat } from '../../constants.js';
import '@ant-design/icons';
import 'react';
import { x as formatDatetime } from '../../tools.js';
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

var ArticleListContent = function ArticleListContent(_ref) {
  var _ref$data = _ref.data,
    content = _ref$data.content,
    updatedAt = _ref$data.updatedAt,
    avatar = _ref$data.avatar,
    owner = _ref$data.owner,
    href = _ref$data.href;
  return /*#__PURE__*/React.createElement("div", {
    className: styles.listContent
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.description
  }, content), /*#__PURE__*/React.createElement("div", {
    className: styles.extra
  }, /*#__PURE__*/React.createElement(Avatar, {
    src: avatar,
    size: "small"
  }), /*#__PURE__*/React.createElement("a", {
    href: href
  }, owner), " \u53D1\u5E03\u5728 ", /*#__PURE__*/React.createElement("a", {
    href: href
  }, href), /*#__PURE__*/React.createElement("em", null, formatDatetime({
    data: updatedAt,
    format: datetimeFormat.yearMonthDayHourMinute
  }))));
};

export { ArticleListContent as default };
