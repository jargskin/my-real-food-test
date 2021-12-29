import { useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";

const Logout = () => {
  useEffect(() => {
    const auth = getAuth();
    signOut(auth)
    .then(() => {})
    .catch((error) => {});
  }, [])
  return null
}
export default Logout;

