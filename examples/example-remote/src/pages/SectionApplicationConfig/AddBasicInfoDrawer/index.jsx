import React from 'react';

import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { fieldData as fieldDataApplication } from '../../Application/Common/data';
import { ApplicationSelectModalField } from '../../Application/SelectModalField';
import { fieldData } from '../Common/data';

const { BaseAddDrawer } = DataDrawer;

const visibleFlag = 'e240f0262fc947879dcd76f2e5944bd1';

@connect(({ sectionApplicationConfig, schedulingControl }) => ({
  sectionApplicationConfig,
  schedulingControl,
}))
class AddBasicInfoDrawer extends BaseAddDrawer {
  componentAuthority =
    accessWayCollection.sectionApplicationConfig.addBasicInfo.permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      submitApiPath: 'sectionApplicationConfig/addBasicInfo',
      applicationId: '',
      applicationName: '',
    };
  }

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { applicationId } = this.state;
    const { externalData } = this.props;

    d.applicationId = applicationId;
    d.sectionId = getValueByKey({
      data: externalData,
      key: fieldData.sectionId.name,
    });

    return d;
  };

  afterApplicationSelect = (d) => {
    this.setState({
      applicationId: getValueByKey({
        data: d,
        key: fieldDataApplication.applicationId.name,
      }),
      applicationName: getValueByKey({
        data: d,
        key: fieldDataApplication.name.name,
      }),
    });
  };

  afterApplicationClearSelect = () => {
    this.setState({
      applicationId: '',
      applicationName: '',
    });
  };

  renderPresetTitle = () => {
    return '新增配置信息';
  };

  establishCardCollectionConfig = () => {
    const { applicationName } = this.state;

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '基本信息',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.name,
              require: true,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
                <ApplicationSelectModalField
                  label={fieldDataApplication.name.label}
                  applicationName={applicationName || null}
                  afterSelect={(d) => {
                    this.afterApplicationSelect(d);
                  }}
                  afterClearSelect={() => {
                    this.afterApplicationClearSelect();
                  }}
                />
              ),
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
              title: '功能说明',
              showDivider: false,
              showNumber: true,
              list: [
                {
                  text: '应用请求接口时，传递页面路径，查找后返回对应自定义配置',
                },
              ],
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '其他信息',
          },
          items: [
            {
              type: cardConfig.contentItemType.nowTime,
            },
          ],
        },
      ],
    };
  };
}

export { AddBasicInfoDrawer };
