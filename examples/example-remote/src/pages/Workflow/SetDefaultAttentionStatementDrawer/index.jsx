import { connect } from 'easy-soft-dva';
import {
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  datetimeFormat,
  formatDatetime,
  getNow,
  getValueByKey,
} from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DocumentPrintDesigner,
  nodeAttention,
} from 'antd-management-fast-design-playground';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { emptySignet } from '../../../customConfig';
import { modelTypeCollection } from '../../../modelBuilders';
import { fieldData } from '../Common/data';

const { BaseUpdateDrawer } = DataDrawer;

const visibleFlag = '609a474d4ec54c6ea99290a9f0e8aea3';

@connect(({ workflow, schedulingControl }) => ({
  workflow,
  schedulingControl,
}))
class SetDefaultAttentionStatementDrawer extends BaseUpdateDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '设置默认经办人标题与陈述',
      loadApiPath: modelTypeCollection.workflowTypeCollection.get,
      submitApiPath:
        modelTypeCollection.workflowTypeCollection.setDefaultAttentionStatement,
      width: 924,
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
      values[fieldData.defaultAttentionStatementTitle.name] = getValueByKey({
        data: metaData,
        key: fieldData.defaultAttentionStatementTitle.name,
        convert: convertCollection.string,
      });

      values[fieldData.defaultAttentionStatementContent.name] = getValueByKey({
        data: metaData,
        key: fieldData.defaultAttentionStatementContent.name,
        convert: convertCollection.string,
      });
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    const { metaData } = this.state;

    const defaultAttentionStatementTitle = getValueByKey({
      data: metaData,
      key: fieldData.defaultAttentionStatementTitle.name,
      convert: convertCollection.string,
    });

    const defaultAttentionStatementContent = getValueByKey({
      data: metaData,
      key: fieldData.defaultAttentionStatementContent.name,
      convert: convertCollection.string,
    });

    const defaultAttentionUserSignet = getValueByKey({
      data: metaData,
      key: fieldData.defaultAttentionUserSignet.name,
      convert: convertCollection.string,
    });

    const listAttention = [
      {
        ...nodeAttention,
        title: defaultAttentionStatementTitle,
        note: defaultAttentionStatementContent,
        ...(checkStringIsNullOrWhiteSpace(defaultAttentionUserSignet)
          ? {
              signet: emptySignet,
            }
          : {
              signet: defaultAttentionUserSignet,
            }),
        time: formatDatetime({
          data: getNow(),
          format: datetimeFormat.yearMonthDay,
        }),
      },
    ];

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
                {
                  span: 2,
                  label: fieldData.defaultAttentionUserRealName.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.defaultAttentionUserRealName.name,
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
          items: [
            {
              lg: 18,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.defaultAttentionStatementTitle,
              require: true,
            },
          ],
        },
        {
          items: [
            {
              lg: 18,
              type: cardConfig.contentItemType.textarea,
              fieldData: fieldData.defaultAttentionStatementContent,
              require: true,
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '效果预览',
          },
          items: [
            {
              lg: 18,
              type: cardConfig.contentItemType.component,
              component: (
                <DocumentPrintDesigner
                  canDesign={false}
                  showToolbar={false}
                  showApply={false}
                  showAttention
                  attentionList={listAttention}
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
          text: '此处配置的信息用于在审批文档中展示.',
        },
        {
          text: '启用经办人签名, 请确保经办人的签章已经上传.',
        },
      ],
    };
  };
}

export { SetDefaultAttentionStatementDrawer };
