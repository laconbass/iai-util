# version 0.0.5
  - Now the module is a iai component.
    * The module depends on "iai-component 0.0.1"
    * The module exports a iaiComponent instance
    * Added iai component information on package.json
  - Now the assertor throws errors only with the portion of stacktrace need to debug it
  - Added a typecheck: "isChildOf"
  - Renamed "ANSI style" to "ANSI styler"
  - added "Assertor.each"
  - added the following sub-components:
    * "hash utils"
    * "tag format"

# version 0.0.4
  - Now the module main file is "lib/iu.js"
  - Added the following components:
    * "async utils": provides utilites to deal with common async tasks
  - Added the "IaiComponent" class, see the README file for more info
  - Now the "assertor" util...
    * returns a chainable API to allow cleaner code flow
    * added "Assertor.setName"
    * added "Assertor.expects"
    * added "Assertor.throws"
    * added "Assertor.runs"
  - Fixed a bug on "ANSI style" mod
  - Added the following typechecks short aliases for ease:
    * 'iu.isFn' => 'iu.isFunction'
  - Added the following typechecks as aliases for node core "util" module for ease:
    * 'isArray'
    * 'isDate'
    * 'isRegExp'
  - Modified the logic of the "style" function, now acepts "util.format" strings
  - Added "style.clean"
  - Added "isNumber"
  - Added lots of test cases, specially for "isNumber" function

# version 0.0.31
  - Fixed the assertor mod exports bug
  - Done the following TODO tasks:
    * Quitar "index" do module.exports, convertila en variable local do modulo

# version 0.0.3
  - now this module is not backwards compatible
  - now this module only exports the following functions:
    * load: loads extra funcionality for iai-util
    * register: register a new funcionality for iai-util
    * _see docs for details_
  - added the following mods, loadable through the load function described above
    * type checks
    * array utils
    * assertor
    * ANSI styles
    

# version 0.0.2
  - started the CHANGELOG
  - now the sequence function receives context as 1st parameter
  - all other functions must be revised and may change with non-backards compatibility
