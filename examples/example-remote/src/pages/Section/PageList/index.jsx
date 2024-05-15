import { connect } from 'easy-soft-dva';
import {
  buildRandomHexColor,
  checkHasAuthority,
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  getValueByKey,
  handleItem,
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
import {
  buildColorText,
  iconBuilder,
  iconModeCollection,
} from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection, colorCollection } from '../../../customConfig';
import {
  getSectionStatusName,
  renderSearchSectionStatusSelect,
} from '../../../customSpecialComponents';
import {
  refreshCacheAction,
  setOfflineAction,
  setOnlineAction,
  toggleRecommendAction,
  toggleTopAction,
  toggleVisibleAction,
} from '../Assist/action';
import { parseUrlParametersForSetState } from '../Assist/config';
import { ChangeSortModal } from '../ChangeSortModal';
import { fieldData, statusCollection } from '../Common/data';

const { MultiPage } = DataMultiPageView;

@connect(({ section, schedulingControl }) => ({
  section,
  schedulingControl,
}))
class PageList extends MultiPage {
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

      case 'setSort': {
        this.showChangeSortModal(handleData);
        break;
      }

      case 'refreshCache': {
        this.refreshCache(handleData);
        break;
      }

      default: {
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
        const { sectionId: v } = o;

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
            const { sectionId: v } = o;

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
            const { sectionId: v } = o;

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
            const { sectionId: v } = o;

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

  getStatusBadge = (v) => {
    let result = 'default';

    const status = toNumber(v);

    switch (status) {
      case statusCollection.online: {
        result = 'processing';
        break;
      }

      case statusCollection.offline: {
        result = 'error';
        break;
      }

      default: {
        result = 'default';
        break;
      }
    }

    return result;
  };

  showChangeSortModal = (r) => {
    this.setState({ currentRecord: r }),
      () => {
        ChangeSortModal.open();
      };
  };

  afterChangeSortModalOk = () => {
    this.refreshDataWithReloadAnimalPrompt({});
  };

  goToAdd = () => {
    this.goToPath(`/news/section/add`);
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
        handleClick: this.goToAdd,
      },
    ];
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 6,
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

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.name,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.image,
      width: 100,
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
            seed: value * 3 + 13,
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
            seed: value * 4 + 8,
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
            seed: value * 4 + 8,
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
          status: this.getStatusBadge(value),
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
    {
      dataTarget: fieldData.customOperate,
      width: 106,
      fixed: 'right',
      showRichFacade: true,
      facadeMode: columnFacadeMode.dropdown,
      configBuilder: (value, record) => {
        const itemWhetherRecommend = getValueByKey({
          data: record,
          key: fieldData.whetherRecommend.name,
          convert: convertCollection.number,
        });

        const itemWhetherTop = getValueByKey({
          data: record,
          key: fieldData.whetherTop.name,
          convert: convertCollection.number,
        });

        const itemWhetherVisible = getValueByKey({
          data: record,
          key: fieldData.whetherVisible.name,
          convert: convertCollection.number,
        });

        const itemStatus = getValueByKey({
          data: record,
          key: fieldData.status.name,
          convert: convertCollection.number,
        });

        return {
          size: 'small',
          text: '编辑',
          icon: iconBuilder.edit(),
          disabled: !checkHasAuthority(
            accessWayCollection.section.get.permission,
          ),
          handleButtonClick: ({ handleData }) => {
            this.goToEdit(handleData);
          },
          handleData: record,
          handleMenuClick: ({ key, handleData }) => {
            this.handleMenuClick({ key, handleData });
          },
          items: [
            {
              key: 'toggleRecommend',
              icon: itemWhetherRecommend
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
              text: itemWhetherRecommend ? '取消推荐' : '设为推荐',
              hidden: !checkHasAuthority(
                accessWayCollection.section.toggleRecommend.permission,
              ),
              confirm: true,
              title: `即将${
                itemWhetherRecommend ? '取消推荐' : '设为推荐'
              }，确定吗？`,
            },
            {
              key: 'toggleTop',
              icon: itemWhetherTop
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
              text: itemWhetherTop ? '取消置顶' : '设为置顶',
              hidden: !checkHasAuthority(
                accessWayCollection.section.toggleTop.permission,
              ),
              confirm: true,
              title: `即将${
                itemWhetherTop ? '取消置顶' : '设为置顶'
              }，确定吗？`,
            },
            {
              key: 'toggleVisible',
              icon: itemWhetherVisible
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
              text: itemWhetherVisible ? '设为隐藏' : '设为显示',
              hidden: !checkHasAuthority(
                accessWayCollection.section.toggleVisible.permission,
              ),
              confirm: true,
              title: `即将${
                itemWhetherVisible ? '设为隐藏' : '设为显示'
              }，确定吗？`,
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
              confirm: true,
              title: '即将设为上线，确定吗？',
            },
            {
              key: 'setOffline',
              icon: iconBuilder.download(),
              text: '设为下线',
              hidden: !checkHasAuthority(
                accessWayCollection.section.setOffline.permission,
              ),
              disabled: itemStatus === statusCollection.offline,
              confirm: true,
              title: '即将设为下线，确定吗？',
            },
            {
              key: 'setSort',
              withDivider: true,
              uponDivider: true,
              icon: iconBuilder.edit(),
              text: '设置排序值',
              hidden: !checkHasAuthority(
                accessWayCollection.section.updateSort.permission,
              ),
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
              confirm: true,
              title: '即将刷新缓存，确定吗？',
            },
          ],
        };
      },
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

    const renderChangeSortModal = checkHasAuthority(
      accessWayCollection.section.updateSort.permission,
    );

    return (
      <>
        {renderChangeSortModal ? (
          <ChangeSortModal
            externalData={currentRecord}
            afterOK={this.afterChangeSortModalOk}
          />
        ) : null}
      </>
    );
  };
}

export default PageList;
