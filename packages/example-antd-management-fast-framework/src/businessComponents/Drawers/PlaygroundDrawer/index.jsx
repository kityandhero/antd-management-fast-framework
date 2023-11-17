import { connect } from 'easy-soft-dva';
import { checkStringIsNullOrWhiteSpace, isFunction } from 'easy-soft-utility';

import { Playground } from 'antd-management-fast-design-playground';
import {
  ArrayCards,
  ArrayTable,
  Card,
  Cascader,
  Checkbox,
  DatePicker,
  Field,
  FileUpload,
  Form,
  FormCollapse,
  FormGrid,
  FormLayout,
  FormTab,
  Input,
  NumberPicker,
  ObjectContainer,
  Password,
  Radio,
  Rate,
  Select,
  Slider,
  Space,
  Switch,
  Text,
  TimePicker,
  Transfer,
  TreeSelect,
  Upload,
} from 'antd-management-fast-formily';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

const { BaseFormDrawer } = DataDrawer;

const visibleFlag = '3f955425f2de43ad884f9d3e6be6ac57';

@connect(({ formDesign, schedulingControl }) => ({
  formDesign,
  schedulingControl,
}))
class PlaygroundDrawer extends BaseFormDrawer {
  // showCallProcess = true;

  resetDataAfterLoad = false;

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
      loadApiPath: 'formDesign/get',
      submitApiPath: 'formDesign/set',
      width: '100vw',
      overlayButtonOpenText: '打开源代码',
      overlayButtonCloseText: '关闭源代码',
    };
  }

  adjustHeaderStyle = () => {
    return {
      display: 'none',
    };
  };

  save = (data) => {
    const { afterSave } = this.props;

    const {
      schema: { properties },
    } = {
      schema: {},
      ...(checkStringIsNullOrWhiteSpace(data) ? {} : JSON.parse(data)),
    };

    const dataSchema = [];

    for (const [key, value] of Object.entries(properties)) {
      const { title, type, name, fullLine } = {
        name: key,
        fullLine: '1',
        ...value,
      };

      dataSchema.push({ title, type, name, fullLine });
    }

    this.execSubmitApi({
      values: {
        designSchema: data,
        dataSchema: JSON.stringify(dataSchema),
      },
      successCallback: () => {
        if (isFunction(afterSave)) {
          afterSave();
        }
      },
    });
  };

  renderPresetTitle = () => {
    return '表单设计';
  };

  renderPresetContentContainorInner = () => {
    return (
      <Playground
        inputs={[
          Input,
          Password,
          NumberPicker,
          Rate,
          Slider,
          Select,
          TreeSelect,
          Cascader,
          Transfer,
          Checkbox,
          Radio,
          DatePicker,
          TimePicker,
          Upload,
          Switch,
          ObjectContainer,
        ]}
        layouts={[Card, FormGrid, FormTab, FormLayout, FormCollapse, Space]}
        arrays={[ArrayCards, ArrayTable]}
        displays={[Text]}
        higherOrders={[FileUpload]}
        widgetComponents={{
          Form,
          Field,
          Input,
          Select,
          TreeSelect,
          Cascader,
          Radio,
          Checkbox,
          Slider,
          Rate,
          NumberPicker,
          Transfer,
          Password,
          DatePicker,
          TimePicker,
          FileUpload,
          Upload,
          Switch,
          Text,
          Card,
          ArrayCards,
          ArrayTable,
          Space,
          FormTab,
          FormCollapse,
          FormGrid,
          FormLayout,
          ObjectContainer,
        }}
        onClose={() => {
          PlaygroundDrawer.close();
        }}
        afterLocalSave={(data) => {
          this.save(data);
        }}
      />
    );
  };
}

export { PlaygroundDrawer };
