import { Button, Modal } from 'antd';
import cls from 'classnames';
import React, { Fragment, useMemo, useState } from 'react';
import { observable } from '@formily/reactive';
import { observer } from '@formily/reactive-react';

import {
  TextWidget,
  usePrefix,
  useTheme,
} from 'antd-management-fast-design-react';

import { DataSettingPanel } from './DataSettingPanel';
import { transformDataToValue, transformValueToData } from './shared';
import { TreePanel } from './TreePanel';

import './styles.less';

export const DataSourceSetter = observer((properties) => {
  const {
    className,
    value = [],
    onChange,
    allowTree = true,
    allowExtendOption = true,
    defaultOptionValue,
    effects = () => {},
  } = properties;
  const theme = useTheme();
  const prefix = usePrefix('data-source-setter');
  const [modalVisible, setModalVisible] = useState(false);

  const treeDataSource = useMemo(
    () =>
      observable({
        dataSource: transformValueToData(value),
        selectedKey: '',
      }),
    [value],
  );

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <Fragment>
      <Button block onClick={openModal}>
        <TextWidget token="SettingComponents.DataSourceSetter.configureDataSource" />
      </Button>

      <Modal
        title={
          <TextWidget token="SettingComponents.DataSourceSetter.configureDataSource" />
        }
        width="65%"
        styles={{
          body: {
            padding: 10,
          },
        }}
        transitionName=""
        maskTransitionName=""
        open={modalVisible}
        onCancel={closeModal}
        onOk={() => {
          onChange(transformDataToValue(treeDataSource.dataSource));
          closeModal();
        }}
      >
        <div
          className={`${cls(prefix, className)} ${prefix + '-' + theme} ${
            prefix + '-layout'
          }`}
        >
          <div className={`${prefix + '-layout-item left'}`}>
            <TreePanel
              defaultOptionValue={defaultOptionValue}
              allowTree={allowTree}
              treeDataSource={treeDataSource}
            ></TreePanel>
          </div>

          <div className={`${prefix + '-layout-item right'}`}>
            <DataSettingPanel
              allowExtendOption={allowExtendOption}
              treeDataSource={treeDataSource}
              effects={effects}
            ></DataSettingPanel>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
});
