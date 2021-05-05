import React, { Component } from 'react';
import logo from './logo.svg';
// import './App.css';
import Amplify, { Auth } from 'aws-amplify';
import aws_exports from './aws-exports';
import ROUTES, { RenderRoutes } from './routes';
import { ConfirmSignIn, ConfirmSignUp, ForgotPassword, RequireNewPassword, SignIn, SignUp, VerifyContact, withAuthenticator } from 'aws-amplify-react';
import MySignIn  from './SignIn/SignIn';
import MySignUp  from './SignUp/MySignUp';
import VerificationCode from './VerificationCode/VerificationCode';
Amplify.configure(aws_exports);



class App extends React.Component {

  render() {
      return (
        <React.Fragment>
          <RenderRoutes routes={ROUTES} />
        </React.Fragment>
      );
    }
}

export default withAuthenticator(App, false, [
  <MySignIn/>,
  <ConfirmSignIn/>,
  <VerifyContact/>,
  <MySignUp/>,
  <ConfirmSignUp/>,
  <ForgotPassword/>,
  <RequireNewPassword />
]);
