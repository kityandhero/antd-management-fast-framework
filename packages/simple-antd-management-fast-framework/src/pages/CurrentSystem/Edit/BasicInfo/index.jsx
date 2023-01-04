import { connect } from 'umi';

import { cardConfig } from 'antd-management-fast-common/es/utils/constants';
import {
  getDerivedStateFromPropsForUrlParams,
  getValueByKey,
} from 'antd-management-fast-common/es/utils/tools';
import { iconBuilder } from 'antd-management-fast-component/es/customComponents/Icon';

import { parseUrlParamsForSetState } from '../../Assist/config';
import { fieldData } from '../../Common/data';
import TabPageBase from '../../TabPageBase';

@connect(({ currentSystem, global, loading }) => ({
  currentSystem,
  global,
  loading: loading.models.currentSystem,
}))
class Index extends TabPageBase {
  goToUpdateWhenProcessed = true;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        loadApiPath: 'currentSystem/get',
        logo: '',
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(
      nextProps,
      prevState,
      { id: '' },
      parseUrlParamsForSetState,
    );
  }

  fillInitialValuesAfterLoad = ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaData = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaListData = [],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaOriginalData = null,
  }) => {
    const values = {};

    if (metaData != null) {
      values[fieldData.name.name] = getValueByKey({
        data: metaData,
        key: fieldData.name.name,
      });
      values[fieldData.description.name] = getValueByKey({
        data: metaData,
        key: fieldData.description.name,
      });
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    const { metaData } = this.state;

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
            ],
          },
          spinning: this.checkInProgress(),
          items: [
            {
              lg: 18,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.name,
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '简介描述',
          },
          spinning: this.checkInProgress(),
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.textarea,
              fieldData: fieldData.description,
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '其他信息',
          },
          spinning: this.checkInProgress(),
          items: [
            {
              type: cardConfig.contentItemType.onlyShowInput,
              fieldData: fieldData.createTime,
              value: getValueByKey({
                data: metaData,
                key: fieldData.createTime.name,
              }),
            },
          ],
        },
      ],
    };
  };
}

export default Index;
