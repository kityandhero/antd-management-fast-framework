import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  getValueByKey,
  showSimpleErrorMessage,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  defaultEmptyImage,
  dropdownExpandItemType,
  listViewConfig,
  searchCardConfig,
} from 'antd-management-fast-common';
import {
  buildListViewItemExtra,
  buildListViewItemInnerWithDropdownButton,
  iconBuilder,
} from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../../../customConfig';
import { refreshKeyValueCacheAction } from '../../../Assist/action';
import { fieldDataDefaultImage } from '../../../Common/data';
import { UpdateDefaultImageModal } from '../../../UpdateDefaultImageModal';

const { InnerMultiPage } = DataMultiPageView;

@connect(({ currentManagementInfrastructure, schedulingControl }) => ({
  currentManagementInfrastructure,
  schedulingControl,
}))
class PageList extends InnerMultiPage {
  // showCallProcess = true;

  componentAuthority =
    accessWayCollection.currentManagementInfrastructure.pageListDefaultImage
      .permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      listViewMode: listViewConfig.viewMode.list,
      pageTitle: '默认图片配置单页列表',
      loadApiPath: 'currentManagementInfrastructure/pageListDefaultImage',
      currentRecord: null,
    };
  }

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'showUpdateDefaultImageModal': {
        this.showUpdateDefaultImageModal(handleData);
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

  refreshCache = (r) => {
    refreshKeyValueCacheAction({
      target: this,
      handleData: r,
    });
  };

  showUpdateDefaultImageModal = (item) => {
    this.setState(
      {
        currentRecord: item,
      },
      () => {
        UpdateDefaultImageModal.open();
      },
    );
  };

  afterUpdateDefaultImageModalOk = () => {
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
          fieldData: fieldDataDefaultImage.title,
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

  establishDataContainerExtraAffixConfig = () => {
    return {
      affix: true,
      offsetTop: 10,
    };
  };

  renderPresetListViewItemExtra = (record, index) => {
    return buildListViewItemExtra({
      index,
      imageUrl: getValueByKey({
        data: record,
        key: fieldDataDefaultImage.value.name,
        defaultValue: defaultEmptyImage,
      }),
    });
  };

  // eslint-disable-next-line no-unused-vars
  renderPresetListViewItemInner = (item, index) => {
    return buildListViewItemInnerWithDropdownButton({
      title: {
        label: fieldDataDefaultImage.title.label,
        text: getValueByKey({
          data: item,
          key: fieldDataDefaultImage.title.name,
        }),
      },
      descriptionList: [
        {
          label: fieldDataDefaultImage.value.label,
          text: getValueByKey({
            data: item,
            key: fieldDataDefaultImage.value.name,
            defaultValue: '暂无',
          }),
          color: '#999999',
        },
      ],
      actionList: [
        {
          label: fieldDataDefaultImage.key.label,
          text: getValueByKey({
            data: item,
            key: fieldDataDefaultImage.key.name,
          }),
          canCopy: true,
          color: '#999999',
        },
        {
          label: fieldDataDefaultImage.tag.label,
          text: getValueByKey({
            data: item,
            key: fieldDataDefaultImage.tag.name,
            defaultValue: '暂无',
          }),
          color: '#999999',
        },
      ],
      extra: {
        size: 'small',
        text: '设置',
        placement: 'topRight',
        icon: iconBuilder.edit(),
        disabled: !checkHasAuthority(
          accessWayCollection.currentManagementInfrastructure.updateKeyValueInfo
            .permission,
        ),
        handleButtonClick: ({ handleData }) => {
          this.showUpdateDefaultImageModal(handleData);
        },
        handleData: item,
        handleMenuClick: ({ key, handleData }) => {
          this.handleMenuClick({ key, handleData });
        },
        items: [
          {
            withDivider: true,
            uponDivider: true,
            key: 'refreshCache',
            icon: iconBuilder.reload(),
            text: '刷新缓存',
            confirm: true,
            title: '将要刷新缓存，确定吗？',
          },
        ],
      },
    });
  };

  establishListItemDropdownConfig = (item) => {
    return {
      size: 'small',
      text: '设置',
      placement: 'topRight',
      icon: iconBuilder.form(),
      disabled: !checkHasAuthority(
        accessWayCollection.currentManagementInfrastructure.updateKeyValueInfo
          .permission,
      ),
      handleButtonClick: ({ handleData }) => {
        this.showUpdateDefaultImageModal(handleData);
      },
      handleData: item,
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'refreshCache',
          icon: iconBuilder.reload(),
          text: '刷新缓存',
          confirm: true,
          title: '将要刷新缓存，确定吗？',
        },
      ],
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldDataDefaultImage.title,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldDataDefaultImage.value,
      width: 60,
      showRichFacade: true,
      facadeMode: columnFacadeMode.image,
    },
    {
      dataTarget: fieldDataDefaultImage.key,
      width: 320,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldDataDefaultImage.tag,
      width: 280,
      showRichFacade: true,
      emptyValue: '--',
    },
  ];

  renderPresetOther = () => {
    const { currentRecord } = this.state;

    const renderUpdateDefaultImageModal = checkHasAuthority(
      accessWayCollection.currentManagementInfrastructure.updateKeyValueInfo
        .permission,
    );

    return (
      <>
        {renderUpdateDefaultImageModal ? (
          <UpdateDefaultImageModal
            externalData={currentRecord}
            afterOK={() => {
              this.afterUpdateDefaultImageModalOk();
            }}
          />
        ) : null}
      </>
    );
  };
}

export default PageList;
