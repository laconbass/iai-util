/*
  Dependences and index of utility modules.
*/
var f = require('util').format
  , loaded = []
  , index = {
    'type checks': './lib/typecheck',
    'array utils': './lib/array',
    'assertor': './lib/assertor',
    'ANSI styles': './lib/style'
  }
;
/*
  API
*/
module.exports = {
  // extends iai-utils with desired funcionalities
  load: function(name) {
    // skip loading if mod is loaded
    if( loaded.indexOf(name) > -1 ) {
       return this;
    }
    // check mod exists
    if( !index.hasOwnProperty(name) ) 
      throw f('iai-util module "%s" not found on index', name);
    // require & store new utils
    var fname, mod = require( index[name] );
    for( var fname in mod ) {
      this[fname] = mod[fname];
    }
    loaded.push(name);
    return this;
  },
  // register a new function on iai-utils
  register: function(name, fn) {
    if(typeof name !== 'string') {
      throw 'iai-util.register expects param 1 to be string';
    }
    if(typeof fn !== 'function') {
      throw 'iai-util.register expects param 2 to be function';
    }
    if( this.hasOwnProperty(name) ) {
      throw f('iai-util has "%s" already defined', name);
    }
    this[name] = fn;
    return this;
  }
};
