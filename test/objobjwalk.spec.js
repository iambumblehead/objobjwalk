var objobjwalk = require('../index.js');

describe("objobjwalk", function () {
  var result, resultExpected;

  it("should find deeply nested object properties", function () {

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
    }, function (obj) {
      if (obj.type === 'deep object') {
        obj.value = '0';
      }
      return obj;
    });

    expect(newObj.a.b[0].c.d[0].value).toBe('0');
    expect(newObj.a.b[0].c.e[0].value).toBe('0');
  });

});

describe("objobjwalk.async", function () {
  var result, resultExpected;

  it("should find deeply nested object properties", function (done) {

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
    }, function (obj, exitFn) {
      if (obj.type === 'deep object') {
        obj.value = '0';
      }
      exitFn(null, obj);
    }, function (err, newObj) {
      expect(newObj.a.b[0].c.d[0].value).toBe('0');
      expect(newObj.a.b[0].c.e[0].value).toBe('0');
      done();
    });

  });


  it("should redefine a full object", function (done) {
    objobjwalk.async({
      type: "single",
      inputsArr: [{
        type: "local-ref",
        path: "./support/blog"
      }]
    }, function (obj, exitFn) {
      if (obj.type === 'local-ref') {
        obj = 'redefined';
      }
      exitFn(null, obj);
    }, function (err, newObj) {
      expect(newObj.inputsArr[0]).toBe('redefined');
      done();
    });
  });

});