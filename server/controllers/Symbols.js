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
  _upload_logo(req, res) {
    res.status(200).send({'name': req.file.filename})
  }
  _delete(req, res) {
    this.app.models.symbols.findOne({
      _id: req.params.id
    }, req.body, function(err, doc) {
      for (let i=0;i< doc.logo.length;i++) {
        this.app.fs.remove('dist/img/symbols/' + doc.logo[i])
        this.app.fs.remove('public/img/symbols/' + doc.logo[i])
      }
      doc.remove()
      res.status(200).send('doc')
    }.bind(this))
  }
  _update(req, res) {
    this.app.models.symbols.findOneAndUpdate({
      _id: req.params.id
    }, req.body, function(err, doc) {
      res.status(200).send(doc)
    })
  }
  _add(req, res) {
    let symbol = new this.app.models.symbols(req.body)
    symbol.save()
    for (let i in req.body.logo)
      this.app.fs.copy(app.env.TMP_DIR + req.body.logo[i], 'public/img/symbols/' + req.body.logo[i], function() {
        this.app.fs.move(app.env.TMP_DIR + req.body.logo[i], 'dist/img/symbols/' + req.body.logo[i], function() {
          res.status(200).send(symbol)
        })
      }.bind(this))
  }
  _get(req, res) {
    this.filter = Object.assign(req.params, req.query)
    this.filter = {
      ...(
        this.filter.name
        ? {
          name: this.filter.name
        }
        : {})
    }
    if (req.params.name == 'random') {
      delete this.filter.name;
      this.result = this.find();
      this.random(function() {
        this.result.exec(function(err, el) {
          res.status(200).send(el)
        })
      }.bind(this))
      return false;
    }
    this.result = this.find(this.filter);
    this.fetch(this.result, function(el) {
      res.status(200).send(el)
    }.bind(this))
  }
  limit() {
    return this.result.limit(10);
  }
  fetch(result, fn) {
    this.result = this.result.limit(10)
    this.result.exec(function(err, el) {
      fn(el)
    }.bind(this))
  }
  random(fn) {
    this.app.models.symbols.countDocuments({}, function(err, count) {
      fn(this.result.skip(parseInt(Math.random() * count)).limit(1))
    }.bind(this))
  }
  find(filter) {
    return this.app.models.symbols.find(this.filter, {
      '_id': 0,
      'name': 1,
      'desc': 1,
      'logo': 1,
      'category': 1,
      'lastDailyUpdate': 1,
      'dailyHistory.time': 1,
      'dailyHistory.close': 1
    })
  }

}
