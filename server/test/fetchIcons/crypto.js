const fetch = require('node-fetch');

module.exports = function(app) {
  it('Find ', (doneFull) => {
    app.models.cryptoPairs.find().exec((e,pairs)=>{
    fetch('https://s2.coinmarketcap.com/generated/search/quick_search.json')
      .then(e=>e.json())
      .then(e=>{
        let arr={}
        for(let i in e)
          arr[e[i].symbol]=e[i].id
        for(let i in pairs)
          console.log(pairs[i].from,arr[pairs[i].from])
      })
    })
  })
}
