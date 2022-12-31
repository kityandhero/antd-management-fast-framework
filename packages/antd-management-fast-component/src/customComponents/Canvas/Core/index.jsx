import React, { PureComponent } from 'react';

import { stringIsNullOrWhiteSpace } from 'antd-management-fast-common/es/utils/tools';

class Index extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  canvasContainerRef = React.createRef();

  canvasRef = React.createRef();

  canvasWidth = 0;

  canvasHeight = 0;

  componentDidMount() {
    window.addEventListener('resize', this.resize);

    const canvasContainer = this.getCanvasContainer();
    const canvas = this.getCanvas();

    if (((canvas || null) && (canvasContainer || null)) != null) {
      this.canvasWidth = canvasContainer.offsetWidth;
      this.canvasHeight = canvasContainer.offsetHeight;

      canvas.width = this.canvasWidth;
      canvas.height = this.canvasHeight;

      const canvasContext = this.getCanvasContext();

      if (canvasContext != null) {
        this.doAfterDidMount({ canvasContext });
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  getCanvasContainer = () => {
    return this.canvasContainerRef.current;
  };

  getCanvas = () => {
    return this.canvasRef.current;
  };

  getCanvasContext = () => {
    const c = this.getCanvas();

    if (c == null) {
      return null;
    }

    return c.getContext('2d');
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doAfterDidMount = ({ canvasContext }) => {};

  resize = () => {
    const canvasContainer = this.getCanvasContainer();
    const canvas = this.getCanvas();

    if (((canvas || null) && (canvasContainer || null)) != null) {
      this.canvasWidth = canvasContainer.offsetWidth;
      this.canvasHeight = canvasContainer.offsetHeight;

      canvas.width = this.canvasWidth;
      canvas.height = this.canvasHeight;
    }
  };

  buildContainorStyle = () => {
    const { backgroundImage } = {
      ...{ backgroundImage: '' },
      ...(this.props || {}),
    };

    return {
      ...(stringIsNullOrWhiteSpace(backgroundImage) ? {} : { backgroundImage }),
    };
  };

  render() {
    const containorStyle = this.buildContainorStyle();

    return (
      <div
        style={{
          ...(containorStyle || {}),
          ...{
            width: '100%',
            height: '100%',
          },
        }}
        ref={this.canvasContainerRef}
      >
        <canvas
          ref={this.canvasRef}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </div>
    );
  }
}

Index.defaultProps = {
  backgroundImage: '',
};

export default Index;
