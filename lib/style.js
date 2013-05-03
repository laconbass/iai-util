/*
  https://github.com/joyent/node/blob/master/lib/util.js#L143
  http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
*/
var f = require('util').format
  , isArray = require('./typecheck').isArray
  , ANSI = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};
// wraps text with system console ANSI color characters according to styles
// optionally format text as format string with value...valueN
module.exports.style = function(styles, text /*[, value, valueN */) {
  if( arguments.length > 2 ) {
    text = f.apply({}, Array.prototype.slice.call(arguments, 1) );
  }
  if( !isArray( styles ) ) {
    styles = [styles];
  }
  styles.forEach(function(style){
    if(typeof style === 'string' && ANSI[style]) {
      text = '\u001b[' + ANSI[style][0] + 'm'
             + text +
             '\u001b[' + ANSI[style][1] + 'm';
    }
  });
  return text;
};
// removes any system console ANSI color character from text
module.exports.style.clean = function(text) {
  return text.replace(/\u001b\[\d{1,2}m/g, '');
};
