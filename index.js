// Filename: index.js  
// Timestamp: 2016.11.16-15:57:02 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>  

const objobjwalk = module.exports = (objobjwalk => {
  
  // recurse through array and object properties
  // objobjwalk.async(obj, function () { ... });
  objobjwalk = function (obj, filterfn) {    
    if (Array.isArray(obj)) {
      obj = obj.map(elem => (
        objobjwalk(elem, filterfn)
      ));
    } else if (typeof obj === 'object' && obj) {
      obj = Object.keys(obj).reduce((obj, o) => (
        obj[o] = objobjwalk(obj[o], filterfn),
        obj
      ), obj);
      obj = filterfn(obj);
    } else {
      obj = filterfn(obj);
    }
    
    return obj;
  };

  objobjwalk.type = (type, obj, filterfn) => (
    objobjwalk(obj, ob => {
      if (typeof ob === type) {
        ob = filterfn(ob);
      }
      if (typeof ob === 'object' && ob) {
        ob = Object.keys(ob).reduce((ob, o) => {
          if (typeof ob[o] === type) {
            ob[o] = filterfn(ob[o]);          
          }
          return ob;
        },ob);
      }

      return ob;
    }));

  // objobjwalk.async(
  //   obj, 
  //   function (exitFn) { ... }, 
  //   function () { ... }
  // );
  objobjwalk.async = function (obj, filterfn, fn) {
    var x, keys;

    if (Array.isArray(obj)) {
      (function next (x) {
        if (!x--) return fn(null, obj);
        objobjwalk.async(obj[x], filterfn, function (err, res) {
          if (err) return fn(err, obj[x]);          
          obj[x] = res;
          setTimeout(() => next(x));
        });
      }(obj.length));
    } else if (typeof obj === 'object' && obj) {
      keys = Object.keys(obj);
      (function next (x) {
        if (!x--) return filterfn(obj, fn);
        objobjwalk.async(obj[keys[x]], filterfn, function (err, res) {
          if (err) return fn(err, obj[keys[x]]);          
          obj[keys[x]] = res;
          setTimeout(() => next(x));
        });
      }(keys.length));
    } else {
      fn(null, obj);
    }
  };

  return objobjwalk;

})();
