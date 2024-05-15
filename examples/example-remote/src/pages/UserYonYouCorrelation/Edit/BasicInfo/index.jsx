import { connect } from 'easy-soft-dva';
import { formatCollection, getValueByKey } from 'easy-soft-utility';

import {
  cardConfig,
  getDerivedStateFromPropertiesForUrlParameters,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import { accessWayCollection } from '../../../../customConfig';
import { fieldData as fieldDataUser } from '../../../User/Common/data';
import { UserSelectDrawerField } from '../../../User/SelectDrawerField';
import { parseUrlParametersForSetState } from '../../Assist/config';
import { fieldData } from '../../Common/data';
import { TabPageBase } from '../../TabPageBase';

@connect(({ userYonYouCorrelation, schedulingControl }) => ({
  userYonYouCorrelation,
  schedulingControl,
}))
class BasicInfo extends TabPageBase {
  componentAuthority = accessWayCollection.userYonYouCorrelation.get.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'userYonYouCorrelation/get',
      submitApiPath: 'userYonYouCorrelation/updateBasicInfo',
      userYonYouCorrelationId: null,
      userId: '',
      userRealName: '',
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
    const { userYonYouCorrelationId, userId } = this.state;

    d[fieldData.userYonYouCorrelationId.name] = userYonYouCorrelationId;
    d[fieldData.userId.name] = userId;

    return d;
  };

  doOtherAfterLoadSuccess = ({
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const userId = getValueByKey({
      data: metaData,
      key: fieldData.userId.name,
    });

    const userRealName = getValueByKey({
      data: metaData,
      key: fieldData.userRealName.name,
    });

    this.setState({ userId, userRealName });
  };

  afterUserSelect = (d) => {
    const userId = getValueByKey({
      data: d,
      key: fieldDataUser.userId.name,
    });

    const realName = getValueByKey({
      data: d,
      key: fieldDataUser.realName.name,
    });

    this.setState({
      userId: userId,
      userRealName: realName,
    });
  };

  afterUserClearSelect = () => {
    this.setState({
      userId: '',
      userRealName: '',
    });
  };

  fillInitialValuesAfterLoad = ({
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const values = {};

    if (metaData != null) {
      values[fieldData.personnelCode.name] = getValueByKey({
        data: metaData,
        key: fieldData.personnelCode.name,
      });

      values[fieldData.realName.name] = getValueByKey({
        data: metaData,
        key: fieldData.realName.name,
      });

      values[fieldData.phone.name] = getValueByKey({
        data: metaData,
        key: fieldData.phone.name,
      });

      values[fieldData.organization.name] = getValueByKey({
        data: metaData,
        key: fieldData.organization.name,
      });

      values[fieldData.gender.name] = getValueByKey({
        data: metaData,
        key: fieldData.gender.name,
      });
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    const { metaData, userRealName } = this.state;

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '基本信息',
          },
          hasExtra: true,
          extra: {
            affix: true,
            list: [
              {
                buildType: cardConfig.extraBuildType.refresh,
              },
              {
                buildType: cardConfig.extraBuildType.save,
              },
            ],
          },
          items: [
            {
              lg: 6,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.personnelCode,
              require: true,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.realName,
              require: false,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.phone,
              require: false,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.gender,
              require: false,
            },
            {
              lg: 18,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.organization,
              require: false,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.component,
              component: (
                <UserSelectDrawerField
                  label={fieldData.userRealName.label}
                  defaultValue={userRealName || null}
                  helper={fieldData.userRealName.helper}
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
            text: '操作信息',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.customGrid,
              list: [
                {
                  span: 1,
                  label: fieldData.createOperatorId.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.createOperatorId.name,
                  }),
                },
                {
                  span: 1,
                  label: fieldData.createTime.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.createTime.name,
                    format: formatCollection.datetime,
                  }),
                },
                {
                  span: 1,
                  label: fieldData.updateOperatorId.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.updateOperatorId.name,
                  }),
                },
                {
                  span: 1,
                  label: fieldData.updateTime.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.updateTime.name,
                    format: formatCollection.datetime,
                  }),
                },
              ],
              props: {
                size: 'small',
                bordered: true,
                column: 4,
                emptyStyle: {
                  color: '#cccccc',
                },
                emptyValue: '待完善',
                labelStyle: {
                  width: '80px',
                },
              },
            },
          ],
        },
      ],
    };
  };
}

export default BasicInfo;
