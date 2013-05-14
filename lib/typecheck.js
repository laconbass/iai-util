var util = require('util')
;
module.exports = {
  // tells whatever given object is a function
  isFunction: function(o){
    return typeof o === 'function';
  },
  // tells whatever given object is a string
  isString: function(o){
    return typeof o == 'string';
  },
  // tells whatever given object is a 'Plain' Object
  isLiteral: function(o){
    return o && typeof o == 'object' && o.constructor == Object;
  },
  // tells whatever given object is a number
  // sighly modified from an answer found on http://stackoverflow.com/a/1830844/1894803
  isNumber: function(o){
    o = (new String(o)).replace( /,/g, '.' );
    return !isNaN( parseFloat(o) ) && isFinite( o );
  },
  /**
   * isChildOf: Asserts o's constructor is parent
   */
  isChildOf: function(o, constructor) {
    return o && o.constructor === constructor;
  },
  /**
   * isComponent: Asserts o has iaiComponent
   * on its prototype chain
   */
  isComponent: function( o ) {
    return o && iu.component.Component.isPrototypeOf( o );
  },

  // aliases for isArray, isDate, isRegExp
  isArray: util.isArray,
  isDate: util.isDate,
  isRegExp: util.isRegExp
};

//
// Short Aliases
module.exports.isFn = module.exports.isFunction;
module.exports.isRe = module.exports.isRegExp;
