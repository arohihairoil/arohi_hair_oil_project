import React from 'react'

import LatestCollection from '../components/LatestCollection'
// import Marquee from '../components/Marquee'
import OurPolicy from '../components/OurPolicy'
import Hero from "../components/Hero";

const Home = () => {
  return (
    <div>
      {/* <Marquee /> */}
      <Hero />
      <LatestCollection />
      <OurPolicy />
    </div>
  );
};

export default Home
