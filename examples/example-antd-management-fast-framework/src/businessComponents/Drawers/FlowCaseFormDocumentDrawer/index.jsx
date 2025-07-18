import { connect } from 'easy-soft-dva';
import {
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  getGuid,
  getValueByKey,
  isArray,
  isEmptyArray,
  logException,
} from 'easy-soft-utility';

import { extraBuildType } from 'antd-management-fast-common';
import { iconBuilder, SyntaxHighlighter } from 'antd-management-fast-component';
import { DocumentPrintDesigner } from 'antd-management-fast-design-playground';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { setDocumentSchemaAction } from '../../../businessAssists/action';
import {
  listAllApproveProcess,
  listApply,
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
  // showCallProcess = true;

  templateCounter = 0;

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
      nodeApplyTemp: listApply[0],
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
    const { general, title, items } = {
      general: {},
      title: {},
      items: [],
      ...data,
    };

    delete general['general'];
    delete general['items'];

    const o = {};

    o['documentGeneralSchema'] = JSON.stringify(general);

    o['documentTitleSchema'] = JSON.stringify(title);

    o['documentItemsSchema'] = JSON.stringify(items);

    setDocumentSchemaAction({
      target: this,
      handleData: o,
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  changeNodeApply = () => {
    const o = listApply[0];

    this.templateCounter = this.templateCounter + 1;

    this.setState({
      nodeApplyTemp: {
        ...o,
        note: `${o.note}-${getGuid()}`,
        signet:
          this.templateCounter % 2 === 0
            ? 'https://file.oa.32306.net/general/image/1876513865685143552.png'
            : o.signet,
      },
    });
  };

  establishExtraActionConfig = () => {
    return {
      list: [
        {
          buildType: extraBuildType.generalExtraButton,
          icon: iconBuilder.edit(),
          text: '更改审批人信息',
          disabled: this.checkInProgress(),
          handleClick: () => {
            this.changeNodeApply();
          },
        },
      ],
    };
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
          text: '此图例显示的流程表单打印概览, 仅可查看。',
        },
        {
          text: '设置为非独占行的单元, 若前一个单元为独占, 则此单元也将转换为行布局, 宽度设置将无效; 设置为金额显示模式的格子，仅在可以转换的情况下才能用金额显示。',
        },
        {
          text: '打印预览需要关闭设计模式。',
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
    const { metaData, nodeApplyTemp } = this.state;

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

    const documentTitleSchema = getValueByKey({
      data: metaData,
      key: 'documentTitleSchema',
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
          title: documentTitleSchema,
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
          title: documentTitleSchema,
          items,
        }}
        formItems={listDataSchema}
        showApply
        applyList={[nodeApplyTemp]}
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
        remarkList={formRemarkList}
        qRCodeImage="http://file.oa.32306.net/general/image/1836587864801021952.png"
        qRCodeTitle="防伪二维码:'"
        qRCodeDescription="扫码查看防伪标识"
        qRCodeHeight={40}
        serialNumberTitle="审批流水号: "
        serialNumberContent="1836370789809655808"
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

    const documentTitleSchema = getValueByKey({
      data: metaData,
      key: 'documentTitleSchema',
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
        title: documentTitleSchema,
        items,
      },
      formItems: listDataSchema,
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
