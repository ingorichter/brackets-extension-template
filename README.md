brackets-extension-template
===========================

Boilerplate for Brackets extensions that includes the following features:

* Basic [Grunt](http://gruntjs.com) tasks for running [JSHint](http://jshint.com)
and a build task to concat, copy and compress files into a zip suitable to upload
to the [Brackets Extension Registry](https://brackets-registry.aboutweb.com).
* Boilerplate [NodeJS](http://nodejs.org) setup
* Boilerplate CSS setup
* Optional `requirejs-config.json` to configure the [RequireJS](http://requirejs.org)
context for the extension before loading

# Build
The default `grunt build` task runs jshint, concatenates and minifies
JavaScript files using the [RequireJS Optimizer](http://requirejs.org/docs/optimization.html),
and copies additional files into the zip file for distribution. The default
build includes the following files:

* Required `package.json` to describe the extension
* Required `main.js` concatenated JavaScript
* Optional `node/**` when using NodeJS
* Optional `styles/**` when using CSS

A build step is typically unnecessary during development unless your extension
requires a preprocessor/compile step (e.g. CoffeeScript, SASS, etc.).

# RequireJS Configuration
Most extensions do not require additional configuration to RequireJS. However,
if your extension requires [configuration options](http://requirejs.org/docs/api.html#config),
modify `requirejs-config.json` and optionally the `requirejs` task in
`Gruntfile.js`.

Please note that `text` and `i18n` modules are already included by Brackets and
do not need additional configuration.

# NodeJS
For deeper, low-level integration with the host operating systems, some
extensions may require NodeJS. See the [overview](https://github.com/adobe/brackets/wiki/Brackets-Node-Process:-Overview-for-Developers)
for more details. Keep in mind that the `node_modules` folder will be included
in the final build because Brackets does not use `npm` to install dependencies.