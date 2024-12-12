import { connect } from 'easy-soft-dva';
import { checkHasAuthority } from 'easy-soft-utility';

import { accessWayCollection } from '../../../customConfig';
import { DataTabContainerSupplement } from '../../../customSpecialComponents';

@connect(({ accessWay, schedulingControl }) => ({
  accessWay,
  schedulingControl,
}))
class Detail extends DataTabContainerSupplement {
  showReloadButton = false;

  loadRemoteRequestAfterMount = false;

  componentAuthority = accessWayCollection.accessWay.get.permission;

  tabList = [
    {
      key: 'actionMap',
      hidden: !checkHasAuthority(
        accessWayCollection.accessWay.getActionMap.permission,
      ),
      tab: 'Action Map',
    },
    {
      key: 'modelConfig',
      hidden: !checkHasAuthority(
        accessWayCollection.accessWay.getAllModelConfigFileContent.permission,
      ),
      tab: 'Model配置文件',
    },
    {
      key: 'permissionContent',
      hidden: !checkHasAuthority(
        accessWayCollection.accessWay.getAllPermissionFileContent.permission,
      ),
      tab: '权限键值集合',
    },
  ];

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '前端开发配置信息',
    };
  }

  establishPageHeaderContentParagraphConfig = () => {
    return {
      paragraph: '此处显示的是与前端开发框架配合开发所需要提供的相关配置。',
    };
  };
}

export default Detail;
