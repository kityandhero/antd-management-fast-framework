import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  getValueByKey,
  showSimpleErrorMessage,
  whetherNumber,
} from 'easy-soft-utility';

import { getDerivedStateFromPropertiesForUrlParameters } from 'antd-management-fast-common';
import {
  iconBuilder,
  iconModeCollection,
} from 'antd-management-fast-component';

import { accessWayCollection, colorCollection } from '../../../customConfig';
import {
  DataTabContainerSupplement,
  getSectionStatusName,
} from '../../../customSpecialComponents';
import {
  refreshCacheAction,
  setOfflineAction,
  setOnlineAction,
  toggleRecommendAction,
  toggleTopAction,
  toggleVisibleAction,
} from '../Assist/action';
import {
  checkNeedUpdateAssist,
  parseUrlParametersForSetState,
} from '../Assist/config';
import { ChangeBusinessModeModal } from '../ChangeBusinessModeModal';
import { ChangeRenderTypeModal } from '../ChangeRenderTypeModal';
import { fieldData, statusCollection } from '../Common/data';

@connect(({ section, schedulingControl }) => ({
  section,
  schedulingControl,
}))
class Edit extends DataTabContainerSupplement {
  tabList = [
    {
      key: 'basicInfo',
      tab: '基本信息',
    },
    {
      key: 'sectionApplicationConfig/pageList',
      tab: '应用页面配置',
    },
    {
      key: 'contentInfo',
      hidden: !checkHasAuthority(accessWayCollection.section.get.permission),
      tab: '图文H5信息',
    },
    {
      key: 'mediaInfo',
      hidden: !checkHasAuthority(
        accessWayCollection.section.getMediaItem.permission,
      ),
      tab: '媒体信息',
    },
    {
      key: 'scoreInfo',
      hidden: !checkHasAuthority(
        accessWayCollection.section.setReadSectionObtainScore.permission,
      ),
      tab: '积分设置',
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
      loadApiPath: 'section/get',
      backPath: `/news/section/pageList/key`,
      sectionId: null,
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

  // eslint-disable-next-line no-unused-vars
  checkNeedUpdate = (preProperties, preState, snapshot) => {
    return checkNeedUpdateAssist(this.state, preProperties, preState, snapshot);
  };

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { sectionId } = this.state;

    d[fieldData.sectionId.name] = sectionId;

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
        key: fieldData.name.name,
      }),
    });
  };

  toggleRecommend = (record) => {
    toggleRecommendAction({
      target: this,
      handleData: record,
      successCallback: ({ target, remoteData }) => {
        const { metaData } = target.state;

        metaData[fieldData.whetherRecommend.name] = getValueByKey({
          data: remoteData,
          key: fieldData.whetherRecommend.name,
        });

        target.setState({ metaData });
      },
    });
  };

  toggleTop = (record) => {
    toggleTopAction({
      target: this,
      handleData: record,
      successCallback: ({ target, remoteData }) => {
        const { metaData } = target.state;

        metaData[fieldData.whetherTop.name] = getValueByKey({
          data: remoteData,
          key: fieldData.whetherTop.name,
        });

        target.setState({ metaData });
      },
    });
  };

  toggleVisible = (record) => {
    toggleVisibleAction({
      target: this,
      handleData: record,
      successCallback: ({ target, remoteData }) => {
        const { metaData } = target.state;

        metaData[fieldData.whetherVisible.name] = getValueByKey({
          data: remoteData,
          key: fieldData.whetherVisible.name,
        });

        target.setState({ metaData });
      },
    });
  };

  setOnline = (record) => {
    setOnlineAction({
      target: this,
      handleData: record,
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

  setOffline = (record) => {
    setOfflineAction({
      target: this,
      handleData: record,
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

  refreshCache = (record) => {
    refreshCacheAction({
      target: this,
      handleData: record,
    });
  };

  showChangeRenderTypeModal = (item) => {
    this.setState({ currentRecord: item }, () => {
      ChangeRenderTypeModal.open();
    });
  };

  afterChangeRenderTypeModalOk = () => {
    this.refreshDataWithReloadAnimalPrompt({});
  };

  showChangeBusinessModeModal = (item) => {
    this.setState({ currentRecord: item }, () => {
      ChangeBusinessModeModal.open();
    });
  };

  afterChangeBusinessModeModalOk = () => {
    this.refreshDataWithReloadAnimalPrompt({});
  };

  establishExtraActionGroupConfig = () => {
    const { metaData, dataLoading, processing } = this.state;

    if (metaData == null) {
      return null;
    }

    const whetherRecommend = getValueByKey({
      data: metaData,
      key: fieldData.whetherRecommend.name,
      convert: convertCollection.number,
    });

    const whetherTop = getValueByKey({
      data: metaData,
      key: fieldData.whetherTop.name,
      convert: convertCollection.number,
    });

    const whetherVisible = getValueByKey({
      data: metaData,
      key: fieldData.whetherVisible.name,
      convert: convertCollection.number,
    });

    const status = getValueByKey({
      data: metaData,
      key: fieldData.status.name,
      convert: convertCollection.number,
    });

    const that = this;

    return {
      buttons: [
        {
          key: 'changeRenderType',
          text: '渲染模式',
          icon: iconBuilder.instagram(),
          handleButtonClick: ({ handleData }) => {
            that.showChangeRenderTypeModal(handleData);
          },
          hidden: !checkHasAuthority(
            accessWayCollection.section.updateRenderType.permission,
          ),
          disabled: this.checkInProgress(),
          handleData: metaData,
        },
        {
          key: 'toggleRecommend',
          text: whetherRecommend ? '取消推荐' : '设为推荐',
          icon: whetherRecommend
            ? iconBuilder.closeCircle(
                {
                  twoToneColor: colorCollection.noColor,
                },
                iconModeCollection.twoTone,
              )
            : iconBuilder.checkCircle(
                {
                  twoToneColor: colorCollection.yesColor,
                },
                iconModeCollection.twoTone,
              ),
          handleButtonClick: ({ handleData }) => {
            that.toggleRecommend(handleData);
          },
          hidden: !checkHasAuthority(
            accessWayCollection.section.toggleRecommend.permission,
          ),
          disabled: this.checkInProgress(),
          confirm: {
            title: `即将${whetherRecommend ? '取消推荐' : '设为推荐'}，确定吗？`,
          },
          handleData: metaData,
        },
        {
          key: 'toggleTop',
          text: whetherTop ? '取消置顶' : '设为置顶',
          icon: whetherTop
            ? iconBuilder.closeCircle(
                {
                  twoToneColor: colorCollection.noColor,
                },
                iconModeCollection.twoTone,
              )
            : iconBuilder.checkCircle(
                {
                  twoToneColor: colorCollection.yesColor,
                },
                iconModeCollection.twoTone,
              ),
          handleButtonClick: ({ handleData }) => {
            that.toggleTop(handleData);
          },
          hidden: !checkHasAuthority(
            accessWayCollection.section.toggleTop.permission,
          ),
          disabled: this.checkInProgress(),
          confirm: {
            title: `即将${whetherTop ? '取消置顶' : '设为置顶'}，确定吗？`,
          },
          handleData: metaData,
        },
        {
          key: 'toggleVisible',
          text: whetherVisible ? '设为隐藏' : '设为显示',
          icon: whetherVisible
            ? iconBuilder.closeCircle(
                {
                  twoToneColor: colorCollection.noColor,
                },
                iconModeCollection.twoTone,
              )
            : iconBuilder.checkCircle(
                {
                  twoToneColor: colorCollection.yesColor,
                },
                iconModeCollection.twoTone,
              ),
          handleButtonClick: ({ handleData }) => {
            that.toggleVisible(handleData);
          },
          hidden: !checkHasAuthority(
            accessWayCollection.section.toggleVisible.permission,
          ),
          disabled: this.checkInProgress(),
          confirm: {
            title: `即将${whetherVisible ? '设为隐藏' : '设为显示'}，确定吗？`,
          },
          handleData: metaData,
        },
        {
          key: 'setOnline',
          text: '设为上线',
          icon: iconBuilder.upload(),
          handleButtonClick: ({ handleData }) => {
            that.setOnline(handleData);
          },
          hidden: !checkHasAuthority(
            accessWayCollection.section.setOnline.permission,
          ),
          disabled:
            dataLoading || processing || status === statusCollection.online,
          confirm: {
            title: '设置为上线，确定吗？',
          },
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
            accessWayCollection.section.setOffline.permission,
          ),
          disabled:
            dataLoading || processing || status === statusCollection.offline,
          confirm: {
            title: '设置为下线，确定吗？',
          },
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
          case 'updateBusinessMode': {
            that.showChangeBusinessModeModal(handleData);
            break;
          }

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
          key: 'updateBusinessMode',
          icon: iconBuilder.edit(),
          text: '设置适用业务',
          hidden: !checkHasAuthority(
            accessWayCollection.section.updateBusinessMode.permission,
          ),
        },
        {
          key: 'refreshCache',
          icon: iconBuilder.reload(),
          text: '刷新缓存',
          hidden: !checkHasAuthority(
            accessWayCollection.section.refreshCache.permission,
          ),
          confirm: {
            title: '即将刷新缓存，确定吗？',
          },
        },
      ],
    };
  };

  establishPageHeaderAvatarConfig = () => {
    const { metaData } = this.state;

    if (metaData != null) {
      const imageUrl = getValueByKey({
        data: metaData,
        key: fieldData.image.name,
      });

      if (!checkStringIsNullOrWhiteSpace(imageUrl)) {
        return { src: imageUrl };
      }
    }

    return null;
  };

  establishPageHeaderTitlePrefix = () => {
    return '品类名称';
  };

  establishPageHeaderTagCollectionConfig = () => {
    const { metaData } = this.state;

    if ((metaData || null) == null) {
      return null;
    }

    const whetherRecommend = getValueByKey({
      data: metaData,
      key: fieldData.whetherRecommend.name,
      convert: convertCollection.number,
    });

    const whetherTop = getValueByKey({
      data: metaData,
      key: fieldData.whetherTop.name,
      convert: convertCollection.number,
    });

    const whetherVisible = getValueByKey({
      data: metaData,
      key: fieldData.whetherVisible.name,
      convert: convertCollection.number,
    });

    const status = getValueByKey({
      data: metaData,
      key: fieldData.status.name,
      convert: convertCollection.number,
    });

    return [
      {
        color: 'blue',
        text: '推荐',
        hidden: whetherRecommend !== whetherNumber.yes,
      },
      {
        color: 'yellow',
        text: '置顶',
        hidden: whetherTop !== whetherNumber.yes,
      },
      {
        color: 'pink',
        text: '显示',
        hidden: whetherVisible !== whetherNumber.yes,
      },
      {
        color: 'green',
        text: '上线',
        hidden: status !== statusCollection.online,
      },
      {
        color: 'red',
        text: '下线',
        hidden: status !== statusCollection.offline,
      },
    ];
  };

  establishPageHeaderExtraContentConfig = () => {
    const { metaData } = this.state;

    return {
      textLabel: fieldData.status.label,
      text: getSectionStatusName({
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
        label: fieldData.sectionId.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.sectionId.name,
        }),
        canCopy: true,
      },
      {
        label: fieldData.sort.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.sort.name,
          defaultValue: '0',
        }),
      },
      {
        label: fieldData.renderTypeNote.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.renderTypeNote.name,
        }),
      },
      {
        label: fieldData.parentName.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.parentName.name,
          defaultValue: '无',
        }),
      },
      {
        label: fieldData.businessModeNote.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.businessModeNote.name,
          defaultValue: '无',
        }),
      },
      {
        label: fieldData.obtainScoreByReadSwitch.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.obtainScoreByReadSwitch.name,
          convert: convertCollection.number,
          formatBuilder: (v) => {
            return v === whetherNumber.yes ? '开启' : '关闭';
          },
        }),
      },
      {
        label: fieldData.obtainScoreWhenRead.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.obtainScoreWhenRead.name,
          defaultValue: '0',
        }),
      },
      {
        label: fieldData.obtainScoreWhenReadSection.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.obtainScoreWhenReadSection.name,
          defaultValue: '0',
        }),
      },
      {
        label: fieldData.obtainFromReadDailyLimit.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.obtainFromReadDailyLimit.name,
          defaultValue: '0',
        }),
      },
    ];
  };

  renderPresetOther = () => {
    const { currentRecord } = this.state;

    return (
      <>
        <ChangeRenderTypeModal
          externalData={currentRecord}
          afterOK={this.afterChangeRenderTypeModalOk}
        />

        <ChangeBusinessModeModal
          externalData={currentRecord}
          afterOK={this.afterChangeBusinessModeModalOk}
        />
      </>
    );
  };
}

export default Edit;
