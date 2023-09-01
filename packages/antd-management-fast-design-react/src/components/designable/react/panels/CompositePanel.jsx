import cls from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { isValid } from '@designable/shared';

import { usePrefix } from '../hooks';
import { IconWidget, TextWidget } from '../widgets';

const parseItems = (children) => {
  const items = [];

  React.Children.forEach(children, (child, index) => {
    if (child?.['type'] === CompositePanel.Item) {
      items.push({ key: child['key'] ?? index, ...child['props'] });
    }
  });

  return items;
};

const findItem = (items, key) => {
  for (const [index, item] of items.entries()) {
    if (key === index) return item;
    if (key === item.key) return item;
  }
};

const getDefaultKey = (children) => {
  const items = parseItems(children);
  return items?.[0].key;
};

export const CompositePanel = (properties) => {
  const prefix = usePrefix('composite-panel');
  const [activeKey, setActiveKey] = useState(
    properties.defaultActiveKey ?? getDefaultKey(properties.children),
  );
  const activeKeyReference = useRef(null);
  const [pinning, setPinning] = useState(properties.defaultPinning ?? false);
  const [visible, setVisible] = useState(properties.defaultOpen ?? true);
  const items = parseItems(properties.children);
  const currentItem = findItem(items, activeKey);
  const content = currentItem?.children;

  activeKeyReference.current = activeKey;

  useEffect(() => {
    if (
      isValid(properties.activeKey) &&
      properties.activeKey !== activeKeyReference.current
    ) {
      setActiveKey(properties.activeKey);
    }
  }, [properties.activeKey]);

  const renderContent = () => {
    if (!content || !visible) {
      return;
    }

    return (
      <div
        className={cls(prefix + '-tabs-content', {
          pinning,
        })}
      >
        <div className={prefix + '-tabs-header'}>
          <div className={prefix + '-tabs-header-title'}>
            <TextWidget>{currentItem.title}</TextWidget>
          </div>

          <div className={prefix + '-tabs-header-actions'}>
            <div className={prefix + '-tabs-header-extra'}>
              {currentItem.extra}
            </div>

            {!pinning && (
              <IconWidget
                infer="PushPinOutlined"
                className={prefix + '-tabs-header-pin'}
                onClick={() => {
                  setPinning(!pinning);
                }}
              />
            )}

            {pinning && (
              <IconWidget
                infer="PushPinFilled"
                className={prefix + '-tabs-header-pin-filled'}
                onClick={() => {
                  setPinning(!pinning);
                }}
              />
            )}

            <IconWidget
              infer="Close"
              className={prefix + '-tabs-header-close'}
              onClick={() => {
                setVisible(false);
              }}
            />
          </div>
        </div>
        <div className={prefix + '-tabs-body'}>{content}</div>
      </div>
    );
  };

  return (
    <div
      className={cls(prefix, {
        [`direction-${properties.direction}`]: !!properties.direction,
      })}
    >
      <div className={prefix + '-tabs'}>
        {items.map((item, index) => {
          const takeTab = () => {
            if (item.href) {
              return <a href={item.href}>{item.icon}</a>;
            }
            return (
              <IconWidget
                tooltip={
                  properties.showNavTitle
                    ? null
                    : {
                        title: <TextWidget>{item.title}</TextWidget>,
                        placement:
                          properties.direction === 'right' ? 'left' : 'right',
                      }
                }
                infer={item.icon}
              />
            );
          };

          const shape = item.shape ?? 'tab';
          const Comp = shape === 'link' ? 'a' : 'div';

          return (
            <Comp
              className={cls(prefix + '-tabs-pane', {
                active: activeKey === item.key,
              })}
              key={index}
              href={item.href}
              onClick={(event) => {
                if (shape === 'tab') {
                  if (activeKey === item.key) {
                    setVisible(!visible);
                  } else {
                    setVisible(true);
                  }

                  if (!properties?.activeKey || !properties?.onChange) {
                    setActiveKey(item.key);
                  }
                }

                item.onClick?.(event);
                properties.onChange?.(item.key);
              }}
            >
              {takeTab()}

              {properties.showNavTitle && item.title ? (
                <div className={prefix + '-tabs-pane-title'}>
                  <TextWidget>{item.title}</TextWidget>
                </div>
              ) : null}
            </Comp>
          );
        })}
      </div>

      {renderContent()}
    </div>
  );
};

function Item() {
  return <React.Fragment />;
}

CompositePanel.Item = Item;
