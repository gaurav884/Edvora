import React, { useEffect, useContext } from 'react'
import Card from "../components/UI/Card"
import { rideContext } from "../pages/_app"

const UpcomingRides = () => {

  const { rideState, rideDispatch } = useContext(rideContext);

  

  let upcomingRides = rideState.filter((each, index) => {
    const rideTime = new Date(each.date).getTime()
    const now = new Date().getTime()
    return rideTime > now;
  })

  if (upcomingRides.length === 0) {
    return <div className="nothing-error"><p>No upcoming Rides</p></div>
  }

 

  return (<>
    {upcomingRides &&
      upcomingRides.map((each, index) => {
        return <Card ride={each} key={index} />
      })
    }
  </>
  )
}

export default UpcomingRides