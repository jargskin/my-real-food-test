import { useState } from "react";
import Link from "next/link";
import Swal from 'sweetalert2';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useRouter } from "next/router";

import styles  from './index.module.scss';

function Register() {
  const [loading, setLoading] = useState(false);
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
  const registerUser = async () => {
    setLoading(true)
    try {
      await createUserWithEmailAndPassword(
        auth,
        Credentials.email,
        Credentials.password
      );
      push("/");
    } catch (error) {
      setLoading(false)
      Swal.fire({
        icon: 'warning',
        text: 'Ha ocurrido un problema, vuelve a intentarlo',
      })
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <div className={styles.form_signin}>
          <h1 className={styles.text_login}>Registra tu cuenta</h1>
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
              onClick={registerUser}
              loading={loading}
              loadingPosition="center"
              className={styles.button_register}
            >
                Registrar
              </LoadingButton> */}
          </div>
          <p className={styles.text_center}>O también</p>
          <p className={styles.text_center}>
            ¿Ya tienes cuenta? <Link href="/login">Inicia sesión</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
