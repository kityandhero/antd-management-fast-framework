import { Menu } from 'antd';
import React from 'react';
import { GridContent } from '@ant-design/pro-layout';

import {
  checkStringIsNullOrWhiteSpace,
  endsWith,
  isArray,
  removeEndMatch,
} from 'easy-soft-utility';

import { IconInfo } from 'antd-management-fast-component';

import { AuthorizationWrapper } from '../AuthorizationWrapper';

import styles from './index.less';

const { Item } = Menu;

class DataMenuContainer extends AuthorizationWrapper {
  loadDataAfterMount = false;

  resetDataAfterLoad = false;

  menuList = [];

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,

      menuMode: 'inline',
    };
  }

  doWorkBeforeAdjustDidMount = () => {
    window.addEventListener('resize', this.resize);
    this.resize();
  };

  doWorkBeforeUnmount = () => {
    window.removeEventListener('resize', this.resize);
  };

  doWorkWhenDidUpdate = (preProperties, preState, snapshot) => {
    const { urlParams } = this.state;

    const { urlParams: urlParametersPrevious } = preState;

    if (
      (urlParams || null) == null ||
      (urlParametersPrevious || null) == null
    ) {
      return;
    }

    const { op } = urlParams;

    const { op: previousOp } = urlParametersPrevious;

    const { dataLoading } = this.state;

    if (
      !dataLoading &&
      ((previousOp === 'load' && op === 'update') ||
        this.checkNeedUpdate(preProperties, preState, snapshot))
    ) {
      this.reloadData();

      const {
        location: { pathname },
      } = this.props;

      this.redirectToPath(`${pathname.replace('/update/', '/load/')}`);
    }
  };

  adjustTabListAvailable = (tabListAvailable) => tabListAvailable;

  getMenuListAvailable = () => {
    const tabListAvailable = [];

    for (const o of this.menuList || []) {
      const v = o.show === undefined ? true : o.show === true;

      if (v) {
        tabListAvailable.push(o);
      }
    }

    return this.adjustTabListAvailable(tabListAvailable);
  };

  getMenuActiveKeyCore = (defaultKey) => {
    let result = '';
    const {
      match,
      location: { pathname },
    } = this.props;

    const menuListAvailable = this.getMenuListAvailable();

    if (!isArray(menuListAvailable)) {
      return result;
    }

    if (menuListAvailable.length <= 0) {
      return result;
    }

    let selectKeyExist = false;

    const selectKey = pathname
      .replace(/\//g, '-')
      .replace(`${match.url.replace(/\//g, '-')}-`, '')
      .replace(/-/g, '/');

    menuListAvailable.some((o) => {
      const { key } = {
        key: '',
        ...o,
      };

      if (key === selectKey) {
        result = selectKey || '';
        selectKeyExist = true;

        return true;
      }

      return false;
    });

    if (!selectKeyExist && !checkStringIsNullOrWhiteSpace(defaultKey || '')) {
      result = defaultKey;
    }

    return result;
  };

  getMenuActiveKey = () => {
    return this.getMenuActiveKeyCore(this.getDefaultMenuKey());
  };

  getDefaultMenuKey = () => {
    let result = '';
    const menuListAvailable = this.getMenuListAvailable();

    if (!isArray(menuListAvailable)) {
      return result;
    }

    if (menuListAvailable.length <= 0) {
      return result;
    }

    menuListAvailable.some((o) => {
      const { defaultSelect, key } = {
        defaultSelect: false,
        key: '',
        ...o,
      };

      if (defaultSelect) {
        result = key || '';

        return true;
      }

      return false;
    });

    return result;
  };

  getRightTitleConfig = () => {
    let result = null;

    const selectMenuKey = this.getMenuActiveKey();

    if (checkStringIsNullOrWhiteSpace(selectMenuKey)) {
      return '';
    }

    const menuListAvailable = this.getMenuListAvailable();

    menuListAvailable.some((o) => {
      const { key, icon, text } = {
        key: '',
        ...o,
      };

      if (key === selectMenuKey) {
        result = {
          icon,
          text,
        };

        return true;
      }

      return false;
    });

    return result || {};
  };

  buildRightTitle = ({ icon = null, text = null }) => {
    return <IconInfo icon={icon} text={text} />;
  };

  buildMenu = () => {
    const menuListAvailable = this.getMenuListAvailable();

    if (!isArray(menuListAvailable)) {
      return [];
    }

    if (menuListAvailable.length <= 0) {
      return [];
    }

    return menuListAvailable.map((o) => {
      const { key, icon, text } = o;

      return (
        <Item key={key}>
          <IconInfo icon={icon} text={text} />
        </Item>
      );
    });
  };

  selectKey = ({ key }) => {
    let path = '';

    const { match } = this.props;

    const currentKey = this.getMenuActiveKeyCore('');

    path = endsWith(match.url, '/' + currentKey)
      ? removeEndMatch(match.url, '/' + currentKey) + '/' + key
      : match.url + '/' + key;

    this.goToPath(path);
  };

  resize = () => {
    if (!this.main) {
      return;
    }

    requestAnimationFrame(() => {
      let menuMode = 'inline';

      if (this.main != null) {
        const { offsetWidth } = this.main;

        if (offsetWidth != null) {
          if (offsetWidth < 641 && offsetWidth > 400) {
            menuMode = 'horizontal';
          }

          if (window.innerWidth < 768 && offsetWidth > 400) {
            menuMode = 'horizontal';
          }

          this.setState({
            menuMode,
          });
        }
      }
    });
  };

  renderRightTitle = () => {
    return this.buildRightTitle(this.getRightTitleConfig());
  };

  renderFurther() {
    const selectMenuKey = this.getMenuActiveKey();

    const { children } = this.props;

    const { menuMode } = this.state;

    return (
      <GridContent>
        <div
          className={styles.main}
          ref={(reference) => {
            this.main = reference;
          }}
        >
          <div className={styles.leftMenu}>
            <Menu
              mode={menuMode}
              selectedKeys={[selectMenuKey]}
              onClick={this.selectKey}
            >
              {this.buildMenu()}
            </Menu>
          </div>
          <div className={styles.right}>{children}</div>
        </div>
      </GridContent>
    );
  }
}

export { DataMenuContainer };
