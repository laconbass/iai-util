iu.load( 'ANSI styler' )
  .load( 'type checks' )
;

var util = require('util')
  , f = util.format
  , style = iu.style
  , log = function(){
      if( process.env.NODE_ENV == 'test' ) {
        var msg = f.apply( {}, arguments );
        console.log( iu.style( /checked/i.test(msg)? 'green':'cyan', msg ) );
      }
    }
  , error = function(){
      Array.prototype.slice.call(arguments, 0)
            .filter(function(elem){
              var is = util.isError(elem);
              if( is ) {
                console.error( elem.stack );
              }
              return is;
            })
      ;
      var e = new Error( iu.style( 'red', f.apply( {}, arguments ) ) );
      stack = e.stack.split('\n');
      stack.splice(1, 2);
      stack.splice(2);
      throw stack.join('\n');
    }
;

/*
  Assertor prototype
*/
var Assertor = {
  init: function( name ){
    this.name = name || 'Undefined Assertor';
    this.queue = [];
    this.queue_stoped = true;
    return this;
  },
  /**
   * Logs a success message if `expression` evaluates to true
   * Throws an error if `expression` evaluates to false
   */
  expects: function( msg, expression ){
    if( !!!expression ) {
      error( '%s expects %s.', this.name, msg );
    }
    log( '%s checked %s.', this.name, msg );
    return this;
  },
  /**
   *  Logs a success message if `block` throws an error
   *  instance of etype. Throws an error else case.
   *
   *  `etype` must have `Error` on its prototype chain,
   *  `Error` will be used else case.
   *    - context (this) set to the current validator
   *    - `value` of the case as the first argument
   *    - `key` of the case as the second argument
   */
  throws: function( etype, msg, block ) {
    // Check arguments
    if( !Error.prototype.isPrototypeOf( etype.prototype ) ) {
      if( iu.isString( etype ) && iu.isFn( msg ) ) {
        block = msg;
        msg = etype;
        etype = Error.prototype.isPrototypeOf( arguments[3] )?
          arguments[3] : Error;
      }
      else {
        throw TypeError( 'bad Assertor.throws() call' );
      }
    }
    // Test the block
    var exception;
    try {
      block();
    } catch (e) {
      exception = e;
    }
    // Interpret the result
    if( exception instanceof etype ) {
      log( '%s checked that an instance of %s is thrown if %s is run: %s.',
            this.name, etype.prototype.name, msg, exception
      );
    } else {
      error( '%s should throw an instance of %s if %s%s',
             this.name, etype.prototype.name, msg,
             !exception ? '.'
               : f( ' but got an instance of %s instead: %s.', exception.name, exception.message )
      );
    }
    return this;
  },
  runs: function(msg, block) {
    // assert executor
    function exec( fn, msg ) {
      try {
        fn();
        log( '%s checked that %s runs without errors.', this.name, msg );
      } catch(err) {
        // care with empty errors
        if( typeof err === 'string' && style.clean(err) === '' ) {
          err = new Error( 'empty error message' );
        }
        else if( !util.isError(err) ) {
          err = new Error( err );
        }
        console.log( style( 'yellow', err.stack ) );
        error( '%s should run %s without errors but got "%s"', this.name, msg, err.message );
      }
    }
    // push the block on the queue if block it declares exactly 1 argument ("done")
    if( block.length == 1 ) {
      this.queue.push( (function(){
        log.bind( {}, '%s is going to execute %s, %s item(s) left on queue'
                      , this.name, msg, this.queue.length )();
        exec.bind( this, block.bind( {}, (function(){
            if( this.queue.length ) {
              this.queue.shift()();
            } else {
              this.queue_stoped = true;
              log( '%s run queue completed.', this.name );
            }
          }).bind( this ) ), msg )();
      }).bind( this ) );
      log( '%s queued %s, %s item(s) total', 
           this.name, msg, this.queue.length );
      // run the firts item in the queue if it's alone and queue is stoped
      if( this.queue.length == 1 && this.queue_stoped ) {
        this.queue_stoped = false;
        this.queue.shift()();
      }
    // else exec inmediatelly
    } else {
      exec.call( this, block, msg );
    }
    return this;
  },
  /**
   *  Calls function for each value in `cases` with:
   *    - context (this) set to the current validator
   *    - `value` of the case as the first argument
   *    - `key` of the case as the second argument
   *    - `cases` the full cases object
   */
  each: function( cases, fn ) {
    for( var key in cases ){
      fn.call( this, cases[ key ], key, cases );
    }
    return this;
  }
};

// returns an assert wrapper which decorates AssertionError messages
module.exports.assertor = function(name) {
  return Object.create(Assertor).init( name );
};
