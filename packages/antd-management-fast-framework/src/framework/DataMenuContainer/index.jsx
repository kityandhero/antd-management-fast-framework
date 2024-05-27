import React from 'react';

import { isArray, logTrace, mergeArrowText } from 'easy-soft-utility';

import { iconBuilder, Line } from 'antd-management-fast-component';

import { MenuWrapper } from '../../components/MenuWrapper';
import { DataTabContainer } from '../DataTabContainer';

const primaryCallName = 'DataMenuContainer';

/**
 * DataMenuContainer
 * @namespace DataMenuContainer
 * @class DataMenuContainer
 * @augments DataTabContainer
 */
class DataMenuContainer extends DataTabContainer {
  showHeader = false;

  loadRemoteRequestAfterMount = false;

  resetDataAfterLoad = false;

  pathPrefix = '';

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      menuMode: 'inline',
    };
  }

  /**
   * get derived state from props
   * @static
   * @param {Object} nextProperties
   * @param {Object} previousState
   * @returns {Object}
   */
  static getDerivedStateFromProps(nextProperties, previousState) {
    logTrace(
      { parameter: { nextProperties, previousState } },
      mergeArrowText(primaryCallName, 'getDerivedStateFromProps'),
    );

    return super.getDerivedStateFromProps(nextProperties, previousState);
  }

  buildMenu = () => {
    this.logCallTrack({}, primaryCallName, 'buildMenu');

    const menuListAvailable = this.getMenuListAvailable();

    if (!isArray(menuListAvailable)) {
      return [];
    }

    if (menuListAvailable.length <= 0) {
      return [];
    }

    return menuListAvailable.map((o) => {
      const { key, icon, text } = o;

      return {
        key,
        label: text,
        icon: icon || iconBuilder.form(),
      };
    });
  };

  renderPresetPageLeftArea = () => {
    this.logCallTrack({}, primaryCallName, 'renderPresetPageLeftArea');

    const { menuMode } = this.state;

    const items = this.buildMenu();

    return (
      <div style={{ minWidth: '224px', padding: '0 0px 0 0px' }}>
        <Line color="#eee" height={1} />

        <MenuWrapper
          menuFlag={this.viewMenuFlag}
          mode={menuMode}
          items={items}
          floatButton={this.renderPresetFloatButton()}
          handleClick={this.handleMenuChange}
        />
      </div>
    );
  };
}

export { DataMenuContainer };
