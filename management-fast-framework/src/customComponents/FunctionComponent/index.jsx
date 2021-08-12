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
} from 'antd';
import {
  EllipsisOutlined,
  LoadingOutlined,
  ImportOutlined,
} from '@ant-design/icons';

import {
  formatDatetime,
  isArray,
  copyToClipboard,
  stringIsNullOrWhiteSpace,
  showRuntimeErrorMessage,
  toString,
  getGuid,
  isFunction,
  isNumber,
  toNumber,
  sortBy,
  buildFieldHelper,
  buildFieldDescription,
  checkFromConfig,
} from '../../utils/tools';
import { pageHeaderRenderType, whetherNumber } from '../../utils/constants';
import VerticalBox from '../VerticalBox';
import ImageBox from '../ImageBox';
import IconInfo from '../IconInfo';
import FlexBox from '../FlexBox';
import FlexText from '../FlexText';

const FormItem = Form.Item;
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

    return (
      <div key={key}>
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

export function buildButtonGroup(buttonGroupData) {
  if ((buttonGroupData || null) == null) {
    return null;
  }

  return (
    <ButtonGroup>
      {(buttonGroupData.buttons || []).map((item) => {
        const { confirmMode, confirmProps } = item;

        const { disabled, onClick } = item.buttonProps || {
          onClick: () => {
            showRuntimeErrorMessage('缺少配置');
          },
        };

        if (!(confirmMode || false) || disabled) {
          return (
            <Button key={item.key} {...(item.buttonProps || {})}>
              {item.loading ? <LoadingOutlined /> : item.icon}
              {item.text || ''}
            </Button>
          );
        }

        const defaultConfirmProps = {
          title: '确定进行操作吗？',
          onConfirm: () => {
            showRuntimeErrorMessage('缺少配置');
          },
          okText: '确定',
          cancelText: '取消',
        };

        const cp = {
          ...defaultConfirmProps,
          ...{
            onConfirm: onClick,
          },
          ...(confirmProps || {}),
        };

        const { buttonProps } = item;

        delete cp.onClick;
        delete buttonProps.onClick;

        return (
          <Popconfirm {...(cp || {})} key={item.key}>
            <Button {...(buttonProps || {})}>
              {item.loading ? <LoadingOutlined /> : item.icon}
              {item.text || ''}
            </Button>
          </Popconfirm>
        );
      })}

      {(buttonGroupData.menu || null) != null ? (
        (buttonGroupData.menu.items || []).length > 0 ? (
          <Dropdown
            {...{
              ...{ placement: 'bottomRight' },
              ...(buttonGroupData.menu.dropdownProps || {}),
              ...{
                overlay: (
                  <Menu {...(buttonGroupData.menu.props || {})}>
                    {buttonGroupData.menu.items.map((item) => (
                      <Menu.Item {...(item.props || {})} key={item.key}>
                        {item.children}
                      </Menu.Item>
                    ))}
                  </Menu>
                ),
              },
            }}
          >
            <Button {...(buttonGroupData.menu.buttonProps || {})}>
              {buttonGroupData.menu.children || <EllipsisOutlined />}
            </Button>
          </Dropdown>
        ) : null
      ) : null}
    </ButtonGroup>
  );
}

export function buildDropdownEllipsis(ellipsisActionData) {
  if ((ellipsisActionData || null) == null) {
    return null;
  }

  if (!isArray(ellipsisActionData.items)) {
    return null;
  }

  const menu = (
    <Menu {...(ellipsisActionData.menuProps || {})}>
      {ellipsisActionData.items.map((item) => (
        <Menu.Item {...(item.props || {})} key={item.key}>
          {item.children}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Tooltip key={getGuid()} placement="top" title="更多操作">
      <Dropdown {...(ellipsisActionData.dropdownProps || {})} overlay={menu}>
        <Button {...(ellipsisActionData.buttonProps || {})}>
          <EllipsisOutlined
            style={{
              fontSize: 20,
              verticalAlign: 'top',
            }}
          />
        </Button>
      </Dropdown>
    </Tooltip>
  );
}

export function buildListViewItemExtra({
  align,
  // eslint-disable-next-line no-unused-vars
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

  const tagList = list.map((o, index) => {
    return {
      ...{ key: `pageHeaderTag_${index}`, color: '#000', text: '未知' },
      ...(o || {}),
    };
  });

  return (
    <Space>
      {tagList.map((o) => {
        return (
          <Tag key={o.key} color={o.color}>
            <TextAnimal type="left" mode="smooth">
              {o.text}
            </TextAnimal>
          </Tag>
        );
      })}
    </Space>
  );
}

export function buildListViewItemActionSelect({
  // eslint-disable-next-line no-unused-vars
  index,
  selectData,
  selectCallback,
}) {
  if (!isFunction(selectCallback)) {
    showRuntimeErrorMessage('selectCallback 不是有效的回调函数');
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

export function buildFormRadioItem({ list, adjustListDataCallback = null }) {
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
      <RadioGroup {...otherRadioProps}>
        {isFunction(renderItemFunction) ? renderItemFunction() : null}
      </RadioGroup>
    </FormItem>
  );
}

export function buildFormOptionItem({ list, adjustListDataCallback = null }) {
  let listData = list || [];

  if (isFunction(adjustListDataCallback)) {
    listData = adjustListDataCallback(listData);
  }

  const listOption = [];

  if (listData.length > 0) {
    listData.forEach((item) => {
      const { name, flag, availability } = {
        ...{ name: '', flag: '', availability: whetherNumber.yes },
        ...(item || {}),
      };

      if (stringIsNullOrWhiteSpace(toString(name))) {
        showRuntimeErrorMessage('name 不能为空');
      }

      if (stringIsNullOrWhiteSpace(toString(flag))) {
        showRuntimeErrorMessage('flag 不能为空');
      }

      listOption.push(
        <Option
          key={`${flag}_${name}`}
          title={name}
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

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function empty() {
  return {};
}
