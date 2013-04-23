module.exports = {
  isFunction: function(o){
    return typeof o === 'function';
  },
  // tells whatever given object is a 'String'
  isString: function(o){
    return typeof o == 'string';
  },
  // tells whatever given object is a 'Plain' Object
  isLiteral: function(o){
    return o && typeof o == 'object' && o.constructor == Object;
  }
};
