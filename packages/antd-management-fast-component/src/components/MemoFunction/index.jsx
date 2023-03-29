import React from 'react';

import {
  filterUpdateModel,
  shallowUpdateEqual,
} from 'antd-management-fast-common';

/**
 * 默认比较方法
 * 使用者可以自行实现compare方法
 * @param {*} prepProps
 * @param {*} nextProps
 */
function defaultCompareFunction(prepProperties, nextProperties) {
  try {
    const prepFilterProperties = filterUpdateModel(prepProperties, []);

    const nextFilterProperties = filterUpdateModel(nextProperties, []);

    return shallowUpdateEqual(prepFilterProperties, nextFilterProperties);
  } catch (error) {
    console.warn('compare error', error);
  }

  return false;
}

function Container(properties) {
  const { RenderItem, ...otherProperties } = properties;
  return <RenderItem {...otherProperties}></RenderItem>;
}

/**
 *
 * @param {*} component 要缓存的组件
 * @param {*} compare 缓存的方法,不传则使用默认比较方法
 */
function MemoFunction(component, compare = defaultCompareFunction) {
  const memoComponent = React.memo(component, compare);

  const MemoContainer = (properties) => {
    return <Container RenderItem={memoComponent} {...properties}></Container>;
  };

  return MemoContainer;
}

export { MemoFunction };
