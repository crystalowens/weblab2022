
import React from "react";
import {useState, useEffect} from "react";

import NavBar from "../../components/navigation/NavBar.js";
import {getUser} from "../../services/userSession.js";

import "../../util/utilities.css";
import "./Profile.css";

const Profile = () => {
  //TODO: fix default profile from coming up after spamming profile button
  const [user, setUser] = useState({
    highscore : 0,
    username: "default username", 
    picture: "https://images.dog.ceo/breeds/maltese/n02085936_1515.jpg"
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
       getUser().then((user)=> {
        console.log(user);
        setUser(user);
       });
  }, []);

  return (
    <>
    <div className="ProfilePage">
        <NavBar/>
        <div className="u-flex">
            <div className="Profile-subContainer u-textCenter">
            <h4 className="Profile-subTitle">About Me</h4>
            <div id="profile-description">
                All-time high score: {user.highscore}
            </div>
            <div className="Profile-avatar">
                <img src={user.picture}/>
                <h1 className="Profile-name u-textCenter">{user.username}</h1>
            </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default Profile;