import '../styles/globals.css'
import Layout from "../components/layout/Layout"
import React, { useEffect } from 'react';
import { createContext, useReducer } from "react"
import Head from 'next/head'
export const rideContext = createContext(null);
export const userContext = createContext(null);
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

function reducer1(state, action) {
  if (action.type === "ADD") {
    return action.payload
  }
  else {
    return null;
  }
}

function reducer2(state, action) {
  if (action.type === "ADD") {
    return action.payload
  }
  else {
    return null;
  }
}

function MyApp({ Component, pageProps }) {

  const [rideState, rideDispatch] = useReducer(reducer1, []);
  const [userState, userDispatch] = useReducer(reducer2, []);


  useEffect(() => {
    Loading.circle();
    (async () => {
      try {
        const response = await Promise.all([                                       ///takes array of promises
        fetch("https://assessment.api.vweb.app/rides"),
        fetch('https://assessment.api.vweb.app/user')
    ])
       Loading.remove();
          const data = await Promise.all([
            response[0].json(),
            response[1].json()
        ])
        Loading.remove();
          rideDispatch({type:"ADD" , payload:data[0]})
          userDispatch({type:"ADD" , payload:data[1]})
        }
      
      catch (e) {
        Notify.failure('Something went wrong. Please try again .');
      
      }
    })();
  }, [])


  return <>
  <Head>
      <title>Edvora</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    
 <userContext.Provider value={{ userState, userDispatch }}>
    <rideContext.Provider value={{ rideState, rideDispatch }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </rideContext.Provider>
    </userContext.Provider>
  </>
}


export default MyApp
