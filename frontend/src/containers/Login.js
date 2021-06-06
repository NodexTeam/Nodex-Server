import React from "react";
import { Link } from "react-router-dom";
import HumanIcon from "@/assets/images/human.svg";

class Login extends React.Component {
  handleSubmitForm = e => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "2241") {
      localStorage.setItem("access-token", "!QAZ@WSX");
      window.location.href = "/";
    } else {
      alert("Authentication Problem!");
    }
  };

  render = () => {
    return (
      <div className="login">
        <div className="triangle-topleft" />
        <div className="wrapper">
          <img src={HumanIcon} alt="HumanLogo" width="30%" />

          <h4>{window.tr("app.page.login.title")}</h4>
          <form onSubmit={this.handleSubmitForm} action="">
            <div className="uk-inline">
              <span
                className="uk-form-icon uk-form-icon-flip"
                uk-icon="icon: user"
              />
              <input
                className="uk-input"
                type="text"
                id="username"
                placeholder={window.tr("app.page.login.username")}
              />
            </div>
            <div className="uk-inline">
              <span
                className="uk-form-icon uk-form-icon-flip"
                uk-icon="icon: 500px"
              />
              <input
                className="uk-input"
                type="password"
                id="password"
                placeholder={window.tr("app.page.login.password")}
              />
            </div>
            <div className="uk-inline center-text uk-margin-small">
              <Link to="/website">
                {window.tr("app.page.login.haveAccount")}
              </Link>
            </div>
            <div className="uk-inline uk-margin">
              <button
                className="uk-button uk-button-primary-gr full-width"
                type="submit"
              >
                {window.tr("app.page.login.submit")}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
}

export default Login;
