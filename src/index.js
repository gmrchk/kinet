export default class Kinet {
    constructor(options) {
        this._handlers = {
            start: [],
            tick: [],
            end: [],
        };

        this._friction = options && options.friction ? 1 - options.friction : 1 - 0.3;
        this._acceleration = options && options.acceleration ? options.acceleration : 0.04;
        this._raf = null;
        this._target = options && options.initialValue ? options.initialValue : 0;

        this.current = options && options.initialValue ? options.initialValue : 0;
        this.velocity = 0;
    }

    set target(num) {
        this._target = num;
        if (!this._raf) {
            this._handlers['start'].forEach(handler => handler(this.current, this.target));
            this.animate();
        }
        return this._target;
    }

    get target() {
        return this._target;
    }

    animate() {
        let distance = this.update();

        if (Math.abs(this.current - this.target) > 0.1) {
            this._raf = requestAnimationFrame(this.animate.bind(this));
            this._handlers['tick'].forEach(handler => handler(this.current, this.target));
        } else {
            this.current = this.target;
            this._handlers['end'].forEach(handler => handler(this.current, this.target));
            this._raf = null;
        }
    }

    update() {
        const distance = this.target - this.current;
        const attraction = distance * this._acceleration;

        this.applyForce(attraction);

        this.velocity *= this._friction;
        this.current += this.velocity;

        return distance;
    }

    applyForce(force) {
        this.velocity += force;
    }

    on(event, handler) {
        if (this._handlers[event]) {
            this._handlers[event].push(handler);
        } else {
            console.warn(`Unsupported event ${event}.`);
        }
    }

    off(event, handler) {
        if (event != null) {
            if (handler != null) {
                if (this._handlers[event] && this._handlers[event].filter(savedHandler => savedHandler === handler).length) {
                    let toRemove = this._handlers[event].filter(savedHandler => savedHandler === handler)[0];
                    let index = this._handlers[event].indexOf(toRemove);
                    if (index > -1) {
                        this._handlers[event].splice(index, 1);
                    }
                } else {
                    console.warn(`Handler for event ${event} no found.`);
                }
            } else {
                this._handlers[event] = [];
            }
        } else {
            this._handlers = {};
        }
    }
}