import { Button, Space } from 'antd';
import React, { PureComponent } from 'react';

import { connect } from 'easy-soft-dva';
import { navigateTo } from 'easy-soft-utility';

import { TranslateLocale } from 'antd-management-fast-common';

@connect(({ shortcutControl }) => ({
  shortcutControl,
}))
class ShortcutNavigation extends PureComponent {
  render() {
    const {
      shortcutControl: { listData },
    } = this.props;

    return (
      <Space>
        {listData.map((o, index) => {
          const { locale, path } = o;
          const itemKey = `shortcut_menu_${index}`;

          return (
            <Button
              key={itemKey}
              size="small"
              onClick={() => {
                navigateTo({
                  pathname: path,
                });
              }}
            >
              <TranslateLocale key={itemKey} id={locale} />
            </Button>
          );
        })}
      </Space>
    );
  }
}

export { ShortcutNavigation };
