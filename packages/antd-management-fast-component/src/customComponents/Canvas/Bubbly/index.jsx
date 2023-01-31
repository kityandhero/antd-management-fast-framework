import { Core } from '../Core';

const r = () => Math.random();

class Bubbly extends Core {
  bubbleList = [];

  doAfterDidMount = ({ canvasContext }) => {
    const {
      shadowColor,
      blur,
      bubbleFunc,
      radiusFunc,
      angleFunc,
      velocityFunc,
      bubbles,
    } = this.props;

    const width = this.canvasWidth;
    const height = this.canvasHeight;

    const context = canvasContext;

    context.shadowColor = shadowColor || '#fff';
    context.shadowBlur = blur || 4;
    const nrBubbles = bubbles || Math.floor((width + height) * 0.02);
    this.bubbleList = [];

    let i = 0;

    while (i < nrBubbles) {
      this.bubbleList.push({
        f: (bubbleFunc || (() => `hsla(0, 0%, 100%, ${r() * 0.1})`)).call(), // fillStyle
        x: r() * width, // x-position
        y: r() * height, // y-position
        r: (radiusFunc || (() => 4 + (r() * width) / 25)).call(), // radius
        a: (angleFunc || (() => r() * Math.PI * 2)).call(), // angle
        v: (velocityFunc || (() => 0.1 + r() * 0.5)).call(), // velocity
      });

      i += 1;
    }

    this.draw();
  };

  draw = () => {
    const { colorStart, colorStop, animate, compose } = this.props || {};

    if (animate !== false) {
      requestAnimationFrame(this.draw);
    }

    const canvasContainer = this.getCanvasContainer();
    const canvas = this.getCanvas();

    if (((canvas || null) && (canvasContainer || null)) != null) {
      const width = canvasContainer.offsetWidth;
      const height = canvasContainer.offsetHeight;

      canvas.width = width;
      canvas.height = height;

      const context = canvas.getContext('2d');

      const gradient = context.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, colorStart || '#2AE');
      gradient.addColorStop(1, colorStop || '#17B');

      context.globalCompositeOperation = 'source-over';
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);
      context.globalCompositeOperation = compose || 'lighter';

      this.bubbleList = (this.bubbleList || []).map((b) => {
        const bubble = b;

        context.beginPath();
        context.arc(bubble.x, bubble.y, bubble.r, 0, Math.PI * 2);
        context.fillStyle = bubble.f;
        context.fill();
        // update positions for next draw
        bubble.x += Math.cos(bubble.a) * bubble.v;
        bubble.y += Math.sin(bubble.a) * bubble.v;
        if (bubble.x - bubble.r > width) {
          bubble.x = -bubble.r;
        }
        if (bubble.x + bubble.r < 0) {
          bubble.x = width + bubble.r;
        }
        if (bubble.y - bubble.r > height) {
          bubble.y = -bubble.r;
        }
        if (bubble.y + bubble.r < 0) {
          bubble.y = height + bubble.r;
        }

        return bubble;
      });
    }
  };
}

Bubbly.defaultProps = {
  shadowColor: '#fff',
  blur: 4,
  colorStart: '#2AE',
  colorStop: '#17B',
  animate: true,
  compose: 'lighter',
  bubbleFunc: null,
  radiusFunc: null,
  angleFunc: null,
  velocityFunc: null,
};

export { Bubbly };
