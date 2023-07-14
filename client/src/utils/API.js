// route to get logged in user's info (needs the token)
export const getMe = async (userData) => {
  try {
    const response = await fetch("/api/users/me", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
  } catch (err) {
    console.error(err);
  }
};

export const createUser = (userData) => {
  return fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

export const loginUser = (userData) => {
  const session = sessionStorage.getItem("session");
  return fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Session: session,
    },
    body: JSON.stringify(userData),
  });
};

export const updateUser = (userData) => {
  return fetch("/api/users/me", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

export const findMe = (userData) => {
  return fetch("/api/users/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

export const createBoard = (boardData) => {
  return fetch("/api/boards", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(boardData),
  });
};

// export const getBoards = () => {
//   return fetch(`/api/boards/${}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(loginUser),
//   });
// };
