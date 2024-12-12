import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey } from 'easy-soft-utility';

import {
  cardConfig,
  getDerivedStateFromPropertiesForUrlParameters,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import { buildUpdateTimeAndOperatorFieldItem } from '../../../../customSpecialComponents';
import { parseUrlParametersForSetState } from '../../Assist/config';
import { fieldData } from '../../Common/data';
import { TabPageBase } from '../../TabPageBase';

@connect(({ presetRole, schedulingControl }) => ({
  presetRole,
  schedulingControl,
}))
class Index extends TabPageBase {
  reloadHeaderOnSubmitSuccess = true;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'presetRole/get',
      submitApiPath: 'presetRole/updateBasicInfo',
      presetRoleId: null,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return getDerivedStateFromPropertiesForUrlParameters(
      nextProperties,
      previousState,
      { id: '' },
      parseUrlParametersForSetState,
    );
  }

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { presetRoleId } = this.state;

    d[fieldData.presetRoleId.name] = presetRoleId;

    return d;
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
      values[fieldData.name.name] = getValueByKey({
        data: metaData,
        key: fieldData.name.name,
      });

      values[fieldData.description.name] = getValueByKey({
        data: metaData,
        key: fieldData.description.name,
      });
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    const { metaData } = this.state;

    const isSuper = getValueByKey({
      data: metaData,
      key: fieldData.isSuper.name,
      convert: convertCollection.number,
    });

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '基本信息',
          },
          hasExtra: true,
          extra: {
            affix: true,
            list: [
              {
                buildType: cardConfig.extraBuildType.iconInfo,
                icon: iconBuilder.infoCircle(),
                text: '超级管理员不允许编辑',
                hidden: !isSuper,
              },
              {
                buildType: cardConfig.extraBuildType.refresh,
              },
              {
                buildType: cardConfig.extraBuildType.save,
                hidden: !!isSuper,
              },
            ],
          },
          items: [
            {
              lg: 12,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.name,
              require: true,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.textarea,
              fieldData: fieldData.description,
              require: false,
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '模块与系统信息',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.customGrid,
              list: [
                {
                  label: fieldData.moduleCount.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.moduleCount.name,
                    convert: convertCollection.string,
                  }),
                },
                {
                  label: fieldData.channelNote.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.channelNote.name,
                  }),
                },
              ],
              props: {
                size: 'small',
                bordered: true,
                column: 2,
                emptyStyle: {
                  color: '#cccccc',
                },
                emptyValue: '待完善',
                labelStyle: {
                  width: '80px',
                },
              },
            },
          ],
        },
        buildUpdateTimeAndOperatorFieldItem({ data: metaData, line: 1 }),
      ],
    };
  };

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '角色名称尽可能表达出实际含义。',
        },
      ],
    };
  };
}

export default Index;
