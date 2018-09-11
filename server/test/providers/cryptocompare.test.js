module.exports=function(app){
  it('Cryptocompare',function(d){
    app.providers.cryptoHistory.cryptocompare.daily('BTC','USD')
      .then(()=>d())
  })
}
