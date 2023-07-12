// import React, { useEffect, useState } from "react";
// import "../styles/CreatedBoard.css";
// // import { getBoards } from "../utils/API";

// export default function Created() {
//   const [loggedInUser, setLoggedInUser] = useState(null);

//   useEffect(() => {
//     const login = async () => {
//       try {
//         // const response = await getBoards();
//         if (!response.ok) {
//           throw new Error("Failed to fetch user data");
//         }
//         const { user } = await response.json();
//         setLoggedInUser(user);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     login();
//   }, []);

//   return (
//     <div style={{ color: "white" }}>
//       <h2>User Details</h2>
//       <p>Name: {loggedInUser}</p>
//       {/* Render additional user data */}
//     </div>
//   );
// }
