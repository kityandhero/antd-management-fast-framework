import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { FunctionSupplement } from 'antd-management-fast-component';
import { DataModal, switchControlAssist } from 'antd-management-fast-framework';

import { fieldData } from '../Common/data';

const { BaseUpdateModal } = DataModal;
const {
  Whether: { renderFormWhetherSelect },
} = FunctionSupplement;

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '8c9d6ca76efd4b85b512543a479eaca2';

@connect(({ question, schedulingControl }) => ({
  question,
  schedulingControl,
}))
class ChangeWhetherCorrectModal extends BaseUpdateModal {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '设置判断结果',
      loadApiPath: 'question/get',
      submitApiPath: 'question/updateWhetherCorrect',
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d[fieldData.questionId.name] = getValueByKey({
      data: externalData,
      key: fieldData.questionId.name,
      defaultValue: '',
    });

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d[fieldData.questionId.name] = getValueByKey({
      data: externalData,
      key: fieldData.questionId.name,
      defaultValue: '',
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
      key: fieldData.title.name,
    });
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

    if (metaData != null) {
      values[fieldData.whetherCorrect.name] = getValueByKey({
        data: metaData,
        key: fieldData.whetherCorrect.name,
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
              component: renderFormWhetherSelect({
                name: fieldData.whetherCorrect.name,
                label: fieldData.whetherCorrect.label,
                helper: fieldData.whetherCorrect.helper,
              }),
            },
          ],
        },
      ],
    };
  };
}

export { ChangeWhetherCorrectModal };
