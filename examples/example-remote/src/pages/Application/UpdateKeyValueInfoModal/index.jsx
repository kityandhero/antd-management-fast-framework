import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { BaseUpdateKeyValueInfoModal } from '../../../customSpecialComponents';
import { modelTypeCollection } from '../../../modelBuilders';
import { fieldData } from '../Common/data';

const visibleFlag = '18caf3ff73694c7b9721f6d200b09bc0';

@connect(({ application, schedulingControl }) => ({
  application,
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
      pageTitle: '设置应用键值信息',
      loadApiPath: modelTypeCollection.applicationTypeCollection.getConfigure,
      submitApiPath:
        modelTypeCollection.applicationTypeCollection.updateKeyValueInfo,
    };
  }

  supplementRequestParams(o) {
    const d = { ...o };
    const { externalData } = this.props;
    const { currentData } = externalData;

    d.applicationId = getValueByKey({
      data: currentData,
      key: fieldData.applicationId.name,
    });

    return d;
  }

  buildTitleSubTextPrefix = () => {
    return '当前应用';
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
