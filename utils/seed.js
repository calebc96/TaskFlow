const connection = require("../config/connection");
const { Board, User } = require("../models");
const { boards, users } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  // Drop existing courses
  await Board.deleteMany({});

  // Drop existing students
  await User.deleteMany({});

  // Add students to the collection and await the results
  await User.collection.insertMany(users);

  // Add courses to the collection and await the results
  await Board.collection.insertMany(boards);

  // Log out the seed data to indicate what should appear in the database
  console.info("Seeding complete! 🌱");
  console.table(users);
  console.table(boards);
  process.exit(0);
});
