import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import {
  buildCustomGrid,
  ScrollFacadeBox,
} from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { fieldData } from '../Common/data';

const visibleFlag = '5f30dc13b16e420da656faf052e45a9b';

const { BaseVerticalFlexDrawer } = DataDrawer;

@connect(({ keyValueInfrastructure, schedulingControl }) => ({
  keyValueInfrastructure,
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
      pageTitle: '键值信息',
      loadApiPath: 'keyValueInfrastructure/get',
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.props;

    d[fieldData.keyValueInfrastructureId.name] = getValueByKey({
      data: externalData,
      key: fieldData.keyValueInfrastructureId.name,
      defaultValue: '',
    });

    return d;
  };

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '简要说明:这里是当前数据的键值信息。',
        },
      ],
    };
  };

  buildTitleSubText = () => {
    const { metaData } = this.state;

    return getValueByKey({
      data: metaData,
      key: fieldData.title.name,
      defaultValue: '',
    });
  };

  getFieldContent = () => '';

  renderPresetContentContainorInnerTop = () => {
    const { metaData } = this.state;

    return (
      <ScrollFacadeBox
        style={{
          height: '100%',
          width: '100%',
          overflowY: 'auto',
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
                span: 2,
                label: fieldData.title.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.title.name,
                  defaultValue: '',
                }),
              },

              {
                span: 2,
                label: fieldData.key.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.key.name,
                  defaultValue: '',
                }),
              },
              {
                span: 2,
                label: fieldData.value.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.value.name,
                  defaultValue: '',
                }),
              },
              {
                span: 1,
                label: fieldData.tag.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.tag.name,
                  defaultValue: '',
                }),
              },
              {
                span: 1,
                label: fieldData.keyValueInfrastructureId.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.keyValueInfrastructureId.name,
                  defaultValue: '',
                }),
              },
              {
                span: 1,
                label: fieldData.createTime.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.createTime.name,
                  defaultValue: '',
                }),
              },
              {
                span: 1,
                label: fieldData.createOperatorId.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.createOperatorId.name,
                  defaultValue: '',
                }),
              },
              {
                span: 1,
                label: fieldData.updateTime.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.updateTime.name,
                  defaultValue: '',
                }),
              },
              {
                span: 1,
                label: fieldData.updateOperatorId.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.updateOperatorId.name,
                  defaultValue: '',
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
