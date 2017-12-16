var assert = require('chai').assert;
var timestampFormatter = require('../src/timestamp-formatter');

describe('timestamp-formatter', function() {
  it('should return dd/mm/yyyy format by default', function() {
    assert.equal(timestampFormatter('1513378246'), '15/12/2017');
    assert.equal(timestampFormatter('0'), '01/01/1970');
    assert.equal(timestampFormatter('253402300800'), '01/01/10000');
  });

  it('should be able to take a number as a timestamp', function() {
    assert.equal(timestampFormatter(1513378246), '15/12/2017');
    assert.equal(timestampFormatter(-788918400), '01/01/1945');
    assert.equal(timestampFormatter(123456789), '29/11/1973');
  });

  it('should return an error message if the timestamp is invalid', function() {
    assert.include(timestampFormatter(null), 'not valid');
    assert.include(timestampFormatter(undefined), 'not valid');
    assert.include(timestampFormatter('bert'), 'not valid');
    assert.include(timestampFormatter('000p'), 'not valid');
    assert.include(timestampFormatter('*£$%'), 'not valid');
    assert.include(timestampFormatter('e'), 'not valid');
  });

  it('should return an error message if the format is invalid', function() {
    assert.include(timestampFormatter(0, undefined), 'not valid');
  });

  it('should work for forward-slash-delimited formats', function() {
    assert.equal(timestampFormatter(123456789, 'dd/mm/yy'), '29/11/73');
    assert.equal(timestampFormatter('253402300800', 'dd/mm/yy'), '01/01/00');
  });

  it('should work for hyphen-delimited formats', function() {
    assert.equal(timestampFormatter(123456789, 'dd-mm-yy'), '29-11-73');
    assert.equal(timestampFormatter('253402300800', 'dd-mm-yy'), '01-01-00');
  });

  it('should work when the format is in different orders', function() {
    assert.equal(timestampFormatter('0', 'yy/mm/dd'), '70/01/01');
    assert.equal(timestampFormatter('0', 'yyyy/mm/dd'), '1970/01/01');
    assert.equal(timestampFormatter(-788918400, 'dd-mmm-yy'), '01-Jan-45');
    assert.equal(timestampFormatter(-788918400, 'dd-mmm-yyyy'), '01-Jan-1945');
    assert.equal(timestampFormatter('390294397', 'dd-mmm-yyyy'), '15-May-1982');
    assert.equal(timestampFormatter('390294397', 'd-mmmm-yyyy'), '15-May-1982');
  });

  it('should work for d and m with no leading 0', function() {
    assert.equal(timestampFormatter('253402300800', 'd/m/yy'), '1/1/00');
    assert.equal(timestampFormatter('0', 'd/m/yy'), '1/1/70');
    assert.equal(timestampFormatter(1513417634, 'd-mmmm-yy'), '16-December-17');
    assert.equal(timestampFormatter(1513417634, 'd/m/yy'), '16/12/17');
  });

  it('should return the year if only one of those is passed', function() {
    assert.equal(timestampFormatter(1513417634, 'yy'), '17');
    assert.equal(timestampFormatter(1513417634, 'yyyy'), '2017');
  });

  it('should be able to trim trimmable inputs', function() {
    assert.equal(
      timestampFormatter(' 390294397', 'd-mmmm-yyyy'),
      '15-May-1982',
    );
  });

  it('should deal with mmm-yy', function() {
    assert.equal(timestampFormatter('1513378246', 'mmm-yy'), 'Dec-17');
  });
});
