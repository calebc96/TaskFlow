const connection = require("../config/connection");
const { User, Board, Task } = require("../models");

connection.once("open", async () => {
  await User.deleteMany();

  await User.insertMany([
    {
      _id: "649252e9a272d59f6402c800",
      username: "john_doe",
      email: "john@example.com",
      password: "password1$",
    },
    {
      _id: "649252e9a272d59f6402c801",
      username: "jane_smith",
      email: "jane@example.com",
      password: "password2#",
      boards: [],
    },
  ]);

  await Board.deleteMany();

  await Board.insertMany([
    {
      user: "649252e9a272d59f6402c800",
      title: "Board 1",
      description: "This is board 1",
      backgroundImage: "john_doe",
    },
    {
      user: "649252e9a272d59f6402c800",
      title: "Board 2",
      description: "This is board 2",
      backgroundImage: "john_doe",
    },
    {
      user: "649252e9a272d59f6402c800",
      title: "Board 3",
      description: "This is board 3",
      backgroundImage: "jane_smith",
    },
  ]);

  await Task.deleteMany();

  await Task.insertMany([
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

  console.log("data seeded successfully");

  process.exit();
});
