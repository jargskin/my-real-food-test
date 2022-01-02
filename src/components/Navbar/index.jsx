import { useContext } from "react";
import Link from "next/link";
import AuthContext from "../../context/AuthContext";
import { useAuthUser } from "../../hooks/useAuthUser";
import style from './index.module.scss';

function Navbar() {

  useAuthUser();

  const { isLogged } = useContext(AuthContext);

  return (
    <>
      <div>
        <nav className="navbar navbar-light bg-light mb-5 justify-content-end">
          {isLogged === false && (
            <> 
              <Link  href="/register">
                <a className={style.color_white}>Registrar</a> 
              </Link>
              <Link  href="/login">
                <a className={style.color_white}>Ingresar</a> 
              </Link>
            </>
          )}
          {isLogged !== false && (
            <>
              <Link  href="/logout" >
                <a className={style.color_white}>Logout</a> 
              </Link>
            </>
          )}
        </nav>
      </div>
    </>
  );
}

export default Navbar;
