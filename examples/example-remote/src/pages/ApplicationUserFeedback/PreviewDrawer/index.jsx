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

const visibleFlag = 'd2e0131c89504f44a4d628dbf0b1450e';

@connect(({ applicationUserFeedback, schedulingControl }) => ({
  applicationUserFeedback,
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
        modelTypeCollection.applicationUserFeedbackTypeCollection.get,
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d[fieldData.applicationUserFeedbackId.name] = getValueByKey({
      data: externalData,
      key: fieldData.applicationUserFeedbackId.name,
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
                    label: fieldData.userFriendlyName.label,
                    value: getValueByKey({
                      data: metaData,
                      key: fieldData.userFriendlyName.name,
                    }),
                  },
                  {
                    span: 1,
                    label: fieldData.userId.label,
                    value: getValueByKey({
                      data: metaData,
                      key: fieldData.userId.name,
                    }),
                  },
                  {
                    span: 1,
                    label: fieldData.userPhone.label,
                    value: getValueByKey({
                      data: metaData,
                      key: fieldData.userPhone.name,
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
              fieldData: fieldData.applicationUserFeedbackId,
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
