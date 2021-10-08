import React from 'react';
import { Menu } from 'antd';
import { GridContent } from '@ant-design/pro-layout';

import { isArray, stringIsNullOrWhiteSpace } from '../../utils/tools';
import IconInfo from '../../customComponents/IconInfo';

import AuthorizationWrapper from '../AuthorizationWrapper';

import styles from './index.less';

const { Item } = Menu;

class DataMenuContainer extends AuthorizationWrapper {
  loadDataAfterMount = false;

  needSetFormValueAfterLoad = false;

  menuList = [];

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        menuMode: 'inline',
      },
    };
  }

  beforeDidMount = () => {
    window.addEventListener('resize', this.resize);
    this.resize();
  };

  beforeUnmount = () => {
    window.removeEventListener('resize', this.resize);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doWorkWhenDidUpdate = (preProps, preState, snapshot) => {
    const { urlParams } = this.state;

    const { urlParams: urlParamsPrev } = preState;

    if ((urlParams || null) == null || (urlParamsPrev || null) == null) {
      return;
    }

    const { op } = urlParams;

    const { op: prevOp } = urlParamsPrev;

    const { dataLoading } = this.state;

    if (!dataLoading) {
      if (
        (prevOp === 'load' && op === 'update') ||
        this.checkNeedUpdate(preProps, preState, snapshot)
      ) {
        this.reloadData();

        const {
          location: { pathname },
        } = this.props;

        this.redirectToPath(`${pathname.replace('/update/', '/load/')}`);
      }
    }
  };

  adjustTabListAvailable = (tabListAvailable) => tabListAvailable;

  getMenuListAvailable = () => {
    const tabListAvailable = [];

    (this.menuList || []).forEach((o) => {
      const v = typeof o.show === 'undefined' ? true : o.show === true;

      if (v) {
        tabListAvailable.push(o);
      }
    });

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
        ...{ key: '' },
        ...(o || {}),
      };

      if (key === selectKey) {
        result = selectKey || '';
        selectKeyExist = true;

        return true;
      }
    });

    if (!selectKeyExist) {
      if (!stringIsNullOrWhiteSpace(defaultKey || '')) {
        result = defaultKey;
      }
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
        ...{ defaultSelect: false, key: '' },
        ...(o || {}),
      };

      if (defaultSelect) {
        result = key || '';

        return true;
      }
    });

    return result;
  };

  getRightTitleConfig = () => {
    let result = null;

    const selectMenuKey = this.getMenuActiveKey();

    if (stringIsNullOrWhiteSpace(selectMenuKey)) {
      return '';
    }

    const menuListAvailable = this.getMenuListAvailable();

    menuListAvailable.some((o) => {
      const { key, icon, text } = {
        ...{ key: '' },
        ...(o || {}),
      };

      if (key === selectMenuKey) {
        result = {
          icon,
          text,
        };

        return true;
      }
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

    if (stringIsNullOrWhiteSpace(currentKey)) {
      path = currentKey + '/' + key;
    } else {
      path = match.url.replace('/' + currentKey, '/' + key);
    }

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
          if (this.main.offsetWidth < 641 && offsetWidth > 400) {
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

  render() {
    const selectMenuKey = this.getMenuActiveKey();

    const { children } = this.props;

    const { menuMode } = this.state;

    return (
      <GridContent>
        <div
          className={styles.main}
          ref={(ref) => {
            this.main = ref;
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
          <div className={styles.right}>
            <div className={styles.title}>{this.renderRightTitle()}</div>
            {children}
          </div>
        </div>
      </GridContent>
    );
  }
}

export default DataMenuContainer;
