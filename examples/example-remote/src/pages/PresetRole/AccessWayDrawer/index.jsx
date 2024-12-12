import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { PageListDrawerCore } from '../../AccessWay/PageListDrawerCore';
import {
  addAllModuleAction,
  addModuleAction,
  addMultiModuleAction,
} from '../Assist/action';
import { fieldData } from '../Common/data';

const visibleFlag = 'fd7a604f12fa456dab6bcad940da8921';

@connect(({ accessWay, presetRole, schedulingControl }) => ({
  accessWay,
  presetRole,
  schedulingControl,
}))
class AccessWayDrawer extends PageListDrawerCore {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '可选模块列表',
      showSelect: true,
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.props;

    d.presetRoleId = getValueByKey({
      data: externalData,
      key: fieldData.presetRoleId.name,
    });

    return d;
  };

  supplementRequestSelectModuleParams = (o) => {
    const d = o;
    const { externalData } = this.props;

    d.presetRoleId = getValueByKey({
      data: externalData,
      key: fieldData.presetRoleId.name,
    });

    return d;
  };

  addModule = (record) => {
    addModuleAction({
      target: this,
      handleData: record,
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  addMultiModule = (record) => {
    addMultiModuleAction({
      target: this,
      handleData: record,
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  addAllModule = (record) => {
    addAllModuleAction({
      target: this,
      handleData: record,
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };
}

export default AccessWayDrawer;
