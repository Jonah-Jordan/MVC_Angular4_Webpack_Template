
const env = process.env.NODE_ENV || 'dev'

function config () {
  switch (env) {
    case 'production':
    case 'prod':
        return 'prod';
    case 'development':
    case 'devserver':
        return 'devserver';
    case 'dev':
        return 'dev';

    default:
        throw new Error(`Invalid or unknow environment: ${env}`);
  }
}

module.exports = require(`./src/config/webpack.${config()}.js`)