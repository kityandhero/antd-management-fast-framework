import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { BaseFieldContentDrawer } from '../BaseFieldContentDrawer';
import { fieldData } from '../Common/data';

const visibleFlag = '33d89ea467ef4a18a5f83fcec61b10e4';

@connect(({ sqlEntity, schedulingControl }) => ({
  sqlEntity,
  schedulingControl,
}))
class FieldAllContentBusinessDrawer extends BaseFieldContentDrawer {
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
      key: fieldData.fieldAllContent.name,
      convert: convertCollection.string,
      defaultValue: '',
    });
  };
}

export { FieldAllContentBusinessDrawer };
