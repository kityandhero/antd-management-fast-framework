import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { buildUpdateTimeAndOperatorFieldItem } from '../../../customSpecialComponents';
import { fieldData } from '../Common/data';

const { BaseUpdateDrawer } = DataDrawer;

const visibleFlag = 'ef8bfe19ec154bb089081d3da59aa649';

@connect(({ administrativeDivision, schedulingControl }) => ({
  administrativeDivision,
  schedulingControl,
}))
class UpdateBasicInfoDrawer extends BaseUpdateDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '编辑基础信息',
      loadApiPath: 'administrativeDivision/get',
      submitApiPath: 'administrativeDivision/updateBasicInfo',
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d.administrativeDivisionId = getValueByKey({
      data: externalData,
      key: fieldData.administrativeDivisionId.name,
    });

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d.administrativeDivisionId = getValueByKey({
      data: externalData,
      key: fieldData.administrativeDivisionId.name,
    });

    return d;
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
      values[fieldData.name.name] = getValueByKey({
        data: metaData,
        key: fieldData.name.name,
      });

      values[fieldData.shortName.name] = getValueByKey({
        data: metaData,
        key: fieldData.shortName.name,
      });

      values[fieldData.description.name] = getValueByKey({
        data: metaData,
        key: fieldData.description.name,
      });
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    const { metaData } = this.state;

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '基本信息',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.name,
              require: true,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.shortName,
              require: false,
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '简介信息',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.textarea,
              fieldData: fieldData.description,
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '扩展信息',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.customGrid,
              list: [
                {
                  span: 1,
                  label: fieldData.code.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.code.name,
                  }),
                },
                {
                  span: 1,
                  label: fieldData.sourceName.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.sourceName.name,
                  }),
                },
                {
                  span: 1,
                  label: fieldData.letter.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.letter.name,
                  }),
                },
                {
                  span: 1,
                  label: fieldData.initialsSet.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.initialsSet.name,
                  }),
                },
                {
                  span: 1,
                  label: fieldData.longitude.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.longitude.name,
                  }),
                },
                {
                  span: 1,
                  label: fieldData.latitude.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.latitude.name,
                  }),
                },
                {
                  span: 1,
                  label: fieldData.municipal.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.municipal.name,
                  }),
                },
                {
                  span: 1,
                  label: fieldData.parentCode.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.parentCode.name,
                  }),
                },
                {
                  span: 1,
                  label: fieldData.level.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.level.name,
                  }),
                },
                {
                  span: 1,
                  label: fieldData.hasChild.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.hasChild.name,
                  }),
                },
                {
                  span: 1,
                  label: fieldData.whetherCapital.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.whetherCapital.name,
                  }),
                },
                {
                  span: 1,
                  label: fieldData.hot.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.hot.name,
                  }),
                },
                {
                  span: 1,
                  label: fieldData.regionalAdministrativeRand.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.regionalAdministrativeRand.name,
                  }),
                },
                {
                  span: 1,
                  label: fieldData.whetherPoverty.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.whetherPoverty.name,
                  }),
                },
              ],
              props: {
                size: 'small',
                bordered: true,
                column: 2,
                emptyStyle: {
                  color: '#cccccc',
                },
                emptyValue: '待完善',
                labelStyle: {
                  width: '100px',
                },
              },
            },
          ],
        },

        buildUpdateTimeAndOperatorFieldItem({ data: metaData, line: 2 }),
      ],
    };
  };
}

export { UpdateBasicInfoDrawer };
