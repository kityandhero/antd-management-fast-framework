import {
  Alert,
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Tree,
  TreeSelect,
} from 'antd';
import React from 'react';
import ReactJson from 'react-json-view';
import ReactPlayer from 'react-player';
import { BorderOuterOutlined, EllipsisOutlined } from '@ant-design/icons';

import {
  buildFieldDescription,
  buildFieldHelper,
  checkFromConfig,
  checkStringIsNullOrWhiteSpace,
  datetimeFormat,
  formatDatetime,
  isArray,
  isBoolean,
  isFunction,
  isObject,
  logObject,
  showSimpleRuntimeError,
  toNumber,
  toString,
  transformListData,
  whetherNumber,
} from 'easy-soft-utility';

import { listViewConfig } from 'antd-management-fast-common';

import { FadeBox } from '../../AnimalBox/FadeBox';
import { QueueBox } from '../../AnimalBox/QueueBox';
import { RotateBox } from '../../AnimalBox/RotateBox';
import { ColorText } from '../../ColorText';
import { CustomGrid } from '../../CustomGrid';
import { DescriptionGrid } from '../../DescriptionGrid';
import { ElasticityButton } from '../../ElasticityButton';
import { ElasticityDropdown } from '../../ElasticityDropdown';
import { ElasticityListViewItemExtra } from '../../ElasticityListViewItemExtra';
import { ElasticityMenu } from '../../ElasticityMenu';
import { ElasticityMenuHeader } from '../../ElasticityMenuHeader';
import { ElasticityRadioGroup } from '../../ElasticityRadioGroup';
import { ElasticityRadioItem } from '../../ElasticityRadioItem';
import { ElasticityTagList } from '../../ElasticityTagList';
import { FlexBox } from '../../FlexBox';
import { FormExtra } from '../../FormExtra';
import { HiddenWrapper } from '../../HiddenWrapper';
import { iconBuilder } from '../../Icon';
import { IconInfo } from '../../IconInfo';
import { VerticalBox } from '../../VerticalBox';

import styles from './index.less';

const FormItem = Form.Item;
const { TextArea, Password } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;
const ButtonGroup = Button.Group;

const {
  DatePickerItem,
  ComponentItem,
  InputItem,
  InputNumberItem,
  OnlyShowInputItem,
  SyntaxHighlighterItem,
  SelectItem,
  TextAreaItem,
  TimePickerItem,
  SwitchItem,
} = FormExtra;

/**
 * 构建按钮
 */
export function buildButton({
  type = 'default',
  size = 'default',
  text = '按钮',
  icon = iconBuilder.form(),
  handleClick = () => {},
  hidden = false,
  danger = false,
  disabled = false,
  confirm = false,
  handleData = null,
  processing = false,
  iconProcessing = iconBuilder.loading(),
  style = null,
  showIcon = true,
}) {
  return (
    <ElasticityButton
      type={type}
      size={size}
      text={text}
      icon={icon}
      handleClick={handleClick}
      hidden={hidden}
      danger={danger}
      disabled={disabled}
      confirm={confirm}
      handleData={handleData}
      processing={processing}
      iconProcessing={iconProcessing}
      style={style}
      showIcon={showIcon}
    />
  );
}

export function buildMenu({
  handleData: r,
  handleMenuClick = () => {},
  items = [],
}) {
  return (
    <ElasticityMenu
      handleData={r}
      handleMenuClick={handleMenuClick}
      items={items}
    />
  );
}

export function buildDropdown({
  key = null,
  tooltip = false,
  type = 'default',
  placement = 'bottomRight',
  size = 'default',
  text = '按钮',
  icon = iconBuilder.form(),
  handleData,
  arrow = true,
  disabled = false,
  hidden = false,
  handleButtonClick = null,
  handleMenuClick = () => {},
  items = [],
  itemPanelTitle = '',
  confirm = false,
  processing = false,
  iconProcessing = iconBuilder.loading(),
}) {
  return (
    <ElasticityDropdown
      tooltip={tooltip}
      type={type}
      placement={placement}
      size={size}
      text={text}
      icon={icon}
      handleData={handleData}
      arrow={arrow}
      disabled={disabled}
      hidden={hidden}
      confirm={confirm}
      handleButtonClick={handleButtonClick}
      handleMenuClick={handleMenuClick}
      items={items}
      itemPanelTitle={itemPanelTitle}
      processing={processing}
      iconProcessing={iconProcessing}
      {...(key ? { key: key } : {})}
    />
  );
}

export function buildDropdownButton({
  tooltip = false,
  placement = 'bottomRight',
  type: typeSource = 'default',
  size = 'small',
  text = '按钮',
  icon = iconBuilder.form(),
  handleData: r,
  arrow = true,
  disabled = false,
  hidden = false,
  confirm = false,
  handleButtonClick = null,
  handleMenuClick = () => {},
  items = [],
  itemPanelTitle = '',
}) {
  return buildDropdown({
    tooltip,
    type: typeSource,
    placement,
    size,
    text,
    icon,
    handleData: r,
    arrow,
    disabled,
    hidden,
    confirm,
    handleButtonClick,
    handleMenuClick,
    items,
    itemPanelTitle,
  });
}

export function buildDropdownEllipsis({
  tooltip = { placement: 'top', title: '更多操作' },
  type: typeSource = 'default',
  size = 'default',
  icon = (
    <EllipsisOutlined
      style={{
        fontSize: 20,
        verticalAlign: 'top',
      }}
    />
  ),
  arrow = true,
  disabled = false,
  hidden = false,
  handleData: r,
  handleMenuClick = () => {},
  items = [],
  itemPanelTitle = '',
}) {
  return buildDropdown({
    tooltip,
    type: typeSource,
    size,
    text: '',
    icon,
    handleData: r,
    arrow,
    disabled,
    hidden,
    handleButtonClick: null,
    handleMenuClick,
    items,
    itemPanelTitle,
  });
}

export function buildTree(properties) {
  return <Tree {...properties} />;
}

export function buildAlert(properties) {
  return <Alert {...properties} />;
}

export function buildCustomGrid({ key = null, list, props }) {
  return (
    <CustomGrid
      {...(checkStringIsNullOrWhiteSpace(key) ? {} : { key })}
      list={list}
      config={props}
    />
  );
}

export function buildDescriptionGrid({ key = null, list, props }) {
  return (
    <DescriptionGrid
      {...(checkStringIsNullOrWhiteSpace(key) ? {} : { key })}
      list={list}
      config={props}
    />
  );
}

export function buildPageHeaderTagWrapper(Tags) {
  return (
    <>
      <div
        style={{
          position: 'relative',
          height: '24px',
          padding: '0 14px 0 0',
          lineHeight: '24px',
        }}
      >
        {Tags}
      </div>
    </>
  );
}

export function builderPageHeaderExtraContent(data) {
  if ((data || null) == null) {
    return null;
  }

  const v = {
    textLabel: '描述',
    text: '',
    tileLabel: '时间',
    time: new Date(),
    ...data,
  };

  const textStyle = {
    fontSize: '20px',
  };

  return (
    <Row>
      <Col xs={24} sm={12}>
        <div>创建日期</div>
        <div style={textStyle}>
          {formatDatetime({
            data: v.time,
            format: 'HH:mm:ss',
            defaultValue: '--',
          })}
          <br />
          {formatDatetime({
            data: v.time,
            format: 'YYYY-MM-DD',
          })}
        </div>
      </Col>
      <Col xs={24} sm={12}>
        <div>{v.textLabel}</div>
        <div style={textStyle}>{v.text}</div>
      </Col>
    </Row>
  );
}

export function buildMenuHeaderRender({
  logoDom,
  collapsed,
  navTheme,
  shortName,
}) {
  return (
    <ElasticityMenuHeader
      logoDom={logoDom}
      collapsed={collapsed}
      navTheme={navTheme}
      shortName={shortName}
    />
  );
}

export function buildButtonGroup({ buttons = [] }) {
  if (!isArray(buttons) || buttons.length <= 0) {
    return null;
  }

  return (
    <ButtonGroup>
      {buttons.map((item, index) => {
        const { hidden } = { hidden: false, ...item };

        if (hidden) {
          return null;
        }

        if (!item.key) {
          item.key = `button_group_${index}`;
        }

        return buildDropdown(item);
      })}
    </ButtonGroup>
  );
}

export function buildListViewItemExtra({
  align,
  imageUrl,
  emptyImageUrl,
  width = '100px',
}) {
  return (
    <ElasticityListViewItemExtra
      {...{ align, imageUrl, emptyImageUrl, width }}
    />
  );
}

export function buildTagList({ list = [] }) {
  return <ElasticityTagList list={list} />;
}

export function buildIconInfoList({ list = [] }) {
  if (!isArray(list)) {
    return [];
  }

  if (list.length === 0) {
    return [];
  }

  const l = [];

  for (const [index, o] of list.entries()) {
    const { hidden, ...other } = {
      ...IconInfo.defaultProps,
      ...o,

      key: `icon_info_item_${index}`,
    };

    if (!hidden) {
      l.push({
        ...other,
      });
    }
  }

  if (l.length <= 0) {
    return [];
  }

  return l.map((o) => {
    const { key, ...other } = o;

    return <IconInfo key={key} {...other} />;
  });
}

export function buildListViewItemActionSelect({
  confirm = false,
  selectData,
  selectCallback,
}) {
  if (!isFunction(selectCallback)) {
    const text = 'selectCallback 不是有效的回调函数';

    showSimpleRuntimeError(text);
  }

  return buildButton({
    confirm,
    size: 'small',
    type: 'link',
    icon: iconBuilder.import(),
    text: '选取',
    showIcon: true,
    handleClick: ({ handleData }) => {
      if (isFunction(selectCallback)) {
        selectCallback(handleData);
      }
    },
    handleData: selectData,
  });
}

export function buildRadioItem({
  button = false,
  list,
  adjustListDataCallback = null,
}) {
  return (
    <ElasticityRadioItem
      button={button}
      list={list}
      adjustListDataCallback={adjustListDataCallback}
    />
  );
}

export function buildRadioGroup({
  value = null,
  defaultValue = null,
  style = null,
  button = false,
  buttonStyle = null,
  list,
  adjustListDataCallback = null,
  onChange = null,
}) {
  return (
    <ElasticityRadioGroup
      value={value}
      defaultValue={defaultValue}
      style={style}
      button={button}
      buttonStyle={buttonStyle}
      list={list}
      adjustListDataCallback={adjustListDataCallback}
      onChange={onChange}
    />
  );
}

/**
 *build custom radio group
 */
export function buildCustomRadio({
  label,
  value = null,
  separator = '：',
  size = 'middle',
  renderItemFunction,
  onChangeCallback = null,
  otherProps: otherProperties = null,
}) {
  const otherRadioProperties = {
    placeholder: buildFieldDescription(label, '选择'),
    style: { width: '100%' },
    size,
    value,
    onChange: (event) => {
      if (isFunction(onChangeCallback)) {
        onChangeCallback(event);
      }
    },
    ...otherProperties,
  };

  return (
    <FlexBox
      flexAuto="right"
      left={
        checkStringIsNullOrWhiteSpace(label || '') ? null : (
          <VerticalBox
            align="center"
            alignJustify="start"
            style={{
              height: '100%',
            }}
          >
            {`${label}${separator}`}
          </VerticalBox>
        )
      }
      right={
        <RadioGroup {...otherRadioProperties}>
          {isFunction(renderItemFunction) ? renderItemFunction() : null}
        </RadioGroup>
      }
    />
  );
}

export function buildFormRadio({
  label,
  name,
  renderItemFunction,
  helper = null,
  onChangeCallback = null,
  formItemLayout = null,
  required = false,
  otherProps: otherProperties = null,
}) {
  const otherRadioProperties = {
    placeholder: buildFieldDescription(label, '选择'),
    style: { width: '100%' },
    onChange: (event) => {
      if (isFunction(onChangeCallback)) {
        onChangeCallback(event);
      }
    },
    ...otherProperties,
  };

  const resultCheck = checkFromConfig({
    label,
    name,
    helper,
  });

  return (
    <FormItem
      {...(formItemLayout || {})}
      label={resultCheck.label}
      name={resultCheck.name}
      extra={
        checkStringIsNullOrWhiteSpace(resultCheck.helper || '')
          ? null
          : buildFieldHelper(resultCheck.helper)
      }
      rules={[
        {
          required,
          message: buildFieldDescription(resultCheck.label, '选择'),
        },
      ]}
    >
      <RadioGroup {...otherRadioProperties}>
        {isFunction(renderItemFunction) ? renderItemFunction() : null}
      </RadioGroup>
    </FormItem>
  );
}

export function buildOptionItem({ list, adjustListDataCallback = null }) {
  let listData = list || [];

  if (isFunction(adjustListDataCallback)) {
    listData = adjustListDataCallback(listData);
  }

  const listOption = [];

  if (listData.length > 0) {
    for (const item of listData) {
      const { name, flag, alias, description, availability } = {
        name: '',
        flag: '',
        description: '',
        alias: '',
        availability: whetherNumber.yes,
        ...item,
      };

      if (checkStringIsNullOrWhiteSpace(toString(name))) {
        const text = 'name 不能为空';

        showSimpleRuntimeError(text);
      }

      if (checkStringIsNullOrWhiteSpace(toString(flag))) {
        const text = 'flag 不能为空';

        showSimpleRuntimeError(text);
      }

      listOption.push(
        <Option
          key={`${flag}_${name}`}
          title={`${alias || name}${
            checkStringIsNullOrWhiteSpace(description || '')
              ? ''
              : `[${description}]`
          }`}
          value={flag}
          disabled={toNumber(availability) !== whetherNumber.yes}
        >
          {name}
        </Option>,
      );
    }

    return listOption;
  }

  return null;
}

export function buildCustomSelect({
  label,
  value = null,
  separator = '：',
  size = 'middle',
  renderItemFunction,
  onChangeCallback = null,
  otherProps: otherProperties = null,
}) {
  const otherSelectProperties = {
    placeholder: buildFieldDescription(label, '选择') || '请选择',
    size,
    value,
    style: { width: '100%' },
    onChange: (v, option) => {
      if (isFunction(onChangeCallback)) {
        onChangeCallback(v, option);
      }
    },
    ...otherProperties,
  };

  return (
    <FlexBox
      flexAuto="right"
      left={
        checkStringIsNullOrWhiteSpace(label || '') ? null : (
          <VerticalBox
            align="center"
            alignJustify="start"
            style={{
              height: '100%',
            }}
          >
            {`${label}${separator}`}
          </VerticalBox>
        )
      }
      right={
        <Select {...otherSelectProperties}>
          {isFunction(renderItemFunction) ? renderItemFunction() : null}
        </Select>
      }
    />
  );
}

export function buildTreeSelect({
  value: v,
  placeholder = '',
  onChangeCallback = null,
  otherProps: otherProperties = {},
  listData = [],
  dataConvert = null,
}) {
  const adjustOtherProperties = {
    style: { width: '100%' },
    showSearch: true,
    allowClear: true,
    treeLine: true,
    placeholder,
    ...otherProperties,

    value: v || null,
  };

  const listDataSource = isArray(listData) ? listData : [];

  const listDataAdjust = isFunction(dataConvert)
    ? transformListData({
        list: listDataSource,
        convert: dataConvert,
        recursiveKey: 'children',
      })
    : listDataSource;

  adjustOtherProperties.treeData = listDataAdjust;
  adjustOtherProperties.onChange = (value, label, extra) => {
    if (isFunction(onChangeCallback)) {
      onChangeCallback({
        value,
        label,
        extra,
        treeData: listDataAdjust,
        listData,
      });
    }
  };

  return <TreeSelect {...adjustOtherProperties} />;
}

export function buildFormSelect({
  label,
  name,
  renderItemFunction,
  helper = null,
  onChangeCallback = null,
  formItemLayout = null,
  required = false,
  otherProps: otherProperties = null,
}) {
  return (
    <SelectItem
      label={label}
      name={name}
      renderItemFunction={renderItemFunction}
      helper={helper}
      onChangeCallback={onChangeCallback}
      formItemLayout={formItemLayout}
      required={required}
      otherProps={otherProperties}
    />
  );
}

export function buildSearchFormSelect({ label, name, options, helper = null }) {
  const resultCheck = checkFromConfig({
    label,
    name,
    helper,
  });

  return (
    <FormItem
      label={resultCheck.label}
      name={resultCheck.name}
      rules={[
        {
          required: false,
          message: buildFieldDescription(resultCheck.label, '选择'),
        },
      ]}
      extra={
        checkStringIsNullOrWhiteSpace(resultCheck.helper || '')
          ? null
          : buildFieldHelper(resultCheck.helper)
      }
    >
      <Select
        placeholder={buildFieldDescription(resultCheck.label, '选择')}
        style={{ width: '100%' }}
      >
        {options}
      </Select>
    </FormItem>
  );
}

export function buildFormNowTimeField({
  label = '添加时间',
  helper = '数据的添加时间',
  formItemLayout = null,
}) {
  const {
    label: labelChanged,
    helper: helperChanged,
    formItemLayout: formItemLayoutChanged,
  } = {
    helper: helper || '数据的添加时间',
    label: label || '添加时间',
    formItemLayout: formItemLayout || null,
  };

  const resultCheck = checkFromConfig({
    label: labelChanged || '添加时间',
    name: '',
    helper: helperChanged,
  });

  return (
    <FormItem
      {...(formItemLayoutChanged || {})}
      label={resultCheck.label}
      extra={
        checkStringIsNullOrWhiteSpace(resultCheck.helper || '')
          ? null
          : buildFieldHelper(resultCheck.helper)
      }
    >
      <Input
        value={formatDatetime({
          data: new Date(),
          format: datetimeFormat.yearMonthDayHourMinute,
        })}
        addonBefore={iconBuilder.form()}
        disabled
        placeholder={buildFieldDescription(resultCheck.label)}
      />
    </FormItem>
  );
}

export function buildFormCreateTimeField({
  name = 'createTime',
  helper = '数据的添加时间',
  label = '添加时间',
  formItemLayout = null,
}) {
  const title = label || '添加时间';

  const resultCheck = checkFromConfig({
    label: title,
    name,
    helper,
  });

  return (
    <FormItem
      {...(formItemLayout || {})}
      label={resultCheck.label}
      name={resultCheck.name}
      extra={
        checkStringIsNullOrWhiteSpace(resultCheck.helper || '')
          ? null
          : buildFieldHelper(resultCheck.helper)
      }
    >
      <Input
        addonBefore={iconBuilder.form()}
        disabled
        placeholder={buildFieldDescription(resultCheck.label)}
      />
    </FormItem>
  );
}

export function buildFormUpdateTimeField({
  name = 'updateTime',
  helper = '数据的最后修改时间',
  label = '最后修改时间',
  formItemLayout = null,
}) {
  const title = label || '最后修改时间';

  const resultCheck = checkFromConfig({
    label: title,
    name,
    helper,
  });

  return (
    <FormItem
      {...(formItemLayout || {})}
      label={resultCheck.label}
      name={resultCheck.name}
      extra={
        checkStringIsNullOrWhiteSpace(resultCheck.helper || '')
          ? null
          : buildFieldHelper(resultCheck.helper)
      }
    >
      <Input
        addonBefore={iconBuilder.form()}
        disabled
        placeholder={buildFieldDescription(resultCheck.label)}
      />
    </FormItem>
  );
}

export function buildSearchInput({
  label,
  name,
  helper = null,
  icon = iconBuilder.form(),
  inputProps: inputProperties = {},
  canOperate = true,
  formItemLayout = {},
}) {
  const title = label;

  const otherInputProperties = {
    addonBefore: icon,
    placeholder: buildFieldDescription(title, '输入'),
    ...inputProperties,
  };

  const resultCheck = checkFromConfig({
    label: title,
    name,
    helper,
  });

  if (!canOperate) {
    return (
      <FormItem
        {...formItemLayout}
        label={resultCheck.label}
        name={resultCheck.name}
        extra={
          checkStringIsNullOrWhiteSpace(resultCheck.helper || '')
            ? null
            : buildFieldHelper(resultCheck.helper)
        }
      >
        <Input {...otherInputProperties} />
      </FormItem>
    );
  }

  return (
    <FormItem
      {...formItemLayout}
      label={resultCheck.label}
      name={resultCheck.name}
      extra={
        checkStringIsNullOrWhiteSpace(resultCheck.helper || '')
          ? null
          : buildFieldHelper(resultCheck.helper)
      }
    >
      <Input {...otherInputProperties} />
    </FormItem>
  );
}

export function buildSearchInputNumber({
  label,
  name,
  helper = null,
  icon = iconBuilder.form(),
  inputProps: inputProperties = {},
  canOperate = true,
  formItemLayout = {},
}) {
  const title = label;

  const otherInputProperties = {
    addonBefore: icon,
    style: { width: '100%' },
    min: 0,
    placeholder: buildFieldDescription(title, '输入'),
    disabled: !canOperate,
    ...inputProperties,
  };

  const resultCheck = checkFromConfig({
    label: title,
    name,
    helper,
  });

  return (
    <FormItem
      {...formItemLayout}
      label={resultCheck.label}
      name={resultCheck.name}
      extra={
        checkStringIsNullOrWhiteSpace(resultCheck.helper || '')
          ? null
          : buildFieldHelper(resultCheck.helper)
      }
    >
      <InputNumber {...otherInputProperties} />
    </FormItem>
  );
}

export function buildFormDisplay({
  label,
  content,
  formItemLayout = {},
  useDisplayBoxStyle = true,
}) {
  const title = label;

  let labelText = 'object';

  if (isObject(title)) {
    const text = 'label必须为文本';

    showSimpleRuntimeError(text);

    logObject(label);
  } else {
    labelText = title;
  }

  return (
    <FormItem {...formItemLayout} label={labelText}>
      <div style={useDisplayBoxStyle ? { padding: '4px 0 4px 0' } : {}}>
        {content}
      </div>
    </FormItem>
  );
}

export function buildFormHiddenWrapper({ children, hidden = true }) {
  return <HiddenWrapper hidden={hidden}>{children}</HiddenWrapper>;
}

export function buildFormInput({
  label,
  name,
  required = false,
  helper = null,
  icon = iconBuilder.form(),
  inputProps: inputProperties = {},
  canOperate = true,
  formItemLayout = {},
  reminderPrefix = '输入',
  hidden = false,
}) {
  return (
    <InputItem
      label={label}
      name={name}
      required={required}
      helper={helper}
      icon={icon}
      inputProps={inputProperties}
      canOperate={canOperate}
      formItemLayout={formItemLayout}
      reminderPrefix={reminderPrefix}
      hidden={hidden}
    />
  );
}

export function buildFormInputFieldData({
  fieldData,
  required = false,
  icon = iconBuilder.form(),
  inputProps: inputProperties = {},
  canOperate = true,
  formItemLayout = {},
  reminderPrefix = '输入',
  hidden = false,
}) {
  const { label, name, helper } = {
    label: null,
    name: null,
    helper: null,
    ...fieldData,
  };

  return (
    <InputItem
      label={label}
      name={name}
      required={required}
      helper={helper}
      icon={icon}
      inputProps={inputProperties}
      canOperate={canOperate}
      formItemLayout={formItemLayout}
      reminderPrefix={reminderPrefix}
      hidden={hidden}
    />
  );
}

export function buildFormSwitch({
  label,
  name,
  required = false,
  helper = null,
  otherProps: otherProperties = {},
  canOperate = true,
  formItemLayout = {},
  hidden = false,
}) {
  return (
    <SwitchItem
      label={label}
      name={name}
      helper={helper}
      required={required}
      otherProps={otherProperties}
      canOperate={canOperate}
      formItemLayout={formItemLayout}
      hidden={hidden}
    />
  );
}

export function buildFormPassword({
  label,
  name,
  required = false,
  helper = null,
  icon = iconBuilder.form(),
  inputProps: inputProperties = {},
  canOperate = true,
  formItemLayout = {},
}) {
  const title = label;

  const otherInputProperties = {
    addonBefore: icon,
    placeholder: buildFieldDescription(title, '输入'),
    ...inputProperties,
  };

  const resultCheck = checkFromConfig({
    label: title,
    name,
    helper,
  });

  if (!canOperate) {
    return (
      <FormItem
        {...formItemLayout}
        label={resultCheck.label}
        name={resultCheck.name}
        extra={
          checkStringIsNullOrWhiteSpace(resultCheck.helper || '')
            ? null
            : buildFieldHelper(resultCheck.helper)
        }
        rules={[
          {
            required,
            message: buildFieldDescription(resultCheck.label),
          },
        ]}
      >
        <Password {...otherInputProperties} />
      </FormItem>
    );
  }

  return (
    <FormItem
      {...formItemLayout}
      label={resultCheck.label}
      name={resultCheck.name}
      extra={
        checkStringIsNullOrWhiteSpace(resultCheck.helper || '')
          ? null
          : buildFieldHelper(resultCheck.helper)
      }
      rules={[
        {
          required,
          message: buildFieldDescription(resultCheck.label),
        },
      ]}
    >
      <Password {...otherInputProperties} />
    </FormItem>
  );
}

export function buildFormOnlyShowText({
  label,
  value,
  helper = null,
  formItemLayout = {},
  requiredForShow = false,
}) {
  const title = label;

  const resultCheck = checkFromConfig({
    label: title,
    name: '',
    helper,
  });

  return (
    <FormItem
      {...formItemLayout}
      label={resultCheck.label}
      className={requiredForShow ? styles.formItemOnlyShowText : null}
      // style={{ marginBottom: 0 }}
      extra={
        checkStringIsNullOrWhiteSpace(resultCheck.helper || '')
          ? null
          : buildFieldHelper(resultCheck.helper)
      }
      rules={[
        {
          required: false,
          message: buildFieldDescription(resultCheck.label),
        },
      ]}
    >
      {value}
    </FormItem>
  );
}

export function buildJsonView({ value, theme = 'monokai' }) {
  return (
    <>
      {isObject(value) ? (
        <ReactJson
          src={value}
          theme={theme || 'monokai'}
          name={false}
          displayDataTypes={false}
          displayObjectSize={false}
          enableClipboard={false}
        />
      ) : (
        <ReactJson
          src={JSON.parse(value || '{}')}
          theme={theme || 'monokai'}
          name={false}
          displayDataTypes={false}
          displayObjectSize={false}
          enableClipboard={false}
        />
      )}
    </>
  );
}

export function buildFormInnerComponent({
  label,
  innerComponent,
  helper = null,
  formItemLayout = {},
  requiredForShow = false,
}) {
  return (
    <ComponentItem
      label={label}
      innerComponent={innerComponent}
      helper={helper}
      formItemLayout={formItemLayout}
      requiredForShow={requiredForShow}
    />
  );
}

export function buildFormActionItem({ component, formItemLayout = {} }) {
  if ((component || null) == null) {
    return null;
  }

  return (
    <FormItem {...{ ...formItemLayout, colon: false }} label={<div />}>
      {component}
    </FormItem>
  );
}

export function buildFormButton({ config, formItemLayout = {} }) {
  return (
    <FormItem {...{ ...formItemLayout, colon: false }} label={<div />}>
      {buildButton(config)}
    </FormItem>
  );
}

export function buildFormOnlyShowSyntaxHighlighter({
  language,
  label,
  value,
  helper = null,
  formItemLayout = {},
  requiredForShow = false,
  otherProps: otherProperties = {},
}) {
  return (
    <SyntaxHighlighterItem
      language={language}
      label={label}
      value={value}
      helper={helper}
      formItemLayout={formItemLayout}
      requiredForShow={requiredForShow}
      otherProps={otherProperties}
    />
  );
}

export function buildFormOnlyShowTextarea({
  label,
  value,
  helper = null,
  textAreaProps: textAreaProperties = { disabled: true },
  formItemLayout = {},
}) {
  const title = label;

  const otherTextAreaProperties = {
    placeholder: '暂无数据',
    value: checkStringIsNullOrWhiteSpace(value || '') ? '' : value,
    ...textAreaProperties,
  };

  const resultCheck = checkFromConfig({
    label: title,
    name: '',
    helper,
  });

  return (
    <FormItem
      {...formItemLayout}
      label={resultCheck.label}
      extra={
        checkStringIsNullOrWhiteSpace(resultCheck.helper || '')
          ? null
          : buildFieldHelper(resultCheck.helper)
      }
      rules={[
        {
          required: false,
          message: buildFieldDescription(resultCheck.label),
        },
      ]}
    >
      <TextArea {...otherTextAreaProperties} />
    </FormItem>
  );
}

export function buildFormText({
  label,
  value,
  helper = null,
  formItemLayout = {},
}) {
  const title = label;

  const resultCheck = checkFromConfig({
    label: title,
    name: '',
    helper,
  });

  return (
    <FormItem
      {...formItemLayout}
      label={resultCheck.label}
      extra={
        checkStringIsNullOrWhiteSpace(resultCheck.helper || '')
          ? null
          : buildFieldHelper(resultCheck.helper)
      }
      rules={[
        {
          required: false,
          message: buildFieldDescription(resultCheck.label),
        },
      ]}
    >
      {value}
    </FormItem>
  );
}

export function buildFormOnlyShowInput({
  label,
  value,
  helper = null,
  icon = iconBuilder.form(),
  inputProps: inputProperties = { disabled: true },
  formItemLayout = {},
}) {
  return (
    <OnlyShowInputItem
      label={label}
      value={value}
      helper={helper}
      icon={icon}
      inputProps={inputProperties}
      formItemLayout={formItemLayout}
    />
  );
}

export function buildFormInputNumber({
  label,
  name,
  required = false,
  helper = null,
  icon = iconBuilder.form(),
  inputNumberProps: inputNumberProperties = {},
  canOperate = true,
  formItemLayout = {},
}) {
  return (
    <InputNumberItem
      label={label}
      name={name}
      required={required}
      helper={helper}
      icon={icon}
      inputNumberProps={inputNumberProperties}
      canOperate={canOperate}
      formItemLayout={formItemLayout}
    />
  );
}
export function buildFormTextArea({
  label,
  name,
  required = false,
  helper = null,
  textAreaProps: textAreaProperties = {},
  canOperate = true,
  formItemLayout = {},
}) {
  return (
    <TextAreaItem
      label={label}
      name={name}
      required={required}
      helper={helper}
      textAreaProps={textAreaProperties}
      canOperate={canOperate}
      formItemLayout={formItemLayout}
    />
  );
}

export function buildFormDatePicker({
  label,
  name,
  required = false,
  helper = null,
  datePickerProps: datePickerProperties = {},
  canOperate = true,
  formItemLayout = {},
}) {
  return (
    <DatePickerItem
      label={label}
      name={name}
      required={required}
      helper={helper}
      datePickerProps={datePickerProperties}
      canOperate={canOperate}
      formItemLayout={formItemLayout}
    />
  );
}

export function buildFormTimePicker({
  label,
  name,
  required = false,
  helper = null,
  timePickerProps: timePickerProperties = {},
  canOperate = true,
  formItemLayout = {},
}) {
  return (
    <TimePickerItem
      label={label}
      name={name}
      required={required}
      helper={helper}
      datePickerProps={timePickerProperties}
      canOperate={canOperate}
      formItemLayout={formItemLayout}
    />
  );
}

export function buildPlayer({
  url,
  width = '100%',
  height = 'auto',
  controls = true,
}) {
  return (
    <ReactPlayer width={width} height={height} url={url} controls={controls} />
  );
}

/**
 * 构建彩色文本
 */
export function buildColorText({
  canCopy = false,
  randomSeed = 0,
  seedOffset = 0,
  randomColor = false,
  color = '',
  textPrefix = null,
  textPrefixStyle = null,
  text = '',
  separator = '：',
  separatorStyle = null,
  wrapperBuilder = null,
}) {
  const colorText = (
    <ColorText
      canCopy={canCopy || false}
      randomSeed={randomSeed || 0}
      seedOffset={seedOffset || 0}
      randomColor={randomColor || false}
      color={color || ''}
      textPrefix={textPrefix || null}
      textPrefixStyle={textPrefixStyle || null}
      text={text || ''}
      separator={separator || '：'}
      separatorStyle={separatorStyle || null}
    />
  );

  if (!isFunction(wrapperBuilder)) {
    return colorText;
  }

  return wrapperBuilder(colorText);
}

export function adjustTableExpandConfig({ list, config }) {
  if ((config || null) != null) {
    const {
      checkNeedExpander,
      rowExpandable,
      expandPlaceholderIcon,
      expanderStyle,
      animalType: expandAnimalType,
      expandIconRotate,
      expandIcon: expandIconCustom,
      expandedRowRender: expandedRowRenderCustom,
    } = {
      // 判断当前列表数据，如若列表所有数据都不需要显示展开按钮，则忽略其他配置

      checkNeedExpander: null,
      rowExpandable: false,
      expandPlaceholderIcon: (
        <BorderOuterOutlined
          style={{
            color: '#ccc',
          }}
        />
      ),
      expanderStyle: null,
      animalType: listViewConfig.expandAnimalType.none,
      expandIconRotate: true,
      // eslint-disable-next-line no-unused-vars
      expandIcon: ({ expanded, onExpand, record }) => {
        return iconBuilder.rightCircle({ style: { cursor: 'pointer' } });
      },
      expandedRowRender: null,
      ...(config || null),
    };

    let checkNeedExpanderResult = true;

    if (isBoolean(checkNeedExpander)) {
      checkNeedExpanderResult = checkNeedExpander;
    }

    if (isFunction(checkNeedExpander)) {
      const r = checkNeedExpander(list);

      if (isBoolean(checkNeedExpander)) {
        checkNeedExpanderResult = r;
      }
    }

    const expandableConfig = checkNeedExpanderResult
      ? {
          rowExpandable,
          expandIcon: ({
            expandable: canExpand,
            expanded,
            onExpand,
            record,
          }) => {
            if (!canExpand && (expandPlaceholderIcon || null) != null) {
              return expandPlaceholderIcon || null;
            }

            if (expandIconRotate) {
              return (
                <RotateBox
                  rotate={expanded ? 90 : 0}
                  duration={200}
                  onClick={(event) => onExpand(record, event)}
                >
                  {expandIconCustom({ expanded, onExpand, record })}
                </RotateBox>
              );
            }

            return expandIconCustom({ expanded, onExpand, record });
          },
          expandedRowRender: isFunction(expandedRowRenderCustom)
            ? (record, index, indent, expanded) => {
                let child = expandedRowRenderCustom(
                  record,
                  index,
                  indent,
                  expanded,
                );

                if (expandAnimalType === listViewConfig.expandAnimalType.fade) {
                  child = <FadeBox show={expanded}>{child}</FadeBox>;
                }

                if (
                  expandAnimalType === listViewConfig.expandAnimalType.queue
                ) {
                  child = <QueueBox show={expanded}>{child}</QueueBox>;
                }

                return <div style={expanderStyle || {}}>{child}</div>;
              }
            : null,
        }
      : {};

    return expandableConfig;
  }

  return null;
}
