import React, { useState } from "react";
import { Auth, Hub } from "aws-amplify";
import "./user.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Text from "../../../components/text/text";
const ConfirmSignup = ({ username, password, name, lastName, industry, address, isEmployee }) => {
  const [code, setCode] = useState("");
  const [confirmationError, setConfirmationError] = useState(null);
  
  const navigate = useNavigate();
  async function confirmSignUp(e) {
    e.preventDefault();
    try {
      await Auth.confirmSignUp(username, code);
      console.log("Successfully confirmed sign up");
      saveToDatabase();
    } catch (error) {
      console.error("Error confirming sign up", error);
      setConfirmationError(
        "Error confirming sign up. Please check the code and try again."
      );
    }
  }

  const saveToDatabase = async () => {
    if (isEmployee){

      try {
        const response = await axios.post(
          "https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/user",
          {
            name: name,
            lastname: lastName,
            email: username,
          },
          {
            headers: {
              "Content-Type": "application/json", // Add this line
            },
          }
        );
  
        const userMongoId = response.data._id;
        localStorage.setItem("userMongoId", userMongoId);
        console.log("Axios POST request successful");
  
        logIn();
      } catch (error) {
        console.error("Error during POST request:", error);
        logIn();
      }
    }
    else {
      try {
        const response = await axios.post(
          "https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/employer",
          {
            companyName: name,
            industry: industry,
            email: username,
            address: address,
          },
          {
            headers: {
              "Content-Type": "application/json", // Add this line
            },
          }
          
          );
          const userMongoId = response.data._id;
          localStorage.setItem("userMongoId", userMongoId);
          console.log("Axios POST request successful");
      } catch (error) {
        console.error("Error during POST request:", error);
      }
    }
    console.log("After Axios POST request");
  };

  const logIn = async () => {
    try {
      const user = await Auth.signIn(username, password);

      console.log("Logged in user:", user);
      if (!user) {
        throw new Error("Invalid user object or access token");
      }

      const idToken = user.signInUserSession.idToken.jwtToken;
      const accessToken = user.signInUserSession.accessToken.jwtToken;

      localStorage.setItem("idToken", idToken);
      localStorage.setItem("accessToken", accessToken);
      console.log(username);

      navigate(`/completeprofile`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="user-register-page">
      <div className="form-box-register">
        <form
          onSubmit={confirmSignUp}
          className="form-value"
          style={{ marginTop: "20px" }}
        >
          <div style={{ marginBottom: "20px" }}>
            <Text label={"Confirm Account"} size={"s20"} weight={"bold"} />
          </div>
          <div className="inputbox-register">
            <input
              className="register-input"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter the code sent to your email"
              required
            />
          </div>
          {confirmationError && (
            <p className="error-message">{confirmationError}</p>
          )}
          <button className="register-btn"> <Text label={"Confirm"} size={"s16"} weight={"medium17"} /></button>
        </form>
      </div>
    </div>
  );
};

export default ConfirmSignup;
