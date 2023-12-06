import { connect } from 'easy-soft-dva';
import {
  convertCollection,
  getTimeStamp,
  getValueByKey,
  toString,
} from 'easy-soft-utility';

import { RemarkEditor } from 'antd-management-fast-design-playground';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { updateRemarkSchemaAction } from '../Assist/action';
import { fieldData } from '../Common/data';

const { BaseVerticalFlexDrawer } = DataDrawer;

const visibleFlag = 'b1fbead77ced442f854d79fd83b3af18';

@connect(({ workflowFormDesign, schedulingControl }) => ({
  workflowFormDesign,
  schedulingControl,
}))
class RemarkEditDrawer extends BaseVerticalFlexDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  static close() {
    switchControlAssist.close(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '表单备注编辑',
      loadApiPath: 'workflowFormDesign/getByWorkflow',
      width: 1024,
      dataStamp: '',
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
    // eslint-disable-next-line no-unused-vars
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    this.setState({ dataStamp: toString(getTimeStamp(new Date())) });
  };

  saveRemark = ({ color, list }) => {
    const { metaData } = this.state;

    const workflowFormDesignId = getValueByKey({
      data: metaData,
      key: fieldData.workflowFormDesignId.name,
    });

    updateRemarkSchemaAction({
      target: this,
      handleData: {
        workflowFormDesignId: workflowFormDesignId || '',
        remarkSchema: JSON.stringify(list),
        remarkColor: color,
      },
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '空白的备注项将在保存时被忽略，点击编辑按钮可以在当前行进行编辑。',
        },
        {
          text: '重置编辑意味着撤销当前数据加载后的所有编辑过程。',
        },
        {
          text: '编辑完成后请记得保存哦。',
        },
      ],
    };
  };

  renderPresetContentContainorInnerTop = () => {
    const { metaData, dataStamp } = this.state;

    const remarkSchemaList = getValueByKey({
      data: metaData,
      key: fieldData.remarkSchemaList.name,
      convert: convertCollection.array,
    });

    const remarkColor = getValueByKey({
      data: metaData,
      key: fieldData.remarkColor.name,
      defaultValue: '',
    });

    return (
      <div style={{ paddingLeft: '12px', paddingRight: '12px' }}>
        <RemarkEditor
          data={{
            color: remarkColor,
            list: remarkSchemaList,
            dataStamp,
          }}
          onSave={(data) => {
            this.saveRemark(data);
          }}
        />
      </div>
    );
  };
}

export { RemarkEditDrawer };
