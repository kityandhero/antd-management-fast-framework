import React from 'react';

import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  convertCollection,
  getValueByKey,
  handleItem,
} from 'easy-soft-utility';

import {
  getDerivedStateFromPropertiesForUrlParameters,
  listViewConfig,
  searchCardConfig,
} from 'antd-management-fast-common';
import {
  buildListViewItemInnerWithDropdownButton,
  ColorText,
  iconBuilder,
} from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../../../customConfig';
import { getApplicationVersionStatusName } from '../../../../../customSpecialComponents';
import { AddBasicInfoDrawer } from '../../../../ApplicationVersion/AddBasicInfoDrawer';
import {
  refreshCacheAction,
  removeAction,
  setDisableAction,
  setEnableAction,
} from '../../../../ApplicationVersion/Assist/action';
import {
  fieldData,
  statusCollection,
} from '../../../../ApplicationVersion/Common/data';
import { UpdateBasicInfoDrawer } from '../../../../ApplicationVersion/UpdateBasicInfoDrawer';
import {
  checkNeedUpdateAssist,
  parseUrlParametersForSetState,
} from '../../../Assist/config';

const { InnerMultiPage } = DataMultiPageView;

@connect(({ applicationVersion, schedulingControl }) => ({
  applicationVersion,
  schedulingControl,
}))
class Index extends InnerMultiPage {
  goToUpdateWhenProcessed = true;

  pageValues = {
    pageNo: 1,
    frontendPageNo: 1,
    pageSize: 4,
  };

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      listViewMode: listViewConfig.viewMode.list,
      loadApiPath: 'applicationVersion/pageList',
      applicationId: null,
      currentRecord: null,
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
      case 'setEnable': {
        this.setEnable(handleData);
        break;
      }

      case 'setDisable': {
        this.setDisable(handleData);
        break;
      }

      case 'refreshCache': {
        this.refreshCache(handleData);
        break;
      }

      case 'remove': {
        this.remove(handleData);
        break;
      }

      default: {
        break;
      }
    }
  };

  handleItemStatus = ({ target, handleData, remoteData }) => {
    const applicationVersionId = getValueByKey({
      data: handleData,
      key: fieldData.applicationVersionId.name,
    });

    handleItem({
      target,
      value: applicationVersionId,
      compareValueHandler: (o) => {
        const v = getValueByKey({
          data: o,
          key: fieldData.applicationVersionId.name,
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

  setEnable = (r) => {
    setEnableAction({
      target: this,
      handleData: r,
      successCallback: ({ target, handleData, remoteData }) => {
        target.handleItemStatus({ target, handleData, remoteData });
      },
    });
  };

  setDisable = (r) => {
    setDisableAction({
      target: this,
      handleData: r,
      successCallback: ({ target, handleData, remoteData }) => {
        target.handleItemStatus({ target, handleData, remoteData });
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
          fieldData: fieldData.title,
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  establishListViewItemLayout = () => {
    return 'vertical';
  };

  establishDataContainerExtraActionCollectionConfig = () => {
    return [
      {
        buildType:
          listViewConfig.dataContainerExtraActionBuildType.generalButton,
        type: 'primary',
        icon: iconBuilder.addCircle(),
        text: '新增版本',
        handleClick: () => {
          this.showAddBasicInfoDrawer();
        },
        hidden: !checkHasAuthority(
          accessWayCollection.applicationVersion.addBasicInfo.permission,
        ),
      },
    ];
  };

  // eslint-disable-next-line no-unused-vars
  renderPresetListViewItemInner = (item, index) => {
    const status = getValueByKey({
      data: item,
      key: fieldData.status.name,
      convert: convertCollection.number,
    });

    return buildListViewItemInnerWithDropdownButton({
      title: {
        label: fieldData.title.label,
        text: getValueByKey({
          data: item,
          key: fieldData.title.name,
        }),
      },
      descriptionList: [
        {
          label: fieldData.description.label,
          text: getValueByKey({
            data: item,
            key: fieldData.description.name,
          }),
          color: '#999999',
        },
        {
          label: fieldData.url.label,
          text: getValueByKey({
            data: item,
            key: fieldData.url.name,
          }),
          color: '#999999',
          extra: (
            <ColorText
              textPrefix={fieldData.status.label}
              text={getApplicationVersionStatusName({
                value: status,
              })}
              randomColor
              randomSeed={status}
              separatorStyle={{
                paddingRight: '4px',
              }}
              seedOffset={18}
            />
          ),
        },
      ],
      actionList: [
        {
          label: fieldData.applicationVersionId.label,
          text: getValueByKey({
            data: item,
            key: fieldData.applicationVersionId.name,
          }),
          canCopy: true,
          color: '#999999',
        },
        {
          label: fieldData.deviceTypeNote.label,
          text: getValueByKey({
            data: item,
            key: fieldData.deviceTypeNote.name,
          }),
          canCopy: true,
          color: '#999999',
        },
        {
          label: fieldData.internalVersion.label,
          text: getValueByKey({
            data: item,
            key: fieldData.internalVersion.name,
            convert: convertCollection.string,
          }),
          canCopy: true,
          color: '#999999',
        },
        {
          label: fieldData.minVersion.label,
          text: getValueByKey({
            data: item,
            key: fieldData.minVersion.name,
          }),
          canCopy: true,
          color: '#999999',
        },
        {
          label: fieldData.maxVersion.label,
          text: getValueByKey({
            data: item,
            key: fieldData.maxVersion.name,
          }),
          canCopy: true,
          color: '#999999',
        },
        {
          label: fieldData.createTime.label,
          text: getValueByKey({
            data: item,
            key: fieldData.createTime.name,
          }),
          color: '#999999',
        },
      ],
      extra: {
        size: 'small',
        text: '编辑',
        placement: 'topRight',
        icon: iconBuilder.edit(),
        disabled: !checkHasAuthority(
          accessWayCollection.applicationVersion.get.permission,
        ),
        handleButtonClick: ({ handleData }) => {
          this.showUpdateBasicInfoDrawer(handleData);
        },
        handleData: item,
        handleMenuClick: ({ key, handleData }) => {
          this.handleMenuClick({ key, handleData });
        },
        items: [
          {
            key: 'setEnable',
            icon: iconBuilder.playCircle(),
            text: '设为启用',
            disabled: status === statusCollection.enable,
            confirm: true,
            title: '将要设为启用，确定吗？',
          },
          {
            key: 'setDisable',
            icon: iconBuilder.pauseCircle(),
            text: '设为禁用',
            disabled: status === statusCollection.disable,
            confirm: true,
            title: '将要设为禁用，确定吗？',
          },
          {
            withDivider: true,
            uponDivider: true,
            key: 'refreshCache',
            icon: iconBuilder.reload(),
            text: '刷新缓存',
            confirm: true,
            title: '将要刷新缓存，确定吗？',
          },
          {
            withDivider: true,
            uponDivider: true,
            key: 'remove',
            icon: iconBuilder.delete(),
            text: '移除数据',
            confirm: true,
            title: '将要移除数据，确定吗？',
          },
        ],
      },
    });
  };

  renderPresetOther = () => {
    const { applicationId, currentRecord } = this.state;

    const renderAddBasicInfoDrawer = checkHasAuthority(
      accessWayCollection.applicationVersion.addBasicInfo.permission,
    );

    const renderUpdateBasicInfoDrawer = checkHasAuthority(
      accessWayCollection.applicationVersion.updateBasicInfo.permission,
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
      </>
    );
  };
}

export default Index;
