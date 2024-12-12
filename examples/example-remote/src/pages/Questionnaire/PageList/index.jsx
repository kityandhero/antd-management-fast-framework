import React from 'react';

import { connect } from 'easy-soft-dva';
import {
  buildRandomHexColor,
  checkHasAuthority,
  convertCollection,
  getValueByKey,
  handleItem,
  showSimpleErrorMessage,
  toNumber,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  dropdownExpandItemType,
  listViewConfig,
  searchCardConfig,
  unlimitedWithStringFlag,
} from 'antd-management-fast-common';
import {
  FunctionSupplement,
  iconBuilder,
  iconModeCollection,
} from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection, colorCollection } from '../../../customConfig';
import {
  getBusinessModeName,
  getQuestionnaireQuestionCreateModeName,
  getQuestionnaireStatusName,
  renderSearchQuestionnaireQuestionCreateModeSelect,
  renderSearchQuestionnaireStatusSelect,
} from '../../../customSpecialComponents';
import { AddBasicInfoDrawer } from '../AddBasicInfoDrawer';
import {
  refreshCacheAction,
  removeAction,
  setOfflineAction,
  setOnlineAction,
  toggleGroupDisplayAction,
  toggleRandomOrderAction,
  toggleRecommendAction,
  toggleTopAction,
  toggleVisibleAction,
} from '../Assist/action';
import { getStatusBadge } from '../Assist/tools';
import { ChangeBusinessModeModal } from '../ChangeBusinessModeModal';
import { ChangeSortModal } from '../ChangeSortModal';
import {
  fieldData,
  questionCreateModeCollection,
  statusCollection,
} from '../Common/data';

const { MultiPage } = DataMultiPageView;
const {
  Whether: { getWhetherName },
} = FunctionSupplement;

@connect(({ questionnaire, schedulingControl }) => ({
  questionnaire,
  schedulingControl,
}))
class PageList extends MultiPage {
  componentAuthority = accessWayCollection.questionnaire.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '问卷列表',
      tableScrollX: 1820,
      paramsKey: accessWayCollection.questionnaire.pageList.paramsKey,
      loadApiPath: 'questionnaire/pageList',
      currentRecord: null,
    };
  }

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'updateBusinessMode': {
        this.showChangeBusinessModeModal(handleData);
        break;
      }

      case 'updateSort': {
        this.showChangeSortModal(handleData);
        break;
      }

      case 'toggleGroupDisplay': {
        this.toggleGroupDisplay(handleData);
        break;
      }

      case 'toggleRandomOrder': {
        this.toggleRandomOrder(handleData);
        break;
      }

      case 'toggleRecommend': {
        this.toggleRecommend(handleData);
        break;
      }

      case 'toggleTop': {
        this.toggleTop(handleData);
        break;
      }

      case 'toggleVisible': {
        this.toggleVisible(handleData);
        break;
      }

      case 'setOnline': {
        this.setOnline(handleData);
        break;
      }

      case 'setOffline': {
        this.setOffline(handleData);
        break;
      }

      case 'remove': {
        this.remove(handleData);
        break;
      }

      case 'refreshCache': {
        this.refreshCache(handleData);
        break;
      }

      default: {
        showSimpleErrorMessage('can not find matched key');
        break;
      }
    }
  };

  handleItemStatus = ({ target, handleData, remoteData }) => {
    const id = getValueByKey({
      data: handleData,
      key: fieldData.questionnaireId.name,
      defaultValue: '',
    });

    handleItem({
      target,
      value: id,
      compareValueHandler: (o) => {
        const v = getValueByKey({
          data: o,
          key: fieldData.questionnaireId.name,
          defaultValue: '',
        });

        return v;
      },
      handler: (d) => {
        const o = d;

        o[fieldData.status.name] = getValueByKey({
          data: remoteData,
          key: fieldData.status.name,
        });

        return d;
      },
    });
  };

  toggleGroupDisplay = (record) => {
    toggleGroupDisplayAction({
      target: this,
      handleData: record,
      successCallback: ({ target, remoteData }) => {
        const id = getValueByKey({
          data: remoteData,
          key: fieldData.questionnaireId.name,
        });

        handleItem({
          target,
          value: id,
          compareValueHandler: (o) => {
            const v = getValueByKey({
              data: o,
              key: fieldData.questionnaireId.name,
            });

            return v;
          },
          handler: (d) => {
            const o = d;

            o[fieldData.whetherRecommend.name] = getValueByKey({
              data: remoteData,
              key: fieldData.whetherGroupDisplay.name,
            });

            return d;
          },
        });
      },
    });
  };

  toggleRandomOrder = (record) => {
    toggleRandomOrderAction({
      target: this,
      handleData: record,
      successCallback: ({ target, remoteData }) => {
        const id = getValueByKey({
          data: remoteData,
          key: fieldData.questionnaireId.name,
        });

        handleItem({
          target,
          value: id,
          compareValueHandler: (o) => {
            const v = getValueByKey({
              data: o,
              key: fieldData.questionnaireId.name,
            });

            return v;
          },
          handler: (d) => {
            const o = d;

            o[fieldData.whetherRecommend.name] = getValueByKey({
              data: remoteData,
              key: fieldData.whetherRandomOrder.name,
            });

            return d;
          },
        });
      },
    });
  };

  toggleRecommend = (record) => {
    toggleRecommendAction({
      target: this,
      handleData: record,
      successCallback: ({ target, remoteData }) => {
        const id = getValueByKey({
          data: remoteData,
          key: fieldData.questionnaireId.name,
        });

        handleItem({
          target,
          value: id,
          compareValueHandler: (o) => {
            const v = getValueByKey({
              data: o,
              key: fieldData.questionnaireId.name,
            });

            return v;
          },
          handler: (d) => {
            const o = d;

            o[fieldData.whetherRecommend.name] = getValueByKey({
              data: remoteData,
              key: fieldData.whetherRecommend.name,
            });

            return d;
          },
        });
      },
    });
  };

  toggleTop = (record) => {
    toggleTopAction({
      target: this,
      handleData: record,
      successCallback: ({ target, remoteData }) => {
        const id = getValueByKey({
          data: remoteData,
          key: fieldData.questionnaireId.name,
        });

        handleItem({
          target,
          value: id,
          compareValueHandler: (o) => {
            const v = getValueByKey({
              data: o,
              key: fieldData.questionnaireId.name,
            });

            return v;
          },
          handler: (d) => {
            const o = d;

            o[fieldData.whetherTop.name] = getValueByKey({
              data: remoteData,
              key: fieldData.whetherTop.name,
            });

            return d;
          },
        });
      },
    });
  };

  toggleVisible = (record) => {
    toggleVisibleAction({
      target: this,
      handleData: record,
      successCallback: ({ target, remoteData }) => {
        const id = getValueByKey({
          data: remoteData,
          key: fieldData.questionnaireId.name,
        });

        handleItem({
          target,
          value: id,
          compareValueHandler: (o) => {
            const v = getValueByKey({
              data: o,
              key: fieldData.questionnaireId.name,
            });

            return v;
          },
          handler: (d) => {
            const o = d;

            o[fieldData.whetherVisible.name] = getValueByKey({
              data: remoteData,
              key: fieldData.whetherVisible.name,
            });

            return d;
          },
        });
      },
    });
  };

  setOnline = (record) => {
    setOnlineAction({
      target: this,
      handleData: record,
      successCallback: ({ target, handleData, remoteData }) => {
        target.handleItemStatus({ target, handleData, remoteData });
      },
    });
  };

  setOffline = (record) => {
    setOfflineAction({
      target: this,
      handleData: record,
      successCallback: ({ target, handleData, remoteData }) => {
        target.handleItemStatus({ target, handleData, remoteData });
      },
    });
  };

  remove = (record) => {
    removeAction({
      target: this,
      handleData: record,
      successCallback: ({ target }) => {
        target.refreshDataWithReloadAnimalPrompt({});
      },
    });
  };

  refreshCache = (record) => {
    refreshCacheAction({
      target: this,
      handleData: record,
    });
  };

  showAddBasicInfoDrawer = () => {
    AddBasicInfoDrawer.open();
  };

  afterAddBasicInfoDrawerOk = ({
    // eslint-disable-next-line no-unused-vars
    singleData,
    // eslint-disable-next-line no-unused-vars
    listData,
    // eslint-disable-next-line no-unused-vars
    extraData,
    // eslint-disable-next-line no-unused-vars
    responseOriginalData,
    // eslint-disable-next-line no-unused-vars
    submitData,
    // eslint-disable-next-line no-unused-vars
    subjoinData,
  }) => {
    this.refreshDataWithReloadAnimalPrompt({});
  };

  showChangeSortModal = (r) => {
    this.setState({ currentRecord: r }, () => {
      ChangeSortModal.open();
    });
  };

  afterChangeSortModalOk = ({
    // eslint-disable-next-line no-unused-vars
    singleData,
    // eslint-disable-next-line no-unused-vars
    listData,
    // eslint-disable-next-line no-unused-vars
    extraData,
    // eslint-disable-next-line no-unused-vars
    responseOriginalData,
    // eslint-disable-next-line no-unused-vars
    submitData,
    // eslint-disable-next-line no-unused-vars
    subjoinData,
  }) => {
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

  goToEdit = (record) => {
    const questionnaireId = getValueByKey({
      data: record,
      key: fieldData.questionnaireId.name,
    });

    this.goToPath(
      `/survey/questionnaire/edit/load/${questionnaireId}/key/basicInfo`,
    );
  };

  establishDataContainerExtraActionCollectionConfig = () => {
    return [
      {
        buildType:
          listViewConfig.dataContainerExtraActionBuildType.generalButton,
        type: 'primary',
        icon: iconBuilder.plus(),
        text: '新增问卷',
        handleClick: this.showAddBasicInfoDrawer,
      },
    ];
  };

  fillSearchCardInitialValues = () => {
    const values = {};

    values[fieldData.questionCreateMode.name] = unlimitedWithStringFlag.flag;
    values[fieldData.status.name] = unlimitedWithStringFlag.flag;

    return values;
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 6,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.title,
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.customSelect,
          component: renderSearchQuestionnaireQuestionCreateModeSelect({}),
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.customSelect,
          component: renderSearchQuestionnaireStatusSelect({}),
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  establishListItemDropdownConfig = (item) => {
    const itemStatus = getValueByKey({
      data: item,
      key: fieldData.status.name,
      convert: convertCollection.number,
    });

    const itemQuestionCreateMode = getValueByKey({
      data: item,
      key: fieldData.questionCreateMode.name,
      convert: convertCollection.number,
    });

    return {
      size: 'small',
      text: '修改',
      icon: iconBuilder.edit(),
      disabled: !checkHasAuthority(
        accessWayCollection.questionnaire.get.permission,
      ),
      handleButtonClick: ({ handleData }) => {
        this.goToEdit(handleData);
      },
      handleData: item,
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'updateSort',
          icon: iconBuilder.edit(),
          text: '设置排序',
          hidden: !checkHasAuthority(
            accessWayCollection.questionnaire.updateSort.permission,
          ),
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'updateBusinessMode',
          icon: iconBuilder.edit(),
          text: '设置适用业务',
          hidden: !checkHasAuthority(
            accessWayCollection.questionnaire.updateBusinessMode.permission,
          ),
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'toggleRecommend',
          icon: iconBuilder.swap(),
          text: '切换推荐',
          hidden: !checkHasAuthority(
            accessWayCollection.questionnaire.toggleRecommend.permission,
          ),
          confirm: true,
          title: '将要切换推荐设置，确定吗？',
        },
        {
          key: 'toggleTop',
          icon: iconBuilder.swap(),
          text: '切换置顶',
          hidden: !checkHasAuthority(
            accessWayCollection.questionnaire.toggleTop.permission,
          ),
          confirm: true,
          title: '将要切换置顶设置，确定吗？',
        },
        {
          key: 'toggleVisible',
          icon: iconBuilder.swap(),
          text: '切换可见性',
          hidden:
            itemQuestionCreateMode != questionCreateModeCollection.global ||
            !checkHasAuthority(
              accessWayCollection.questionnaire.toggleVisible.permission,
            ),
          confirm: true,
          title: '将要切换可见性设置，确定吗？',
        },
        {
          key: 'toggleGroupDisplay',
          icon: iconBuilder.swap(),
          text: '切换分组展示',
          hidden:
            itemQuestionCreateMode != questionCreateModeCollection.global ||
            !checkHasAuthority(
              accessWayCollection.questionnaire.toggleGroupDisplay.permission,
            ),
          confirm: true,
          title: '将要切换答题时问题分组展示，确定吗？',
        },
        {
          key: 'toggleRandomOrder',
          icon: iconBuilder.swap(),
          text: '切换随机排序',
          hidden: !checkHasAuthority(
            accessWayCollection.questionnaire.toggleRandomOrder.permission,
          ),
          confirm: true,
          title: '将要切换为答题时问题随机排序，确定吗？',
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'setOnline',
          icon: iconBuilder.upload(),
          text: '设为上线',
          hidden: !checkHasAuthority(
            accessWayCollection.questionnaire.setOnline.permission,
          ),
          disabled: itemStatus === statusCollection.online,
          confirm: {
            title: '即将设为上线，确定吗？',
          },
        },
        {
          key: 'setOffline',
          icon: iconBuilder.download(),
          text: '设为下线',
          hidden: !checkHasAuthority(
            accessWayCollection.questionnaire.setOffline.permission,
          ),
          disabled: itemStatus === statusCollection.offline,
          confirm: {
            title: '即将设为下线，确定吗？',
          },
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'remove',
          icon: iconBuilder.delete(),
          text: '移除数据',
          hidden: !checkHasAuthority(
            accessWayCollection.questionnaire.remove.permission,
          ),
          confirm: true,
          title: '将要移除数据，确定吗？',
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'refreshCache',
          icon: iconBuilder.reload(),
          text: '刷新缓存',
          hidden: !checkHasAuthority(
            accessWayCollection.questionnaire.refreshCache.permission,
          ),
          confirm: true,
          title: '即将刷新缓存，确定吗？',
        },
      ],
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.image,
      width: 60,
      showRichFacade: true,
      facadeMode: columnFacadeMode.image,
    },
    {
      dataTarget: fieldData.title,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.questionCreateMode,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) * 8 + 12,
          }),
        };
      },
      formatValue: (value) => {
        return getQuestionnaireQuestionCreateModeName({
          value: value,
        });
      },
    },
    {
      dataTarget: fieldData.whetherGroupDisplay,
      width: 80,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) * 4 + 47,
          }),
        };
      },
      formatValue: (value, record) => {
        const questionCreateMode = getValueByKey({
          data: record,
          key: fieldData.questionCreateMode.name,
          convert: convertCollection.number,
        });

        if (questionCreateMode != questionCreateModeCollection.global) {
          return '--';
        }

        return getWhetherName({
          value: value,
        });
      },
    },
    {
      dataTarget: fieldData.whetherRandomOrder,
      width: 80,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) * 4 + 47,
          }),
        };
      },
      formatValue: (value, record) => {
        const questionCreateMode = getValueByKey({
          data: record,
          key: fieldData.questionCreateMode.name,
          convert: convertCollection.number,
        });

        if (questionCreateMode != questionCreateModeCollection.global) {
          return '--';
        }

        return getWhetherName({
          value: value,
        });
      },
    },
    {
      dataTarget: fieldData.businessMode,
      width: 140,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) * 4 + 32,
          }),
        };
      },
      formatValue: (value) => {
        return getBusinessModeName({
          value: value,
        });
      },
    },
    {
      dataTarget: fieldData.whetherRecommend,
      width: 60,
      showRichFacade: true,
      emptyValue: '--',
      render: (value) => (
        <>
          {toNumber(value) === 1
            ? iconBuilder.checkCircle(
                {
                  twoToneColor:
                    value === 1
                      ? colorCollection.yesColor
                      : colorCollection.noColor,
                },
                iconModeCollection.twoTone,
              )
            : iconBuilder.closeCircle(
                {
                  twoToneColor:
                    value === 1
                      ? colorCollection.yesColor
                      : colorCollection.noColor,
                },
                iconModeCollection.twoTone,
              )}
        </>
      ),
    },
    {
      dataTarget: fieldData.whetherTop,
      width: 60,
      showRichFacade: true,
      emptyValue: '--',
      render: (value) => (
        <>
          {toNumber(value) === 1
            ? iconBuilder.checkCircle(
                {
                  twoToneColor:
                    value === 1
                      ? colorCollection.yesColor
                      : colorCollection.noColor,
                },
                iconModeCollection.twoTone,
              )
            : iconBuilder.closeCircle(
                {
                  twoToneColor:
                    value === 1
                      ? colorCollection.yesColor
                      : colorCollection.noColor,
                },
                iconModeCollection.twoTone,
              )}
        </>
      ),
    },
    {
      dataTarget: fieldData.whetherVisible,
      width: 60,
      showRichFacade: true,
      emptyValue: '--',
      render: (value) => (
        <>
          {toNumber(value) === 1
            ? iconBuilder.checkCircle(
                {
                  twoToneColor:
                    value === 1
                      ? colorCollection.yesColor
                      : colorCollection.noColor,
                },
                iconModeCollection.twoTone,
              )
            : iconBuilder.closeCircle(
                {
                  twoToneColor:
                    value === 1
                      ? colorCollection.yesColor
                      : colorCollection.noColor,
                },
                iconModeCollection.twoTone,
              )}
        </>
      ),
    },
    {
      dataTarget: fieldData.sort,
      width: 80,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.status,
      width: 100,
      showRichFacade: true,
      emptyValue: '--',
      facadeMode: columnFacadeMode.badge,
      facadeConfigBuilder: (value) => {
        return {
          status: getStatusBadge(value),
          text: getQuestionnaireStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.questionnaireId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: fieldData.createTime,
      width: 160,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
    },
  ];

  establishHelpConfig = () => {
    return {
      title: '简要说明',
      list: [
        {
          text: '问卷内问题答题时随机排序，仅在统一试卷模式下生效.',
        },
      ],
    };
  };

  renderPresetOther = () => {
    const { currentRecord } = this.state;

    return (
      <>
        <AddBasicInfoDrawer afterOK={this.afterAddBasicInfoDrawerOk} />

        <ChangeBusinessModeModal
          externalData={currentRecord}
          afterOK={this.afterChangeBusinessModeModalOk}
        />

        <ChangeSortModal
          externalData={currentRecord}
          afterOK={this.afterChangeSortModalOk}
        />
      </>
    );
  };
}

export default PageList;
