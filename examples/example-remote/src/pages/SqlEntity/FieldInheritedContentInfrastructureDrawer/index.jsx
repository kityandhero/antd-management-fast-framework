import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { BaseFieldContentDrawer } from '../BaseFieldContentDrawer';
import { fieldData } from '../Common/data';

const visibleFlag = '194b6885ee2e4d76ab953e7a32eb3da1';

@connect(({ sqlEntity, schedulingControl }) => ({
  sqlEntity,
  schedulingControl,
}))
class FieldInheritedContentInfrastructureDrawer extends BaseFieldContentDrawer {
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
      key: fieldData.fieldInheritedContent.name,
      convert: convertCollection.string,
      defaultValue: '',
    });
  };
}

export { FieldInheritedContentInfrastructureDrawer };
