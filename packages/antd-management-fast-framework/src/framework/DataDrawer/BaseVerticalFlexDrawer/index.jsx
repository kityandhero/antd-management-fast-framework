import React from 'react';

import { showSimpleErrorMessage } from 'easy-soft-utility';

import { emptyLogic } from 'antd-management-fast-common';
import { FlexBox, PageExtra } from 'antd-management-fast-component';

import { Base } from '../Base';

const { HelpContent } = PageExtra;

const primaryCallName = 'DataDrawer::BaseVerticalFlexDrawer';

class BaseVerticalFlexDrawer extends Base {
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

  renderPresetContentContainorInner = () => {
    this.logCallTrack({}, primaryCallName, 'renderPresetContentContainorInner');

    const helpConfig = this.establishHelpConfig();

    const bottom =
      helpConfig == null ? null : (
        <HelpContent
          wrapperType={this.contentWrapperType}
          {...this.establishHelpConfig()}
        />
      );

    return (
      <FlexBox
        flexAuto="top"
        top={<div>{this.renderPresetContentContainorInnerTop()}</div>}
        bottom={bottom}
      />
    );
  };
}

BaseVerticalFlexDrawer.defaultProps = {};

export { BaseVerticalFlexDrawer };
