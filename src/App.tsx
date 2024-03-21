import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth } from "./services/firebaseConfig";
import { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

// Import all pages
import Homepage from "./pages/Homepage";
import Authentication from "./pages/Authentication";
import Cat from "./pages/Cat";
import MyAccount from "./pages/MyAccount";
import Error401 from "./pages/Error401";

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (userSession) => {
      if (userSession) {
        setUser(userSession);
      } else {
        setUser(null);
      }
    });
  });

  return (
    <>
      <Router>
        <Routes>
          {!user ? (
            <>
              <Route
                path="/"
                element={
                  <>
                    <Authentication />
                  </>
                }
              />

              <Route
                path="/*"
                element={
                  <>
                    <Error401 />
                  </>
                }
              />
            </>
          ) : (
            <>
              {" "}
              <Route
                path="/homepage"
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
            </>
          )}
        </Routes>
      </Router>
    </>
  );
}

export default App;
