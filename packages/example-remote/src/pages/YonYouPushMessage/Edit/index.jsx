import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  convertCollection,
  getValueByKey,
} from 'easy-soft-utility';

import { getDerivedStateFromPropertiesForUrlParameters } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import { accessWayCollection } from '../../../customConfig';
import {
  DataTabContainerSupplement,
  getBusinessModeName,
  getYonYouPushMessageStatusName,
} from '../../../customSpecialComponents';
import { refreshCacheAction } from '../Assist/action';
import {
  checkNeedUpdateAssist,
  parseUrlParametersForSetState,
} from '../Assist/config';
import { fieldData } from '../Common/data';

@connect(({ yonYouPushMessage, schedulingControl }) => ({
  yonYouPushMessage,
  schedulingControl,
}))
class Detail extends DataTabContainerSupplement {
  componentAuthority = accessWayCollection.yonYouPushMessage.get.permission;

  tabList = [
    {
      key: 'basicInfo',
      hidden: !checkHasAuthority(
        accessWayCollection.yonYouPushMessage.get.permission,
      ),
      tab: '基本信息',
    },
    {
      key: 'operateLog/pageList',
      hidden: !checkHasAuthority(
        accessWayCollection.yonYouPushMessage.pageListOperateLog.permission,
      ),
      tab: '操作日志',
    },
  ];

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '',
      loadApiPath: 'yonYouPushMessage/get',
      backPath: `/data/yonYouPushMessage/pageList/key`,
      yonYouPushMessageId: null,
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

  checkNeedUpdate = (preProperties, preState, snapshot) => {
    return checkNeedUpdateAssist(this.state, preProperties, preState, snapshot);
  };

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { yonYouPushMessageId } = this.state;

    d.yonYouPushMessageId = yonYouPushMessageId;

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
    this.setState({
      pageTitle: getValueByKey({
        data: metaData,
        key: fieldData.title.name,
      }),
    });
  };

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'refreshCache': {
        this.refreshCache(handleData);
        break;
      }

      default: {
        break;
      }
    }
  };

  refreshCache = (r) => {
    refreshCacheAction({
      target: this,
      handleData: r,
    });
  };

  establishPageHeaderTitlePrefix = () => {
    return '消息';
  };

  establishExtraActionEllipsisConfig = () => {
    const { metaData } = this.state;

    if ((metaData || null) == null) {
      return null;
    }

    const that = this;

    return {
      disabled: this.checkInProgress(),
      handleMenuClick: ({ key, handleData }) => {
        switch (key) {
          case 'refreshCache': {
            that.refreshCache(handleData);
            break;
          }

          default: {
            break;
          }
        }
      },
      handleData: metaData,
      items: [
        {
          key: 'refreshCache',
          icon: iconBuilder.reload(),
          text: '刷新缓存',
          hidden: !checkHasAuthority(
            accessWayCollection.yonYouPushMessage.refreshCache.permission,
          ),
          confirm: true,
          title: '即将刷新缓存，确定吗？',
        },
      ],
    };
  };

  establishPageHeaderExtraContentConfig = () => {
    const { metaData } = this.state;

    return {
      textLabel: '当前状态',
      text: getYonYouPushMessageStatusName({
        value: getValueByKey({
          data: metaData,
          key: fieldData.status.name,
          convert: convertCollection.number,
        }),
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

    return [
      {
        label: fieldData.yonYouPushMessageId.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.yonYouPushMessageId.name,
        }),
        canCopy: true,
      },
      {
        label: fieldData.serialNumber.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.serialNumber.name,
        }),
      },
      {
        label: fieldData.title.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.title.name,
        }),
      },
      {
        label: fieldData.personnelCode.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.personnelCode.name,
        }),
      },
      {
        label: fieldData.businessMode.label,
        value: getBusinessModeName({
          value: getValueByKey({
            data: metaData,
            key: fieldData.businessMode.name,
            convert: convertCollection.number,
          }),
        }),
      },
    ];
  };
}

export default Detail;
