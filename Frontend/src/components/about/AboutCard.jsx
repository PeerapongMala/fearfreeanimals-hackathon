import React from "react";
import { Link } from "react-router-dom";
import Heading from "../common/heading/Heading";
import "./about.css";
import { homeAbout } from "../../dummydata";
import Awrapper from "./Awrapper";

const AboutCard = () => {
  return (
    <>
      <section className="aboutHome">
        <div className="container flexSB">
          <div className="left row">
            <img src="./images/about.webp.png" alt="" />
          </div>
          <div className="right row">
            <Heading subtitle="" title="" />
            <div className="items">
              {homeAbout.map((val) => {
                // Define the link based on the item's title
                const linkPath = val.title === "ประเมินความกลัว" ? "/fearfreeform" : "/categories";

                return (
                  <Link to={linkPath} key={val.id} className="item-link">
                    <div className="item flexSB">
                      <div className="img">
                        <img src={val.cover} alt="" />
                      </div>
                      <div className="text">
                        <h2>{val.title}</h2>
                        <p>{val.desc}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutCard;
