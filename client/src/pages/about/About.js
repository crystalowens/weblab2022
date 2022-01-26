
import React from "react";
import NavBar from "../../components/navigation/NavBar.js";
import img6 from "../../resources/images/bored-ape-6.jpg";
// import img1 from "http://assets.nftrade.com/image/upload/w_500,c_scale/v1628952917/evm_1_0xc1caf0c19a8ac28c41fe59ba6c754e4b9bd54de9_439.png"; 

import "./About.css";
import "../../util/utilities.js";

// X people have visited this page to learn more about NFTs! 

const About = () => {
  return (
    <>
    <div className="AboutPage">
        <NavBar/>
        <div className="u-flex">
            <div className="About-subContainer u-textCenter">
              <h4 className="About-title">Imagine</h4>
              <div className="About-text">
                  <div>
                    <p>… a world defined by different currencies</p>
                    <p>… a fully digital art environment</p>
                    <p>… no “true” ownership of intangible goods</p> 
                  </div>
              </div>
              <h4 className="About-title">Would you survive?</h4>
              <div>
                <div className="About-text Padded-left">
                  <div>
                    <p>This site aims to familiarize you with NFTs, or "non-fungible tokens," which are typically static or dynamic art sold on the blockchain. By understanding how different art is priced and compared, you are equipped to better deal with our digital future. The most expensive NFT ever sold was Pak's "The Merge," sold in 2021 for over USD$91m, but art evaluated on this site is more typically between USD $25 (0.01 ETH as of Jan 2022) and USD $73,000 (30 ETH). What's the most expensive NFT you've seen?</p>
                     <p> Some quick tips for the game:</p> 
                      <p> - You'll notice certain categories are systematically more valuable, and it's not based on aesthetic appeal. </p> 
                      <p> - Within a category, interesting and bright details add value. </p> 
                      <p> - Look for other typical traits to score more points and reach a new high score! </p> 
                  </div>
                  </div>
              </div>

            </div>
        </div>
      </div>
    </>
  );
};

export default About;

