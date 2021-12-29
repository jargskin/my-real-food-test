import Navbar from "../components/Navbar";
import "../styles/globals.css";
import { ContextAuthProvider } from "../context/AuthContext";
import 'bootswatch/dist/superhero/bootstrap.min.css';


function MyApp({ Component, pageProps }) {
  return (
    <>
      <ContextAuthProvider>
        <Navbar />
        <Component {...pageProps} />
      </ContextAuthProvider>
    </>
  );
}

export default MyApp;
