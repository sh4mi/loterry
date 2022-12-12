import React, {useState, useEffect, useRef} from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Col,
  Row,
  InputNumber,
  Button,
  Space,
  Card,
  Typography,
} from "antd";
import Select from 'react-select';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { Container } from "react-bootstrap";
import NavBar from "./layout/Navbar";
import Footer from "./layout/Footer";
import "../styles/aboutus.css";
import i18next from '../i18n';

const { Title } = Typography;

const options = [
  {value: 'en', label: 'English'},
  {value: 'zh', label: 'Chinese'},
  {value: 'th', label: 'Thai'},
  {value: 'hi', label: 'Hindi'},
  {value: 'ja', label: 'Japanese'},
  {value: 'fr', label: 'French'},
  {value: 'de', label: 'German'},
  {value: 'id', label: 'Indonesian'},
  {value: 'ko', label: 'Korean'},
  {value: 'ms', label: 'Malay'},
  {value: 'ru', label: 'Russian'}
]

const About = () => {
  
  // It is a hook imported from 'react-i18next'
  const { t } = useTranslation(); 
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState({value: 'en', label: 'English'}); 
  const [loginHidden, setLoginHidden] = useState(true);

  const styles = {
    control: (styles) => ({ ...styles, backgroundColor: 'white', width: '250px' }),
  };


  useEffect(() => {
    i18next.changeLanguage('en');
    const name = localStorage.getItem('name');

    if (name) {
      setLoginHidden(false);
    } else {
      setLoginHidden(true);
    }
  }, []);

  const handleChange = (option) => {
    setSelectedOption(option);
    i18next.changeLanguage(option.value);
  };

  return (
    <Container style={{paddingTop: "100px"}}>
      <NavBar loginHidden={loginHidden} aboutusHidden={true} signinHidden={!loginHidden} />
      {!loginHidden && (<button className="back-btn" onClick={() => navigate(-1)}><FontAwesomeIcon icon={faAngleLeft} size="lg"/> Back</button>)}
      <div style={{display: 'flex', alignItems: 'center'}}>
        <p style={{marginRight: '12px', marginBottom: '0'}}>Languages:</p>
        <Select
          value={selectedOption}
          onChange={handleChange}
          options={options}
          styles={styles}
        />
      </div>
        <Row style={{ marginTop: "20px" }}>
          <Col className="about-caption">
            <h1>{t('aboutus')}</h1>
            <div  className="about-text">
              {t('aboutuscontent1')}
            </div>
            <div  className="about-text">
              {t('aboutuscontent2')}
            </div>
          </Col>
        </Row>
        <div className="about-content">
          <Row>
            <Col className="ant-col-xs-24 ant-col-md-6">
              <Title level={3} style={{color: '#2A7BB6'}}>{t('rules')}</Title>
            </Col>
            <Col className="ant-col-xs-24 ant-col-md-18">
              <div className="about-text" style={{marginTop:0}}>{t('rulescontent1')}</div>
              <div className="about-text">{t('rulescontent2')}</div>
              <div className="about-text">{t('rulescontent3')}</div>
              <div className="about-text">{t('rulescontent4')}</div>
              <div className="about-text">{t('rulescontent5')}</div>
              <div className="about-text">{t('rulescontent6')}</div>
              <div className="about-text">{t('rulescontent7')}</div>
              <div className="about-text">{t('rulescontent8')}<span>66lotto@proton.me</span></div>
              <div className="about-text">{t('rulescontent9')}<span>@joshthedis</span></div>
            </Col>
          </Row>
          <Row>
            <Col className="ant-col-xs-24 ant-col-md-6">
            <Title level={3} style={{color: '#2A7BB6'}}>{t('comefrom')}</Title>
            </Col>
            <Col className="ant-col-xs-24 ant-col-md-18">
              <div className="about-text" style={{marginTop:0}}>{t('comefromcontent1')}</div>
              {/* <div className="about-text">{t('comefromcontent2')}</div> */}
              {/* <div className="about-text">{t('comefromcontent3')}</div> */}
            </Col>
          </Row>
          {/* <Row>
            <Col className="ant-col-xs-24 ant-col-md-6">
            <Title level={3} style={{color: '#2A7BB6'}}>{t('getsome')}</Title>
            </Col>
            <Col className="ant-col-xs-24 ant-col-md-18">
              <div className="about-text" style={{marginTop:0}}>{t('getsomecontent1')}</div>
              <div className="about-text">{t('getsomecontent2')}</div>
            </Col>
          </Row> */}
        </div>
        <Row style={{ marginTop: "20px",display:"flex",justifyContent:"end" }}><Button className="button-try-myluck">{t('tryluck')}</Button></Row>
      <Footer />
    </Container>
  );
};

export default About;
