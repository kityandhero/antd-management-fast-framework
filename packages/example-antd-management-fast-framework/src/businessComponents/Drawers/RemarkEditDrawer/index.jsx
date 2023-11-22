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

import { saveFormRemarkAction } from '../../../businessAssists/action';

const { BaseVerticalFlexDrawer } = DataDrawer;

const visibleFlag = '8bad2345065b429d922ff6085b81fa95';

@connect(({ formDesign, schedulingControl }) => ({
  formDesign,
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
      loadApiPath: 'formDesign/getFormRemark',
      width: 1024,
      dataStamp: '',
      overlayButtonOpenText: '打开源代码',
      overlayButtonCloseText: '关闭源代码',
    };
  }

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
    saveFormRemarkAction({
      target: this,
      handleData: {
        color: color || '',
        list: list,
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

    const formRemarkList = getValueByKey({
      data: metaData,
      key: 'formRemarkList',
      convert: convertCollection.array,
    });

    const formRemarkColor = getValueByKey({
      data: metaData,
      key: 'formRemarkColor',
      defaultValue: '',
    });

    return (
      <div style={{ paddingLeft: '12px', paddingRight: '12px' }}>
        <RemarkEditor
          data={{
            color: formRemarkColor,
            list: formRemarkList,
            dataStamp,
          }}
          onSave={({ color, list }) => {
            this.saveRemark({ color, list });
          }}
        />
      </div>
    );
  };
}

export { RemarkEditDrawer };
