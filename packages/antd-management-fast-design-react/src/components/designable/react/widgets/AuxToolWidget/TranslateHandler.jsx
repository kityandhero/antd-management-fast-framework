import cls from 'classnames';
import React from 'react';

import { useDesigner, usePrefix } from '../../hooks';
import { IconWidget } from '../IconWidget';

export const TranslateHandler = (properties) => {
  const designer = useDesigner();
  const prefix = usePrefix('aux-node-translate-handler');

  const createHandler = (value) => {
    return {
      [designer.props.nodeTranslateAttrName]: value,
      className: cls(prefix, value),
    };
  };

  const allowTranslate = properties.node.allowTranslate();

  if (!allowTranslate) {
    return null;
  }

  return (
    <>
      <div {...createHandler('translate')}>
        <IconWidget infer="FreeMove" />
      </div>
    </>
  );
};
