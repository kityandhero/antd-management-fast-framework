import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { buildUpdateTimeAndOperatorFieldItem } from '../../../customSpecialComponents';
import { fieldData } from '../Common/data';

const { BaseUpdateDrawer } = DataDrawer;

const visibleFlag = 'd9c75a9d8183474a94c9e3b032197cc9';

@connect(({ sectionApplicationConfig, schedulingControl }) => ({
  sectionApplicationConfig,
  schedulingControl,
}))
class UpdateBasicInfoDrawer extends BaseUpdateDrawer {
  componentAuthority =
    accessWayCollection.sectionApplicationConfig.updateBasicInfo.permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '编辑配置信息',
      loadApiPath: 'sectionApplicationConfig/get',
      submitApiPath: 'sectionApplicationConfig/updateBasicInfo',
      applicationId: '',
      applicationName: '',
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d.sectionApplicationConfigId = getValueByKey({
      data: externalData,
      key: fieldData.sectionApplicationConfigId.name,
    });

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d.sectionApplicationConfigId = getValueByKey({
      data: externalData,
      key: fieldData.sectionApplicationConfigId.name,
    });

    return d;
  };

  doOtherAfterLoadSuccess = ({
    metaData,
    // eslint-disable-next-line no-unused-vars
    metaListData,
    // eslint-disable-next-line no-unused-vars
    metaExtra,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData,
  }) => {
    const applicationId = getValueByKey({
      data: metaData,
      key: fieldData.applicationId.name,
    });

    const applicationName = getValueByKey({
      data: metaData,
      key: fieldData.applicationName.name,
    });

    this.setState({ applicationId, applicationName });
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

      values[fieldData.targetPath.name] = getValueByKey({
        data: metaData,
        key: fieldData.targetPath.name,
        convert: convertCollection.string,
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
            text: '基本信息',
          },
          hasExtra: true,
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.name,
              require: true,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.onlyShowInput,
              fieldData: fieldData.applicationName,
              value: getValueByKey({
                data: metaData,
                key: fieldData.applicationName.name,
              }),
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.targetPath,
              require: true,
            },
          ],
          instruction: [
            {
              title: '业务选项说明',
              showDivider: false,
              showNumber: true,
              list: [
                {
                  text: '应用请求接口时，传递页面路径，查找后返回对应导航',
                },
              ],
            },
          ],
        },
        buildUpdateTimeAndOperatorFieldItem({ data: metaData, line: 1 }),
      ],
    };
  };
}

export { UpdateBasicInfoDrawer };
