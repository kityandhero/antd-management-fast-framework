import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { DataModal, switchControlAssist } from 'antd-management-fast-framework';

import { renderFormSectionRenderTypeSelect } from '../../../customSpecialComponents';
import { fieldData } from '../Common/data';

const { BaseUpdateModal } = DataModal;

const visibleFlag = 'e9dc30ff60e541efbd42f14fddb03250';

@connect(({ section, schedulingControl }) => ({
  section,
  schedulingControl,
}))
class ChangeRenderTypeModal extends BaseUpdateModal {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '渲染模式设置',
      loadApiPath: 'section/get',
      submitApiPath: 'section/updateRenderType',
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d.sectionId = getValueByKey({
      data: externalData,
      key: fieldData.sectionId.name,
    });

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d.sectionId = getValueByKey({
      data: externalData,
      key: fieldData.sectionId.name,
    });

    return d;
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

  buildTitleSubText = () => {
    const { metaData } = this.state;

    return getValueByKey({
      data: metaData,
      key: fieldData.name.name,
    });
  };

  fillInitialValuesAfterLoad = ({
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const values = {};

    if (metaData != null) {
      values[fieldData.renderType.name] = getValueByKey({
        data: metaData,
        key: fieldData.renderType.name,
        convert: convertCollection.string,
      });
    }

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
              component: renderFormSectionRenderTypeSelect({}),
            },
          ],
          instruction: [
            {
              title: '说明',
              showDivider: false,
              showNumber: true,
              list: [
                {
                  text: '无渲染: 不进行任何渲染，如务必要，请勿选择.',
                },
                {
                  text: '内容渲染: 将根据图文H5编辑内容渲染呈现，需要前端配合.',
                },
                {
                  text: '媒体渲染: 将根据媒体信息集合进行渲染呈现，需要前端配合.',
                },
              ],
            },
          ],
        },
      ],
    };
  };
}

export { ChangeRenderTypeModal };
