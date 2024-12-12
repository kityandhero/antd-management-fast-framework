import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { ScrollFacadeBox } from 'antd-management-fast-component';
import { DataDisplayer } from 'antd-management-fast-design-playground';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { fieldData } from '../Common/data';

const { BaseVerticalFlexDrawer } = DataDrawer;
const visibleFlag = 'a35637a5250c4ed18e62c07f31b69ed9';

@connect(({ workflowFormDesign, schedulingControl }) => ({
  workflowFormDesign,
  schedulingControl,
}))
class DataSchemaDrawer extends BaseVerticalFlexDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '表单数据配置信息',
      loadApiPath: 'workflowFormDesign/getByWorkflow',
      dataSchemaList: [],
    };
  }

  supplementLoadRequestParams = (o) => {
    return {
      ...this.supplementRequestParams(o),
    };
  };

  supplementRequestParams = (o) => {
    const d = { ...o };
    const { externalData } = this.state;

    d[fieldData.workflowId.name] = getValueByKey({
      data: externalData,
      key: fieldData.workflowId.name,
    });

    return d;
  };

  doOtherAfterLoadSuccess = ({
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const dataSchemaList = getValueByKey({
      data: metaData,
      key: fieldData.dataSchemaList.name,
      convert: convertCollection.array,
    });

    this.setState({
      dataSchemaList: [...dataSchemaList],
    });
  };

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '简要说明:这里是流程表单的数据模型信息。',
        },
      ],
    };
  };

  renderPresetContentContainorInnerTop = () => {
    const { dataSchemaList } = this.state;

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
          <DataDisplayer schema={dataSchemaList} />
        </div>
      </ScrollFacadeBox>
    );
  };
}

export { DataSchemaDrawer };
