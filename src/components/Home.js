import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
// import { Col, Layout, Row, InputNumber, Button, Space, Card } from "antd";
import { Container, Row, Col } from "react-bootstrap";
import CountDown from "react-countdown";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import NavBar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Ticket from "./Ticket";
import TicketPanel from "./TicketPanel";
import "../styles/home.css";
import "../styles/global.css";

const Completionist = () => <span>Lottery finished</span>;

const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <div className="counter-wrapper">
        <div className="counter-item-wrapper">
          <div className="counter-item">
            {days.toLocaleString('en-US', {
              minimumIntegerDigits: 2,
              useGrouping: false})}
          </div>
          days
        </div>
        :
        <div className="counter-item-wrapper">
          <div className="counter-item">
            {hours.toLocaleString('en-US', {
              minimumIntegerDigits: 2,
              useGrouping: false})}
          </div>
          hours
        </div>
        :
        <div className="counter-item-wrapper">
          <div className="counter-item">
            {minutes.toLocaleString('en-US', {
              minimumIntegerDigits: 2,
              useGrouping: false})}
          </div>
          minutes
        </div>
        :
        <div className="counter-item-wrapper">
          <div className="counter-item">
            {seconds.toLocaleString('en-US', {
              minimumIntegerDigits: 2,
              useGrouping: false})}
          </div>
          seconds
        </div>
      </div>
    )
  }
};

const Home = () => {

  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [ticketWarning, setTicketWarning] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    if (ticketWarning) {
      toast.error('Some tickets have not been completed!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [ticketWarning])

  return (
    <Container style={{paddingTop: "100px"}}>
      <NavBar loginHidden={false} signinHidden={true} />
      <button className="back-btn" onClick={() => navigate(-1)}><FontAwesomeIcon icon={faAngleLeft} size="lg"/> Back</button>
      <h3 className="main-title">Choose your numbers and win</h3>
      <div className="main-title-description">
        <p>Play official lottery game to earn money. <br /> You can earn much money in a week.</p>
      </div>
      <div className="winning-number-wrapper" style={{}}>
        <div className="winning-number-container">
          <div className="winning-number-header">
            Last Week Winning numbers
          </div>
          <div className="winning-numbers">
            Monday:
            <div className="winning-number-box-small">2</div>
            <div className="winning-number-box-small">16</div>
            <div className="winning-number-box-small">21</div>
            <div className="winning-number-box-small">35</div>
            <div className="winning-number-box-small">37</div>
            <div className="winning-number-box-small">46</div>
          </div>
          <div className="winning-numbers">
            Thursday:
            <div className="winning-number-box-small">2</div>
            <div className="winning-number-box-small">16</div>
            <div className="winning-number-box-small">21</div>
            <div className="winning-number-box-small">35</div>
            <div className="winning-number-box-small">37</div>
            <div className="winning-number-box-small">46</div>
          </div>
        </div>
      </div>
      <div className="winning-number-wrapper">
        <div className="winning-number-container">
          <div className="winning-number-header">
            Thursday Winning numbers
          </div>
          <div className="winning-numbers">
            <div className="winning-number-box">2</div>
            <div className="winning-number-box">16</div>
            <div className="winning-number-box">21</div>
            <div className="winning-number-box">35</div>
            <div className="winning-number-box">37</div>
            <div className="winning-number-box">46</div>
          </div>
        </div>
      </div>
      <div className="prize-pool-container">
        <div className="prize-pool-wrapper">
          <div className="prize-pool">
            Prize pool
            <div className="pool-amount">
              <span>$</span>5000
            </div>
          </div>
          <CountDown
            date={Date.now() + 7 * 24 * 60 * 60 * 1000}
            renderer={renderer}
          />
        </div>
      </div>
      <TicketPanel tickets={tickets} setTickets={setTickets} setTicketWarning={setTicketWarning}/>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
      <ToastContainer />
    </Container>
  );
};

export default Home;
