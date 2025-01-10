import { connect } from 'easy-soft-dva';
import {
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
  nodeApply,
} from 'antd-management-fast-design-playground';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { emptySignet } from '../../../customConfig';
import { modelTypeCollection } from '../../../modelBuilders';
import { fieldData } from '../Common/data';

const { BaseUpdateDrawer } = DataDrawer;

const visibleFlag = 'bf9f1bb9c4ba4f2bbd814994b67313ab';

@connect(({ workflow, schedulingControl }) => ({
  workflow,
  schedulingControl,
}))
class SetDefaultApplicantStatementDrawer extends BaseUpdateDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '设置默认申请人标题与陈述',
      loadApiPath: modelTypeCollection.workflowTypeCollection.get,
      submitApiPath:
        modelTypeCollection.workflowTypeCollection.setDefaultApplicantStatement,
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
      values[fieldData.defaultApplicantStatementTitle.name] = getValueByKey({
        data: metaData,
        key: fieldData.defaultApplicantStatementTitle.name,
        convert: convertCollection.string,
      });

      values[fieldData.defaultApplicantStatementContent.name] = getValueByKey({
        data: metaData,
        key: fieldData.defaultApplicantStatementContent.name,
        convert: convertCollection.string,
      });
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    const { metaData } = this.state;

    const defaultApplicantStatementTitle = getValueByKey({
      data: metaData,
      key: fieldData.defaultApplicantStatementTitle.name,
      convert: convertCollection.string,
    });

    const defaultApplicantStatementContent = getValueByKey({
      data: metaData,
      key: fieldData.defaultApplicantStatementContent.name,
      convert: convertCollection.string,
    });

    const listApply = [
      {
        ...nodeApply,
        title: defaultApplicantStatementTitle,
        note: defaultApplicantStatementContent,
        signet: emptySignet,
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
                  label: fieldData.applicantSignSwitchNote.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.applicantSignSwitchNote.name,
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
              fieldData: fieldData.defaultApplicantStatementTitle,
              require: true,
            },
          ],
        },
        {
          items: [
            {
              lg: 18,
              type: cardConfig.contentItemType.textarea,
              fieldData: fieldData.defaultApplicantStatementContent,
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
                  showApply
                  applyList={listApply}
                  showAttention={false}
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
          text: '启用申请人签名, 请确保申请人的签章已经上传.',
        },
      ],
    };
  };
}

export { SetDefaultApplicantStatementDrawer };
