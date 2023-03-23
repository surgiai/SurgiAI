// keyboard-driver.js

class KeyboardDriver {
    constructor() {
      this.keys = new Set();
      this.listeners = new Set();
      this.events = [];
    }
  
    addEventListener(listener) {
      this.listeners.add(listener);
    }
  
    removeEventListener(listener) {
      this.listeners.delete(listener);
    }
  
    keyDown(key) {
      if (!this.keys.has(key)) {
        this.keys.add(key);
        this.events.push({ type: 'keydown', key: key });
        this.listeners.forEach(listener => listener({ type: 'keydown', key: key }));
      }
    }
  
    keyUp(key) {
      if (this.keys.has(key)) {
        this.keys.delete(key);
        this.events.push({ type: 'keyup', key: key });
        this.listeners.forEach(listener => listener({ type: 'keyup', key: key }));
      }
    }
  
    getEvents() {
      const events = this.events.slice();
      this.events = [];
      return events;
    }
  }
  
  module.exports = KeyboardDriver;
  