import mongoose from "mongoose";

const taskModel = new mongoose.Schema({
  task: String,
  status_: String,
});

export default taskModel;
