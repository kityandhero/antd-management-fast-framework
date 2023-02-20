import { Tooltip } from 'antd';
import { connect, SelectLang } from '@umijs/max';

import { getShowSelectLanguage } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

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
            label: <a href="https://umijs.org/zh/guide/umi-ui.html">umi ui</a>,
            value: 'umi ui',
          },
          {
            label: <a href="next.ant.design">Ant Design</a>,
            value: 'Ant Design',
          },
          {
            label: <a href="https://protable.ant.design/">Pro Table</a>,
            value: 'Pro Table',
          },
          {
            label: <a href="https://prolayout.ant.design/">Pro Layout</a>,
            value: 'Pro Layout',
          },
        ]} // onSearch={value => {
        //   //console.log('input', value);
        // }}
      />
      <Tooltip title="使用文档">
        <a
          target="_blank"
          href="https://pro.ant.design/docs/getting-started"
          rel="noopener noreferrer"
          className={styles.action}
        >
          {iconBuilder.question()}
        </a>
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
