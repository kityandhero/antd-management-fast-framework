import React from 'react';
import TextAnimal from 'rc-texty';
import {
  Form,
  Typography,
  Space,
  Button,
  Row,
  Col,
  Dropdown,
  Descriptions,
  Popconfirm,
  Tooltip,
  Menu,
  Tag,
  Radio,
  Select,
  Input,
  InputNumber,
  Switch,
  DatePicker,
} from 'antd';
import {
  EllipsisOutlined,
  LoadingOutlined,
  ImportOutlined,
  FormOutlined,
  EditOutlined,
} from '@ant-design/icons';
import ReactJson from 'react-json-view';
import SyntaxHighlighter from 'react-syntax-highlighter';

import {
  formatDatetime,
  isArray,
  copyToClipboard,
  stringIsNullOrWhiteSpace,
  showRuntimeError,
  toString,
  getGuid,
  isFunction,
  isNumber,
  toNumber,
  sortBy,
  buildFieldHelper,
  buildFieldDescription,
  checkFromConfig,
  isObject,
  recordObject,
  showErrorMessage,
  isBoolean,
  inCollection,
} from '../../utils/tools';
import {
  pageHeaderRenderType,
  whetherNumber,
  datetimeFormat,
  menuType,
} from '../../utils/constants';
import VerticalBox from '../VerticalBox';
import ImageBox from '../ImageBox';
import IconInfo from '../IconInfo';
import FlexBox from '../FlexBox';
import FlexText from '../FlexText';

import styles from './index.less';

const FormItem = Form.Item;
const { TextArea, Password } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;
const { Paragraph } = Typography;
const ButtonGroup = Button.Group;
const { Item: Description } = Descriptions;
const { Title } = Typography;

export function pageHeaderTitle(pageName, headerTitlePrefix) {
  const headerTitlePrefixValue = headerTitlePrefix || '';

  let nameList = [];

  if (isArray(pageName)) {
    nameList = pageName.map((o, index) => ({
      key: `pageName_${index}`,
      text: toString(o),
    }));
  } else {
    nameList = [
      {
        key: `pageName_1`,
        text: toString(pageName),
      },
    ];
  }

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
      <Row>
        <Col>
          {stringIsNullOrWhiteSpace(headerTitlePrefixValue)
            ? ''
            : `${headerTitlePrefixValue}：`}
        </Col>
        <Col flex="auto">
          <Space>
            {nameList.map((o) => (
              <TextAnimal key={o.key} type="alpha" mode="smooth">
                {o.text}
              </TextAnimal>
            ))}
          </Space>
        </Col>
      </Row>
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
  icon: iconSource = <FormOutlined />,
  handleClick: handleClickSource = () => {},
  hidden: hiddenSource = false,
  danger: dangerSource = false,
  disabled: disabledSource = false,
  confirm: confirmSource = false,
  handleData: handleDataSource = null,
  processing: processingSource = false,
  iconProcessing: iconProcessingSource = <LoadingOutlined />,
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
    ...{
      key: keySource ?? null,
      type: typeSource ?? 'default',
      size: sizeSource ?? 'default',
      text: textSource ?? '按钮',
      icon: iconSource ?? <FormOutlined />,
      handleClick: handleClickSource ?? null,
      danger: dangerSource ?? false,
      hidden: hiddenSource ?? false,
      disabled: disabledSource ?? false,
      confirm: confirmSource ?? false,
      processing: processingSource ?? false,
      iconProcessing: iconProcessingSource ?? <LoadingOutlined />,
      handleData: handleDataSource ?? null,
      style: styleSource || null,
      showIcon: showIconSource,
    },
  };

  if (hidden) {
    return null;
  }

  confirmAdjust = confirm;

  if (confirmAdjust) {
    if (isBoolean(confirmAdjust)) {
      recordObject({
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
      ...{
        placement: 'topRight',
        title: '将要进行操作，确定吗？',
        okText: '确定',
        cancelText: '取消',
      },
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
    ? iconProcessing ?? <LoadingOutlined />
    : icon ?? <FormOutlined />;

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

            showErrorMessage({
              message: messageText,
            });
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
          {!showIcon ? text : <IconInfo icon={ico} text={text} />}
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
      {!showIcon ? text : <IconInfo icon={ico} text={text} />}
    </Button>
  );
}

export function buildDropdownButton({
  key = getGuid(),
  tooltip = false,
  placement = 'bottomRight',
  type: typeSource = 'default',
  size = 'small',
  text = '按钮',
  icon = <FormOutlined />,
  handleData: r,
  arrow = true,
  disabled = false,
  hidden = false,
  handleButtonClick = null,
  handleMenuClick = () => {},
  menuItems = [],
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
    handleButtonClick,
    handleMenuClick,
    menuItems,
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
  menuItems = [],
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
    menuItems,
  });
}

export function buildDropdown({
  key = getGuid(),
  tooltip: tooltipSource = false,
  type: typeSource = 'default',
  placement: placementDropdown = 'bottomRight',
  size = 'default',
  text = '按钮',
  icon = <FormOutlined />,
  handleData: r,
  arrow = true,
  disabled = false,
  hidden = false,
  handleButtonClick = null,
  handleMenuClick = () => {},
  menuItems = [],
  confirm = false,
  processing = false,
  iconProcessing = <LoadingOutlined />,
}) {
  if (hidden) {
    return null;
  }

  const tooltipAdjust = tooltipSource;

  const otherProps = tooltipAdjust ? {} : { key: key || getGuid() };

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

  if (!isArray(menuItems) || menuItems.length === 0) {
    button = buildButton({
      ...{
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
      },
      ...otherProps,
    });
  } else if (hasHandleButtonClick) {
    button = (
      <>
        <Dropdown.Button
          {...otherProps}
          type={typeSource || 'default'}
          placement={placementDropdown || 'bottomRight'}
          size={size || 'default'}
          onClick={() => {
            handleButtonClick({ handleData: r });
          }}
          disabled={disabled ?? false}
          overlay={buildMenu({
            handleData: r,
            handleMenuClick,
            menuItems,
          })}
        >
          <IconInfo icon={icon || null} text={text || ''} />
        </Dropdown.Button>
      </>
    );
  } else {
    button = (
      <Dropdown
        {...otherProps}
        placement={placementDropdown || 'bottomRight'}
        arrow={arrow}
        disabled={disabled ?? false}
        overlay={buildMenu({
          handleData: r,
          handleMenuClick,
          menuItems,
        })}
      >
        <Button type={typeSource || 'default'} size={size ?? 'default'}>
          <IconInfo icon={icon || null} text={text || ''} />
        </Button>
      </Dropdown>
    );
  }

  if (tooltipAdjust) {
    if (isBoolean(tooltipAdjust)) {
      throw new Error(
        'buildDropdown(framework) : tooltip property in menu Items not allow bool when check tooltip is true.',
      );
    }

    const { placement: placementTooltip, title } = {
      ...{
        placement: 'top',
        title: 'tooltip title need set',
      },
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

export function buildMenu({
  handleData: r,
  handleMenuClick = () => {},
  menuItems = [],
}) {
  if (!isFunction(handleMenuClick)) {
    throw new Error('buildMenu : handleMenuClick must be function');
  }

  if (!isArray(menuItems)) {
    throw new Error('buildMenu : menuItems must be array');
  }

  let listMenuItem = [];

  (menuItems || []).forEach((o) => {
    const d = {
      ...{
        withDivider: false,
        uponDivider: true,
        key: getGuid(),
        icon: <EditOutlined />,
        text: '',
        disabled: false,
        hidden: false,
        type: menuType.menu,
        confirm: false,
      },
      ...(o || {}),
    };

    const { key, disabled, hidden, withDivider, type, uponDivider } = d;

    if (stringIsNullOrWhiteSpace(key)) {
      recordObject(d);

      showErrorMessage({
        message: 'key is not allow empty',
      });
    }

    if (inCollection([menuType.divider, menuType.menu], type)) {
      if (withDivider && type === menuType.menu) {
        const divider = {
          key: getGuid(),
          icon: null,
          text: '',
          disabled,
          hidden,
          type: menuType.divider,
        };

        if (uponDivider) {
          listMenuItem.push(divider);
        }

        listMenuItem.push(d);

        if (!uponDivider) {
          listMenuItem.push(divider);
        }
      } else {
        listMenuItem.push(d);
      }
    }
  });

  listMenuItem = listMenuItem.map((o) => {
    const d = { ...(o || {}) };

    const { confirm } = d;

    if (confirm) {
      if (isBoolean(confirm)) {
        throw new Error(
          'buildMenu : confirm property in menu Items not allow bool when check confirm is true.',
        );
      }

      const { placement, title, handleConfirm, okText, cancelText } = {
        ...{
          placement: 'topRight',
          title: '将要进行操作，确定吗？',
          handleConfirm: ({ key, handleData }) => {
            handleMenuClick({ key, handleData });
          },
          okText: '确定',
          cancelText: '取消',
        },
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
    <Menu
      onClick={(e) => {
        const { key } = e;

        handleMenuClick({ key, handleData: r });
      }}
    >
      {listMenuItem.map((o) => {
        const { type, key, icon, text, disabled, hidden, confirm } = o;

        if (stringIsNullOrWhiteSpace(key)) {
          showErrorMessage({
            message: 'key is not allow empty',
          });
        }

        if (hidden) {
          return null;
        }

        if (type === menuType.menu) {
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
              >
                <li
                  className={styles.menuItemCustom}
                  style={{
                    display: 'inherit',
                    height: '32px',
                  }}
                >
                  <Button
                    className={styles.menuItemCustomButton}
                    type="text"
                    style={{
                      padding: '5px 12px',
                      border: 0,
                      height: '32px',
                    }}
                    size="small"
                    disabled={disabled}
                  >
                    <IconInfo icon={icon || <EditOutlined />} text={text} />
                  </Button>
                </li>
              </Popconfirm>
            );
          }

          return (
            <Menu.Item key={key} disabled={disabled}>
              <IconInfo icon={icon || <EditOutlined />} text={text} />
            </Menu.Item>
          );
        }

        if (type === menuType.divider) {
          return <Menu.Divider key={key} />;
        }

        return null;
      })}
    </Menu>
  );
}

export function buildCustomGrid({ key = null, list, props }) {
  if (isArray(list)) {
    const dataList = list.map((o, index) => {
      const d = { ...{}, ...o };

      d.key = `item_${index}`;

      return { ...{ canCopy: false }, ...d };
    });

    let column = 3;

    const {
      title,
      column: columnSource,
      labelStyle: labelStyleSource,
      contentStyle: contentStyleSource,
      bordered: borderedSource,
      colon: colonSource,
      size: sizeSource,
    } = {
      ...{
        title: '',
        column: 3,
        labelStyle: {},
        contentStyle: {},
        bordered: false,
        colon: true,
        size: null,
      },
      ...(props || {}),
    };

    if (!isNumber(columnSource)) {
      column = 3;
    }

    column = toNumber(columnSource);

    if (column <= 0 || column >= 6) {
      column = 3;
    }

    let padding = '16px 24px';
    let paddingBottomNoBorder = '16px';
    let backgroundColor = '';

    if (sizeSource === 'middle') {
      padding = '12px 24px';
      paddingBottomNoBorder = '12px';
    }

    if (sizeSource === 'small') {
      padding = '8px 16px';
      paddingBottomNoBorder = '8px';
    }

    const columnSpan = 24 / column;

    const bordered = borderedSource;
    const colon = bordered ? false : colonSource;

    if (bordered) {
      backgroundColor = '#fafafa';
    }

    const containorStyle = bordered
      ? { borderTop: '1px solid #f0f0f0', borderLeft: '1px solid #f0f0f0' }
      : null;

    const labelStyle = bordered
      ? {
          ...{
            width: '180px',
            borderRight: '1px solid #f0f0f0',
          },
          ...(labelStyleSource || {}),
          ...{ padding, backgroundColor },
        }
      : {};

    const contentStyle = bordered
      ? {
          ...{
            padding: '16px 24px',
          },
          ...(contentStyleSource || {}),
          ...{ padding },
        }
      : {};

    const titleComponent = stringIsNullOrWhiteSpace(title) ? null : (
      <div
        style={{
          marginBottom: '8px',
          color: '#000000d9',
          fontWeight: 500,
          fontSize: '16px',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}
      >
        <FlexText text={title} />
      </div>
    );

    return (
      <div key={key}>
        {titleComponent}

        <Row style={containorStyle}>
          {dataList.map((item) => {
            const { hidden } = { ...{ hidden: false }, ...(item || {}) };

            if (hidden) {
              return null;
            }

            const itemStyle = bordered
              ? {
                  borderRight: '1px solid #f0f0f0',
                  borderBottom: '1px solid #f0f0f0',
                }
              : {
                  paddingBottom: paddingBottomNoBorder,
                };

            return (
              <Col
                key={item.key}
                style={itemStyle}
                label={item.label}
                span={columnSpan * (item.span || 1)}
                {...(item.props || {})}
              >
                <FlexBox
                  flexAuto="right"
                  left={
                    <div style={labelStyle}>{`${item.label}${
                      colon ? '：' : ''
                    }`}</div>
                  }
                  right={
                    <div style={contentStyle}>
                      {item.value}
                      {item.canCopy && (item.canCopy || null) != null ? (
                        <a
                          style={{ marginLeft: '10px' }}
                          onClick={() => {
                            copyToClipboard(item.copyData || item.value);
                          }}
                        >
                          [复制]
                        </a>
                      ) : null}
                    </div>
                  }
                />
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }

  return null;
}

export function buildDescriptionGrid({ key = null, list, props }) {
  if (isArray(list)) {
    const dataList = list.map((o, index) => {
      const d = { ...{ key: `item_${index}` }, ...o };

      return { ...{ canCopy: false }, ...d };
    });

    const { itemStyle } = { ...{ itemStyle: null }, ...(props || {}) };

    return (
      <Descriptions key={key} {...(props || {})}>
        {dataList.map((item) => {
          const { emptyValue } = { ...{ emptyValue: '' }, ...item };

          return (
            <Description
              key={item.key}
              label={item.label}
              span={item.span || 1}
              style={{ ...itemStyle, ...(item.style || null) }}
            >
              {item.value || emptyValue}
              {item.canCopy && (item.canCopy || null) != null ? (
                <a
                  style={{ marginLeft: '10px' }}
                  disabled={stringIsNullOrWhiteSpace(item.value || emptyValue)}
                  onClick={() => {
                    if (!stringIsNullOrWhiteSpace(item.value || emptyValue)) {
                      copyToClipboard(item.copyData || item.value);
                    }
                  }}
                >
                  [复制]
                </a>
              ) : null}
            </Description>
          );
        })}
      </Descriptions>
    );
  }

  return null;
}

export function pageHeaderContent({ list }) {
  if (!isArray(list)) {
    return null;
  }

  let listData = list.map((o) => {
    const d = { ...{ sort: 10000 }, ...o };

    return { ...d };
  });

  listData = sortBy(listData, (o) => o.sort);

  listData = listData.map((o, index) => {
    const d = { ...{}, ...o };

    d.key = `pageHeaderContentItemContainer_${index}`;

    return { ...d };
  });

  return (
    <>
      {listData.map((o) => {
        const { type, list: listItem } = o;

        if (!isArray(listItem)) {
          return null;
        }

        if (type === pageHeaderRenderType.descriptionGrid) {
          const listGridData = listItem.map((one, index) => {
            return {
              ...{ key: `${o.key}_descriptionGridItem_${index}` },
              ...one,
            };
          });

          return buildDescriptionGrid({
            key: `${o.key}_descriptionGrid`,
            list: listGridData,
            props: {
              style: { marginBottom: '4px' },
              size: 'small',
            },
          });
        }

        if (type === pageHeaderRenderType.paragraph) {
          const listParagraph = listItem.map((one, index) => {
            return { ...{ key: `${o.key}_paragraph_${index}` }, ...one };
          });

          return (
            <div key={`${o.key}_paragraph_container`}>
              {listParagraph.map((item) => {
                if (stringIsNullOrWhiteSpace(item.paragraph)) {
                  return null;
                }

                return <Paragraph key={item.key}>{item.paragraph}</Paragraph>;
              })}
            </div>
          );
        }

        if (type === pageHeaderRenderType.action) {
          const listAction = listItem.map((one, index) => {
            return { ...{ key: `${o.key}_action_${index}` }, ...one };
          });

          return (
            <Space key={`${o.key}_space`}>
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

export function pageHeaderTagWrapper(Tags) {
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

export function pageHeaderExtraContent(data) {
  if ((data || null) == null) {
    return null;
  }

  const v = {
    ...{ textLabel: '描述', text: '', tileLabel: '时间', time: new Date() },
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
          {formatDatetime(v.time, 'HH:mm:ss', '--')}
          <br />
          {formatDatetime(v.time, 'YYYY-MM-DD')}
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
    <>
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
              <Title
                level={1}
                style={{
                  ...{
                    margin: ' 0 0 0 12px',
                    fontSize: '20px',
                    color: 'white',
                    fontWeight: '600',
                    lineHeight: '32px',
                  },
                  ...(navTheme === 'light' ? { color: '#000000d9' } : {}),
                }}
              >
                <TextAnimal type="alpha" mode="smooth">
                  {shortName || '应用简称'}
                </TextAnimal>
              </Title>
            </VerticalBox>
          )
        }
      />
    </>
  );
}

export function buildButtonGroup({ buttons = [] }) {
  if (!isArray(buttons) || buttons.length <= 0) {
    return null;
  }

  return (
    <ButtonGroup>
      {buttons.map((item) => {
        const { hidden } = { ...{ hidden: false }, ...item };

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  index,
  imageUrl,
  emptyImageUrl,
}) {
  return (
    <VerticalBox
      align={align || 'bottom'}
      style={{
        height: '100%',
      }}
    >
      <div
        style={{
          width: '100px',
        }}
      >
        <ImageBox
          src={imageUrl || emptyImageUrl}
          loadingEffect
          errorOverlayVisible
          showErrorIcon={false}
          fillHeight={false}
          imageBoxStyle={{
            boxShadow: '0 1px 4px #ccc, 0 0 40px #ccc inset',
            padding: '4px',
          }}
          alt=""
          preview
        />
      </div>
    </VerticalBox>
  );
}

export function buildTagList({ list = [] }) {
  if (!isArray(list)) {
    return null;
  }

  if (list.length === 0) {
    return null;
  }

  const tagList = [];

  list.forEach((o, index) => {
    const { key, color, text, hidden } = {
      ...{
        key: `pageHeaderTag_${index}`,
        color: '#000',
        text: '未知',
        hidden: false,
      },
      ...(o || {}),
    };

    if (!hidden) {
      tagList.push({
        key,
        color,
        text,
      });
    }
  });

  if (tagList.length <= 0) {
    return null;
  }

  return (
    <Space>
      {tagList.map((o) => {
        const { key, text, color } = o;

        return (
          <Tag key={key} color={color}>
            <TextAnimal type="left" mode="smooth">
              {text}
            </TextAnimal>
          </Tag>
        );
      })}
    </Space>
  );
}

export function buildListViewItemActionSelect({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  index,
  selectData,
  selectCallback,
}) {
  if (!isFunction(selectCallback)) {
    const text = 'selectCallback 不是有效的回调函数';

    showRuntimeError({
      message: text,
    });
  }

  return (
    <Popconfirm
      placement="topRight"
      title="选择此信息，确定吗？"
      onConfirm={(e) => {
        if (isFunction(selectCallback)) {
          selectCallback(e, selectData);
        }
      }}
      okText="确定"
      cancelText="取消"
    >
      <Button type="link">
        <IconInfo icon={<ImportOutlined />} text="选取" />
      </Button>
    </Popconfirm>
  );
}

export function buildRadioItem({ list, adjustListDataCallback = null }) {
  let listData = list || [];

  if (isFunction(adjustListDataCallback)) {
    listData = adjustListDataCallback(listData);
  }

  const listRadio = [];

  if (listData.length > 0) {
    listData.forEach((item) => {
      const { name, flag, availability } = {
        ...{ name: '', flag: '', availability: whetherNumber.yes },
        ...(item || {}),
      };

      listRadio.push(
        <Radio
          key={`${flag}_${name}`}
          value={flag}
          disabled={toNumber(availability) !== whetherNumber.yes}
        >
          {name}
        </Radio>,
      );
    });

    return listRadio;
  }

  return null;
}

export function buildCustomRadio({
  label,
  separator = '：',
  size = 'middle',
  renderItemFunction,
  onChangeCallback = null,
  otherProps = null,
}) {
  const otherRadioProps = {
    ...{
      placeholder: buildFieldDescription(label, '选择'),
      style: { width: '100%' },
      size,
      onChange: (e) => {
        if (isFunction(onChangeCallback)) {
          onChangeCallback(e);
        }
      },
    },
    ...(otherProps || {}),
  };

  return (
    <FlexBox
      flexAuto="right"
      left={
        stringIsNullOrWhiteSpace(label || '') ? null : (
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
        <RadioGroup {...otherRadioProps}>
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
  otherProps = null,
}) {
  const otherRadioProps = {
    ...{
      placeholder: buildFieldDescription(label, '选择'),
      style: { width: '100%' },
      onChange: (e) => {
        if (isFunction(onChangeCallback)) {
          onChangeCallback(e);
        }
      },
    },
    ...(otherProps || {}),
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
        stringIsNullOrWhiteSpace(resultCheck.helper || '')
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
      <RadioGroup {...otherRadioProps}>
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
    listData.forEach((item) => {
      const { name, flag, alias, description, availability } = {
        ...{
          name: '',
          flag: '',
          description: '',
          alias: '',
          availability: whetherNumber.yes,
        },
        ...(item || {}),
      };

      if (stringIsNullOrWhiteSpace(toString(name))) {
        const text = 'name 不能为空';

        showRuntimeError({
          message: text,
        });
      }

      if (stringIsNullOrWhiteSpace(toString(flag))) {
        const text = 'flag 不能为空';

        showRuntimeError({
          message: text,
        });
      }

      listOption.push(
        <Option
          key={`${flag}_${name}`}
          title={`${alias || name}${
            stringIsNullOrWhiteSpace(description || '')
              ? ''
              : `[${description}]`
          }`}
          value={flag}
          disabled={toNumber(availability) !== whetherNumber.yes}
        >
          {name}
        </Option>,
      );
    });

    return listOption;
  }

  return null;
}

export function buildCustomSelect({
  label,
  separator = '：',
  size = 'middle',
  renderItemFunction,
  onChangeCallback = null,
  otherProps = null,
}) {
  const otherSelectProps = {
    ...{
      placeholder: buildFieldDescription(label, '选择') || '请选择',
      size,
      style: { width: '100%' },
      onChange: (v, option) => {
        if (isFunction(onChangeCallback)) {
          onChangeCallback(v, option);
        }
      },
    },
    ...(otherProps || {}),
  };

  return (
    <FlexBox
      flexAuto="right"
      left={
        stringIsNullOrWhiteSpace(label || '') ? null : (
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
        <Select {...otherSelectProps}>
          {isFunction(renderItemFunction) ? renderItemFunction() : null}
        </Select>
      }
    />
  );
}

export function buildFormSelect({
  label,
  name,
  renderItemFunction,
  helper = null,
  onChangeCallback = null,
  formItemLayout = null,
  required = false,
  otherProps = null,
}) {
  const otherSelectProps = {
    ...{
      placeholder: buildFieldDescription(label, '选择') || '请选择',
      style: { width: '100%' },
      onChange: (v, option) => {
        if (isFunction(onChangeCallback)) {
          onChangeCallback(v, option);
        }
      },
    },
    ...(otherProps || {}),
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
        stringIsNullOrWhiteSpace(resultCheck.helper || '')
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
      <Select {...otherSelectProps}>
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
        stringIsNullOrWhiteSpace(resultCheck.helper || '')
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
    ...{ helper: '数据的添加时间', label: '添加时间', formItemLayout: null },
    ...{ label, helper, formItemLayout },
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
        stringIsNullOrWhiteSpace(resultCheck.helper || '')
          ? null
          : buildFieldHelper(resultCheck.helper)
      }
    >
      <Input
        value={formatDatetime(
          new Date(),
          datetimeFormat.yearMonthDayHourMinute,
        )}
        addonBefore={<FormOutlined />}
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
        stringIsNullOrWhiteSpace(resultCheck.helper || '')
          ? null
          : buildFieldHelper(resultCheck.helper)
      }
    >
      <Input
        addonBefore={<FormOutlined />}
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
        stringIsNullOrWhiteSpace(resultCheck.helper || '')
          ? null
          : buildFieldHelper(resultCheck.helper)
      }
    >
      <Input
        addonBefore={<FormOutlined />}
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
  icon = <FormOutlined />,
  inputProps = {},
  canOperate = true,
  formItemLayout = {},
}) {
  const title = label;

  const otherInputProps = {
    ...{
      addonBefore: icon,
      placeholder: buildFieldDescription(title, '输入'),
    },
    ...(inputProps || {}),
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
          stringIsNullOrWhiteSpace(resultCheck.helper || '')
            ? null
            : buildFieldHelper(resultCheck.helper)
        }
      >
        <Input {...otherInputProps} />
      </FormItem>
    );
  }

  return (
    <FormItem
      {...formItemLayout}
      label={resultCheck.label}
      name={resultCheck.name}
      extra={
        stringIsNullOrWhiteSpace(resultCheck.helper || '')
          ? null
          : buildFieldHelper(resultCheck.helper)
      }
    >
      <Input {...otherInputProps} />
    </FormItem>
  );
}

export function buildSearchInputNumber({
  label,
  name,
  helper = null,
  inputProps = {},
  canOperate = true,
  formItemLayout = {},
}) {
  const title = label;

  const otherInputProps = {
    ...{
      style: { width: '100%' },
      min: 0,
      placeholder: buildFieldDescription(title, '输入'),
    },
    ...(inputProps || {}),
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
          stringIsNullOrWhiteSpace(resultCheck.helper || '')
            ? null
            : buildFieldHelper(resultCheck.helper)
        }
      >
        <InputNumber {...otherInputProps} />
      </FormItem>
    );
  }

  return (
    <FormItem
      {...formItemLayout}
      label={resultCheck.label}
      name={resultCheck.name}
      extra={
        stringIsNullOrWhiteSpace(resultCheck.helper || '')
          ? null
          : buildFieldHelper(resultCheck.helper)
      }
    >
      <InputNumber {...otherInputProps} />
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

    showRuntimeError({
      message: text,
    });

    recordObject(label);
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

export function buildFormInputFieldData({
  fieldData,
  required = false,
  icon = <FormOutlined />,
  inputProps = {},
  canOperate = true,
  formItemLayout = {},
  reminderPrefix = '输入',
  hidden = false,
}) {
  const { label, name, helper } = {
    ...{
      label: null,
      name: null,
      helper: null,
    },
    ...(fieldData || {}),
  };

  return buildFormInput({
    label: label || null,
    name: name || null,
    required,
    helper: helper || null,
    icon,
    inputProps,
    canOperate,
    formItemLayout,
    reminderPrefix,
    hidden,
  });
}

export function buildFormInput({
  label,
  name,
  required = false,
  helper = null,
  icon = <FormOutlined />,
  inputProps = {},
  canOperate = true,
  formItemLayout = {},
  reminderPrefix = '输入',
  hidden = false,
}) {
  const title = label;

  const otherInputProps = {
    ...{
      addonBefore: icon,
      placeholder: canOperate
        ? buildFieldDescription(title, reminderPrefix)
        : '暂无数据',
      disabled: !canOperate,
    },
    ...(inputProps || {}),
  };

  const resultCheck = checkFromConfig({
    label: title,
    name,
    helper,
  });

  if (!canOperate) {
    return buildFormHiddenWrapper({
      children: (
        <FormItem
          {...formItemLayout}
          label={resultCheck.label}
          name={resultCheck.name}
          extra={
            stringIsNullOrWhiteSpace(resultCheck.helper || '')
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
          <Input {...otherInputProps} />
        </FormItem>
      ),
      hidden,
    });
  }

  return buildFormHiddenWrapper({
    children: (
      <FormItem
        {...formItemLayout}
        label={resultCheck.label}
        name={resultCheck.name}
        extra={
          stringIsNullOrWhiteSpace(resultCheck.helper || '')
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
        <Input {...otherInputProps} />
      </FormItem>
    ),
    hidden,
  });
}

export function buildFormSwitch({
  label,
  name,
  required = false,
  helper = null,
  otherProps = {},
  canOperate = true,
  formItemLayout = {},
  hidden = false,
}) {
  const title = label;

  const otherSwitchProps = {
    ...{
      disabled: !canOperate,
    },
    ...(otherProps || {}),
  };

  const resultCheck = checkFromConfig({
    label: title,
    name,
    helper,
  });

  if (!canOperate) {
    return buildFormHiddenWrapper({
      children: (
        <FormItem
          {...formItemLayout}
          label={resultCheck.label}
          extra={
            stringIsNullOrWhiteSpace(resultCheck.helper || '')
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
          <FlexBox
            left={`是否开启${label}:`}
            right={<Switch {...otherSwitchProps} />}
          />
        </FormItem>
      ),
      hidden,
    });
  }

  return buildFormHiddenWrapper({
    children: (
      <FormItem
        {...formItemLayout}
        label={resultCheck.label}
        extra={
          stringIsNullOrWhiteSpace(resultCheck.helper || '')
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
        <FlexBox
          left={`是否开启${label}：`}
          right={<Switch {...otherSwitchProps} />}
        />
      </FormItem>
    ),
    hidden,
  });
}

export function buildFormPassword({
  label,
  name,
  required = false,
  helper = null,
  icon = <FormOutlined />,
  inputProps = {},
  canOperate = true,
  formItemLayout = {},
}) {
  const title = label;

  const otherInputProps = {
    ...{
      addonBefore: icon,
      placeholder: buildFieldDescription(title, '输入'),
    },
    ...(inputProps || {}),
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
          stringIsNullOrWhiteSpace(resultCheck.helper || '')
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
        <Password {...otherInputProps} />
      </FormItem>
    );
  }

  return (
    <FormItem
      {...formItemLayout}
      label={resultCheck.label}
      name={resultCheck.name}
      extra={
        stringIsNullOrWhiteSpace(resultCheck.helper || '')
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
      <Password {...otherInputProps} />
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
        stringIsNullOrWhiteSpace(resultCheck.helper || '')
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

export function buildSyntaxHighlighter({ language, value }) {
  return (
    <>
      {isObject(value) ? (
        <SyntaxHighlighter
          showLineNumbers
          wrapLines
          lineProps={{ style: { paddingBottom: 8 } }}
          language={language}
          // style={docco}
        >
          {language === 'javascript'
            ? JSON.stringify(value || {}, null, '    ')
            : value}
        </SyntaxHighlighter>
      ) : (
        <SyntaxHighlighter
          showLineNumbers
          wrapLines
          lineProps={{ style: { paddingBottom: 8 } }}
          language={language}
          // style={docco}
        >
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
        stringIsNullOrWhiteSpace(resultCheck.helper || '')
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

export function buildFormOnlyShowSyntaxHighlighter({
  language,
  label,
  value,
  helper = null,
  formItemLayout = {},
  requiredForShow = false,
}) {
  return buildFormInnerComponent({
    label,
    innerComponent: buildSyntaxHighlighter({ language, value }),
    helper,
    formItemLayout,
    requiredForShow,
  });
}

export function buildFormOnlyShowTextarea({
  label,
  value,
  helper = null,
  textAreaProps = { disabled: true },
  formItemLayout = {},
}) {
  const title = label;

  const otherTextAreaProps = {
    ...{
      placeholder: '暂无数据',
      value: stringIsNullOrWhiteSpace(value || '') ? '' : value,
    },
    ...(textAreaProps || {}),
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
        stringIsNullOrWhiteSpace(resultCheck.helper || '')
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
      <TextArea {...otherTextAreaProps} />
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
        stringIsNullOrWhiteSpace(resultCheck.helper || '')
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
  icon = <FormOutlined />,
  inputProps = { disabled: true },
  formItemLayout = {},
}) {
  const title = label;

  const otherInputProps = {
    ...{
      addonBefore: icon,
      placeholder: '暂无数据',
      value: stringIsNullOrWhiteSpace(value || '') ? '' : value,
    },
    ...(inputProps || {}),
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
        stringIsNullOrWhiteSpace(resultCheck.helper || '')
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
      <Input {...otherInputProps} />
    </FormItem>
  );
}

export function buildFormInputNumber({
  label,
  name,
  required = false,
  helper = null,
  inputNumberProps = {},
  canOperate = true,
  formItemLayout = {},
}) {
  const title = label;

  const otherInputNumberProps = {
    ...{
      style: { width: '100%' },
      min: 0,
      placeholder: buildFieldDescription(title, '输入'),
      disabled: !canOperate,
    },
    ...(inputNumberProps || {}),
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
          stringIsNullOrWhiteSpace(resultCheck.helper || '')
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
        <InputNumber {...otherInputNumberProps} />
      </FormItem>
    );
  }

  return (
    <FormItem
      {...formItemLayout}
      label={resultCheck.label}
      name={resultCheck.name}
      extra={
        stringIsNullOrWhiteSpace(resultCheck.helper || '')
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
      <InputNumber {...otherInputNumberProps} />
    </FormItem>
  );
}

export function buildFormTextArea({
  label,
  name,
  required = false,
  helper = null,
  textAreaProps = {},
  canOperate = true,
  formItemLayout = {},
}) {
  const title = label;

  const otherTextAreaProps = {
    ...{
      placeholder: buildFieldDescription(title, '输入'),
      disabled: !canOperate,
    },
    ...(textAreaProps || {}),
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
          stringIsNullOrWhiteSpace(resultCheck.helper || '')
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
        <TextArea {...otherTextAreaProps} />
      </FormItem>
    );
  }

  return (
    <FormItem
      {...formItemLayout}
      label={resultCheck.label}
      name={resultCheck.name}
      extra={
        stringIsNullOrWhiteSpace(resultCheck.helper || '')
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
      <TextArea {...otherTextAreaProps} />
    </FormItem>
  );
}

export function buildFormDatePicker({
  label,
  name,
  required = false,
  helper = null,
  datePickerProps = {},
  canOperate = true,
  formItemLayout = {},
}) {
  const title = label;

  const otherDatePickerProps = {
    ...{
      style: { width: '100%' },
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      inputReadOnly: true,
      placeholder: buildFieldDescription(title, '选择'),
    },
    ...(datePickerProps || {}),
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
          stringIsNullOrWhiteSpace(resultCheck.helper || '')
            ? null
            : buildFieldHelper(resultCheck.helper)
        }
      >
        <DatePicker {...otherDatePickerProps} />
      </FormItem>
    );
  }

  return (
    <FormItem
      {...formItemLayout}
      label={resultCheck.label}
      name={resultCheck.name}
      extra={
        stringIsNullOrWhiteSpace(resultCheck.helper || '')
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
      <DatePicker {...otherDatePickerProps} />
    </FormItem>
  );
}

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function empty() {
  return {};
}
