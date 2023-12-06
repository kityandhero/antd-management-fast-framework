import { OrganizationGraph } from '@ant-design/graphs';

import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig/accessWayCollection';
import { fieldData } from '../../Subsidiary/Common/data';
import { buildConfig } from '../Assist/tool';

const { BaseVerticalFlexDrawer } = DataDrawer;

const visibleFlag = 'bd06b254017b42e28b993d8331ed255a';

@connect(({ organization, schedulingControl }) => ({
  organization,
  schedulingControl,
}))
class GraphicalSingleSubsidiaryDepartmentTreeDrawer extends BaseVerticalFlexDrawer {
  componentAuthority =
    accessWayCollection.organization.getGraphicalSingleSubsidiaryDepartment
      .permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      loadApiPath: 'organization/getGraphicalSingleSubsidiaryDepartment',
    };
  }

  getPresetPageTitle = () => {
    return '公司结构图示';
  };

  supplementLoadRequestParams = (o) => {
    return {
      ...this.supplementRequestParams(o),
    };
  };

  supplementRequestParams = (o) => {
    const d = { ...o };
    const { externalData } = this.state;

    d[fieldData.subsidiaryId.name] = getValueByKey({
      data: externalData,
      key: fieldData.subsidiaryId.name,
    });

    return d;
  };

  renderPresetContentContainorInnerTop = () => {
    const { metaData } = this.state;

    return (
      <div
        style={{
          paddingTop: '20px',
        }}
      >
        <OrganizationGraph
          {...buildConfig()}
          data={
            metaData || {
              id: 'root',
              value: {
                name: '加载中',
                level: 0,
              },
              children: [],
            }
          }
        />
      </div>
    );
  };

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '此处展示的是公司部门结构。',
        },
      ],
    };
  };
}

export { GraphicalSingleSubsidiaryDepartmentTreeDrawer };
