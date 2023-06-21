const connection = require("../config/connection");
const { User, Board, Task } = require("../models");

connection.once("open", async () => {

await User.deleteMany();

const users = await User.insertMany = [
  {
    username: "john_doe",
    email: "john@example.com",
    password: "password1",
  },
  {
    username: "jane_smith",
    email: "jane@example.com",
    password: "password2",
  },
];

await Board.deleteMany();

const boards = await Board.insertMany([
  {
    title: "Board 1",
    description: "This is board 1",
    username: "john_doe",
  },
  {
    title: "Board 2",
    description: "This is board 2",
    username: "john_doe",
  },
  {
    title: "Board 3",
    description: "This is board 3",
    username: "jane_smith",
  },
];

await Task.deleteMany();

const tasks = await Task.insertMany = [
  {
    title: "Finish project proposal",
    description: "Write and finalize the project proposal document",
    dueDate: "2023-06-05",
    completed: false,
    priority: "high",
    createdBy: "user1",
  },
  {
    title: "Update website content",
    description: "Review and update the content of the company website",
    dueDate: "2023-06-10",
    completed: false,
    priority: "medium",
    createdBy: "user2",
  },
]);

console.log("reviews Seeded");

process.exit();
});
