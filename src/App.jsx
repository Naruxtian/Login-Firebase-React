import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Admin from "./Components/Admin";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import { auth } from "./firebase";

function App() {
  const [firebaseUser, setFirebaseUser] = React.useState(false);

  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        setFirebaseUser(user);
      } else {
        setFirebaseUser(null);
      }
    });
  }, []);

  return firebaseUser !== false ? (
    <Router>
      <div className="container">
        <h1 className="text-center text-warning">
          Login y autenticación mediante Firebase
        </h1>
        <hr />
        <Navbar firebaseUser={firebaseUser} />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/">
            <h2 className="text-center text-danger">Inicio</h2>
          </Route>
        </Switch>
      </div>
    </Router>
  ) : (
    <h1 className="text-center">Cargando....</h1>
  );
}

export default App;
