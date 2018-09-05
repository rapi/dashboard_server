module.exports = class Symbols {
  constructor(app) {
    this.app = app
    this.result = ''
    this.filter = {}
  }
  //get symbols
  _save(req, res) {
    let data={
        name:req.file.fieldname,
        path:req.file.path,
        encoding:req.file.encoding,
        mimetype:req.file.mimetype,
        destination:req.file.destination,
        path:req.file.path,
        size:req.file.size,
        module:req.body.module,
    }
    // let img=new this.app.models.img(data)
    // img.save().then(function(){
      res.status(200).send(data)
    // })
  }
}
