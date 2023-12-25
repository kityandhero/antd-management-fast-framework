import React, { PureComponent } from 'react';

import { Item } from '../Item';

class ActionItem extends PureComponent {
  render() {
    const {
      action,
      formItemLayout = {},
      hidden = false,
      addonBefore = null,
      addonBeforeStyle = null,
      addonAfter = null,
      addonAfterStyle = null,
    } = this.props;

    return (
      <Item
        {...{ ...formItemLayout, colon: false }}
        label={<div />}
        hidden={hidden}
        addonBefore={addonBefore}
        addonBeforeStyle={addonBeforeStyle}
        addonAfter={addonAfter}
        addonAfterStyle={addonAfterStyle}
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
  addonBefore: null,
  addonBeforeStyle: null,
  addonAfter: null,
  addonAfterStyle: null,
};

export { ActionItem };
