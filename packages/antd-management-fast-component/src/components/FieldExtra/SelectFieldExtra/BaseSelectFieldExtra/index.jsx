import { Button, Divider } from 'antd';
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
        innerProps={{
          placeholder: placeholder || buildFieldDescription(label, '选择'),
          readOnly: true,
          addonAfter: (
            <>
              <Button
                style={{
                  border: '0px solid #d9d9d9',
                  backgroundColor: '#fafafa',
                  height: '30px',
                  paddingLeft: 0,
                  paddingRight: 0,
                }}
                title={buildFieldDescription(label, '选择')}
                onClick={(event) => this.showSelect(event)}
              >
                {iconBuilder.search()}
              </Button>

              {showClear ? (
                <Divider
                  type="vertical"
                  style={{
                    paddingLeft: 2,
                    paddingRight: 2,
                  }}
                />
              ) : null}

              {showClear ? (
                <Button
                  style={{
                    border: '0px solid #d9d9d9',
                    backgroundColor: '#fafafa',
                    height: '30px',
                    paddingLeft: 0,
                    paddingRight: 0,
                  }}
                  disabled={selectData == null}
                  title="清除选择"
                  onClick={() => this.clearSelect()}
                >
                  {iconBuilder.closeCircle()}
                </Button>
              ) : null}
            </>
          ),
        }}
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
