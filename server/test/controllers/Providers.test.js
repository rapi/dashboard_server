var request = require('request'),
  chai = require('chai'),
  should = chai.should(),
  fs = require('fs')
logo = ''
id = false
module.exports = function(app) {
  it('Search symbol in all providers '+app.config.http.host + '/api/providers/search/AAPL', (done) => {
    request(app.config.http.host + '/api/providers/search/AAPL', (error, response, body) => {
      response.statusCode.should.be.equal(200);
      response = JSON.parse(body)
      response.should.be.a('object');
      done()
    })
  })
}
