var slice = Array.prototype.slice
  , hash = module.exports = {}
;

iu.load( 'type checks' );

/**
 * extend: Extend o with given objects
 *
 */
hash.extend = function(o){
  slice.call( arguments, 1 ).forEach(function(obj){
    for( var p in obj ){
      if( iu.isLiteral( o[p] )
          && iu.isLiteral( obj[p] )
      ){
        o[p] = iu.extend( o[p], o );
      }
      else {
        o[p] = obj[p];
      }
    }
  });
  return o;
};

/**
 * locals function, taken from:
 * https://github.com/visionmedia/express/blob/master/lib/utils.js#L27
 *
 **
 * Make `locals()` bound to the given `obj`.
 *
 * This is used for `app.locals` and `res.locals`.
 *
 * @param {Object} obj
 * @return {Function}
 * @api private
 */

hash.locals = function(obj){
  function locals(obj){
    for (var key in obj) locals[key] = obj[key];
    return obj;
  };

  return locals;
};
