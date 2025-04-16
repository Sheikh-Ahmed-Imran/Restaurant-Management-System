import React, { useState } from 'react'
import './Home.css'

import { Header } from '../../components/HomePage/Navbar'
import { Hero } from '../../components/HomePage/HeroSection'
import { Features } from '../../components/HomePage/Features'
import { Pricing } from '../../components/HomePage/Pricing'
import { Testimonials } from '../../components/HomePage/Testemonials'
import { Contact } from '../../components/HomePage/Contact'
import { Footer } from '../../components/HomePage/Footer'
import { Timeline } from '../../components/HomePage/Timeline/Timeline'

const Home = () => {
  const [category, setCategory] = useState("All")

  return (
    <div className=" min-h-screen flex flex-col ">
 
    <main className="flex-1 space-y-10 px-4 py-8">
      <Hero />
      <Timeline />
      <Features />
      <Pricing />
      <Testimonials />
      <Contact />
    </main>
    <Footer />
  </div>
  )
}

export default Home
