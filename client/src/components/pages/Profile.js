import { get } from "../../utilities"
import "../../utilities.css";
import "./Profile.css";
import React from "react";
import NavBar from "../Util/NavBar";
import img6 from "../../../images/bored-ape-6.jpg";

const Profile = () => {
  return (
    <>
    <div className="ProfilePage">
        <NavBar/>
        <div className="u-flex">
            <div className="Profile-subContainer u-textCenter">
            <h4 className="Profile-subTitle">About Me</h4>
            <div id="profile-description">
                All-time high score: 0
            </div>
            <div className="Profile-avatar">
                <img src={img6}/>
                <h1 className="Profile-name u-textCenter">User 1</h1>
            </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default Profile;