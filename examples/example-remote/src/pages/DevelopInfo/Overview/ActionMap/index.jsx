import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { cardConfig, extraBuildType } from 'antd-management-fast-common';
import { iconBuilder, SyntaxHighlighter } from 'antd-management-fast-component';

import { accessWayCollection } from '../../../../customConfig';
import { NonePermissionActionMapDrawer } from '../../NonePermissionActionMapDrawer';
import { PermissionActionMapDrawer } from '../../PermissionActionMapDrawer';
import { TabPageBase } from '../../TabPageBase';

@connect(({ accessWay, schedulingControl }) => ({
  accessWay,
  schedulingControl,
}))
class ActionMap extends TabPageBase {
  componentAuthority = accessWayCollection.accessWay.getActionMap.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'accessWay/getActionMap',
    };
  }

  showPermissionActionMapDrawer = () => {
    PermissionActionMapDrawer.open();
  };

  showNonePermissionActionMapDrawer = () => {
    NonePermissionActionMapDrawer.open();
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

  establishCardCollectionConfig = () => {
    const { metaData } = this.state;

    const mapContent = getValueByKey({
      data: metaData,
      key: 'mapContent',
    });

    const that = this;

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '所有 Action Map',
          },
          hasExtra: true,
          extra: {
            affix: true,
            list: [
              {
                buildType: extraBuildType.generalExtraButton,
                icon: iconBuilder.read(),
                text: '显示需要鉴权 Action Map',
                disabled: this.checkInProgress(),
                handleClick: () => {
                  that.showPermissionActionMapDrawer();
                },
              },
              {
                buildType: extraBuildType.generalExtraButton,
                icon: iconBuilder.read(),
                text: '显示无需鉴权 Action Map',
                disabled: this.checkInProgress(),
                handleClick: () => {
                  that.showNonePermissionActionMapDrawer();
                },
              },
              {
                buildType: cardConfig.extraBuildType.divider,
              },
              {
                buildType: cardConfig.extraBuildType.refresh,
              },
            ],
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
                <SyntaxHighlighter
                  language="js"
                  value={mapContent}
                  other={{ showLineNumbers: true, wrapLines: true }}
                />
              ),
            },
          ],
        },
      ],
    };
  };

  renderPresetOther = () => {
    return (
      <>
        <PermissionActionMapDrawer maskClosable />

        <NonePermissionActionMapDrawer maskClosable />
      </>
    );
  };
}

export default ActionMap;
