import Navigation from "./components/Welcome";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
function App() {
  return (
    <Router>
      <div>
        <Navigation />;
        <Routes>
          {/* <Route path="*" element={<Pagenotfound />} />
          <Route path="/" element={<Home />} /> */}
          <Route path="/login" element={<Login />} />
          {/* <Route path="/Signup" element={<Signup />} /> */}
          {/* <Route path="/Contact" element={<Contact />} /> */}
          {/* <Route
          path="/product/:productId/reviews"
          element={<ProductReviews />}
        />
        <Route path="/product/:id" element={<Detail />} />
        <Route path="/profile" element={<Profile />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
