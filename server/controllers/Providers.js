module.exports = class Symbols {
  constructor(app) {
    this.app = app
  }
  //get symbols
  _searchSymbol(req, res) {
    let providers={}
    for(let provider in this.app.providers.history)
      this.app.providers.history[provider]
        .search(req.params.symbol)
        .then((e)=>{
          providers[provider]=e;
          if(Object.keys(providers).length===Object.keys(this.app.providers.history).length)
            res.status(200).send(providers)
        })

  }
}
