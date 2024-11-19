import React from "react"
import { useHistory } from "react-router-dom";
import Heading from "../../common/heading/Heading"
import "./Hero.css"


const Hero = () => {
  const history = useHistory(); // Create a history instance

  const handleButtonClick = () => {
    history.push("/fearfreeform"); // Navigate to the FearFreeForm page
  };
  return (
    <>
      <section className='hero'>
        <div className='container'>
          <div className='row'>
            <Heading
              subtitle='WELCOME TO Fear Free Animals'
              title={`เริ่มก้าวผ่าน ความกลัว\nไปกับเรา`}
            />
            <p>
              ปลดล็อกศักยภาพในตัวคุณ ก้าวข้ามความกลัวไปพร้อมกับเรา สู่ประสบการณ์ใหม่ที่สร้างความมั่นใจและสะสมเหรียญแลกรางวัลมากมาย ร่วมผจญภัยและเติบโตไปด้วยกันบนเว็บไซต์ของเรา!
            </p>
           
            <button className="btn1" onClick={handleButtonClick}>
              GET STARTED NOW <i className="fa fa-long-arrow-alt-right"></i>
            </button>

            
          </div>
        </div>
      </section>
      <div className='margin'></div>
    </>
  )
}

export default Hero
