import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { buildNowTimeFieldItem } from '../../../customSpecialComponents';
import { modelTypeCollection } from '../../../modelBuilders';
import { SubsidiarySelectModalField } from '../../Subsidiary/SelectModalField';
import { UserSelectModalField } from '../../User/SelectModalField';
import { fieldData } from '../Common/data';

const { BaseAddDrawer } = DataDrawer;

const visibleFlag = '73e9af9963b8402abfaf3104b06971f9';

@connect(({ workflowCaseUserMonitorConfiguration, schedulingControl }) => ({
  workflowCaseUserMonitorConfiguration,
  schedulingControl,
}))
class AddBasicInfoDrawer extends BaseAddDrawer {
  destroyOnClose = true;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '新增监控配置',
      submitApiPath:
        modelTypeCollection.workflowCaseUserMonitorConfigurationTypeCollection
          .addBasicInfo,
      userId: '',
      subsidiaryId: '',
    };
  }

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { userId, subsidiaryId } = this.state;

    d[fieldData.userId.name] = userId;
    d[fieldData.subsidiaryId.name] = subsidiaryId;

    return d;
  };

  executeAfterDoOtherWhenChangeVisibleToHide = () => {
    this.setState({
      userId: '',
      subsidiaryId: '',
    });
  };

  afterUserSelect = (d) => {
    const userId = getValueByKey({
      data: d,
      key: fieldData.userId.name,
      defaultValue: '0',
    });

    this.setState({
      userId: userId,
    });
  };

  afterUserClearSelect = () => {
    this.setState({
      userId: '',
    });
  };

  afterSubsidiarySelect = (d) => {
    const subsidiaryId = getValueByKey({
      data: d,
      key: fieldData.subsidiaryId.name,
      defaultValue: '0',
    });

    this.setState({
      subsidiaryId: subsidiaryId,
    });
  };

  afterSubsidiaryClearSelect = () => {
    this.setState({
      subsidiaryId: '',
    });
  };

  establishCardCollectionConfig = () => {
    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '监控用户',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
                <UserSelectModalField
                  label={fieldData.friendlyName.label}
                  afterSelectSuccess={(d) => {
                    this.afterUserSelect(d);
                  }}
                  afterClearSelect={() => {
                    this.afterUserClearSelect();
                  }}
                />
              ),
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '要监控的企业',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
                <SubsidiarySelectModalField
                  label={fieldData.subsidiaryShortName.label}
                  afterSelectSuccess={(d) => {
                    this.afterSubsidiarySelect(d);
                  }}
                  afterClearSelect={() => {
                    this.afterSubsidiaryClearSelect();
                  }}
                />
              ),
            },
          ],
        },
        buildNowTimeFieldItem({}),
      ],
    };
  };
}

export { AddBasicInfoDrawer };
