#!/usr/bin/env node

import pkg from "prompt-sync";
const prompt = pkg();
import chalk from "chalk";
import dotenv from "dotenv";
dotenv.config();
import fetch from "node-fetch";

console.log(chalk.bgWhite("Weather App"));
console.log("------------");
console.log(
  chalk.bgCyan("Enter your location to get the weather details\n") +
    "eg. Kumasi, Ghana\n"
);
let location = prompt("Enter your location: ");

const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.API_KEY}&units=metric`;

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    // output the location, weather, humidity, and temperature
    console.log("\n------------------------------------");
    console.log(`Location: ` + chalk.bgWhite(`${data.name}`));
    console.log("------------------------------------");
    console.log(`Weather: ${data.weather[0].main}`);
    console.log(`Humidity: ${data.main.humidity} %`);
    console.log(`Temperature: ${data.main.temp} °C`);
    console.log("------------------------------------\n");
  });
