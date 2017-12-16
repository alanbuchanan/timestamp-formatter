const validFormats = [
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

const months = [
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

  const formatMatchesValidFormats = validFormats.indexOf(format) !== -1;

  if (!formatMatchesValidFormats) {
    return 'Oops! That format is not valid. Please ensure your format is one of ' + validFormats.toString();
  }

  const prependZero = num => num < 10 ? `0${num}` : num;

  const date = new Date(timestamp * 1000);

  const d = date.getDate();
  const dd = prependZero(date.getDate());
  const m = date.getMonth() + 1;
  const mm = prependZero(date.getMonth() + 1);
  const mmmm = months[date.getMonth()];
  const mmm = mmmm.substr(0, 3);
  const yy = date.getFullYear().toString().substr(-2);
  const yyyy = date.getFullYear();

  const dict = {
    d,
    dd,
    m,
    mm,
    mmm,
    mmmm,
    yy,
    yyyy
  };

  const newDates = [];
  const delimiter = format.indexOf('/') !== -1 ? '/' : '-';
  const dateSplit = format.split(delimiter);

  dateSplit.forEach(item => newDates.push(dict[item]));

  return newDates.join(delimiter);
}

module.exports = timestampFormatter;