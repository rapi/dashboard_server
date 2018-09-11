const fetch = require('node-fetch');

module.exports.daily = function(name) {
  return fetch('https://api.iextrading.com/1.0/stock/'+name+'/chart/6m')
            .then(e=>e.json())
            .then(e=>format(e))
            // .then(e=>console.log(e))
}
module.exports.search = function(name) {
    return fetch('hhttps://api.iextrading.com/1.0/stock/'+name+'/chart/6m')
              .then(e=>e.json())
}
let format= (arr)=> arr.reduce((ret,current)=>ret.concat({
        time:   new Date(current.date),
        open:   parseFloat(current.open),
        high:   parseFloat(current.high),
        low:   parseFloat(current.low),
        close:   parseFloat(current.close),
        volume:   parseFloat(current.volume),
      }
),[])
