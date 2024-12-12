import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { copyToClipboard, extraBuildType } from 'antd-management-fast-common';
import { iconBuilder, SyntaxHighlighter } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

const { BaseVerticalFlexDrawer } = DataDrawer;

const visibleFlag = '9c30c36ca7ce4f1d8370467cff7e21e9';

@connect(({ accessWay, schedulingControl }) => ({
  accessWay,
  schedulingControl,
}))
class PermissionContentBusinessDrawer extends BaseVerticalFlexDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '前端业务权限键值配置文件',
      loadApiPath: 'accessWay/getBusinessPermissionFileContent',
    };
  }

  establishExtraActionConfig = () => {
    const that = this;

    return {
      list: [
        {
          buildType: extraBuildType.generalExtraButton,
          icon: iconBuilder.copy(),
          text: '复制内容',
          disabled: this.checkInProgress(),
          handleClick: () => {
            const { metaData } = that.state;

            copyToClipboard(
              getValueByKey({
                data: metaData,
                key: 'content',
                convert: convertCollection.string,
              }),
              false,
            );
          },
        },
      ],
    };
  };

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '简要说明:这里显示的是用于前端开发辅助的业务权限键值配置文件信息。',
        },
      ],
    };
  };

  buildTitleSubText = () => {
    const { metaData } = this.state;

    return getValueByKey({
      data: metaData,
      key: 'description',
      defaultValue: '',
    });
  };

  renderPresetContentContainorInnerTop = () => {
    const { metaData } = this.state;

    const content = getValueByKey({
      data: metaData,
      key: 'content',
      convert: convertCollection.string,
    });

    return (
      <div style={{ height: '100%', overflow: 'hidden' }}>
        <SyntaxHighlighter
          language="js"
          value={content}
          other={{ showLineNumbers: true, wrapLines: true }}
          style={{
            height: 'calc(100% - 14px)',
            marginLeft: '10px',
            marginRight: '10px',
          }}
        />
      </div>
    );
  };
}

export { PermissionContentBusinessDrawer };
