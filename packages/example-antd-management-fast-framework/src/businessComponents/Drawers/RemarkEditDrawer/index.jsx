import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey } from 'easy-soft-utility';

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
      overlayButtonOpenText: '打开源代码',
      overlayButtonCloseText: '关闭源代码',
    };
  }

  saveRemark = (data) => {
    saveFormRemarkAction({
      target: this,
      handleData: {
        formRemarkList: data,
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
          text: '备注1备注1备注1备注1备注1备注1备注1备注1备注1备注1',
        },
        {
          text: '备注2备注2备注2备注2备注2备注2备注2备注2备注2备注2备注2备注2备注2备注2备注2备注2备注2备注2备注2备注2',
        },
      ],
    };
  };

  renderPresetContentContainorInnerTop = () => {
    const { metaData } = this.state;

    const formRemarkList = getValueByKey({
      data: metaData,
      key: 'formRemarkList',
      convert: convertCollection.array,
    });

    return (
      <div style={{ paddingLeft: '12px', paddingRight: '12px' }}>
        <RemarkEditor
          data={formRemarkList}
          onSave={(data) => {
            this.saveRemark(data);
          }}
        />
      </div>
    );
  };
}

export { RemarkEditDrawer };
