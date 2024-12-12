import { connect } from 'easy-soft-dva';
import {
  convertCollection,
  formatCollection,
  getValueByKey,
} from 'easy-soft-utility';

import {
  cardConfig,
  copyToClipboard,
  extraBuildType,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { modelTypeCollection } from '../../../modelBuilders';
import { fieldData } from '../Common/data';

const { BaseLoadDrawer } = DataDrawer;

const visibleFlag = '4f7c6a37b1a24e09a0db986b32eab4c6';

@connect(({ sqlLog, schedulingControl }) => ({
  sqlLog,
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
      pageTitle: '异常摘要信息',
      loadApiPath: modelTypeCollection.sqlLogTypeCollection.get,
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d.sqlLogId = getValueByKey({
      data: externalData,
      key: fieldData.sqlLogId.name,
    });

    return d;
  };

  establishExtraActionConfig = () => {
    const that = this;

    return {
      list: [
        {
          buildType: extraBuildType.generalExtraButton,
          icon: iconBuilder.copy(),
          text: '复制命令',
          disabled: this.checkInProgress(),
          handleClick: () => {
            const { metaData } = that.state;

            copyToClipboard(
              getValueByKey({
                data: metaData,
                key: fieldData.commandString.name,
                convert: convertCollection.string,
              }),
              false,
            );
          },
        },
      ],
    };
  };

  establishCardCollectionConfig = () => {
    const { metaData } = this.state;

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '简介 - 描述 - 备注',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.syntaxHighlighterView,
              fieldData: fieldData.commandString,
              value: getValueByKey({
                data: metaData,
                key: fieldData.commandString.name,
                defaultValue: '',
              }),
              language: 'sql',
              innerProps: {
                wrapLines: false,
              },
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '执行信息',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.customGrid,
              list: [
                {
                  label: fieldData.startMilliseconds.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.startMilliseconds.name,
                  }),
                },
                {
                  label: fieldData.durationMilliseconds.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.durationMilliseconds.name,
                  }),
                },
                {
                  label: fieldData.firstFetchDurationMilliseconds.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.firstFetchDurationMilliseconds.name,
                  }),
                },
                {
                  label: fieldData.executeType.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.executeType.name,
                  }),
                },
                {
                  span: 2,
                  label: fieldData.errored.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.errored.name,
                  }),
                },
              ],
              props: {
                bordered: true,
                size: 'small',
                column: 2,
                labelStyle: {
                  width: '90px',
                },
                emptyValue: '暂无',
                ellipsis: false,
              },
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '堆栈调用',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.html,
              html: getValueByKey({
                data: metaData,
                key: fieldData.stackTraceSnippet.name,
                defaultValue: '',
              }),
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '其他信息',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.customGrid,
              list: [
                {
                  label: fieldData.triggerChannelNote.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.triggerChannelNote.name,
                  }),
                },
                {
                  label: fieldData.collectModeNote.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.collectModeNote.name,
                  }),
                },
                {
                  label: fieldData.databaseChannel.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.databaseChannel.name,
                  }),
                },
                {
                  label: fieldData.createTime.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.createTime.name,
                    format: formatCollection.datetime,
                  }),
                },
              ],
              props: {
                bordered: true,
                size: 'small',
                column: 2,
                labelStyle: {
                  width: '90px',
                },
                emptyValue: '暂无',
                ellipsis: false,
              },
            },
          ],
        },
      ],
    };
  };
}

export { PreviewDrawer };
