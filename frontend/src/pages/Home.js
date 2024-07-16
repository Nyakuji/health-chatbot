import React from 'react'
import HeroSection from '../components/Sections/HeroSection'
import Highlights from '../components/Sections/Highlights'
import FeaturesSection from '../components/Sections/FeaturesSection'
import FAQSection from '../components/Sections/FAQSection'
import Footer from '../components/Sections/Footer'

const Home = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <Highlights />
      <FAQSection />
      <Footer />
    </>
  )
}

export default Home
