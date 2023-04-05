import React from 'react';

import { drawerConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import { SaveButton } from '../../Common/SaveButton';
import { BaseNeedlessLoadDrawer } from '../BaseNeedlessLoadDrawer';

class BaseAddDrawer extends BaseNeedlessLoadDrawer {
  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,

      showBottomBar: true,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return super.getDerivedStateFromProps(nextProperties, previousState);
  }

  adjustWhenDidMount = () => {
    this.fillData({});
  };

  buildBottomBarInnerDefaultConfigList = () => {
    const that = this;

    return [
      {
        buildType: drawerConfig.bottomBarBuildType.component,
        component: (
          <SaveButton
            type="primary"
            text="保存"
            icon={iconBuilder.save()}
            handleClick={({ completeCallback }) => {
              that.handleOk({ completeCallback });
            }}
          />
        ),
      },
      {
        buildType: drawerConfig.bottomBarBuildType.close,
      },
    ];
  };
}

export { BaseAddDrawer };
