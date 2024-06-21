import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Boards from "./components/Boards";
import Details from "./components/Details";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
// import LoginForm from "./components/LoginForm";
// import SignupForm from "./components/SignupForm";
import "./App.css";
//import { UserContext } from './components/UserContext';


function App() {
  const [boards, setBoards] = useState([]);
  const [getter, setGetter] = useState(1);

  // const [user, setUser] = useState(() => {
    // Retrieve the user data from storage or set it to null if not found
  //   const storedUser = localStorage.getItem("user");
  //   return storedUser ? JSON.parse(storedUser) : null;
  // });

  // const updateUser = (newUser) => {
  //   setUser(newUser);
  // };

  // useEffect(() => {
  //   // Save the user data to storage whenever the user state changes
  //   localStorage.setItem("user", JSON.stringify(user));
  // }, [user]);

  useEffect(() => {
    fetch("http://localhost:3000/boards")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Parse JSON data from the response
      })
      .then((data) => {
        // Handle successful response
        console.log("Boards App:", data);
        setBoards(data);
      })
      .catch((error) => {
        console.error("Error fetching boards:", error);
      });
  }, [getter]);

  return (
      <Router>
        <Routes>
          <Route
            key="-1"
            path="/"
            element={
              <Home
                getter={getter}
                setGetter={setGetter}
                appBoards={setBoards}
              />
            }
          />
          {/* <Route
            path="/"
            element={
              user ? (
                <Home
                  getter={getter}
                  setGetter={setGetter}
                  appBoards={setBoards}
                />
              ) : (
                <LoginForm />
              )
            }
          /> */}
{/* 
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} /> */}

          {boards.map((res) => (
            <Route
              key={res.id}
              path={"/" + res.id}
              element={<Details key={res.id} board={res} />}
            />
          ))}
        </Routes>
      </Router>
  );
}

export default App;
