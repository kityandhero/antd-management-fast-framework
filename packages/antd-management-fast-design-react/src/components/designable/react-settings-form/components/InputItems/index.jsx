import cls from 'classnames';
import React, { useContext } from 'react';

import { IconWidget, usePrefix } from '../../../react';

import './styles.less';

const InputItemsContext = React.createContext(null);

export const InputItems = (properties) => {
  const prefix = usePrefix('input-items');

  const propertiesAdjust = {
    width: '100%',
    className: null,
    style: null,
    ...properties,
  };

  return (
    <InputItemsContext.Provider value={propertiesAdjust}>
      <div
        className={cls(prefix, propertiesAdjust.className)}
        style={propertiesAdjust.style}
      >
        {propertiesAdjust.children}
      </div>
    </InputItemsContext.Provider>
  );
};

const Item = (properties) => {
  const prefix = usePrefix('input-items-item');
  const context = useContext(InputItemsContext);

  return (
    <div
      className={cls(prefix, properties.className, {
        vertical: properties.vertical || context?.vertical,
      })}
      style={{ width: properties.width || context?.width, ...properties.style }}
    >
      {properties.icon && (
        <div className={prefix + '-icon'}>
          <IconWidget infer={properties.icon} size={16} />
        </div>
      )}

      {properties.title && (
        <div className={prefix + '-title'}>{properties.title}</div>
      )}

      <div className={prefix + '-controller'}>{properties.children}</div>
    </div>
  );
};

InputItems.Item = Item;
