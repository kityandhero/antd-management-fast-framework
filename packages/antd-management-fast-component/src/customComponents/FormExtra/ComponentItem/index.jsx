import React from 'react';

import {
  buildFieldDescription,
  buildFieldHelper,
  checkFromConfig,
  checkStringIsNullOrWhiteSpace,
} from 'easy-soft-utility';

import { BaseComponent } from '../../BaseComponent';
import { Item } from '../Item';

import styles from './index.less';

class ComponentItem extends BaseComponent {
  ignoreComparePropertyKeyCollection = ['innerComponent'];

  renderFurther() {
    const {
      label,
      innerComponent,
      helper = null,
      formItemLayout = {},
      requiredForShow = false,
      hidden = false,
    } = this.props;

    const title = label;

    const resultCheck = checkFromConfig({
      label: title,
      name: '',
      helper,
    });

    return (
      <Item
        {...formItemLayout}
        label={resultCheck.label}
        className={requiredForShow ? styles.formItemInnerComponent : null}
        extra={
          checkStringIsNullOrWhiteSpace(resultCheck.helper || '')
            ? null
            : buildFieldHelper(resultCheck.helper)
        }
        rules={[
          {
            required: false,
            message: buildFieldDescription(resultCheck.label),
          },
        ]}
        hidden={hidden}
      >
        {innerComponent}
      </Item>
    );
  }
}

ComponentItem.defaultProps = {
  label: '',
  innerComponent: null,
  helper: null,
  formItemLayout: {},
  requiredForShow: false,
  hidden: false,
};

export { ComponentItem };
