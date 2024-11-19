import React from "react"
import AboutCard from "../about/AboutCard"
import Hblog from "./Hblog"
import HAbout from "./HAbout"
import Hero from "./hero/Hero"
import Hprice from "./Hprice"
import Testimonal from "./testimonal/Testimonal"
import AnimalModelViewer from "../../AnimalModelViewer"
const Home = () => {
  return (
    <>
      <Hero />
      <AboutCard />
       {/* <HAbout />   */}
      / <Testimonal />
      {/* <AnimalModelViewer /> */}

      {/* <Hblog /> */}
      {/* <Hprice /> */}
    </>
  )
}

export default Home
