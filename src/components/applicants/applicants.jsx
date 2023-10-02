import React, { useEffect, useState } from "react";
import "./applicants.css";
import unicorn from "../../assets/images/Unicorn.png";
import accept from "../../assets/icons/accept.svg"
import decline from "../../assets/icons/dislike.svg"
import Text from "../text/text";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Applicants = ({userid, postId, name, lastname, role }) => {
  const navigate = useNavigate();
  const [user,setUser] = useState({});

 

  const viewApplicant = () =>{
    navigate(`/applicant/${userid}`)
  }

  return (

      <div className="applicants-desc" onClick={viewApplicant}>
        <div className="applicant-photo" style={{ backgroundImage: `url(${unicorn})`, lightgray:"50%" }} >
        </div>
        <div className="applicant-info">
          <Text label={`${name} ${lastname}`} size={"s16"} weight={"medium"} color={"black"}/>
          <Text label={`${role}`} size={"s14"} weight={"regular"} color={"black"}/>
        </div>
      </div>
      
  );
};

export default Applicants;
