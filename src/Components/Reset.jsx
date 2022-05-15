import React from "react";
import { auth } from "../firebase";
import { withRouter } from "react-router-dom";

const Reset = (props) => {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState(null);

  const procesarDatos = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Ingrese su email");
      return;
    }
    setError(null);
    recuperar();
  };

  const recuperar = React.useCallback(async () => {
    try {
      await auth.sendPasswordResetEmail(email);
      console.log("correo enviado");
      props.history.push("/login");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  }, [email, props.history]);

  return (
    <div>
      <h3 className="text-center text-primary">Recuperar contraseña</h3>
      <hr />
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-x1-4">
          <form className="d-grid gap-2" onSubmit={procesarDatos}>
            {error && <div className="alert alert-danger">{error}</div>}
            <input
              type="email"
              className="form-control"
              placeholder="Ingrese su email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            ></input>
            <button className="btn-dark btn-lg" type="submit">
              Recuperar contraseña
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Reset);
