import { useContext } from "react";
import Link from "next/link";
import AuthContext from "../../context/AuthContext";
import { useAuthUser } from "../../hooks/useAuthUser";
import styles from './index.module.scss';

function Navbar() {

  useAuthUser();

  const { isLogged } = useContext(AuthContext);

  return (
    <div>
      <nav className={styles.navbar}>
        {isLogged === false && (
          <>
            <Link href="/register">Registrar</Link>
            <Link href="/login">Login</Link>
          </>
        )}
        {isLogged !== false && (
          <>
            <Link href="/">Home</Link>
            <Link href="/logout" >Logout</Link>
          </>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
