import React, { PureComponent } from 'react';

import { ElasticityTagList } from '../../ElasticityTagList';

class HeaderTagWrapper extends PureComponent {
  render() {
    const { list } = this.props;

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
          <ElasticityTagList list={list} />
        </div>
      </>
    );
  }
}

HeaderTagWrapper.defaultProps = { list: [] };

export { HeaderTagWrapper };
