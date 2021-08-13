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
} from '@ant-design/icons';
import ReactJson from 'react-json-view';
import SyntaxHighlighter from 'react-syntax-highlighter';

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
  isObject,
  recordObject,
} from '../../utils/tools';
import {
  pageHeaderRenderType,
  whetherNumber,
  datetimeFormat,
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
        showRuntimeErrorMessage('name 不能为空');
      }

      if (stringIsNullOrWhiteSpace(toString(flag))) {
        showRuntimeErrorMessage('flag 不能为空');
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
    showRuntimeErrorMessage('label必须为文本');

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

export function buildFormInputFieldData(
  fieldData,
  required = false,
  icon = <FormOutlined />,
  inputProps = {},
  canOperate = true,
  formItemLayout = {},
  reminderPrefix = '输入',
  hidden = false,
) {
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
