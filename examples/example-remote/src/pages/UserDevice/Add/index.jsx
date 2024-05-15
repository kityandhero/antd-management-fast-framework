import { connect } from 'easy-soft-dva';
import { checkHasAuthority, getValueByKey } from 'easy-soft-utility';

import {
  cardConfig,
  getDerivedStateFromPropertiesForUrlParameters,
} from 'antd-management-fast-common';
import { DataForm } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { renderFormDeviceTypeSelect } from '../../../customSpecialComponents';
import { UserSelectDrawerField } from '../../User/SelectDrawerField';
import { parseUrlParametersForSetState } from '../Assist/config';
import { fieldData } from '../Common/data';

const { BaseAddForm } = DataForm;

@connect(({ userDevice, schedulingControl }) => ({
  userDevice,
  schedulingControl,
}))
class Add extends BaseAddForm {
  componentAuthority = accessWayCollection.userDevice.addBasicInfo.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      dataLoading: false,
      pageTitle: '新增用户设备',
      submitApiPath: 'userDevice/addBasicInfo',
      userId: '',
      loginName: '',
      realName: '',
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

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { userId } = this.state;

    d[fieldData.userId.name] = userId;

    return d;
  };

  fillDefaultInitialValues = () => {
    const values = {};

    return values;
  };

  doOtherAfterSubmitSuccess = () => {
    this.goToPath(`/person/userDevice/pageList/no`);
  };

  afterCustomerSelect = (d) => {
    const userId = getValueByKey({
      data: d,
      key: fieldData.userId.name,
      defaultValue: '0',
    });

    const loginName = getValueByKey({
      data: d,
      key: fieldData.loginName.name,
    });

    const realName = getValueByKey({
      data: d,
      key: fieldData.realName.name,
      defaultValue: '暂无真名',
    });

    this.setState({
      userId: userId,
      loginName: loginName,
      realName: realName,
    });
  };

  afterCustomerClearSelect = () => {
    this.setState({
      userId: '',
      loginName: '',
      realName: '',
    });
  };

  establishCardCollectionConfig = () => {
    const { realName } = this.state;

    return {
      list: [
        {
          title: {
            text: '基本信息',
          },
          extra: {
            affix: true,
            list: [
              {
                buildType: cardConfig.extraBuildType.save,
                hidden: !checkHasAuthority(
                  accessWayCollection.userDevice.addBasicInfo.permission,
                ),
              },
            ],
          },
          items: [
            {
              lg: 6,
              type: cardConfig.contentItemType.component,
              component: (
                <UserSelectDrawerField
                  label={fieldData.loginName.label}
                  afterSelectSuccess={(d) => {
                    this.afterCustomerSelect(d);
                  }}
                  afterClearSelect={() => {
                    this.afterCustomerClearSelect();
                  }}
                />
              ),
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.onlyShowInput,
              fieldData: fieldData.realName,
              value: realName || '',
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.component,
              component: renderFormDeviceTypeSelect({}),
              require: true,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.deviceCode,
              require: true,
            },
          ],
        },
        {
          title: {
            text: '附属信息',
          },
          items: [
            {
              type: cardConfig.contentItemType.nowTime,
            },
          ],
        },
      ],
    };
  };
}

export default Add;
