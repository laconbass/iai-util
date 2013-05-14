var tags = module.exports = {}
;

iu.load( 'type checks' );

var TAG_RE = /%\[(\w*)\]([sd])/;

tags.format = function( str, data ) {
  if( !iu.isString( str ) || !iu.isLiteral( data ) ) {
    throw TypeError( "please call tags.format correctly" );
  }
  var match, value;
  while ( match = TAG_RE.exec( str ) ) {
    value = data[ match[ 1 ] ];
    if ( value === undefined ) {
      value = 'undefined';
    }
    if( match[ 2 ] == 'd' ) {
      value = Number( match[ 2 ] );
    }
    str = str.replace( match[0], value.toString() );
  }
  return str;
}
