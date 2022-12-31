import { requestAnimFrame } from 'antd-management-fast-common/es/utils/tools';

import Core from '../Core';

class Spirit extends Core {
  circles = [];

  doAfterDidMount = () => {
    let x = 0;

    while (x < this.canvasWidth * 0.5) {
      this.circles.push(this.createCircle());

      x += 1;
    }

    this.animate();
  };

  animate = () => {
    const ctx = this.getCanvasContext();

    ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    this.circles = (this.circles || []).map((o) => {
      if (o.alpha <= 0) {
        return this.createCircle();
      }

      return o;
    });

    (this.circles || []).forEach((o) => {
      this.drawCircle(ctx, o);
    });

    requestAnimFrame(this.animate);
  };

  createCircle = () => {
    const o = {
      pos: {
        x: Math.random() * this.canvasWidth,
        y: this.canvasHeight + Math.random() * 100,
      },
      alpha: 0.1 + Math.random() * 0.3,
      scale: 0.1 + Math.random() * 0.3,
      velocity: Math.random(),
    };

    return o;
  };

  drawCircle = (ctx, circle) => {
    const o = circle;

    o.pos.y -= o.velocity;
    o.alpha -= 0.0005;

    ctx.beginPath();
    ctx.arc(o.pos.x, o.pos.y, o.scale * 10, 0, 2 * Math.PI, false);
    ctx.fillStyle = `rgba(255,255,255,${o.alpha})`;
    ctx.fill();
  };

  buildContainorStyle = () => {
    return {
      backgroundColor: '#000',
    };
  };
}

Spirit.defaultProps = {};

export default Spirit;
