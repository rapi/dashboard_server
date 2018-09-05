var request = require('request'),
  chai = require('chai'),
  should = chai.should(),
  fs = require('fs')
logo = ''
id = false
module.exports = function(app) {
  it('Simple request...  '+app.config.http.host + '/api/symbols/', (done) => {
    request(app.config.http.host + '/api/symbols/', (error, response, body) => {
      response.statusCode.should.be.equal(200);
      response = JSON.parse(body)
      response.should.be.a('array');
      done()
    })
  })
  it('Get random symbol. '+app.config.http.host + '/api/symbols/random', (done) => {
    request(app.config.http.host + '/api/symbols/random', (error, response, body) => {
      response.statusCode.should.be.equal(200);
      response = JSON.parse(body)
      response.should.be.a('array');
      done()
    })
  })
  it('Get one symbol...  '+app.config.http.host + '/api/symbols/AAPL', (done) => {
    request(app.config.http.host + '/api/symbols/AAPL', (error, response, body) => {
      response.statusCode.should.be.equal(200);
      response = JSON.parse(body)
      response.should.be.a('array');
      done()
    })
  })

  it('Upload Logo....... '+app.config.http.host + '/api/symbols/logo', (done) => {
    files=fs.readdirSync('public/img/big/symbols/')
    request({
      url: app.config.http.host + '/api/symbols/logo',
      method: 'POST',
      formData: {
        logo: [fs.createReadStream('public/img/big/symbols/'+files[0])]
      }
    }, function(err, response, body) {
      response.statusCode.should.be.equal(200);
      response = JSON.parse(body)
      logo = response.name
      app.fs.pathExists(app.env.TMP_DIR + response.name, function(err, exist) {
        exist.should.be.equal(true);
        done()
      })
    })
  })
  it('Add new symbol...  '+ app.config.http.host + '/api/symbols', (done) => {
    app.models.symbols.countDocuments({}, function(err, count) {
      request({
        method: 'POST',
        url: app.config.http.host + '/api/symbols',
        json: {
          name: 'TEST',
          desc: 'TEST',
          logo: [logo],
          category: 'TEST',
          providers: ['TEST']
        }
      }, (error, response, body) => {
        response.statusCode.should.be.equal(200);
        id = body._id
        body.should.be.a('object');
        app.models.symbols.countDocuments({}, function(err, after_count) {
          after_count.should.be.equal(count + 1)
          done()
        })
      })
    })
  })
  it('Update symbol..... '+app.config.http.host + '/api/symbols/:id', (done) => {
    let random = parseInt(Math.random() * 9999999)
    request({
      method: 'POST',
      url: app.config.http.host + '/api/symbols/' + id,
      json: {
        desc: random
      }
    }, (error, response, body) => {
      response.statusCode.should.be.equal(200);
      app.models.symbols.findOne({_id: id}).exec(function(err, symbol) {
        symbol.desc.should.be.equal(random + '');
        done()
      })
    })
  })
  it('Delete symbol..... '+app.config.http.host + '/api/symbols/:id', (done) => {
    app.models.symbols.countDocuments({}, function(err, count) {
      request({
        method: 'DELETE',
        url: app.config.http.host + '/api/symbols/' + id
      }, (error, response, body) => {
        response.statusCode.should.be.equal(200);
        app.models.symbols.countDocuments({}, function(err, after_count) {
          after_count.should.be.equal(count - 1)
          done()
        })
      })
    })
  })
}
