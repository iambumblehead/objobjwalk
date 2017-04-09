// Filename: index.js  
// Timestamp: 2017.04.09-00:45:01 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>  

//setImmediate === 'object'
//        ? setImmediate
//        : setTimeout;

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
  objobjwalk.async = (obj, filterfn, fn) => {
    var x, keys;

    if (Array.isArray(obj)) {
      (function next (x) {
        if (!x--) return fn(null, obj);
        objobjwalk.async(obj[x], filterfn, (err, res) => {
          if (err) return fn(err, obj[x]);          
          obj[x] = res;
          setImmediate(() => next(x));
        });
      }(obj.length));
    } else if (typeof obj === 'object' && obj) {
      keys = Object.keys(obj);
      (function next (x) {
        if (!x--) return filterfn(obj, fn);
        
        objobjwalk.async(obj[keys[x]], filterfn, (err, res) => {
          if (err) return fn(err, obj[keys[x]]);          
          obj[keys[x]] = res;
          setImmediate(() => next(x));
        });
      }(keys.length));
    } else {
      filterfn(obj, (err, res) => {
        fn(null, res);
      });
    }
  };

  return objobjwalk;

})();
