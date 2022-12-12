import React, { useState, useRef } from 'react';
import { usePaymentInputs } from 'react-payment-inputs';

export default function PaymentInputs(props) {
  const { editable } = props;
  // const [_editable, setEditable] = useState(editable);

  const { meta, getExpiryDateProps, getCVCProps } = usePaymentInputs();
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [num3, setNum3] = useState("");
  const [num4, setNum4] = useState("");

  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCVC] = useState("");

  const handleChangeCardNumber = (event) => {
    setCardNumber(event.target.value);
  }
  const handleChangeExpiryDate = (event) => {
    setExpiryDate(event.target.value);
  }
  const handleChangeCVC = (event) => {
    setCVC(event.target.value);
  }

  const handleNum1 = (event) => {
    setNum1(event.target.value);
    if (event.target.value.length === 4) {
      inputRef2.current.focus();
      if (num2.length + num3.length + num4.length === 12) {
        setCardNumber(event.target.value.concat(num2, num3, num4));
      }
    }
    
  }
  const handleNum2 = (event) => {
    setNum2(event.target.value);
    if (event.target.value.length === 4) {
      inputRef3.current.focus();
      if (num1.length + num3.length + num4.length === 12) {
        setCardNumber(num1.concat(event.target.value, num3, num4));
      }
    } else if (event.target.value.length === 0) {
      inputRef1.current.focus();
    }
  }
  const handleNum3 = (event) => {
    setNum3(event.target.value);
    if (event.target.value.length === 4) {
      inputRef4.current.focus();
      if (num1.length + num2.length + num4.length === 12) {
        setCardNumber(num1.concat(num2, event.target.value, num4));
      }
    } else if (event.target.value.length === 0) {
      inputRef2.current.focus();
    }
  }
  const handleNum4 = (event) => {
    setNum4(event.target.value);
    if (event.target.value.length === 0) {
      inputRef3.current.focus();
    }
    if (event.target.value.length === 4 && num1.length + num2.length + num3.length === 12) {
      setCardNumber(num1.concat(num2, num3, event.target.value));
    }
  }
  return (
    <div className="payment-card">
      <h6>Card Number</h6>
      <p>Enter the 16-digit card number on the card</p>
      <div className='number-wrapper'>
        <div className="cardnum-input-list d-flex align-items-center">
          <svg className="icon" width="26" height="17" viewBox="0 0 26 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.3286 1.73325H9.36914V14.4717H16.3286V1.73325Z" fill="#FF5A00"/>
            <path d="M9.8318 8.1025C9.8318 5.51442 11.026 3.2174 12.8586 1.73325C11.5099 0.65292 9.80864 0 7.95295 0C3.55695 0 0 3.62384 0 8.1025C0 12.5812 3.55695 16.205 7.95295 16.205C9.80864 16.205 11.5099 15.5521 12.8586 14.4717C11.0235 13.0086 9.8318 10.6906 9.8318 8.1025Z" fill="#EB001B"/>
            <path d="M25.717 8.1025C25.717 12.5812 22.16 16.205 17.764 16.205C15.9083 16.205 14.2071 15.5521 12.8584 14.4717C14.7141 12.985 15.8852 10.6906 15.8852 8.1025C15.8852 5.51442 14.6909 3.2174 12.8584 1.73325C14.2045 0.65292 15.9057 0 17.7614 0C22.16 0 25.717 3.64744 25.717 8.1025Z" fill="#F79E1B"/>
          </svg>
          <input className="cardnum-input" id="num1" name="num1" value={num1} maxLength="4" placeholder="0000" ref={inputRef1} onChange={handleNum1} />
          <p className="dash">-</p>
          <input className="cardnum-input" id="num2" name="num2" value={num2} maxLength="4" placeholder="0000" ref={inputRef2} onChange={handleNum2} />
          <p className="dash">-</p>
          <input className="cardnum-input" id="num3" name="num3" value={num3} maxLength="4" placeholder="0000" ref={inputRef3} onChange={handleNum3} />
          <p className="dash">-</p>
          <input className="cardnum-input" id="num4" name="num4" value={num4} maxLength="4" placeholder="0000" ref={inputRef4} onChange={handleNum4} />
        </div>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18457 2.99721 7.13633 4.39828 5.49707C5.79935 3.85782 7.69279 2.71538 9.79619 2.24015C11.8996 1.76491 14.1003 1.98234 16.07 2.86" stroke="#34A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 4L12 14.01L9 11.01" stroke="#34A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div className='number-wrapper'>
        <div className='cvv-number'>
          <div>
            <h6>CVV Number</h6>
            <p style={{marginBottom: "0px"}}>Enter the 3-digit number on the card</p>
          </div>
          <input className="cvv" maxLength="3" {...getCVCProps({ onChange: handleChangeCVC })} value={cvc}  placeholder="000" />
        </div>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18457 2.99721 7.13633 4.39828 5.49707C5.79935 3.85782 7.69279 2.71538 9.79619 2.24015C11.8996 1.76491 14.1003 1.98234 16.07 2.86" stroke="#34A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 4L12 14.01L9 11.01" stroke="#34A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div className='number-wrapper'>
        <div className='expire-date'>
          <div>
            <h6>Expire Date</h6>
            <p style={{marginBottom: "0px"}}>Enter the expiration date of the card</p>
          </div>
          <input className="expir-date" {...getExpiryDateProps({ onChange: handleChangeExpiryDate })} value={expiryDate}  placeholder="00/00" />
        </div>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18457 2.99721 7.13633 4.39828 5.49707C5.79935 3.85782 7.69279 2.71538 9.79619 2.24015C11.8996 1.76491 14.1003 1.98234 16.07 2.86" stroke="#34A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 4L12 14.01L9 11.01" stroke="#34A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}

