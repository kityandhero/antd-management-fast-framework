import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey, toString } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { DataModal, switchControlAssist } from 'antd-management-fast-framework';

import { renderFormCacheModeSelect } from '../../../customSpecialComponents';
import { modelTypeCollection } from '../../../modelBuilders';
import { fieldData } from '../Common/data';

const { BaseUpdateModal } = DataModal;

const visibleFlag = 'debfc01a83b4448db015ad41d894d0f5';

@connect(({ currentManagementInfrastructure, schedulingControl }) => ({
  currentManagementInfrastructure,
  schedulingControl,
}))
class UpdateCacheModeModal extends BaseUpdateModal {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '配置缓存模式',
      loadApiPath:
        modelTypeCollection.currentManagementInfrastructureTypeCollection.get,
      submitApiPath:
        modelTypeCollection.currentManagementInfrastructureTypeCollection
          .updateKeyValueInfo,
      cacheMode: '',
    };
  }

  doOtherAfterLoadSuccess = ({
    // eslint-disable-next-line no-unused-vars
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    this.setState({
      cacheMode: getValueByKey({
        data: metaData,
        key: fieldData.cacheMode.name,
        convert: convertCollection.string,
      }),
    });
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { metaData, cacheMode } = this.state;

    d.tag = getValueByKey({
      data: metaData,
      key: fieldData.cacheModeTag.name,
      defaultValue: '',
    });

    d.value = cacheMode;

    return d;
  };

  buildTitleSubTextPrefix = () => {
    return '当前系统';
  };

  buildTitleSubText = () => {
    const { metaData } = this.state;

    return getValueByKey({
      data: metaData,
      key: fieldData.name.name,
      defaultValue: '未设置系统名称',
    });
  };

  onChange = (v) => {
    this.setState({ cacheMode: toString(v) });
  };

  establishFormAdditionalConfig = () => {
    return {
      labelCol: {
        flex: '80px',
      },
      wrapperCol: {
        flex: 'auto',
      },
    };
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

    values[fieldData.cacheMode.name] = getValueByKey({
      data: metaData,
      key: fieldData.cacheMode.name,
      convert: convertCollection.string,
    });

    return values;
  };

  establishCardCollectionConfig = () => {
    return {
      list: [
        {
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: renderFormCacheModeSelect({
                onChange: (event) => {
                  this.onChange(event);
                },
              }),
              require: true,
            },
          ],
        },
      ],
    };
  };
}

export { UpdateCacheModeModal };
