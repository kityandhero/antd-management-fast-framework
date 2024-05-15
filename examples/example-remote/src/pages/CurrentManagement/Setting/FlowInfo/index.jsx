import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { iconBuilder } from 'antd-management-fast-component';

import { keyValueEditModeCollection } from '../../../../customConfig';
import { buildInputItem } from '../../../../utils';
import { fieldData as fieldDataUser } from '../../../User/Common/data';
import { PageListSelectActionDrawer } from '../../../User/PageListSelectActionDrawer';
import { updateFlowDebugUserIdAction } from '../../Assist/action';
import { fieldData } from '../../Common/data';
import { TabPageBase } from '../../TabPageBase';
import { UpdateKeyValueInfoModal } from '../../UpdateKeyValueInfoModal';

@connect(({ currentManagement, schedulingControl }) => ({
  currentManagement,
  schedulingControl,
}))
class Index extends TabPageBase {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'currentManagement/get',
      submitApiPath: 'currentManagement/updateDebugUserId',
      userId: '',
    };
  }

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { userId } = this.state;

    d[fieldData.flowDebugUserId.name] = userId;

    return d;
  };

  doOtherAfterLoadSuccess = ({
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const flowDebugUserId = getValueByKey({
      data: metaData,
      key: fieldData.flowDebugUserId.name,
    });

    this.setState({ userId: flowDebugUserId });
  };

  updateFlowDebugUserId = (data) => {
    updateFlowDebugUserIdAction({
      target: this,
      handleData: {
        flowDebugUserId: getValueByKey({
          data: data,
          key: fieldDataUser.userId.name,
        }),
      },
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  afterUserSelect = (d) => {
    const userId = getValueByKey({
      data: d,
      key: fieldDataUser.userId.name,
      defaultValue: '0',
    });

    this.setState({
      userId: userId,
    });
  };

  afterUserClearSelect = () => {
    this.setState({
      userId: '',
    });
  };

  showPageListSelectActionDrawer = () => {
    PageListSelectActionDrawer.open();
  };

  showUpdateKeyValueInfoModal = ({
    fieldData: targetFieldData,
    editMode = keyValueEditModeCollection.string,
  }) => {
    this.setState(
      {
        targetFieldData,
        keyValueEditMode: editMode,
      },
      () => {
        UpdateKeyValueInfoModal.open();
      },
    );
  };

  afterUpdateKeyValueInfoModalOk = () => {
    this.reloadData({});
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

    if (metaData != null) {
      values[fieldData.flowDebugUserId.name] = getValueByKey({
        data: metaData,
        key: fieldData.flowDebugUserId.name,
      });
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    const { firstLoadSuccess, metaData } = this.state;

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '流程调试用户设置',
          },
          items: [
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.flowDebugUserId,
              editMode: keyValueEditModeCollection.string,
              handleClick: this.showPageListSelectActionDrawer,
            }),
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '流程通用消息模板',
          },
          items: [
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.flowNotificationTemplate,
              editMode: keyValueEditModeCollection.string,
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
          ],
          instruction: [
            {
              title: '设置说明',
              showDivider: false,
              showNumber: true,
              list: [
                {
                  text: '通知模板必须为如下形式："即将审批的步骤为{0}, 审批人{1}".',
                },
                {
                  text: '形如{0}的位置为将要替换的内容.',
                },
                {
                  text: '位置 {0} 为节点名称.',
                },
                {
                  text: '位置 {1} 为审批人名称.',
                },
              ],
            },
          ],
        },
      ],
    };
  };

  renderPresetOther = () => {
    const { keyValueEditMode, metaData, targetFieldData } = this.state;

    return (
      <>
        <PageListSelectActionDrawer
          externalData={{
            currentData: metaData,
            fieldData: targetFieldData,
          }}
          editMode={keyValueEditMode || keyValueEditModeCollection.string}
          afterSelect={(selectData) => {
            this.updateFlowDebugUserId(selectData);
          }}
        />

        <UpdateKeyValueInfoModal
          externalData={{
            currentData: metaData,
            fieldData: targetFieldData,
          }}
          editMode={keyValueEditMode || keyValueEditModeCollection.string}
          afterOK={() => {
            this.afterUpdateKeyValueInfoModalOk();
          }}
        />
      </>
    );
  };
}

export default Index;
