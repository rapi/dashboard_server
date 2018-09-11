const fetch = require('node-fetch');
var http = require('https');
var fs = require('fs');
var extra = require('fs-extra')

module.exports = function(app) {
  it('Stock ', (done) => {
    app.models.stock.find().exec((e,elements)=>{
      for(let i in elements){

      elements[i].enabled=true
      elements[i].save()
    }
    })
    // fetch('https://api.iextrading.com/1.0/ref-data/symbols')
    // .then(e=>e.json())
    // .then(e=>{
    //   for(let i in e){
    //     let symbol= new app.models.stock()
    //     symbol.name=e[i].symbol
    //     symbol.logo=e[i].symbol+'.png'
    //     symbol.provoders=['iextrading']
    //     symbol.save()
    //   }
    //   done()
    // })
  })
}
