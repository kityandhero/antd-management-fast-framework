import { Avatar } from 'antd';
import { connect } from 'umi';

import { handleItem } from 'antd-management-fast-common/es/utils/actionAssist';
import {
  columnFacadeMode,
  convertCollection,
  defaultUserAvatar,
  listViewConfig,
} from 'antd-management-fast-common/es/utils/constants';
import { getValueByKey } from 'antd-management-fast-common/es/utils/tools';
import FlexBox from 'antd-management-fast-component/es/customComponents/FlexBox';
import { iconBuilder } from 'antd-management-fast-component/es/customComponents/Icon';
import MultiPage from 'antd-management-fast-framework/es/framework/DataMultiPageView/MultiPage';

import { accessWayCollection } from '@/customConfig/accessWayCollection';
import { getArticleStatusName } from '@/customSpecialComponents/FunctionSupplement/ArticleStatus';

import {
  refreshCacheAction,
  setOfflineAction,
  setOnlineAction,
} from '../Article/Assist/action';
import { getStatusBadge } from '../Article/Assist/tools';
import { fieldData, statusCollection } from '../Article/Common/data';

import ShortcutPanel from './ShortcutPanel';

@connect(({ article, user, currentOperator, global }) => ({
  article,
  user,
  currentOperator,
  global,
}))
class Index extends MultiPage {
  componentAuthority = accessWayCollection.article.pageList.permission;

  resetDataAfterLoad = false;

  showSearchForm = false;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '工作台',
        listTitle: '新近文章列表',
        loadApiPath: 'article/pageList',
        tableScroll: { x: 1020 },
        pageSize: 8,
      },
    };
  }

  apiDataConvert = (props) => {
    const {
      article: { data },
    } = props;

    return data;
  };

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'setOnline':
        this.setOnline(handleData);
        break;

      case 'setOffline':
        this.setOffline(handleData);
        break;

      case 'refreshCache':
        this.refreshCache(handleData);
        break;

      default:
        break;
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleItemStatus = ({ target, record, remoteData }) => {
    const articleId = getValueByKey({
      data: remoteData,
      key: fieldData.articleId.name,
    });

    handleItem({
      target,
      dataId: articleId,
      compareDataIdHandler: (o) => {
        const { articleId: v } = o;

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
    this.goToPath(`/news/article/addBasicInfo`);
  };

  goToEdit = (record) => {
    const { articleId } = record;

    this.goToPath(`/news/article/edit/load/${articleId}/key/basicInfo`);
  };

  establishPageContentLayoutSiderConfig = () => {
    return {
      position: 'right',
    };
  };

  establishDataContainerExtraActionCollectionConfig = () => {
    return [
      {
        buildType:
          listViewConfig.dataContainerExtraActionBuildType.generalButton,
        type: 'primary',
        icon: iconBuilder.plus(),
        text: '新增文章',
        handleClick: this.goToAdd,
        hidden: !this.checkAuthority(
          accessWayCollection.article.addBasicInfo.permission,
        ),
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
      confirm: {
        title: '将要进行编辑，确定吗？',
      },
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'showUpdateBasicInfoDrawer',
          icon: iconBuilder.edit(),
          text: '编辑[侧拉]',
          hidden: !this.checkAuthority(
            accessWayCollection.article.updateBasicInfo.permission,
          ),
        },
        {
          key: 'setOnline',
          withDivider: true,
          uponDivider: true,
          icon: iconBuilder.playCircle(),
          text: '设为上线',
          hidden: !this.checkAuthority(
            accessWayCollection.article.setOnline.permission,
          ),
          disabled: itemStatus === statusCollection.online,
          confirm: {
            title: '将要设置为上线，确定吗？',
          },
        },
        {
          key: 'setOffline',
          icon: iconBuilder.pauseCircle(),
          text: '设为下线',
          hidden: !this.checkAuthority(
            accessWayCollection.article.setOffline.permission,
          ),
          disabled: itemStatus === statusCollection.offline,
          confirm: {
            title: '将要设置为下线，确定吗？',
          },
        },
        {
          key: 'refreshCache',
          withDivider: true,
          uponDivider: true,
          icon: iconBuilder.reload(),
          text: '刷新缓存',
          hidden: !this.checkAuthority(
            accessWayCollection.article.refreshCache.permission,
          ),
          confirm: {
            title: '将要刷新缓存，确定吗？',
          },
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
    },
    {
      dataTarget: fieldData.image,
      width: 80,
      showRichFacade: true,
      facadeConfig: {
        circle: false,
      },
      facadeMode: columnFacadeMode.image,
    },
    {
      dataTarget: fieldData.status,
      width: 100,
      emptyValue: '--',
      showRichFacade: true,
      facadeMode: columnFacadeMode.badge,
      facadeConfigBuilder: (val) => {
        return {
          status: getStatusBadge(val),
          text: getArticleStatusName({
            metaData: this.getMetaData(),
            value: val,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.createTime,
      width: 160,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
      emptyValue: '--',
    },
  ];

  renderPageHeaderContent = () => {
    const {
      currentOperator: { currentOperator },
    } = this.props;

    console.log(currentOperator);

    const avatar = getValueByKey({
      data: currentOperator,
      key: 'avatar',
    });

    const name = getValueByKey({
      data: currentOperator,
      key: 'name',
    });

    return (
      <>
        <FlexBox
          flexAuto="right"
          left={
            <Avatar
              size="small"
              style={{
                width: '70px',
                height: '70px',
              }}
              // className={styles.avatar}
              src={avatar || defaultUserAvatar}
              alt="avatar"
            />
          }
          leftStyle={{
            paddingRight: '30px',
          }}
          right={
            <FlexBox
              flexAuto="top"
              top={
                <div
                  style={{
                    fontSize: '20px',
                  }}
                >{`早安，${name}，祝你开心每一天！`}</div>
              }
              bottom={
                <div
                  style={{
                    fontSize: '14px',
                    color: '#333',
                    paddingBottom: '10px',
                  }}
                >
                  河南省驻马店市委宣传部 — 驻马店官方发布CMS平台
                </div>
              }
            />
          }
        />
      </>
    );
  };

  renderSiderTopArea = () => {
    return <ShortcutPanel />;
  };
}

export default Index;
