import React, { Fragment } from 'react';
import { GlobalRegistry } from '@designable/core';
import { isPlainObj, isStr } from '@designable/shared';
import { observer } from '@formily/reactive-react';

const takeLocale = (message) => {
  if (isStr(message)) {
    return message;
  }

  if (isPlainObj(message)) {
    const lang = GlobalRegistry.getDesignerLanguage();

    for (let key in message) {
      if (key.toLocaleLowerCase() === lang) return message[key];
    }

    return;
  }

  return message;
};

const takeMessage = (token) => {
  if (!token) {
    return;
  }

  const message = isStr(token)
    ? GlobalRegistry.getDesignerMessage(token)
    : token;

  if (message) {
    return takeLocale(message);
  }

  return token;
};

export const TextWidget = observer((properties) => {
  return (
    <Fragment>
      {takeMessage(properties.children) ||
        takeMessage(properties.token) ||
        takeMessage(properties.defaultMessage)}
    </Fragment>
  );
});
