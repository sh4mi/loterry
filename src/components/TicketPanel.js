import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-grid-carousel';
import Select from 'react-select';
import $ from 'jquery';
import Radio from "./Radio";
import Ticket from "./Ticket";
import "../styles/ticketpanel.css";
import axios from "../utils/axios";

const styles = {
  control: (styles) => ({ ...styles, backgroundColor: 'white', width: '250px' }),
};

const TicketPanel = (props) => {

  const navigate = useNavigate();
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null); 
  const [ticketCount, setTicketCount] = useState(5);
  const [ticketList, setTicketList] = useState([1,2,3,4,5]);
  const [paymentMethod, setPaymentMethod] = useState("crypto");
  const [boughtTickets, setBoughtTickets] = useState([]);

  const { tickets, setTickets, setTicketWarning } = props;

  // const dotRef = useRef();

  const buyNow = () => {
    console.log('tickets', tickets);

    let flag = false;
    for (let i = 0; i < tickets.length; i++) {
      if (tickets[i].length < 4) {
        flag = true;
        break;
      }
    }

    if (flag) {
      setTicketWarning(true);
      return;
    }

    localStorage.setItem('tickets', JSON.stringify(tickets));
    localStorage.setItem('totalPrice', ticketCount * 5);
    if (paymentMethod === 'paypal') {
      navigate('/payment');
    } else {
      navigate('/crypto-payment');
    }
  };

  useEffect(() => {

    let email = localStorage.getItem('email');

    console.log('email', email);

    axios.get('/api/tickets', {
      params: {
        email
      }
    }).then((res) => {
      console.log(res.data)
    }).catch((err) => {
      console.log(err);
    })

    console.log('ticketList', ticketList);
    setSelectedOption({value: 5, label: '5'});

    let _tickets = [];
    for (let i = 0; i < 5; i++) {
      _tickets.push([]);
    }
    setTickets(_tickets);

    let _options = [];
    for (let i = 0; i < 25; i++) {
      _options.push({
        value: i + 1,
        label: (i + 1).toString()
      })
    }
    setOptions(_options);
  }, []);

  const CustomDot = (props) => {

    const { index, isActive, onClick } = props;

    return(
      <span
        style={{
          display: 'inline-block',
          height: '8px',
          width: '8px',
          borderRadius: '50%',
          background: isActive ? '#795548' : '#ccc'
        }}
        className="slideDot"
        // onClick={turnToFirstPage}
      ></span>
    )
      
  };

  const handleChange = (option) => {
    $(".slideDot").first().click();

    setSelectedOption(option);
    setTicketCount(option.value);

    if (option.value >= selectedOption.value) {
      let _tickets = tickets;
      for (let i = selectedOption.value; i < option.value; i++) {
        _tickets.push([]);
      }
      setTickets(_tickets);
    } else {
      let _tickets = tickets;
      for (let i = option.value; i < selectedOption.value; i++) {
        _tickets.pop();
      }
      setTickets(_tickets);
    }

    let _ticketList = [];
    for (let i = 1; i < option.value + 1; i++) {
      _ticketList.push(i);
    }
    setTicketList(_ticketList);
  };

  return (
    <>
      <div className="ticket-count-wrapper">
        <h3 className="ticket-count">How many tickets do you want to buy?</h3>
        <Select
          value={selectedOption}
          onChange={handleChange}
          options={options}
          styles={styles}
        />
      </div>
      <Carousel cols={3} rows={1} gap={10} loop containerStyle={{padding: "8px"}} showDots={true} dot={CustomDot}>
        {ticketList.map((value, index) => {
          return (
            <Carousel.Item key={index}>
              <Ticket number={index + 1} tickets={tickets} setTickets={setTickets} />
            </Carousel.Item>
          )
        })}
      </Carousel>
      <div className='bought-tickets'>
        <ul>
          <li></li>
        </ul>
      </div>
      <div className='checkout'>
        <div className='checkout-content'>
          <div className='ticket-price-wrapper'>
            <p>Ticket Price ({ticketCount} lines)</p>
            <span>&#215; $5.00</span> 
          </div>
          <div className='total-price-wrapper'>
            <p>Total Price {ticketCount > 9 ? '(7% discounted)' : ''}</p>
            <span>${ticketCount < 10 ? (ticketCount * 5).toFixed(2) : (ticketCount * 5 * 0.93 ).toFixed(2) }</span> 
          </div>
        </div>
        <div className='button-container'>
          {/* <div className='payment-method'>
            <div className="radio-wrapper">
              <Radio
                value="paypal"
                selected={paymentMethod}
                text=""
                onChange={setPaymentMethod}
              />
              Paypal
            </div>
            <div className="radio-wrapper">
              <Radio
                value="crypto"
                selected={paymentMethod}
                text=""
                onChange={setPaymentMethod}
              />
              Crypto
            </div>
          </div> */}
          <button className='button buy-button' onClick={() => buyNow()}>Buy Now</button>
        </div>
      </div>
    </>
    
  );
};

export default TicketPanel;