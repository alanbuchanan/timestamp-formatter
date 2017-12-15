function timestampFormatter(timestamp) {
  var today = new Date(timestamp * 1000);
  var prependZero = num => num < 10 ? `0${num}` : num
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();

  return `${prependZero(dd)}/${prependZero(mm)}/${yyyy}`;
}

module.exports = timestampFormatter;