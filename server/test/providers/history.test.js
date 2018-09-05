var chai = require('chai'),
  expect = chai.expect,
  should = chai.should(),
  providers = require('require-all')({
    dirname: __dirname + '/../../providers/history'
  });
chai.config.showDiff = false;
describe('Providers', function() {
describe('History', function() {
  for (let name in providers)
    it(name, done => {
      providers[name].daily('MSFT').then((e) => {
        e.should.to.have.lengthOf.above(10);
        for (i in e) {
          e[i].should.to.contain.keys('time', 'open', 'high', 'low', 'close', 'volume')
          e[i].time.should.be.a('date');
          e[i].open.should.be.a('number');
          e[i].high.should.be.a('number');
          e[i].low.should.be.a('number');
          e[i].close.should.be.a('number');
          e[i].volume.should.be.a('number');
        }
        return e;
      }).then((e) => {
        done()
      }).catch((e) => {
        done(e)
      })
    })
})
})
