import { DataModal } from 'antd-management-fast-framework';

const { BaseUpdateTransferModal } = DataModal;

class BaseUpdateRoleModal extends BaseUpdateTransferModal {
  // 在控制台显示组建内调用序列, 仅为进行开发辅助
  // showCallProcess = true;

  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      customData: [],
    };
  }

  doOtherAfterLoadSuccess = ({
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const { authorityKeyCollection } = {
      authorityKeyCollection: [],
      ...metaData,
    };

    this.setState({
      selectedKeys: [...authorityKeyCollection],
      targetKeys: [...authorityKeyCollection],
    });
  };

  doOtherWhenChangeVisibleToShow = () => {
    this.reloadData({});
  };

  executeAfterDoOtherWhenChangeVisibleToHide = () => {
    this.setState({
      selectedKeys: [],
    });
  };

  // eslint-disable-next-line no-unused-vars
  buildTargetKeys = (preProperties, preState, snapshot) => {
    const { metaData } = this.state;

    const { authorityKeyCollection } = {
      authorityKeyCollection: [],
      ...metaData,
    };

    return (authorityKeyCollection || null) == null
      ? []
      : authorityKeyCollection;
  };

  buildTitleText = () => {
    const { metaData } = this.state;
    const { name } = { name: '', ...metaData };

    return `设置“${(name || null) == null ? '' : name}”拥有的角色`;
  };

  buildDataSource = () => {
    const { customData } = this.state;

    return customData;
  };

  buildItem = (o) => {
    return o.name;
  };
}

export default BaseUpdateRoleModal;
