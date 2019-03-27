var mongoose = require("mongoose");

// Schema
const StorySchema = new mongoose.Schema({
  domain: {
    type: String
  },
  title: {
    type: String
  },
  content: {
    type: String
  },
  imgUrl: {
    type: String
  },
  createTime: {
    type: String,
  }
});

module.exports = exports = mongoose.model("Story", StorySchema);