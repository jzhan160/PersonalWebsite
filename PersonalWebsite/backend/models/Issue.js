var mongoose = require("mongoose");

// Schema
const IssueSchema = new mongoose.Schema({
  title: {
    type: String
  },
  responsible: {
    type: String
  },
  description: {
    type: String
  },
  severity: {
    type: String
  },
  status: {
    type: String,
    default: "Open"
  }
});

module.exports = exports = mongoose.model("Issue", IssueSchema);
