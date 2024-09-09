class ExtensionManager {
    constructor() {
      this.extensions = [];
    }
  
    register(extension) {
      if (typeof extension.execute === 'function') {
        this.extensions.push(extension);
      } else {
        throw new Error('Extension must have an execute method');
      }
    }
  
    executeAll(context) {
      return Promise.all(this.extensions.map(ext => ext.execute(context)));
    }
  }
  
  module.exports = ExtensionManager;  