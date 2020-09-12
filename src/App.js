import React, { useContext, useState, useEffect } from "react";
// import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { Switch, HashRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header/Header";
import PreviewWrapper from "./components/PreviewWrapper/PreviewWrapper";
import Entry from "./components/Entry/Entry";
import { StateContext } from "./context";

import "./App.css";

function App() {
  const { darkMode } = useContext(StateContext);
  const [users, setUsers] = useState([]);

  // client-server app
  useEffect(() => {
    axios
      .get(`http://localhost:8000/users`)
      .then((response) => setUsers(response.data.data))
      .catch((error) => {
        console.log("Request failed");
      });
  }, []);

  console.log(users);
  return (
    <Router>
      <div
        className="app"
        style={darkMode ? { backgroundColor: "#121212" } : {}}
      >
        <Header />

        {users.map(({ name }) => (
          <div>{name}</div>
        ))}

        <Switch>
          <Route exact path="/">
            <PreviewWrapper />
          </Route>
          <Route path="/:slug">
            <Entry />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
