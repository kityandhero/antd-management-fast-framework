import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { modelTypeCollection } from '../../../modelBuilders';
import { fieldData as fieldDataUser } from '../../User/Common/data';
import { UserSelectDrawerField } from '../../User/SelectDrawerField';
import { fieldData } from '../Common/data';

const { BaseUpdateDrawer } = DataDrawer;

const visibleFlag = 'de4d5907d4e34fbda67a6bd0f9eb518f';

@connect(({ workflow, schedulingControl }) => ({
  workflow,
  schedulingControl,
}))
class SetDefaultAttentionUserDrawer extends BaseUpdateDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '设置流程特定测试模式提交人',
      loadApiPath: modelTypeCollection.workflowTypeCollection.get,
      submitApiPath:
        modelTypeCollection.workflowTypeCollection.setDefaultAttentionUser,
      userId: '',
      userRealName: '',
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.props;

    d[fieldData.workflowId.name] = getValueByKey({
      data: externalData,
      key: fieldData.workflowId.name,
      defaultValue: '',
    });

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { userId } = this.state;
    const { externalData } = this.props;

    d[fieldData.workflowId.name] = getValueByKey({
      data: externalData,
      key: fieldData.workflowId.name,
      defaultValue: '',
    });

    d[fieldData.defaultAttentionUserId.name] = userId;

    return d;
  };

  afterDefaultAttentionUserSelect = (d) => {
    const userId = getValueByKey({
      data: d,
      key: fieldDataUser.userId.name,
      defaultValue: '0',
    });

    const realName = getValueByKey({
      data: d,
      key: fieldDataUser.realName.name,
      defaultValue: '暂无真名',
    });

    this.setState({
      userId: userId,
      realName: realName,
    });
  };

  afterDefaultAttentionUserClearSelect = () => {
    this.setState({
      userId: '',
      realName: '',
    });
  };

  buildTitleSubText = () => {
    const { metaData } = this.state;

    return getValueByKey({
      data: metaData,
      key: fieldData.name.name,
    });
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

    return {
      list: [
        {
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.customGrid,
              list: [
                {
                  span: 2,
                  label: fieldData.attentionSignSwitchNote.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.attentionSignSwitchNote.name,
                  }),
                },
              ],
              props: {
                title: '当前配置信息: ',
                bordered: true,
                size: 'small',
                column: 2,
                labelStyle: {
                  width: '140px',
                },
                emptyValue: '暂无',
                emptyStyle: {
                  color: '#ccc',
                },
              },
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '设置流程默认的经办人',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
                <UserSelectDrawerField
                  label={fieldData.defaultAttentionUserId.label}
                  defaultValue={
                    getValueByKey({
                      data: metaData,
                      key: fieldData.defaultAttentionUserRealName.name,
                    }) || null
                  }
                  afterSelectSuccess={(d) => {
                    this.afterDefaultAttentionUserSelect(d);
                  }}
                  afterClearSelect={() => {
                    this.afterDefaultAttentionUserClearSelect();
                  }}
                />
              ),
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
          text: '启用经办人签名, 请确保经办人的签章已经上传.',
        },
      ],
    };
  };
}

export { SetDefaultAttentionUserDrawer };
