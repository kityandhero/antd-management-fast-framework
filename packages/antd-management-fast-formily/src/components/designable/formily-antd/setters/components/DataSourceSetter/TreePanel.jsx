import { Button, Tree } from 'antd';
import React, { Fragment } from 'react';
import { GlobalRegistry } from '@designable/core';
import { observer } from '@formily/reactive-react';
import { uid } from '@formily/shared';

import {
  IconWidget,
  TextWidget,
  usePrefix,
} from 'antd-management-fast-design-react';

import { Header } from './Header';
import { traverseTree } from './shared';
import { Title } from './Title';

import './styles.less';

const limitTreeDrag = ({ dropPosition }) => {
  if (dropPosition === 0) {
    return false;
  }

  return true;
};

export const TreePanel = observer((properties) => {
  const prefix = usePrefix('data-source-setter');

  const dropHandler = (info) => {
    const dropKey = info.node?.key;
    const dragKey = info.dragNode?.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos.at(-1));
    const data = [...properties.treeDataSource.dataSource];

    let dragObject;

    traverseTree(data, (item, index, array) => {
      if (array[index].key === dragKey) {
        array.splice(index, 1);

        dragObject = item;
      }
    });

    if (!info.dropToGap) {
      traverseTree(data, (item) => {
        if (item.key === dropKey) {
          item.children = item.children || [];

          item.children.unshift(dragObject);
        }
      });
    } else if (
      (info.node.children || []).length > 0 &&
      info.node.expanded &&
      dropPosition === 1
    ) {
      traverseTree(data, (item) => {
        if (item.key === dropKey) {
          item.children = item.children || [];

          item.children.unshift(dragObject);
        }
      });
    } else {
      let ar = [];
      let index_ = 0;

      traverseTree(data, (item, index, array) => {
        if (item.key === dropKey) {
          ar = array;
          index_ = index;
        }
      });

      if (dropPosition === -1) {
        ar.splice(index_, 0, dragObject);
      } else {
        ar.splice(index_ + 1, 0, dragObject);
      }
    }
    properties.treeDataSource.dataSource = data;
  };
  return (
    <Fragment>
      <Header
        title={
          <TextWidget token="SettingComponents.DataSourceSetter.dataSourceTree" />
        }
        extra={
          <Button
            type="text"
            onClick={() => {
              const uuid = uid();
              const dataSource = properties.treeDataSource.dataSource;
              const initialKeyValuePairs = properties.defaultOptionValue?.map(
                (item) => ({ ...item }),
              ) || [
                {
                  label: 'label',
                  value: `${GlobalRegistry.getDesignerMessage(
                    `SettingComponents.DataSourceSetter.item`,
                  )} ${dataSource.length + 1}`,
                },
                { label: 'value', value: uuid },
              ];

              properties.treeDataSource.dataSource = [
                ...dataSource,
                {
                  key: uuid,
                  duplicateKey: uuid,
                  map: initialKeyValuePairs,
                  children: [],
                },
              ];
            }}
            icon={<IconWidget infer="Add" />}
          >
            <TextWidget token="SettingComponents.DataSourceSetter.addNode" />
          </Button>
        }
      />
      <div className={`${prefix + '-layout-item-content'}`}>
        <Tree
          blockNode
          draggable={true}
          allowDrop={properties.allowTree ? () => true : limitTreeDrag}
          defaultExpandAll
          defaultExpandParent
          autoExpandParent
          showLine={{ showLeafIcon: false }}
          treeData={properties.treeDataSource.dataSource}
          onDragEnter={() => {}}
          onDrop={dropHandler}
          titleRender={(titleProperties) => {
            return (
              <Title
                {...titleProperties}
                treeDataSource={properties.treeDataSource}
              ></Title>
            );
          }}
          onSelect={(selectedKeys) => {
            if (selectedKeys[0]) {
              properties.treeDataSource.selectedKey =
                selectedKeys[0].toString();
            }
          }}
        ></Tree>
      </div>
    </Fragment>
  );
});
