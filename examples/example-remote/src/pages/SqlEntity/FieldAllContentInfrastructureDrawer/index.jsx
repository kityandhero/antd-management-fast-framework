import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { BaseFieldContentDrawer } from '../BaseFieldContentDrawer';
import { fieldData } from '../Common/data';

const visibleFlag = '56b6a78bb02e4ed28a1d7275d166ac26';

@connect(({ sqlEntity, schedulingControl }) => ({
  sqlEntity,
  schedulingControl,
}))
class FieldAllContentInfrastructureDrawer extends BaseFieldContentDrawer {
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
      key: fieldData.fieldAllContent.name,
      convert: convertCollection.string,
      defaultValue: '',
    });
  };
}

export { FieldAllContentInfrastructureDrawer };
