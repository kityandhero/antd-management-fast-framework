import { connect } from 'umi';

import { getDerivedStateFromPropsForUrlParams } from 'antd-management-fast-common/es/utils/tools';

import DataTabContainerSupplement from '@/customSpecialComponents/DataTabContainerSupplement';

import {
  checkNeedUpdateAssist,
  parseUrlParamsForSetState,
} from '../Assist/config';

@connect(({ flowEditor, global, loading }) => ({
  flowEditor,
  global,
  loading: loading.models.flowEditor,
}))
class Edit extends DataTabContainerSupplement {
  loadDataAfterMount = false;

  tabList = [
    // {
    //   key: 'command',
    //   tab: '工具栏',
    // },
    // {
    //   key: 'detailPanel',
    //   tab: '详情面板',
    // },
    // {
    //   key: 'itemPanel',
    //   tab: '项面板',
    // },
    // {
    //   key: 'context',
    //   tab: '上下文',
    // },
    // {
    //   key: 'flow',
    //   tab: '流程编辑',
    // },
    // {
    //   key: 'mind',
    //   tab: '脑图编辑',
    // },
    {
      key: 'innerEditor',
      tab: '内置编辑器',
    },
  ];

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '流程编辑',
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(
      nextProps,
      prevState,
      { id: '' },
      parseUrlParamsForSetState,
    );
  }

  apiDataConvert = (props) => {
    const {
      flowEditor: { data },
    } = props;

    return data;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  checkNeedUpdate = (preProps, preState, snapshot) => {
    return checkNeedUpdateAssist(this.state, preProps, preState, snapshot);
  };

  establishPageHeaderTitlePrefix = () => {
    return '编辑器';
  };
}

export default Edit;
