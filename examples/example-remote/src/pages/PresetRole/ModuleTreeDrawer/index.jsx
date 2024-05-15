import { Empty } from 'antd';

import { connect } from 'easy-soft-dva';
import { getValueByKey, isEmptyArray } from 'easy-soft-utility';

import { ElasticityTree } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig/accessWayCollection';
import { fieldData } from '../Common/data';

const { BaseVerticalFlexDrawer } = DataDrawer;

const visibleFlag = '96503b03e8e44a1fbbd9807b4b8bb46e';

@connect(({ presetRole, schedulingControl }) => ({
  presetRole,
  schedulingControl,
}))
class ModuleTreeDrawer extends BaseVerticalFlexDrawer {
  componentAuthority = accessWayCollection.presetRole.listTreeModule.permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      loadApiPath: 'presetRole/listTreeModule',
      defaultExpandedKeys: [],
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d.presetRoleId = getValueByKey({
      data: externalData,
      key: fieldData.presetRoleId.name,
    });

    return d;
  };

  doOtherAfterLoadSuccess = ({
    // eslint-disable-next-line no-unused-vars
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const keys = metaListData.map((o) => {
      const { key } = { key: '', ...o };

      return key;
    });

    this.setState({
      defaultExpandedKeys: [...keys],
    });
  };

  getPresetPageTitle = () => {
    return '角色权限配置树型列表';
  };

  fillInitialValuesAfterLoad = ({
    // eslint-disable-next-line no-unused-vars
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const values = {};

    return values;
  };

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '简要说明:这里可以显示角色已选择的模块。',
        },
      ],
    };
  };

  renderPresetContentContainorInnerTop = () => {
    const { metaListData, defaultExpandedKeys } = this.state;

    const hasData = !isEmptyArray(metaListData);

    return (
      <div style={{ padding: '20px 20px' }}>
        {hasData ? (
          <ElasticityTree
            innerProps={{ defaultExpandedKeys }}
            listData={metaListData}
            dataConvert={(o) => {
              const { title, relativePath } = {
                title: '',
                relativePath: '',
                ...o,
              };

              return {
                ...o,
                title: `${title} 【“${relativePath}”】`,
              };
            }}
          />
        ) : (
          <Empty description="暂无已选择模块，请选择后查看" />
        )}
      </div>
    );
  };
}

export { ModuleTreeDrawer };
