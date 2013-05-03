var iu = require('..')
  .load( 'type checks' )
;
module.exports = {
  /*
     Callback sequence helper.
     @iterable (object or array): Any iterable object (for..in)
     @step (function): executed for each item in sequence
       @key (mixed): key in iterable for the current step
       @val (mixed): value in iterable for the current step
       @next (function): calls the next step in the sequence
     @complete (function): The last step in the sequence
     @context (object): Optional. Step's and complete's context
  */
  sequence: function(iterable, step, complete, context) {
    if( !iu.isFn(step) || !iu.isFn(complete) )
      throw new Error("must provide step and complete callback as functions");
    var sequence = [], count = 0, context = context || {};
    // push steps on sequence
    for( var key in iterable ) {
      sequence.push( (function(step_n, key) {
        return function(){
          step.call( context, key, iterable[key], sequence[step_n+1] );
        }
      })( count++, key ) );
    }
    // push complete on sequence and start it
    sequence.push(function(){ complete.call( context ); });
    sequence[0]();
  }
}
