var style = require('./style').style
  , assert = require('assert')
  , noop = function(){}
  , util = require('util')
  , f = util.format
  , log = function(){
      if( process.env.NODE_ENV == 'test' ) {
        var msg = f.apply( {}, arguments );
        console.log( style( /checked/i.test(msg)? 'green':'cyan', msg ) );
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
      throw style( 'red', f.apply( {}, arguments ) );
    }
;

/*
  Assertor prototype
*/
var Assertor = {
  init: function(name){
    this.name = name || 'Udefined Assertor';
    this.queue = [];
    this.queue_stoped = true;
    return this;
  },
  expects: function(msg, expression){
    if( !!!expression ) {
      error( '%s expects %s.', this.name, msg );
    }
    log( '%s checked %s.', this.name, msg );
    return this;
  },
  throws: function(msg, block, error) {
    var exception;
    try {
      block();
    } catch (e) {
      exception = e;
    }
    if( !!exception ) {
      log( '%s checked that an error is thrown if %s is run: %s.',
            this.name, msg, exception);
    } else {
      error( '%s should throw an error if %s.', this.name, msg )
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
  }
};

// returns an assert wrapper which decorates AssertionError messages
module.exports.assertor = function(name) {
  return Object.create(Assertor).init( name );
};
