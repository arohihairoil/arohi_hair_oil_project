import React from 'react'

import LatestCollection from '../components/LatestCollection'
import Marquee from '../components/Marquee'
import OurPolicy from '../components/OurPolicy'

const Home = () => {
  return (
    <div>
      <Marquee/>
      <LatestCollection/>
      <OurPolicy/>
    </div>
  )
}

export default Home
