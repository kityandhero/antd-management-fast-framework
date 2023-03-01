import React from 'react';

import { FlexBox } from 'antd-management-fast-component';

import { InternalBuild } from './InternalBuild';

class Common extends InternalBuild {
  renderPresetSiderTopArea = () => {
    const config = this.establishSiderTopAreaConfig();

    if (config == null) {
      return null;
    }

    return this.buildCardCollectionArea(config);
  };

  renderPresetSiderBottomArea = () => {
    const config = this.establishSiderBottomAreaConfig();

    if (config == null) {
      return null;
    }

    return this.buildCardCollectionArea(config);
  };

  renderPresetSiderArea = () => {
    const topArea = this.renderPresetSiderTopArea();

    const bottomArea = this.renderPresetSiderBottomArea();

    if ((bottomArea || null) == null) {
      return topArea;
    }

    return <FlexBox flexAuto="top" top={topArea} bottom={bottomArea} />;
  };
}

export { Common };
