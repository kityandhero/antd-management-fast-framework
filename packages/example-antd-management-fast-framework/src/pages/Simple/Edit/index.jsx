import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  getValueByKey,
  showSimpleInfoMessage,
  showSimpleSuccessNotification,
} from 'easy-soft-utility';

import {
  extraBuildType,
  getDerivedStateFromPropertiesForUrlParameters,
  tabBarCollection,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import { accessWayCollection } from '../../../customConfig';
import {
  DataTabContainerSupplement,
  getSimpleRenderTypeName,
  getSimpleStatusName,
} from '../../../customSpecialComponents';
import {
  refreshCacheAction,
  setOfflineAction,
  setOnlineAction,
} from '../Assist/action';
import {
  checkNeedUpdateAssist,
  parseUrlParametersForSetState as parseUrlParametersForSetState,
} from '../Assist/config';
import { fieldData, statusCollection } from '../Common/data';

import BasicInfo from './BasicInfo';
import ContentInfo from './ContentInfo';
import MediaInfo from './MediaInfo';

@connect(({ simple, schedulingControl }) => ({
  simple,
  schedulingControl,
}))
class Edit extends DataTabContainerSupplement {
  componentAuthority = accessWayCollection.simple.get.permission;

  tabList = [
    {
      key: 'basicInfo',
      show: checkHasAuthority(accessWayCollection.simple.get.permission),
      tab: '基本信息',
      label: '基本信息',
      children: <BasicInfo />,
    },
    {
      key: 'contentInfo',
      show: checkHasAuthority(accessWayCollection.simple.get.permission),
      tab: '图文H5信息',
      label: '图文H5信息',
      children: <ContentInfo />,
    },
    {
      key: 'mediaInfo',
      show: checkHasAuthority(
        accessWayCollection.simple.updateMediaData.permission,
      ),
      tab: '媒体信息',
      label: '媒体信息',
      children: <MediaInfo />,
    },
  ];

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,

      loadApiPath: 'simple/get',
      backPath: `/news/simple/pageList/key`,
      simpleId: null,
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
    const { simpleId } = this.state;

    d.simpleId = simpleId;

    return d;
  };

  doOtherAfterLoadSuccess = ({
    metaData,
    // eslint-disable-next-line no-unused-vars
    metaListData,
    // eslint-disable-next-line no-unused-vars
    metaExtra,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData,
  }) => {
    this.setState({
      pageTitle: getValueByKey({
        data: metaData,
        key: fieldData.title.name,
      }),
    });
  };

  analysisInitialTabActiveKey = (o) => {
    const { tab } = {
      tab: '',
      ...o,
    };

    return tab || '';
  };

  setOnline = (r) => {
    setOnlineAction({
      target: this,
      handleData: r,
      successCallback: ({ target, remoteData }) => {
        const { metaData } = target.state;

        metaData[fieldData.status.name] = getValueByKey({
          data: remoteData,
          key: fieldData.status.name,
        });

        target.setState({ metaData });
      },
    });
  };

  setOffline = (r) => {
    setOfflineAction({
      target: this,
      handleData: r,
      successCallback: ({ target, remoteData }) => {
        const { metaData } = target.state;

        metaData[fieldData.status.name] = getValueByKey({
          data: remoteData,
          key: fieldData.status.name,
        });

        target.setState({ metaData });
      },
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

  establishPageHeaderTitlePrefix = () => {
    return '文章';
  };

  establishPageHeaderAvatarConfig = () => {
    const { metaData } = this.state;

    const image = getValueByKey({
      data: metaData,
      key: fieldData.image.name,
    });

    if (!checkStringIsNullOrWhiteSpace(image || '')) {
      return { src: image };
    }

    return null;
  };

  establishPageHeaderTagCollectionConfig = () => {
    const { metaData } = this.state;

    const list = [];

    if ((metaData || null) == null) {
      return list;
    }

    const status = getValueByKey({
      data: metaData,
      key: fieldData.status.name,
      convert: convertCollection.number,
    });

    const statusNote = getSimpleStatusName({
      metaData: this.getMetaData(),
      value: status,
    });

    return [
      {
        color: 'red',
        text: statusNote,
        hidden: status !== statusCollection.offline,
      },
      {
        color: 'green',
        text: statusNote,
        hidden: status !== statusCollection.online,
      },
    ];
  };

  establishExtraActionConfig = () => {
    return {
      list: [
        {
          buildType: extraBuildType.iconInfo,
          icon: iconBuilder.infoCircle(),
          text: '一些说明',
        },
        {
          buildType: extraBuildType.button,
          icon: iconBuilder.form(),
          text: '按钮',
          handleClick: () => {},
        },
      ],
    };
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
          type: 'default',
          size: 'default',
          text: '上架',
          icon: iconBuilder.upCircle(),
          handleButtonClick: ({ handleData }) => {
            that.setOnline(handleData);
          },
          hidden: !checkHasAuthority(
            accessWayCollection.simple.setOnline.permission,
          ),
          disabled:
            this.checkInProgress() || status === statusCollection.online,
          confirm: true,
          title: '设置为上架，确定吗？',
          placement: 'bottomRight',
          okText: '确定',
          cancelText: '取消',
          handleData: metaData,
          // processing: dataLoading,
          // iconProcessing: iconBuilder.loading(),
        },
        {
          key: 'setOffline',
          type: 'default',
          size: 'default',
          text: '下架',
          icon: iconBuilder.upCircle(),
          handleButtonClick: ({ handleData }) => {
            that.setOffline(handleData);
          },
          hidden: !checkHasAuthority(
            accessWayCollection.simple.setOffline.permission,
          ),
          disabled:
            this.checkInProgress() || status === statusCollection.offline,
          confirm: true,
          title: '设置为下架，确定吗？',
          placement: 'bottomRight',
          okText: '确定',
          cancelText: '取消',
          handleData: metaData,
          // processing: dataLoading,
          // iconProcessing: iconBuilder.loading(),
        },
      ],
    };
  };

  establishExtraActionEllipsisConfig = () => {
    const { metaData } = this.state;

    if ((metaData || null) == null) {
      return null;
    }

    // const status = getValueByKey({
    //   data: metaData,
    //   key: fieldData.status.name,
    //   convert: convertCollection.number,
    // });

    const that = this;

    return {
      size: 'default',
      placement: 'bottom',
      disabled: false,
      hidden: false,
      handleMenuClick: ({ key, handleData }) => {
        switch (key) {
          case 'click1': {
            showSimpleInfoMessage(`click ${key}`);

            const { title = '' } = handleData;

            if (!checkStringIsNullOrWhiteSpace(title)) {
              showSimpleSuccessNotification(title);
            }

            break;
          }

          case 'click2': {
            showSimpleInfoMessage(`click ${key}`);

            const { title = '' } = handleData;

            if (!checkStringIsNullOrWhiteSpace(title)) {
              showSimpleSuccessNotification(title);
            }

            break;
          }

          case 'click21': {
            showSimpleInfoMessage(`click ${key}`);

            const { title = '' } = handleData;

            if (!checkStringIsNullOrWhiteSpace(title)) {
              showSimpleSuccessNotification(title);
            }

            break;
          }

          case 'click3': {
            showSimpleInfoMessage(`click ${key}`);

            const { title = '' } = handleData;

            if (!checkStringIsNullOrWhiteSpace(title)) {
              showSimpleSuccessNotification(title);
            }

            break;
          }

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
          key: 'click1',
          icon: iconBuilder.form(),
          text: '按钮1',
          hidden: true,
        },
        {
          key: 'click2',
          icon: iconBuilder.form(),
          text: '按钮2',
          hidden: false,
          disabled: true,
        },
        {
          key: 'click21',
          icon: iconBuilder.form(),
          text: '按钮21',
          hidden: false,
        },
        {
          key: 'click3',
          icon: iconBuilder.form(),
          text: '按钮2',
          hidden: false,
          disabled: false,
          confirm: true,
          title: '确认操作，确定吗？',
          placement: 'bottomRight',
          okText: '确定',
          cancelText: '取消',
        },
        {
          key: 'refreshCache',
          withDivider: true,
          uponDivider: true,
          icon: iconBuilder.reload(),
          text: '刷新缓存',
          hidden: !checkHasAuthority(
            accessWayCollection.simple.refreshCache.permission,
          ),
          confirm: true,
          title: '将要刷新缓存，确定吗？',
        },
      ],
    };
  };

  establishTabBarExtraContentRightConfig = () => {
    const { metaData } = this.state;

    return {
      buildType: tabBarCollection.extraBuildType.dropdown,
      icon: iconBuilder.form(),
      size: 'small',
      text: '扩展菜单',
      handleData: metaData,
      hidden: false,
      // eslint-disable-next-line no-unused-vars
      handleButtonClick: ({ handleData }) => {
        showSimpleInfoMessage('已点击');
      },
      // eslint-disable-next-line no-unused-vars
      handleMenuClick: ({ key, handleData }) => {
        switch (key) {
          case 'extraBarAction1': {
            showSimpleInfoMessage(`click ${key}`);

            break;
          }

          case 'extraBarAction2': {
            showSimpleInfoMessage(`click ${key}`);

            break;
          }

          case 'extraBarAction3': {
            showSimpleInfoMessage(`click ${key}`);

            break;
          }
        }
      },
      items: [
        {
          key: 'extraBarAction1',
          icon: iconBuilder.form(),
          text: '按钮1',
          hidden: false,
          confirm: true,
          title: `即将点击按钮，确定吗？`,
        },
        {
          key: 'extraBarAction2',
          icon: iconBuilder.form(),
          text: '按钮2',
          hidden: false,
        },
        {
          key: 'extraBarAction3',
          icon: iconBuilder.form(),
          text: '按钮3',
          hidden: true,
          confirm: true,
          title: `即将点击按钮3，确定吗？`,
        },
      ],
    };
  };

  establishPageHeaderExtraContentConfig = () => {
    const { metaData } = this.state;

    return {
      textLabel: fieldData.status.label,
      text: getSimpleStatusName({
        metaData: this.getMetaData(),
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
        label: fieldData.simpleId.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.simpleId.name,
        }),
        canCopy: true,
      },
      {
        label: fieldData.renderTypeNote.label,
        value: getSimpleRenderTypeName({
          metaData: this.getMetaData(),
          value: getValueByKey({
            data: metaData,
            key: fieldData.renderType.name,
          }),
        }),
      },
    ];
  };
}

export default Edit;
