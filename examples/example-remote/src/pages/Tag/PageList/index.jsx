import { connect } from 'easy-soft-dva';
import {
  buildRandomHexColor,
  checkHasAuthority,
  convertCollection,
  getValueByKey,
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
  CenterBox,
  FlexBox,
  iconBuilder,
  iconModeCollection,
} from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection, colorCollection } from '../../../customConfig';
import {
  getBusinessModeName,
  getTagStatusName,
  getTagTypeName,
} from '../../../customSpecialComponents';
import AddBasicInfoDrawer from '../AddBasicInfoDrawer';
import {
  refreshCacheAction,
  removeAction,
  setDisableAction,
  setEnableAction,
  toggleRecommendAction,
} from '../Assist/action';
import {
  getStatusBadge,
  handleItemStatus,
  handleItemType,
  handleItemWhetherRecommend,
} from '../Assist/tools';
import { ChangeSortModal } from '../ChangeSortModal';
import { ChangeTypeModal } from '../ChangeTypeModal';
import { fieldData, statusCollection } from '../Common/data';

const { MultiPage } = DataMultiPageView;

@connect(({ tag, schedulingControl }) => ({
  tag,
  schedulingControl,
}))
class PageList extends MultiPage {
  // showCallProcess = true;

  componentAuthority = accessWayCollection.tag.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '标签列表',
      paramsKey: accessWayCollection.tag.pageList.paramsKey,
      loadApiPath: 'tag/pageList',
      dateRangeFieldName: '创建时间',
      currentRecord: null,
    };
  }

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'toggleRecommend': {
        this.toggleRecommend(handleData);
        break;
      }

      case 'updateSort': {
        this.showChangeSortModal(handleData);
        break;
      }

      case 'updateType': {
        this.showChangeTypeModal(handleData);
        break;
      }

      case 'setEnable': {
        this.setEnable(handleData);
        break;
      }

      case 'setDisable': {
        this.setDisable(handleData);
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

  toggleRecommend = (r) => {
    toggleRecommendAction({
      target: this,
      handleData: r,
      successCallback: ({ target, handleData, remoteData }) => {
        handleItemWhetherRecommend({ target, handleData, remoteData });
      },
    });
  };

  setEnable = (r) => {
    setEnableAction({
      target: this,
      handleData: r,
      successCallback: ({ target, handleData, remoteData }) => {
        handleItemStatus({ target, handleData, remoteData });
      },
    });
  };

  setDisable = (r) => {
    setDisableAction({
      target: this,
      handleData: r,
      successCallback: ({ target, handleData, remoteData }) => {
        handleItemStatus({ target, handleData, remoteData });
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

  showChangeTypeModal = (r) => {
    this.setState({ currentRecord: r }, () => {
      ChangeTypeModal.open();
    });
  };

  afterChangeTypeModalClose = ({
    flag,
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
    if (!flag) {
      return;
    }

    handleItemType({
      target: this,
      handleData: submitData,
      remoteData: singleData,
    });

    this.forceUpdate();
  };

  goToEdit = (record) => {
    const { tagId } = record;

    this.goToPath(`/data/tag/edit/load/${tagId}/key/basicInfo`);
  };

  fillSearchCardInitialValues = () => {
    const values = {};

    values[fieldData.whetherRecommend.name] = unlimitedWithStringFlag.flag;

    return values;
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 5,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.tagId,
        },
        {
          lg: 5,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.name,
        },
        {
          lg: 5,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.displayName,
        },
        {
          lg: 5,
          type: searchCardConfig.contentItemType.whetherSelect,
          fieldData: fieldData.whetherRecommend,
        },
        {
          lg: 4,
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
        icon: iconBuilder.plus(),
        text: '创建标签',
        handleClick: this.showAddBasicInfoDrawer,
      },
    ];
  };

  establishListItemDropdownConfig = (record) => {
    const status = getValueByKey({
      data: record,
      key: fieldData.status.name,
      convert: convertCollection.number,
    });

    return {
      size: 'small',
      text: '编辑',
      icon: iconBuilder.edit(),
      disabled: !checkHasAuthority(accessWayCollection.tag.get.permission),
      handleButtonClick: ({ handleData }) => {
        this.goToEdit(handleData);
      },
      handleData: record,
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'updateSort',
          icon: iconBuilder.edit(),
          text: '设置排序值',
        },
        {
          key: 'updateType',
          icon: iconBuilder.edit(),
          text: '设置适用对象',
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'toggleRecommend',
          icon: iconBuilder.swap(),
          text: '切换推荐',
          hidden: !checkHasAuthority(
            accessWayCollection.tag.toggleRecommend.permission,
          ),
          confirm: true,
          title: '将要切换推荐设置，确定吗？',
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'setEnable',
          icon: iconBuilder.playCircle(),
          text: '设为启用',
          disabled: status === statusCollection.enable,
          hidden: !checkHasAuthority(
            accessWayCollection.tag.setEnable.permission,
          ),
          confirm: true,
          title: '将要设为启用，确定吗？',
        },
        {
          key: 'setDisable',
          icon: iconBuilder.pauseCircle(),
          text: '设为禁用',
          disabled: status === statusCollection.disable,
          hidden: !checkHasAuthority(
            accessWayCollection.tag.setDisable.permission,
          ),
          confirm: true,
          title: '将要设为禁用，确定吗？',
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'remove',
          icon: iconBuilder.delete(),
          text: '移除标签',
          hidden: !checkHasAuthority(accessWayCollection.tag.remove.permission),
          confirm: true,
          title: '将要移除标签，确定吗？',
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'refreshCache',
          icon: iconBuilder.reload(),
          text: '刷新缓存',
          hidden: !checkHasAuthority(
            accessWayCollection.tag.refreshCache.permission,
          ),
          confirm: true,
          title: '将要刷新缓存，确定吗？',
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
      dataTarget: fieldData.displayName,
      width: 200,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.image,
      width: 60,
      showRichFacade: true,
      facadeMode: columnFacadeMode.image,
    },
    {
      dataTarget: fieldData.color,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      hidden: !checkHasAuthority(
        accessWayCollection.tag.updateColor.permission,
      ),
      render: (value) => {
        return (
          <div>
            <FlexBox
              flexAuto="right"
              style={{
                border: '1px solid #ccc',
                borderRadius: '4px',
                overflow: 'hidden',
                padding: '2px',
              }}
              left={
                <CenterBox>
                  <div
                    style={{
                      backgroundColor: value,
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      width: '20px',
                      height: '20px',
                      overflow: 'hidden',
                    }}
                  />
                </CenterBox>
              }
              right={<CenterBox>{value || '无色值'}</CenterBox>}
            />
          </div>
        );
      },
    },
    {
      dataTarget: fieldData.sort,
      width: 80,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.displayRangeNote,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.type,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) + 15,
          }),
        };
      },
      formatValue: (value) => {
        return getTagTypeName({
          value: value,
        });
      },
    },
    {
      dataTarget: fieldData.businessMode,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) + 9,
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
      align: 'center',
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
      dataTarget: fieldData.status,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeMode: columnFacadeMode.badge,
      facadeConfigBuilder: (value) => {
        return {
          status: getStatusBadge(value),
          text: getTagStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.tagId,
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

  renderPresetOther = () => {
    const { currentRecord } = this.state;

    return (
      <>
        <AddBasicInfoDrawer afterOK={this.afterAddBasicInfoDrawerOk} />

        <ChangeSortModal
          externalData={currentRecord}
          afterOK={this.afterChangeSortModalOk}
        />

        <ChangeTypeModal
          externalData={currentRecord}
          afterClose={this.afterChangeTypeModalClose}
        />
      </>
    );
  };
}

export default PageList;
