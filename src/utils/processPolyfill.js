// This file provides a polyfill for the Node.js process object in the browser
if (typeof window !== 'undefined' && typeof window.process === 'undefined') {
  window.process = {
    env: {
      NODE_ENV: 'production'
    }
  };
}