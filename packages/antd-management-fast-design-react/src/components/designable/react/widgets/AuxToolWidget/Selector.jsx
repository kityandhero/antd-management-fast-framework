import { Button } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { observer } from '@formily/reactive-react';

import { useHover, usePrefix, useSelection } from '../../hooks';
import { IconWidget } from '../IconWidget';
import { NodeTitleWidget } from '../NodeTitleWidget';

const useMouseHover = (reference, enter = () => {}, leave = () => {}) => {
  useEffect(() => {
    let timer = null;
    let unmounted = false;

    const onMouseOver = (event) => {
      const target = event.target;

      clearTimeout(timer);

      timer = setTimeout(() => {
        if (unmounted) {
          return;
        }

        if (reference?.current?.contains(target)) {
          enter && enter();
        } else {
          leave && leave();
        }
      }, 100);
    };

    document.addEventListener('mouseover', onMouseOver);

    return () => {
      unmounted = true;
      document.removeEventListener('mouseover', onMouseOver);
    };
  }, []);
};

export const Selector = observer(({ node }) => {
  const hover = useHover();
  const [expand, setExpand] = useState(false);
  const reference = useRef(null);
  const selection = useSelection();
  const prefix = usePrefix('aux-selector');

  const renderIcon = (node) => {
    const icon = node.designerProps.icon;

    if (icon) {
      return <IconWidget infer={icon} />;
    }

    if (node === node.root) {
      return <IconWidget infer="Page" />;
    } else if (node.designerProps?.droppable) {
      return <IconWidget infer="Container" />;
    }

    return <IconWidget infer="Component" />;
  };

  const renderMenu = () => {
    const parents = node.getParents();

    return (
      <div
        className={prefix + '-menu'}
        style={{
          position: 'absolute',
          top: '100%',
          left: 0,
        }}
      >
        {parents.slice(0, 4).map((parent) => {
          return (
            <Button
              key={parent.id}
              type="primary"
              onClick={() => {
                selection.select(parent.id);
              }}
              onMouseEnter={() => {
                hover.setHover(parent);
              }}
            >
              {renderIcon(parent)}

              <span style={{ transform: 'scale(0.85)', marginLeft: 2 }}>
                <NodeTitleWidget node={parent} />
              </span>
            </Button>
          );
        })}
      </div>
    );
  };

  useMouseHover(
    reference,
    () => {
      setExpand(true);
    },
    () => {
      setExpand(false);
    },
  );

  return (
    <div ref={reference} className={prefix}>
      <Button
        className={prefix + '-title'}
        type="primary"
        onMouseEnter={() => {
          hover.setHover(node);
        }}
      >
        {renderIcon(node)}

        <span>
          <NodeTitleWidget node={node} />
        </span>
      </Button>

      {expand && renderMenu()}
    </div>
  );
});

Selector.displayName = 'Selector';
