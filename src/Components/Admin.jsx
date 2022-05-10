import React from "react";
import { auth } from "../firebase";
import { withRouter } from "react-router-dom";

const Admin = (props) => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    if (auth.currentUser) {
      console.log("Existe el usuario");
      setUser(auth.currentUser);
    } else {
      console.log("No existe el usuario");
      props.history.push("/login");
    }
  }, []);

  return (
    <div>
      <h2 className="text-center text-success">Ruta protegida</h2>
      {
        user && (
          <h3 className="text-center">{user.email}</h3>
        )
      }
    </div>
  );
};

export default withRouter(Admin);