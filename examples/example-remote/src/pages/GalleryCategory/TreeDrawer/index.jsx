import { connect } from 'easy-soft-dva';

import { ElasticityTree } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

const { BaseVerticalFlexDrawer } = DataDrawer;

const visibleFlag = 'add7f24b63ac4833a83f1bbb34d8cb46';

@connect(({ galleryCategory, schedulingControl }) => ({
  galleryCategory,
  schedulingControl,
}))
class TreeDrawer extends BaseVerticalFlexDrawer {
  resetDataAfterLoad = false;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      width: 260,
      pageTitle: '可用类别树预览',
      loadApiPath: 'galleryCategory/singleTreeList',
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;

    d['wrapperName'] = '类别树';

    return d;
  };

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '此图例显示的是类别树型预览',
        },
        {
          text: '此处仅显示可用状态的数据.',
        },
      ],
    };
  };

  renderPresetContentContainorInnerTop = () => {
    const { metaListData } = this.state;

    return (
      <div style={{ padding: '20px 20px' }}>
        <ElasticityTree
          listData={metaListData}
          dataConvert={(o) => {
            const { name: title, code: value } = o;

            return {
              title,
              value,
            };
          }}
        />
      </div>
    );
  };
}

export { TreeDrawer };
