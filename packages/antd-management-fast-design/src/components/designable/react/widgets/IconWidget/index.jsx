import { Tooltip } from 'antd';
import cls from 'classnames';
import React, { createContext, useContext, useEffect, useRef } from 'react';
import { isFn, isObj, isPlainObj, isStr } from '@designable/shared';
import { observer } from '@formily/reactive-react';

import { usePrefix, useRegistry, useTheme } from '../../hooks';

import './styles.less';

const IconContext = createContext(null);

const isNumberSize = (value) => /^[\d.]+$/.test(value);

export const IconWidget = observer((properties) => {
  const theme = useTheme();
  const context = useContext(IconContext);
  const registry = useRegistry();
  const prefix = usePrefix('icon');
  const size = properties.size > 0 || '1em';
  const height = properties.style?.height || size;
  const width = properties.style?.width || size;

  const takeIcon = (infer) => {
    if (isStr(infer)) {
      const found = registry.getDesignerIcon(infer);

      if (found) {
        return takeIcon(found);
      }

      return <img alt="" src={infer} height={height} width={width} />;
    } else if (isFn(infer)) {
      return React.createElement(infer, {
        height,
        width,
        fill: 'currentColor',
      });
    } else if (React.isValidElement(infer)) {
      if (infer.type === 'svg') {
        return React.cloneElement(infer, {
          height,
          width,
          fill: 'currentColor',
          viewBox: infer.props.viewBox || '0 0 1024 1024',
          focusable: 'false',
          'aria-hidden': 'true',
        });
      } else if (infer.type === 'path' || infer.type === 'g') {
        return (
          <svg
            viewBox="0 0 1024 1024"
            height={height}
            width={width}
            fill="currentColor"
            focusable="false"
            aria-hidden="true"
          >
            {infer}
          </svg>
        );
      }

      return infer;
    } else if (isPlainObj(infer)) {
      if (infer[theme]) {
        return takeIcon(infer[theme]);
      } else if (infer['shadow']) {
        const IconWidgetShadowSVG = IconWidget.ShadowSVG;

        return (
          <IconWidgetShadowSVG
            width={width}
            height={height}
            content={infer['shadow']}
          />
        );
      }

      return null;
    }
  };
  const renderTooltips = (children) => {
    if (!isStr(properties.infer) && context?.tooltip) {
      return children;
    }

    const tooltip =
      properties.tooltip ||
      registry.getDesignerMessage(`icons.${properties.infer}`);

    if (tooltip) {
      const title =
        React.isValidElement(tooltip) || isStr(tooltip)
          ? tooltip
          : tooltip.title;

      const properties_ =
        React.isValidElement(tooltip) || isStr(tooltip)
          ? {}
          : isObj(tooltip)
          ? tooltip
          : {};

      return (
        <Tooltip {...properties_} title={title}>
          {children}
        </Tooltip>
      );
    }

    return children;
  };

  if (!properties.infer) {
    return null;
  }

  return renderTooltips(
    <span
      {...properties}
      className={cls(prefix, properties.className)}
      style={{
        ...properties.style,
        cursor: properties.onClick ? 'pointer' : properties.style?.cursor,
      }}
    >
      {takeIcon(properties.infer)}
    </span>,
  );
});

const ShadowSVG = (properties) => {
  const reference = useRef();

  const width = isNumberSize(properties.width)
    ? `${properties.width}px`
    : properties.width;

  const height = isNumberSize(properties.height)
    ? `${properties.height}px`
    : properties.height;

  useEffect(() => {
    // if (ref.current) {
    //   const root = ref.current.attachShadow({
    //     mode: 'open',
    //   })
    //   root.innerHTML = `<svg viewBox="0 0 1024 1024" style="width:${width};height:${height}">${props.content}</svg>`
    // }
  }, [height, properties.content, width]);
  return <div ref={reference}></div>;
};

IconWidget.ShadowSVG = ShadowSVG;

function Provider(properties) {
  return (
    <IconContext.Provider value={properties}>
      {properties?.children}
    </IconContext.Provider>
  );
}

IconWidget.Provider = Provider;
