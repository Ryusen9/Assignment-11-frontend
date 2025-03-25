import React from 'react'
import Hero from '../Components/Hero'
import CardContainer1 from '../Components/CardContainer1'
import Reason from '../Components/Reason'
import MarathonEvents from '../Components/MarathonEvents'

const HomeLayout = () => {
  return (
    <>
        <Hero/>
        <CardContainer1/>
        <Reason/>
        <MarathonEvents/>
    </>
  )
}

export default HomeLayout