import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { iconBuilder } from 'antd-management-fast-component';

import { keyValueEditModeCollection } from '../../../../customConfig';
import { buildInputItem } from '../../../../utils';
import { fieldData as fieldDataUser } from '../../../User/Common/data';
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
            text: '登录凭据有效期设置',
          },
          items: [
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.masterManagementTokenExpirationTime,
              editMode: keyValueEditModeCollection.number,
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData:
                fieldData.officeAutomationManagementTokenExpirationTime,
              editMode: keyValueEditModeCollection.number,
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData:
                fieldData.officeAutomationApplicationTokenExpirationTime,
              editMode: keyValueEditModeCollection.number,
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
          ],
        },
      ],
    };
  };

  renderPresetOther = () => {
    const { keyValueEditMode, metaData, targetFieldData } = this.state;

    return (
      <>
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
