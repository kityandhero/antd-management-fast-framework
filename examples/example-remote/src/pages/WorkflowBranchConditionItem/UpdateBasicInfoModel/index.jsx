import { connect } from 'easy-soft-dva';
import {
  checkInCollection,
  convertCollection,
  filter,
  getValueByKey,
  toString,
} from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { buildButton, iconBuilder } from 'antd-management-fast-component';
import { DataModal, switchControlAssist } from 'antd-management-fast-framework';

import {
  flowBranchConditionItemTargetComparisonModelCollection,
  flowBranchConditionItemTargetTypeCollection,
} from '../../../customConfig';
import {
  renderFormFlowBranchConditionItemTargetComparisonModeSelect,
  renderFormFlowBranchConditionItemTargetTypeSelect,
} from '../../../customSpecialComponents';
import { getByWorkflowAction } from '../../WorkflowFormDesign/Assist/action';
import { fieldData as fieldDataWorkflowFormDesign } from '../../WorkflowFormDesign/Common/data';
import { fieldData } from '../Common/data';

const { BaseUpdateModal } = DataModal;

// eslint-disable-next-line no-unused-vars
function dataFormFieldConvert(o, index) {
  const { name, title, type } = o;

  return {
    label: `${title} 【字段类型：${type}】`,
    value: name,
    disabled: false,
    ...o,
  };
}

const visibleFlag = '427d1f0bcfa14ccb8fdba2022d14d8d3';

@connect(({ workflowBranchCondition, schedulingControl }) => ({
  workflowBranchCondition,
  schedulingControl,
}))
class UpdateBasicInfoModel extends BaseUpdateModal {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '更新表单字段判断条件',
      loadApiPath: 'workflowBranchConditionItem/get',
      submitApiPath: 'workflowBranchConditionItem/updateBasicInfo',
      dataSchemaList: [],
      targetTitle: '',
      currentTargetType: null,
      currentTargetComparisonModel: null,
    };
  }

  executeAfterDoOtherWhenChangeVisibleToShow = () => {
    this.loadFormFieldOption();
  };

  supplementLoadRequestParams = (o) => {
    const d = this.supplementRequestParams(o);

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    const d = this.supplementRequestParams(o);

    const { targetTitle } = this.state;

    d[fieldData.targetTitle.name] = targetTitle;

    return d;
  };

  supplementRequestParams(o) {
    const d = { ...o };
    const { externalData } = this.props;

    d[fieldData.workflowBranchConditionItemId.name] = getValueByKey({
      data: externalData,
      key: fieldData.workflowBranchConditionItemId.name,
    });

    return d;
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
    const targetTitle = getValueByKey({
      data: metaData,
      key: fieldData.targetTitle.name,
      convert: convertCollection.string,
    });

    const targetType = getValueByKey({
      data: metaData,
      key: fieldData.targetType.name,
      convert: convertCollection.string,
    });

    const targetComparisonMode = getValueByKey({
      data: metaData,
      key: fieldData.targetComparisonMode.name,
      convert: convertCollection.string,
    });

    this.setState({
      targetTitle,
      currentTargetType: targetType,
      currentTargetComparisonModel: targetComparisonMode,
    });
  };

  loadFormFieldOption = () => {
    const { externalData } = this.props;

    getByWorkflowAction({
      target: this,
      handleData: {
        workflowId: getValueByKey({
          data: externalData,
          key: fieldData.workflowId.name,
        }),
      },
      successCallback: ({ target, remoteData }) => {
        const dataSchemaList = getValueByKey({
          data: remoteData,
          key: fieldDataWorkflowFormDesign.dataSchemaList.name,
          convert: convertCollection.array,
        });

        target.setState({
          dataSchemaList: dataSchemaList,
        });
      },
    });
  };

  reloadFormFieldOption = () => {
    this.loadFormFieldOption();
  };

  onTargetNameChange = (v, option) => {
    const { title } = option;

    this.setState({ targetTitle: title });
  };

  onTargetTypeChange = (o) => {
    this.setState({ currentTargetType: toString(o) });

    if (
      toString(o) ===
      toString(flowBranchConditionItemTargetTypeCollection.string)
    ) {
      const data = {};

      data[fieldData.targetComparisonMode.name] = toString(
        flowBranchConditionItemTargetComparisonModelCollection.eq,
      );

      data[fieldData.targetValue.name] = null;

      this.setFormFieldsValue(data);
    }
  };

  onTargetComparisonModelChange = (o) => {
    this.setState({ currentTargetComparisonModel: toString(o) });
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
      values[fieldData.name.name] = getValueByKey({
        data: metaData,
        key: fieldData.name.name,
      });

      values[fieldData.targetName.name] = getValueByKey({
        data: metaData,
        key: fieldData.targetName.name,
      });

      values[fieldData.targetType.name] = getValueByKey({
        data: metaData,
        key: fieldData.targetType.name,
        convert: convertCollection.string,
      });

      values[fieldData.targetComparisonMode.name] = getValueByKey({
        data: metaData,
        key: fieldData.targetComparisonMode.name,
        convert: convertCollection.string,
      });

      values[fieldData.targetValue.name] = getValueByKey({
        data: metaData,
        key: fieldData.targetValue.name,
      });

      values[fieldData.targetMinValue.name] = getValueByKey({
        data: metaData,
        key: fieldData.targetMinValue.name,
      });

      values[fieldData.targetMaxValue.name] = getValueByKey({
        data: metaData,
        key: fieldData.targetMaxValue.name,
      });
    }

    return values;
  };

  establishFormAdditionalConfig = () => {
    return {
      labelCol: {
        flex: '110px',
      },
      wrapperCol: {
        flex: 'auto',
      },
    };
  };

  establishCardCollectionConfig = () => {
    const { dataSchemaList, currentTargetType, currentTargetComparisonModel } =
      this.state;

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
              type: cardConfig.contentItemType.select,
              fieldData: fieldData.targetName,
              listData: dataSchemaList,
              dataConvert: dataFormFieldConvert,
              onChange: this.onTargetNameChange,
              addonAfter: buildButton({
                text: '',
                icon: iconBuilder.reload(),
                handleClick: () => {
                  this.reloadFormFieldOption();
                },
              }),
              require: false,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: renderFormFlowBranchConditionItemTargetTypeSelect({
                onChange: this.onTargetTypeChange,
              }),
              require: true,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component:
                renderFormFlowBranchConditionItemTargetComparisonModeSelect({
                  adjustListData: (list) => {
                    const listAdjust = filter(list, (one) => {
                      if (
                        currentTargetType ===
                        toString(
                          flowBranchConditionItemTargetTypeCollection.number,
                        )
                      ) {
                        return true;
                      }

                      const { flag } = one;

                      return checkInCollection(
                        [
                          toString(
                            flowBranchConditionItemTargetComparisonModelCollection.eq,
                          ),
                          toString(
                            flowBranchConditionItemTargetComparisonModelCollection.ne,
                          ),
                        ],
                        toString(flag),
                      );
                    });

                    return listAdjust;
                  },
                  onChange: this.onTargetComparisonModelChange,
                }),
              require: true,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.targetValue,
              require: true,
              hidden:
                currentTargetType !==
                toString(flowBranchConditionItemTargetTypeCollection.string),
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.inputNumber,
              fieldData: fieldData.targetValue,
              require: true,
              hidden: !(
                currentTargetType ===
                  toString(
                    flowBranchConditionItemTargetTypeCollection.number,
                  ) &&
                !checkInCollection(
                  [
                    toString(
                      flowBranchConditionItemTargetComparisonModelCollection.rangeWithGtAndLt,
                    ),
                    toString(
                      flowBranchConditionItemTargetComparisonModelCollection.rangeWithGtAndLte,
                    ),
                    toString(
                      flowBranchConditionItemTargetComparisonModelCollection.rangeWithGteAndLt,
                    ),
                    toString(
                      flowBranchConditionItemTargetComparisonModelCollection.rangeWithGteAndLte,
                    ),
                  ],
                  toString(currentTargetComparisonModel),
                )
              ),
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.inputNumber,
              fieldData: fieldData.targetMinValue,
              require: true,
              hidden: !(
                currentTargetType ===
                  toString(
                    flowBranchConditionItemTargetTypeCollection.number,
                  ) &&
                checkInCollection(
                  [
                    toString(
                      flowBranchConditionItemTargetComparisonModelCollection.rangeWithGtAndLt,
                    ),
                    toString(
                      flowBranchConditionItemTargetComparisonModelCollection.rangeWithGtAndLte,
                    ),
                    toString(
                      flowBranchConditionItemTargetComparisonModelCollection.rangeWithGteAndLt,
                    ),
                    toString(
                      flowBranchConditionItemTargetComparisonModelCollection.rangeWithGteAndLte,
                    ),
                  ],
                  toString(currentTargetComparisonModel),
                )
              ),
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.inputNumber,
              fieldData: fieldData.targetMaxValue,
              require: true,
              hidden: !(
                currentTargetType ===
                  toString(
                    flowBranchConditionItemTargetTypeCollection.number,
                  ) &&
                checkInCollection(
                  [
                    toString(
                      flowBranchConditionItemTargetComparisonModelCollection.rangeWithGtAndLt,
                    ),
                    toString(
                      flowBranchConditionItemTargetComparisonModelCollection.rangeWithGtAndLte,
                    ),
                    toString(
                      flowBranchConditionItemTargetComparisonModelCollection.rangeWithGteAndLt,
                    ),
                    toString(
                      flowBranchConditionItemTargetComparisonModelCollection.rangeWithGteAndLte,
                    ),
                  ],
                  toString(currentTargetComparisonModel),
                )
              ),
            },
          ],
        },
      ],
    };
  };

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '目标值类型请根据字段类型提示选择。',
        },
        {
          text: '数字类型可以选择大小比较条件。',
        },
        {
          text: '非数字类型仅能选择 ”等于“、”不等于“  条件。',
        },
        {
          text: '日期区间类型将转换为区间对应的总分钟数进行对比。',
        },
      ],
    };
  };
}

export { UpdateBasicInfoModel };
