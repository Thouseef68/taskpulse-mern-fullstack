const MongooseUser = require('./User');
const MongooseTask = require('./Task');
const { MemoryUser, MemoryTask } = require('../config/memoryStore');
const { isMongoConnected } = require('../config/db');

// If MONGODB_URI is provided, ALWAYS use Mongoose models!
// Never fall back to MemoryStore on transient connection handshakes.
const getUserModel = () => {
  if (process.env.MONGODB_URI) {
    return MongooseUser;
  }
  return isMongoConnected() ? MongooseUser : MemoryUser;
};

const getTaskModel = () => {
  if (process.env.MONGODB_URI) {
    return MongooseTask;
  }
  return isMongoConnected() ? MongooseTask : MemoryTask;
};

module.exports = {
  getUserModel,
  getTaskModel,
};
