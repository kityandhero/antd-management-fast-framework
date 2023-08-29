import cls from 'classnames';
import React, { Fragment, useMemo, useRef } from 'react';
import { FormItem } from '@formily/antd-v5';
import { observer, useField } from '@formily/react';
import { observable } from '@formily/reactive';

import { IconWidget, usePrefix } from '../../../react';

import './styles.less';

const ExpandedMap = new Map();

const FoldItemInner = observer(({ className, style, children, ...other }) => {
  const prefix = usePrefix('fold-item');
  const field = useField();

  const expand = useMemo(
    () => observable.ref(ExpandedMap.get(field.address.toString())),
    [],
  );

  const slots = useRef({ base: null, extra: null });

  React.Children.forEach(children, (node) => {
    if (React.isValidElement(node)) {
      if (node?.['type']?.['displayName'] === 'FoldItem.Base') {
        slots.current.base = node['props'].children;
      }
      if (node?.['type']?.['displayName'] === 'FoldItem.Extra') {
        slots.current.extra = node['props'].children;
      }
    }
  });

  const FormItemBaseItem = FormItem.BaseItem;

  return (
    <div className={cls(prefix, className)} style={style}>
      <div
        className={prefix + '-base'}
        onClick={() => {
          expand.value = !expand.value;
          ExpandedMap.set(field.address.toString(), expand.value);
        }}
      >
        <FormItemBaseItem
          {...other}
          label={
            <span
              className={cls(prefix + '-title', {
                expand: expand.value,
              })}
            >
              {slots.current.extra && <IconWidget infer="Expand" size={10} />}
              {other.label}
            </span>
          }
        >
          <div
            style={{ width: '100%' }}
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            {slots.current.base}
          </div>
        </FormItemBaseItem>
      </div>

      {expand.value && slots.current.extra && (
        <div className={prefix + '-extra'}>{slots.current.extra}</div>
      )}
    </div>
  );
});

const Base = () => {
  return <Fragment />;
};

Base.displayName = 'FoldItem.Base';

const Extra = () => {
  return <Fragment />;
};

Extra.displayName = 'FoldItem.Extra';

FoldItemInner.Base = Base;
FoldItemInner.Extra = Extra;

export const FoldItem = FoldItemInner;
