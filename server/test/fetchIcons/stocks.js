const fetch = require('node-fetch');
var http = require('https');
var fs = require('fs');
var extra = require('fs-extra')

module.exports = function(app) {
  it('Crypto ', (doneFull) => {
    extra.ensureDir('images/stocks/')
    app.models.stock.find().exec(async function(e,el){
      for(let i in el){

          res=await  fetch('https://api.iextrading.com/1.0/stock/'+el[i].name+'/logo');
          res=await  res.json()
          app.log(res.url)
          request = http.get(res.url, function(response) {
                  const { statusCode,head } = response;
                  app.log(head)
                  if(statusCode==200){
                    let file = fs.createWriteStream("images/stocks/"+el[i].name+".png");
                    app.log("[+]  "+el[i].name)
                    response.pipe(file);
                    el[i].logo=[el[i].name+".png"]
                    el[i].save();
                  }else
                  app.log("[-]  "+el[i].name)

              });
        }
            // .then(e=>e.json())
            // .then(e=>{
            //   let file = fs.createWriteStream("images/stocks/"+el[i].name+".png");
            //       request = http.get(e.url, function(response) {
            //         app.log("[+]  "+el[i].name)
            //         response.pipe(file);
            //         el[i].logo=[el[i].name+".png"]
            //         el[i].save();
            //     });
            // })
            // .catch(e=>app.log("[-]  "+el[i].name))
    })
  })
}
