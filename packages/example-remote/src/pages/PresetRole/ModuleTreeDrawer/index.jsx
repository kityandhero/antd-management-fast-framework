import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig/accessWayCollection';
import { fieldData } from '../Common/data';

const { BaseLoadDrawer } = DataDrawer;

const visibleFlag = 'e4fae955cbb14fa9ba43e9b3685867c1';

@connect(({ simple, schedulingControl }) => ({
  simple,
  schedulingControl,
}))
class ModuleTreeDrawer extends BaseLoadDrawer {
  componentAuthority = accessWayCollection.presetRole.listTreeModule.permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      loadApiPath: 'presetRole/listTreeModule',
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d.presetRoleId = getValueByKey({
      data: externalData,
      key: fieldData.presetRoleId.name,
    });

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d.presetRoleId = getValueByKey({
      data: externalData,
      key: fieldData.presetRoleId.name,
    });

    return d;
  };

  renderPresetTitle = () => {
    return '角色权限配置树型列表';
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
    const { metaListData } = this.state;

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '树型展示',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.tree,
              showLine: true,
              switcherIcon: iconBuilder.down(),
              treeData: metaListData,
            },
          ],
        },
      ],
    };
  };

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '简要说明:这里可以显示需要提示的信息。',
        },
        {
          text: '简要说明:这里可以显示需要提示的信息。',
        },
      ],
    };
  };
}

export default ModuleTreeDrawer;
