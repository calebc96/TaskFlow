const connection = require("../config/connection");
const { User, boardSchema } = require("../models");
const { users, boards } = require("./data");

connection.on("error", console.error.bind(console, "connection error:"));
connection.once("open", async () => {
  console.log("connected to database");
  try {
    // Delete existing users and thoughts if any exist
    await User.deleteMany({});
    // await boardSchema.deleteMany({});

    // Create new users and thoughts
    const createdUsers = await User.insertMany(users);
    console.log(createdUsers);
    const boardsWithUsers = boards.map((board) => {
      const user = createdUsers.find(
        (user) => users.username === board.username
      );
      return { ...board, username: user.username };
    });
    // await boardSchema.insertMany(boardsWithUsers);

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
});
