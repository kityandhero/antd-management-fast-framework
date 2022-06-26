import { connect } from 'umi';

import { iconCollection } from 'antd-management-fast-framework/es/utils/constants';
import { getDerivedStateFromPropsForUrlParams } from 'antd-management-fast-framework/es/utils/tools';

import DataTabContainerSupplement from '@/customSpecialComponents/DataTabContainerSupplement';

import { parseUrlParamsForSetState } from '../Assist/config';

import { accessWayCollection } from '@/customConfig/config';
import { refreshCacheAction } from '@/pages/Article/Assist/action';
import { fieldData } from '../Common/data';

@connect(({ accessWay, global, loading }) => ({
  accessWay,
  global,
  loading: loading.models.accessWay,
}))
class Edit extends DataTabContainerSupplement {
  componentAuthority = accessWayCollection.accessWay.get.permission;

  mounted = false;

  state = {
    loadApiPath: 'accessWay/get',
    backPath: `/accessWay/pageList/key`,
    accessWayId: null,
  };

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
      article: { data },
    } = props;

    return data;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  checkNeedUpdate = (preProps, preState, snapshot) => {
    return checkNeedUpdateAssist(this.state, preProps, preState, snapshot);
  };

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { accessWayId } = this.state;

    d.accessWayId = accessWayId;

    return d;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doOtherAfterLoadSuccess = ({ metaData, metaListData, metaExtra, metaOriginalData }) => {
    this.setState({
      pageName: getValueByKey({
        data: metaData,
        key: fieldData.name.name,
      }),
    });
  };

  refreshCache = (r) => {
    refreshCacheAction({
      target: this,
      handleData: r,
      successCallback: ({ target }) => {
        target.reloadData();
      },
    });
  };

  establishExtraActionEllipsisConfig = () => {
    const { metaData } = this.state;

    if ((metaData || null) == null) {
      return null;
    }

    const that = this;

    return {
      size: 'default',
      placement: 'top',
      title: '更多操作',
      disabled: false,
      hidden: false,
      handleMenuClick: ({ key, handleData }) => {
        switch (key) {
          case 'refreshCache':
            that.refreshCache(handleData);
            break;

          default:
            break;
        }
      },
      handleData: metaData,
      items: [
        {
          key: 'refreshCache',
          withDivider: true,
          uponDivider: true,
          icon: iconCollection.reload,
          text: '刷新缓存',
          hidden: !this.checkAuthority(accessWayCollection.accessWay.refreshCache.permission),
          confirm: {
            title: '将要刷新缓存，确定吗？',
          },
        },
      ],
    };
  };

  establishPageHeaderTitlePrefix = () => {
    return '模块';
  };

  establishPageHeaderContentGridConfig = () => {
    const { metaData } = this.state;

    return [
      {
        label: fieldData.accessWayId.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.accessWayId.name,
        }),
        canCopy: true,
      },
      {
        label: fieldData.guidTag.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.guidTag.name,
        }),
      },
    ];
  };
}

export default Edit;
