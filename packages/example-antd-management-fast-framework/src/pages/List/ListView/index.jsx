import { connect } from 'easy-soft-dva';
import { getValueByKey, handleItem } from 'easy-soft-utility';

import {
  defaultEmptyImage,
  listViewConfig,
  searchCardConfig,
} from 'antd-management-fast-common';
import {
  buildListViewItemExtra,
  buildListViewItemInnerWithSelectButton,
  iconBuilder,
} from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { fieldData } from '../../../businessData/data';
import { accessWayCollection } from '../../../customConfig';

const { MultiPage } = DataMultiPageView;

@connect(({ simple, schedulingControl }) => ({
  simple,
  schedulingControl,
}))
class PageList extends MultiPage {
  componentAuthority = accessWayCollection.simple.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      listViewMode: listViewConfig.viewMode.list,
      pageTitle: '列表示例',
      paramsKey: accessWayCollection.simple.pageList.paramsKey,
      loadApiPath: 'simple/pageList',
      dateRangeFieldName: '创建时间',
      currentRecord: null,
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
      case 'updateSort': {
        this.showChangeSortModal(handleData);
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

      case 'refreshCache': {
        this.refreshCache(handleData);

        break;
      }

      default: {
        break;
      }
    }
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
        text: '增加子公司',
        handleClick: this.goToAdd,
      },
    ];
  };

  renderPresetListViewItemLayout = () => {
    return 'vertical';
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
    return buildListViewItemInnerWithSelectButton({
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
          label: fieldData.createTime.label,
          text: getValueByKey({
            data: item,
            key: fieldData.createTime.name,
          }),
          color: '#999999',
        },
      ],
      selectCallback: () => {},
    });

    // return (
    //   <>
    //     <List.Item.Meta
    //       avatar={
    //         checkStringIsNullOrWhiteSpace(logo) ? (
    //           <Avatar icon={iconBuilder.shop()} />
    //         ) : (
    //           <Avatar src={logo} />
    //         )
    //       }
    //       title={
    //         <ColorText
    //           textPrefix={fieldData.shortName.label}
    //           separator=": "
    //           text={shortName}
    //         />
    //       }
    //       description={
    //         <div>
    //           <ColorText
    //             textPrefix={fieldData.fullName.label}
    //             separator=": "
    //             text={fullName}
    //           />

    //           <div>
    //             <Space split={<Divider type="vertical" />}>
    //               <ColorText
    //                 textPrefix={fieldData.code.label}
    //                 separator=": "
    //                 text={code || '暂未设置'}
    //                 color={checkStringIsNullOrWhiteSpace(code) ? '#bbb' : ''}
    //               />

    //               <ColorText
    //                 textPrefix={fieldData.subsidiaryId.label}
    //                 separator=": "
    //                 text={<Text copyable>{subsidiaryId}</Text>}
    //               />

    //               <ColorText
    //                 textPrefix={fieldData.createTime.label}
    //                 separator=": "
    //                 text={createTime}
    //               />
    //             </Space>
    //           </div>
    //         </div>
    //       }
    //     />

    //     {/* <div>性别：{getSexName(sex)}</div> */}
    //   </>
    // );
  };
}

export default PageList;
