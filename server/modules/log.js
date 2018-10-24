const winston = require('winston');
require('winston-daily-rotate-file');
const myFormat = winston.format.printf(info => {
  return `${info.timestamp} [${ (
    info.level === 'info'
    ? '+'
    : '-')}] ${info.level}: ${info.message}`;
});
var transport = new(winston.transports.DailyRotateFile)({filename: 'logs/application-%DATE%.log', datePattern: 'YYYY-MM-DD-HH', zippedArchive: true, maxSize: '20m', maxFiles: '14d'});

const logger = winston.createLogger({
  level: 'verbose',
  format: winston.format.combine(winston.format.timestamp(), myFormat),
  transports: [new winston.transports.Console(), transport]
});
module.exports = function(app) {
  app.log = function(...e) {
    logger.log('info',format(e));
  }
  app.error = function(...e) {
    logger.log('error', format(e));
  }
}
function format(e) {
  let message = '';
  for (let i in e)
    if (e[i].stack) {
      logger.log('error', e[i].stack)
      message += JSON.stringify(e[i].stack)
    }
  else
    message += '  '+e[i]
  return message
}
