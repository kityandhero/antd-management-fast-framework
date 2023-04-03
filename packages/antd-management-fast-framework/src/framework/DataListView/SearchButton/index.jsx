import { Button } from 'antd';
import React, { PureComponent } from 'react';

import { connect } from 'easy-soft-dva';
import { isFunction } from 'easy-soft-utility';

import { iconBuilder } from 'antd-management-fast-component';

import { viewLoadingFlag, viewSearchingFlag } from '../../../customConfig';

@connect(({ switchControl }) => ({
  switchControl,
}))
class SearchButton extends PureComponent {
  render() {
    const { switchControl, text, onSearch } = this.props;

    const loading = !!switchControl[viewLoadingFlag];
    const searching = !!switchControl[viewSearchingFlag];

    return (
      <Button
        disabled={loading || searching}
        type="primary"
        onClick={(event) => {
          if (isFunction(onSearch)) {
            onSearch(event);
          }
        }}
      >
        {searching ? iconBuilder.loading() : iconBuilder.search()}
        {text}
      </Button>
    );
  }
}

SearchButton.defaultProps = {
  text: '查询',
  onSearch: null,
};

export { SearchButton };
