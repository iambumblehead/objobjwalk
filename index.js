
var objobjwalk = ((typeof module === 'object') ? module : {}).exports = (function () {

  // Douglas Crockford's
  function isArray (obj) {
    if (typeof obj === 'object' && obj) {
      if (!(obj.propertyIsEnumerable('length'))) {
        return (typeof obj.length === 'number');
      }
    }
    return false;
  };
  
  // recurse through array and object properties
  return function objObjWalk (obj, fn) {
    if (isArray(obj)) {
      obj.map(function (e) {
        e = objobjwalk(e, fn);
      });
    } else if (typeof obj === 'object' && obj) {
      for (var o in obj) {
        if (obj.hasOwnProperty(o)) {
          obj[o] = objObjWalk(obj[o], fn);
        }
      }
      obj = fn(obj);
    }
    return obj;
  };

}());