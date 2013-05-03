/*
  Dependences and index of utility modules.
*/
var util = require('util')
  , f = util.format
  , path = require('path')
  , style = require('./style').style
;
/*
  Iai Component: A chainable API that helps building and managing modular components.
    More info on the README file
*/
function IaiComponent(id, index) {
  if(typeof id !== 'string') {
    throw style( 'red', 'IaiComponent constructor expects param 1 to be string' );
  }
  if( typeof index !== 'object' || index.constructor !== Object ) {
    throw style( 'red', 'IaiComponent constructor expects param 2 to be a hash' );
  }
  Object.defineProperties(this, {
    'index': { value: index },
    'name': { value: path.basename(id) },
    'id': { value: id }
  });
  this._loaded = [];
}
IaiComponent.prototype = {
  // extends the component with desired funcionalities
  load: function(name) {
    // skip loading if mod is already loaded
    if( this._loaded.indexOf( name ) > -1 ) {
       return this;
    }
    // check mod exists
    if( !this.index.hasOwnProperty(name) ) 
      throw style( 'red', '%s module "%s" not found on index', this.name, name );
    //log on test mode
    if( process.env.NODE_ENV == 'test' ) {
      console.log( style( 'gray', '<%s> module loading <%s> component', this.name, name ) );
    }
    // require & store new utils
    var fname, mod = require( path.join( this.id, this.index[name] ) );
    for( fname in mod ) {
      this[fname] = mod[fname];
    }
    this._loaded.push( name );
    return this;
  },
  // register a new function on the component
  register: function(name, fn) {
    if(typeof name !== 'string') {
      throw style( 'red', '%s.register expects param 1 to be string', this.name );
    }
    if(typeof fn !== 'function') {
      throw style( 'red', '%s.register expects param 2 to be function', this.name );
    }
    if( this.hasOwnProperty(name) ) {
      throw style( 'red', '%s has "%s" already defined', this.name, name );
    }
    this[name] = fn;
    return this;
  }
};

/*
  API and sub-component index
*/
module.exports = new IaiComponent(__dirname, {
  'type checks': './typecheck',
  'array utils': './array',
  'async utils': './sequence',
  'ANSI styles': './style',
  'assertor': './assertor'
});
/*
  Other exposures
*/
module.exports.IaiComponent = IaiComponent;
