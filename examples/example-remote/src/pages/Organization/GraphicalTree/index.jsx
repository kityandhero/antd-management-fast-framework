import { OrganizationGraph } from '@ant-design/graphs';

import { connect } from 'easy-soft-dva';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataForm } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { buildConfig } from '../Assist/tool';

const { BaseUpdateForm } = DataForm;

@connect(({ organization, schedulingControl }) => ({
  organization,
  schedulingControl,
}))
class AddBasicInfo extends BaseUpdateForm {
  componentAuthority =
    accessWayCollection.organization.getGraphicalTree.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '结构概览',
      loadApiPath: 'organization/getGraphicalTree',
    };
  }

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

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '结构全局概览',
          },
          hasExtra: true,
          extra: {
            affix: true,
            list: [
              {
                buildType: cardConfig.extraBuildType.refresh,
              },
            ],
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: metaData ? (
                <OrganizationGraph
                  {...buildConfig()}
                  data={
                    metaData || {
                      id: 'root',
                      value: {
                        name: '加载中',
                        level: 0,
                      },
                      children: [],
                    }
                  }
                />
              ) : null,
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
          text: '此处展示的是集团子公司与编外部门的关系图例。',
        },
      ],
    };
  };
}

export default AddBasicInfo;
