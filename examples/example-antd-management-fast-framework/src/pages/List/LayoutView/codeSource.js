export const code = `import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  convertCollection,
  getValueByKey,
  handleItem,
  showSimpleInfoMessage,
} from 'easy-soft-utility';

import {
  buildRandomHexColor,
  columnFacadeMode,
  columnPlaceholder,
  listViewConfig,
  logTemplate,
  searchCardConfig,
} from 'antd-management-fast-common';
import { iconBuilder, SyntaxHighlighter } from 'antd-management-fast-component';
import { Card } from 'antd-management-fast-formily';
import { DataMultiPageView } from 'antd-management-fast-framework';

import {
  refreshCacheAction,
  setOfflineAction,
  setOnlineAction,
} from '../../../businessAssists/action';
import { getStatusBadge } from '../../../businessAssists/tools';
import { fieldData, statusCollection } from '../../../businessData/data';
import { accessWayCollection, colorCollection } from '../../../customConfig';
import {
  getSimpleRenderTypeName,
  getSimpleStatusName,
} from '../../../customSpecialComponents';

import { code as codeView } from './codeSource';

const { MultiPage } = DataMultiPageView;

@connect(({ simple, schedulingControl }) => ({
  simple,
  schedulingControl,
}))
class PageList extends MultiPage {
  showCallProcess = true;

  pageValues = {
    pageNo: 1,
    frontendPageNo: 1,
    pageSize: 4,
  };

  componentAuthority = accessWayCollection.simple.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      listViewMode: listViewConfig.viewMode.table,
      pageTitle: '列表示例',
      paramsKey: accessWayCollection.simple.pageList.paramsKey,
      loadApiPath: 'simple/pageList',
      dateRangeFieldName: '创建时间',
      currentRecord: null,
      currentCode: codeView,
    };
  }

  handleItemStatus = ({ target, handleData, remoteData }) => {
    const simpleId = getValueByKey({
      data: handleData,
      key: fieldData.simpleId.name,
    });

    handleItem({
      target,
      value: simpleId,
      compareValueHandler: (o) => {
        const { simpleId: v } = o;

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

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'setOnline': {
        this.setOnline(handleData);
        break;
      }

      case 'setOffline': {
        this.setOffline(handleData);
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

  setOnline = (r) => {
    setOnlineAction({
      target: this,
      handleData: r,
      successCallback: ({ target, handleData, remoteData }) => {
        target.handleItemStatus({ target, handleData, remoteData });
      },
    });
  };

  setOffline = (r) => {
    setOfflineAction({
      target: this,
      handleData: r,
      successCallback: ({ target, handleData, remoteData }) => {
        target.handleItemStatus({ target, handleData, remoteData });
      },
    });
  };

  refreshCache = (r) => {
    refreshCacheAction({
      target: this,
      handleData: r,
    });
  };

  goToAdd = () => {
    this.goToPath(\`/simple/add\`);
  };

  goToEdit = (record) => {
    const { simpleId } = record;

    this.goToPath(\`/simple/edit/load/\${simpleId}/key/basicInfo\`);
  };

  establishSearchCardConfig = () => {
    const { dateRangeFieldName } = this.state;

    return {
      list: [
        {
          lg: 6,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.simpleId,
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.title,
        },
        {
          lg: 12,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.subtitle,
          // hidden: true,
        },
        {
          lg: 12,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardRangePickerCore(dateRangeFieldName),
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
        buildType: listViewConfig.dataContainerExtraActionBuildType.colorPicker,
        value: '#412DE6',
      },
      {
        buildType:
          listViewConfig.dataContainerExtraActionBuildType
            .generalExtraColorPicker,
        value: '#11FDa6',
      },
      {
        buildType: listViewConfig.dataContainerExtraActionBuildType.divider,
      },
      {
        buildType:
          listViewConfig.dataContainerExtraActionBuildType.generalButton,
        type: 'primary',
        icon: iconBuilder.plus(),
        text: '增加信息',
        handleClick: this.goToAdd,
      },
    ];
  };

  establishListItemDropdownConfig = (record) => {
    const itemStatus = getValueByKey({
      data: record,
      key: fieldData.status.name,
      convert: convertCollection.number,
    });

    return {
      size: 'small',
      text: '编辑',
      placement: 'topRight',
      icon: iconBuilder.form(),
      handleButtonClick: ({ handleData }) => {
        this.goToEdit(handleData);
      },
      handleData: record,
      confirm: true,
      title: '将要进行编辑，确定吗？',
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'showUpdateBasicInfoDrawer',
          icon: iconBuilder.edit(),
          text: '编辑[侧拉]',
          hidden: !checkHasAuthority(
            accessWayCollection.simple.updateBasicInfo.permission,
          ),
        },
        {
          key: 'contentInfo',
          icon: iconBuilder.edit(),
          text: '编辑图文',
          hidden: !checkHasAuthority(
            accessWayCollection.simple.updateContentInfo.permission,
          ),
        },
        {
          key: 'setOnline',
          withDivider: true,
          uponDivider: true,
          icon: iconBuilder.playCircle(),
          text: '设为上线',
          hidden: !checkHasAuthority(
            accessWayCollection.simple.setOnline.permission,
          ),
          disabled: itemStatus === statusCollection.online,
          confirm: true,
          title: '将要设置为上线，确定吗？',
        },
        {
          key: 'setOffline',
          icon: iconBuilder.pauseCircle(),
          text: '设为下线',
          hidden: !checkHasAuthority(
            accessWayCollection.simple.setOffline.permission,
          ),
          disabled: itemStatus === statusCollection.offline,
          confirm: true,
          title: '将要设置为下线，确定吗？',
        },
        {
          key: 'setSort',
          withDivider: true,
          uponDivider: true,
          icon: iconBuilder.edit(),
          text: '设置排序值',
          hidden: !checkHasAuthority(
            accessWayCollection.simple.updateSort.permission,
          ),
        },
        {
          key: 'refreshCache',
          withDivider: true,
          uponDivider: true,
          icon: iconBuilder.reload(),
          text: '刷新缓存',
          hidden: !checkHasAuthority(
            accessWayCollection.simple.refreshCache.permission,
          ),
          confirm: true,
          title: '将要刷新缓存，确定吗？',
        },
      ],
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.title,
      width: 620,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
      facadeConfig: {
        color: '#6587df',
        valPrefix: '标题',
        valPrefixStyle: { color: '#333', width: '34px' },
        separator: ': ',
        separatorStyle: { color: '#3e4523', width: '10px' },
        icon: iconBuilder.read(),
        addonBefore: iconBuilder.eye(),
        addonAfter: iconBuilder.bell(),
        onClick: (value, record, index) => {
          logTemplate({ value, record, index });

          showSimpleInfoMessage(\`click title: \${value}\`);
        },
      },
    },
    {
      dataTarget: fieldData.image,
      width: 100,
      showRichFacade: true,
      facadeConfig: {
        circle: false,
      },
      facadeMode: columnFacadeMode.image,
    },
    {
      dataTarget: fieldData.description,
      width: 620,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
      hidden: true,
    },
    {
      dataTarget: fieldData.sort,
      width: 100,
      showRichFacade: true,
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: value,
          }),
        };
      },
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.renderType,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfig: {
        color: colorCollection.price,
      },
      formatValue: (value) => {
        return getSimpleRenderTypeName({
          value: value,
        });
      },
    },
    {
      dataTarget: fieldData.status,
      width: 100,
      emptyValue: '--',
      showRichFacade: true,
      facadeMode: columnFacadeMode.badge,
      facadeConfigBuilder: (value) => {
        return {
          status: getStatusBadge(value),
          text: getSimpleStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.simpleId,
      width: 140,
      align: 'center',
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: fieldData.createTime,
      width: 160,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
      emptyValue: '--',
    },
    columnPlaceholder,
  ];

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '简要说明:这里可以显示需要提示的信息。',
        },
        {
          text: '简要说明:这里可以显示需要提示的信息。',
        },
      ],
    };
  };

  renderPresetPageBodyTop = () => {
    return (
      <div
        style={{
          border: '1px solid red',
          padding: '10px',
          textAlign: 'center',
          marginBottom: '10px',
        }}
      >
        Top Area
      </div>
    );
  };

  renderPresetContentFooter = () => {
    const { currentCode } = this.state;

    return (
      <Card title="代码示例">
        <SyntaxHighlighter
          language="js"
          value={currentCode}
          showLineNumbers={false}
          wrapLines={false}
        />
      </Card>
    );
  };
}

export default PageList;
`;
