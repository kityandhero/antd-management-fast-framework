import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey, isArray } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { DataModal, switchControlAssist } from 'antd-management-fast-framework';

import { fieldData as fieldDataWorkflow } from '../../Workflow/Common/data';
import { fieldData } from '../Common/data';

const { BaseUpdateModal } = DataModal;

const visibleFlag = '61943ea462604ca389bb5b1aa3b05a08';

@connect(({ workflow, workflowNode, schedulingControl }) => ({
  workflow,
  workflowNode,
  schedulingControl,
}))
class ChangeForwardModal extends BaseUpdateModal {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '更改前进流程',
      loadApiPath: 'workflow/get',
      submitApiPath: 'workflowNode/updateForwardId',
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d.workflowId = getValueByKey({
      data: externalData,
      key: fieldData.workflowId.name,
    });

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d.workflowNodeId = getValueByKey({
      data: externalData,
      key: fieldData.workflowNodeId.name,
    });

    return d;
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

  buildNotificationDescription = (
    // eslint-disable-next-line no-unused-vars
    singleData,
    // eslint-disable-next-line no-unused-vars
    listData,
    // eslint-disable-next-line no-unused-vars
    extraData,
    // eslint-disable-next-line no-unused-vars
    responseOriginalData,
    // eslint-disable-next-line no-unused-vars
    submitData,
  ) => {
    return `更新成功。`;
  };

  establishFormAdditionalConfig = () => {
    return {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 20,
      },
    };
  };

  buildTitleSubText = () => {
    const { externalData } = this.state;

    return getValueByKey({
      data: externalData,
      key: fieldData.name.name,
    });
  };

  establishCardCollectionConfig = () => {
    const { metaData } = this.state;

    const workflowNodeList = getValueByKey({
      data: metaData,
      key: fieldDataWorkflow.workflowNodeList.name,
      convert: convertCollection.array,
    });

    const list = (isArray(workflowNodeList) ? workflowNodeList : []).map(
      (o) => {
        return {
          flag: getValueByKey({
            data: o,
            key: fieldData.workflowNodeId.name,
          }),
          name: getValueByKey({
            data: o,
            key: fieldData.name.name,
          }),
        };
      },
    );

    list.unshift({
      flag: '0',
      name: '无流程',
    });

    return {
      list: [
        {
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.select,
              fieldData: fieldData.forwardId,
              listData: list,
            },
          ],
        },
      ],
    };
  };
}

export { ChangeForwardModal };
