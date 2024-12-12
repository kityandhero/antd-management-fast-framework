import { connect } from 'easy-soft-dva';
import {
  convertCollection,
  getValueByKey,
  whetherNumber,
} from 'easy-soft-utility';

import {
  cardConfig,
  getDerivedStateFromPropertiesForUrlParameters,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DocumentPrintDesigner } from 'antd-management-fast-design-playground';

import {
  accessWayCollection,
  emptySignet,
  signetStyle,
} from '../../../../customConfig';
import { toggleSignetPasswordSwitchAction } from '../../Assist/action';
import { parseUrlParametersForSetState } from '../../Assist/config';
import { fieldData } from '../../Common/data';
import { TabPageBase } from '../../TabPageBase';

@connect(({ user, schedulingControl }) => ({
  user,
  schedulingControl,
}))
class SignetInfo extends TabPageBase {
  componentAuthority = accessWayCollection.user.get.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'user/get',
      submitApiPath: 'user/setSignet',
      userId: null,
      signet: '',
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
    const { userId, signet } = this.state;

    d[fieldData.userId.name] = userId;
    d[fieldData.signet.name] = signet;

    return d;
  };

  afterImageUploadSuccess = (image) => {
    this.setState({ signet: image });
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
    const signet = getValueByKey({
      data: metaData,
      key: fieldData.signet.name,
    });

    this.setState({ signet });
  };

  onSwitchChange = () => {
    this.openSignetPasswordSwitch();
  };

  openSignetPasswordSwitch = () => {
    const { metaData } = this.state;

    toggleSignetPasswordSwitchAction({
      target: this,
      handleData: metaData,
      successCallback: ({ target, remoteData }) => {
        metaData[fieldData.signetPasswordSwitch.name] = getValueByKey({
          data: remoteData,
          key: fieldData.signetPasswordSwitch.name,
        });

        target.setState({ metaData });
      },
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

    if (metaData != null) {
      values[fieldData.signetPasswordSwitch.name] =
        getValueByKey({
          data: metaData,
          key: fieldData.signetPasswordSwitch.name,
          convert: convertCollection.number,
        }) === whetherNumber.yes;
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    const { signet } = this.state;

    // 示例数据
    const listApprove = [
      {
        workflowId: '1744243217534160896',
        flowCaseId: '1744252844502028288',
        approveUserId: '1701146521682186240',
        approveWorkflowNodeId: '1744243666630873088',
        inWorkflowLineId: '1744247168908267520',
        approveWorkflowNodeType: 20,
        approveAction: 100,
        approveActionMode: 200,
        note: '拟同意',
        channel: '504f6296bf1a4b3f9831d9c38d8f6a7b',
        status: 100,
        createOperatorId: '1701146521682186240',
        createTime: '2024-01-08 15:02:07',
        updateOperatorId: '1701146521682186240',
        updateTime: '2024-01-08 15:02:07',
        workflowCaseProcessHistoryId: '1744253128150224896',
        key: '1744253128150224896',
        approveActionNote: '通过',
        approveActionModeNote: '人工操作',
        approveUserName: '卢志涛',
        approveUserSignet: signet,
        approveWorkflowNodeTypeNote: '过程点',
        statusNote: '正常',
        workflowName: '范围测试流程T001',
        flowCaseTitle: '范围测试流程T001实例',
        approveWorkflowNodeName: '示例审批节点',
      },
    ].map((o) => {
      const {
        note,
        approveWorkflowNodeName,
        approveUserName,
        approveUserSignet,
        createTime,
      } = {
        approveWorkflowNodeName: '',
        note: '',
        approveUserName: '张三',
        approveUserSignet: '',
        createTime: '',
        ...o,
      };

      return {
        ...o,
        title: approveWorkflowNodeName,
        note: note || '未填写',
        name: approveUserName,
        signet: approveUserSignet || emptySignet,
        time: createTime,
      };
    });

    return {
      list: [
        {
          title: {
            icon: iconBuilder.picture(),
            text: '印章信息',
            subText: '[上传后需点击保存按钮保存!]',
          },
          hasExtra: true,
          extra: {
            affix: true,
            list: [
              {
                buildType: cardConfig.extraBuildType.refresh,
              },
              {
                buildType: cardConfig.extraBuildType.save,
              },
            ],
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.imageUpload,
              image: signet,
              action: `/user/uploadImage`,
              afterUploadSuccess: (imageData) => {
                this.afterImageUploadSuccess(imageData);
              },
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.picture(),
            text: '签名效果预览',
            subText: '[需要先保存哦!]',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
                <DocumentPrintDesigner
                  showToolbar={false}
                  canDesign={false}
                  showTitle={false}
                  showRemark={false}
                  approveList={listApprove}
                  signetStyle={signetStyle}
                />
              ),
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '印章密码开关',
            subText: '[启用密码时请确保已经设置印章密码!]',
          },
          extra: {
            list: [
              {
                buildType: cardConfig.extraBuildType.iconInfo,
                icon: iconBuilder.infoCircle(),
                text: '点击开关即可生效',
              },
            ],
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.switch,
              fieldData: fieldData.signetPasswordSwitch,
              require: false,
              innerProps: {
                checkedChildren: '开启',
                unCheckedChildren: '关闭',
                onChange: this.onSwitchChange,
              },
            },
          ],
        },
      ],
    };
  };
}

export default SignetInfo;
