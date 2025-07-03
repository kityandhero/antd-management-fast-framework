import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { BaseUpdateKeyValueInfoModal } from '../../../customSpecialComponents';
import { fieldData } from '../Common/data';

const visibleFlag = '078394bc1c3f4ee6a66fbf1ff7e3f935';

@connect(({ section, schedulingControl }) => ({
  section,
  schedulingControl,
}))
class UpdateKeyValueInfoModal extends BaseUpdateKeyValueInfoModal {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '设置键值信息',
      loadApiPath: 'section/get',
      submitApiPath: 'section/updateKeyValueInfo',
    };
  }

  supplementRequestParams(o) {
    const { externalData } = this.props;
    const { currentData } = externalData;

    const d = { ...o };

    d[fieldData.sectionId.name] = getValueByKey({
      data: currentData,
      key: fieldData.sectionId.name,
    });

    return d;
  }

  buildTitleSubTextPrefix = () => {
    return '当前栏目';
  };

  buildTitleSubText = () => {
    const { metaData } = this.state;

    return getValueByKey({
      data: metaData,
      key: fieldData.name.name,
    });
  };
}

export { UpdateKeyValueInfoModal };
