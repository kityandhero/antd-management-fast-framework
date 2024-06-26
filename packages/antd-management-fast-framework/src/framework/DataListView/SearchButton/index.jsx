import { Button } from 'antd';
import React, { PureComponent } from 'react';

import { connect } from 'easy-soft-dva';
import { isFunction } from 'easy-soft-utility';

import { iconBuilder } from 'antd-management-fast-component';

@connect(({ switchControl }) => ({
  switchControl,
}))
class SearchButton extends PureComponent {
  getProperties = () => {
    return {
      text: '查询',
      onSearch: null,
      ...this.props,
    };
  };

  render() {
    const { switchControl, loadingFlag, searchingFlag, text, onSearch } =
      this.getProperties();

    const loading = !!switchControl[loadingFlag];
    const searching = !!switchControl[searchingFlag];

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

export { SearchButton };
