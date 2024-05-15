import React from 'react';

import { connect } from 'easy-soft-dva';
import { checkHasAuthority, getValueByKey } from 'easy-soft-utility';

import {
  cardConfig,
  columnFacadeMode,
  getDerivedStateFromPropertiesForUrlParameters,
  listViewConfig,
  searchCardConfig,
} from 'antd-management-fast-common';
import {
  buildColorText,
  buildDropdownButton,
  iconBuilder,
} from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../../../customConfig';
import { AddBasicInfoDrawer } from '../../../../SectionApplicationConfig/AddBasicInfoDrawer';
import { AddConfigItemDrawer } from '../../../../SectionApplicationConfig/AddConfigItemDrawer';
import {
  refreshCacheAction,
  removeConfigItemAction,
} from '../../../../SectionApplicationConfig/Assist/action';
import { buildTable } from '../../../../SectionApplicationConfig/Component/FunctionComponent';
import { UpdateBasicInfoDrawer } from '../../../../SectionApplicationConfig/UpdateBasicInfoDrawer';
import { UpdateConfigItemDrawer } from '../../../../SectionApplicationConfig/UpdateConfigItemDrawer';
import {
  checkNeedUpdateAssist,
  parseUrlParametersForSetState,
} from '../../../Assist/config';
import { fieldData } from '../../../Common/data';

const { InnerMultiPage } = DataMultiPageView;

@connect(({ sectionApplicationConfig, schedulingControl }) => ({
  sectionApplicationConfig,
  schedulingControl,
}))
class Index extends InnerMultiPage {
  goToUpdateWhenProcessed = true;

  pageValues = {
    pageNo: 1,
    frontendPageNo: 1,
    pageSize: 2,
  };

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      listViewMode: listViewConfig.viewMode.cardCollectionView,
      loadApiPath: 'sectionApplicationConfig/pageList',
      sectionId: null,
      currentRecord: null,
      currentConfigItem: null,
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
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    const result = o;

    result.sectionId = id;

    return result;
  };

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'refreshCache': {
        this.refreshCache(handleData);
        break;
      }

      case 'removeItem': {
        this.removeConfigItem(handleData);
        break;
      }

      default: {
        break;
      }
    }
  };

  removeConfigItem = (r) => {
    removeConfigItemAction({
      target: this,
      handleData: r,
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  refreshCache = (r) => {
    refreshCacheAction({
      target: this,
      handleData: r,
    });
  };

  showAddBasicInfoDrawer = () => {
    AddBasicInfoDrawer.open();
  };

  afterAddBasicInfoDrawerOk = () => {
    this.refreshDataWithReloadAnimalPrompt({});
  };

  showUpdateBasicInfoDrawer = (r) => {
    this.setState(
      {
        currentRecord: r,
      },
      () => {
        UpdateBasicInfoDrawer.open();
      },
    );
  };

  afterUpdateBasicInfoDrawerOk = () => {
    this.refreshDataWithReloadAnimalPrompt({});
  };

  showAddConfigItemDrawer = (r) => {
    this.setState(
      {
        currentRecord: r,
      },
      () => {
        AddConfigItemDrawer.open();
      },
    );
  };

  afterAddConfigItemDrawerOk = () => {
    this.refreshDataWithReloadAnimalPrompt({});
  };

  showUpdateConfigItemDrawer = (r) => {
    this.setState(
      {
        currentConfigItem: r,
      },
      () => {
        UpdateConfigItemDrawer.open();
      },
    );
  };

  afterUpdateConfigItemDrawerOk = () => {
    this.refreshDataWithReloadAnimalPrompt({});
  };

  fillSearchCardInitialValues = () => {
    const values = {};

    return values;
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
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  establishDataContainerExtraActionCollectionConfig = () => {
    return [
      {
        buildType:
          listViewConfig.dataContainerExtraActionBuildType.generalButton,
        type: 'primary',
        icon: iconBuilder.addCircle(),
        text: '新增导航配置',
        handleClick: () => {
          this.showAddBasicInfoDrawer();
        },
        hidden: !checkHasAuthority(
          accessWayCollection.sectionApplicationConfig.addBasicInfo.permission,
        ),
      },
    ];
  };

  establishCardCollectionViewItemConfig = (r) => {
    return {
      title: {
        text: getValueByKey({
          data: r,
          key: fieldData.name.name,
        }),
        subText: buildColorText({
          textPrefix: fieldData.targetPath.label,
          text: getValueByKey({
            data: r,
            key: fieldData.targetPath.name,
            defaultValue: '无',
          }),
          color: '#8909ef',
          wrapperBuilder: (c) => {
            return <>【{c}】</>;
          },
        }),
      },
      useAnimal: true,
      animalType: cardConfig.animalType.queue,
      bordered: true,
      extra: {
        split: false,
        list: [
          {
            buildType: cardConfig.extraBuildType.colorText,
            textPrefix: fieldData.applicationName.label,
            text: getValueByKey({
              data: r,
              key: fieldData.applicationName.name,
            }),
            seedOffset: getValueByKey({
              data: r,
              key: fieldData.applicationId.name,
            }),
            randomColor: true,
          },
          {
            buildType: cardConfig.extraBuildType.generalButton,
            icon: iconBuilder.addCircle(),
            text: '新增配置',
            handleClick: ({ handleData }) => {
              this.showAddConfigItemDrawer(handleData);
            },
            size: 'small',
            handleData: r,
            hidden: !checkHasAuthority(
              accessWayCollection.sectionApplicationConfig.addConfigItem
                .permission,
            ),
          },
          {
            buildType: cardConfig.extraBuildType.dropdownButton,
            icon: iconBuilder.edit(),
            text: '编辑信息',
            size: 'small',
            handleData: r,
            hidden: !checkHasAuthority(
              accessWayCollection.sectionApplicationConfig.updateBasicInfo
                .permission,
            ),
            handleButtonClick: ({ handleData }) => {
              this.showUpdateBasicInfoDrawer(handleData);
            },
            handleMenuClick: ({ key, handleData }) => {
              this.handleMenuClick({ key, handleData });
            },
            items: [
              {
                key: 'refreshCache',
                icon: iconBuilder.reload(),
                text: '刷新缓存',
                hidden: !checkHasAuthority(
                  accessWayCollection.sectionApplicationConfig.refreshCache
                    .permission,
                ),
                confirm: true,
                title: '即将刷新缓存，确定吗？',
              },
            ],
          },
        ],
      },
      items: [
        {
          lg: 24,
          type: cardConfig.contentItemType.component,
          component: buildTable({
            target: this,
            list: r.configItemList,
            props: {
              buildOperate: ({ record }) => {
                return buildDropdownButton({
                  size: 'small',
                  text: '编辑',
                  icon: iconBuilder.edit(),
                  disabled: !checkHasAuthority(
                    accessWayCollection.sectionApplicationConfig.getConfigItem
                      .permission,
                  ),
                  handleButtonClick: ({ handleData }) => {
                    this.showUpdateConfigItemDrawer(handleData);
                  },
                  handleData: record,
                  handleMenuClick: ({ key, handleData }) => {
                    this.handleMenuClick({ key, handleData });
                  },
                  items: [
                    {
                      key: 'removeItem',
                      icon: iconBuilder.delete(),
                      text: '删除配置',
                      hidden: !checkHasAuthority(
                        accessWayCollection.sectionApplicationConfig
                          .removeConfigItem.permission,
                      ),
                      confirm: true,
                      title: '将要移除配置，确定吗？',
                    },
                  ],
                });
              },
            },
          }),
        },
      ],
    };
  };

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '同一应用下同一适用页面下的配置项名称不能重复',
        },
      ],
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.name,
      width: 240,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.targetPath,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.configItemCount,
      width: 240,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.sectionApplicationConfigId,
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
    {
      dataTarget: fieldData.customOperate,
      width: 146,
      fixed: 'right',
      align: 'center',
      showRichFacade: true,
      facadeMode: columnFacadeMode.dropdown,
      configBuilder: (value, record) => {
        return {
          size: 'small',
          text: '编辑',
          icon: iconBuilder.edit(),
          disabled: !checkHasAuthority(
            accessWayCollection.sectionApplicationConfig.get.permission,
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
              key: 'refreshCache',
              withDivider: true,
              uponDivider: true,
              icon: iconBuilder.reload(),
              text: '刷新缓存',
              hidden: !checkHasAuthority(
                accessWayCollection.sectionApplicationConfig.refreshCache
                  .permission,
              ),
              confirm: true,
              title: '即将刷新缓存，确定吗？',
            },
          ],
        };
      },
    },
  ];

  renderPresetOther = () => {
    const { sectionId, currentRecord, currentConfigItem } = this.state;

    const renderAddBasicInfoDrawer = checkHasAuthority(
      accessWayCollection.sectionApplicationConfig.addBasicInfo.permission,
    );

    const renderUpdateBasicInfoDrawer = checkHasAuthority(
      accessWayCollection.sectionApplicationConfig.updateBasicInfo.permission,
    );

    const renderAddConfigItemDrawer = checkHasAuthority(
      accessWayCollection.sectionApplicationConfig.addConfigItem.permission,
    );

    const renderUpdateConfigItemDrawer = checkHasAuthority(
      accessWayCollection.sectionApplicationConfig.updateConfigItem.permission,
    );

    return (
      <>
        {renderAddBasicInfoDrawer ? (
          <AddBasicInfoDrawer
            externalData={{ sectionId }}
            afterOK={() => {
              this.afterAddBasicInfoDrawerOk();
            }}
          />
        ) : null}

        {renderUpdateBasicInfoDrawer ? (
          <UpdateBasicInfoDrawer
            externalData={currentRecord}
            afterOK={() => {
              this.afterUpdateBasicInfoDrawerOk();
            }}
          />
        ) : null}

        {renderAddConfigItemDrawer ? (
          <AddConfigItemDrawer
            externalData={currentRecord}
            afterOK={() => {
              this.afterAddConfigItemDrawerOk();
            }}
          />
        ) : null}

        {renderUpdateConfigItemDrawer ? (
          <UpdateConfigItemDrawer
            externalData={currentConfigItem}
            afterOK={() => {
              this.afterUpdateConfigItemDrawerOk();
            }}
          />
        ) : null}
      </>
    );
  };
}

export default Index;
