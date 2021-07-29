import React from 'react';
import { Button, Divider } from 'antd';
import {
  FormOutlined,
  CloseCircleOutlined,
  SearchOutlined,
} from '@ant-design/icons';

import { isFunction, showRuntimeErrorMessage } from '../../../../utils/tools';
import SupplementWrapper from '../../../CustomWrapper/SupplementWrapper';

class SelectFieldBase extends SupplementWrapper {
  loadDataAfterMount = false;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        selectData: null,
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return super.getDerivedStateFromProps(nextProps, prevState);
  }

  clearSelect = () => {
    const { afterClearSelect } = this.props;

    this.setState({ selectData: null });

    if (isFunction(afterClearSelect)) {
      afterClearSelect();
    }
  };

  renderOther = () => {
    return null;
  };

  showSelect = () => {
    showRuntimeErrorMessage('showSelect 方法需要在上层进行实现');
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
      <FormOutlined />,
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
              onClick={e => this.showSelect(e)}
            >
              <SearchOutlined />
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
                <CloseCircleOutlined />
              </Button>
            ) : null}
          </>
        ),
      },
      formItemLayout,
    );
  };

  render() {
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
  loadSuccess: true,
  required: false,
  showClear: true,
};

export default SelectFieldBase;
