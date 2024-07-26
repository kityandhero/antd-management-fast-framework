import React from 'react';

import { showSimpleErrorMessage } from 'easy-soft-utility';

import { emptyLogic } from 'antd-management-fast-common';
import { FlexBox, PageExtra } from 'antd-management-fast-component';

import { LoadingOverlay } from '../../../components';
import { Base } from '../Base';

const { HelpContent } = PageExtra;

const primaryCallName = 'DataDrawer::BaseVerticalFlexDrawer';

class BaseVerticalFlexDrawer extends Base {
  /**
   * 构造函数
   * @param {Object} properties 属性值集合。
   * @param {string} visibleFlag 可见性标记。
   */
  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);
  }

  // eslint-disable-next-line no-unused-vars
  doOtherWhenChangeVisibleToShow = () => {
    this.logCallTrack({}, primaryCallName, 'doOtherWhenChangeVisibleToShow');

    this.logCallTrace(
      {},
      primaryCallName,
      'doOtherWhenChangeVisibleToShow',
      'trigger',
      'reloadData',
    );

    this.reloadData({});
  };

  fillInitialValuesAfterLoad = ({
    // eslint-disable-next-line no-unused-vars
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const values = {};

    return values;
  };

  establishPresetContentContainorInnerStyle = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'establishPresetContentContainorInnerStyle',
      emptyLogic,
    );

    return {};
  };

  establishPresetContentContainorInnerTopStyle = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'establishPresetContentContainorInnerTopStyle',
      '#fff',
    );

    return {};
  };

  renderPresetContentContainorInnerTop = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'renderPresetContentContainorInnerTop',
      emptyLogic,
    );

    const text = 'renderPresetContentContainorInnerTop need be override';

    showSimpleErrorMessage(text);

    return null;
  };

  renderPresetContentContainorInnerBottom = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'renderPresetContentContainorInnerBottom',
    );

    const helpConfig = this.establishHelpConfig();

    const bottom =
      helpConfig == null ? null : (
        <>
          <div style={{ height: '24px' }}></div>

          <HelpContent
            wrapperType={this.contentWrapperType}
            {...this.establishHelpConfig()}
          />
        </>
      );

    return bottom;
  };

  renderPresetContentContainorInner = () => {
    this.logCallTrack({}, primaryCallName, 'renderPresetContentContainorInner');

    return (
      <LoadingOverlay
        flag={[
          this.viewLoadingFlag,
          this.viewReloadingFlag,
          this.viewRefreshingFlag,
          this.viewProcessingFlag,
        ]}
        fill
      >
        <div
          style={{
            height: '100%',
            padding: '0',
            margin: '0',
            border: '0',
          }}
        >
          <FlexBox
            flexAuto="top"
            style={{
              ...this.establishPresetContentContainorInnerStyle(),
              height: '100%',
              padding: '0',
              margin: '0',
              border: '0',
            }}
            topStyle={{
              backgroundColor: '#fff',
              ...this.establishPresetContentContainorInnerTopStyle(),
              padding: '0',
              margin: '0',
              border: '0',
            }}
            top={this.renderPresetContentContainorInnerTop()}
            bottom={this.renderPresetContentContainorInnerBottom()}
          />
        </div>
      </LoadingOverlay>
    );
  };
}

export { BaseVerticalFlexDrawer };
