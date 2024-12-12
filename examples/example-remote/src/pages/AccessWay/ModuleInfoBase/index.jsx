import { List } from 'antd';

import {
  getValueByKey,
  isArray,
  isEmptyArray,
  pretreatmentRequestParameters,
  showSimpleErrorMessage,
} from 'easy-soft-utility';

import { listViewConfig } from 'antd-management-fast-common';
import {
  buildDropdown,
  buildTagList,
  ColorText,
  EverySpace,
  FlexText,
  iconBuilder,
  IconInfo,
  StatusBar,
} from 'antd-management-fast-component';
import { DataSinglePageView } from 'antd-management-fast-framework';

import { fieldData } from '../Common/data';

const { InnerSinglePage } = DataSinglePageView;

class ModuleInfoBase extends InnerSinglePage {
  pageValues = {
    pageNo: 1,
    frontendPageNo: 1,
    pageSize: 6,
  };

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      listViewMode: listViewConfig.viewMode.list,
      canOperate: true,
      removeModuleApiPath: '',
      currentRecord: null,
    };
  }

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'changeExpand': {
        this.showUpdateModuleModal(handleData);
        break;
      }

      default: {
        showSimpleErrorMessage('can not find matched key');
        break;
      }
    }
  };

  supplementSubmitRequestParams = (o) => o;

  // eslint-disable-next-line no-unused-vars
  removeModule = (record) => {
    const text = 'removeModule need be override';

    showSimpleErrorMessage(text);
  };

  openModuleDrawer = () => {
    throw new Error('showModuleDrawer need overrode to implement');
  };

  openUpdateModuleModal = () => {
    throw new Error('openUpdateModuleModal need overrode to implement');
  };

  openModuleTreeDrawer = () => {
    throw new Error('openModuleTreeDrawer need overrode to implement');
  };

  showModuleDrawer = () => {
    this.openModuleDrawer();
  };

  showModuleTreeDrawer = () => {
    this.openModuleTreeDrawer();
  };

  showUpdateModuleModal = (record) => {
    const that = this;

    that.setState(
      {
        currentRecord: record,
      },
      () => {
        that.openUpdateModuleModal();
      },
    );
  };

  afterOperateSuccess = () => {
    this.reloadDataWithReloadAnimalPrompt({ delay: 650 });

    this.reloadByUrl();
  };

  afterUpdateModuleModalClose = () => {
    this.reloadDataWithReloadAnimalPrompt({ delay: 650 });
  };

  establishDataContainerExtraActionCollectionConfig = () => {
    return [
      {
        buildType:
          listViewConfig.dataContainerExtraActionBuildType.generalButton,
        type: 'default',
        icon: iconBuilder.inbox(),
        text: '已选模块树型展示',
        handleClick: this.showModuleTreeDrawer,
      },
      {
        buildType:
          listViewConfig.dataContainerExtraActionBuildType.generalButton,
        type: 'primary',
        icon: iconBuilder.plusCircle(),
        text: '增加模块',
        handleClick: this.showModuleDrawer,
      },
    ];
  };

  renderExpansionSetCollection = (expansionSetCollection) => {
    if (
      !isArray(expansionSetCollection) ||
      isEmptyArray(expansionSetCollection)
    ) {
      return '无';
    }

    return buildTagList({
      list: [
        // {
        //   key: `${item.name}_${item.indexNo}`,
        //   text: item.name,
        //   color: item.value === '1' ? '#87d068' : '',
        // },
      ],
    });
  };

  establishListViewItemLayout = () => {
    return 'vertical';
  };

  establishListViewSize = () => {
    return 'small';
  };

  // eslint-disable-next-line no-unused-vars
  renderPresetListViewItemInner = (record, index) => {
    const { canOperate } = this.state;

    const name = getValueByKey({
      data: record,
      key: fieldData.name.name,
    });

    const guidTag = getValueByKey({
      data: record,
      key: fieldData.guidTag.name,
    });

    const relativePath = getValueByKey({
      data: record,
      key: fieldData.relativePath.name,
    });

    return (
      <>
        <List.Item.Meta
          title={<ColorText textPrefix={fieldData.name.label} text={name} />}
        />

        <FlexText
          textPrefix={fieldData.relativePath.label}
          text={relativePath}
        />

        <FlexText
          textPrefix={fieldData.expand.label}
          text={this.renderExpansionSetCollection(
            record.additional.expansionSetCollection,
          )}
        />

        <EverySpace size={6} direction="horizontal" />

        <div>
          <StatusBar
            actions={[
              <IconInfo
                key={guidTag}
                textPrefix={fieldData.guidTag.label}
                text={guidTag}
              />,
            ]}
            extra={
              canOperate
                ? buildDropdown({
                    placement: 'topRight',
                    size: 'small',
                    text: '移除权限',
                    icon: iconBuilder.delete(),
                    handleButtonClick: ({ handleData }) => {
                      let submitData = pretreatmentRequestParameters(
                        {},
                        (d) => {
                          const o = d;

                          o.guidTag = getValueByKey({
                            data: handleData,
                            key: fieldData.guidTag.name,
                          });

                          return o;
                        },
                      );

                      submitData =
                        this.supplementSubmitRequestParams(submitData);

                      this.removeModule(submitData);
                    },
                    handleData: record,
                    handleMenuClick: ({ key, handleData }) => {
                      this.handleMenuClick({ key, handleData });
                    },
                    confirm: true,
                    title: '即将移除权限，确定码？',
                    items: [
                      {
                        key: 'changeExpand',
                        icon: iconBuilder.form(),
                        text: '更改附加权限',
                        disabled: record.expansionSet === '',
                      },
                    ],
                  })
                : null
            }
          />
        </div>
      </>
    );
  };
}

export default ModuleInfoBase;
