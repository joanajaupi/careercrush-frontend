import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Card from '../../components/cards/cards';
import Tabs from '../../components/button/tabs';
import unicorn from "../../assets/images/Unicorn.png";
import "./userHome.css";
import Footer from '../../layout/footer/footer';
import Navbar2 from '../../layout/navBar/Navbar2';

const UserHome = () => {
  const [posts, setPosts] = useState({})
  const [selectedButton, setSelectedButton] = useState('All');
  const [buttonsData, setButtonsData] = useState([]);

  const loadTabs = async () => {
    try {
      const response = await axios.get("https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/category")
      console.log(response)
      setButtonsData(response.data)
    } catch (error) {
      console.error("Error fetching categories.")
    }
  }
  const loadPosts = async () => {
    try {
      const response = await axios.get(
        `https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/posts`
      );
      setPosts(response.data.posts);
      console.log(response.data.posts.profilePhoto);
    } catch (error) {
      console.error("something went wrong");
    }
  };

  useEffect(() => {
    loadPosts();
    loadTabs()
    console.log("selectedButton:", selectedButton);
  }, [],[selectedButton]);
  

  return (
    <div>
       <div className="button-row">
          {buttonsData.map((buttonName, index) => (
            <Tabs
              buttonName={buttonName.name}
              key={index}
              selected={selectedButton === buttonName}
              onClick={() => setSelectedButton(buttonName)}
            />
          ))}
        </div>
        <div className="event-component">
          {posts.map((us, index) => (
            <Card
              key={index}
              category={us.category.name}
              title={us.position}
              info={us.creatorId.companyName}
              background={us.creatorId.profilePhoto}
            />
          ))}
        </div>
        <div className='footer'>
        <Footer />
        </div>
    </div>
  );
};

export default UserHome;
