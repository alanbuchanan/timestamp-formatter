var assert = require('assert');
var timestampFormatter = require('../src/timestamp-formatter');
describe('timestamp-formatter', function() {
  it('should return dd/mm/yyyy format by default', function() {
    assert.equal(timestampFormatter('1513378246'), '15/12/2017');
  });
  it.skip('should return an error message if either the timestamp or the format is invalid', function() {

  });
  it.skip('should work for forward-slash-delimited formats', function() {

  });
  it.skip('should work for hyphen-delimited formats', function() {
    
  });
  it.skip('should work when there is no delimiter', function() {

  });
  it.skip('should return the day, month, or year if only one of those is passed', function() {

  });
  it.skip('should work for a weekday format', function() {

  });
  it.skip('should be able to return the time', function() {

  });
  it.skip('should be able to return the time as part of the date', function() {

  });
});