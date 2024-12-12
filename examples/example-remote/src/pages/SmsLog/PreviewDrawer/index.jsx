import { connect } from 'easy-soft-dva';
import {
  convertCollection,
  formatCollection,
  getValueByKey,
} from 'easy-soft-utility';

import {
  buildCustomGrid,
  ScrollFacadeBox,
} from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { modelTypeCollection } from '../../../modelBuilders';
import { fieldData } from '../Common/data';

const { BaseVerticalFlexDrawer } = DataDrawer;

const visibleFlag = '3209e4b5b38043209bd5b8cbf4293e26';

@connect(({ smsLog, schedulingControl }) => ({
  smsLog,
  schedulingControl,
}))
class PreviewDrawer extends BaseVerticalFlexDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '短信信息',
      loadApiPath: modelTypeCollection.smsLogTypeCollection.get,
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.props;

    d[fieldData.smsLogId.name] = getValueByKey({
      data: externalData,
      key: fieldData.smsLogId.name,
      convert: convertCollection.string,
      defaultValue: '',
    });

    return d;
  };

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '此处显示的短信发送详情。',
        },
        {
          text: '发送失败的短信不会重新发送。',
        },
      ],
    };
  };

  establishPresetContentContainorInnerTopStyle = () => {
    return {
      backgroundColor: '#ccc',
    };
  };

  renderPresetContentContainorInnerTop = () => {
    const { metaData } = this.state;

    return (
      <ScrollFacadeBox
        style={{
          height: '100%',
          width: '100%',
          overflowY: 'auto',
          backgroundColor: '#fff',
        }}
      >
        <div
          style={{
            paddingTop: '16px',
            paddingBottom: '16px',
            paddingLeft: '10px',
            paddingRight: '10px',
          }}
        >
          {buildCustomGrid({
            list: [
              {
                span: 1,
                label: fieldData.smsLogId.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.smsLogId.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 1,
                label: fieldData.smsCategoryName.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.smsCategoryName.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 1,
                label: fieldData.phone.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.phone.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 1,
                label: fieldData.code.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.code.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 2,
                label: fieldData.content.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.content.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 2,
                label: fieldData.errorMessage.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.errorMessage.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 1,
                label: fieldData.statusNote.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.statusNote.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 1,
                label: fieldData.sendTime.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.sendTime.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 1,
                label: fieldData.aggregateNote.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.aggregateNote.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 1,
                label: fieldData.channelNote.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.channelNote.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 1,
                label: fieldData.createTime.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.createTime.name,
                  format: formatCollection.datetime,
                }),
              },
              {
                span: 1,
                label: fieldData.createOperatorId.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.createOperatorId.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 1,
                label: fieldData.updateTime.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.updateTime.name,
                  format: formatCollection.datetime,
                }),
              },
              {
                span: 1,
                label: fieldData.updateOperatorId.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.updateOperatorId.name,
                  convert: convertCollection.string,
                }),
              },
            ],
            props: {
              bordered: true,
              size: 'small',
              column: 2,
              labelStyle: {
                width: '160px',
              },
              emptyValue: '暂无',
              emptyStyle: {
                color: '#ccc',
              },
              ellipsis: false,
            },
          })}
        </div>
      </ScrollFacadeBox>
    );
  };
}

export { PreviewDrawer };
