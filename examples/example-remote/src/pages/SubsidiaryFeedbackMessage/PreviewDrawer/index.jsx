import { connect } from 'easy-soft-dva';
import {
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  getValueByKey,
} from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { buildCustomGrid, iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { buildUpdateTimeAndOperatorFieldItem } from '../../../customSpecialComponents';
import { fieldData } from '../Common/data';

const { BaseLoadDrawer } = DataDrawer;

const visibleFlag = 'e851f7507e254c7e9352b0f0469d5be8';

@connect(({ subsidiaryFeedbackMessage, schedulingControl }) => ({
  subsidiaryFeedbackMessage,
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
      pageTitle: '留言信息',
      loadApiPath: 'subsidiaryFeedbackMessage/get',
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d[fieldData.subsidiaryFeedbackMessageId.name] = getValueByKey({
      data: externalData,
      key: fieldData.subsidiaryFeedbackMessageId.name,
    });

    return d;
  };

  establishCardCollectionConfig = () => {
    const { metaData } = this.state;

    const listAttachment = getValueByKey({
      data: metaData,
      key: fieldData.listAttachment.name,
      convert: convertCollection.array,
    });

    const imageList = listAttachment.map((item) => {
      const { url } = {
        url: '',
        ...item,
      };
      return url;
    });

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
            {
              lg: 24,
              type: cardConfig.contentItemType.divider,
              text: '附件列表',
              innerProps: {
                style: {
                  margin: '16px 0 16px 0',
                },
              },
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.imageListShow,
              imageList,
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
              fieldData: fieldData.subsidiaryFeedbackMessageId,
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
