import { Tooltip } from 'antd';

var styles = undefined;

var MiniProgress = function MiniProgress(_ref) {
  var targetLabel = _ref.targetLabel,
    target = _ref.target,
    _ref$color = _ref.color,
    color = _ref$color === void 0 ? 'rgb(19, 194, 194)' : _ref$color,
    strokeWidth = _ref.strokeWidth,
    percent = _ref.percent;
  return /*#__PURE__*/React.createElement("div", {
    className: styles.miniProgress
  }, /*#__PURE__*/React.createElement(Tooltip, {
    title: targetLabel
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.target,
    style: {
      left: target ? "".concat(target, "%") : undefined
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      backgroundColor: color || undefined
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      backgroundColor: color || undefined
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: styles.progressWrap
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.progress,
    style: {
      backgroundColor: color || undefined,
      width: percent ? "".concat(percent, "%") : undefined,
      height: strokeWidth || undefined
    }
  })));
};

export { MiniProgress as default };
