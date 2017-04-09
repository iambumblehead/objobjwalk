// Filename: objobjwalk.spec.js  
// Timestamp: 2017.04.09-01:29:48 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

var objobjwalk = require('../');

describe("objobjwalk", () => {
  var result, resultExpected;

  it("should find deeply nested object properties", () => {

    var newObj = objobjwalk({
      a : {
        b : [{
          c : {
            d : [{
              type : 'deep object',
              value : '1'
            }],
            e : [{
              type : 'deep object',
              value : '1'
            }]
          }
        }]
      }
    }, obj => {
      if (obj.type === 'deep object') {
        obj.value = '0';
      }
      return obj;
    });

    expect(newObj.a.b[0].c.d[0].value).toBe('0');
    expect(newObj.a.b[0].c.e[0].value).toBe('0');
  });

});

describe("objobjwalk.async", () => {
  var result, resultExpected;

  it("should find deeply nested object properties", (done) => {

    objobjwalk.async({
      a : {
        b : [{
          c : {
            d : [{
              type : 'deep object',
              value : '1'
            }],
            e : [{
              type : 'deep object',
              value : '1'
            }]
          }
        }]
      }
    }, (obj, exitFn) => {
      if (obj.type === 'deep object') {
        obj.value = '0';
      }
      exitFn(null, obj);
    }, (err, newObj) => {
      expect(newObj.a.b[0].c.d[0].value).toBe('0');
      expect(newObj.a.b[0].c.e[0].value).toBe('0');
      done();
    });

  });


  it("should redefine a full object", (done) => {
    objobjwalk.async({
      type: "single",
      inputsArr: [{
        type: "local-ref",
        path: "./support/blog"
      }]
    }, (obj, exitFn) => {
      if (obj.type === 'local-ref') {
        obj = 'redefined';
      }
      exitFn(null, obj);
    }, (err, newObj) => {
      expect(newObj.inputsArr[0]).toBe('redefined');
      done();
    });
  });

});
