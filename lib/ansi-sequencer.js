var f = require( 'util' ).format
  , slice = Array.prototype.slice
;

module.exports.ansi = function( key ) {
  if( !sequences[ key ] ) {
    throw ValueError( "'%s' isn't an ANSI sequence description", key );
  }
  key = sequences[ key ];
  if ( arguments.length > 1 ) {
    key = f.apply( [ key ].concat( slice.call( arguments, 1 ) ) );
  }
  return Esc + key; 
};

/**
 * http://ascii-table.com/ansi-escape-sequences-vt-100.php
 */

var Esc = '\u001B';

var sequences = {
  // Screen clearing
  "clear entire screen": "[2J",
  "clear screen from cursor up": "[1J",
  "clear screen from cursor down": "[0J",
  // Line clearing
  "clear entire line": "[2K",
  "clear line from cursor left": "[1K",
  "clear line from cursor right": "[0K",
  // Character attributes
  "normal": "[0m",
  "bold": "[1m",
  "low intensity": "[2m",
  "italic": "[3m",
  "underline": "[4m",
  "blink": "[5m",
  "inverse": "[7m",
  "invisible": "[8m",
  
  "black": "[30m",
  "red": "[31m",
  "green": "[32m",
  "yellow": "[33m",
  "blue": "[34m",
  "magenta": "[35m",
  "cyan": "[36m",
  "white": "[37m",
  "grey": "[90m",
  // cursor positioning
  "cursor home": "[H",
  "cursor up": "[%dA",
  "cursor down": "[%dB", 
  "cursor right": "[%dC", 
  "cursor left": "[%dD"
};
