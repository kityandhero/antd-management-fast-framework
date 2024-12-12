import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  convertCollection,
  getValueByKey,
  isArray,
  showSimpleErrorMessage,
  sortCollectionByKey,
  sortOperate,
} from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { buildDropdown, iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { fieldData, navigationItemData } from '../Common/data';
import { buildSortTable } from '../Component/FunctionComponent';

const { BaseUpdateDrawer } = DataDrawer;

const visibleFlag = '210cb8eaf28b4595b7f40041fac5ff25';

@connect(({ applicationNavigation, schedulingControl }) => ({
  applicationNavigation,
  schedulingControl,
}))
class SortNavigationItemDrawer extends BaseUpdateDrawer {
  componentAuthority =
    accessWayCollection.applicationNavigation.updateBasicInfo.permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      loadApiPath: 'applicationNavigation/get',
      submitApiPath: 'applicationNavigation/setNavigationCollectionSort',
      imageUrl: '',
      appHeadImage: '',
      navigationItemList: [],
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d.applicationNavigationId = getValueByKey({
      data: externalData,
      key: fieldData.applicationNavigationId.name,
    });

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { externalData, navigationItemList } = this.state;

    d.applicationNavigationId = getValueByKey({
      data: externalData,
      key: fieldData.applicationNavigationId.name,
    });

    d.ids = (isArray(navigationItemList) ? navigationItemList : [])
      .map((one) => {
        const v = getValueByKey({
          data: one,
          key: navigationItemData.id.name,
        });

        return v;
      })
      .join(',');

    return d;
  };

  doOtherAfterLoadSuccess = ({
    metaData,
    // eslint-disable-next-line no-unused-vars
    metaListData,
    // eslint-disable-next-line no-unused-vars
    metaExtra,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData,
  }) => {
    this.setState({ navigationItemList: metaData.navigationItemList || [] });
  };

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case sortOperate.moveUp: {
        this.changeSort(key, handleData);
        break;
      }

      case sortOperate.moveDown: {
        this.changeSort(key, handleData);
        break;
      }

      default: {
        showSimpleErrorMessage('can not find matched key');
        break;
      }
    }
  };

  changeSort = (key, record) => {
    const { navigationItemList } = this.state;

    this.setState({
      navigationItemList: sortCollectionByKey({
        operate: key,
        item: record,
        list: navigationItemList,
        key: 'sort',
        sortInitialValue: 0,
      }),
    });
  };

  renderPresetTitle = () => {
    return '编辑选项信息';
  };

  fillInitialValuesAfterLoad = ({
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const values = {};

    if (metaData != null) {
      values[fieldData.name.name] = getValueByKey({
        data: metaData,
        key: fieldData.name.name,
      });

      values[fieldData.targetPath.name] = getValueByKey({
        data: metaData,
        key: fieldData.targetPath.name,
        convert: convertCollection.string,
      });
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    const { metaData, navigationItemList } = this.state;

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '基本信息',
          },
          hasExtra: true,
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.onlyShowInput,
              fieldData: fieldData.name,
              value: getValueByKey({
                data: metaData,
                key: fieldData.name.name,
              }),
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.onlyShowInput,
              fieldData: fieldData.targetPath,
              value: getValueByKey({
                data: metaData,
                key: fieldData.targetPath.name,
              }),
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.sortAscending(),
            text: '排序导航',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: buildSortTable({
                target: this,
                list: navigationItemList,
                props: {
                  buildOperate: ({ record }) => {
                    const sort = getValueByKey({
                      data: record,
                      key: navigationItemData.sort.name,
                      convert: convertCollection.number,
                    });

                    return buildDropdown({
                      size: 'small',
                      text: '变更',
                      icon: iconBuilder.sortAscending(),
                      disabled: !checkHasAuthority(
                        accessWayCollection.applicationNavigation
                          .getNavigationItem.permission,
                      ),
                      handleData: record,
                      handleMenuClick: ({ key, handleData }) => {
                        this.handleMenuClick({ key, handleData });
                      },
                      items: [
                        {
                          key: sortOperate.moveUp,
                          icon: iconBuilder.arrowUp(),
                          text: '向上移动',
                          hidden: !checkHasAuthority(
                            accessWayCollection.applicationNavigation
                              .setNavigationCollectionSort.permission,
                          ),
                          disabled: sort === 0,
                        },
                        {
                          key: sortOperate.moveDown,
                          icon: iconBuilder.arrowDown(),
                          text: '向下移动',
                          hidden: !checkHasAuthority(
                            accessWayCollection.applicationNavigation
                              .setNavigationCollectionSort.permission,
                          ),
                          disabled:
                            sort === (navigationItemList || []).length - 1,
                        },
                      ],
                    });
                  },
                },
              }),
            },
          ],
        },
      ],
    };
  };
}

export { SortNavigationItemDrawer };
