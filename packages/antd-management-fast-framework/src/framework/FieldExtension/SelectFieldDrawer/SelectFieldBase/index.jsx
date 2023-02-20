import { Button, Divider } from 'antd';
import React from 'react';

import { isFunction, showSimpleRuntimeError } from 'easy-soft-utility';

import { iconBuilder } from 'antd-management-fast-component';

import { SupplementWrapper } from '../../../CustomWrapper/SupplementWrapper';

class SelectFieldBase extends SupplementWrapper {
  loadDataAfterMount = false;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      selectData: null,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return super.getDerivedStateFromProps(nextProperties, previousState);
  }

  clearSelect = () => {
    const { afterClearSelect } = this.props;

    this.setState({ selectData: null });

    if (isFunction(afterClearSelect)) {
      afterClearSelect();
    }
  };

  showSelect = () => {
    const text = 'showSelect 方法需要在上层进行实现';

    showSimpleRuntimeError(text);
  };

  getFieldData = () => {
    return {
      fieldText: '',
      fieldTitle: '',
      placeholder: '请选择',
    };
  };

  renderField = () => {
    const {
      dataLoading,
      processing,
      loadSuccess,
      label,
      helper,
      formItemLayout,
      showClear,
    } = this.props;

    const { fieldText, fieldTitle, fieldPlaceholder } = this.getFieldData() || {
      fieldText: '',
      fieldTitle: '',
      fieldPlaceholder: '请选择',
    };

    return this.renderFormOnlyShowInput(
      label,
      (fieldText || '') === '' ? null : fieldText,
      helper || null,
      iconBuilder.form(),
      {
        placeholder: `${fieldPlaceholder}${fieldTitle}`,
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
              disabled={dataLoading || processing || !loadSuccess}
              title={`选择${fieldTitle}`}
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
                disabled={dataLoading || processing || !loadSuccess}
                title="清除选择"
                onClick={() => this.clearSelect()}
              >
                {iconBuilder.closeCircle()}
              </Button>
            ) : null}
          </>
        ),
      },
      formItemLayout,
    );
  };

  renderFurther() {
    return (
      <>
        {this.renderField()}

        {this.renderOther()}
      </>
    );
  }
}

SelectFieldBase.defaultProps = {
  dataLoading: false,
  processing: false,
  loadSuccess: true,
  required: false,
  showClear: true,
};

export { SelectFieldBase };
