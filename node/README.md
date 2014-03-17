Node modules must be included in a build of an extension. Brackets does not use
`npm` to find nor install node dependencies at runtime. The Gruntfile `build`
task included in this template simply includes all files under the `/node`
directory.