import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  convertCollection,
  getValueByKey,
  showSimpleErrorMessage,
  whetherNumber,
} from 'easy-soft-utility';

import {
  dropdownExpandItemType,
  extraBuildType,
  getDerivedStateFromPropertiesForUrlParameters,
} from 'antd-management-fast-common';
import {
  FunctionSupplement,
  iconBuilder,
  iconModeCollection,
} from 'antd-management-fast-component';

import { accessWayCollection, colorCollection } from '../../../customConfig';
import {
  DataTabContainerSupplement,
  getChannelName,
  getQuestionnaireStatusName,
} from '../../../customSpecialComponents';
import {
  refreshCacheAction,
  setOfflineAction,
  setOnlineAction,
  toggleGroupDisplayAction,
  toggleRandomOrderAction,
  toggleRecommendAction,
  toggleTopAction,
  toggleVisibleAction,
} from '../Assist/action';
import {
  checkNeedUpdateAssist,
  parseUrlParametersForSetState,
} from '../Assist/config';
import { ChangeBusinessModeModal } from '../ChangeBusinessModeModal';
import {
  fieldData,
  questionCreateModeCollection,
  statusCollection,
} from '../Common/data';

const {
  Whether: { getWhetherName },
} = FunctionSupplement;

@connect(({ questionnaire, schedulingControl }) => ({
  questionnaire,
  schedulingControl,
}))
class Edit extends DataTabContainerSupplement {
  tabList = [
    {
      key: 'basicInfo',
      tab: '基本信息',
    },
    {
      key: 'question/pageList',
      tab: '问题配置',
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
      loadApiPath: 'questionnaire/get',
      backPath: `/questionnaire/pageList/key`,
      questionnaireId: null,
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
    const { questionnaireId } = this.state;

    d[fieldData.questionnaireId.name] = questionnaireId;

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

  toggleRandomOrder = (record) => {
    toggleRandomOrderAction({
      target: this,
      handleData: record,
      successCallback: ({ target, remoteData }) => {
        const { metaData } = target.state;

        metaData[fieldData.whetherRandomOrder.name] = getValueByKey({
          data: remoteData,
          key: fieldData.whetherRandomOrder.name,
        });

        target.setState({ metaData });
      },
    });
  };

  toggleGroupDisplay = (record) => {
    toggleGroupDisplayAction({
      target: this,
      handleData: record,
      successCallback: ({ target, remoteData }) => {
        const { metaData } = target.state;

        metaData[fieldData.whetherGroupDisplay.name] = getValueByKey({
          data: remoteData,
          key: fieldData.whetherGroupDisplay.name,
        });

        target.setState({ metaData });
      },
    });
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
    });
  };

  showChangeBusinessModeModal = () => {
    ChangeBusinessModeModal.open();
  };

  afterChangeBusinessModeModalOk = () => {
    this.refreshDataWithReloadAnimalPrompt({});
  };

  establishPageHeaderAvatarConfig = () => {
    return { icon: iconBuilder.snippets() };
  };

  establishPageHeaderTitlePrefix = () => {
    return '标题';
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

  establishExtraActionConfig = () => {
    const { metaData } = this.state;

    if (metaData == null) {
      return null;
    }

    const whetherRandomOrder = getValueByKey({
      data: metaData,
      key: fieldData.whetherRandomOrder.name,
      convert: convertCollection.number,
    });

    const whetherGroupDisplay = getValueByKey({
      data: metaData,
      key: fieldData.whetherGroupDisplay.name,
      convert: convertCollection.number,
    });

    const that = this;

    return {
      list: [
        {
          buildType: extraBuildType.generalExtraButton,
          type: 'default',
          icon: whetherRandomOrder
            ? iconBuilder.retweet()
            : iconBuilder.sortAscending(),
          text: whetherRandomOrder ? '取消随机排序' : '设为随机排序',
          handleData: metaData,
          hidden: !checkHasAuthority(
            accessWayCollection.questionnaire.toggleRandomOrder.permission,
          ),
          handleClick: ({ handleData }) => {
            that.toggleRandomOrder(handleData);
          },
          confirm: true,
          title: `即将${whetherRandomOrder ? '取消随机排序设置' : '设为随机排序'}，确定吗？`,
        },
        {
          buildType: extraBuildType.generalExtraButton,
          type: 'default',
          icon: whetherGroupDisplay
            ? iconBuilder.ungroup()
            : iconBuilder.group(),
          text: whetherGroupDisplay ? '取消分组显示' : '设为分组显示',
          handleData: metaData,
          hidden: !checkHasAuthority(
            accessWayCollection.questionnaire.toggleGroupDisplay.permission,
          ),
          handleClick: ({ handleData }) => {
            that.toggleGroupDisplay(handleData);
          },
          confirm: true,
          title: `即将${whetherGroupDisplay ? '取消分组显示设置' : '设为分组显示'}，确定吗？`,
        },
        {
          buildType: extraBuildType.divider,
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
          text: '设为上线',
          icon: iconBuilder.checkCircle(),
          handleButtonClick: ({ handleData }) => {
            that.setOnline(handleData);
          },
          hidden: !checkHasAuthority(
            accessWayCollection.questionnaire.setOnline.permission,
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
            accessWayCollection.questionnaire.setOffline.permission,
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

    const that = this;

    return {
      disabled: this.checkInProgress(),
      handleMenuClick: ({ key, handleData }) => {
        switch (key) {
          case 'toggleRecommend': {
            that.toggleRecommend(handleData);
            break;
          }

          case 'toggleTop': {
            that.toggleTop(handleData);
            break;
          }

          case 'toggleVisible': {
            that.toggleVisible(handleData);
            break;
          }

          case 'updateBusinessMode': {
            that.showChangeBusinessModeModal();
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
          confirm: true,
          title: `即将${whetherRecommend ? '取消推荐' : '设为推荐'}，确定吗？`,
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
          confirm: true,
          title: `即将${whetherTop ? '取消置顶' : '设为置顶'}，确定吗？`,
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
          confirm: true,
          title: `即将${whetherVisible ? '设为隐藏' : '设为显示'}，确定吗？`,
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'updateBusinessMode',
          text: '设置适用业务',
          icon: iconBuilder.edit(),
          hidden: !checkHasAuthority(
            accessWayCollection.questionnaire.updateBusinessMode.permission,
          ),
        },
        {
          type: dropdownExpandItemType.divider,
        },
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
      text: getQuestionnaireStatusName({
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

    if ((metaData || null) == null) {
      return null;
    }

    const questionCreateMode = getValueByKey({
      data: metaData,
      key: fieldData.questionCreateMode.name,
      convert: convertCollection.number,
    });

    return [
      {
        label: fieldData.questionnaireId.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.questionnaireId.name,
        }),
        canCopy: true,
      },
      {
        label: fieldData.questionCreateModeNote.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.questionCreateModeNote.name,
          convert: convertCollection.string,
        }),
      },
      {
        label: fieldData.whetherGroupDisplay.label,
        hidden: questionCreateMode != questionCreateModeCollection.global,
        value: getValueByKey({
          data: metaData,
          key: fieldData.whetherGroupDisplay.name,
          convert: convertCollection.string,
          formatBuilder: (v) => {
            return getWhetherName({
              value: v,
            });
          },
        }),
      },
      {
        label: fieldData.whetherRandomOrder.label,
        hidden: questionCreateMode != questionCreateModeCollection.global,
        value: getValueByKey({
          data: metaData,
          key: fieldData.whetherRandomOrder.name,
          convert: convertCollection.string,
          formatBuilder: (v) => {
            return getWhetherName({
              value: v,
            });
          },
        }),
      },
      {
        label: fieldData.businessModeNote.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.businessModeNote.name,
          convert: convertCollection.string,
        }),
      },
      {
        label: fieldData.whetherRecommend.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.whetherRecommend.name,
          convert: convertCollection.string,
          formatBuilder: (v) => {
            return getWhetherName({
              value: v,
            });
          },
        }),
      },
      {
        label: fieldData.whetherTop.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.whetherTop.name,
          convert: convertCollection.string,
          formatBuilder: (v) => {
            return getWhetherName({
              value: v,
            });
          },
        }),
      },
      {
        label: fieldData.whetherVisible.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.whetherVisible.name,
          convert: convertCollection.string,
          formatBuilder: (v) => {
            return getWhetherName({
              value: v,
            });
          },
        }),
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

  renderPresetOther = () => {
    const { metaData } = this.state;

    return (
      <>
        <ChangeBusinessModeModal
          externalData={metaData}
          afterOK={this.afterChangeBusinessModeModalOk}
        />
      </>
    );
  };
}

export default Edit;
