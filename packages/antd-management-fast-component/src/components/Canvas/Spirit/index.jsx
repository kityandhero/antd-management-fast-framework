import { requestAnimFrame } from 'antd-management-fast-common';

import { Core } from '../Core';

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
    const context = this.getCanvasContext();

    context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    this.circles = (this.circles || []).map((o) => {
      if (o.alpha <= 0) {
        return this.createCircle();
      }

      return o;
    });

    for (const o of this.circles || []) {
      this.drawCircle(context, o);
    }

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

  drawCircle = (context, circle) => {
    const o = circle;

    o.pos.y -= o.velocity;
    o.alpha -= 0.0005;

    context.beginPath();
    context.arc(o.pos.x, o.pos.y, o.scale * 10, 0, 2 * Math.PI, false);
    context.fillStyle = `rgba(255,255,255,${o.alpha})`;
    context.fill();
  };

  buildContainorStyle = () => {
    return {
      backgroundColor: '#000',
    };
  };
}

export { Spirit };
