import React, { useEffect, useContext } from 'react'
import Card from "../components/UI/Card"
import { rideContext } from "../pages/_app"

const PastRide = () => {

  const { rideState, rideDispatch } = useContext(rideContext);

  
  let pastRides = rideState.filter((each, index) => {
    const rideTime = new Date(each.date).getTime()
    const now = new Date().getTime()
    return rideTime < now;
  })


  if (pastRides.length === 0) {
    return <div className="nothing-error"><p>No Past Rides</p></div>
  }



  return (<>
    {pastRides &&
      pastRides.map((each, index) => {
        return <Card ride={each} key={index} />
      })
    }
  </>
  )
}

export default PastRide