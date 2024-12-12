import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  convertCollection,
  getValueByKey,
  showSimpleErrorMessage,
} from 'easy-soft-utility';

import { getDerivedStateFromPropertiesForUrlParameters } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import { accessWayCollection } from '../../../customConfig';
import {
  DataTabContainerSupplement,
  getChannelName,
  getUserQuestionnaireStatusName,
} from '../../../customSpecialComponents';
import { refreshCacheAction } from '../Assist/action';
import {
  checkNeedUpdateAssist,
  parseUrlParametersForSetState,
} from '../Assist/config';
import { fieldData, statusCollection } from '../Common/data';

@connect(({ userQuestionnaire, schedulingControl }) => ({
  userQuestionnaire,
  schedulingControl,
}))
class Edit extends DataTabContainerSupplement {
  tabList = [
    {
      key: 'basicInfo',
      tab: '基本信息',
    },
    {
      key: 'operateLog/pageList',
      tab: '操作日志',
    },
  ];

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '',
      loadApiPath: 'userQuestionnaire/get',
      backPath: `/userQuestionnaire/pageList/key`,
      userQuestionnaireId: null,
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
    const { userQuestionnaireId } = this.state;

    d[fieldData.userQuestionnaireId.name] = userQuestionnaireId;

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

  refreshCache = (r) => {
    refreshCacheAction({
      target: this,
      handleData: r,
    });
  };

  establishPageHeaderAvatarConfig = () => {
    return { icon: iconBuilder.snippets() };
  };

  establishPageHeaderTitlePrefix = () => {
    return '标题';
  };

  establishExtraActionGroupConfig = () => {
    const { metaData } = this.state;

    if (metaData == null) {
      return null;
    }

    const status = getValueByKey({
      data: metaData,
      key: fieldData.status.name,
      convert: convertCollection.number,
    });

    const that = this;

    return {
      buttons: [
        {
          key: 'setOnline',
          text: '设为上线',
          icon: iconBuilder.checkCircle(),
          handleButtonClick: ({ handleData }) => {
            that.setOnline(handleData);
          },
          hidden: !checkHasAuthority(
            accessWayCollection.userQuestionnaire.setOnline.permission,
          ),
          disabled: status === statusCollection.online,
          confirm: true,
          title: '即将设为上线，确定启用吗？',
          handleData: metaData,
        },
        {
          key: 'setOffline',
          text: '设为下线',
          icon: iconBuilder.download(),
          handleButtonClick: ({ handleData }) => {
            that.setOffline(handleData);
          },
          hidden: !checkHasAuthority(
            accessWayCollection.userQuestionnaire.setOffline.permission,
          ),
          disabled: status === statusCollection.offline,
          confirm: true,
          title: '即将设为下线，确定启用吗？',
          handleData: metaData,
        },
      ],
    };
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
            showSimpleErrorMessage('can not find matched key');
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
          confirm: true,
          title: '即将刷新缓存，确定吗？',
        },
      ],
    };
  };

  establishPageHeaderExtraContentConfig = () => {
    const { metaData } = this.state;

    return {
      textLabel: fieldData.status.label,
      text: getUserQuestionnaireStatusName({
        value: getValueByKey({
          data: metaData,
          key: fieldData.status.name,
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
        label: fieldData.userQuestionnaireId.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.userQuestionnaireId.name,
        }),
        canCopy: true,
      },
      {
        label: fieldData.channel.label,
        value: getChannelName({
          value: getValueByKey({
            data: metaData,
            key: fieldData.channel.name,
            convert: convertCollection.string,
          }),
        }),
      },
    ];
  };
}

export default Edit;
