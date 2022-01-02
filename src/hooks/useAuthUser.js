import { useEffect, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";


export const useAuthUser = () => {
  const router = useRouter();

  const { setisLogged } = useContext(AuthContext);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      let userLogged = user === null ? false : true;

      if (!userLogged) {
        router.push("/login");
        setisLogged(false);
      } else {
        setisLogged(true);
        if (router.pathname === "/login" || router.pathname === "/register") {
          router.push("/");
        }
      }
    });
  }, []);
};
