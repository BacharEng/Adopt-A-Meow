import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Authentication from "./pages/Authentication";
import Cat from "./pages/Cat";
import MyAccount from "./pages/MyAccount";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Homepage />
              </>
            }
          />

          <Route
            path="/*"
            element={
              <>
                <Homepage />
              </>
            }
          />

          <Route
            path="/authentication"
            element={
              <>
                <Authentication />
              </>
            }
          />

          <Route
            path="/cat"
            element={
              <>
                <Cat />
              </>
            }
          />

          <Route
            path="/myaccount"
            element={
              <>
                <MyAccount />
              </>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
