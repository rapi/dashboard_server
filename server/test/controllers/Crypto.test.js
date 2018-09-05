var request = require('request'),
  chai = require('chai'),
  should = chai.should(),
  fs = require('fs')
logo = ''
id = false
module.exports = function(app) {
  it('Search symbol in all providers '+app.config.http.host + '/api/crypto/history/BTC/USD', (done) => {
    request(app.config.http.host + '/api/crypto/history/BTC/USD', (error, response, body) => {
      response.statusCode.should.be.equal(200);
      response = JSON.parse(body)
      console.log(response)
      response.should.be.a('array');
      done()
    })
  })
}
