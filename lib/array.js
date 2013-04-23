var iu = module.exports = {};

// alias of Array.prototype.slice.call
iu.slice = function(array, begin, end){
  return Array.prototype.slice.call(array, begin, end);
};

// alias of iu.slice(o, 0)
iu.toArray = function(o) {
  return iu.slice(o, 0); 
};

// tells if value is within array
iu.within = function(array, value){
  return array.indexOf(value) > -1;
};
