var a = module.exports = {};

// alias of Array.prototype.slice.call
a.slice = function(array, begin, end){
  return Array.prototype.slice.call(array, begin, end);
};

// alias of iu.slice(o, 0)
a.toArray = function(o) {
  return a.slice(o, 0); 
};

// tells if value is within array
a.within = function(array, value){
  return array.indexOf(value) > -1;
};
