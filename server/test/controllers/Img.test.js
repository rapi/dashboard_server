var request = require('request'),
  chai = require('chai'),
  should = chai.should(),
  fs = require('fs')
logo = ''
id = false
module.exports = function(app) {
  it('Upload Image....... '+app.config.http.host + '/api/img', (done) => {
    files=fs.readdirSync('public/img/big/symbols/')
    request({
      url: app.config.http.host + '/api/img',
      method: 'POST',
      formData: {
        module: 'TEST',
        logo: [fs.createReadStream('public/img/big/symbols/'+files[0])]
      }
    }, function(err, response, body) {
      response.statusCode.should.be.equal(200);
      response = JSON.parse(body)
      logo = response.name
      done()
    })
  })
}
