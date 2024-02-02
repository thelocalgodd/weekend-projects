import dotenv from "dotenv";
dotenv.config();
import { connect, model, connection } from "mongoose";
import { prompt } from "inquirer";
import chalk from "chalk"; // Add this line to import chalk
import clear from "clear";
import taskModel from "./model/taskSchema.js";

config();

connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Task = model("Task", taskModel);

connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

clear();

// Function to view all tasks
const viewTasks = async () => {
  const taskList = await Task.find({});

  console.log(chalk.blue("Tasks:")); // Update this line to use chalk.blue
  taskList.forEach((task) => {
    console.log(
      chalk.green(task.id) + // Update this line to use chalk.green
        chalk.yellow(" " + task.task) + // Update this line to use chalk.yellow
        { complete: chalk.green, incomplete: chalk.red }[task.status_](
          " " + task.status_
        )
    );
  });
  console.log("\n");
  mainMenu();
};

// Rest of the code...
