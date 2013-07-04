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