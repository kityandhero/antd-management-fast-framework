import cls from 'classnames';
import React, { useState } from 'react';
import { isResourceHost, isResourceList } from '@designable/core';
import { isFn } from '@designable/shared';
import { observer } from '@formily/reactive-react';

import { usePrefix } from '../../hooks';
import { IconWidget } from '../IconWidget';
import { TextWidget } from '../TextWidget';

import './styles.less';

export const ResourceWidget = observer((properties) => {
  const prefix = usePrefix('resource');

  const { defaultExpand } = {
    defaultExpand: true,
    ...properties,
  };

  const [expand, setExpand] = useState(defaultExpand);

  const renderNode = (source) => {
    const { node, icon, title, thumb, span } = source;

    return (
      <div
        className={prefix + '-item'}
        style={{ gridColumnStart: `span ${span || 1}` }}
        key={node?.id}
        data-designer-source-id={node?.id}
      >
        {thumb && <img className={prefix + '-item-thumb'} src={thumb} />}

        {icon && React.isValidElement(icon) ? (
          <>{icon}</>
        ) : (
          <IconWidget
            className={prefix + '-item-icon'}
            infer={icon}
            style={{ width: 150, height: 40 }}
          />
        )}

        <span className={prefix + '-item-text'}>
          {
            <TextWidget>
              {title || node?.children[0]?.getMessage('title')}
            </TextWidget>
          }
        </span>
      </div>
    );
  };

  const sources = properties.sources?.reduce((buf, source) => {
    if (isResourceList(source)) {
      return [...buf, ...source];
    } else if (isResourceHost(source)) {
      return [...buf, ...source.Resource];
    }

    return buf;
  }, []);

  const remainItems =
    (sources?.reduce((length, source) => {
      return length + (source.span ?? 1);
    }, 0) || 0) % 3;

  return (
    <div
      className={cls(prefix, properties.className, {
        expand,
      })}
    >
      <div
        className={prefix + '-header'}
        onClick={(event) => {
          event.stopPropagation();
          event.preventDefault();
          setExpand(!expand);
        }}
      >
        <div className={prefix + '-header-expand'}>
          <IconWidget infer="Expand" size={10} />
        </div>

        <div className={prefix + '-header-content'}>
          <TextWidget>{properties.title}</TextWidget>
        </div>
      </div>

      <div className={prefix + '-content-wrapper'}>
        <div className={prefix + '-content'}>
          {sources?.map(
            isFn(properties.children) ? properties.children : renderNode,
          )}

          {remainItems ? (
            <div
              className={prefix + '-item-remain'}
              style={{ gridColumnStart: `span ${3 - remainItems}` }}
            ></div>
          ) : null}
        </div>
      </div>
    </div>
  );
});
