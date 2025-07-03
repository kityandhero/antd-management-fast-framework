import { connect } from 'easy-soft-dva';
import {
  checkStringIsNullOrWhiteSpace,
  getValueByKey,
  isArray,
  isEmptyArray,
  isFunction,
} from 'easy-soft-utility';

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
  // Upload,
} from 'antd-management-fast-formily';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { fieldData } from '../Common/data';

const { BaseUpdateDrawer } = DataDrawer;

const visibleFlag = '4b5cd020d5be41e8bb3e503f46c7a6a0';

@connect(({ workflowFormDesign, schedulingControl }) => ({
  workflowFormDesign,
  schedulingControl,
}))
class DesignDrawer extends BaseUpdateDrawer {
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
      showBottomBar: false,
      loadApiPath: 'workflowFormDesign/getByWorkflow',
      submitApiPath: 'workflowFormDesign/updateBasicInfo',
      width: '100vw',
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

  adjustHeaderStyle = () => {
    return {
      display: 'none',
    };
  };

  save = (data) => {
    const { afterSave } = this.props;
    const { metaData } = this.state;

    const workflowFormDesignId = getValueByKey({
      data: metaData,
      key: fieldData.workflowFormDesignId.name,
    });

    const {
      schema: { properties },
    } = {
      form: {},
      schema: {},
      ...(checkStringIsNullOrWhiteSpace(data) ? {} : JSON.parse(data)),
    };

    const dataSchema = [];

    for (const [key, value] of Object.entries(properties)) {
      const {
        title,
        type,
        name,
        enum: enumList,
      } = {
        title: '',
        name: key,
        enum: [],
        ...value,
      };

      if (isArray(enumList) && !isEmptyArray(enumList)) {
        const l = enumList.map((o) => {
          const { label, value } = {
            label: '',
            value: '',
            ...o,
          };

          return { label, value };
        });

        dataSchema.push({ title, type, name, enumList: l });
      } else {
        dataSchema.push({ title, type, name });
      }
    }

    this.execSubmitApi({
      values: {
        workflowFormDesignId,
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
          // Upload,
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
          // Upload,
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
          DesignDrawer.close();
        }}
        afterLocalSave={(data) => {
          this.save(data);
        }}
      />
    );
  };
}

export { DesignDrawer };
