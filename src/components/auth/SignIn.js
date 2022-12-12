 
import ReCAPTCHA from "react-google-recaptcha";
import React, {useState, useEffect} from "react";
import { Link, useNavigate  } from "react-router-dom";
import {
  useWindowSize,
  useWindowWidth,
  useWindowHeight,
} from '@react-hook/window-size'

import axios from "../../utils/axios";
import validator from 'validator';
import NavBar from "../layout/Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "../../styles/login.css";

const SignIn = () => {

  const onlyWidth = useWindowWidth()

  console.log('width==', onlyWidth);

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tokenValue, setTokenValue] = useState(null);

  const validatePassword = (value) => {
    if (value.length > 7) {
      return true;
    } else {
      return false;
    }
  }

  const validateEmail = (e) => {
    if (validator.isEmail(email)) {
      return true;
    } else {
      return false;
    }
  }

  const signIn = () => {

    if (!validateEmail(email)) {
      toast.error('Invalid email!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    if (!validatePassword(password)) {
      toast.error('Password length should be at least 8!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    if (!tokenValue) {
      toast.error('Recaptcha required!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    //Suggestion: make the axios instance in axos.js file. and create axios instance on there, then set header "Access-Control-Allow-Origin" please check correctly.
    //it seems to be you didn't set cors on frontend...
    // yes. I already tried in the morning.. let me try again.
    // but I don't understand about axios instance. can you give me an example?
    // I 


    console.log(process.env.REACT_APP_SERVER_URL);
    axios.post(`/api/auth/signin`, { email: email.toLowerCase(), password, role: 'user'})
    .then((res) => {
      console.log(res);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('name', res.data.name);
      localStorage.setItem('email', res.data.email);
      navigate("/home");
    })
    .catch((err) => {
      console.log(err);
      toast.error('Email and password mismatching!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });
  }

  return (
    <div className="sign-wrapper">
      <NavBar loginHidden={true} />
      <div className="signin">
        <svg width="63" height="27" viewBox="0 0 63 27" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display : onlyWidth < 426 ? 'none' : 'block'}}>
          <path fillRule="evenodd" clipRule="evenodd" d="M13.5 1.10204C6.6528 1.10204 1.10204 6.6528 1.10204 13.5C1.10204 20.3472 6.6528 25.898 13.5 25.898C20.3472 25.898 25.898 20.3472 25.898 13.5C25.898 6.6528 20.3472 1.10204 13.5 1.10204ZM0 13.5C0 6.04416 6.04416 0 13.5 0C20.9558 0 27 6.04416 27 13.5C27 20.9558 20.9558 27 13.5 27C6.04416 27 0 20.9558 0 13.5Z" fill="black"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M15.1531 4.40816C11.0448 4.40816 7.71435 7.73862 7.71435 11.8469C7.71435 15.9553 11.0448 19.2857 15.1531 19.2857C19.2614 19.2857 22.5919 15.9553 22.5919 11.8469C22.5919 7.73862 19.2614 4.40816 15.1531 4.40816ZM6.6123 11.8469C6.6123 7.12998 10.4362 3.30612 15.1531 3.30612C19.8701 3.30612 23.6939 7.12998 23.6939 11.8469C23.6939 16.5639 19.8701 20.3878 15.1531 20.3878C10.4362 20.3878 6.6123 16.5639 6.6123 11.8469Z" fill="black"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M15.1531 2.20408C9.8275 2.20408 5.51024 6.52133 5.51024 11.8469C5.51024 17.1725 9.8275 21.4898 15.1531 21.4898C20.4787 21.4898 24.796 17.1725 24.796 11.8469C24.796 6.52133 20.4787 2.20408 15.1531 2.20408ZM4.4082 11.8469C4.4082 5.91269 9.21886 1.10204 15.1531 1.10204C21.0873 1.10204 25.898 5.91269 25.898 11.8469C25.898 17.7812 21.0873 22.5918 15.1531 22.5918C9.21886 22.5918 4.4082 17.7812 4.4082 11.8469Z" fill="black"/>
          <path d="M17.6574 8.54082V9.56572L15.6159 14.3265H13.8306L15.7812 9.83847H14.2604V10.7311H12.8635V8.54082H17.6574Z" fill="black"/>
          <path d="M31.9123 5.43857H33.4827V11.5714H31.9123V5.43857Z" fill="black"/>
          <path d="M36.7514 11.6458C36.272 11.6458 35.8395 11.5466 35.4538 11.3483C35.0681 11.1499 34.765 10.8744 34.5446 10.5217C34.3297 10.1691 34.2222 9.76959 34.2222 9.32326C34.2222 8.88245 34.3297 8.48571 34.5446 8.13306C34.765 7.78041 35.0653 7.50765 35.4455 7.31479C35.8312 7.11643 36.2665 7.01724 36.7514 7.01724C37.2363 7.01724 37.6716 7.11643 38.0573 7.31479C38.4431 7.50765 38.7434 7.78041 38.9583 8.13306C39.1732 8.4802 39.2806 8.87694 39.2806 9.32326C39.2806 9.76959 39.1732 10.1691 38.9583 10.5217C38.7434 10.8744 38.4431 11.1499 38.0573 11.3483C37.6716 11.5466 37.2363 11.6458 36.7514 11.6458ZM36.7514 10.3978C37.0269 10.3978 37.2529 10.3041 37.4292 10.1167C37.6055 9.92387 37.6937 9.65939 37.6937 9.32326C37.6937 8.99265 37.6055 8.73367 37.4292 8.54632C37.2529 8.35898 37.0269 8.2653 36.7514 8.2653C36.4759 8.2653 36.25 8.35898 36.0737 8.54632C35.8973 8.73367 35.8092 8.99265 35.8092 9.32326C35.8092 9.65939 35.8973 9.92387 36.0737 10.1167C36.25 10.3041 36.4759 10.3978 36.7514 10.3978Z" fill="black"/>
          <path d="M43.0993 11.3896C42.9671 11.4722 42.8045 11.5356 42.6117 11.5797C42.4243 11.6238 42.2232 11.6458 42.0083 11.6458C41.4242 11.6458 40.9751 11.5025 40.661 11.216C40.347 10.9295 40.1899 10.5024 40.1899 9.9349V8.43061H39.537V7.25694H40.1899V6.09153H41.7603V7.25694H42.7852V8.43061H41.7603V9.91837C41.7603 10.0782 41.8017 10.2049 41.8843 10.2986C41.9725 10.3867 42.0882 10.4308 42.2315 10.4308C42.4133 10.4308 42.5731 10.384 42.7108 10.2903L43.0993 11.3896Z" fill="black"/>
          <path d="M46.7073 11.3896C46.5751 11.4722 46.4125 11.5356 46.2197 11.5797C46.0323 11.6238 45.8312 11.6458 45.6163 11.6458C45.0322 11.6458 44.5831 11.5025 44.269 11.216C43.955 10.9295 43.7979 10.5024 43.7979 9.9349V8.43061H43.145V7.25694H43.7979V6.09153H45.3683V7.25694H46.3932V8.43061H45.3683V9.91837C45.3683 10.0782 45.4097 10.2049 45.4923 10.2986C45.5805 10.3867 45.6962 10.4308 45.8394 10.4308C46.0213 10.4308 46.1811 10.384 46.3188 10.2903L46.7073 11.3896Z" fill="black"/>
          <path d="M49.4319 11.6458C48.9525 11.6458 48.5199 11.5466 48.1342 11.3483C47.7485 11.1499 47.4455 10.8744 47.2251 10.5217C47.0102 10.1691 46.9027 9.76959 46.9027 9.32326C46.9027 8.88245 47.0102 8.48571 47.2251 8.13306C47.4455 7.78041 47.7458 7.50765 48.126 7.31479C48.5117 7.11643 48.947 7.01724 49.4319 7.01724C49.9168 7.01724 50.3521 7.11643 50.7378 7.31479C51.1235 7.50765 51.4238 7.78041 51.6387 8.13306C51.8536 8.4802 51.9611 8.87694 51.9611 9.32326C51.9611 9.76959 51.8536 10.1691 51.6387 10.5217C51.4238 10.8744 51.1235 11.1499 50.7378 11.3483C50.3521 11.5466 49.9168 11.6458 49.4319 11.6458ZM49.4319 10.3978C49.7074 10.3978 49.9333 10.3041 50.1096 10.1167C50.286 9.92387 50.3741 9.65939 50.3741 9.32326C50.3741 8.99265 50.286 8.73367 50.1096 8.54632C49.9333 8.35898 49.7074 8.2653 49.4319 8.2653C49.1564 8.2653 48.9305 8.35898 48.7541 8.54632C48.5778 8.73367 48.4896 8.99265 48.4896 9.32326C48.4896 9.65939 48.5778 9.92387 48.7541 10.1167C48.9305 10.3041 49.1564 10.3978 49.4319 10.3978Z" fill="black"/>
          <path d="M39.3345 17.01L37.7393 21.4898H36.2185L35.3754 19.0515L34.4993 21.4898H32.9785L31.3833 17.01H32.8711L33.7885 19.721L34.739 17.01H36.078L37.0037 19.7458L37.9542 17.01H39.3345Z" fill="black"/>
          <path d="M39.8144 17.01H41.3848V21.4898H39.8144V17.01ZM40.5996 16.5141C40.313 16.5141 40.0816 16.4342 39.9053 16.2744C39.729 16.1146 39.6408 15.9162 39.6408 15.6793C39.6408 15.4423 39.729 15.244 39.9053 15.0842C40.0816 14.9244 40.313 14.8445 40.5996 14.8445C40.8861 14.8445 41.1175 14.9216 41.2939 15.0759C41.4702 15.2247 41.5583 15.4175 41.5583 15.6545C41.5583 15.9024 41.4702 16.1091 41.2939 16.2744C41.1175 16.4342 40.8861 16.5141 40.5996 16.5141Z" fill="black"/>
          <path d="M45.323 16.9356C45.8795 16.9356 46.3259 17.1009 46.662 17.4315C47.0036 17.7621 47.1744 18.2608 47.1744 18.9275V21.4898H45.604V19.1838C45.604 18.5721 45.3588 18.2663 44.8684 18.2663C44.5984 18.2663 44.3808 18.3545 44.2154 18.5308C44.0557 18.7071 43.9758 18.9716 43.9758 19.3243V21.4898H42.4053V17.01H43.9014V17.4977C44.0777 17.3158 44.2871 17.1781 44.5295 17.0844C44.772 16.9852 45.0365 16.9356 45.323 16.9356Z" fill="black"/>
          <path d="M51.078 16.9356C51.6346 16.9356 52.0809 17.1009 52.417 17.4315C52.7586 17.7621 52.9295 18.2608 52.9295 18.9275V21.4898H51.3591V19.1838C51.3591 18.5721 51.1139 18.2663 50.6234 18.2663C50.3534 18.2663 50.1358 18.3545 49.9705 18.5308C49.8107 18.7071 49.7308 18.9716 49.7308 19.3243V21.4898H48.1604V17.01H49.6564V17.4977C49.8327 17.3158 50.0421 17.1781 50.2846 17.0844C50.527 16.9852 50.7915 16.9356 51.078 16.9356Z" fill="black"/>
          <path d="M58.559 19.2582C58.559 19.2692 58.5507 19.3987 58.5342 19.6466H55.2777C55.3438 19.8781 55.4705 20.0571 55.6579 20.1839C55.8507 20.3051 56.0904 20.3657 56.3769 20.3657C56.5918 20.3657 56.7764 20.3354 56.9307 20.2748C57.0905 20.2142 57.2503 20.115 57.4101 19.9772L58.2366 20.8368C57.8013 21.3217 57.1649 21.5642 56.3273 21.5642C55.8039 21.5642 55.3438 21.465 54.947 21.2666C54.5503 21.0683 54.2417 20.7928 54.0213 20.4401C53.8064 20.0874 53.699 19.688 53.699 19.2416C53.699 18.8008 53.8037 18.4068 54.0131 18.0597C54.228 17.707 54.5228 17.4315 54.8974 17.2332C55.2721 17.0348 55.6937 16.9356 56.162 16.9356C56.6084 16.9356 57.0134 17.0293 57.377 17.2166C57.7407 17.3985 58.0272 17.6657 58.2366 18.0184C58.4515 18.3655 58.559 18.7788 58.559 19.2582ZM56.1703 18.0514C55.9279 18.0514 55.724 18.1203 55.5587 18.2581C55.3989 18.3958 55.2969 18.5832 55.2529 18.8201H57.0878C57.0437 18.5832 56.939 18.3958 56.7737 18.2581C56.6139 18.1203 56.4128 18.0514 56.1703 18.0514Z" fill="black"/>
          <path d="M60.7791 17.5472C60.9389 17.3434 61.1455 17.1918 61.399 17.0927C61.6579 16.988 61.9527 16.9356 62.2833 16.9356V18.349C62.1401 18.3324 62.0216 18.3242 61.9279 18.3242C61.5918 18.3242 61.3273 18.4151 61.1345 18.5969C60.9471 18.7788 60.8534 19.057 60.8534 19.4317V21.4898H59.283V17.01H60.7791V17.5472Z" fill="black"/>
        </svg>
        <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display : onlyWidth < 426 ? 'block' : 'none'}}>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M13.5 1.10204C6.6528 1.10204 1.10204 6.6528 1.10204 13.5C1.10204 20.3472 6.6528 25.898 13.5 25.898C20.3472 25.898 25.898 20.3472 25.898 13.5C25.898 6.6528 20.3472 1.10204 13.5 1.10204ZM0 13.5C0 6.04416 6.04416 0 13.5 0C20.9558 0 27 6.04416 27 13.5C27 20.9558 20.9558 27 13.5 27C6.04416 27 0 20.9558 0 13.5Z" fill="black"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M15.1531 4.40819C11.0447 4.40819 7.71428 7.73865 7.71428 11.847C7.71428 15.9553 11.0447 19.2857 15.1531 19.2857C19.2614 19.2857 22.5918 15.9553 22.5918 11.847C22.5918 7.73865 19.2614 4.40819 15.1531 4.40819ZM6.61224 11.847C6.61224 7.13001 10.4361 3.30615 15.1531 3.30615C19.87 3.30615 23.6939 7.13001 23.6939 11.847C23.6939 16.5639 19.87 20.3878 15.1531 20.3878C10.4361 20.3878 6.61224 16.5639 6.61224 11.847Z" fill="black"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M15.1531 2.20409C9.82746 2.20409 5.51021 6.52135 5.51021 11.8469C5.51021 17.1726 9.82746 21.4898 15.1531 21.4898C20.4787 21.4898 24.7959 17.1726 24.7959 11.8469C24.7959 6.52135 20.4787 2.20409 15.1531 2.20409ZM4.40816 11.8469C4.40816 5.91271 9.21882 1.10205 15.1531 1.10205C21.0873 1.10205 25.898 5.91271 25.898 11.8469C25.898 17.7812 21.0873 22.5918 15.1531 22.5918C9.21882 22.5918 4.40816 17.7812 4.40816 11.8469Z" fill="black"/>
          <path d="M17.6574 8.54077V9.56567L15.6159 14.3265H13.8306L15.7812 9.83842H14.2604V10.7311H12.8636V8.54077H17.6574Z" fill="black"/>
        </svg>

        <h3>Try your luck</h3>
        <p>Please enter your details</p>
        <div className="email-wrapper">
          <p className="label">Email</p>
          <input type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="password-wrapper">
          <p className="label">Password</p>
          <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="recapture">
          <ReCAPTCHA
            sitekey="6LfD70sjAAAAAC5OKHpWBuEsGC3K9wxXMaT_H50T"
            onChange={(val) => setTokenValue(val)}
            size={onlyWidth < 426 ? 'compact' : 'normal'}
          />
          <a href="#">Forget password</a>
        </div>
        <div className="button-container">
          <button className="button" onClick={() => signIn()}>Sign in</button>
          <p className="signup-link">Don't have an account? <Link to="/signup">Sign up</Link></p>
        </div>
      </div>
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
    </div>
  );
};

export default SignIn;
