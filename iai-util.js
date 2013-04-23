var util = require('util');
var iu = module.exports = {
  // environment execution mode
  env_mode: process.env.NODE_ENV || 'unknown'
  /*
    ****************************
    ARRAY UTILITIES
    ****************************
  */
  ,slice: function(array, begin, end) {
    return Array.prototype.slice.call(array, begin, end);
  }
  // very very simple merge function for tipical situations (option key:value maps)
  ,merge_opts: function(defaults, opts) {
    for(var key in opts) { defaults[key] = opts[key]; }
    return defaults;
  }
  // recursive extend main object (arg1) with given objects (arg2, 3,...)
  ,extend: function(main) {
    for( var obj in Array.prototype.slice.call(arguments, 1) ) {
      for (var key in obj) {
        main[key] = (
          typeof obj[key] === 'object'
          || util.isArray(obj[key])
          )? iu.extend(main[key] || {}, obj[key]) : obj[key]
        ;
      }
    }
    return main;
  }
  // check wheter a given value is a function
  ,isFunction: function(value) { return typeof value === 'function'; }
  
  // augments class1 prototype with each class given (arg 2 and following)
/*  ,mixin_classes: function(class1, class2) {
    console.log('begin', arguments.length);
    var class1 = clone( arguments.shift(0) );
    console.log('middle', arguments.length);
    for(klass in arguments) {
      console.log(klass);
      console.dir(arguments[klass]);
    }
    for(methodName in givingClass.prototype) {
      if(!receivingClass.prototype[methodName]) {
        receivingClass.prototype[methodName] = givingClass.prototype[methodName];
}
}
  }//*/
  // returns a new Error instance with status and headers properties
  ,httpError: function(code, message, headers) {
    var err = new Error(message);
    err.status = err.httpStatus = code;
    err.headers = headers || {};
    return err;
  }
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
  ,sequence: function(context, iterable, step, complete) {
    if( !iu.isFn(step) || !iu.isFn(complete) )
      throw new Error("must provide step and complete callback as functions");
    var sequence = [], count = 0, context = context || {};
    // push steps on sequence
    for (var key in iterable)
      sequence.push((function(step_n, key) {
        return function(){
          step.call(context, key, iterable[key], sequence[step_n+1]);
        }
      })(count++, key));
    // push complete on sequence and start it
    sequence.push(function(){ complete.call(context); });
    sequence[0]();
  }
};
iu.isFn = iu.isFunction;
