import React from "react"

const Head = () => {
  return (
    <>
      <section className='head'>
        <div className='container flexSB'>
          <div className='logo'>
            <h1>
              <img
                src={`${process.env.PUBLIC_URL}/images/logo.png`}
                alt="Fear Free Logo"
                className="logo-icon"
              />
              Fear Free Animals
            </h1>
            <span></span>
          </div>

          <div className='social'>
            <i className='fab fa-facebook-f icon'></i>
            <i className='fab fa-instagram icon'></i>
            <i className='fab fa-twitter icon'></i>
            <i className='fab fa-youtube icon'></i>
          </div>
        </div>
      </section>
    </>
  )
}

export default Head