import React, { useState, createContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "../utils/axios";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import Home from "./Home";
import About from "./AboutUs";
import Payment from "./Payment";
import CryptoPayment from "./CryptoPayment";

// export const UserContext = createContext({});

const App = () => {
  // const [userSession, setUserSession] = useState(true);

  // useEffect(() => {
  //   const fetchUserAuth = async () => {
  //     try {
  //       const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/auth/isauth`);
  //       if (!res.ok) return;
  //       console.log('userSession', userSession);
  //       setUserSession(await res.json());
  //     } catch (err) {
  //       console.log('There was an error fetch auth', err);
  //       return;
  //     }
  //   }
  //   fetchUserAuth();
  // })

  return (
    // <UserContext.Provider value={userSession}>
      <Router>
        <div className="App">
          <Routes>
            <Route exact path="/" element={ <About />} />
            <Route path="/signin" element={ <SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
            <Route path="/aboutus" element={<About />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/crypto-payment" element={<CryptoPayment />} />
          </Routes>
        </div>
      </Router>
    // </UserContext.Provider>
  );
};

export default App;
