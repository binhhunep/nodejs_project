import mongoose from "mongoose";

const Schema = mongoose.Schema;
const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  url: {
    type: String,
  },
  status: {
    type: String,
    erum: ["TO LEARN", "LEARNING", "LEARNED"],
  },
  user: {
    type: Schema.Types.ObjectID,
    ref: "users",
  },
});

module.exports = mongoose.model("posts", PostSchema);
