import { requestAnimFrame } from 'antd-management-fast-common';

import { Core } from '../Core';

const rand = (min, max) => {
  return Math.trunc(Math.random() * (max - min + 1) + min);
};

class RadarScanning extends Core {
  orbs = [];

  doAfterDidMount = ({ canvasContext }) => {
    const { number } = { number: 100, ...this.props };

    const context = canvasContext;

    context.lineCap = 'round';

    let count = number;

    while (count) {
      this.createOrb(this.canvasWidth / 2, this.canvasHeight / 2 + count * 2);

      count -= 1;
    }

    this.loop();
  };

  getTrail = () => {
    const { trail } = { trail: true, ...this.props };

    return trail;
  };

  turnOnMove = () => {
    const c = this.getCanvas();

    c.addEventListener('mousemove', this.orbGo, false);
  };

  turnOffMove = () => {
    const c = this.getCanvas();

    c.removeEventListener('mousemove', this.orbGo, false);
  };

  orbGo = (event) => {
    const c = this.getCanvas();

    const mx = event.pageX - c.offsetLeft;
    const my = event.pageY - c.offsetTop;

    this.createOrb(mx, my);
  };

  clear = () => {
    this.orbs = [];
  };

  loop = () => {
    requestAnimFrame(this.loop);

    const context = this.getCanvasContext();

    if (context != null) {
      const trail = this.getTrail();

      if (trail) {
        context.fillStyle = 'rgba(0,0,0,.1)';
        context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
      } else {
        context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      }

      let index = this.orbs.length;

      while (index) {
        const orb = this.orbs[index];

        if ((orb || null) != null) {
          let updateCount = 3;

          while (updateCount) {
            const o = this.createOrbByExist(orb);

            this.drawOrb(context, o);

            updateCount -= 1;
          }
        }

        index -= 1;
      }
    }
  };

  createOrb = (mx, my) => {
    const dx = this.canvasWidth / 2 - mx;
    const dy = this.canvasHeight / 2 - my;
    const distribution = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);

    const o = {
      x: mx,
      y: my,
      lastX: mx,
      lastY: my,
      hue: 0,
      colorAngle: 0,
      angle: angle + Math.PI / 2,
      // size: .5+dist/250,
      size: rand(1, 3) / 2,
      centerX: this.canvasWidth / 2,
      centerY: this.canvasHeight / 2,
      radius: distribution,
      speed: (rand(5, 10) / 1000) * (distribution / 750) + 0.015 - 0.009,
      alpha: 1 - Math.abs(distribution) / this.canvasWidth,
    };

    this.orbs.push(o);
  };

  drawOrb = (context, orb) => {
    context.strokeStyle = `hsla(${orb.colorAngle},100%,50%,1)`;
    context.lineWidth = orb.size;
    context.beginPath();
    context.moveTo(orb.lastX, orb.lastY);
    context.lineTo(orb.x, orb.y);
    context.stroke();
  };

  createOrbByExist = (o) => {
    const orb = o;

    const mxNew = orb.x;
    const myNew = orb.y;

    const x1 = this.canvasWidth / 2;
    const y1 = this.canvasHeight / 2;
    const x2 = mxNew;
    const y2 = myNew;
    const rise = y1 - y2;
    const run = x1 - x2;
    const slope = -(rise / run);
    const radian = Math.atan(slope);

    let angleH = Math.floor(radian * (180 / Math.PI));

    if (x2 < x1 && y2 < y1) {
      angleH += 180;
    }
    if (x2 < x1 && y2 > y1) {
      angleH += 180;
    }
    if (x2 > x1 && y2 > y1) {
      angleH += 360;
    }
    if (y2 < y1 && slope === Number.NEGATIVE_INFINITY) {
      angleH = 90;
    }
    if (y2 > y1 && slope === Number.POSITIVE_INFINITY) {
      angleH = 270;
    }
    if (x2 < x1 && slope === 0) {
      angleH = 180;
    }
    if (Number.isNaN(angleH)) {
      angleH = 0;
    }

    orb.x = orb.centerX + Math.sin(orb.angle * -1) * orb.radius;
    orb.y = orb.centerY + Math.cos(orb.angle * -1) * orb.radius;
    orb.lastX = orb.x;
    orb.lastY = orb.y;
    orb.colorAngle = angleH;
    orb.angle += orb.speed;

    return orb;
  };
}

RadarScanning.defaultProps = {
  number: 100,
  trail: true,
};

export { RadarScanning };
