import { useState } from "react";
import Swal from 'sweetalert2';
import Link from "next/link";
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

function Login() {
  const [Credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { push } = useRouter();

  const changeUser = (e) => {
    setCredentials({
      ...Credentials,
      [e.target.name]: e.target.value,
    });
  };



  const loginUser = async (e) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(
        auth,
        Credentials.email,
        Credentials.password
      );
      push("/");
    } catch ({message}) {
      Swal.fire({
        icon: 'warning',
        text: 'Debes ingresar tu usuario y contraseña',
      })
      if (message === "Firebase: Error (auth/wrong-password).") {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Usuario o Contraseña invalido, vuelve a intentarlo',
        })
      }
    }
  };
  return (
    <>
      <div className="row justify-content-center">
        <div className='card col-md-6 p-0'>
          <div className="card-header">
            <h3>Inicia sesión en tu cuenta</h3>
          </div>
          <div className="card-body">
            <form onSubmit={loginUser}>
              <div className="form-group input-group mb-2">
                <div className="input-group-text bg-light">
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <input
                  type="email"
                  name="email"
                  className='form-control'
                  placeholder="Correo"
                  onChange={changeUser}
                />
              </div>
              <div className="form-group input-group mb-2">
                <div className="input-group-text bg-light">
                  <FontAwesomeIcon icon={faKey} />
                </div>
                <input
                  type="password"
                  name="password"
                  className='form-control'
                  placeholder="Contraseña"
                  onChange={changeUser}
                />
              </div>
              <button
                className='btn btn-primary btn-block w-100'
                type="submit"
              >
                Ingresar
              </button>
            </form>
          </div>
          <div className="card-body">
            <p className="text-center">
              Aún no tienes cuenta? <Link href="/register">Registrarse</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
