(function (root) {
    var exports = undefined,
        module = undefined,
        require = undefined;
    var define = undefined;
    var self = root,
        window = root,
        global = root,
        globalThis = root;
    (function () {
      if (cc.sys.isMobile && !window.rootDevicePixelRatio) {
        window.rootDevicePixelRatio = window.devicePixelRatio;
        window.rootWindowSize = cc.screen.windowSize.clone();
      }
    }).call(root);
  })( // The environment-specific global.
  function () {
    if (typeof globalThis !== 'undefined') return globalThis;
    if (typeof self !== 'undefined') return self;
    if (typeof window !== 'undefined') return window;
    if (typeof global !== 'undefined') return global;
    if (typeof this !== 'undefined') return this;
    return {};
  }.call(this));