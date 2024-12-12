import React from 'react';

import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  getValueByKey,
  showSimpleErrorMessage,
} from 'easy-soft-utility';

import {
  cardConfig,
  dropdownExpandItemType,
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
import { AddBasicInfoDrawer } from '../../../../ApplicationNavigation/AddBasicInfoDrawer';
import { AddNavigationItemDrawer } from '../../../../ApplicationNavigation/AddNavigationItemDrawer';
import {
  refreshCacheAction,
  removeAction,
  removeNavigationItemAction,
} from '../../../../ApplicationNavigation/Assist/action';
import { fieldData } from '../../../../ApplicationNavigation/Common/data';
import { buildTable } from '../../../../ApplicationNavigation/Component/FunctionComponent';
import { SortNavigationItemDrawer } from '../../../../ApplicationNavigation/SortNavigationItemDrawer';
import { UpdateBasicInfoDrawer } from '../../../../ApplicationNavigation/UpdateBasicInfoDrawer';
import UpdateNavigationItemDrawer from '../../../../ApplicationNavigation/UpdateNavigationItemDrawer';
import {
  checkNeedUpdateAssist,
  parseUrlParametersForSetState,
} from '../../../Assist/config';

const { InnerMultiPage } = DataMultiPageView;

@connect(({ applicationNavigation, schedulingControl }) => ({
  applicationNavigation,
  schedulingControl,
}))
class Index extends InnerMultiPage {
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
      loadApiPath: 'applicationNavigation/pageList',
      applicationId: null,
      currentRecord: null,
      currentNavigationItem: null,
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
    const { applicationId } = this.state;

    d.applicationId = applicationId;

    return d;
  };

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'refreshCache': {
        this.refreshCache(handleData);
        break;
      }

      case 'removeItem': {
        this.removeNavigationItem(handleData);
        break;
      }

      case 'remove': {
        this.remove(handleData);
        break;
      }

      default: {
        showSimpleErrorMessage('can not find matched key');
        break;
      }
    }
  };

  removeNavigationItem = (r) => {
    removeNavigationItemAction({
      target: this,
      handleData: r,
      successCallback: ({ target }) => {
        target.refreshDataWithReloadAnimalPrompt({});
      },
    });
  };

  remove = (r) => {
    removeAction({
      target: this,
      handleData: r,
      successCallback: ({ target }) => {
        target.refreshDataWithReloadAnimalPrompt({});
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
    const that = this;

    that.setState(
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

  showSortNavigationItemDrawer = (r) => {
    const that = this;

    that.setState(
      {
        currentRecord: r,
      },
      () => {
        SortNavigationItemDrawer.open();
      },
    );
  };

  afterSortNavigationItemDrawerOk = () => {
    this.refreshDataWithReloadAnimalPrompt({});
  };

  showAddNavigationItemDrawer = (r) => {
    const that = this;

    that.setState(
      {
        currentRecord: r,
      },
      () => {
        AddNavigationItemDrawer.open();
      },
    );
  };

  afterAddNavigationItemDrawerOk = () => {
    this.refreshDataWithReloadAnimalPrompt({});
  };

  showUpdateNavigationItemDrawer = (r) => {
    this.setState(
      {
        currentNavigationItem: r,
      },
      () => {
        UpdateNavigationItemDrawer.open();
      },
    );
  };

  afterUpdateNavigationItemDrawerOk = () => {
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
          accessWayCollection.applicationNavigation.addBasicInfo.permission,
        ),
      },
    ];
  };

  establishCardCollectionViewItemConfig = (r) => {
    return {
      title: {
        text: `${getValueByKey({
          data: r,
          key: fieldData.uniqueMark.name,
        })} - ${getValueByKey({
          data: r,
          key: fieldData.name.name,
        })}`,
        subText: buildColorText({
          textPrefix: fieldData.targetPath.label,
          separatorStyle: {
            paddingRight: '4px',
          },
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
            buildType: cardConfig.extraBuildType.generalButton,
            icon: iconBuilder.addCircle(),
            text: '新增导航',
            handleClick: ({ handleData }) => {
              this.showAddNavigationItemDrawer(handleData);
            },
            size: 'small',
            handleData: r,
            hidden: !checkHasAuthority(
              accessWayCollection.applicationNavigation.addNavigationItem
                .permission,
            ),
          },
          {
            buildType: cardConfig.extraBuildType.generalButton,
            icon: iconBuilder.sortAscending(),
            text: '导航排序',
            handleClick: ({ handleData }) => {
              this.showSortNavigationItemDrawer(handleData);
            },
            size: 'small',
            handleData: r,
            hidden: !checkHasAuthority(
              accessWayCollection.applicationNavigation
                .setNavigationCollectionSort.permission,
            ),
          },
          {
            buildType: cardConfig.extraBuildType.dropdownButton,
            icon: iconBuilder.edit(),
            text: '编辑导航配置',
            size: 'small',
            handleData: r,
            hidden: !checkHasAuthority(
              accessWayCollection.applicationNavigation.updateBasicInfo
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
                  accessWayCollection.applicationNavigation.refreshCache
                    .permission,
                ),
                confirm: true,
                title: '即将刷新缓存，确定吗？',
              },
              {
                type: dropdownExpandItemType.divider,
              },
              {
                key: 'remove',
                icon: iconBuilder.delete(),
                text: '删除导航',
                hidden: !checkHasAuthority(
                  accessWayCollection.applicationNavigation.remove.permission,
                ),
                confirm: true,
                title: '将要移除整个导航，确定吗？',
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
            list: r.navigationItemList,
            props: {
              buildOperate: ({ record }) => {
                return buildDropdownButton({
                  size: 'small',
                  text: '编辑',
                  icon: iconBuilder.edit(),
                  disabled: !checkHasAuthority(
                    accessWayCollection.applicationNavigation.getNavigationItem
                      .permission,
                  ),
                  handleButtonClick: ({ handleData }) => {
                    this.showUpdateNavigationItemDrawer(handleData);
                  },
                  handleData: record,
                  handleMenuClick: ({ key, handleData }) => {
                    this.handleMenuClick({ key, handleData });
                  },
                  items: [
                    {
                      key: 'removeItem',
                      icon: iconBuilder.delete(),
                      text: '删除信息',
                      hidden: !checkHasAuthority(
                        accessWayCollection.applicationNavigation
                          .removeNavigationItem.permission,
                      ),
                      confirm: true,
                      title: '将要移除导航，确定吗？',
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
          text: '唯一标记请保持同一页面路径下唯一, 不唯一情况下可能引发数据覆盖',
        },
        {
          text: '应用请求接口时，传递页面路径，查找后返回对应导航',
        },
      ],
    };
  };

  renderPresetOther = () => {
    const { applicationId, currentRecord, currentNavigationItem } = this.state;

    const renderAddBasicInfoDrawer = checkHasAuthority(
      accessWayCollection.applicationNavigation.addBasicInfo.permission,
    );

    const renderUpdateBasicInfoDrawer = checkHasAuthority(
      accessWayCollection.applicationNavigation.updateBasicInfo.permission,
    );

    const renderAddNavigationItemDrawer = checkHasAuthority(
      accessWayCollection.applicationNavigation.addNavigationItem.permission,
    );

    const renderUpdateNavigationItemDrawer = checkHasAuthority(
      accessWayCollection.applicationNavigation.updateNavigationItem.permission,
    );

    const renderSortNavigationItemDrawer = checkHasAuthority(
      accessWayCollection.applicationNavigation.setNavigationCollectionSort
        .permission,
    );

    return (
      <>
        {renderAddBasicInfoDrawer ? (
          <AddBasicInfoDrawer
            externalData={{ applicationId }}
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

        {renderAddNavigationItemDrawer ? (
          <AddNavigationItemDrawer
            externalData={currentRecord}
            afterOK={() => {
              this.afterAddNavigationItemDrawerOk();
            }}
          />
        ) : null}

        {renderUpdateNavigationItemDrawer ? (
          <UpdateNavigationItemDrawer
            externalData={currentNavigationItem}
            afterOK={() => {
              this.afterUpdateNavigationItemDrawerOk();
            }}
          />
        ) : null}

        {renderSortNavigationItemDrawer ? (
          <SortNavigationItemDrawer
            externalData={currentRecord}
            afterOK={() => {
              this.afterSortNavigationItemDrawerOk();
            }}
          />
        ) : null}
      </>
    );
  };
}

export default Index;
