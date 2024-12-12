import React from 'react';

import { connect } from 'easy-soft-dva';
import { checkHasAuthority, showSimpleErrorMessage } from 'easy-soft-utility';

import {
  dropdownExpandItemType,
  searchCardConfig,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { refreshCacheAction } from '../Assist/action';
import { fieldData } from '../Common/data';
import { FieldAllContentInfrastructureDrawer } from '../FieldAllContentInfrastructureDrawer';
import { FieldCustomContentInfrastructureDrawer } from '../FieldCustomContentInfrastructureDrawer';
import { FieldInheritedContentInfrastructureDrawer } from '../FieldInheritedContentInfrastructureDrawer';
import { SqlContentInfrastructureDrawer } from '../SqlContentInfrastructureDrawer';

const { MultiPage } = DataMultiPageView;

@connect(({ sqlEntity, schedulingControl }) => ({
  sqlEntity,
  schedulingControl,
}))
class PageList extends MultiPage {
  componentAuthority =
    accessWayCollection.sqlEntity.pageListInfrastructure.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '数据实体列表',
      paramsKey: accessWayCollection.sqlEntity.pageListInfrastructure.paramsKey,
      loadApiPath: 'sqlEntity/pageListInfrastructure',
      currentRecord: null,
    };
  }

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'showFieldAllContentDrawer': {
        this.showFieldAllContentDrawer(handleData);
        break;
      }

      case 'showFieldCustomContentDrawer': {
        this.showFieldCustomContentDrawer(handleData);
        break;
      }

      case 'showFieldInheritedContentDrawer': {
        this.showFieldInheritedContentDrawer(handleData);
        break;
      }

      default: {
        showSimpleErrorMessage('can not find matched key');
        break;
      }
    }
  };

  refreshCache = (record) => {
    refreshCacheAction({
      target: this,
      handleData: record,
    });
  };

  showSqlContentDrawer = (record) => {
    this.setState(
      {
        currentRecord: record,
      },
      () => {
        SqlContentInfrastructureDrawer.open();
      },
    );
  };

  showFieldAllContentDrawer = (record) => {
    this.setState(
      {
        currentRecord: record,
      },
      () => {
        FieldAllContentInfrastructureDrawer.open();
      },
    );
  };

  showFieldCustomContentDrawer = (record) => {
    this.setState(
      {
        currentRecord: record,
      },
      () => {
        FieldCustomContentInfrastructureDrawer.open();
      },
    );
  };

  showFieldInheritedContentDrawer = (record) => {
    this.setState(
      {
        currentRecord: record,
      },
      () => {
        FieldInheritedContentInfrastructureDrawer.open();
      },
    );
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

  establishListItemDropdownConfig = (item) => {
    return {
      size: 'small',
      text: '查阅',
      icon: iconBuilder.read(),
      disabled: !checkHasAuthority(
        accessWayCollection.sqlEntity.getInfrastructure.permission,
      ),
      handleButtonClick: ({ handleData }) => {
        this.showSqlContentDrawer(handleData);
      },
      handleData: item,
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'showFieldCustomContentDrawer',
          icon: iconBuilder.read(),
          text: '自定义字段信息',
          hidden: !checkHasAuthority(
            accessWayCollection.sqlEntity.getBusiness.permission,
          ),
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'showFieldInheritedContentDrawer',
          icon: iconBuilder.read(),
          text: '继承字段信息',
          hidden: !checkHasAuthority(
            accessWayCollection.sqlEntity.getBusiness.permission,
          ),
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'showFieldAllContentDrawer',
          icon: iconBuilder.read(),
          text: '所有字段信息',
          hidden: !checkHasAuthority(
            accessWayCollection.sqlEntity.getBusiness.permission,
          ),
        },
      ],
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.name,
      width: 320,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.label,
      width: 280,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.tableName,
      width: 380,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.namespace,
      showRichFacade: true,
      emptyValue: '--',
    },
    // {
    //   dataTarget: fieldData.assemblyFullName,
    //   width: 200,
    //   showRichFacade: true,
    //   emptyValue: '--',
    // },
  ];

  renderPresetOther = () => {
    const { currentRecord } = this.state;

    return (
      <>
        <SqlContentInfrastructureDrawer
          maskClosable
          externalData={currentRecord}
        />

        <FieldAllContentInfrastructureDrawer
          maskClosable
          externalData={currentRecord}
        />

        <FieldCustomContentInfrastructureDrawer
          maskClosable
          externalData={currentRecord}
        />

        <FieldInheritedContentInfrastructureDrawer
          maskClosable
          externalData={currentRecord}
        />
      </>
    );
  };
}

export default PageList;
