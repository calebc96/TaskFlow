const users = [
  {
    _id: "649da5861a881a7e54509c29",
    username: "John Doe",
    email: "carnett.caleb@gmail.com",
    password: "password12%",
    boards: [],
  },
];

const boards = [
  {
    user_id: "649da5861a881a7e54509c29",
    title: "Board 1",
    backgroundImage: "two",
  },
];

const tasks = [
  {
    title: "Finish project proposal",
    description: "Write and finalize the project proposal document",
    dueDate: "2023-06-05T00:00:00.000Z",
    completed: false,
    priority: "high",
  },
];

module.exports = { users, boards, tasks };
