var style = require('./style');

// returns console.assert wrapper which decorate AssertionError messages
module.exports = function assertor(name) {
  return function assert(msg, expression){
    console.assert( expression, style([name, 'expects', msg].join(' '), 'red') );
  };
};
