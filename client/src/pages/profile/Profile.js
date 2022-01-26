
import React from "react";
import {useState, useEffect, useContext} from "react";

import NavBar from "../../components/navigation/NavBar.js";
import { UserProfileContext } from "../../contexts/UserProfileContext";
import {getUser} from "../../services/userSession.js";

import "../../util/utilities.css";
import "./Profile.css";

const Profile = () => {
  /*
  const [user, setUser] = useState({
    highscore : 0,
    username: "", 
    picture: "https://imgix.ranker.com/user_node_img/50012/1000224926/original/charcoal-photo-u1"
  });*/

  /*useEffect(() => {
      console.log('loading profile');
       getUser().then((user)=> {
        console.log(user);
        setUser(user);
        setLoading(false);
       });
  }, []);*/
  const [user, setUser] = useState({
    highscore : 0,
    username: "", 
    picture: "https://imgix.ranker.com/user_node_img/50012/1000224926/original/charcoal-photo-u1"
  });
  const {userProfile} = useContext(UserProfileContext);
  useEffect(()=>{
    console.log(`Profile changed to ${userProfile}`);
    if(userProfile){
      setUser(userProfile);
    }
  },[userProfile]);
  return (
    <>
    <div className="ProfilePage">
        <NavBar/>
        <div className = "ProfileOuterBox">
        <div className="u-flexColumn ProfileInnerBox ">
            <div className="Profile-avatar">
                <img src={user.picture}/>
            </div>
            <div className="Profile-subContainer u-textCenter">
            <h1 className="Profile-name u-textLeft">{user.username}</h1>
            <div className="ProfileDescription">
              <div>
                All-time high score: {user.highscore} points
                </div>
                <div>
                {user.highscore === 0 ? "You're new at this! Keep playing to earn points." : 
                user.highscore <= 2 ? "You have a single point! But I think you just got lucky ;)" :
                user.highscore <= 5 ? "You have a few points! But I think you just got lucky ;)" :
                user.highscore <= 10 ? "Okay...maybe you aren't lucky...maybe you got some skill! Keep playing to improve!" :
                user.highscore <= 20 ? "You are an expert NFT Guesser! Keep playing to improve!" :
                user.highscore <= 100 ? "NFT Guesser extraordinaire! Keep playing to stay sharp!" :
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