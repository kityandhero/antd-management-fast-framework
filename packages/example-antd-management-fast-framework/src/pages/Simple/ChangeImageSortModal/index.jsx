import { connect } from 'easy-soft-dva';

import { DataModal, switchControlAssist } from 'antd-management-fast-framework';

import { getArticleIdFromExternalData } from '../Assist/config';

const { BaseImageSortModal } = DataModal;

const visibleFlag = 'b47b4b567e1643b585f1f7c69a323cba';

@connect(({ simple, schedulingControl }) => ({
  simple,
  schedulingControl,
}))
class ChangeImageSortModal extends BaseImageSortModal {
  // 在控制台显示组建内调用序列, 仅为进行开发辅助
  showCallProcess = true;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '变更图片顺序',
      loadApiPath: 'simple/listImage',
      submitApiPath: 'simple/updateImageSort',
      simpleId: '',
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;

    d.simpleId = getArticleIdFromExternalData(this.state);

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { metaListData } = this.state;

    d.simpleId = getArticleIdFromExternalData(this.state);

    const list = [];

    for (const item of metaListData || []) {
      list.push(`${item.id}|${item.sort}`);
    }

    d.sorts = list.join(',');

    return d;
  };
}

export default ChangeImageSortModal;
