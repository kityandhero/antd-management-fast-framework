import React, { useState } from 'react';
import useMergeValue from 'use-merge-value';
import classNames from 'classnames';
import { Tabs, Form } from 'antd';

import EntranceContext from './EntranceContext';
import EntranceItem from './EntranceItem';
import EntranceSubmit from './EntranceSubmit';
import EntranceTab from './EntranceTab';

import styles from './index.less';

const Entrance = (props) => {
  const { className } = props;
  const [tabs, setTabs] = useState([]);
  const [active, setActive] = useState();
  const [type, setType] = useMergeValue('', {
    value: props.activeKey,
    onChange: props.onTabChange,
  });
  const TabChildren = [];
  const otherChildren = [];

  React.Children.forEach(props.children, (child) => {
    if (!child) {
      return;
    }

    if (child.type.typeName === 'EntranceTab') {
      TabChildren.push(child);
    } else {
      otherChildren.push(child);
    }
  });

  return (
    <EntranceContext.Provider
      value={{
        tabUtil: {
          addTab: (id) => {
            setTabs([...tabs, id]);
          },
          removeTab: (id) => {
            setTabs(tabs.filter((currentId) => currentId !== id));
          },
        },
        updateActive: (activeItem) => {
          if (active[type]) {
            active[type].push(activeItem);
          } else {
            active[type] = [activeItem];
          }

          setActive(active);
        },
      }}
    >
      <div className={classNames(className, styles.entrance)}>
        <Form
          form={props.from}
          onFinish={(values) => {
            if (props.onSubmit) {
              props.onSubmit(values);
            }
          }}
        >
          {tabs.length ? (
            <React.Fragment>
              <Tabs
                animated={false}
                className={styles.tabs}
                activeKey={type}
                onChange={(activeKey) => {
                  setType(activeKey);
                }}
              >
                {TabChildren}
              </Tabs>
              {otherChildren}
            </React.Fragment>
          ) : (
            props.children
          )}
        </Form>
      </div>
    </EntranceContext.Provider>
  );
};

Entrance.Tab = EntranceTab;
Entrance.Submit = EntranceSubmit;
Entrance.UserName = EntranceItem.UserName;
Entrance.Password = EntranceItem.Password;
Entrance.Mobile = EntranceItem.Mobile;
Entrance.Captcha = EntranceItem.Captcha;

export default Entrance;
