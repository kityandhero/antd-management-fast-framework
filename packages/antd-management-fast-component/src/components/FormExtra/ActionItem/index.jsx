import React, { PureComponent } from 'react';

import { Item } from '../Item';

class ActionItem extends PureComponent {
  render() {
    const { action, formItemLayout = {}, hidden = false } = this.props;

    return (
      <Item
        {...{ ...formItemLayout, colon: false }}
        label={<div />}
        hidden={hidden}
      >
        {action}
      </Item>
    );
  }
}

ActionItem.defaultProps = {
  action: null,
  formItemLayout: {},
  hidden: false,
};

export { ActionItem };
