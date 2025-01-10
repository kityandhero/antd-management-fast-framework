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

const visibleFlag = 'df55ee1be09840708568100d7ce9e7b3';

@connect(({ workflow, schedulingControl }) => ({
  workflow,
  schedulingControl,
}))
class SetAttentionStatementDrawer extends BaseUpdateDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '设置经办人标题与陈述',
      loadApiPath: modelTypeCollection.workflowDebugCaseTypeCollection.get,
      submitApiPath:
        modelTypeCollection.workflowDebugCaseTypeCollection
          .setAttentionStatement,
      width: 924,
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.props;

    d[fieldData.workflowDebugCaseId.name] = getValueByKey({
      data: externalData,
      key: fieldData.workflowDebugCaseId.name,
      defaultValue: '',
    });

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { externalData } = this.props;

    d[fieldData.workflowDebugCaseId.name] = getValueByKey({
      data: externalData,
      key: fieldData.workflowDebugCaseId.name,
      defaultValue: '',
    });

    return d;
  };

  buildTitleSubText = () => {
    const { metaData } = this.state;

    return getValueByKey({
      data: metaData,
      key: fieldData.title.name,
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
      values[fieldData.attentionStatementTitle.name] = getValueByKey({
        data: metaData,
        key: fieldData.attentionStatementTitle.name,
        convert: convertCollection.string,
      });

      values[fieldData.attentionStatementContent.name] = getValueByKey({
        data: metaData,
        key: fieldData.attentionStatementContent.name,
        convert: convertCollection.string,
      });
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    const { metaData } = this.state;

    const attentionStatementTitle = getValueByKey({
      data: metaData,
      key: fieldData.attentionStatementTitle.name,
      convert: convertCollection.string,
    });

    const attentionStatementContent = getValueByKey({
      data: metaData,
      key: fieldData.attentionStatementContent.name,
      convert: convertCollection.string,
    });

    const attentionUserSignet = getValueByKey({
      data: metaData,
      key: fieldData.attentionUserSignet.name,
      convert: convertCollection.string,
    });

    const listAttention = [
      {
        ...nodeAttention,
        title: attentionStatementTitle,
        note: attentionStatementContent,
        ...(checkStringIsNullOrWhiteSpace(attentionUserSignet)
          ? {
              signet: emptySignet,
            }
          : {
              signet: attentionUserSignet,
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
                  label: fieldData.attentionUserRealName.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.attentionUserRealName.name,
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
              fieldData: fieldData.attentionStatementTitle,
              require: true,
            },
          ],
        },
        {
          items: [
            {
              lg: 18,
              type: cardConfig.contentItemType.textarea,
              fieldData: fieldData.attentionStatementContent,
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

export { SetAttentionStatementDrawer };
