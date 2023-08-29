import { Button } from 'antd';
import cls from 'classnames';
import React, { Fragment, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { FormLayout } from '@formily/antd-v5';
import { observer, useField } from '@formily/react';

import { IconWidget, usePrefix, useTreeNode } from '../../../react';

import './styles.less';

export const DrawerSetter = observer((properties) => {
  const node = useTreeNode();
  const field = useField();
  const [visible, setVisible] = useState(false);
  const [remove, setRemove] = useState(false);
  const [root, setRoot] = useState();
  const prefix = usePrefix('drawer-setter');
  const formWrapperCls = usePrefix('settings-form-wrapper');

  useLayoutEffect(() => {
    const wrapper = document.querySelector('.' + formWrapperCls);

    if (wrapper) {
      setRoot(wrapper);
    }
  }, [node]);

  const renderDrawer = () => {
    if (root && visible) {
      return createPortal(
        <div
          className={cls(prefix, 'animate__animated animate__slideInRight', {
            animate__slideOutRight: remove,
          })}
        >
          <div className={prefix + '-header'} onClick={handleClose}>
            <IconWidget infer="Return" size={18} />
            <span className={prefix + '-header-text'}>
              {properties.text || field.title}
            </span>
          </div>

          <div className={prefix + '-body'}>
            <FormLayout
              colon={false}
              labelWidth={120}
              labelAlign="left"
              wrapperAlign="right"
              feedbackLayout="none"
              tooltipLayout="text"
            >
              {properties.children}
            </FormLayout>
          </div>
        </div>,
        root,
      );
    }
    return null;
  };

  const handleOpen = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setRemove(true);
    setTimeout(() => {
      setVisible(false);
      setRemove(false);
    }, 150);
  };

  return (
    <Fragment>
      <Button block onClick={handleOpen} {...properties.triggerProps}>
        {properties.text || field.title}
      </Button>

      {renderDrawer()}
    </Fragment>
  );
});
