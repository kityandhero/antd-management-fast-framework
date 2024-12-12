import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataDisplayer } from 'antd-management-fast-design-playground';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { modelTypeCollection } from '../../../modelBuilders';
import { getByWorkflowAction } from '../../WorkflowFormDesign/Assist/action';
import { fieldData as fieldDataWorkflowFormDesign } from '../../WorkflowFormDesign/Common/data';
import { fieldData } from '../Common/data';

const { BaseUpdateDrawer } = DataDrawer;

const visibleFlag = '0909994f6a9147b6a9ccc0e7be854cb4';

@connect(({ workflow, schedulingControl }) => ({
  workflow,
  schedulingControl,
}))
class SetSmsTemplateDrawer extends BaseUpdateDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '设置短信通知模板',
      loadApiPath: modelTypeCollection.workflowTypeCollection.get,
      submitApiPath: modelTypeCollection.workflowTypeCollection.setSmsTemplate,
      dataSchemaList: [],
    };
  }

  loadFormFieldInfo = () => {
    const { externalData } = this.props;

    getByWorkflowAction({
      target: this,
      handleData: {
        workflowId: getValueByKey({
          data: externalData,
          key: fieldData.workflowId.name,
        }),
      },
      successCallback: ({ target, remoteData }) => {
        const dataSchemaList = getValueByKey({
          data: remoteData,
          key: fieldDataWorkflowFormDesign.dataSchemaList.name,
          convert: convertCollection.array,
        });

        target.setState({
          dataSchemaList: dataSchemaList,
        });
      },
    });
  };

  executeAfterDoOtherWhenChangeVisibleToShow = () => {
    this.loadFormFieldInfo();
  };

  executeAfterDoOtherWhenChangeVisibleToHide = () => {
    this.setState({
      dataSchemaList: [],
    });
  };

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
    const { externalData } = this.props;

    d[fieldData.workflowId.name] = getValueByKey({
      data: externalData,
      key: fieldData.workflowId.name,
      defaultValue: '',
    });

    return d;
  };

  buildTitleSubText = () => {
    const { metaData } = this.state;

    return getValueByKey({
      data: metaData,
      key: fieldData.name.name,
    });
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
      values[fieldData.smsTemplate.name] = getValueByKey({
        data: metaData,
        key: fieldData.smsTemplate.name,
        convert: convertCollection.string,
      });
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    const { dataSchemaList } = this.state;

    return {
      list: [
        {
          items: [
            {
              lg: 18,
              type: cardConfig.contentItemType.textarea,
              fieldData: fieldData.smsTemplate,
              require: true,
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '表单数据信息',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
                <div style={{ marginBottom: '10px' }}>
                  <DataDisplayer schema={dataSchemaList} />
                </div>
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
          text: '占位符请使用名称列的字符, 用{}包裹, 例如 {013zvfw9eu9}, {}内不要有空白符.',
        },
        {
          text: '内置固定占位符, {flowName} 代表当前流程名称, {approverName} 代表当前申请人名称, 可以选择性使用.',
        },
        {
          text: '配置此处前请先完善表单设计.',
        },
        {
          text: '请在表单设计更改后检查此处配置, 以免影响数据显示.',
        },
      ],
    };
  };
}

export { SetSmsTemplateDrawer };
