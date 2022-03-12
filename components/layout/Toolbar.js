import React, { useEffect, useContext, useState } from 'react'
import styles from "../../styles/Toolbar.module.css"
import Link from "next/link"
import { useRouter } from "next/router"
import { rideContext } from "../../pages/_app"
import { BsFilterLeft } from 'react-icons/bs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { numbersContext } from "./Layout"

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}




const Toolbar = () => {

  const router = useRouter();
  const [locationData, setLocationData] = useState([]);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const { rideState, rideDispatch } = useContext(rideContext);
  const [isDropped, setIsDropped] = useState(false)
 
  
  useEffect(() => {
   try {
        (async () => {
          const response = await fetch("https://assessment.api.vweb.app/rides");
         

          if (!response.ok) {
            Notify.failure('Something went wrong. Please try again.');
          }
          else {
            const data = await response.json();

            setLocationData(data)
          }
        })();
      }
      catch (e) {
        Notify.failure('Something went wrong. Please try again.');
      
      }
  

    
  }, [])

  useEffect(() => {
    
    const newdata = locationData.filter((each, index) => {

      if (state.trim() === "" && city.trim() === "") {
        return true;
      }

      else if (state.trim() != "" && city.trim() != "") {
        return each.state === state && each.city === city;
      }

      else if (state == "" && city.trim() != "") {
        return each.city === city;
      }

      else if (city === "" && state.trim() != "") {
        return each.state === state;
      }

    })

    rideDispatch({ type: "ADD", payload: newdata });
  }, [state, city])

 


  function stateHandler(value) {
    setCity("");
    setState(value)
  }

  function cityHandler(value) {
    setCity(value)
  }

  let pastRides = rideState.filter((each, index) => {
    const rideTime = new Date(each.date).getTime()
    const now = new Date().getTime()
    return rideTime < now;
  })

  
  let upcomingRides = rideState.filter((each, index) => {
    const rideTime = new Date(each.date).getTime()
    const now = new Date().getTime()
    return rideTime > now;
  })

  const pasRidesNum = pastRides.length;
  const upcomingRidesNum = upcomingRides.length;


 ;
  let states = locationData.map((each, index) => {
    return each.state;
  })
  states = states.filter(onlyUnique)
  let cities = rideState.map((each, index) => {
      return each.city;
    })
  
    cities = cities.filter(onlyUnique)



  return (
    <div className={styles.toolbarContainer}>
      <div className={styles.toolbarLinksContainer} >
        <ul>
          <li className={router.pathname === "/NearestRide" ? styles.activeLink : null}><Link href="/NearestRide" >Nearest Rides </Link></li>
          <li className={router.pathname === "/UpcomingRides" ? styles.activeLink : null}><Link href="/UpcomingRides" >Upcoming Rides </Link><span className={styles.freqSpan}>({upcomingRidesNum})</span></li>
          <li className={router.pathname === "/PastRide" ? styles.activeLink : null}><Link href="/PastRide" className={router.pathname === "/PastRide" ? styles.activeLink : null}>Past Rides </Link><span className={styles.freqSpan}>({upcomingRidesNum})</span></li>
        </ul>
      </div>

      <div className={styles.toolbarFilterContainer} >
        <BsFilterLeft style={{ cursor: "pointer" }} onClick={() => { setIsDropped(!isDropped) }} />
        <span className={styles.filterHeading} onClick={() => { setIsDropped(!isDropped) }}>Filters</span>
        <div className={styles.filterDropDownContainer}>
          <div className={isDropped ? `${styles.dropped} ${styles.dropDownContainer}` : styles.dropDownContainer}>

            <select name="states" id="states" value={state} onChange={(e) => { stateHandler(e.target.value) }}>
              <option value="">State</option>
              {
                React.Children.toArray(
                  (states.map((each, index) => {
                    return <option value={each} key={index}>{each}</option>
                  }))
                )

              }
            </select>
            <br />
            <select name="cities" id="cities" value={city} onChange={(e) => { cityHandler(e.target.value) }}>
              <option value="">City</option>
              {
                React.Children.toArray(
                  (cities.map((each, index) => {
                    return <option value={each} key={index}>{each}</option>
                  }))
                )

              }
            </select>

          </div>
        </div>
      </div>
    </div>
  )
}



export default Toolbar