
var validFormats = [
  'dd/mm/yy',
  'dd/mm/yyyy',
  'd/m/yy',
  'd/m/yyyy',
  'dd-mmm-yy',
  'dd-mmm-yyyy',
  'd-mmm-yy',
  'd-mmm-yyyy',
  'd-mmmm-yy',
  'd-mmmm-yyyy',
  'dd-mm-yy',
  'yy/mm/dd',
  'yyyy/mm/dd',
  'mm/dd/yy',
  'mm/dd/yyyy',
  'mmm-dd-yy',
  'mmm-dd-yyyy',
  'yyyy-mm-dd',
  'mmm-yy',
  'yy',
  'yyyy'
];

var months = [
  "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];

function timestampFormatter(timestamp, format) {
  if (!timestamp || isNaN(Number(timestamp))) {
    return 'Oops! That timestamp is not valid. Please ensure you are passing in a valid UNIX timestamp as your `timestamp` argument.'
  }
  timestamp = timestamp.toString().trim();

  if (!format) {
    format = 'dd/mm/yyyy';
  }

  var formatMatchesValidFormats = validFormats.indexOf(format) !== -1;

  if (!formatMatchesValidFormats) {
    return 'Oops! That format is not valid. Please ensure your format is one of ' + validFormats.toString();
  }

  var formatIncludesDelimiter = ['-', '/'].some(delimiter => format.indexOf(delimiter) !== -1);

  var prependZero = num => num < 10 ? `0${num}` : num;

  var date = new Date(timestamp * 1000);

  var d = date.getDate();
  var dd = prependZero(date.getDate());
  var m = date.getMonth() + 1;
  var mm = prependZero(date.getMonth() + 1);
  var mmmm = months[date.getMonth()];
  var mmm = mmmm.substr(0, 3);
  var yy = date.getFullYear().toString().substr(-2);
  var yyyy = date.getFullYear();

  var dict = {
    d,
    dd,
    m,
    mm,
    mmm,
    mmmm,
    yy,
    yyyy
  };

  var newDates = [];
  var delimiter = format.indexOf('/') !== -1 ? '/' : '-';
  var dateSplit = format.split(delimiter);

  dateSplit.forEach(item => newDates.push(dict[item]));

  return newDates.join(delimiter);
}

module.exports = timestampFormatter;