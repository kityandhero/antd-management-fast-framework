import { Button, Space, Tooltip } from 'antd';
import React from 'react';

import {
  buildFieldDescription,
  checkStringIsNullOrWhiteSpace,
  isFunction,
  logTrace,
  mergeArrowText,
} from 'easy-soft-utility';

import { BaseComponent } from '../../../../bases/BaseComponent';
import { FormExtra } from '../../../FormExtra';
import { iconBuilder } from '../../../Icon';

const { OnlyShowInputItem } = FormExtra;

const primaryCallName = 'FieldExtra::SelectFieldExtra::BaseSelectFieldExtra';

class BaseSelectFieldExtra extends BaseComponent {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      selectData: null,
    };
  }

  clearSelect = () => {
    const { afterClearSelect } = this.props;

    this.setState({ selectData: null });

    if (isFunction(afterClearSelect)) {
      afterClearSelect();
    }
  };

  showSelect = () => {
    this.openSelector();
  };

  openSelector = () => {
    throw new Error(this.buildOverloadErrorText('openSelector'));
  };

  afterSelectSuccess = (o) => {
    logTrace(
      mergeArrowText(
        this.componentName,
        primaryCallName,
        'trigger',
        'afterSelectSuccess',
        'afterSelectSuccessCore',
      ),
    );

    this.afterSelectSuccessCore(o);
  };

  afterSelectSuccessCore = (o) => {
    if ((o || null) == null) {
      return;
    }

    const { afterSelectSuccess } = this.props;

    this.setState({
      selectData: o,
    });

    if (isFunction(afterSelectSuccess)) {
      afterSelectSuccess(o);
    }
  };

  // eslint-disable-next-line no-unused-vars
  selectValueText = (data) => {
    throw new Error(this.buildOverloadErrorText('selectValueText'));
  };

  renderPresetSelector = () => {
    throw new Error(this.buildOverloadErrorText('renderPresetSelector'));
  };

  renderPresetField = () => {
    const {
      label,
      defaultValue,
      helper,
      placeholder,
      formItemLayout,
      showClear,
      required,
    } = this.props;
    const { selectData } = this.state;

    const selectValue = this.selectValueText(selectData);

    const v = checkStringIsNullOrWhiteSpace(selectValue)
      ? defaultValue || ''
      : selectValue;

    return (
      <OnlyShowInputItem
        label={label}
        value={v}
        helper={helper || null}
        icon={iconBuilder.form()}
        required={required || false}
        innerProps={{
          placeholder: placeholder || buildFieldDescription(label, '选择'),
          readOnly: true,
        }}
        addonAfter={
          <Space.Compact block>
            <Tooltip title={buildFieldDescription(label, '选择')}>
              <Button
                icon={iconBuilder.search()}
                onClick={(event) => this.showSelect(event)}
              />
            </Tooltip>

            {showClear ? (
              <Tooltip title="清除选择">
                <Button
                  disabled={selectData == null}
                  icon={iconBuilder.closeCircle()}
                  onClick={() => this.clearSelect()}
                />
              </Tooltip>
            ) : null}
          </Space.Compact>
        }
        formItemLayout={formItemLayout}
      />
    );
  };

  renderPresetOther = () => {
    return this.renderPresetSelector();
  };

  /**
   * 渲染主入口。
   * @function
   * @returns {Object} 渲染结果
   */
  renderFurther() {
    return (
      <>
        {this.renderPresetField()}

        {this.renderPresetOther()}
      </>
    );
  }
}

BaseSelectFieldExtra.defaultProps = {
  label: '',
  defaultValue: '',
  helper: '',
  placeholder: '',
  formItemLayout: null,
  required: false,
  showClear: true,
};

export { BaseSelectFieldExtra };
