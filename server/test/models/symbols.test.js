// Tests for symbols
//
//
var chai = require('chai'),
  expect = chai.expect,
  should = chai.should();
module.exports = function(app) {

  cron = require('cron');
  describe('Models', function() {
    describe('Symbols', function() {
      it('getHistory method test: ', done => {
        app.models.symbols.find({}).sort({lastDailyUpdate: 1}).limit(1).exec(function(_, e) {
          e[0].updateDailyTicks(app).then((e) => {
            if (e.lastDailyUpdate.getTime() > (new Date()).getTime() - 10)
              done()
            else
              done('Not updated')
          }).catch((err) => done(err))
        })
      })

    })
  })
}
