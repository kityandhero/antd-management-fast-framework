import { OrganizationGraph } from '@ant-design/graphs';

import { connect } from 'easy-soft-dva';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataForm } from 'antd-management-fast-framework';

const { BaseUpdateForm } = DataForm;

@connect(({ organization, schedulingControl }) => ({
  organization,
  schedulingControl,
}))
class AddBasicInfo extends BaseUpdateForm {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '组织结构图示',
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
            text: '组织结构全局概览',
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
                  nodeCfg={{
                    size: [20, 44],
                    autoWidth: true,
                  }}
                  data={
                    metaData || {
                      id: 'root',
                      value: {
                        name: '加载中',
                      },
                      children: [],
                    }
                  }
                  behaviors={['drag-canvas', 'zoom-canvas']}
                />
              ) : null,
            },
          ],
        },
      ],
    };
  };
}

export default AddBasicInfo;
