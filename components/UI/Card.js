import React, { useContext } from 'react'
import styles from "../../styles/Card.module.css"
import { userContext } from "../../pages/_app"
const Card = (props) => {

    const dated = new Date(props.ride.date);
    let suffix = "th";
    if (dated.getDate() % 10 == 1) {
        suffix = "st";
    } else if (dated.getDate() % 20 == 2) {
        suffix = "nd";
    } else if (dated.getDate() % 10 == 3) {
        suffix = "rd";
    }

    dated = `${dated.getDate()}${suffix} ${dated.toLocaleString('default', { month: 'short' })} ${dated.getFullYear()} ${dated.toLocaleString('en-US', { hour: 'numeric', hour12: true, minute:'2-digit'})}`

    const { userState, userDispatch } = useContext(userContext);
    let minDistance = Number.MAX_SAFE_INTEGER;


    userState.station_code && props.ride.station_path.forEach((each, index) => {
        minDistance = Math.min(Math.abs(parseInt(userState.station_code) - parseInt(each)), minDistance)
    })

    return (
        <div className={styles.CardContainer}>
            <div className={styles.imageInfoContainer}>
                <div className={styles.imageContainer}>
                    <img src={props.ride.map_url} alt="Map" />
                </div>
                <div className={styles.infoContainer}>
                    <div className={styles.subInfoContainer}>
                        <label>Ride Id : </label>
                        <span> {props.ride.id}</span>
                    </div>
                    <div className={styles.subInfoContainer}>
                        <label>Origin Station : </label>
                        <span> {props.ride.origin_station_code}</span>
                    </div>
                    <div className={styles.subInfoContainer}>
                        <label>station_path : </label>
                        <span>[{props.ride.station_path.map((each, index) => {

                            if (index != props.ride.station_path.length - 1) {
                                return React.Children.toArray(<span id={index} key={index}>{each}, </span>)
                            }
                            else {
                                return React.Children.toArray(<span id={index} key={index}>{each}</span>)
                            }

                        })}] </span>
                    </div>
                    <div className={styles.subInfoContainer}>
                        <label>Date :</label>
                        <span>{dated}</span>
                    </div>
                    <div className={styles.subInfoContainer}>
                        <label>Distance :</label>
                        <span>{minDistance}</span>
                    </div>
                </div>
            </div>
            <div className={styles.areaInfoContainer}>
                <span>{props.ride.state}</span>
                <span>{props.ride.city}</span>
            </div>
        </div>
    )
}

export default Card