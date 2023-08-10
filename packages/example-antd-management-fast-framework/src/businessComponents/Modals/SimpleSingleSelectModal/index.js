import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { convertOptionOrRadioData } from 'antd-management-fast-component';
import { DataModal, switchControlAssist } from 'antd-management-fast-framework';

import { fieldData } from '../../../businessData/data';

const { BaseSelectModal } = DataModal;

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = 'bd5d02637eec418da885f933b0f40ec2';

@connect(({ simple, schedulingControl }) => ({
  simple,
  schedulingControl,
}))
class SimpleSingleSelectModal extends BaseSelectModal {
  // 在控制台显示组建内调用序列, 仅为进行开发辅助
  // showCallProcess = true;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '选择文章',
      loadApiPath: 'simple/singleList',
    };
  }

  transferData = (o, index) => {
    const title = getValueByKey({
      data: o,
      key: fieldData.title.name,
    });

    return convertOptionOrRadioData(
      {
        ...o,
        label: title,
      },
      index,
    );
  };
}

export { SimpleSingleSelectModal };
