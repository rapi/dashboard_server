const fetch = require('node-fetch');

module.exports.daily = function(from,to) {
  return fetch('https://min-api.cryptocompare.com/data/histoday?fsym='+from+'&tsym='+to+'&limit=60&aggregate=3&e=CCCAGG')
            .then(e=>e.json())
            .then(e=>format(e))
}
module.exports.search = function(from,to) {
    return fetch('https://min-api.cryptocompare.com/data/histoday?fsym='+from+'&tsym='+to+'&limit=60&aggregate=3&e=CCCAGG')
              .then(e=>e.json())
}
let format= (arr)=> arr.Data.reduce((ret,current)=>ret.concat({
        time:   new Date(current.time*1000),
        open:   parseFloat(current.open),
        high:   parseFloat(current.high),
        low:   parseFloat(current.low),
        close:   parseFloat(current.close),
        volume:   parseFloat(current.volumeto),
      }
),[])
