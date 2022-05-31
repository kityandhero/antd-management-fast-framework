import { connect } from 'umi';

import { convertCollection } from 'antd-management-fast-framework/es/utils/constants';
import {
  getDerivedStateFromPropsForUrlParams,
  getValueByKey,
} from 'antd-management-fast-framework/es/utils/tools';

import DataTabContainerSupplement from '@/customSpecialComponents/DataTabContainerSupplement';

import { checkNeedUpdateAssist, parseUrlParamsForSetState } from '../Assist/config';
import { fieldData } from '../Common/data';

@connect(({ currentSystem, global, loading }) => ({
  currentSystem,
  global,
  loading: loading.models.currentSystem,
}))
class Edit extends DataTabContainerSupplement {
  tabList = [
    {
      key: 'basicInfo',
      tab: '基本信息',
    },
  ];

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '',
        loadApiPath: 'currentSystem/get',
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

  apiDataConvert = (props) => {
    const {
      currentSystem: { data },
    } = props;

    return data;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  checkNeedUpdate = (preProps, preState, snapshot) => {
    return checkNeedUpdateAssist(this.state, preProps, preState, snapshot);
  };

  afterLoadSuccess = ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaData = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaListData = [],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaOriginalData = null,
  }) => {
    this.setState({
      pageName: getValueByKey({
        data: metaData,
        key: fieldData.name.name,
      }),
    });
  };

  establishPageHeaderTitlePrefix = () => {
    return '商城名称';
  };

  establishPageHeaderExtraContentConfig = () => {
    const { metaData } = this.state;

    return {
      textLabel: fieldData.statusNote.label,
      text: getValueByKey({
        data: metaData,
        key: fieldData.statusNote.name,
      }),
      timeLabel: fieldData.createTime.label,
      time: getValueByKey({
        data: metaData,
        key: fieldData.createTime.name,
        convert: convertCollection.datetime,
      }),
    };
  };

  establishPageHeaderContentGridConfig = () => {
    const { metaData } = this.state;

    const list = [];

    list.push({
      label: fieldData.systemId.label,
      value: getValueByKey({
        data: metaData,
        key: fieldData.systemId.name,
      }),
      canCopy: true,
    });

    list.push({
      label: fieldData.name.label,
      value: getValueByKey({
        data: metaData,
        key: fieldData.name.name,
      }),
    });

    return list;
  };
}

export default Edit;
