import { useState } from "react";
import Link from "next/link";
import Swal from 'sweetalert2';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useRouter } from "next/router";

function Register() {
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
  const registerUser = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(
        auth,
        Credentials.email,
        Credentials.password
      );
      push("/");
    } catch (error) {
      Swal.fire({
        icon: 'warning',
        text: 'Ha ocurrido un problema, vuelve a intentarlo',
      })
      console.log(error);
    }
  };
  return (
    <>
      
      <div className="row justify-content-center">
        <div className='card col-md-6 p-0'>
          <div className="card-header">
            <h3>Registra tu cuenta</h3>
          </div>
          <div className="card-body">
            <form onSubmit={registerUser}>
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
              Ya tienes una cuenta? <Link href="/login">Ingresar</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
