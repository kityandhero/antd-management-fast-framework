import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { copyToClipboard, extraBuildType } from 'antd-management-fast-common';
import { iconBuilder, SyntaxHighlighter } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { fieldData } from '../../Department/Common/data';

const { BaseVerticalFlexDrawer } = DataDrawer;

const visibleFlag = 'afd3bcf0d62f4defb749c91c8a0a017f';

@connect(({ accessWay, schedulingControl }) => ({
  accessWay,
  schedulingControl,
}))
class PermissionFileContentDrawer extends BaseVerticalFlexDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '前端全部权限键值配置文件',
      loadApiPath: 'accessWay/getAllPermissionFileContent',
    };
  }

  supplementLoadRequestParams = (o) => {
    return {
      ...this.supplementRequestParams(o),
    };
  };

  supplementRequestParams = (o) => {
    const d = { ...o };
    const { externalData } = this.state;

    d[fieldData.channel.name] = getValueByKey({
      data: externalData,
      key: fieldData.channel.name,
      convert: convertCollection.string,
    });

    return d;
  };

  establishExtraActionConfig = () => {
    return {
      list: [
        {
          buildType: extraBuildType.generalExtraButton,
          icon: iconBuilder.copy(),
          text: '复制内容',
          disabled: this.checkInProgress(),
          handleClick: () => {
            const { metaData } = this.state;

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
          text: '简要说明:这里显示的是用于前端开发辅助的权限文件信息。',
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

export { PermissionFileContentDrawer };
