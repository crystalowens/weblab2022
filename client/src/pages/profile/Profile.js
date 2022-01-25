
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
    username: "Please log in", 
    picture: "https://imgix.ranker.com/user_node_img/50012/1000224926/original/charcoal-photo-u1"
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
      console.log('loading profile');
       getUser().then((user)=> {
        console.log(user);
        setUser(user);
        setLoading(false);
       });
  }, []);

  return (
    <>
    <div className="ProfilePage">
        <NavBar/>
        <div className = "ProfileOuterBox">
        <div className="u-flex ProfileInnerBox ">
            <div className="Profile-avatar">
                {loading ? (<></>): (<img src={user.picture}/>)}
            </div>
            <div className="Profile-subContainer u-textCenter">
            <h1 className="Profile-name u-textLeft">Player: {user.username}</h1>
            <div className="ProfileDescription">
              <div>
                All-time high score: {user.highscore} points
                </div>
                <div>
                {user.highscore === 0 ? "Amateur! Keep playing :)" : 
                user.highscore >= 5 ? "You have a few points! But I think you just got lucky ;)" :
                user.highscore >= 10 ? "Wow, you'd have to play at least 32 times to get that many points by luck! Keep playing to improve! :)" :
                user.highscore >= 20 ? "You are an expert evaluator! Keep playing to improve! :)" :
                user.highscore >= 100 ? "Appraiser extraordinaire! Keep playing to stay sharp! :)" :
                ""}
                </div>
            </div>
            </div>

            </div>
        </div>
      </div>
    </>
  );
};

export default Profile;