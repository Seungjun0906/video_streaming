import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId: process.env.REACT_APP_CLIENT_ID,
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();

          this.onAuthChange(this.auth.isSignedIn.get());

          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn();
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  }

  render() {
    console.log(this.props.isSignedIn);
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, {
  signIn,
  signOut,
})(GoogleAuth);

/*
import React, { useState, useEffect } from "react";

const GoogleAuth = () => {
  const [isSignedIn, setIsSignedIn] = useState(null);
  const [auth, setAuth] = useState();

  useEffect(() => {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId: process.env.REACT_APP_CLIENT_ID,
          scope: "email",
        })
        .then(() => {
          setAuth(window.gapi.auth2.getAuthInstance());
          const auth = window.gapi.auth2.getAuthInstance();
          console.log(auth);
          console.log(auth.isSignedIn.get());
          console.log("1", isSignedIn);
          setIsSignedIn(auth.isSignedIn.get());
          console.log("2", isSignedIn);
          auth.isSignedIn.listen(onAuthChange);
          console.log("3", isSignedIn);
        });
    });
  }, [setAuth, isSignedIn]);
  const onAuthChange = () => {
    setIsSignedIn(auth.isSignedIn.get());
  };

  const onSignOutClick = () => {
    auth.signOut();
  };

  const onSignInClick = () => {
    auth.signIn();
  };

  const renderAuthButton = () => {
    if (isSignedIn === null) {
      return null;
    } else if (isSignedIn) {
      return (
        <button onClick={onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={onSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  };

  return (
    <>
      <div>{renderAuthButton()}</div>
    </>
  );
};

export default GoogleAuth;
 */
