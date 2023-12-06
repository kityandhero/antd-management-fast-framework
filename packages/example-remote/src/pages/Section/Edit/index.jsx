import React from 'react';

import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  getValueByKey,
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
        accessWayCollection.section.setReadObtainScore.permission,
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

  checkNeedUpdate = (preProperties, preState, snapshot) => {
    return checkNeedUpdateAssist(this.state, preProperties, preState, snapshot);
  };

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { sectionId } = this.state;

    d.sectionId = sectionId;

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
    const name = getValueByKey({
      data: metaData,
      key: fieldData.name.name,
    });

    this.setState({ pageTitle: name });
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

  showChangeRenderTypeModal = (r) => {
    this.setState(
      {
        currentRecord: r,
      },
      () => {
        ChangeRenderTypeModal.open();
      },
    );
  };

  afterChangeRenderTypeModalOk = () => {
    this.refreshDataWithReloadAnimalPrompt({});
  };

  establishExtraActionGroupConfig = () => {
    const { metaData } = this.state;

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
          confirm: true,
          title: `即将${whetherRecommend ? '取消推荐' : '设为推荐'}，确定吗？`,
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
          confirm: true,
          title: `即将${whetherTop ? '取消置顶' : '设为置顶'}，确定吗？`,
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
          confirm: true,
          title: `即将${whetherVisible ? '设为隐藏' : '设为显示'}，确定吗？`,
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
          disabled: status === statusCollection.online,
          confirm: true,
          title: '设置为上线，确定吗？',
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
          disabled: status === statusCollection.offline,
          confirm: true,
          title: '设置为下线，确定吗？',
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
            accessWayCollection.section.refreshCache.permission,
          ),
          confirm: true,
          title: '即将刷新缓存，确定吗？',
        },
      ],
    };
  };

  establishPageHeaderTitlePrefix = () => {
    return '品类名称';
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
        text: '已上架',
        hidden: status !== statusCollection.online,
      },
      {
        color: 'red',
        text: '已下架',
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
        }),
      },
      {
        label: fieldData.renderTypeNote.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.renderTypeNote.name,
        }),
      },
    ];
  };

  renderPresetOther = () => {
    const { currentRecord } = this.state;

    const renderChangeRenderTypeModal = checkHasAuthority(
      accessWayCollection.section.updateRenderType.permission,
    );

    return (
      <>
        {renderChangeRenderTypeModal ? (
          <ChangeRenderTypeModal
            externalData={currentRecord}
            afterOK={this.afterChangeRenderTypeModalOk}
            afterCancel={this.afterChangeRenderTypeModalCancel}
          />
        ) : null}
      </>
    );
  };
}

export default Edit;
