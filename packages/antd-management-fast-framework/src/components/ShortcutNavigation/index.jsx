import { Button, Space } from 'antd';
import React, { PureComponent } from 'react';

import { connect } from 'easy-soft-dva';
import { navigateTo } from 'easy-soft-utility';

import { TranslateLocale } from 'antd-management-fast-common';
import { FadeBox } from 'antd-management-fast-component';

@connect(({ shortcutControl }) => ({
  shortcutControl,
}))
class ShortcutNavigation extends PureComponent {
  render() {
    const {
      shortcutControl: { listData },
    } = this.props;

    const items = listData.map((o, index) => {
      const { locale, path } = o;
      const itemKey = `shortcut_menu_${index}`;

      return (
        <FadeBox key={itemKey} visible>
          <Button
            size="small"
            onClick={() => {
              navigateTo({
                pathname: path,
              });
            }}
          >
            <TranslateLocale key={itemKey} id={locale} />
          </Button>
        </FadeBox>
      );
    });

    return <Space>{items}</Space>;
  }
}

ShortcutNavigation.defaultProps = {};

export { ShortcutNavigation };
