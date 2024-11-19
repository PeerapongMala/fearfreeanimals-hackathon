import React from "react"
import { blog } from "../../../dummydata"
import "./footer.css"

const Footer = () => {
  return (
    <>
      {/* <section className='newletter'>
        <div className='container flexSB'>
          <div className='left row'>
            <h1>Newsletter - Stay tune and get the latest update</h1>
            <span>Far far away, behind the word mountains</span>
          </div>
          <div className='right row'>
            <input type='text' placeholder='Enter email address' />
            <i className='fa fa-paper-plane'></i>
          </div>
        </div>
      </section> */}
      <footer>
        <div className='container padding'>
          <div className='box logo'>
            <h2>FearFree Animals</h2>
            <span></span>
            {/* <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p> */}

            {/* <i className='fab fa-facebook-f icon'></i>
            <i className='fab fa-twitter icon'></i>
            <i className='fab fa-instagram icon'></i> */}
          </div>
          {/* <div className='box link'>
            <h3>Explore</h3>
            <ul>
              <li>About Us</li>
              <li>Services</li>
              <li>Courses</li>
              <li>Blog</li>
              <li>Contact us</li>
            </ul>
          </div> */}
          {/* <div className='box link'>
            <h3>Quick Links</h3>
            <ul>
              <li>Contact Us</li>
              <li>Pricing</li>
              <li>Terms & Conditions</li>
              <li>Privacy</li>
              <li>Feedbacks</li>
            </ul>
          </div> */}
          {/* <div className='box'>
            <h3>Recent Post</h3>
            {blog.slice(0, 3).map((val) => (
              <div className='items flexSB'>
                <div className='img'>
                  <img src={val.cover} alt='' />
                </div>
                <div className='text'>
                  <span>
                    <i className='fa fa-calendar-alt'></i>
                    <label htmlFor=''>{val.date}</label>
                  </span>
                  <span>
                    <i className='fa fa-user'></i>
                    <label htmlFor=''>{val.type}</label>
                  </span>
                  <h4>{val.title.slice(0, 40)}...</h4>
                </div>
              </div>
            ))}
          </div> */}
          <div className='box last'>
            <h3>ติดต่อสอบถาม</h3>
            <ul>
              <li>
                <i className='fa fa-map'></i>
                239 ถ.ห้วยแก้ว ต.สุเทพ อ.เมือง จ.เชียงใหม่ 50200
              </li>
              <li>
                <i className='fa fa-phone-alt'></i>
                +089-644-5512
              </li>
              <li>
                <i className='fa fa-paper-plane'></i>
                fearfreeanimals@gmail.com
              </li>
            </ul>
          </div>
          {/* <i className='fab fa-facebook-f icon'></i>
            <i className='fab fa-twitter icon'></i>
            <i className='fab fa-instagram icon'></i> */}
        </div>
        
      </footer>
      <div className='legal'>
        <p>
          ©2024 FearFree Animals | ก้าวผ่านความกลัวสัตว์ สู่โลกใหม่ที่คุณมั่นใจยิ่งขึ้น <i className='fa fa-heart'></i> by FearFree Animals
        </p>
      </div>
    </>
  )
}

export default Footer
