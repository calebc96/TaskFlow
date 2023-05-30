const connection = require("../config/connection");
const { Task } = require("../models");
const { taskData } = require("./data");

connection.on("error", console.error.bind(console, "connection error:"));

connection.once("open", async () => {
  console.log("connected to database");
  try {
    // Delete existing users and thoughts if any exist
    await Task.deleteMany({});
    await Task.insertMany(taskData);

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
});
