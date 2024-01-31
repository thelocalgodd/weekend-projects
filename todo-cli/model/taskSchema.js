import mongoose from "mongoose";

const taskModel = new mongoose.Schema({
  id: Number,
  task: String,
  status_: String,
});

export default taskModel;
