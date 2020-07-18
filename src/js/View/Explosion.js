import CommonBase from "js/Common/CommonBase";

export default class Explosion extends CommonBase {
    constructor(radius, count, size, timeRange, color = '#ff1166',) {
        super();
        this.radius = radius;
        this.color = color;
        this.count = count;
        this.startTime = 0;
        this.timeRange = timeRange;
        this.fireBaseSize = size;
        this.fireSize = [];
        this.firePoistion = [];
        this.fireVector = [];
    }
    ease(t) {
        return t * t * t * t;
    }
    set(x, y) {
        for (let i = 0; i < this.count; i++) {
            this.firePoistion[i] = { x: x, y: y };
            let vr = Math.random() * Math.PI * 2;
            let s = Math.sin(vr);
            let c = Math.cos(vr);
            let mr = Math.random();
            this.fireVector[i] = { x: c * mr, y: s * mr };
            this.fireSize[i] = (Math.random() * .5 + .5) * this.fireBaseSize;
        }
        this.startTime = Date.now();
    }
    update(context) {
        context.save();
        context.fillStyle = this.color;
        context.globalAlpha = .5;
        let time = (Date.now() - this.startTime) / 1000;
        let ease = this.ease(1.0 - Math.min(time / this.timeRange, 1.0));
        let progress = 1.0 - ease;

        for (let i = 0; i < this.firePoistion.length; i++) {
            let s = 1.0 - progress;
            let d = this.radius * progress;
            let x = this.firePoistion[i].x + this.fireVector[i].x * d;
            let y = this.firePoistion[i].y + this.fireVector[i].y * d;
            context.fillRect(x - this.fireSize[i] * s / 2, y - this.fireSize[i] * s / 2, this.fireSize[i] * s, this.fireSize[i] * s);
        }
        context.restore();
    }
}