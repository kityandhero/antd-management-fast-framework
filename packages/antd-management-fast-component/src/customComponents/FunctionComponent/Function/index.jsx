import {
  Alert,
  Badge,
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Popover,
  Radio,
  Row,
  Select,
  Space,
  Switch,
  TimePicker,
  Tooltip,
  Tree,
  TreeSelect,
  Typography,
} from 'antd';
import classNames from 'classnames';
import React from 'react';
import ReactJson from 'react-json-view';
import ReactPlayer from 'react-player';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { BorderOuterOutlined, EllipsisOutlined } from '@ant-design/icons';

import {
  buildFieldDescription,
  buildFieldHelper,
  checkFromConfig,
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  datetimeFormat,
  formatDatetime,
  formatMoney,
  getGuid,
  isArray,
  isBoolean,
  isFunction,
  isObject,
  logObject,
  logText,
  replaceWithKeep,
  showSimpleErrorMessage,
  showSimpleRuntimeError,
  sortBy,
  toLowerFirst,
  toNumber,
  toString,
  transformListData,
  whetherNumber,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  copyToClipboard,
  defaultEmptyImage,
  dropdownExpandItemType,
  listViewConfig,
  pageHeaderRenderType,
} from 'antd-management-fast-common';

import { FadeBox } from '../../AnimalBox/FadeBox';
import { QueueBox } from '../../AnimalBox/QueueBox';
import { RotateBox } from '../../AnimalBox/RotateBox';
import { ColorText } from '../../ColorText';
import { EllipsisCustom } from '../../EllipsisCustom';
import { FlexBox } from '../../FlexBox';
import { FormCustomItem } from '../../FormCustom/FormCustomItem';
import { iconBuilder } from '../../Icon';
import { IconInfo } from '../../IconInfo';
import { ImageBox } from '../../ImageBox';
import { VerticalBox } from '../../VerticalBox';
import { AmfCustomGrid } from '../CustomGrid';
import { AmfDescriptionGrid } from '../DescriptionGrid';
import { AmfIconInfoList } from '../IconInfoList';
import { AmfListViewItemExtra } from '../ListViewItemExtra';
import { AmfTagList } from '../TagList';

import styles from './index.less';

const FormItem = Form.Item;
const { TextArea, Password } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;
const { Paragraph } = Typography;
const ButtonGroup = Button.Group;

export function buildPageHeaderTitle(pageName, headerTitlePrefixValue = '') {
  let nameList = [];

  nameList = isArray(pageName)
    ? pageName.map((o, index) => ({
        key: `pageName_${index}`,
        text: toString(o),
      }))
    : [
        {
          key: `pageName_1`,
          text: toString(pageName),
        },
      ];

  return (
    <span
      style={{
        display: 'block',
        maxWidth: '700px',
        height: '32px',
        overflow: 'hidden',
        fontSize: '18px',
        lineHeight: '32px',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      }}
    >
      <IconInfo
        textPrefix={headerTitlePrefixValue}
        text={
          <>
            {nameList.map((o) => (
              <span key={o.key}>{o.text}</span>
            ))}
          </>
        }
        ellipsis
      />
    </span>
  );
}

/**
 * 构建按钮
 */
export function buildButton({
  key: keySource = null,
  type: typeSource = 'default',
  size: sizeSource = 'default',
  text: textSource = '按钮',
  icon: iconSource = iconBuilder.form(),
  handleClick: handleClickSource = () => {},
  hidden: hiddenSource = false,
  danger: dangerSource = false,
  disabled: disabledSource = false,
  confirm: confirmSource = false,
  handleData: handleDataSource = null,
  processing: processingSource = false,
  iconProcessing: iconProcessingSource = iconBuilder.loading(),
  style: styleSource = null,
  showIcon: showIconSource = true,
}) {
  let confirmAdjust = false;

  const {
    key,
    type,
    size,
    icon,
    text,
    danger,
    disabled,
    hidden,
    confirm,
    handleData,
    handleClick,
    processing,
    iconProcessing,
    style,
    showIcon,
  } = {
    key: keySource ?? null,
    type: typeSource ?? 'default',
    size: sizeSource ?? 'default',
    text: textSource ?? '按钮',
    icon: iconSource ?? iconBuilder.form(),
    handleClick: handleClickSource ?? null,
    danger: dangerSource ?? false,
    hidden: hiddenSource ?? false,
    disabled: disabledSource ?? false,
    confirm: confirmSource ?? false,
    processing: processingSource ?? false,
    iconProcessing: iconProcessingSource ?? iconBuilder.loading(),
    handleData: handleDataSource ?? null,
    style: styleSource || null,
    showIcon: showIconSource,
  };

  if (hidden) {
    return null;
  }

  confirmAdjust = confirm;

  if (confirmAdjust) {
    if (isBoolean(confirmAdjust)) {
      logObject({
        key,
        type,
        size,
        icon,
        text,
        danger,
        disabled,
        hidden,
        confirm,
        handleData,
        handleClick,
        processing,
        iconProcessing,
        style,
        showIcon,
      });

      throw new Error(
        'buildMenu : confirm property in menu Items not allow bool when check confirm is true.',
      );
    }

    const { placement, title, handleConfirm, okText, cancelText } = {
      placement: 'topRight',
      title: '将要进行操作，确定吗？',
      okText: '确定',
      cancelText: '取消',
      ...(isObject(confirmAdjust) ? confirmAdjust : {}),
    };

    confirmAdjust = {
      placement,
      title,
      handleConfirm,
      okText,
      cancelText,
    };
  } else {
    confirmAdjust = false;
  }

  const ico = processing
    ? iconProcessing ?? iconBuilder.loading()
    : icon ?? iconBuilder.form();

  if (confirmAdjust) {
    const { placement, title, okText, cancelText } = confirmAdjust;

    return (
      <Popconfirm
        key={key ?? undefined}
        placement={placement}
        title={title || 'confirm:缺少title配置'}
        onConfirm={() => {
          if (isFunction(handleClick)) {
            handleClick({ handleData: handleData ?? null });
          } else {
            const messageText = 'buildButton : handleClick is not function';

            showSimpleErrorMessage(messageText);
          }
        }}
        okText={okText}
        cancelText={cancelText}
        disabled={disabled}
      >
        <Button
          type={type}
          size={size}
          style={style || null}
          danger={danger}
          disabled={disabled}
        >
          {showIcon ? <IconInfo icon={ico} text={text} /> : text}
        </Button>
      </Popconfirm>
    );
  }

  return (
    <Button
      key={key ?? undefined}
      style={style || null}
      type={type}
      size={size}
      danger={danger}
      disabled={disabled}
      onClick={() => handleClick({ handleData: handleData ?? null })}
    >
      {showIcon ? <IconInfo icon={ico} text={text} /> : text}
    </Button>
  );
}

export function buildMenu({
  handleData: r,
  handleMenuClick = () => {},
  items = [],
}) {
  if (!isFunction(handleMenuClick)) {
    throw new Error('buildMenu : handleMenuClick must be function');
  }

  if (!isArray(items)) {
    throw new Error('buildMenu : items must be array');
  }

  let listItem = [];

  for (const o of items || []) {
    const d = {
      withDivider: false,
      uponDivider: true,
      key: getGuid(),
      icon: iconBuilder.edit(),
      text: '',
      disabled: false,
      hidden: false,
      type: dropdownExpandItemType.item,
      color: null,
      confirm: false,
      ...o,
    };

    const { key, disabled, hidden, withDivider, type, uponDivider } = d;

    if (checkStringIsNullOrWhiteSpace(key)) {
      logObject(d);

      showSimpleErrorMessage('key is not allow empty');
    }

    if (
      checkInCollection(
        [dropdownExpandItemType.divider, dropdownExpandItemType.item],
        type,
      )
    ) {
      if (withDivider && type === dropdownExpandItemType.item) {
        const divider = {
          key: getGuid(),
          icon: null,
          text: '',
          disabled,
          hidden,
          type: dropdownExpandItemType.divider,
        };

        if (uponDivider) {
          listItem.push(divider);
        }

        listItem.push(d);

        if (!uponDivider) {
          listItem.push(divider);
        }
      } else {
        listItem.push(d);
      }
    }
  }

  listItem = listItem.map((o) => {
    const d = { ...o };

    const { confirm } = d;

    if (confirm) {
      if (isBoolean(confirm)) {
        throw new Error(
          'buildMenu : confirm property in menu Items not allow bool when check confirm is true.',
        );
      }

      const { placement, title, handleConfirm, okText, cancelText } = {
        placement: 'topRight',
        title: '将要进行操作，确定吗？',
        handleConfirm: ({ key, handleData }) => {
          handleMenuClick({ key, handleData });
        },
        okText: '确定',
        cancelText: '取消',
        ...(isObject(confirm) ? confirm : {}),
      };

      d.confirm = {
        placement,
        title,
        handleConfirm,
        okText,
        cancelText,
      };
    } else {
      d.confirm = false;
    }

    return d;
  });

  return (
    <div className={classNames('amf-dropdownExpandItemCustom')}>
      <div
        style={{
          height: '4px',
        }}
      />

      {listItem.map((o) => {
        const { type, key, icon, text, disabled, hidden, confirm, color } = o;

        if (checkStringIsNullOrWhiteSpace(key)) {
          showSimpleErrorMessage('key is not allow empty');
        }

        if (hidden) {
          return null;
        }

        if (type === dropdownExpandItemType.item) {
          if (confirm) {
            const { placement, title, handleConfirm, okText, cancelText } =
              confirm;

            return (
              <Popconfirm
                key={key}
                placement={placement}
                title={title}
                onConfirm={() => handleConfirm({ key, handleData: r })}
                okText={okText}
                cancelText={cancelText}
                disabled={disabled}
                overlayStyle={{ zIndex: 1060 }}
              >
                <Button
                  className={classNames('amf-dropdownExpandItemCustom_button')}
                  type="text"
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '5px 12px',
                    border: 0,
                    height: '32px',
                  }}
                  size="small"
                  disabled={disabled}
                >
                  <IconInfo
                    icon={icon || iconBuilder.edit()}
                    text={text}
                    style={(color || null) == null ? null : { color: color }}
                  />
                </Button>
              </Popconfirm>
            );
          }

          return (
            <Button
              key={key}
              className={classNames('amf-dropdownExpandItemCustom_button')}
              type="text"
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '5px 12px',
                border: 0,
                height: '32px',
              }}
              size="small"
              disabled={disabled}
              onClick={() => handleMenuClick({ key, handleData: r })}
            >
              <IconInfo
                icon={icon || iconBuilder.edit()}
                text={text}
                style={(color || null) == null ? null : { color: color }}
              />
            </Button>
          );
        }

        if (type === dropdownExpandItemType.divider) {
          return (
            <Divider
              key={key}
              style={{
                margin: 0,
                ...((color || null) == null ? {} : { borderColor: color }),
              }}
            />
          );
        }

        return null;
      })}

      <div
        style={{
          height: '4px',
        }}
      />
    </div>
  );
}

export function buildDropdown({
  key = getGuid(),
  tooltip: tooltipSource = false,
  type: typeSource = 'default',
  placement: placementDropdown = 'bottomRight',
  size = 'default',
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
  confirm = false,
  processing = false,
  iconProcessing = iconBuilder.loading(),
}) {
  if (hidden) {
    return null;
  }

  const tooltipAdjust = tooltipSource;

  const otherProperties = tooltipAdjust ? {} : { key: key || getGuid() };
  const placementAdjust = toLowerFirst(placementDropdown || 'bottomRight');

  const overlayClassNameAdjust = placementAdjust.startsWith('bottom')
    ? classNames(`amf-dropdownExpandOverlayBottom`)
    : placementAdjust.startsWith('top')
    ? classNames(`amf-dropdownExpandOverlayTop`)
    : {};

  let hasHandleButtonClick = false;

  if ((handleButtonClick || null) != null) {
    if (!isFunction(handleButtonClick)) {
      throw new Error(
        'buildDropdown(framework) : handleButtonClick must be function',
      );
    }

    hasHandleButtonClick = true;
  }

  let button = null;

  if (!isArray(items) || items.length === 0) {
    button = buildButton({
      type: typeSource || 'default',
      size,
      text,
      icon,
      handleClick: handleButtonClick,
      hidden,
      disabled,
      confirm,
      handleData: r,
      processing,
      iconProcessing,
      ...otherProperties,
    });
  } else if (hasHandleButtonClick) {
    let confirmAdjust = confirm;

    if (confirmAdjust) {
      if (isBoolean(confirmAdjust)) {
        logObject(arguments[0]);

        throw new Error(
          'buildMenu : confirm property in menu Items not allow bool when check confirm is true.',
        );
      }

      const { placement, title, handleConfirm, okText, cancelText } = {
        placement: 'topLeft',
        title: '将要进行操作，确定吗？',
        okText: '确定',
        cancelText: '取消',
        ...(isObject(confirmAdjust) ? confirmAdjust : {}),
      };

      confirmAdjust = {
        placement,
        title,
        handleConfirm,
        okText,
        cancelText,
      };
    } else {
      confirmAdjust = false;
    }

    if (confirmAdjust) {
      const { placement, title, okText, cancelText } = confirmAdjust;

      button = (
        <FlexBox
          flexAuto="left"
          style={{
            border: '1px solid #d9d9d9',
            borderRadius: '4px',
          }}
          leftStyle={{
            borderRight: '1px solid #d9d9d9',
          }}
          left={
            <Popconfirm
              placement={placement}
              title={title || 'confirm:缺少title配置'}
              onConfirm={() => {
                handleButtonClick({ handleData: r });
              }}
              okText={okText}
              cancelText={cancelText}
              disabled={disabled}
            >
              <Button
                type={typeSource || 'default'}
                style={{
                  border: 0,
                }}
                size={size ?? 'default'}
                disabled={disabled ?? false}
              >
                <IconInfo icon={icon || null} text={text || ''} />
              </Button>
            </Popconfirm>
          }
          right={
            <Popover
              {...otherProperties}
              placement={placementAdjust}
              arrow={arrow}
              content={buildMenu({
                handleData: r,
                handleMenuClick,
                items,
              })}
              title={itemPanelTitle}
              overlayClassName={overlayClassNameAdjust}
              overlayInnerStyle={{ padding: 0 }}
            >
              <Button
                style={{
                  height: '100%',
                  paddingTop: 0,
                  border: 0,
                  paddingBottom: 0,
                  paddingLeft: 3,
                  paddingRight: 3,
                }}
              >
                <VerticalBox>
                  <EllipsisOutlined
                    style={{
                      fontSize: 12,
                    }}
                  />
                </VerticalBox>
              </Button>
            </Popover>
          }
        />
      );
    } else {
      button = (
        <FlexBox
          flexAuto="left"
          style={{
            border: '1px solid #d9d9d9',
            borderRadius: '4px',
          }}
          leftStyle={{
            borderRight: '1px solid #d9d9d9',
          }}
          left={
            <Button
              type={typeSource || 'default'}
              style={{
                border: 0,
              }}
              size={size ?? 'default'}
              disabled={disabled ?? false}
              onClick={() => {
                handleButtonClick({ handleData: r });
              }}
            >
              <IconInfo icon={icon || null} text={text || ''} />
            </Button>
          }
          right={
            <Popover
              {...otherProperties}
              placement={placementAdjust}
              arrow={arrow}
              content={buildMenu({
                handleData: r,
                handleMenuClick,
                items,
              })}
              title={itemPanelTitle}
              overlayClassName={overlayClassNameAdjust}
              overlayInnerStyle={{ padding: 0 }}
            >
              <Button
                style={{
                  height: '100%',
                  border: 0,
                  paddingTop: 0,
                  paddingBottom: 0,
                  paddingLeft: 3,
                  paddingRight: 3,
                }}
              >
                <VerticalBox>
                  <EllipsisOutlined
                    style={{
                      fontSize: 12,
                    }}
                  />
                </VerticalBox>
              </Button>
            </Popover>
          }
        />
      );
    }
  } else {
    button = disabled ? (
      <Button type={typeSource || 'default'} size={size ?? 'default'} disabled>
        <IconInfo icon={icon || null} text={text || ''} />
      </Button>
    ) : (
      <Popover
        {...otherProperties}
        placement={placementAdjust}
        arrow={arrow}
        content={buildMenu({
          handleData: r,
          handleMenuClick,
          items,
        })}
        title={itemPanelTitle}
        overlayClassName={overlayClassNameAdjust}
        overlayInnerStyle={{ padding: 0 }}
      >
        <Button type={typeSource || 'default'} size={size ?? 'default'}>
          <IconInfo icon={icon || null} text={text || ''} />
        </Button>
      </Popover>
    );
  }

  if (tooltipAdjust) {
    if (isBoolean(tooltipAdjust)) {
      throw new Error(
        'buildDropdown(framework) : tooltip property in menu Items not allow bool when check tooltip is true.',
      );
    }

    const { placement: placementTooltip, title } = {
      placement: 'top',
      title: 'tooltip title need set',
      ...(isObject(tooltipAdjust) ? tooltipAdjust : {}),
    };

    return (
      <Tooltip
        key={key || getGuid()}
        placement={placementTooltip || 'top'}
        title={title}
      >
        {button}
      </Tooltip>
    );
  }

  return button;
}

export function buildDropdownButton({
  key = getGuid(),
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
    key,
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
  key = getGuid(),
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
    key,
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
  return <AmfCustomGrid key={key} list={list} config={props} />;
}

export function buildDescriptionGrid({ key = null, list, props }) {
  return <AmfDescriptionGrid key={key} list={list} config={props} />;
}

export function buildPageHeaderContent({ list }) {
  if (!isArray(list)) {
    return null;
  }

  let listData = list.map((o) => {
    const d = { sort: 10_000, ...o };

    return { ...d };
  });

  listData = sortBy(listData, (o) => o.sort);

  listData = listData.map((o, index) => {
    const d = { ...o };

    d.key = `pageHeaderContentItemContainer_${index}`;

    return { ...d };
  });

  return (
    <>
      {listData.map((o) => {
        const { type, list: listItem, key } = o;

        if (!isArray(listItem)) {
          return null;
        }

        if (type === pageHeaderRenderType.descriptionGrid) {
          const listGridData = listItem.map((one, index) => {
            return {
              key: `${key}_descriptionGridItem_${index}`,
              ...one,
            };
          });

          return buildDescriptionGrid({
            key: `${key}_descriptionGrid`,
            list: listGridData,
            props: {
              style: { marginBottom: '4px' },
              size: 'small',
            },
          });
        }

        if (type === pageHeaderRenderType.paragraph) {
          const listParagraph = listItem.map((one, index) => {
            return { key: `${key}_paragraph_${index}`, ...one };
          });

          return (
            <div key={`${key}_paragraph_container`}>
              {listParagraph.map((item) => {
                if (checkStringIsNullOrWhiteSpace(item.paragraph)) {
                  return null;
                }

                return <Paragraph key={item.key}>{item.paragraph}</Paragraph>;
              })}
            </div>
          );
        }

        if (type === pageHeaderRenderType.action) {
          const listAction = listItem.map((one, index) => {
            return { key: `${key}_action_${index}`, ...one };
          });

          return (
            <Space key={`${key}_space`}>
              {listAction.map((item) => {
                return item.action;
              })}
            </Space>
          );
        }

        return null;
      })}
    </>
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
    <div
      style={{
        overflow: 'hidden',
      }}
    >
      <FlexBox
        flexAuto="right"
        left={logoDom}
        right={
          collapsed ? null : (
            <VerticalBox
              align="center"
              alignJustify="start"
              style={{
                height: '100%',
              }}
            >
              <div
                style={{
                  margin: ' 0 0 0 12px',
                  fontSize: '20px',
                  color: 'white',
                  fontWeight: '600',
                  lineHeight: '32px',
                  overflow: 'hidden',
                  height: '100%',
                  whiteSpace: 'nowrap',
                  ...(navTheme === 'light' ? { color: '#000000d9' } : {}),
                }}
              >
                {shortName || '应用简称'}
              </div>
            </VerticalBox>
          )
        }
      />
    </div>
  );
}

export function buildButtonGroup({ buttons = [] }) {
  if (!isArray(buttons) || buttons.length <= 0) {
    return null;
  }

  return (
    <ButtonGroup>
      {buttons.map((item) => {
        const { hidden } = { hidden: false, ...item };

        if (hidden) {
          return null;
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
    <AmfListViewItemExtra {...{ align, imageUrl, emptyImageUrl, width }} />
  );
}

export function buildTagList({ list = [] }) {
  return <AmfTagList list={list} />;
}

export function buildIconInfoList({ list = [] }) {
  return <AmfIconInfoList list={list} />;
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
  let listData = list || [];

  if (isFunction(adjustListDataCallback)) {
    listData = adjustListDataCallback(listData);
  }

  const listRadio = [];

  if (listData.length > 0) {
    for (const item of listData) {
      const { name, flag, availability } = {
        name: '',
        flag: '',
        availability: whetherNumber.yes,
        ...item,
      };

      const key = `${flag}_${name}`;

      const radio = button ? (
        <Radio.Button
          key={key}
          value={flag}
          disabled={toNumber(availability) !== whetherNumber.yes}
        >
          {name}
        </Radio.Button>
      ) : (
        <Radio
          key={key}
          value={flag}
          disabled={toNumber(availability) !== whetherNumber.yes}
        >
          {name}
        </Radio>
      );

      listRadio.push(radio);
    }

    return listRadio;
  }

  return null;
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
    <Radio.Group
      value={value || null}
      onChange={onChange || null}
      defaultValue={defaultValue || null}
      buttonStyle={buttonStyle || null}
      style={style || null}
    >
      {buildRadioItem({ button, list, adjustListDataCallback })}
    </Radio.Group>
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
  const otherSelectProperties = {
    placeholder: buildFieldDescription(label, '选择') || '请选择',
    style: { width: '100%' },
    onChange: (v, option) => {
      if (isFunction(onChangeCallback)) {
        onChangeCallback(v, option);
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
      <Select {...otherSelectProperties}>
        {isFunction(renderItemFunction) ? renderItemFunction() : null}
      </Select>
    </FormItem>
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
  if (hidden) {
    return <div style={{ display: 'hidden' }}>{children}</div>;
  }

  return <>{children}</>;
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
  const title = label;

  const otherInputProperties = {
    addonBefore: icon,
    placeholder: canOperate
      ? buildFieldDescription(title, reminderPrefix)
      : '暂无数据',
    disabled: !canOperate,
    ...inputProperties,
  };

  const resultCheck = checkFromConfig({
    label: title,
    name,
    helper,
  });

  return buildFormHiddenWrapper({
    children: (
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
        <Input {...otherInputProperties} />
      </FormItem>
    ),
    hidden,
  });
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

  return buildFormInput({
    label: label || null,
    name: name || null,
    required,
    helper: helper || null,
    icon,
    inputProps: inputProperties,
    canOperate,
    formItemLayout,
    reminderPrefix,
    hidden,
  });
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
  const title = label;

  const otherSwitchProperties = {
    disabled: !canOperate,
    ...otherProperties,
  };

  const resultCheck = checkFromConfig({
    label: title,
    name,
    helper,
  });

  return buildFormHiddenWrapper({
    children: (
      <FormCustomItem
        {...formItemLayout}
        label={resultCheck.label}
        name={resultCheck.name}
        valuePropName="checked"
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
        render={(children) => (
          <FlexBox
            flexAuto="left"
            left={`是否开启${label}: `}
            right={children}
          />
        )}
      >
        <Switch {...otherSwitchProperties} />
      </FormCustomItem>
    ),
    hidden,
  });
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

export function buildSyntaxHighlighter({ language, value, other = {} }) {
  const c = {
    ...other,
    showLineNumbers: false,
    wrapLines: false,
    wrapLongLines: true,
    language: language,
    style: oneDark,
  };

  return (
    <>
      {isObject(value) ? (
        <SyntaxHighlighter {...c}>
          {language === 'javascript'
            ? JSON.stringify(value || {}, null, '    ')
            : value}
        </SyntaxHighlighter>
      ) : (
        <SyntaxHighlighter {...c}>
          {language === 'javascript'
            ? JSON.stringify(JSON.parse(value || null), null, '    ')
            : value}
        </SyntaxHighlighter>
      )}
    </>
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
      {innerComponent}
    </FormItem>
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
  return buildFormInnerComponent({
    label,
    innerComponent: buildSyntaxHighlighter({
      language,
      value,
      other: otherProperties || {},
    }),
    helper,
    formItemLayout,
    requiredForShow,
  });
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
  const title = label;

  const otherInputProperties = {
    addonBefore: icon,
    placeholder: '暂无数据',
    value: checkStringIsNullOrWhiteSpace(value || '') ? '' : value,
    ...inputProperties,
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
      <Input {...otherInputProperties} />
    </FormItem>
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
  const title = label;

  const otherInputNumberProperties = {
    addonBefore: icon,
    style: { width: '100%' },
    min: 0,
    placeholder: buildFieldDescription(title, '输入'),
    disabled: !canOperate,
    ...inputNumberProperties,
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
        <InputNumber {...otherInputNumberProperties} />
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
      <InputNumber {...otherInputNumberProperties} />
    </FormItem>
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
  const title = label;

  const otherTextAreaProperties = {
    placeholder: buildFieldDescription(title, '输入'),
    disabled: !canOperate,
    ...textAreaProperties,
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
        <TextArea {...otherTextAreaProperties} />
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
      <TextArea {...otherTextAreaProperties} />
    </FormItem>
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
  const title = label;

  const otherDatePickerProperties = {
    style: { width: '100%' },
    showTime: true,
    format: 'YYYY-MM-DD HH:mm:ss',
    inputReadOnly: true,
    placeholder: buildFieldDescription(title, '选择'),
    ...datePickerProperties,
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
        <DatePicker {...otherDatePickerProperties} />
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
      <DatePicker {...otherDatePickerProperties} />
    </FormItem>
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
  const title = label;

  const otherTimePickerProperties = {
    style: { width: '100%' },
    inputReadOnly: true,
    placeholder: buildFieldDescription(title, '选择'),
    ...timePickerProperties,
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
        <TimePicker {...otherTimePickerProperties} />
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
      <TimePicker {...otherTimePickerProperties} />
    </FormItem>
  );
}

export function buildColumnItem({
  column: columnConfig,
  attachedTargetName = '',
}) {
  const d = { ...columnConfig };

  const { dataTarget, showHelper, placeholder } = {
    showHelper: false,
    placeholder: false,
    ellipsis: true,
    ...columnConfig,
  };

  if (placeholder || false) {
    return d;
  }

  if ((dataTarget || null) == null) {
    const text = `错误的列配置,缺少dataTarget:${JSON.stringify(
      checkStringIsNullOrWhiteSpace(attachedTargetName)
        ? {
            column: columnConfig,
          }
        : {
            el: attachedTargetName,
            column: columnConfig,
          },
    )}`;

    showSimpleRuntimeError(text);

    logText(text);
  } else {
    const { label, name, helper } = dataTarget;

    if ((label || null) == null || (name || null) == null) {
      const text = `错误的列配置，dataTarget内容缺失:${JSON.stringify(
        checkStringIsNullOrWhiteSpace(attachedTargetName)
          ? {
              column: columnConfig,
            }
          : {
              el: attachedTargetName,
              column: columnConfig,
            },
      )}`;

      showSimpleRuntimeError(text);

      logText(text);
    } else {
      d.title = showHelper ? (
        <IconInfo
          icon={iconBuilder.infoCircle()}
          iconPosition="right"
          iconTooltip={helper}
          text={label}
        />
      ) : (
        label
      );
      d.dataIndex = name;
    }
  }

  const {
    align,
    showRichFacade,
    facadeMode: facadeModeSource,
    facadeModeBuilder,
    facadeConfig: facadeConfigSource,
    facadeConfigBuilder,
    sorter,
  } = {
    align: 'center',
    showRichFacade: false,
    facadeMode: null,
    facadeModeBuilder: null,
    facadeConfig: {},
    facadeConfigBuilder: () => {},
    sorter: false,
    ...d,
  };

  d.align = align;
  d.sorter = sorter;

  if (!isFunction(d.render) && showRichFacade) {
    const { canCopy, copyPrompt, emptyValue } = {
      canCopy: false,
      copyPrompt: '[点击复制]',
      emptyValue: null,
      ...d,
    };

    let tooltipPlacement = 'top';

    if (align === 'left') {
      tooltipPlacement = 'topLeft';
    }

    if (align === 'right') {
      tooltipPlacement = 'topRight';
    }

    d.render = (value, record, index) => {
      let value_ = value;

      let facadeMode = facadeModeSource || '';

      if (isFunction(facadeModeBuilder)) {
        facadeMode = facadeModeBuilder(value, record, index) || facadeMode;

        facadeMode = checkStringIsNullOrWhiteSpace(facadeMode)
          ? ''
          : facadeMode;
      }

      let facadeConfig = facadeConfigSource || {};

      if (isFunction(facadeConfigBuilder)) {
        facadeConfig = {
          ...facadeConfig,
          ...facadeConfigBuilder(value, record, index),
        };
      }

      const {
        color,
        valPrefix,
        valPrefixStyle,
        valStyle,
        separator,
        separatorStyle,
        icon,
        iconPosition,
        addonAfter,
        addonBefore,
        datetimeFormat: datetimeFormatValue,
        status,
        text,
      } = {
        color: null,
        valPrefix: '',
        valPrefixStyle: null,
        valStyle: null,
        separator: '：',
        separatorStyle: null,
        icon: null,
        iconPosition: 'left',
        addonAfter: null,
        addonBefore: null,
        datetimeFormat: datetimeFormat.yearMonthDayHourMinuteSecond,
        status: 'default',
        text: '',
        ...facadeConfig,
      };

      let styleMerge = {};

      if (
        checkStringIsNullOrWhiteSpace(facadeMode) ||
        facadeMode === columnFacadeMode.ellipsis
      ) {
        if (isFunction(d.formatValue)) {
          value_ = d.formatValue(value, record, index);
        }

        if (checkStringIsNullOrWhiteSpace(value_)) {
          return emptyValue;
        }

        styleMerge = {
          ...styleMerge,
          ...((color || null) == null ? {} : { color }),
        };

        if (canCopy) {
          return (
            <>
              <EllipsisCustom
                style={styleMerge}
                tooltip={{ placement: tooltipPlacement }}
                lines={1}
                removeChildren
                extraContent={
                  <>
                    <a
                      onClick={() => {
                        copyToClipboard(value_);
                      }}
                    >
                      {replaceWithKeep(value_, '***', 2, 6)}
                    </a>
                  </>
                }
              >
                {value_ || emptyValue} {copyPrompt || '[点击复制]'}
              </EllipsisCustom>
            </>
          );
        }

        return (
          <>
            {(addonBefore || null) == null ? null : addonBefore}

            <IconInfo
              icon={icon || null}
              iconPosition={iconPosition || 'left'}
              text={value_ || emptyValue}
              textStyle={valStyle || null}
              textPrefix={valPrefix}
              textPrefixStyle={valPrefixStyle || null}
              separator={separator || ''}
              separatorStyle={separatorStyle || null}
              style={styleMerge}
              tooltip={{ placement: tooltipPlacement }}
              ellipsis
            />

            {(addonAfter || null) == null ? null : addonAfter}
          </>
        );
      }

      if (facadeMode === columnFacadeMode.datetime) {
        styleMerge = {
          ...styleMerge,
          ...((color || null) == null ? {} : { color }),
        };

        value_ = checkStringIsNullOrWhiteSpace(value_)
          ? ''
          : formatDatetime({
              data: value_,
              format: datetimeFormatValue,
            }) || '';

        return (
          <>
            {(addonBefore || null) == null ? null : addonBefore}

            <IconInfo
              icon={icon || null}
              iconPosition={iconPosition || 'left'}
              text={value_ || emptyValue}
              textStyle={valStyle || null}
              textPrefix={valPrefix}
              textPrefixStyle={valPrefixStyle || null}
              separator={separator || ''}
              separatorStyle={separatorStyle || null}
              style={styleMerge}
              tooltip={{ placement: tooltipPlacement }}
              ellipsis
            />

            {(addonAfter || null) == null ? null : addonAfter}
          </>
        );
      }

      if (facadeMode === columnFacadeMode.money) {
        styleMerge = {
          ...styleMerge,
          ...((color || null) == null ? {} : { color }),
        };

        value_ = checkStringIsNullOrWhiteSpace(value_) ? '' : value_;

        return (
          <>
            {(addonBefore || null) == null ? null : addonBefore}

            <IconInfo
              icon={icon || null}
              iconPosition={iconPosition || 'left'}
              text={formatMoney(value_) || emptyValue}
              textStyle={valStyle || null}
              textPrefix={valPrefix}
              textPrefixStyle={valPrefixStyle || null}
              separator={separator || ''}
              separatorStyle={separatorStyle || null}
              style={styleMerge}
              tooltip={{ placement: tooltipPlacement }}
              ellipsis
            />

            {(addonAfter || null) == null ? null : addonAfter}
          </>
        );
      }

      if (facadeMode === columnFacadeMode.image) {
        if (isFunction(d.formatValue)) {
          value_ = d.formatValue(value, record, index);
        }

        const { imageWidth, borderRadius, circle, previewSimpleMask } = {
          imageWidth: '30px',
          circle: true,
          borderRadius: '3px',

          previewSimpleMask: true,
          ...facadeConfig,
        };

        return (
          <>
            <Row>
              <Col flex="auto" />
              <Col>
                <div
                  style={{
                    width: imageWidth,
                    overflow: 'hidden',
                    ...(circle ? {} : { borderRadius }),
                  }}
                >
                  <ImageBox
                    src={value_ || defaultEmptyImage}
                    circle={circle}
                    loadingEffect
                    errorOverlayVisible
                    showErrorIcon={false}
                    alt=""
                    preview={!checkStringIsNullOrWhiteSpace(value_)}
                    previewSimpleMask={previewSimpleMask}
                  />
                </div>
              </Col>
              <Col flex="auto" />
            </Row>
          </>
        );
      }

      if (facadeMode === columnFacadeMode.badge) {
        if (isFunction(d.formatValue)) {
          value_ = d.formatValue(value, record, index);
        }

        return (
          <>
            <Badge status={status} text={text} />
          </>
        );
      }

      if (facadeMode === columnFacadeMode.dropdown) {
        if (!isFunction(d.configBuilder)) {
          return null;
        }

        const operateConfig = d.configBuilder(value, record, index);

        return (operateConfig || null) == null
          ? null
          : buildDropdown(operateConfig);
      }

      throw new Error(`无效的渲染模式：${facadeMode}`);
    };
  }

  return d;
}

export function buildColumnList({ columnList, attachedTargetName = '' }) {
  const list = [];

  for (const o of isArray(columnList) ? columnList : []) {
    const c = buildColumnItem({
      column: o,
      attachedTargetName,
    });

    if ((c || null) != null) {
      const { hidden } = {
        hidden: false,
        ...c,
      };

      if (!hidden) {
        list.push(c);
      }
    }
  }

  return list;
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
