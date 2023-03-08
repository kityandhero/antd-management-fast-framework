import { Tooltip } from 'antd';
import { connect, SelectLang } from '@umijs/max';

import { getShowSelectLanguage } from 'antd-management-fast-common';
import { iconBuilder, Link } from 'antd-management-fast-component';

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
              <Link href="https://umijs.org/zh/guide/umi-ui.html">umi ui</Link>
            ),
            value: 'umi ui',
          },
          {
            label: <Link href="next.ant.design">Ant Design</Link>,
            value: 'Ant Design',
          },
          {
            label: <Link href="https://protable.ant.design/">Pro Table</Link>,
            value: 'Pro Table',
          },
          {
            label: <Link href="https://prolayout.ant.design/">Pro Layout</Link>,
            value: 'Pro Layout',
          },
        ]} // onSearch={value => {
        //   //console.log('input', value);
        // }}
      />
      <Tooltip title="使用文档">
        <Link
          target="_blank"
          href="https://pro.ant.design/docs/getting-started"
          rel="noopener noreferrer"
          className={styles.action}
        >
          {iconBuilder.question()}
        </Link>
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
