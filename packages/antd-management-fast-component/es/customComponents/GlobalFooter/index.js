import classNames from 'classnames';

var styles = undefined;

var GlobalFooter = function GlobalFooter(_ref) {
  var className = _ref.className,
    links = _ref.links,
    copyright = _ref.copyright;
  var clsString = classNames(styles.globalFooter, className);
  return /*#__PURE__*/React.createElement("footer", {
    className: clsString
  }, links && /*#__PURE__*/React.createElement("div", {
    className: styles.links
  }, links.map(function (link) {
    return /*#__PURE__*/React.createElement("a", {
      key: link.key,
      title: link.key,
      target: link.blankTarget ? '_blank' : '_self',
      href: link.href,
      rel: "noreferrer"
    }, link.title);
  })), copyright && /*#__PURE__*/React.createElement("div", {
    className: styles.copyright
  }, copyright));
};

export { GlobalFooter as default };
