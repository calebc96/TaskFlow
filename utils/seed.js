const connection = require("../config/connection");
const { Task, Board } = require("../models");
const { taskData, boardData } = require("./data");

connection.on("error", console.error.bind(console, "connection error:"));

connection.once("open", async () => {
  console.log("connected to database");
  try {
    // Delete existing users and thoughts if any exist
    await Task.deleteMany({});
    await Task.insertMany(taskData);

    await Board.deleteMany({});
    await Board.insertMany(boardData);

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
});
