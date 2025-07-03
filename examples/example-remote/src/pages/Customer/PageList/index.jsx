import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  getValueByKey,
  handleItem,
  showSimpleErrorMessage,
  toNumber,
  whetherNumber,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  dropdownExpandItemType,
  searchCardConfig,
} from 'antd-management-fast-common';
import {
  iconBuilder,
  iconModeCollection,
} from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection, colorCollection } from '../../../customConfig';
import { modelTypeCollection } from '../../../modelBuilders';
import { refreshCacheAction, togglePhoneVerifyAction } from '../Assist/action';
import { fieldData } from '../Common/data';

const { MultiPage } = DataMultiPageView;

@connect(({ customer, schedulingControl }) => ({
  customer,
  schedulingControl,
}))
class PageList extends MultiPage {
  componentAuthority = accessWayCollection.customer.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '顾客列表',
      paramsKey: accessWayCollection.customer.pageList.paramsKey,
      loadApiPath: modelTypeCollection.customerTypeCollection.pageList,
      currentRecord: null,
    };
  }

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'togglePhoneVerify': {
        this.togglePhoneVerify(handleData);
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

  togglePhoneVerify = (record) => {
    togglePhoneVerifyAction({
      target: this,
      handleData: record,
      successCallback: ({ target, remoteData }) => {
        const id = getValueByKey({
          data: remoteData,
          key: fieldData.customerId.name,
        });

        handleItem({
          target,
          value: id,
          compareValueHandler: (o) => {
            return getValueByKey({
              data: o,
              key: fieldData.customerId.name,
            });
          },
          handler: (d) => {
            const o = d;

            o[fieldData.whetherPhoneVerify.name] = getValueByKey({
              data: remoteData,
              key: fieldData.whetherPhoneVerify.name,
            });

            o[fieldData.whetherPhoneVerifyNote.name] = getValueByKey({
              data: remoteData,
              key: fieldData.whetherPhoneVerifyNote.name,
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

  goToEdit = (record) => {
    const customerId = getValueByKey({
      data: record,
      key: fieldData.customerId.name,
      defaultValue: '',
    });

    this.goToPath(
      `/frontEndUser/customer/edit/load/${customerId}/key/basicInfo`,
    );
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 6,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.nickname,
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.realName,
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
    return {
      size: 'small',
      text: '修改',
      icon: iconBuilder.edit(),
      disabled: !checkHasAuthority(accessWayCollection.customer.get.permission),
      handleButtonClick: ({ handleData }) => {
        this.goToEdit(handleData);
      },
      handleData: item,
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'togglePhoneVerify',
          icon: iconBuilder.swap(),
          text: '切换手机认证',
          hidden: !checkHasAuthority(
            accessWayCollection.customer.togglePhoneVerify.permission,
          ),
          confirm: true,
          title: '将要切换手机认证状态，确定吗？',
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'refreshCache',
          icon: iconBuilder.reload(),
          text: '刷新缓存',
          hidden: !checkHasAuthority(
            accessWayCollection.customer.refreshCache.permission,
          ),
          confirm: true,
          title: '即将刷新缓存，确定吗？',
        },
      ],
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.avatar,
      width: 60,
      showRichFacade: true,
      facadeMode: columnFacadeMode.image,
    },
    {
      dataTarget: fieldData.friendlyName,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.phone,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.whetherPhoneVerify,
      width: 140,
      showRichFacade: true,
      emptyValue: '--',
      render: (value) => (
        <>
          {toNumber(value) === whetherNumber.yes
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
      dataTarget: fieldData.realName,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.nickname,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.customerId,
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
          text: '友好姓名是根据姓名、昵称以及Id等的数据完备情况择优显示.',
        },
      ],
    };
  };
}

export default PageList;
