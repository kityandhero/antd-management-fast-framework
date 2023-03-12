import React from 'react';
import ReactJson from 'react-json-view';

import { isObject } from 'easy-soft-utility';

import { BaseComponent } from '../../bases';

class JsonView extends BaseComponent {
  render() {
    const { value, theme = 'monokai' } = this.props;

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
}

JsonView.defaultProps = {
  value: '',
  theme: 'monokai',
};

export { JsonView };
