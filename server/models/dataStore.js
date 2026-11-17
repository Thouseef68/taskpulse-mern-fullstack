const MongooseUser = require('./User');
const MongooseTask = require('./Task');
const { MemoryUser, MemoryTask } = require('../config/memoryStore');
const { isMongoConnected } = require('../config/db');

// Dynamic proxy that delegates to Mongoose if connected, or MemoryStore if offline/serverless demo
const getUserModel = () => {
  return isMongoConnected() ? MongooseUser : MemoryUser;
};

const getTaskModel = () => {
  return isMongoConnected() ? MongooseTask : MemoryTask;
};

module.exports = {
  getUserModel,
  getTaskModel,
};

