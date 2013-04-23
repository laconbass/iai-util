/*
  https://github.com/joyent/node/blob/master/lib/util.js#L143
  http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
*/
var ANSI = {
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
// wrap text with system console ANSI color characters
module.exports.style = function(text, style) {
  if(typeof style === 'string' && ANSI[style])
    return '\u001b[' + _.style.ANSI[style][0] + 'm' + text +
           '\u001b[' + _.style.ANSI[style][1] + 'm';
  else
    return text
};
