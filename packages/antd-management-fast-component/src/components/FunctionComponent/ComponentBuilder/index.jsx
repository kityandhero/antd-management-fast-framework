import { Alert, Button, List, Tree } from 'antd';
import React from 'react';
import ReactPlayer from 'react-player';

import {
  checkStringIsNullOrWhiteSpace,
  isArray,
  isFunction,
  showSimpleRuntimeError,
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
import { ElasticityTreeSelect } from '../../ElasticityTreeSelect';
import { FlexRadio } from '../../FlexRadio';
import { FlexSelect } from '../../FlexSelect';
import { FlexText } from '../../FlexText';
import { iconBuilder } from '../../Icon';
import { IconInfo } from '../../IconInfo';
import { JsonView } from '../../JsonView';
import { StatusBar } from '../../StatusBar';

const ButtonGroup = Button.Group;

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
  confirm = false,
  title = '',
  placement = 'topRight',
  okText = '确定',
  cancelText = '取消',
  type = 'default',
  size = 'default',
  text = '按钮',
  icon = iconBuilder.form(),
  handleClick = () => {},
  hidden = false,
  danger = false,
  disabled = false,
  handleData = null,
  processing = false,
  iconProcessing = iconBuilder.loading(),
  style = null,
  showIcon = true,
}) {
  return (
    <ElasticityButton
      confirm={confirm}
      title={title}
      placement={placement}
      okText={okText}
      cancelText={cancelText}
      type={type}
      size={size}
      text={text}
      icon={icon}
      handleClick={handleClick}
      hidden={hidden}
      danger={danger}
      disabled={disabled}
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
  ellipsisMode = false,
  confirm = false,
  title = '',
  placement = 'bottomRight',
  okText = '确定',
  cancelText = '取消',
  type = 'default',
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
  processing = false,
  iconProcessing = iconBuilder.loading(),
}) {
  return (
    <ElasticityDropdown
      ellipsisMode={ellipsisMode}
      confirm={confirm}
      title={title}
      placement={placement}
      okText={okText}
      cancelText={cancelText}
      type={type}
      size={size}
      text={text}
      icon={icon}
      handleData={handleData}
      arrow={arrow}
      disabled={disabled}
      hidden={hidden}
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
  confirm = false,
  title = '',
  placement = 'bottomRight',
  okText = '确定',
  cancelText = '取消',
  type: typeSource = 'default',
  size = 'small',
  text = '按钮',
  icon = iconBuilder.form(),
  handleData: r,
  arrow = true,
  disabled = false,
  hidden = false,
  handleButtonClick = null,
  handleMenuClick = () => {},
  items = [],
  itemPanelTitle = '',
}) {
  return buildDropdown({
    ellipsisMode: false,
    title: title,
    placement,
    okText: okText,
    cancelText: cancelText,
    type: typeSource,
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
  placement = 'bottomRight',
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
    ellipsisMode: true,
    placement,
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
  separator = ':',
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
      separator={separator || ':'}
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
  onChange: onChangeCallback = null,
  innerProps: innerProperties = {},
  listData = [],
  dataConvert = null,
}) {
  return (
    <ElasticityTreeSelect
      value={v}
      placeholder={placeholder}
      onChange={onChangeCallback}
      innerProps={innerProperties}
      listData={listData}
      dataConvert={dataConvert}
    />
  );
}

export function buildFlexSelect({
  style = null,
  label = '',
  defaultValue = null,
  separator = ':',
  size = 'middle',
  list = [],
  dataConvert = null,
  renderItem = null,
  onChange: onChangeCallback = null,
  innerProps: innerProperties = null,
}) {
  return (
    <FlexSelect
      style={style}
      label={label}
      defaultValue={defaultValue}
      separator={separator}
      size={size}
      list={list}
      dataConvert={dataConvert}
      renderItem={renderItem}
      onChange={onChangeCallback}
      innerProps={innerProperties}
    />
  );
}

/**
 *build custom radio group
 */
export function buildFlexRadio({
  label = '',
  defaultValue = null,
  separator = ':',
  size = 'middle',
  button = false,
  list = [],
  dataConvert = null,
  renderItem = null,
  onChange: onChangeCallback = null,
  innerProps: innerProperties = null,
}) {
  return (
    <FlexRadio
      label={label}
      defaultValue={defaultValue}
      separator={separator}
      size={size}
      button={button}
      list={list}
      dataConvert={dataConvert}
      renderItem={renderItem}
      onChange={onChangeCallback}
      innerProps={innerProperties}
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

/**
 *
 * @param {Object} options
 * @param {Object} option.title title config like { label:'',text:'' }.
 * @param {Array} option.descriptionList description config like { label:'',text:'',textStyle: null }.
 * @param {Array} option.actionList action config like { label:'',text:'',emptyText:'',extra: null,canCopy: false }.
 * @param {Object} option.extra StatusBar extra component.
 */
export function buildListViewItemInner({
  title = {},
  descriptionList = [],
  actionList = [],
  extra = null,
}) {
  const { titleLabel, titleText } = {
    label: '',
    text: '',
    ...title,
  };

  const descriptionListAdjust = (
    isArray(descriptionList) ? descriptionList : []
  ).map((o) => {
    const { label, text } = {
      label: '',
      text: '',
      extra: null,
      ...o,
    };

    return { label, text };
  });

  const actionListAdjust = (isArray(actionList) ? actionList : []).map(
    (o, index) => {
      const { label, text, emptyText, textStyle, canCopy } = {
        label: '',
        text: '',
        emptyText: '',
        textStyle: null,
        canCopy: false,
        ...o,
      };

      return (
        <IconInfo
          key={`action_${index}`}
          textPrefix={label}
          text={text || emptyText}
          textStyle={textStyle}
          canCopy={canCopy}
        />
      );
    },
  );

  return (
    <>
      <List.Item.Meta
        title={<ColorText textPrefix={titleLabel} text={titleText} />}
        description={
          <>
            {descriptionListAdjust.map((o, index) => {
              const { label, text, extra } = o;

              return (
                <div key={`description_${index}`}>
                  <FlexText textPrefix={label} text={text} extra={extra} />
                </div>
              );
            })}
          </>
        }
      />

      <div>
        <StatusBar actions={actionListAdjust} extra={extra || null} />
      </div>
    </>
  );
}

/**
 * @param {Object} options
 * @param {Object} option.title title config like { label:'',text:'' }.
 * @param {Array} option.descriptionList description config like { label:'',text:'',textStyle: null }.
 * @param {Array} option.actionList action config like { label:'',text:'',emptyText:'',extra: null,canCopy: false }.
 * @param {Object} option.extra the params for buildDropdownButton.
 */
export function buildListViewItemInnerWithDropdownButton({
  title = {},
  descriptionList = [],
  actionList = [],
  extra = null,
}) {
  return buildListViewItemInner({
    title,
    descriptionList,
    actionList,
    extra: extra == null ? null : buildDropdownButton(extra),
  });
}

/**
 * @param {Object} options
 * @param {Object} option.title title config like { label:'',text:'' }.
 * @param {Array} option.descriptionList description config like { label:'',text:'',textStyle: null }.
 * @param {Array} option.actionList action config like { label:'',text:'',emptyText:'',extra: null,canCopy: false }.
 * @param {Boolean} option.confirm whether confirm select.
 * @param {Object} option.selectData the data selected .
 * @param {Function} option.selectCallback the callback after selected, like (data)=>{}.
 */
export function buildListViewItemInnerWithSelectButton({
  title = {},
  descriptionList = [],
  actionList = [],
  confirm = false,
  selectData,
  selectCallback = null,
}) {
  return buildListViewItemInner({
    title,
    descriptionList,
    actionList,
    extra: buildListViewItemActionSelect({
      confirm,
      selectData,
      selectCallback,
    }),
  });
}

/**
 * @param {Object} options
 * @param {Boolean} option.confirm whether confirm select.
 * @param {Object} option.selectData the data selected .
 * @param {Function} option.selectCallback the callback after selected, like (data)=>{}.
 */
export function buildListViewItemActionSelect({
  confirm = false,
  selectData,
  selectCallback = null,
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
    title: '确定选择此项吗？',
    handleClick: ({ handleData }) => {
      if (isFunction(selectCallback)) {
        selectCallback(handleData);
      }
    },
    handleData: selectData,
  });
}

/**
 * @param {Object} options
 * @param {string} option.value the value will display.
 * @param {string} option.theme theme, default value is "monokai".
 */
export function buildJsonView({ value = '', theme = 'monokai' }) {
  return <JsonView value={value} theme={theme} />;
}
