module.exports=function(app){
  it('Iextrading',function(d){
    app.providers.stockHistory.iextrading.daily('AAPL')
      .then(()=>d())
  })
}
