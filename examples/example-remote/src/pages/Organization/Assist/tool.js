function getTextStyle(level) {
  switch (level) {
    case 0: {
      return 20;
    }
    case 1: {
      return 16;
    }
    default: {
      return 14;
    }
  }
}

function getRootTextAttributes() {
  return {
    fontSize: getTextStyle(1),
    fontWeight: 'bold',
    fill: '#fff',
  };
}

function getSecondTextStyle() {
  return {
    fontSize: getTextStyle(2),
    color: '#000',
  };
}

function getRootNodeStyle() {
  return {
    fill: '#1E88E5',
    stroke: '#1E88E5',
    radius: 5,
  };
}

function getSecondNodeStyle() {
  return {
    fill: '#e8e8e8',
    stroke: '#e8e8e8',
    radius: 5,
  };
}

function calcStringLength(string_) {
  let length_ = 0;
  for (let index = 0; index < string_.length; index++) {
    if (string_.codePointAt(index) > 0 && string_.codePointAt(index) < 128) {
      length_++;
    } else {
      length_ += 2;
    }
  }
  return length_;
}

export function buildConfig() {
  return {
    height: 600,
    nodeCfg: {
      size: [40, 40],
      autoWidth: true,
      padding: 10,
      style: (item) => {
        const { level } = item.value;
        return {
          fill: 'transparent',
          stroke: 'transparent',
          radius: 4,
          cursor: 'pointer',
          ...(level === 0 ? getRootNodeStyle() : {}),
          ...(level === 1 ? getSecondNodeStyle() : {}),
        };
      },
      nodeStateStyles: {
        hover: {
          lineWidth: 2,
          stroke: '#96DEFF',
        },
      },
      label: {
        style: (cfg, group, type) => {
          const { level, href } = cfg.value;

          if (type !== 'name') {
            return {};
          }
          return {
            fontSize: getTextStyle(),
            cursor: 'pointer',
            fill: href ? '#1890ff' : '#000',
            ...(level === 0 ? getRootTextAttributes() : {}),
            ...(level === 1 ? getSecondTextStyle() : {}),
          };
        },
      },
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
    },
    edgeCfg: {
      type: 'polyline',
      style: {
        stroke: '#000',
        endArrow: false,
      },
    },
    markerCfg: (cfg) => {
      const { level, direction } = cfg.value;
      const show = level !== 0 && cfg.children && cfg.children.length > 0;
      return {
        position: direction,
        show,
      };
    },
    layout: {
      type: 'mindmap',
      direction: 'H',
      getWidth: (cfg) => {
        const { name, level } = cfg.value;
        const fontSize = getTextStyle(level);
        const width = (fontSize * calcStringLength(name)) / 2;
        return width;
      },
      getHeight: () => {
        return 25;
      },
      getVGap: () => {
        return 20;
      },
      getHGap: () => {
        return 40;
      },
      getSide: (d) => {
        return d.data.value.direction === 'left' ? 'left' : 'right';
      },
    },
    autoFit: true,
    fitCenter: true,
    animate: true,
    minimapCfg: {
      show: true,
    },
    behaviors: ['drag-canvas', 'zoom-canvas'],
    onReady: (graph) => {
      graph.on('node:click', (event) => {
        const { item } = event;
        const { value } = item.get('model');

        if (value.href) {
          window.open(value.href);
        }
      });
    },
  };
}
