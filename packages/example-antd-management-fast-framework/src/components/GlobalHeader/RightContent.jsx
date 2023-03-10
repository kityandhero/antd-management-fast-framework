import { Tooltip } from 'antd';
import { SelectLang } from '@umijs/max';

import { connect } from 'easy-soft-dva';

import { getShowSelectLanguage } from 'antd-management-fast-common';
import { AnchorLink, iconBuilder } from 'antd-management-fast-component';

import HeaderSearch from '../HeaderSearch';

import AvatarDropdown from './AvatarDropdown';

import styles from './index.less';

const GlobalHeaderRight = (properties) => {
  const { currentOperator, theme, layout } = properties;
  let className = styles.right;

  if (theme === 'dark' && layout === 'top') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={className}>
      <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder="站内搜索"
        defaultValue="umi ui"
        options={[
          {
            label: (
              <AnchorLink href="https://umijs.org/zh/guide/umi-ui.html">
                umi ui
              </AnchorLink>
            ),
            value: 'umi ui',
          },
          {
            label: <AnchorLink href="next.ant.design">Ant Design</AnchorLink>,
            value: 'Ant Design',
          },
          {
            label: (
              <AnchorLink href="https://protable.ant.design/">
                Pro Table
              </AnchorLink>
            ),
            value: 'Pro Table',
          },
          {
            label: (
              <AnchorLink href="https://prolayout.ant.design/">
                Pro Layout
              </AnchorLink>
            ),
            value: 'Pro Layout',
          },
        ]} // onSearch={value => {
        //   //console.log('input', value);
        // }}
      />
      <Tooltip title="使用文档">
        <AnchorLink
          target="_blank"
          href="https://pro.ant.design/docs/getting-started"
          rel="noopener noreferrer"
          className={styles.action}
        >
          {iconBuilder.question()}
        </AnchorLink>
      </Tooltip>

      <AvatarDropdown currentOperator={currentOperator} />

      {getShowSelectLanguage() ? (
        <SelectLang className={styles.action} />
      ) : null}
    </div>
  );
};

export default connect(({ currentOperator, global, settings }) => ({
  currentOperator,
  global,
  theme: settings.navTheme,
  layout: settings.layout,
}))(GlobalHeaderRight);
