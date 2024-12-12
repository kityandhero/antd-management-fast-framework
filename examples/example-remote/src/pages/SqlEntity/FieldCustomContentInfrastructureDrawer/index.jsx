import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { BaseFieldContentDrawer } from '../BaseFieldContentDrawer';
import { fieldData } from '../Common/data';

const visibleFlag = '0d3c0f40066f4a56b9453dd1571562eb';

@connect(({ sqlEntity, schedulingControl }) => ({
  sqlEntity,
  schedulingControl,
}))
class FieldCustomContentInfrastructureDrawer extends BaseFieldContentDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      loadApiPath: 'sqlEntity/getInfrastructure',
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

export { FieldCustomContentInfrastructureDrawer };
