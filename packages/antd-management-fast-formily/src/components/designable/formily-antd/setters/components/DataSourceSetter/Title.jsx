import React from 'react';
import { observer } from '@formily/reactive-react';
import { clone, toArr } from '@formily/shared';

import {
  IconWidget,
  TextWidget,
  usePrefix,
} from 'antd-management-fast-design-react';

import { traverseTree } from './shared';

import './styles.less';

const getTitleValue = (dataSource) => {
  const optionalKeys = ['label', 'title', 'header'];
  let nodeTitle;

  optionalKeys.some((key) => {
    const title = toArr(dataSource).find((item) => item.label === key)?.value;

    if (title !== undefined) {
      nodeTitle = title;
      return true;
    }

    return false;
  });

  if (nodeTitle === undefined) {
    toArr(dataSource || []).some((item) => {
      if (item.value && typeof item.value === 'string') {
        nodeTitle = item.value;

        return true;
      }

      return false;
    });
  }

  return nodeTitle;
};

export const Title = observer((properties) => {
  const prefix = usePrefix('data-source-setter-node-title');

  const renderTitle = (dataSource) => {
    const nodeTitle = getTitleValue(dataSource);

    return nodeTitle === undefined ? (
      <TextWidget token="SettingComponents.DataSourceSetter.defaultTitle" />
    ) : (
      nodeTitle + ''
    );
  };

  return (
    <div className={prefix}>
      <span style={{ marginRight: '5px' }}>
        {renderTitle(properties?.map || [])}
      </span>

      <IconWidget
        className={prefix + '-icon'}
        infer="Remove"
        onClick={() => {
          const newDataSource = clone(properties?.treeDataSource?.dataSource);

          traverseTree(newDataSource || [], (dataItem, index, data) => {
            if (data[index].key === properties.duplicateKey) {
              toArr(data).splice(index, 1);
            }
          });

          properties.treeDataSource.dataSource = newDataSource;
        }}
      />
    </div>
  );
});
