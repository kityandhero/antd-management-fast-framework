import { requestAnimFrame } from 'antd-management-fast-common/es/utils/tools';

import Core from '../Core';

const rand = (min, max) => {
  return ~~(Math.random() * (max - min + 1) + min);
};

class RadarScanning extends Core {
  orbs = [];

  doAfterDidMount = ({ canvasContext }) => {
    const { number } = { ...{ number: 100, ...(this.props || {}) } };

    const ctx = canvasContext;

    ctx.lineCap = 'round';

    let count = number;

    while (count) {
      this.createOrb(this.canvasWidth / 2, this.canvasHeight / 2 + count * 2);

      count -= 1;
    }

    this.loop();
  };

  getTrail = () => {
    const { trail } = { ...{ trail: true, ...(this.props || {}) } };

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

  orbGo = (e) => {
    const c = this.getCanvas();

    const mx = e.pageX - c.offsetLeft;
    const my = e.pageY - c.offsetTop;

    this.createOrb(mx, my);
  };

  clear = () => {
    this.orbs = [];
  };

  loop = () => {
    requestAnimFrame(this.loop);

    const ctx = this.getCanvasContext();

    if (ctx != null) {
      const trail = this.getTrail();

      if (trail) {
        ctx.fillStyle = 'rgba(0,0,0,.1)';
        ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
      } else {
        ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      }

      let i = this.orbs.length;

      while (i) {
        const orb = this.orbs[i];

        if ((orb || null) != null) {
          let updateCount = 3;

          while (updateCount) {
            const o = this.createOrbByExist(orb);

            this.drawOrb(ctx, o);

            updateCount -= 1;
          }
        }

        i -= 1;
      }
    }
  };

  createOrb = (mx, my) => {
    const dx = this.canvasWidth / 2 - mx;
    const dy = this.canvasHeight / 2 - my;
    const dist = Math.sqrt(dx * dx + dy * dy);
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
      radius: dist,
      speed: (rand(5, 10) / 1000) * (dist / 750) + 0.015 - 0.009,
      alpha: 1 - Math.abs(dist) / this.canvasWidth,
    };

    this.orbs.push(o);
  };

  drawOrb = (ctx, orb) => {
    ctx.strokeStyle = `hsla(${orb.colorAngle},100%,50%,1)`;
    ctx.lineWidth = orb.size;
    ctx.beginPath();
    ctx.moveTo(orb.lastX, orb.lastY);
    ctx.lineTo(orb.x, orb.y);
    ctx.stroke();
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
    if (y2 < y1 && slope === -Infinity) {
      angleH = 90;
    }
    if (y2 > y1 && slope === Infinity) {
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

export default RadarScanning;
