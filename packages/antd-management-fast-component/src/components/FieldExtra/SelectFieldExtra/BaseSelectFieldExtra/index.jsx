import { Button, Divider } from 'antd';
import React from 'react';

import {
  checkStringIsNullOrWhiteSpace,
  isArray,
  isEmptyArray,
  isFunction,
  logTrace,
  mergeArrowText,
  showSimpleRuntimeError,
  toNumber,
} from 'easy-soft-utility';

import { selectModeCollection } from 'antd-management-fast-common';

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

  getFieldData = () => {
    return {
      fieldText: '',
      fieldTitle: '',
      placeholder: '请选择',
    };
  };

  clearSelect = () => {
    const { afterClearSelect } = this.props;

    this.setState({ selectData: null });

    if (isFunction(afterClearSelect)) {
      afterClearSelect();
    }
  };

  showSelect = () => {
    const { selectMode } = this.props;

    if (toNumber(selectMode) === selectModeCollection.drawer) {
      this.showDrawer();
    }

    if (toNumber(selectMode) === selectModeCollection.modal) {
      this.showModal();
    }
  };

  openDrawer = () => {
    throw new Error(this.buildOverloadErrorText('openDrawer'));
  };

  showDrawer = () => {
    this.openDrawer();
  };

  afterDrawerSelectSuccess = (o) => {
    logTrace(
      mergeArrowText(
        this.componentName,
        primaryCallName,
        'trigger',
        'afterDrawerSelectSuccess',
        'afterSelectSuccessCore',
      ),
    );

    this.afterSelectSuccessCore(o);
  };

  openModal = () => {
    throw new Error(this.buildOverloadErrorText('openModal'));
  };

  showModal = () => {
    this.openModal();
  };

  afterModalSelectSuccess = (o) => {
    logTrace(
      mergeArrowText(
        this.componentName,
        primaryCallName,
        'trigger',
        'afterModalSelectSuccess',
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

    const v = isArray(o) ? (isEmptyArray(o) ? null : o[0]) : o;

    this.setState({
      selectData: v,
    });

    if (isFunction(afterSelectSuccess)) {
      afterSelectSuccess(v);
    }
  };

  // eslint-disable-next-line no-unused-vars
  selectValueText = (data) => {
    throw new Error(this.buildOverloadErrorText('selectValueText'));
  };

  renderPresetSelectDrawer = () => {
    throw new Error(this.buildOverloadErrorText('renderPresetSelectDrawer'));
  };

  renderPresetSelectModal = () => {
    throw new Error(this.buildOverloadErrorText('renderPresetSelectModal'));
  };

  renderPresetField = () => {
    const { label, helper, formItemLayout, showClear } = this.props;
    const { selectData } = this.state;

    const { fieldText, fieldTitle, fieldPlaceholder } = {
      fieldText: '',
      fieldTitle: '',
      fieldPlaceholder: '请选择',
      ...this.getFieldData(),
    };

    const selectValue = this.selectValueText(selectData);

    const v = checkStringIsNullOrWhiteSpace(selectValue)
      ? (fieldText || '') === ''
        ? null
        : fieldText
      : selectValue;

    return (
      <OnlyShowInputItem
        label={label}
        value={v}
        helper={helper || null}
        icon={iconBuilder.form()}
        innerProps={{
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
    const { selectMode } = this.props;

    if (toNumber(selectMode) === selectModeCollection.drawer) {
      return this.renderPresetSelectDrawer();
    }

    if (toNumber(selectMode) === selectModeCollection.modal) {
      return this.renderPresetSelectModal();
    }

    const text = '无效的选择项渲染模式';

    showSimpleRuntimeError(text);

    return null;
  };

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
  required: false,
  showClear: true,
  selectMode: selectModeCollection.drawer,
};

export { BaseSelectFieldExtra };
