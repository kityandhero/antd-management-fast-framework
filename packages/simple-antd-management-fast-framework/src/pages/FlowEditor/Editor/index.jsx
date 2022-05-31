import { connect } from 'umi';

import DataTabContainerSupplement from '@/customSpecialComponents/DataTabContainerSupplement';

@connect(({ currentSystem, global, loading }) => ({
  currentSystem,
  global,
  loading: loading.models.currentSystem,
}))
class Edit extends DataTabContainerSupplement {
  tabList = [
    {
      key: 'basicInfo',
      tab: '基本信息',
    },
  ];

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '',
      },
    };
  }

  apiDataConvert = (props) => {
    const {
      currentSystem: { data },
    } = props;

    return data;
  };

  establishPageHeaderTitlePrefix = () => {
    return '商城名称';
  };

  establishPageHeaderExtraContentConfig = () => {
    return {
      textLabel: '状态',
      text: '正常',
      timeLabel: '时间',
      time: new Date(),
    };
  };

  establishPageHeaderContentGridConfig = () => {
    return [];
  };
}

export default Edit;
