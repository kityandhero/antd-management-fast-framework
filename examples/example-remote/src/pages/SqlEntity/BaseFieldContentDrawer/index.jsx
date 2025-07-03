import { getValueByKey } from 'easy-soft-utility';

import { copyToClipboard, extraBuildType } from 'antd-management-fast-common';
import {
  buildCustomGrid,
  iconBuilder,
  SyntaxHighlighter,
} from 'antd-management-fast-component';
import { DataDrawer } from 'antd-management-fast-framework';

import { fieldData } from '../Common/data';

const { BaseVerticalFlexDrawer } = DataDrawer;

class BaseFieldContentDrawer extends BaseVerticalFlexDrawer {
  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '字段信息',
      overlayButtonOpenText: '查看基础信息',
      overlayButtonCloseText: '关闭基础信息',
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.props;

    d[fieldData.name.name] = getValueByKey({
      data: externalData,
      key: fieldData.name.name,
      defaultValue: '',
    });

    return d;
  };

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
            const fieldContent = that.getFieldContent();

            copyToClipboard(fieldContent, false);
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
          text: '简要说明:这里是当前数据实体的字段信息。',
        },
      ],
    };
  };

  buildTitleSubText = () => {
    const { metaData } = this.state;

    return getValueByKey({
      data: metaData,
      key: fieldData.name.name,
      defaultValue: '',
    });
  };

  getFieldContent = () => '';

  renderPresetContentContainorInnerTop = () => {
    const fieldContent = this.getFieldContent();

    return (
      <div style={{ height: '100%', overflow: 'hidden' }}>
        <SyntaxHighlighter
          language="js"
          value={fieldContent}
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

  renderOverlayContent = () => {
    const { metaData } = this.state;

    return (
      <div
        style={{
          width: '90%',
          height: '90%',
          background: '#fff',
          padding: '16px',
          borderRadius: '10px',
          overflow: 'hidden',
        }}
      >
        {buildCustomGrid({
          list: [
            {
              span: 1,
              label: fieldData.name.label,
              value: getValueByKey({
                data: metaData,
                key: fieldData.name.name,
                defaultValue: '',
              }),
            },
            {
              span: 1,
              label: fieldData.label.label,
              value: getValueByKey({
                data: metaData,
                key: fieldData.label.name,
                defaultValue: '',
              }),
            },
            {
              label: fieldData.tableName.label,
              value: getValueByKey({
                data: metaData,
                key: fieldData.tableName.name,
                defaultValue: '',
              }),
            },
            {
              label: fieldData.namespace.label,
              value: getValueByKey({
                data: metaData,
                key: fieldData.namespace.name,
                defaultValue: '',
              }),
            },
            {
              label: fieldData.assemblyFullName.label,
              value: getValueByKey({
                data: metaData,
                key: fieldData.assemblyFullName.name,
                defaultValue: '',
              }),
            },
          ],
          props: {
            bordered: true,
            size: 'small',
            column: 1,
            labelStyle: {
              width: '90px',
            },
            emptyValue: '暂无',
            ellipsis: false,
          },
        })}
      </div>
    );
  };
}

export { BaseFieldContentDrawer };
