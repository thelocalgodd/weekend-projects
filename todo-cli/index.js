import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import inquirer from "inquirer";
import chalk from "chalk";
import clear from "clear";
import taskModel from "./model/taskSchema.js";

mongoose.connect(process.env.MONGO_URI);

const tasks = mongoose.model("tasks", taskModel);

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

  console.log(chalk.blue("Tasks:"));
  taskList.forEach((task) => {
    console.log(
      chalk.green(task.id) +
        chalk.yellow(" " + task.task) +
        { complete: chalk.green, incomplete: chalk.red }[task.status_](
          " " + task.status_
        )
    );
  });
  console.log("\n");
  mainMenu();
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
      const taskCount = await tasks.countDocuments();
      const newTask = new tasks({
        id: taskCount + 1,
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
          (task) => task.id + " " + task.task + " " + task.status_
        ),
      },
      {
        type: "list",
        name: "status",
        message: "Select status:",
        choices: ["complete", "incomplete"],
      },
    ])
    .then((answer) => {
      const task = tasks.findOne({ id: answer.task });
      task.status_ = answer.status;
      (task.save() && console.log(chalk.blue("Task updated!")));
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
          (task) => task.id + " " + task.task + " " + task.status_
        ),
      },
    ])
    .then((answer) => {
      // const task = tasks.findOne({ id: answer.task.id });
      // console.log(task)
      tasks.findOneAndDelete({
        id: parseInt(answer.task.split(" ")[0]),
      }) && console.log(chalk.blue("Task deleted!"));
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
