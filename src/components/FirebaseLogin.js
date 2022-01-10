import React from "react";
import "../styles.css";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

function FirebaseLogin() {
  const [photoURL, setPhotoUrl] = React.useState("");

  const signInWithFirebase = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        const user = res.user;
        setPhotoUrl(user.photoURL);
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
