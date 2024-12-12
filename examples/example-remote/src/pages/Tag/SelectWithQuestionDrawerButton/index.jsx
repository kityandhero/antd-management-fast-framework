import React from 'react';

import { isFunction } from 'easy-soft-utility';

import { ElasticitySelectButton } from 'antd-management-fast-component';

import { PageListWithQuestionSelectDrawer } from '../PageListWithQuestionSelectDrawer';

const { BaseElasticitySelectButton } = ElasticitySelectButton;

class SelectWithQuestionDrawerButton extends BaseElasticitySelectButton {
  openSelector = () => {
    PageListWithQuestionSelectDrawer.open();
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

  renderPresetSelector = () => {
    const { label } = this.props;

    return (
      <PageListWithQuestionSelectDrawer
        title={label}
        width={800}
        afterSelectSuccess={this.afterSelectSuccess}
      />
    );
  };
}

SelectWithQuestionDrawerButton.defaultProps = {
  ...BaseElasticitySelectButton.defaultProps,
  label: 'Label',
  helper: '',
};

export { SelectWithQuestionDrawerButton };
