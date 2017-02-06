System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: "typescript",
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },

  map: {
    "angular2-polyfill": "npm:angular2-polyfill@0.0.26",
    "typescript": "npm:typescript@1.8.10",
    "github:jspm/nodelibs-os@0.1.0": {
      "os-browserify": "npm:os-browserify@0.1.2"
    },
    "npm:angular2-polyfill@0.0.26": {
      "camelcase": "npm:camelcase@2.1.1",
      "decamelize": "npm:decamelize@1.2.0",
      "dot-prop": "npm:dot-prop@2.4.0"
    },
    "npm:dot-prop@2.4.0": {
      "is-obj": "npm:is-obj@1.0.1"
    },
    "npm:os-browserify@0.1.2": {
      "os": "github:jspm/nodelibs-os@0.1.0"
    },
    "npm:typescript@1.8.10": {
      "os": "github:jspm/nodelibs-os@0.1.0"
    }
  }
});
