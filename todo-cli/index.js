import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import inquirer from "inquirer";
import chalk from "chalk";
import clear from "clear";
import taskModel from "./model/taskSchema.js";

mongoose.connect(process.env.MONGO_URI);

const tasks = mongoose.model("Tasks", taskModel);

clear();

// TODO
/*
get all tasks
create task
update task status
delete task
*/

const viewTasks = async () => {
  const taskList = await tasks.find({});

  if (taskList.length === 0) {
    console.log(chalk.yellow("No tasks found. Create a new task :)\n"));
    mainMenu();
  } else {
  console.log(chalk.blue("Tasks:"));
  taskList.forEach((task) => {
    console.log(
        chalk.yellow(" " + task.task) +
        { complete: chalk.green, incomplete: chalk.red }[task.status_](
          " " + task.status_
        )
    );
  });
  console.log("\n");
  mainMenu();
      }
};

const createTask = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "task",
        message: "Enter task: ",
      },
    ])
    .then(async (answer) => {
      const newTask = new tasks({
        task: answer.task,
        status_: "incomplete",
      });

      (await newTask.save()) && console.log(chalk.blue("Task created!"));
      console.log("\n");
      mainMenu();
    });
};


const updateTaskStatus = async () => {
  const taskList = await tasks.find({});

  inquirer
    .prompt([
      {
        type: "list",
        name: "task",
        message: "Select task:",
        choices: taskList.map(
          (task) => task.task + " " + task.status_
        ),
      },
      {
        type: "list",
        name: "status",
        message: "Select status:",
        choices: ["complete", "incomplete"],
      },
    ])
    .then(async (answer) => {
      const task = await tasks.findOne({ 
        task: answer.task.split(' ')[0],
       });
      task.status_ = answer.status;
      await task.save();
      console.log(chalk.blue("Task updated!"));
      console.log("\n");
      mainMenu();
    });
};

const deleteTask = async () => {
  const taskList = await tasks.find({});

  inquirer
    .prompt([
      {
        type: "list",
        name: "task",
        message: "Select task:",
        choices: taskList.map(
          (task) => task.task + " " + task.status_
        ),
      },
    ])
    .then(async (answer) => {
      const taskName = answer.task.split(' ')[0];
      await tasks.findOneAndDelete({
        task: taskName
      });
      console.log(chalk.blue("Task deleted!"));
      console.log("\n");
      mainMenu();
    });
};

const mainMenu = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "mainMenu",
        message: "Main Menu",
        choices: [
          "View All Tasks",
          "Create New Task",
          "Update Task Status",
          "Delete Task",
          "Exit",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.mainMenu) {
        case "View All Tasks":
          viewTasks();
          break;
        case "Create New Task":
          createTask();
          break;
        case "Update Task Status":
          updateTaskStatus();
          break;
        case "Delete Task":
          deleteTask();
          break;
        case "Exit":
          console.log(
            chalk.blue("Goodbye! | Created by ") +
              chalk.bgBlueBright("thelocalgodd") +
              " ^_~"
          );
          process.exit();
      }
    });
};

console.log(chalk.blue("Welcome to Todo CLI!"));
mainMenu();