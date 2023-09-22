import React from 'react';
import {Auth} from "aws-amplify"
import { useNavigate } from 'react-router-dom';
const UserSignOut = () => {
    const navigate = useNavigate();

    async function signOut() {
        try {
            await Auth.signOut();
            console.log("Signing out")
            navigate("/");
            window.location.reload();
        } catch (error) {
            console.log("error signing out:", error);
        }
    }


    return (
        <div>
        <button onClick={signOut}>Sign Out</button>    
        </div>
    );
}

export default UserSignOut;
