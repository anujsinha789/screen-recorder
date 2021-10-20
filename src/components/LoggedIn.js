import React from "react";

function LoggedIn(props) {
  return (
    <div className="LoggedIn__container">
      <span className="LoggedIn__text">Logged In</span>
      <img src={props.data.SJ} className="LoggedIn__image" />
    </div>
  );
}

export default LoggedIn;
