import { Button } from 'antd';

import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  convertCollection,
  getValueByKey,
  handleItem,
} from 'easy-soft-utility';

import {
  defaultEmptyImage,
  listViewConfig,
  searchCardConfig,
} from 'antd-management-fast-common';
import {
  buildListViewItemExtra,
  buildListViewItemInnerWithDropdownButton,
  ColorText,
  FunctionSupplement,
  iconBuilder,
  SyntaxHighlighter,
} from 'antd-management-fast-component';
import { Card } from 'antd-management-fast-formily';
import { DataMultiPageView } from 'antd-management-fast-framework';

import {
  refreshCacheAction,
  setOfflineAction,
  setOnlineAction,
} from '../../../businessAssists/action';
import { fieldData, statusCollection } from '../../../businessData/data';
import { accessWayCollection } from '../../../customConfig';
import { getSimpleStatusName } from '../../../customSpecialComponents';

import { code as codeView } from './codeSource';

const { MultiPage } = DataMultiPageView;
const {
  Whether: { getWhetherName },
} = FunctionSupplement;

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
      listViewMode: listViewConfig.viewMode.list,
      pageTitle: '表格上方提示示例',
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
    this.goToPath(`/simple/add`);
  };

  goToEdit = (record) => {
    const { simpleId } = record;

    this.goToPath(`/simple/edit/load/${simpleId}/key/basicInfo`);
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 5,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.simpleId,
        },
        {
          lg: 5,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.shortName,
        },
        {
          lg: 5,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.fullName,
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
        text: '增加信息',
        handleClick: this.goToAdd,
      },
    ];
  };

  establishListViewItemLayout = () => {
    return 'vertical';
  };

  establishPresetAboveTableAlertMessage = () => {
    return '这里是标题';
  };

  establishPresetAboveTableAlertDescription = () => {
    return '这里是简介描述';
  };

  establishPresetAboveTableAlertAction = () => {
    return (
      <Button size="small" danger>
        Detail
      </Button>
    );
  };

  establishPresetAboveTableAlertOption = () => {
    return {
      type: 'error',
    };
  };

  // eslint-disable-next-line no-unused-vars
  renderPresetListViewItemExtra = (record, index) => {
    return buildListViewItemExtra({
      index,
      imageUrl: getValueByKey({
        data: record,
        key: fieldData.image.name,
        defaultValue: defaultEmptyImage,
      }),
    });
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
          extra: (
            <ColorText
              textPrefix={fieldData.status.label}
              text={getSimpleStatusName({
                value: status,
              })}
              randomColor
              randomSeed={status}
              seedOffset={18}
            />
          ),
        },
      ],
      actionList: [
        {
          label: fieldData.simpleId.label,
          text: getValueByKey({
            data: item,
            key: fieldData.simpleId.name,
          }),
          canCopy: true,
          color: '#999999',
        },
        {
          label: fieldData.author.label,
          text: getValueByKey({
            data: item,
            key: fieldData.author.name,
            defaultValue: '暂无',
          }),
          canCopy: true,
          color: '#999999',
        },
        {
          label: fieldData.switch.label,
          text: getWhetherName({
            value: getValueByKey({
              data: item,
              key: fieldData.switch.name,
              convert: convertCollection.string,
              defaultValue: '0',
            }),
            trueText: '开启',
            falseText: '关闭',
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
        icon: iconBuilder.form(),
        handleButtonClick: ({ handleData }) => {
          this.goToEdit(handleData);
        },
        handleData: item,
        confirm: true,
        title: '将要进行编辑，确定吗？',
        handleMenuClick: ({ key, handleData }) => {
          this.handleMenuClick({ key, handleData });
        },
        items: [
          {
            key: 'setOnline',
            withDivider: true,
            uponDivider: true,
            icon: iconBuilder.playCircle(),
            text: '设为上线',
            hidden: !checkHasAuthority(
              accessWayCollection.simple.setOnline.permission,
            ),
            disabled: status === statusCollection.online,
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
            disabled: status === statusCollection.offline,
            confirm: true,
            title: '将要设置为下线，确定吗？',
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
      },
    });
  };

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
