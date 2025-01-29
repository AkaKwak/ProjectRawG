export const GameCache = {
  data: new Map(),
  timeouts: new Map(),
  expirationTime: 5 * 60 * 1000, // 5 minutes

  set(key, value) {
    this.data.set(key, value);
    
    // Clear any existing timeout
    if (this.timeouts.has(key)) {
      clearTimeout(this.timeouts.get(key));
    }
    
    // Set new timeout
    const timeout = setTimeout(() => {
      this.data.delete(key);
      this.timeouts.delete(key);
    }, this.expirationTime);
    
    this.timeouts.set(key, timeout);
  },

  get(key) {
    return this.data.get(key);
  },

  has(key) {
    return this.data.has(key);
  }
}; 