import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { configItemData } from '../Common/data';

const { BaseUpdateDrawer } = DataDrawer;

const visibleFlag = 'e860d561c19941fc9ef4655666617a9e';

@connect(({ sectionApplicationConfig, schedulingControl }) => ({
  sectionApplicationConfig,
  schedulingControl,
}))
class UpdateConfigItemDrawer extends BaseUpdateDrawer {
  componentAuthority =
    accessWayCollection.sectionApplicationConfig.updateConfigItem.permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      loadApiPath: 'sectionApplicationConfig/getConfigItem',
      submitApiPath: 'sectionApplicationConfig/updateConfigItem',
      icon: '',
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d.id = getValueByKey({
      data: externalData,
      key: configItemData.id.name,
    });

    d.sectionApplicationConfigId = getValueByKey({
      data: externalData,
      key: configItemData.sectionApplicationConfigId.name,
    });

    d.sectionId = getValueByKey({
      data: externalData,
      key: configItemData.sectionId.name,
    });

    d.applicationId = getValueByKey({
      data: externalData,
      key: configItemData.applicationId.name,
    });

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d.id = getValueByKey({
      data: externalData,
      key: configItemData.id.name,
    });

    d.sectionApplicationConfigId = getValueByKey({
      data: externalData,
      key: configItemData.sectionApplicationConfigId.name,
    });

    d.sectionId = getValueByKey({
      data: externalData,
      key: configItemData.sectionId.name,
    });

    d.applicationId = getValueByKey({
      data: externalData,
      key: configItemData.applicationId.name,
    });

    return d;
  };

  renderPresetTitle = () => {
    return '编辑栏目特定页面自定义配置';
  };

  fillInitialValuesAfterLoad = ({
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const values = {};

    if (metaData != null) {
      values[configItemData.name.name] = getValueByKey({
        data: metaData,
        key: configItemData.name.name,
      });

      values[configItemData.value.name] = getValueByKey({
        data: metaData,
        key: configItemData.value.name,
      });
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    const { metaData } = this.state;

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '栏目配置信息',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.customGrid,
              list: [
                {
                  label: configItemData.sectionApplicationConfigName.label,
                  value: getValueByKey({
                    data: metaData,
                    key: configItemData.sectionApplicationConfigName.name,
                  }),
                },
                {
                  label: configItemData.sectionName.label,
                  value: getValueByKey({
                    data: metaData,
                    key: configItemData.sectionName.name,
                  }),
                },
                {
                  label: configItemData.applicationName.label,
                  value: getValueByKey({
                    data: metaData,
                    key: configItemData.applicationName.name,
                  }),
                },
                {
                  label:
                    configItemData.sectionApplicationConfigTargetPath.label,
                  value: getValueByKey({
                    data: metaData,
                    key: configItemData.sectionApplicationConfigTargetPath.name,
                  }),
                },
              ],
              props: {
                size: 'small',
                bordered: true,
                column: 1,
                emptyStyle: {
                  color: '#cccccc',
                },
                emptyValue: '待完善',
                labelStyle: {
                  width: '100px',
                },
              },
            },
          ],
        },

        {
          title: {
            icon: iconBuilder.contacts(),
            text: '键值设置',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.onlyShowInput,
              fieldData: configItemData.name,
              value: getValueByKey({
                data: metaData,
                key: configItemData.name.name,
              }),
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: configItemData.value,
              require: true,
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
          text: '键名与键值都将以字符串形式存储。',
        },
      ],
    };
  };
}

export { UpdateConfigItemDrawer };
