function timestampFormatter(timestamp) {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();

  return `${dd}/${mm}/${yyyy}`;
}

module.exports = timestampFormatter;