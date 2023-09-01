import { connect } from 'easy-soft-dva';

import { Playground } from 'antd-management-fast-design-playground';
import {
  ArrayCards,
  ArrayTable,
  Card,
  Cascader,
  Checkbox,
  DatePicker,
  Field,
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

const visibleFlag = 'E3F3492EE09B463A89D3B5989FF05B6D';

@connect(({ schedulingControl }) => ({
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
    console.log(data);
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
