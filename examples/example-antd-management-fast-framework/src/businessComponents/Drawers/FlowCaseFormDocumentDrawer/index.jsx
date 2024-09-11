import { connect } from 'easy-soft-dva';
import {
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  getValueByKey,
  isArray,
  isEmptyArray,
  logException,
} from 'easy-soft-utility';

import { SyntaxHighlighter } from 'antd-management-fast-component';
import { DocumentPrintDesigner } from 'antd-management-fast-design-playground';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { setDataSchemaAction } from '../../../businessAssists/action';
import {
  listAllApproveProcess,
  listApprove,
  listAttention,
} from '../../../utils';

const { BaseVerticalFlexDrawer } = DataDrawer;

const primaryCallName = 'example::FlowCaseFormDocumentDrawer';

const visibleFlag = '8513c5de635245ff962933f8ad3f9214';

@connect(({ formDesign, schedulingControl }) => ({
  formDesign,
  schedulingControl,
}))
class FlowCaseFormDocumentDrawer extends BaseVerticalFlexDrawer {
  showCallProcess = true;

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
      pageTitle: '表格文档格式预览',
      loadApiPath: 'formDesign/get',
      width: 1024,
      overlayButtonOpenText: '查看数据',
      overlayButtonCloseText: '关闭数据',
    };
  }

  doOtherAfterLoadSuccess = ({
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    this.logCallTrace({ metaData }, primaryCallName, 'doOtherAfterLoadSuccess');
  };

  saveDocumentSchema = (data) => {
    setDataSchemaAction({
      target: this,
      handleData: JSON.stringify(data),
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  establishHelpConfig = () => {
    const { canDesign } = {
      canDesign: false,
      ...this.props,
    };

    return {
      title: '操作提示',
      list: [
        {
          text: '此图例显示的流程表单打印概览, 仅可查看',
        },
        {
          text: '设置为非独占行的单元, 若前一个单元为独占, 则此单元也将转换为行布局, 宽度设置将武侠',
        },
        {
          text: '打印预览需要关闭设计模式',
        },
        canDesign
          ? {
              text: '审批节点样例仅在设计时用于占位进行效果展示, 实际表单将呈现真实审批节点。',
            }
          : null,
      ],
    };
  };

  establishPresetContentContainorInnerTopStyle = () => {
    return {
      backgroundColor: '#ccc',
    };
  };

  renderPresetContentContainorInnerTop = () => {
    const { canDesign } = {
      canDesign: false,
      ...this.props,
    };
    const { metaData } = this.state;

    const { listFormStorage } = {
      listFormStorage: [],
      ...metaData,
    };

    const formRemarkList = getValueByKey({
      data: metaData,
      key: 'formRemarkList',
      convert: convertCollection.array,
    });

    const dataSchema = getValueByKey({
      data: metaData,
      key: 'dataSchema',
      defaultValue: '[]',
    });

    const documentGeneralSchema = getValueByKey({
      data: metaData,
      key: 'documentGeneralSchema',
      defaultValue: {},
    });

    const documentItemsSchema = getValueByKey({
      data: metaData,
      key: 'documentItemsSchema',
      convert: convertCollection.array,
    });

    let listDataSchema = [];

    try {
      listDataSchema = JSON.parse(dataSchema);
    } catch (error) {
      logException(error);
    }

    let items = [];

    if (
      isArray(documentItemsSchema) &&
      !isEmptyArray(documentItemsSchema) &&
      isArray(listDataSchema)
    ) {
      for (const o of listDataSchema) {
        const { name } = { name: '', ...o };

        if (checkStringIsNullOrWhiteSpace(name)) {
          continue;
        }

        let config = {};

        for (const one of documentItemsSchema) {
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

    this.logCallTrace(
      {
        values: listFormStorage,
        schema: {
          general: documentGeneralSchema,
          items,
        },
      },
      primaryCallName,
      'render',
    );

    return (
      <DocumentPrintDesigner
        canDesign={canDesign}
        values={listFormStorage}
        schema={{
          general: documentGeneralSchema,
          items,
        }}
        showAttention
        attentionList={listAttention}
        approveList={listApprove}
        allApproveProcessList={listAllApproveProcess}
        // signetStyle={{
        //   border: '1px solid #000',
        //   width: '120px',
        //   height: '60px',
        //   top: '-10px',
        // }}
        remarkTitle="备注"
        remarkName="remark"
        remarkList={formRemarkList}
        onSave={(data) => {
          this.saveDocumentSchema(data);
        }}
        onClose={() => {
          FlowCaseFormDocumentDrawer.close();
        }}
      />
    );
  };

  renderOverlayContent = () => {
    const { metaData } = this.state;

    const { listFormStorage } = {
      listFormStorage: [],
      ...metaData,
    };

    const documentGeneralSchema = getValueByKey({
      data: metaData,
      key: 'documentGeneralSchema',
      defaultValue: {},
    });

    const documentItemsSchema = getValueByKey({
      data: metaData,
      key: 'documentItemsSchema',
      convert: convertCollection.array,
    });

    const formRemarkList = getValueByKey({
      data: metaData,
      key: 'formRemarkList',
      convert: convertCollection.array,
    });

    const dataSchema = getValueByKey({
      data: metaData,
      key: 'dataSchema',
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
      isArray(documentItemsSchema) &&
      !isEmptyArray(documentItemsSchema) &&
      isArray(listDataSchema)
    ) {
      for (const o of listDataSchema) {
        const { name } = { name: '', ...o };

        if (checkStringIsNullOrWhiteSpace(name)) {
          continue;
        }

        let config = {};

        for (const one of documentItemsSchema) {
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

    // const { general } = {
    //   general: {},
    //   ...documentSchema,
    // };

    const data = {
      documentSchema: {
        general: documentGeneralSchema,
        items,
      },
      values: listFormStorage,
      remarkSchemaList: formRemarkList,
    };

    return (
      <div
        style={{
          width: '90%',
          height: '90%',
          background: '#fff',
          padding: '16px 16px 26px 16px',
          borderRadius: '10px',
          overflow: 'hidden',
        }}
      >
        <SyntaxHighlighter
          language="js"
          value={JSON.stringify(data, null, 2)}
          other={{ showLineNumbers: true, wrapLines: true }}
          style={{
            height: '100%',
            marginLeft: '0px',
            marginRight: '0px',
          }}
        />
      </div>
    );
  };
}

export { FlowCaseFormDocumentDrawer };
