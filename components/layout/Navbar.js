import React,{useContext} from 'react'
import styles from "../../styles/Navbar.module.css"
import {userContext} from "../../pages/_app"
const Navbar = () => {
   const {userState , userDispatch} = useContext(userContext);
   
  return (
    <div className={styles.navbarContainer}>
      <div className={styles.brandContainer}>
        <h1>Edvora</h1>
      </div>
      <div className={styles.profileInfoContainer}>
        <div className={styles.profileNameContainer}>
          <p>{userState.name}</p>
        </div>
        <div className={styles.profileImageContainer}>
          <img src={userState.url} alt={userState.name} />
        </div>

      </div>
    </div>
  )
}

export default Navbar