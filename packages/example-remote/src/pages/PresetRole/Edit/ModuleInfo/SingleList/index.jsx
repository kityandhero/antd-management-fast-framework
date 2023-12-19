import { connect } from 'easy-soft-dva';

import { getDerivedStateFromPropertiesForUrlParameters } from 'antd-management-fast-common';

import ModuleInfoBase from '../../../../AccessWay/ModuleInfoBase';
import AccessWayDrawer from '../../../AccessWayDrawer';
import { removeModuleAction } from '../../../Assist/action';
import { parseUrlParametersForSetState } from '../../../Assist/config';
import { ModuleTreeDrawer } from '../../../ModuleTreeDrawer';
import { UpdateModuleModal } from '../../../UpdateModuleModal';

@connect(({ presetRole, schedulingControl }) => ({
  presetRole,
  schedulingControl,
}))
class ModuleInfo extends ModuleInfoBase {
  // 在控制台显示组建内调用序列, 仅为进行开发辅助
  // showCallProcess = true;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'presetRole/listModule',
      removeModuleApiPath: 'presetRole/removeModule',
      presetRoleId: null,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return getDerivedStateFromPropertiesForUrlParameters(
      nextProperties,
      previousState,
      { id: '' },
      parseUrlParametersForSetState,
    );
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { presetRoleId } = this.state;

    d.presetRoleId = presetRoleId;

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { presetRoleId } = this.state;

    d.presetRoleId = presetRoleId;

    return d;
  };

  removeModule = (record) => {
    removeModuleAction({
      target: this,
      handleData: record,
      successCallback: ({ target }) => {
        target.refreshData({});

        target.reloadByUrl();
      },
    });
  };

  openModuleDrawer = () => {
    AccessWayDrawer.open();
  };

  openUpdateModuleModal = () => {
    UpdateModuleModal.open();
  };

  openModuleTreeDrawer = () => {
    ModuleTreeDrawer.open();
  };

  renderPresetOther = () => {
    const { currentRecord, presetRoleId } = this.state;

    return (
      <>
        <AccessWayDrawer
          externalData={{ presetRoleId }}
          width={1200}
          afterClose={this.afterOperateSuccess}
        />

        <ModuleTreeDrawer maskClosable externalData={{ presetRoleId }} />

        <UpdateModuleModal
          externalData={{
            expansionSetCollection:
              currentRecord == null
                ? []
                : currentRecord.additional.expansionSetCollection,
            requestParams: {
              presetRoleId,
              guidTag: currentRecord == null ? '' : currentRecord.guidTag,
            },
          }}
          afterClose={this.afterUpdateModuleModalClose}
        />
      </>
    );
  };
}

export default ModuleInfo;
