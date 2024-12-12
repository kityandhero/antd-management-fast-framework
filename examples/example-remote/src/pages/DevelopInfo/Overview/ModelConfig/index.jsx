import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey } from 'easy-soft-utility';

import {
  cardConfig,
  copyToClipboard,
  extraBuildType,
} from 'antd-management-fast-common';
import { iconBuilder, SyntaxHighlighter } from 'antd-management-fast-component';

import { accessWayCollection } from '../../../../customConfig';
import { ModelConfigBusinessDrawer } from '../../ModelConfigBusinessDrawer';
import { ModelConfigInfrastructureDrawer } from '../../ModelConfigInfrastructureDrawer';
import { TabPageBase } from '../../TabPageBase';

@connect(({ accessWay, schedulingControl }) => ({
  accessWay,
  schedulingControl,
}))
class ModelConfig extends TabPageBase {
  componentAuthority =
    accessWayCollection.accessWay.getAllModelConfigFileContent.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'accessWay/getAllModelConfigFileContent',
    };
  }

  showModelConfigInfrastructureDrawer = () => {
    ModelConfigInfrastructureDrawer.open();
  };

  showModelConfigBusinessDrawer = () => {
    ModelConfigBusinessDrawer.open();
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
    const { metaData } = this.state;

    const content = getValueByKey({
      data: metaData,
      key: 'content',
      convert: convertCollection.string,
    });

    const that = this;

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '前端所有 Model Config',
          },
          hasExtra: true,
          extra: {
            affix: true,
            list: [
              {
                buildType: extraBuildType.generalExtraButton,
                icon: iconBuilder.read(),
                text: '查看前端基础Model配置',
                disabled: this.checkInProgress(),
                handleClick: () => {
                  that.showModelConfigInfrastructureDrawer();
                },
              },
              {
                buildType: extraBuildType.generalExtraButton,
                icon: iconBuilder.read(),
                text: '查看前端业务Model配置',
                disabled: this.checkInProgress(),
                handleClick: () => {
                  that.showModelConfigBusinessDrawer();
                },
              },
              {
                buildType: cardConfig.extraBuildType.divider,
              },
              {
                buildType: extraBuildType.generalExtraButton,
                icon: iconBuilder.read(),
                text: '复制当前内容',
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
              {
                buildType: cardConfig.extraBuildType.divider,
              },
              {
                buildType: cardConfig.extraBuildType.refresh,
              },
            ],
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
                <SyntaxHighlighter
                  language="js"
                  value={content}
                  other={{ showLineNumbers: true, wrapLines: true }}
                />
              ),
            },
          ],
        },
      ],
    };
  };

  renderPresetOther = () => {
    return (
      <>
        <ModelConfigInfrastructureDrawer maskClosable />

        <ModelConfigBusinessDrawer maskClosable />
      </>
    );
  };
}

export default ModelConfig;
