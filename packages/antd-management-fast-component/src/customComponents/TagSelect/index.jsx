import { Tag } from 'antd';
import classNames from 'classnames';
import React, { Component } from 'react';

import { iconBuilder } from '../Icon';
import { Link } from '../Link';

import styles from './index.less';

const { CheckableTag } = Tag;

const TagSelectOption = ({ children, checked, onChange, value }) => (
  <CheckableTag
    checked={checked}
    key={value}
    onChange={(state) => onChange(value, state)}
  >
    {children}
  </CheckableTag>
);

TagSelectOption.isTagSelectOption = true;

class TagSelect extends Component {
  constructor(properties) {
    super(properties);
    this.state = {
      expand: false,
      value: properties.value || properties.defaultValue || [],
    };
  }

  static getDerivedStateFromProps(nextProperties) {
    if ('value' in nextProperties) {
      return { value: nextProperties.value || [] };
    }
    return null;
  }

  onChange = (value) => {
    const { onChange } = this.props;
    if (!('value' in this.props)) {
      this.setState({ value });
    }
    if (onChange) {
      onChange(value);
    }
  };

  onSelectAll = (checked) => {
    let checkedTags = [];
    if (checked) {
      checkedTags = this.getAllTags();
    }
    this.onChange(checkedTags);
  };

  getAllTags() {
    let { children } = this.props;
    children = React.Children.toArray(children);
    const checkedTags = children
      .filter((child) => this.isTagSelectOption(child))
      .map((child) => child.props.value);
    return checkedTags || [];
  }

  handleTagChange = (value, checked) => {
    const { value: StateValue } = this.state;
    const checkedTags = [...StateValue];

    const index = checkedTags.indexOf(value);
    if (checked && index === -1) {
      checkedTags.push(value);
    } else if (!checked && index > -1) {
      checkedTags.splice(index, 1);
    }
    this.onChange(checkedTags);
  };

  handleExpand = () => {
    const { expand } = this.state;
    this.setState({
      expand: !expand,
    });
  };

  isTagSelectOption = (node) =>
    node &&
    node.type &&
    (node.type.isTagSelectOption ||
      node.type.displayName === 'TagSelectOption');

  render() {
    const { value, expand } = this.state;
    const { children, hideCheckAll, className, style, expandable } = this.props;

    const checkedAll = this.getAllTags().length === value.length;

    const cls = classNames(styles.tagSelect, className, {
      [styles.hasExpandTag]: expandable,
      [styles.expanded]: expand,
    });
    return (
      <div className={cls} style={style}>
        {hideCheckAll ? null : (
          <CheckableTag
            checked={checkedAll}
            key="tag-select-__all__"
            onChange={this.onSelectAll}
          >
            全部
          </CheckableTag>
        )}
        {value &&
          React.Children.map(children, (child) => {
            if (this.isTagSelectOption(child)) {
              return React.cloneElement(child, {
                key: `tag-select-${child.props.value}`,
                value: child.props.value,
                checked: value.includes(child.props.value),
                onChange: this.handleTagChange,
              });
            }
            return child;
          })}
        {expandable && (
          <Link className={styles.trigger} onClick={this.handleExpand}>
            {expand ? '收起' : '展开'}
            {expand ? iconBuilder.upCircle() : iconBuilder.down()}
          </Link>
        )}
      </div>
    );
  }
}

TagSelect.defaultProps = {
  hideCheckAll: false,
};

TagSelect.Option = TagSelectOption;

export { TagSelect };
