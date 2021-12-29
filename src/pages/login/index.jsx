import { useState } from "react";
import Swal from 'sweetalert2';
import Link from "next/link";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import styles  from './index.module.scss';

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

  const [loading, setLoading] = useState(false);


  const loginUser = async () => {
    setLoading(true)
    try {
      await signInWithEmailAndPassword(
        auth,
        Credentials.email,
        Credentials.password
      );
      setLoading(false)
      push("/");
    } catch ({message}) {
      setLoading(false)
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
      <div>
        <div className={styles.form_signin}>
          <h1 className={styles.text_login}>Inicia sesión en tu cuenta</h1>
          <div className="center">
            <input
              name="email"
              type="text"
              className={styles.input_form}
              placeholder="Correo"
              onChange={changeUser}
            />
          </div>
          <div className="center">
            <input
              name="password"
              type="password"
              className={styles.input_form}
              placeholder="Contraseña"
              onChange={changeUser}
            />
          </div>
          <div className="center">
            {/* <LoadingButton
              variant="contained"
              onClick={loginUser}
              loading={loading}
              loadingPosition="center"
              className={styles.button_signup}
            >
                Ingresar
              </LoadingButton> */}
          </div>
          <p className={styles.text_center}>O también</p>
          <p className={styles.text_center}>
            ¿Aún no tienes cuenta? <Link href="/register">Registrarse</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
