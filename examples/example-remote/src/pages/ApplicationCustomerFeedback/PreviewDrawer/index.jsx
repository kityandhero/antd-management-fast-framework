import { connect } from 'easy-soft-dva';
import {
  checkStringIsNullOrWhiteSpace,
  getValueByKey,
} from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { buildCustomGrid, iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { buildUpdateTimeAndOperatorFieldItem } from '../../../customSpecialComponents';
import { modelTypeCollection } from '../../../modelBuilders';
import { fieldData } from '../Common/data';

const { BaseLoadDrawer } = DataDrawer;

const visibleFlag = '856acfd89eb34b91a61c7ffa9613f72a';

@connect(({ applicationCustomerFeedback, schedulingControl }) => ({
  applicationCustomerFeedback,
  schedulingControl,
}))
class PreviewDrawer extends BaseLoadDrawer {
  resetDataAfterLoad = false;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '反馈信息',
      loadApiPath:
        modelTypeCollection.applicationCustomerFeedbackTypeCollection.get,
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d[fieldData.applicationCustomerFeedbackId.name] = getValueByKey({
      data: externalData,
      key: fieldData.applicationCustomerFeedbackId.name,
    });

    return d;
  };

  establishCardCollectionConfig = () => {
    const { metaData } = this.state;

    const replyContent = getValueByKey({
      data: metaData,
      key: fieldData.replyContent.name,
      defaultValue: '',
    });

    let replyTime = getValueByKey({
      data: metaData,
      key: fieldData.replyTime.name,
      defaultValue: '',
    });

    if (checkStringIsNullOrWhiteSpace(replyContent)) {
      replyTime = '';
    }

    return {
      list: [
        {
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
            text: '留言人信息',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: buildCustomGrid({
                list: [
                  {
                    span: 2,
                    label: fieldData.customerFriendlyName.label,
                    value: getValueByKey({
                      data: metaData,
                      key: fieldData.customerFriendlyName.name,
                    }),
                  },
                  {
                    span: 1,
                    label: fieldData.customerId.label,
                    value: getValueByKey({
                      data: metaData,
                      key: fieldData.customerId.name,
                    }),
                  },
                  {
                    span: 1,
                    label: fieldData.customerPhone.label,
                    value: getValueByKey({
                      data: metaData,
                      key: fieldData.customerPhone.name,
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
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: buildCustomGrid({
                list: [
                  {
                    span: 2,
                    label: fieldData.replyContent.label,
                    value: replyContent,
                  },
                  {
                    span: 2,
                    label: fieldData.replyTime.label,
                    value: replyTime,
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
        buildUpdateTimeAndOperatorFieldItem({
          data: metaData,
          line: 2,
          additionalDataConfig: [
            {
              span: 1,
              fieldData: fieldData.applicationCustomerFeedbackId,
            },
            {
              span: 1,
              fieldData: fieldData.subsidiaryShortName,
            },
            {
              span: 1,
              fieldData: fieldData.whetherConfirmNote,
            },
            {
              span: 1,
              fieldData: fieldData.whetherReplyNote,
            },
            {
              span: 1,
              fieldData: fieldData.channelNote,
            },
            {
              span: 1,
              fieldData: fieldData.statusNote,
            },
          ],
        }),
      ],
    };
  };
}

export { PreviewDrawer };
