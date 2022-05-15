import React from "react";
import { auth, db } from "../firebase";
import { withRouter } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [error, setError] = React.useState(null);
  const [esRegistro, setEsRegistro] = React.useState(false);

  const procesarDatos = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      //console.log("Ingrese su email");
      setError("Ingrese su email");
      return;
    }
    if (!pass.trim()) {
      //console.log("Ingrese su contraseña");
      setError("Ingrese su contraseña");
      return;
    }
    if (pass.length < 6) {
      //console.log("Password menor a 6 caracteres");
      setError("La contraseña debe ser mayor a 6 caracteres");
      return;
    }
    setError(null);

    if (esRegistro) {
      registrar();
    } else {
      login();
    }
  };

  const registrar = React.useCallback(async () => {
    try {
      const res = await auth.createUserWithEmailAndPassword(email, pass);
      console.log(res.user);
      await db.collection("usuarios").doc(res.user.email).set({
        email: res.user.email,
        uid: res.user.uid,
      });
      await db.collection(res.user.uid).add({
        name: "Tarea de ejemplo",
        fecha: Date.now(),
      });
      setEmail("");
      setPass("");
      setError(null);
      props.history.push("/admin");
    } catch (error) {
      console.log(error);
      if (error.code === "auth/invalid-email") {
        setError("Email no valido");
      }
      if (error.code === "auth/email-already-in-use") {
        setError("Ese email ya está en uso");
      }
    }
  }, [email, pass, props.history]);

  const login = React.useCallback(async () => {
    try {
      const res = await auth.signInWithEmailAndPassword(email, pass);
      console.log(res.user);
      setEmail("");
      setPass("");
      setError(null);
      props.history.push("/admin");
    } catch (error) {
      console.log(error);
      if (error.code === "auth/invalid-email") {
        setError("Email no valido");
      }
      if (error.code === "auth/user-not-found") {
        setError("No se encontró un usuario registrado con ese email");
      }
      if (error.code === "auth/wrong-password") {
        setError("Contraseña incorrecta");
      }
    }
  }, [email, pass, props.history]);

  return (
    <div>
      <h3 className="text-center text-primary">
        {esRegistro ? "Registro de usuario" : "Login"}
      </h3>
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
            <input
              type="password"
              className="form-control"
              placeholder="Ingrese su contraseña"
              onChange={(e) => setPass(e.target.value)}
              value={pass}
            ></input>
            <button className="btn-dark btn-lg" type="submit">
              {esRegistro ? "Registrarse" : "Acceder"}
            </button>
            <button
              className="btn btn-sm btn-info text-light"
              type="button"
              onClick={() => {
                setEsRegistro(!esRegistro);
              }}
            >
              {esRegistro ? "¿Ya tienes cuenta?" : "¿No estas registrado?"}
            </button>
            {!esRegistro ? (
              <button
                className="btn-warning btn-sm text-light"
                type="button"
                onClick={() => props.history.push("/reset")}
              >
                Recuperar contraseña
              </button>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
