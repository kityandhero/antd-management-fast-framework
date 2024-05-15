import { connect } from 'easy-soft-dva';
import {
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  getValueByKey,
  isArray,
  isEmptyArray,
  logException,
} from 'easy-soft-utility';

import { DocumentPrintDesigner } from 'antd-management-fast-design-playground';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { updateDocumentSchemaAction } from '../Assist/action';
import { fieldData } from '../Common/data';

const { BaseVerticalFlexDrawer } = DataDrawer;

const visibleFlag = '64d7f22032f54376a6af4777d475b680';

@connect(({ workflowFormDesign, schedulingControl }) => ({
  workflowFormDesign,
  schedulingControl,
}))
class FlowCaseFormDocumentDrawer extends BaseVerticalFlexDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  static close() {
    switchControlAssist.close(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '流程表单打印设计',
      loadApiPath: 'workflowFormDesign/getByWorkflow',
      width: 1024,
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

    d[fieldData.workflowId.name] = getValueByKey({
      data: externalData,
      key: fieldData.workflowId.name,
    });

    return d;
  };

  saveDataSchema = (data) => {
    const { metaData } = this.state;

    const workflowFormDesignId = getValueByKey({
      data: metaData,
      key: fieldData.workflowFormDesignId.name,
    });

    updateDocumentSchemaAction({
      target: this,
      handleData: {
        workflowFormDesignId: workflowFormDesignId || '',
        documentSchema: JSON.stringify(data),
      },
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '此图例显示的流程表单打印概览, 仅可查看。',
        },
        {
          text: '设置为非独占行的单元, 若前一个单元为独占, 则此单元也将转换为行布局, 宽度设置将无效。',
        },
        {
          text: '打印预览需要关闭设计模式。',
        },
      ],
    };
  };

  establishPresetContentContainorInnerTopStyle = () => {
    return {
      backgroundColor: '#ccc',
    };
  };

  renderPresetContentContainorInnerTop = () => {
    const { canDesign, values } = this.props;
    const { metaData } = this.state;

    const remarkSchemaList = getValueByKey({
      data: metaData,
      key: fieldData.remarkSchemaList.name,
      convert: convertCollection.array,
    });

    const documentSchema = getValueByKey({
      data: metaData,
      key: fieldData.documentSchema.name,
      defaultValue: {},
    });

    const { general, items: itemsSource } = {
      general: {},
      items: [],
      ...documentSchema,
    };

    const dataSchema = getValueByKey({
      data: metaData,
      key: fieldData.dataSchema.name,
      defaultValue: '[]',
    });

    let listDataSchema = [];

    try {
      listDataSchema = JSON.parse(dataSchema);
    } catch (error) {
      logException(error);
    }

    let items = [];

    if (
      isArray(itemsSource) &&
      !isEmptyArray(itemsSource) &&
      isArray(listDataSchema)
    ) {
      for (const o of listDataSchema) {
        const { name } = { name: '', ...o };

        if (checkStringIsNullOrWhiteSpace(name)) {
          continue;
        }

        let config = {};

        for (const one of itemsSource) {
          const { name: nameOne } = { name: '', ...one };

          if (nameOne === name) {
            config = one;

            break;
          }
        }

        items.push({ ...config, ...o });
      }
    } else {
      items = listDataSchema;
    }

    return (
      <DocumentPrintDesigner
        canDesign={canDesign}
        title={getValueByKey({
          data: metaData,
          key: fieldData.workflowName.name,
        })}
        values={isArray(values) ? values : []}
        schema={{
          general: general || {},
          items,
        }}
        remarkTitle="备注"
        remarkName="remark"
        remarkList={remarkSchemaList}
        onSave={(data) => {
          this.saveDataSchema(data);
        }}
      />
    );
  };
}

FlowCaseFormDocumentDrawer.defaultProps = {
  canDesign: false,
  values: [],
};

export { FlowCaseFormDocumentDrawer };
