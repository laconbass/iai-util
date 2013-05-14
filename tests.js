/*

  ** SOME STUPID TESTS **

*/

process.env.NODE_ENV = 'test';

require('./');

console.assert( !!global['iu'], 'expecting iu to be global' );

iu.load('assertor');

console.assert( typeof iu.assertor == 'function', 'expecting iu.assertor to be a function' );


iu.assertor( 'Assertor tester' )
  .expects( 'true to be true', true )
  .throws( 'an Assertor does not throw an error on a "throws" block', function(){
    iu.assertor( 'fake testing for throws' )
      .throws( 'this will not throw an error intentionally', function(){})
  })
  .throws( 'an Assertor throws an error on a "runs" block', function(){
    iu.assertor( 'fake testing for runs' )
      .runs( function(){ throw "Fake Error"; })
  })
  .runs( 'an empty function', function(){} )
  .runs( 'an async run which executes done after 2 seconds', function(done){
    iu.assertor('done callback')
      .expects( 'itself to be a function', typeof done === 'function' )
    setTimeout(done, 2000);
  })
  .runs( 'a function with arity=1', function(done){
    done();
  })
;


iu.assertor( 'Style tester' )
  .runs( 'iu.load "ANSI styler"', function(){ iu.load('ANSI styler') } )
  .expects( 'a bold ANSI string', iu.style( 'bold', '' ) === '\u001b[1m\u001b[22m' )
  .expects( 'a italic ANSI string', iu.style( 'italic', '' ) === '\u001b[3m\u001b[23m' )
  .expects( 'a underline ANSI string',
            iu.style( 'underline', '' ) === '\u001b[4m\u001b[24m' )
  .expects( 'a inverse ANSI string', iu.style( 'inverse', '' ) === '\u001b[7m\u001b[27m' )
  .expects( 'a white ANSI string', iu.style( 'white', '' ) === '\u001b[37m\u001b[39m' )
  .expects( 'a grey ANSI string', iu.style( 'grey', '' ) === '\u001b[90m\u001b[39m' )
  .expects( 'a black ANSI string', iu.style( 'black', '' ) === '\u001b[30m\u001b[39m' )
  .expects( 'a blue ANSI string', iu.style( 'blue', '' ) === '\u001b[34m\u001b[39m' )
  .expects( 'a cyan ANSI string', iu.style( 'cyan', '' ) === '\u001b[36m\u001b[39m' )
  .expects( 'a green ANSI string', iu.style( 'green', '' ) === '\u001b[32m\u001b[39m' )
  .expects( 'a magenta ANSI string', iu.style( 'magenta', '' ) === '\u001b[35m\u001b[39m' )
  .expects( 'a red ANSI string', iu.style( 'red', '' ) === '\u001b[31m\u001b[39m' )
  .expects( 'a yellow ANSI string', iu.style( 'yellow', '' ) === '\u001b[33m\u001b[39m' )
  .expects( 'a cleaned string',
            iu.style.clean( iu.style( ['cyan', 'bold', 'italic'], '' ) ) === '' )

;


iu.assertor( 'type checks tester' )
  .runs( 'iu.load "type checks"', function(){ iu.load( 'type checks' ) } )
;

var isNumber = iu.isNumber;
iu.assertor( 'isNumber')
  // Integer Literals
  .expects( "a Negative integer string", isNumber("-10") )
  .expects( "Zero string", isNumber("0") )
  .expects( "Positive integer string", isNumber("5") )
  .expects( "Negative integer number", isNumber(-16) )
  .expects( "Zero integer number", isNumber(0) )
  .expects( "Positive integer number", isNumber(32) )
  .expects( "Octal integer literal string", isNumber("040") )
  .expects( "Octal integer literal", isNumber(0144) )
  .expects( "Hexadecimal integer literal string", isNumber("0xFF") )
  .expects( "Hexadecimal integer literal", isNumber(0xFFF) )

  // Floating-Point Literals
  .expects( "Negative floating point string", isNumber("-1.6") )
  .expects( "Positive floating point string", isNumber("4.536") )
  .expects( "Negative floating point string with comma", isNumber("-4,536") )
  .expects( "Positive floating point string with comma", isNumber("4,536") )
  .expects( "Negative floating point number", isNumber(-2.6) )
  .expects( "Positive floating point number", isNumber(3.1415) )
  .expects( "Exponential notation", isNumber(8e5) )
  .expects( "Exponential notation string", isNumber("123e-2") )

  // Non-numeric values
  .expects( "Empty string", ! isNumber("") )
  .expects( "Whitespace characters string", ! isNumber("        ") )
  .expects( "Tab characters string", ! isNumber("\t\t") )
  .expects( "Alphanumeric character string", ! isNumber("abcdefghijklm1234567890") )
  .expects( "Non-numeric character string", ! isNumber("xabcdefx") )
  .expects( "Boolean true literal", ! isNumber(true) )
  .expects( "Boolean false literal", ! isNumber(false) )
  .expects( "Number with preceding non-numeric characters", ! isNumber("bcfed5.2") )
  .expects( "Number with trailling non-numeric characters", ! isNumber("7.2acdgs") )
  .expects( "Undefined value", ! isNumber(undefined) )
  .expects( "Null value", ! isNumber(null) )
  .expects( "NaN value", ! isNumber(NaN) )
  .expects( "Infinity primitive", ! isNumber(Infinity) )
  .expects( "Positive Infinity", ! isNumber(Number.POSITIVE_INFINITY) )
  .expects( "Negative Infinity", ! isNumber(Number.NEGATIVE_INFINITY) )
  .expects( "Date object", ! isNumber(new Date(2009,1,1)) )
  .expects( "Empty object", ! isNumber(new Object()) )
  .expects( "Instance of a function", ! isNumber(function(){}) )
;

iu.assertor( 'hash utils' )
  .runs( 'iu.load "hash utils"', function(){ iu.load( 'hash utils' ) } )
  .expects( 'extend to be a function', iu.isFn( iu.extend ) )
  // TODO extend tests
  .expects( 'locals to be a function', iu.isFn( iu.locals ) )
  .expects( 'locals to return a function', iu.isFn( iu.locals() ) )
;


iu.assertor( 'Async utils tester' )
  .runs( 'iu.load "async utils"', function(){ iu.load('async utils') } )
  .runs( 'sequence on [1, 2, 3]', function(done){
    iu.sequence([1, 2, 3], function(key, val, next){
      console.assert(parseInt(key)+1 == val);
      next();
    }, done);
  } )
;
