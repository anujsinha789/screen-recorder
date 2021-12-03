import React, { Component } from "react";
import "../styles.css";
import LoggedIn from "./LoggedIn";

class GoogleLoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { prof: {} };
  }

  componentDidMount() {
    this.googleSDK();
  }

  prepareLoginButton = () => {
    this.auth2.attachClickHandler(
      this.refs.googleLoginBtn,
      {},
      (googleUser) => {
        let profile = googleUser.getBasicProfile();
        this.setState({ prof: profile });
        console.log(this.state.prof);
      },
      (error) => {
        alert(JSON.stringify(error, undefined, 2));
      }
    );
  };

  googleSDK = () => {
    window["googleSDKLoaded"] = () => {
      window["gapi"].load("auth2", () => {
        this.auth2 = window["gapi"].auth2.init({
          client_id: `${this.props.clientId}`,
          cookiepolicy: "single_host_origin",
          scope: "profile email",
        });
        this.prepareLoginButton();
      });
    };
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "google-jssdk");
  };

  render() {
    return (
      <div>
        <button
          className="mainGoogle__Button loginBtn loginBtn--google"
          ref="googleLoginBtn"
        >
          {this.state.prof.jf === undefined ? (
            "Login"
          ) : (
            <LoggedIn data={this.state.prof} />
          )}
        </button>
      </div>
    );
  }
}
export default GoogleLoginComponent;
