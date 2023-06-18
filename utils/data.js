const tasks = [
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
];

const boards = [
  {
    boardID: "12245323452346",
    title: "Finish project proposal",
    backgroundImage: "first",
  },
];
const users = [
  {
    username: "calebcarnett",
    email: "caleb@gmail.com",
    password: "Bobby12345$",
  },
];

module.exports = { tasks, boards, users };
