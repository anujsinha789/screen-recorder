import React from "react";
import "../styles.css";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { LogContext } from "../context/LogContext";

function FirebaseLogin() {
  const [photoURL, setPhotoUrl] = React.useState("");

  const x = React.useContext(LogContext);
  const { loggedIn, dispatch } = x;

  const signInWithFirebase = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        const user = res.user;
        setPhotoUrl(user.photoURL);
        dispatch({ type: "change" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="FirebaseLogin__Main">
      {photoURL === "" ? (
        <button className="FirebaseLogin__Butt" onClick={signInWithFirebase}>
          Login
        </button>
      ) : (
        <img src={photoURL} className="FirebaseLogin__image" alt="Login" />
      )}
    </div>
  );
}

export default FirebaseLogin;
