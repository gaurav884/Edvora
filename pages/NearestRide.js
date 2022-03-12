import React, { useEffect, useContext } from 'react'
import Card from "../components/UI/Card"
import { rideContext } from "../pages/_app"
import { userContext } from "../pages/_app"



const NearestRide = () => {

  const { rideState, rideDispatch } = useContext(rideContext);
  const { userState, userDispatch } = useContext(userContext);
  const nearestRides = [...rideState];


  

  nearestRides.sort((a, b) => {
       let minDistance1 =Number.MAX_SAFE_INTEGER;
       let minDistance2 =Number.MAX_SAFE_INTEGER;

       a.station_path.forEach((each) => {
         minDistance1 = Math.min(Math.abs(parseInt(each)-parseInt(userState.station_code)) , minDistance1);
       })

       b.station_path.forEach((each) => {
        minDistance2 = Math.min(Math.abs(parseInt(each)-parseInt(userState.station_code)) , minDistance2);
      })
     
      return minDistance1-minDistance2;
  })


  if(nearestRides.length===0){
    return <div className="nothing-error"><p>No rides in this location.</p></div>
  }

 

 

  return (<>
    
    {nearestRides &&
      nearestRides.map((each, index) => {
        return <Card ride={each} key={index} />
      })
    }

  </>
  )
}

export default NearestRide