const fetch = require('node-fetch');
var http = require('https');
var fs = require('fs');
var extra = require('fs-extra')

module.exports = function(app) {
  it('Crypto ', (doneFull) => {
    extra.ensureDir('images/crypto/')
    app.models.cryptoPairs.find().exec((e,pairs)=>{
    fetch('https://s2.coinmarketcap.com/generated/search/quick_search.json')
      .then(e=>e.json())
      .then(e=>{
        let arr={}
        for(let i in e)
          arr[e[i].symbol]=e[i].id
        for(let i in pairs){
          let file = fs.createWriteStream("images/crypto/"+pairs[i].from+".png");
          request = http.get("https://s2.coinmarketcap.com/static/img/coins/128x128/"+arr[pairs[i].from]+'.png', function(response) {
            console.log("[+]  "+pairs[i].from)
            response.pipe(file);
            pairs[i].logo=[pairs[i].from+".png"]
            pairs[i].save();
        });
        }
      })
    })
  })
}
