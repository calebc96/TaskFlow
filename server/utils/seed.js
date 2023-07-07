const connection = require("../config/connection");
const { Board, User, Task } = require("../models");
const { boards, users, tasks } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  await Task.deleteMany({});
  // Drop existing boards
  await Board.deleteMany({});

  // Drop existing users
  await User.deleteMany({});

  // Add students to the collection and await the results
  await User.collection.insertMany(users);

  // Add courses to the collection and await the results
  await Board.collection.insertMany(boards);

  await Task.collection.insertMany(tasks);

  // Log out the seed data to indicate what should appear in the database
  console.info("Seeding complete! 🌱");
  console.table(users);
  console.table(boards);
  console.table(tasks);
  process.exit(0);
});
