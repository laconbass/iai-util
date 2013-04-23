/*

  ** SOME STUPID TESTS **

*/

var iu = require('./index')
  .load('type checks')
  .load('assertor')
  .load('array utils')
  .load('ANSI styles')
  .register('isCacadevaca', function(o){ return o.isCaca(); })
;
console.log(iu);
