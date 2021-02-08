# Webpack plugin for Vue Storefront 1 theme inheritance
Navigate into your custom theme:

    cd src/themes/custom

Install this package:

    yarn add @yireo/vsf1-webpack-inheritance-plugin

Add a `webpack.config.js`:
```js
const Vsf1ThemeInheritancePlugin = require('@yireo/vsf1-webpack-inheritance-plugin');
const themeJson = require('./theme.json');

module.exports = function (config, {isClient}) {
  if (!config.resolve.plugins) config.resolve.plugins = [];
  config.resolve.plugins.push(new Vsf1ThemeInheritancePlugin({parent: themeJson.parent}));
  
  return config;
};
```
Or merge lines similar to the below to your existing Webpack configuration:
```js
const Vsf1ThemeInheritancePlugin = require('@yireo/vsf1-webpack-inheritance-plugin');
const themeJson = require('./theme.json');

if (!config.resolve.plugins) config.resolve.plugins = [];
config.resolve.plugins.push(new Vsf1ThemeInheritancePlugin({parent: themeJson.parent}));
```

Start overriding files. See https://github.com/yireo-training/vsf-yireo-theme for details.
