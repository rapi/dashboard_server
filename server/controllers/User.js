module.exports=class Login{
  constructor(app){
    this.app=app
  }
  _login(req,res){
    // req.session.test=2
    app.log(req.session)
    // req.session.save()
    // this.app.models.user.authenticate('admin','admin',function(err,result){
    //   if(err)
    //     res.status(200).send(JSON.stringify(err))
    //   else
        res.status(200).send(JSON.stringify(req.session))
    // })
  }
  _register(req,res){
    app.log(req.user)
      this.app.models.user.register({username:'admin',active:true},'admin',function(err){

    })
  }
}
