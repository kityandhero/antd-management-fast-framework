import React from 'react';
import { Button, Checkbox, Popover, Tooltip } from 'antd';
import { PushpinOutlined, SettingOutlined, VerticalAlignMiddleOutlined } from '@ant-design/icons';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import DnDItem from './DndItem';

import styles from './index.less';

const Backend = HTML5Backend;

/**
 *  根据 key 和 dataIndex 生成唯一 id
 * @param key
 * @param dataIndex
 */
export const genColumnKey = (key, dataIndex) => {
  if (key) {
    return key;
  }
  if (!key && dataIndex) {
    if (Array.isArray(dataIndex)) {
      return dataIndex.join('-');
    }
    return dataIndex;
  }
  return undefined;
};

const ToolTipIcon = ({ title, show, children, columnKey, fixed, columnsMap, setColumnsMap }) => {
  if (show) {
    return (
      <Tooltip title={title}>
        <span
          onClick={() => {
            const config = columnsMap[columnKey || ''] || {};
            const columnKeyMap = {
              ...columnsMap,
              [columnKey]: { ...config, fixed },
            };
            setColumnsMap(columnKeyMap);
          }}
        >
          {children}
        </span>
      </Tooltip>
    );
  }
  return null;
};

const CheckboxListItem = ({ columnKey, columnsMap, title, setColumnsMap, fixed }) => {
  const columnsCollection = columnsMap || [];

  const config = columnsCollection[columnKey || 'null'] || { show: true };

  return (
    <span className={styles.item} key={columnKey}>
      <Checkbox
        className={styles.checkbox}
        onChange={(e) => {
          if (columnKey) {
            const tempConfig = columnsCollection[columnKey || ''] || {};
            const newSetting = { ...tempConfig };
            if (e.target.checked) {
              delete newSetting.show;
            } else {
              newSetting.show = false;
            }
            const columnKeyMap = {
              ...columnsCollection,
              [columnKey]: newSetting,
            };

            if (setColumnsMap) {
              setColumnsMap(columnKeyMap);
            }
          }
        }}
        checked={config.show !== false}
      >
        {title}
      </Checkbox>
      <span className={styles.option}>
        <ToolTipIcon columnKey={columnKey} fixed="left" title="固定到左边" show={fixed !== 'left'}>
          <PushpinOutlined
            style={{
              transform: 'rotate(-90deg)',
            }}
          />
        </ToolTipIcon>
        <ToolTipIcon columnKey={columnKey} fixed={undefined} title="取消固定" show={!!fixed}>
          <VerticalAlignMiddleOutlined />
        </ToolTipIcon>
        <ToolTipIcon
          columnKey={columnKey}
          fixed="right"
          title="固定到右边"
          show={fixed !== 'right'}
        >
          <PushpinOutlined />
        </ToolTipIcon>
      </span>
    </span>
  );
};

const CheckboxList = ({
  list,
  columnsMap,
  setColumnsMap,
  sortKeyColumns,
  setSortKeyColumns,
  showTitle = true,
  title: listTitle,
}) => {
  const show = list && list.length > 0;

  if (!show) {
    return null;
  }

  const move = (id, targetIndex) => {
    const newColumns = [...sortKeyColumns];

    const findIndex = newColumns.findIndex((columnKey) => columnKey === id);

    const key = newColumns[findIndex];
    newColumns.splice(findIndex, 1);
    if (targetIndex === 0) {
      newColumns.unshift(key);
    } else {
      newColumns.splice(targetIndex, 0, key);
    }
    setSortKeyColumns(newColumns);
  };

  const listDom = list.map(({ key, dataIndex, title, fixed, ...rest }, index) => {
    const columnKey = genColumnKey(key, dataIndex || rest.index);

    return (
      <DnDItem
        index={index}
        id={`${columnKey}_${rest.index}`}
        key={`${columnKey || 'no'}_${title}`}
        end={(id, targetIndex) => {
          move(id, targetIndex);
        }}
      >
        <CheckboxListItem
          setColumnsMap={setColumnsMap}
          columnKey={columnKey || `${index}`}
          columnsMap={columnsMap}
          title={title}
          fixed={fixed}
        />
      </DnDItem>
    );
  });

  return (
    <DndProvider backend={Backend}>
      {showTitle && <span className={styles.title}>{listTitle}</span>}
      {listDom}
    </DndProvider>
  );
};

const GroupCheckboxList = ({ localColumns, columnsMap, setColumnsMap, setSortKeyColumns }) => {
  const rightList = [];
  const leftList = [];
  const list = [];

  localColumns.forEach((item) => {
    const { fixed } = item;
    if (fixed === 'left') {
      leftList.push(item);
      return;
    }
    if (fixed === 'right') {
      rightList.push(item);
      return;
    }
    list.push(item);
  });
  const showRight = rightList && rightList.length > 0;
  const showLeft = leftList && leftList.length > 0;
  return (
    <div className={styles.list}>
      <CheckboxList
        key="list-leftList"
        title="固定在左侧"
        list={leftList}
        columnsMap={columnsMap}
        setColumnsMap={setColumnsMap}
      />
      {/* 如果没有任何固定，不需要显示title */}
      <CheckboxList
        key="list-list"
        list={list}
        title="不固定"
        columnsMap={columnsMap}
        showTitle={showLeft || showRight}
        setColumnsMap={setColumnsMap}
      />
      <CheckboxList
        key="list-rightList"
        title="固定在右侧"
        list={rightList}
        columnsMap={columnsMap}
        setColumnsMap={setColumnsMap}
        setSortKeyColumns={setSortKeyColumns}
      />
    </div>
  );
};

const ColumnSetting = (props) => {
  const localColumns = props.columns || [];
  const { columnsMap, setColumnsMap, setSortKeyColumns } = props;

  /**
   * 设置全部选中，或全部未选中
   * @param show
   */
  const setAllSelectAction = (show = true) => {
    const columnKeyMap = {};
    localColumns.forEach(({ key, fixed, dataIndex }) => {
      const columnKey = genColumnKey(key, dataIndex);
      if (columnKey) {
        columnKeyMap[columnKey] = {
          show,
          fixed,
        };
      }
    });

    if (setColumnsMap) {
      setColumnsMap(columnKeyMap);
    }
  };

  const selectKeys = Object.values(columnsMap || []).filter((value) => {
    return !value || value.show === false;
  });

  const indeterminate = selectKeys.length > 0 && selectKeys.length !== localColumns.length;

  return (
    <span className={styles.columnSetting}>
      <Popover
        arrowPointAtCenter
        title={
          <div className={styles.topTitle}>
            <Checkbox
              indeterminate={indeterminate}
              checked={selectKeys.length === 0 && selectKeys.length !== localColumns.length}
              onChange={(e) => {
                if (e.target.checked) {
                  setAllSelectAction();
                } else {
                  setAllSelectAction(false);
                }
              }}
            >
              列展示
            </Checkbox>
            <a
              onClick={() => {
                setColumnsMap({});
                setSortKeyColumns([]);
              }}
            >
              重置
            </a>
          </div>
        }
        trigger="click"
        placement="bottomRight"
        content={
          <div>
            <GroupCheckboxList
              localColumns={localColumns}
              columnsMap={columnsMap}
              setColumnsMap={setColumnsMap}
              setSortKeyColumns={setSortKeyColumns}
            />
          </div>
        }
      >
        <Tooltip title="列设置">
          <Button
            shape="circle"
            style={{
              border: 0,
              color: '#000000',
            }}
            icon={<SettingOutlined />}
          />
        </Tooltip>
      </Popover>
    </span>
  );
};

export default ColumnSetting;
