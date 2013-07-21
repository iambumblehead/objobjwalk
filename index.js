
var objobjwalk = ((typeof module === 'object') ? module : {}).exports = (function (objobjwalk) {

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
  // objobjwalk.async(obj, function () { ... });
  objobjwalk = function (obj, filterFn) {
    if (isArray(obj)) {
      obj.map(function (e) {
        e = objobjwalk(e, filterFn);
      });
    } else if (typeof obj === 'object' && obj) {
      for (var o in obj) {
        if (obj.hasOwnProperty(o)) {
          obj[o] = objobjwalk(obj[o], filterFn);
        }
      }
      obj = filterFn(obj);
    }
    return obj;
  };

  objobjwalk.type = function (type, obj, filterFn) {
    return objobjwalk(obj, function (ob) {
      for (var o in ob) {
        if (ob.hasOwnProperty(o) && typeof ob[o] === type) {
          ob[o] = filterFn(ob[o]);
        }
      }
      return ob;
    });
  };

  // objobjwalk.async(
  //   obj, 
  //   function (exitFn) { ... }, 
  //   function () { ... }
  // );
  objobjwalk.async = function (obj, filterFn, fn) {
    var x, keys;

    if (isArray(obj)) {
      (function next (x) {
        if (!x--) return fn(null, obj);
        objobjwalk.async(obj[x], filterFn, function (err, res) {
          if (err) return fn(err, obj[x]);          
          obj[x] = res;
          setTimeout(function () { next(x); });
        });
      }(obj.length));
    } else if (typeof obj === 'object' && obj) {
      keys = Object.keys(obj);
      (function next (x) {
        if (!x--) return filterFn(obj, fn);
        objobjwalk.async(obj[keys[x]], filterFn, function (err, res) {
          if (err) return fn(err, obj[keys[x]]);          
          obj[keys[x]] = res;
          setTimeout(function () { next(x); });
        });
      }(keys.length));
    } else {
      fn(null, obj);
    }
  };

  return objobjwalk;

}());