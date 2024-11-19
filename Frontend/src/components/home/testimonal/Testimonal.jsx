import React from "react";
import { useHistory } from "react-router-dom"; // import useHistory
import { testimonal } from "../../../dummydata";
import Heading from "../../common/heading/Heading";
import "./style.css";

const Testimonal = () => {
  const history = useHistory(); // Initialize history for navigation

  const handleClick = () => {
    history.push("/registerdoc"); // Navigate to CategoriesPage
  };

  return (
    <>
      <section className='testimonal padding'>
        <div className='container'>
          <Heading subtitle='ผู้ได้รับการรักษา' title='ลงทะเบียนได้ที่นี่!' />

          <div className='content grid2'>
            {testimonal.map((val) => (
              <div className='items shadow' onClick={handleClick} key={val.id}>
                <div className='box flex'>
                  <div className='img'>
                    <img src={val.cover} alt='' />
                    <i className='fa fa-quote-left icon'></i>
                  </div>
                  <div className='name'>
                    <h2>{val.name}</h2>
                    <span>{val.post}</span>
                  </div>
                </div>
                <p>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonal;
