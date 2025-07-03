import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  getValueByKey,
  showSimpleSuccessMessage,
} from 'easy-soft-utility';

import {
  cardConfig,
  getDerivedStateFromPropertiesForUrlParameters,
} from 'antd-management-fast-common';
import { buildCustomGrid, iconBuilder } from 'antd-management-fast-component';

import { accessWayCollection } from '../../../../customConfig';
import { buildUpdateTimeAndOperatorFieldItem } from '../../../../customSpecialComponents';
import { modelTypeCollection } from '../../../../modelBuilders';
import { replyAction } from '../../Assist/action';
import { parseUrlParametersForSetState } from '../../Assist/config';
import { fieldData } from '../../Common/data';
import { TabPageBase } from '../../TabPageBase';

@connect(({ applicationCustomerFeedback, schedulingControl }) => ({
  applicationCustomerFeedback,
  schedulingControl,
}))
class Index extends TabPageBase {
  reloadHeaderOnSubmitSuccess = true;

  componentAuthority =
    accessWayCollection.applicationCustomerFeedback.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath:
        modelTypeCollection.applicationCustomerFeedbackTypeCollection.get,
      submitApiPath:
        modelTypeCollection.applicationCustomerFeedbackTypeCollection
          .updateBasicInfo,
      applicationCustomerFeedbackId: null,
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

  doOtherAfterLoadSuccess = ({
    // eslint-disable-next-line no-unused-vars
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {};

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { applicationCustomerFeedbackId } = this.state;

    d[fieldData.applicationCustomerFeedbackId.name] =
      applicationCustomerFeedbackId;

    return d;
  };

  replyMessage = () => {
    const { applicationCustomerFeedbackId } = this.state;

    replyAction({
      target: this,
      handleData: {
        applicationCustomerFeedbackId,
        replyContent: this.replyContent,
      },
      successCallback: () => {
        showSimpleSuccessMessage('回复保存成功');
      },
    });
  };

  onRepayChange = (v) => {
    this.replyContent = v;
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
      values[fieldData.name.name] = getValueByKey({
        data: metaData,
        key: fieldData.name.name,
      });

      values[fieldData.description.name] = getValueByKey({
        data: metaData,
        key: fieldData.description.name,
      });

      values[fieldData.replyContent.name] = getValueByKey({
        data: metaData,
        key: fieldData.replyContent.name,
      });
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    const { firstLoadSuccess, metaData } = this.state;

    const that = this;

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '基本信息',
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
              component: buildCustomGrid({
                list: [
                  {
                    span: 2,
                    label: fieldData.title.label,
                    value: getValueByKey({
                      data: metaData,
                      key: fieldData.title.name,
                    }),
                  },
                  {
                    span: 2,
                    label: fieldData.description.label,
                    value: getValueByKey({
                      data: metaData,
                      key: fieldData.description.name,
                    }),
                  },
                ],
                props: {
                  bordered: true,
                  column: 2,
                  size: 'small',
                  labelStyle: {
                    width: '100px',
                  },
                  emptyValue: '暂无',
                  emptyStyle: {
                    color: '#ccc',
                  },
                },
              }),
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '回复内容',
          },
          hasExtra: true,
          extra: {
            list: [
              {
                buildType: cardConfig.extraBuildType.generalExtraButton,
                type: 'primary',
                icon: iconBuilder.enable(),
                text: '保存回复',
                disabled: !firstLoadSuccess,
                hidden: !checkHasAuthority(
                  accessWayCollection.subsidiaryReportMessage.repay.permission,
                ),
                handleClick: () => {
                  that.replyMessage();
                },
              },
            ],
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.textarea,
              fieldData: fieldData.replyContent,
              innerProps: {
                onChange: (event) => {
                  const {
                    target: { value: v },
                  } = event;

                  that.onRepayChange(v);
                },
              },
            },
          ],
        },
        buildUpdateTimeAndOperatorFieldItem({
          data: metaData,
          line: 1,
        }),
      ],
    };
  };
}

export default Index;
