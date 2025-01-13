const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'daily-micro-learning',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

