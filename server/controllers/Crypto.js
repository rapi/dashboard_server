/* input
data['name'] */
var multer = require('multer')
var upload = multer({dest: 'uploads/'})
module.exports = class Symbols {
  constructor(app) {
    this.app = app
    this.result = ''
    this.filter = {}
  }
  //get symbols
  _getPair(req,res){
    this.app.models.cryptoPairs.findOne({
      from:req.params.from,
      to:req.params.to,
    },function(err,record){
      if(err)res.status(500).send({err:'Pair canot be found'})
      else if(record===null)res.status(404).send({err:'Pair canot be found'})
      else res.status(200).send(record)
    })
  }
  _getHistory(req,res){
    this.app.models.cryptoPairs.findOne({
      from:req.params.from,
      to:req.params.to,
    },function(err,record){
      if(err)res.status(500).send({err:'Pair canot be found'})
      else if(record===null)res.status(404).send({err:'Pair canot be found'})
      else res.status(200).send(record.dailyHistory)
    })
  }

}
