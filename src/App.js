import "./App.css";

import { Link, BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Importing Routes instead of Switch
import { Auth } from "aws-amplify";
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";
import React, { useState, useEffect } from "react";
//User Services
import LoginPage from "./service/authentication/user/userSignIn";
import UserSignUp from "./service/authentication/user/userSignUp";
import ForgotPassword from "./service/authentication/user/forgotPassword";
import ProfileForm from "./pages/User pages/completeUser";
import ResendSignup from "./service/authentication/user/resendSignUp";
import Home from "./pages/home/home";
import NavBar from "./layout/navBar/Navbar2";
import UserDashBoard from "./pages/User pages/userDashBoard";
import LandingPage from "./pages/landingPage/StartingPage";
import UserHome from "./pages/User pages/userHome";
import JobProfile from "./pages/Jobs/jobProfile";
import UserInfo from "./pages/User pages/userInfo";
function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [givenName, setGivenName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isEmployee, setIsEmployee] = useState(false);

  Amplify.configure(awsExports);
  useEffect(() => {
    checkAuthenticated();
  }, []);


  //Check to see if a auser is authenticated and get the name and last name (only name if company)
  const checkAuthenticated = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
      const userAttributes = user.attributes || {};
      const userGivenName = userAttributes.given_name || "";
      setGivenName(userGivenName);
      const userLastName = userAttributes.family_name || "";
      setLastName(userLastName);
      const isEmployee = userAttributes.isEmployee;
    } catch (error) {
      setAuthenticated(false);
    }
  };

  return (
    <div className="App">
      <Router>
        <NavBar />
        {/* ----------------------------------  Home routes ------------------------------------------------------- */}
        <Routes>
          <Route
            exact
            path="/"
            element={authenticated ? <UserDashBoard /> : <LandingPage />}
          />
          <Route exact path="/userHome" element={<UserHome />} />
          {/* ----------------------------------------------------------------------------------------------------------------- */}
          
          {/* ----------------------------------  Auhentication routes ------------------------------------------------------- */}
          <Route
            exact
            path={authenticated ? "/" : "/signin"}
            element={<LoginPage />}
          />
          <Route
            exact
            path={authenticated ? "/" : "/signup"}
            element={<UserSignUp />}
          />
          <Route
            exact
            path={authenticated ? "/" : "/passwordreset"}
            element={<ForgotPassword />}
          />
          <Route exact path="/resendSignUp" element={<ResendSignup />} />

          <Route
            path={`/${givenName}${lastName}`}
            element={<UserDashBoard />}
          />
          {/* ------------------------------------------------------------------------------------------------------------------ */}

          {/* ----------------------------------  Employeee routes ------------------------------------------------------- */}
          <Route exact path="/completeprofile" element={<ProfileForm />} />
          <Route exact path="/userInfo/:id" element={<UserInfo />} />
          {/* --------------------------------------------------------------------------------------------------------------- */}

          {/* ----------------------------------  Employer routes ------------------------------------------------------- */}
          <Route exact path="/jobProfile/:id" element={<JobProfile />} />
          {/* ---------------------------------------------------------------------------------------------------- */}
          {/* ----------------------------------  Other routes ------------------------------------------------------- */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
