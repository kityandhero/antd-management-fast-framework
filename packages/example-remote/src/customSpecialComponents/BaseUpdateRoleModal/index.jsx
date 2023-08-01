import { DataModal } from 'antd-management-fast-framework';

import { listSelectAction } from '../../commonAssist/action';

const { BaseUpdateTransferModal } = DataModal;

class BaseUpdateRoleModal extends BaseUpdateTransferModal {
  // 在控制台显示组建内调用序列, 仅为进行开发辅助
  showCallProcess = true;

  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      customData: [],
    };
  }

  executeAfterDoOtherWhenChangeVisibleToShow = () => {
    const { externalData } = this.props;
    const { selectData } = {
      selectData: {},
      ...externalData,
    };

    const { authorityKeyCollection } = {
      authorityKeyCollection: [],
      ...selectData,
    };

    this.setState({
      selectedKeys: [...authorityKeyCollection],
    });

    listSelectAction({
      target: this,
      successCallback: ({ target, remoteListData }) => {
        const customData = remoteListData;

        target.setState({ customData });
      },
    });
  };

  executeAfterDoOtherWhenChangeVisibleToHide = () => {
    this.setState({
      selectedKeys: [],
    });
  };

  // eslint-disable-next-line no-unused-vars
  buildTargetKeys = (preProperties, preState, snapshot) => {
    const { externalData } = this.state;
    const { selectData } = externalData;
    const { authorityKeyCollection } = {
      authorityKeyCollection: [],
      ...selectData,
    };

    return (authorityKeyCollection || null) == null
      ? []
      : authorityKeyCollection;
  };

  buildTitleText = () => {
    const { externalData } = this.state;
    const { selectData } = externalData;
    const { name } = { name: '', ...selectData };

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
