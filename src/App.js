import React, { useEffect, useState } from "react";
import { auth, storeUserInfo } from "./lib/firebase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

import Nav from "./components/Nav";
import AddTest from "./components/AddTest";
import ListTest from "./components/ListTest";
import DetailTest from "./components/DetailTest";
import DoTest from "./components/DoTest";

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);

  const handleSelect = (test) => {
    setSelectedTest(test); // lenh gan selectedTEst
  }
  useEffect(() => {
    console.log(selectedTest);
    console.log("re render");
  },[selectedTest]);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      setLoading(false);
      let newUser = null;
      if (user) {
        newUser = await storeUserInfo(user);
      }
      setUser(newUser);
    });
  }, []);

  const logout = () => {
    auth.signOut();
  };

  return (
    <Router>
      <Nav user={user} loading={loading} logout={logout} />
      <div className="container">
        <Switch>
          <Route exact path="/add" component={AddTest} />
          <Route exact path="/home" >
            <ListTest handleSelect={handleSelect}></ListTest>
          </Route>
          <Route exact path="/home/detail">
            <DetailTest selected={selectedTest}></DetailTest>
          </Route>
          <Route exact path="/test" >
            <DoTest></DoTest>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
