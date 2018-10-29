export default class Kinet {

    constructor(options) {
        this._handlers = {
            set: [],
            start: [],
            tick: [],
            end: [],
        };

        let dafaults = {
            friction: 1 - 0.3,
            acceleration: 0.04,
            initialValue: 0,
            names: ["x"],
            test: function (instance) {
                return Math.abs(instance.current - instance.target) > 0.1;
            },
        };

        this._options = {
            ...dafaults,
            ...options,
        };

        // to set correct value (1 - x)
        if (options && options.friction) {
            this._options.friction = 1 - options.friction;
        }

        this._instances = {};
        this._options.names.forEach(name => {
            this._instances[name] = new KinetItem(this._options.initialValue, this._options.acceleration, this._options.friction);
        });

        this._raf = null;
    }

    set(name, num) {
        if (num == null) {
            console.warn('Define a value.');
            return;
        }
        if (this._instances[name] == null) {
            console.warn(`Instance "${name}" doesn't exist.`);
            return;
        }
        this._instances[name].current = num;
        this._instances[name].target = num;
        if (!this._raf) {
            this._handlers['set'].forEach(handler => handler(this._instances));
            this._handlers['tick'].forEach(handler => handler(this._instances));
        }
    }

    animate(name, num) {
        if (num == null) {
            console.warn('Define a value.');
            return;
        }
        if (this._instances[name] == null) {
            console.warn(`Instance ${name} doesn't exist.`);
            return;
        }
        if (this._instances[name].target !== num) {
            this._instances[name].target = num;
            if (!this._raf) {
                this._handlers['start'].forEach(handler => handler(this._instances, this._instances));
                this._animateValues();
            }
            return num;
        }

        return false;
    }

    _animateValues() {
        let done = true;

        Object.keys(this._instances).forEach(key => {
            this._instances[key].update();

            if (this._options.test(this._instances[key])) {
                done = false;
            }
        });

        if (!done) {
            this._raf = requestAnimationFrame(this._animateValues.bind(this));
            this._handlers['tick'].forEach(handler => handler(this._instances));
        } else {
            // set to final values
            Object.keys(this._instances).forEach(key => {
                this._instances[key].current = this._instances[key].target;
                this._instances[key].velocity = 0;
            });

            this._handlers['tick'].forEach(handler => handler(this._instances));
            this._handlers['end'].forEach(handler => handler(this._instances));
            this._raf = null;
        }
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
            Object.keys(this._handlers).forEach(keys => {
                this._handlers[keys] = [];
            });
        }
    }

}

class KinetItem {
    constructor(intitalValue, acceleration, friction) {
        this.current = intitalValue;
        this.target = intitalValue;
        this._acceleration = acceleration;
        this._friction = friction;
        this.velocity = 0;
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
}