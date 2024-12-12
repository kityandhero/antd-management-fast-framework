import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { BaseFieldContentDrawer } from '../BaseFieldContentDrawer';
import { fieldData } from '../Common/data';

const visibleFlag = '7179f1455f0e427c93e9a5166ea72bd6';

@connect(({ sqlEntity, schedulingControl }) => ({
  sqlEntity,
  schedulingControl,
}))
class FieldCustomContentBusinessDrawer extends BaseFieldContentDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      loadApiPath: 'sqlEntity/getBusiness',
    };
  }

  getFieldContent = () => {
    const { metaData } = this.state;

    return getValueByKey({
      data: metaData,
      key: fieldData.fieldCustomContent.name,
      convert: convertCollection.string,
      defaultValue: '',
    });
  };
}

export { FieldCustomContentBusinessDrawer };
