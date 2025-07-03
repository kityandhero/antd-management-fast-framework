import React from 'react';

import { connect } from 'easy-soft-dva';
import {
  buildRandomHexColor,
  checkHasAuthority,
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  getValueByKey,
  handleItem,
  showSimpleErrorMessage,
  toNumber,
  whetherNumber,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  getDerivedStateFromPropertiesForUrlParameters,
  listViewConfig,
  searchCardConfig,
  unlimitedWithStringFlag,
} from 'antd-management-fast-common';
import { buildColorText, iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import {
  getSectionStatusName,
  renderSearchSectionStatusSelect,
} from '../../../customSpecialComponents';
import { AddBasicInfoDrawer } from '../AddBasicInfoDrawer';
import {
  refreshCacheAction,
  setOfflineAction,
  setOnlineAction,
  toggleRecommendAction,
  toggleTopAction,
  toggleVisibleAction,
} from '../Assist/action';
import { parseUrlParametersForSetState } from '../Assist/config';
import { getStatusBadge } from '../Assist/tools';
import { ChangeBusinessModeModal } from '../ChangeBusinessModeModal';
import { ChangeSortModal } from '../ChangeSortModal';
import { fieldData, statusCollection } from '../Common/data';

const { MultiPage } = DataMultiPageView;

@connect(({ section, schedulingControl }) => ({
  section,
  schedulingControl,
}))
class PageList extends MultiPage {
  // showCallProcess = true;

  componentAuthority = accessWayCollection.section.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '栏目列表',
      paramsKey: accessWayCollection.section.pageList.paramsKey,
      loadApiPath: 'section/pageList',
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

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'setSort': {
        this.showChangeSortModal(handleData);
        break;
      }

      case 'updateBusinessMode': {
        this.showChangeBusinessModeModal(handleData);
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
    const sectionId = getValueByKey({
      data: handleData,
      key: fieldData.sectionId.name,
    });

    handleItem({
      target,
      value: sectionId,
      compareValueHandler: (o) => {
        const v = getValueByKey({
          data: o,
          key: fieldData.sectionId.name,
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

  toggleRecommend = (record) => {
    toggleRecommendAction({
      target: this,
      handleData: record,
      successCallback: ({ target, remoteData }) => {
        const sectionId = getValueByKey({
          data: remoteData,
          key: fieldData.sectionId.name,
        });

        handleItem({
          target,
          value: sectionId,
          compareValueHandler: (o) => {
            const v = getValueByKey({
              data: o,
              key: fieldData.sectionId.name,
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
        const sectionId = getValueByKey({
          data: remoteData,
          key: fieldData.sectionId.name,
        });

        handleItem({
          target,
          value: sectionId,
          compareValueHandler: (o) => {
            const v = getValueByKey({
              data: o,
              key: fieldData.sectionId.name,
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
        const sectionId = getValueByKey({
          data: remoteData,
          key: fieldData.sectionId.name,
        });

        handleItem({
          target,
          value: sectionId,
          compareValueHandler: (o) => {
            const v = getValueByKey({
              data: o,
              key: fieldData.sectionId.name,
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

  refreshCache = (record) => {
    refreshCacheAction({
      target: this,
      handleData: record,
    });
  };

  showAddBasicInfoDrawer = () => {
    AddBasicInfoDrawer.open();
  };

  afterAddBasicInfoDrawerOk = () => {
    this.refreshDataWithReloadAnimalPrompt({});
  };

  showChangeSortModal = (item) => {
    this.setState({ currentRecord: item }, () => {
      ChangeSortModal.open();
    });
  };

  afterChangeSortModalOk = () => {
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
    const sectionId = getValueByKey({
      data: record,
      key: fieldData.sectionId.name,
    });

    this.goToPath(`/news/section/edit/load/${sectionId}/key/basicInfo`);
  };

  fillSearchCardInitialValues = () => {
    const values = {};

    values[fieldData.status.name] = unlimitedWithStringFlag.key;

    return values;
  };

  establishDataContainerExtraActionCollectionConfig = () => {
    return [
      {
        buildType:
          listViewConfig.dataContainerExtraActionBuildType.generalButton,
        type: 'primary',
        icon: iconBuilder.addCircle(),
        text: '新增栏目',
        hidden: !checkHasAuthority(
          accessWayCollection.section.addBasicInfo.permission,
        ),
        handleClick: this.showAddBasicInfoDrawer,
      },
    ];
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 12,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.name,
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.component,
          component: renderSearchSectionStatusSelect({}),
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  establishTableExpandableConfig = () => {
    return {
      checkNeedExpander: (list) => {
        const result = (list || []).some((o) => {
          const description = getValueByKey({
            data: o,
            key: fieldData.description.name,
          });

          return !checkStringIsNullOrWhiteSpace(description);
        });

        return result;
      },
      expanderStyle: {
        boxShadow: '0 2px 12px 2px #aaa',
        borderRadius: '4px',
      },
      rowExpandable: (r) => {
        const description = getValueByKey({
          data: r,
          key: fieldData.description.name,
        });

        return !checkStringIsNullOrWhiteSpace(description);
      },
      animalType: listViewConfig.expandAnimalType.queue,
      expandedRowRender: (r) => {
        return (
          <p style={{ padding: '10px 10px', margin: 0 }}>
            {buildColorText({
              textPrefix: fieldData.description.label,
              text: getValueByKey({
                data: r,
                key: fieldData.description.name,
              }),
            })}
          </p>
        );
      },
    };
  };

  establishListItemDropdownConfig = (record) => {
    const itemStatus = getValueByKey({
      data: record,
      key: fieldData.status.name,
      convert: convertCollection.number,
    });

    return {
      size: 'small',
      text: '编辑',
      icon: iconBuilder.edit(),
      disabled: !checkHasAuthority(accessWayCollection.section.get.permission),
      handleButtonClick: ({ handleData }) => {
        this.goToEdit(handleData);
      },
      handleData: record,
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'setSort',
          icon: iconBuilder.edit(),
          text: '设置排序值',
          hidden: !checkHasAuthority(
            accessWayCollection.section.updateSort.permission,
          ),
        },
        {
          key: 'updateBusinessMode',
          icon: iconBuilder.edit(),
          text: '设置适用业务',
          hidden: !checkHasAuthority(
            accessWayCollection.section.updateBusinessMode.permission,
          ),
        },
        {
          key: 'toggleRecommend',
          withDivider: true,
          uponDivider: true,
          icon: iconBuilder.swap(),
          text: '切换推荐',
          hidden: !checkHasAuthority(
            accessWayCollection.section.toggleRecommend.permission,
          ),
          confirm: true,
          title: '将要切换推荐设置，确定吗？',
        },
        {
          key: 'toggleTop',
          icon: iconBuilder.swap(),
          text: '切换置顶',
          hidden: !checkHasAuthority(
            accessWayCollection.section.toggleTop.permission,
          ),
          confirm: true,
          title: '将要切换置顶设置，确定吗？',
        },
        {
          key: 'toggleVisible',
          icon: iconBuilder.swap(),
          text: '切换可见性',
          hidden: !checkHasAuthority(
            accessWayCollection.section.toggleVisible.permission,
          ),
          confirm: true,
          title: '将要切换可见性设置，确定吗？',
        },
        {
          key: 'setOnline',
          withDivider: true,
          uponDivider: true,
          icon: iconBuilder.upload(),
          text: '设为上线',
          hidden: !checkHasAuthority(
            accessWayCollection.section.setOnline.permission,
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
            accessWayCollection.section.setOffline.permission,
          ),
          disabled: itemStatus === statusCollection.offline,
          confirm: {
            title: '即将设为下线，确定吗？',
          },
        },
        {
          key: 'refreshCache',
          withDivider: true,
          uponDivider: true,
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

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.name,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.image,
      width: 80,
      showRichFacade: true,
      facadeMode: columnFacadeMode.image,
    },
    {
      dataTarget: fieldData.sort,
      width: 80,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.whetherVisible,
      width: 100,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) * 3 + 13,
          }),
        };
      },
      formatValue: (value) => {
        const v = toNumber(value);

        return v === whetherNumber.yes ? '显示' : '隐藏';
      },
    },
    {
      dataTarget: fieldData.whetherRecommend,
      width: 100,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) * 4 + 8,
          }),
        };
      },
      formatValue: (value) => {
        const v = toNumber(value);

        return v === whetherNumber.yes ? '是' : '否';
      },
    },
    {
      dataTarget: fieldData.whetherTop,
      width: 100,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) * 4 + 8,
          }),
        };
      },
      formatValue: (value) => {
        const v = toNumber(value);

        return v === whetherNumber.yes ? '是' : '否';
      },
    },
    {
      dataTarget: fieldData.status,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeMode: columnFacadeMode.badge,
      facadeConfigBuilder: (value) => {
        return {
          status: getStatusBadge(value),
          text: getSectionStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.parentName,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.businessModeNote,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.createTime,
      width: 160,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.sectionId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
  ];

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '推荐状态: 设置为推荐状态的栏目将依照前台应用呈现到对应的推荐模块。',
        },
        {
          text: '置顶状态: 设置为置顶状态的栏目将依照前台应用呈现到对应的置顶模块。',
        },
        {
          text: '可见性状态: 设置为不可见的栏目将不在前台展现，与下线操作效果类似。',
        },
      ],
    };
  };

  renderPresetOther = () => {
    const { currentRecord } = this.state;

    return (
      <>
        <AddBasicInfoDrawer
          afterOK={() => {
            this.afterAddBasicInfoDrawerOk();
          }}
        />

        <ChangeSortModal
          externalData={currentRecord}
          afterOK={this.afterChangeSortModalOk}
        />

        <ChangeBusinessModeModal
          externalData={currentRecord}
          afterOK={this.afterChangeBusinessModeModalOk}
        />
      </>
    );
  };
}

export default PageList;
