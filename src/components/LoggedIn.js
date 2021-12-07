import React from "react";

function LoggedIn(props) {
  return (
    <div className="LoggedIn__container">
      <img src={props.data.RM} className="LoggedIn__image" />
    </div>
  );
}

export default LoggedIn;
