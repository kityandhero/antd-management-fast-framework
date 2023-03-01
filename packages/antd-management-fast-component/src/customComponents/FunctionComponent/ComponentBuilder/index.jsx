import { Alert, Button, Radio, Select, Tree, TreeSelect } from 'antd';
import ReactPlayer from 'react-player';

import {
  buildFieldDescription,
  checkStringIsNullOrWhiteSpace,
  isArray,
  isFunction,
  showSimpleRuntimeError,
  transformListData,
} from 'easy-soft-utility';

import { ColorText } from '../../ColorText';
import { CustomGrid } from '../../CustomGrid';
import { DescriptionGrid } from '../../DescriptionGrid';
import { ElasticityButton } from '../../ElasticityButton';
import { ElasticityDropdown } from '../../ElasticityDropdown';
import { ElasticityListViewItemExtra } from '../../ElasticityListViewItemExtra';
import { ElasticityMenu } from '../../ElasticityMenu';
import { ElasticityMenuHeader } from '../../ElasticityMenuHeader';
import { ElasticityRadioGroup } from '../../ElasticityRadioGroup';
import { ElasticityTagList } from '../../ElasticityTagList';
import { FlexBox } from '../../FlexBox';
import { iconBuilder } from '../../Icon';
import { VerticalBox } from '../../VerticalBox';

const ButtonGroup = Button.Group;
const RadioGroup = Radio.Group;

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
  icon = iconBuilder.ellipsis({
    style: {
      fontSize: 20,
      verticalAlign: 'top',
    },
  }),
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

export function buildCustomSelect({
  label,
  value = null,
  separator = '：',
  size = 'middle',
  renderItem,
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
          {isFunction(renderItem) ? renderItem() : null}
        </Select>
      }
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
  renderItem,
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
          {isFunction(renderItem) ? renderItem() : null}
        </RadioGroup>
      }
    />
  );
}

export function buildTagList({ list = [] }) {
  return <ElasticityTagList list={list} />;
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
