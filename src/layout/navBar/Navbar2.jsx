import React, { useEffect, useState } from "react";
import Text from "../../components/text/text";
import "./Navbar2.css";
import MenuBlack from "../../assets/images/pngblack.png";
import MenuWhite from "../../assets/images/png menu white.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import unicorn from "../../assets/images/Unicorn.png";

const Navbar2 = ({
  givenName,
  lastName,
  authenticated,
  employeeData,
  employerData,
  userRole,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const imageUrl =
      userRole === "employee"
        ? employeeData.profilePhoto || unicorn
        : employerData.profilePhoto || unicorn;

    const cleanImageUrl = imageUrl.replace(/&quot;/g, "");

    setImageUrl(cleanImageUrl);
  }, [userRole, employeeData, employerData]);

  const goHome = () => {
    navigate("/");
  };

  const handleMenu = () => {
    if (location.pathname.startsWith("/menu")) {
      navigate("/");
    } else {
      navigate("/menu");
    }
  };

  const whiteTextRoutes = ["/signup", "/signin"];
  const isWhiteTextRoute = whiteTextRoutes.includes(location.pathname);

  const navbarStyle = {
    backgroundColor: isWhiteTextRoute ? "#222" : "white",
    color: isWhiteTextRoute ? "white" : "black",
  };

  if (location.pathname.startsWith("/postjob")) {
    return null;
  }

  return (
    <>
    <div className="navbar-container" style={navbarStyle}>
      <div className="navbar">
        <div className="app-name" onClick={goHome}>
          <Text
            label={"Career"}
            weight={"medium800"}
            lineheight={"l24"}
            size={"s20"}
            color={isWhiteTextRoute ? "white" : "black"}
          />
          <Text
            label={"Crush"}
            weight={"medium800"}
            lineheight={"l24"}
            size={"s20"}
            color={"purple"}
          />
        </div>
        <div>
          {authenticated ? (
            <div className="nav-profile">
              <Link to={"/profile"} style={{ textDecoration: "none" }}>
                <Text
                  label={`${givenName} ${lastName}`}
                  size={"s16"}
                  color={"black"}
                />
              </Link>
              <div
                className="nav-profile-pic"
                alt={`${givenName} profile`}
                style={{ backgroundImage: `url(${imageUrl ?? unicorn})` }}
              />
            </div>
          ) : (
            <img
              src={isWhiteTextRoute ? MenuWhite : MenuBlack}
              alt="Menu"
              onClick={handleMenu}
            />
          )}
        </div>
      </div>
    </div>
    {isWhiteTextRoute ? <div style={{clear:"both", height:"80px",backgroundColor: "#212121"}}></div> : null}
    
    </>
  );
};

export default Navbar2;
