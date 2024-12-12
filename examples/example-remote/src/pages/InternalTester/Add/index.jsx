import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  checkStringIsNullOrWhiteSpace,
  getValueByKey,
  replaceWithKeep,
} from 'easy-soft-utility';

import {
  cardConfig,
  getDerivedStateFromPropertiesForUrlParameters,
} from 'antd-management-fast-common';
import { DataForm } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { buildNowTimeFieldItem } from '../../../customSpecialComponents';
import { UserSelectDrawerField } from '../../User/SelectDrawerField';
import { parseUrlParametersForSetState } from '../Assist/config';
import { fieldData } from '../Common/data';

const { BaseAddForm } = DataForm;

@connect(({ internalTester, schedulingControl }) => ({
  internalTester,
  schedulingControl,
}))
class Add extends BaseAddForm {
  componentAuthority =
    accessWayCollection.internalTester.addBasicInfo.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      dataLoading: false,
      pageTitle: '新增内测用户',
      submitApiPath: 'internalTester/addBasicInfo',
      userId: '',
      nickname: '',
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
    this.goToPath(`/person/internalTester/pageList/no`);
  };

  afterUserSelect = (d) => {
    const userId = getValueByKey({
      data: d,
      key: fieldData.userId.name,
      defaultValue: '0',
    });

    const nickname = getValueByKey({
      data: d,
      key: fieldData.nickname.name,
      convert: (v) => {
        return checkStringIsNullOrWhiteSpace(v)
          ? replaceWithKeep(userId, '***', 2, 6)
          : v;
      },
    });

    this.setState({
      userId: userId,
      nickname: nickname,
    });
  };

  afterUserClearSelect = () => {
    this.setState({
      userId: '',
      nickname: '',
    });
  };

  establishCardCollectionConfig = () => {
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
                  accessWayCollection.internalTester.addBasicInfo.permission,
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
                  label={fieldData.nickname.label}
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
            text: '其他信息',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.textarea,
              fieldData: fieldData.note,
            },
          ],
        },
        buildNowTimeFieldItem({}),
      ],
    };
  };
}

export default Add;
