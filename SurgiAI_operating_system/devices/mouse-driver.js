// mouse-driver.js

class MouseDriver {
    constructor() {
      this.x = 0;
      this.y = 0;
      this.buttons = new Set();
      this.listeners = new Set();
      this.events = [];
    }
  
    addEventListener(listener) {
      this.listeners.add(listener);
    }
  
    removeEventListener(listener) {
      this.listeners.delete(listener);
    }
  
    move(x, y) {
      this.x += x;
      this.y += y;
      this.events.push({ type: 'mousemove', x: this.x, y: this.y });
      this.listeners.forEach(listener => listener({ type: 'mousemove', x: this.x, y: this.y }));
    }
  
    buttonDown(button) {
      if (!this.buttons.has(button)) {
        this.buttons.add(button);
        this.events.push({ type: 'mousedown', button: button, x: this.x, y: this.y });
        this.listeners.forEach(listener => listener({ type: 'mousedown', button: button, x: this.x, y: this.y }));
      }
    }
  
    buttonUp(button) {
      if (this.buttons.has(button)) {
        this.buttons.delete(button);
        this.events.push({ type: 'mouseup', button: button, x: this.x, y: this.y });
        this.listeners.forEach(listener => listener({ type: 'mouseup', button: button, x: this.x, y: this.y }));
      }
    }
  
    getEvents() {
      const events = this.events.slice();
      this.events = [];
      return events;
    }
  }
  
  module.exports = MouseDriver;
  