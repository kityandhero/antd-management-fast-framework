import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { fieldData } from '../Common/data';

const { BaseNeedlessLoadDrawer } = DataDrawer;

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '120166ca736749ec9bf14e1d1c542f6a';

class PreviewDrawer extends BaseNeedlessLoadDrawer {
  loadRemoteRequestAfterMount = false;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,

      showBottomBar: true,
    };
  }

  renderPresetTitleIcon = () => {
    const { icon } = this.props;

    return icon;
  };

  getPresetPageTitle = () => {
    const { title } = this.props;

    return title || '简要信息';
  };

  fillInitialValuesAfterLoad = ({
    // eslint-disable-next-line no-unused-vars
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const values = {};

    return values;
  };

  establishCardCollectionConfig = () => {
    const { data } = this.props;

    const {
      applicationId,
      userId,
      templateId,
      templateKey,
      jsonData,
      statusNote,
      autoRemark,
    } = {
      applicationId: 0,
      userId: 0,
      templateId: '',
      templateKey: '',
      jsonData: '',
      statusNote: '',
      autoRemark: '',
      ...data,
    };

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '消息参数',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.jsonView,
              value: jsonData || {},
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '其他信息',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.customGrid,
              list: [
                {
                  label: fieldData.applicationId.label,
                  value: applicationId,
                },
                {
                  label: fieldData.userId.label,
                  value: userId,
                },
                {
                  span: 2,
                  label: fieldData.statusNote.label,
                  value: statusNote,
                },
                {
                  span: 2,
                  label: fieldData.templateKey.label,
                  value: templateKey,
                },
                {
                  span: 2,
                  label: fieldData.templateId.label,
                  value: templateId,
                },
                {
                  span: 2,
                  label: fieldData.autoRemark.label,
                  value: autoRemark,
                },
              ],
              props: {
                bordered: true,
                size: 'small',
                column: 2,
                labelStyle: {
                  width: '90px',
                },
                emptyValue: '暂无',
                ellipsis: false,
              },
            },
          ],
        },
      ],
    };
  };
}

PreviewDrawer.defaultProps = {
  title: '',
  icon: iconBuilder.edit(),
  placement: 'left',
  width: 380,
};

export default PreviewDrawer;
