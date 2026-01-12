import { Space, Typography } from 'antd';
import React, { Fragment, PureComponent } from 'react';

import {
  checkObjectIsNullOrEmpty,
  checkStringIsNullOrWhiteSpace,
  isArray,
  isEmptyArray,
  isString,
} from 'easy-soft-utility';

import { DescriptionGrid } from '../../DescriptionGrid';

const { Paragraph } = Typography;

class HeaderContent extends PureComponent {
  static checkProperties(p) {
    const { paragraph, gridConfig, component, actions } = p;

    return !(
      paragraph == null &&
      gridConfig == null &&
      component == null &&
      isEmptyArray(actions)
    );
  }

  render() {
    const { paragraph, gridConfig, component, actions } = this.props;

    const list = [];

    if (isString(paragraph) && !checkStringIsNullOrWhiteSpace(paragraph)) {
      list.push({
        key: 'item_paragraph_text',
        component: (
          <Paragraph style={{ marginBottom: '0' }}>{paragraph}</Paragraph>
        ),
      });
    }

    if (React.isValidElement(paragraph)) {
      list.push({
        key: 'item_paragraph_component',
        component: paragraph,
      });
    }

    if (!checkObjectIsNullOrEmpty(gridConfig)) {
      list.push({
        key: 'item_paragraph_component',
        component: (
          <DescriptionGrid
            {...{
              config: {
                style: { marginBottom: '4px' },
                size: 'small',
              },
              ...gridConfig,
            }}
          />
        ),
      });
    }

    if (React.isValidElement(component)) {
      list.push({
        key: 'item_component',
        component: component,
      });
    }

    if (isArray(actions) && actions.length > 0) {
      list.push({
        key: 'item_actions',
        component: (
          <Space>
            {actions.map((item, index) => {
              return (
                <Fragment key={`item_action_item_${index}`}>{item}</Fragment>
              );
            })}
          </Space>
        ),
      });
    }

    if (isEmptyArray(list)) {
      return null;
    }

    if (list.length === 1) {
      return list[0].component;
    }

    return (
      <Space style={{ width: '100%' }} orientation="vertical">
        {list.map((item) => {
          const { key, component } = item;

          return <div key={key}>{component}</div>;
        })}
      </Space>
    );
  }
}

HeaderContent.defaultProps = {
  paragraph: null,
  gridConfig: null,
  component: null,
  actions: [],
};

export { HeaderContent };
