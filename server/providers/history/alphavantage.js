const alpha = require('alphavantage')({key: 'CFF0ODFSHY2F1IB4'});
module.exports.daily = function(name) {
  return alpha.data.daily(name).then(function(e) {
    return format(e)
  })
}
module.exports.search = function(name) {
  return alpha.data.daily(name).then(function(e) {
    return {}
  })
}
function format(arr) {
  let key=Object.keys(arr)[1]
  arr=arr[key];
  history=[];
  for(let date in arr){
    keys=Object.keys(arr[date])
    history.push({
      time:   new Date(date),
      open:   parseFloat(arr[date][keys[0]]),
      high:   parseFloat(arr[date][keys[1]]),
      low:    parseFloat(arr[date][keys[2]]),
      close:  parseFloat(arr[date][keys[3]]),
      volume: parseFloat(arr[date][keys[4]]),
    });
  }
  return history

}
