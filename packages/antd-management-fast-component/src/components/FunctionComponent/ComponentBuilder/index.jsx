import {
  Alert,
  Avatar,
  Button,
  ColorPicker,
  Dropdown,
  List,
  Space,
  Tree,
} from 'antd';
import React from 'react';
import ReactPlayer from 'react-player';

import {
  checkStringIsNullOrWhiteSpace,
  isArray,
  isFunction,
  isString,
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
import { FlexBox } from '../../FlexBox';
import { FlexRadio } from '../../FlexRadio';
import { FlexSelect } from '../../FlexSelect';
import { FlexText } from '../../FlexText';
import { iconBuilder } from '../../Icon';
import { IconInfo } from '../../IconInfo';
import { JsonView } from '../../JsonView';
import { StatusBar } from '../../StatusBar';
import { VerticalBox } from '../../VerticalBox';

export function buildDropdownMenu({
  label = '名称',
  placement = 'bottomRight',
  icon = null,
  size = 'middle',
  type = 'default',
  list = [],
  dataConvert = null,
  onClick: onClickCallback,
  innerProps: innerProperties = null,
  extra = null,
  extraStyle = null,
  color = null,
}) {
  const listCheck = isArray(list) ? list : [];

  const listAdjust = isFunction(dataConvert)
    ? listCheck.map((o) => {
        return dataConvert(o);
      })
    : list;

  const items = listAdjust.map((o) => {
    const { flag, key, name } = {
      flag: '',
      key: '',
      name: '',
      ...o,
    };

    const keyAdjust = checkStringIsNullOrWhiteSpace(key) ? flag : key;

    return {
      ...o,
      flag,
      key: keyAdjust,
      name,
      label: name,
    };
  });

  return (
    <Dropdown
      menu={{
        items,
        onClick: (o) => {
          if (!isFunction(onClickCallback)) {
            return;
          }

          const { key } = o;

          let v = null;

          for (const item of items) {
            const { key: keyItem } = item;

            if (keyItem === key) {
              v = item;
            }
          }

          onClickCallback(v);
        },
      }}
      placement={placement}
      arrow
    >
      <Button size={size} type={type} {...innerProperties}>
        <FlexText
          icon={icon}
          color={
            checkStringIsNullOrWhiteSpace(color)
              ? type === 'link'
                ? '#1677ff'
                : null
              : color
          }
          text={label}
          extra={extra}
          extraStyle={extraStyle}
        />
      </Button>
    </Dropdown>
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
  style = {},
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
  itemPanelZIndex = null,
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
      itemPanelZIndex={itemPanelZIndex}
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
  itemPanelZIndex = null,
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
    itemPanelZIndex,
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
  itemPanelZIndex = null,
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
    itemPanelZIndex,
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
    <Space.Compact>
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
    </Space.Compact>
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

export function buildColorPicker({
  value = null,
  disabled = false,
  onChange = null,
}) {
  return (
    <FlexBox
      flexAuto="right"
      left={<VerticalBox>色值：</VerticalBox>}
      right={
        <div
          style={{
            minWidth: '104px',
          }}
        >
          <VerticalBox>
            <ColorPicker
              value={value}
              showText
              disabled={disabled}
              presets={[
                {
                  label: '常用',
                  colors: [
                    '#000000',
                    '#000000E0',
                    '#000000A6',
                    '#00000073',
                    '#00000040',
                    '#00000026',
                    '#0000001A',
                    '#00000012',
                    '#0000000A',
                    '#00000005',
                    '#F5222D',
                    '#FA8C16',
                    '#FADB14',
                    '#8BBB11',
                    '#52C41A',
                    '#13A8A8',
                    '#1677FF',
                    '#2F54EB',
                    '#722ED1',
                    '#EB2F96',
                    '#F5222D4D',
                    '#FA8C164D',
                    '#FADB144D',
                    '#8BBB114D',
                    '#52C41A4D',
                    '#13A8A84D',
                    '#1677FF4D',
                    '#2F54EB4D',
                    '#722ED14D',
                    '#EB2F964D',
                  ],
                },
              ]}
              onChange={onChange}
            />
          </VerticalBox>
        </div>
      }
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

export function buildTagList({
  wrap = false,
  size = 'small',
  split = null,
  list = [],
}) {
  return (
    <ElasticityTagList wrap={wrap} size={size} split={split} list={list} />
  );
}

export function buildStatusBar({ actionList = [], extra = null }) {
  const actionListAdjust = (isArray(actionList) ? actionList : []).map(
    (o, index) => {
      const { label, text, emptyText, textStyle, canCopy, color } = {
        label: '',
        text: '',
        emptyText: '',
        textStyle: null,
        canCopy: false,
        color: '',
        ...o,
      };

      return (
        <IconInfo
          key={`action_${index}`}
          block
          textPrefix={label}
          text={text || emptyText}
          textStyle={textStyle}
          separatorStyle={{
            paddingLeft: '3px',
            paddingRight: '5px',
          }}
          canCopy={canCopy}
          style={checkStringIsNullOrWhiteSpace(color) ? {} : { color }}
        />
      );
    },
  );

  return <StatusBar actions={actionListAdjust} extra={extra || null} />;
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
 * @param {Object|string} option.image image like iconBuilder.user() or "/user.png", default value is null.
 * @param {Object} option.title title config like { label:'',text:'' }.
 * @param {Array} option.descriptionList description config like { label:'',text:'',textStyle: null }.
 * @param {Array} option.actionList action config like { label:'',text:'',emptyText:'',extra: null,canCopy: false }.
 * @param {Object} option.extra statusBar extra component.
 * @param {Object} option.statusBarWrapperStyle statusBar style.
 */
export function buildListViewItemInner({
  layout = 'vertical',
  image = null,
  title = {},
  descriptionList = [],
  actionList = [],
  extra = null,
  statusBarWrapperStyle = {},
}) {
  const { label: titleLabel, text: titleText } = {
    label: '',
    text: '',
    ...title,
  };

  const descriptionListAdjust = (
    isArray(descriptionList) ? descriptionList : []
  ).map((o) => {
    const {
      label: labelItem,
      text: textItem,
      color,
      extra: extraItem,
    } = {
      label: '',
      text: '',
      extra: null,
      color: '',
      ...o,
    };

    return {
      label: labelItem,
      text: textItem,
      color: color || '',
      extra: extraItem,
    };
  });

  if (layout === 'vertical') {
    return (
      <>
        <List.Item.Meta
          avatar={
            image == null ||
            checkStringIsNullOrWhiteSpace(image) ? null : isString(image) ? (
              <Avatar src={image} />
            ) : (
              <Avatar icon={image} />
            )
          }
          title={
            <ColorText
              multiLine
              textPrefix={titleLabel}
              text={titleText}
              separatorStyle={{
                paddingLeft: '3px',
                paddingRight: '5px',
              }}
            />
          }
          description={
            <>
              {descriptionListAdjust.map((o, index) => {
                const {
                  label: labelItem,
                  text: textItem,
                  color: colorItem,
                  extra: extraItem,
                } = o;

                return (
                  <div key={`description_${index}`}>
                    <FlexBox
                      flexAuto="left"
                      left={
                        <ColorText
                          multiLine
                          textPrefix={labelItem}
                          text={textItem}
                          color={colorItem}
                          separatorStyle={{
                            paddingLeft: '3px',
                            paddingRight: '5px',
                          }}
                        />
                      }
                      right={extraItem}
                    />
                  </div>
                );
              })}
            </>
          }
        />

        <div style={statusBarWrapperStyle}>
          {buildStatusBar({ actionList, extra })}
        </div>
      </>
    );
  }

  return (
    <>
      <List.Item.Meta
        avatar={
          image == null ||
          checkStringIsNullOrWhiteSpace(image) ? null : isString(image) ? (
            <Avatar src={image} />
          ) : (
            <Avatar icon={image} />
          )
        }
        title={
          <ColorText
            multiLine
            textPrefix={titleLabel}
            text={titleText}
            separatorStyle={{
              paddingLeft: '3px',
              paddingRight: '5px',
            }}
          />
        }
        description={
          <>
            {descriptionListAdjust.map((o, index) => {
              const {
                label: labelItem,
                text: textItem,
                color: colorItem,
                extra: extraItem,
              } = o;

              return (
                <div key={`description_${index}`}>
                  <FlexBox
                    flexAuto="left"
                    left={
                      <ColorText
                        multiLine
                        textPrefix={labelItem}
                        text={textItem}
                        color={colorItem}
                        separatorStyle={{
                          paddingLeft: '3px',
                          paddingRight: '5px',
                        }}
                      />
                    }
                    right={extraItem}
                  />
                </div>
              );
            })}

            <div
              style={{
                ...statusBarWrapperStyle,
                marginTop: '4px',
              }}
            >
              {buildStatusBar({ actionList, extra })}
            </div>
          </>
        }
      />
    </>
  );
}

/**
 * @param {Object} options
 * @param {Object} option.title title config like { label:'',text:'' }.
 * @param {Array} option.descriptionList description config like { label:'',text:'',textStyle: null }.
 * @param {Array} option.actionList action config like { label:'',text:'',emptyText:'',extra: null,canCopy: false }.
 * @param {Object} option.extra the params for buildDropdownButton.
 * @param {Object} option.statusBarWrapperStyle statusBar
 */
export function buildListViewItemInnerWithDropdownButton({
  layout = 'vertical',
  image = null,
  title = {},
  descriptionList = [],
  actionList = [],
  extra = null,
  statusBarWrapperStyle = {},
}) {
  return buildListViewItemInner({
    layout,
    image,
    title,
    descriptionList,
    actionList,
    extra: extra == null ? null : buildDropdownButton(extra),
    statusBarWrapperStyle,
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
  layout = 'vertical',
  image = null,
  title = {},
  descriptionList = [],
  actionList = [],
  confirm = false,
  selectButtonType = 'link',
  selectData,
  selectCallback = null,
}) {
  return buildListViewItemInner({
    layout,
    image,
    title,
    descriptionList,
    actionList,
    extra: buildListViewItemActionSelect({
      confirm,
      selectData,
      selectButtonType,
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
  selectButtonType = 'link',
  selectCallback = null,
}) {
  if (!isFunction(selectCallback)) {
    const text = 'selectCallback 不是有效的回调函数';

    showSimpleRuntimeError(text);
  }

  return buildButton({
    confirm,
    size: 'small',
    type: selectButtonType || 'link',
    icon: iconBuilder.import(),
    text: '选取',
    showIcon: true,
    title: confirm ? '确定选择此项吗？' : '即将选择此项',
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
