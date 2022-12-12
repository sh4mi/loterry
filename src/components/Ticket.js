import React, {  useEffect, useState } from "react";
import ConfirmCheckBox from "./ConfirmCheckBox";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/ticket.css";

const ToggleButton = (props) => {
  const [selected, setSelected] = useState(false);
  const { value, selectedNumCount, selectedNumList, setSelectedNumCount, setSelectedNumList } = props;
 

  useEffect(() => {
    if (selectedNumCount === 4 || selectedNumCount === 0) {
      setSelected(false);
    }
    if (selectedNumCount === 4 && selectedNumList.includes(value)) setSelected(true);
  }, [selectedNumList]);

  const handleClick = () => {
    if (!selected && selectedNumCount < 4) {
      setSelected(true);
      setSelectedNumCount(selectedNumCount + 1);
      setSelectedNumList([...selectedNumList, value]);
    } else if (selected) {
      setSelected(false);
      setSelectedNumCount(selectedNumCount - 1);
      setSelectedNumList(selectedNumList.filter(function(e) { return e !== value}));
    }
  }

  return (
    <div
      className={!selected ? "button-number" : "button-number button-active"}
      onClick={handleClick}
    >
      {value}
    </div>
  );
};

const Ticket = (props) => {

  const [selectedNumCount, setSelectedNumCount] = useState(0);
  const [selectedNumList, setSelectedNumList] = useState([]);
  const [arrayNum, setArrayNum] = useState([]);

  const {number, tickets, setTickets } = props;

  useEffect(() => {
    let _arrayNum = [];
    for (let i = 0; i < 49; i++) {
      _arrayNum.push(i + 1);
    }
    setArrayNum(_arrayNum);
  }, []);

  useEffect(() => {
    if (selectedNumCount === 4) {
      let _tickets = tickets;
      _tickets[number - 1] = selectedNumList;
      setTickets(_tickets);
    }
  }, [selectedNumCount])


  const quickChoose = () => {
    
    let _selectedNumList = [];
    while(_selectedNumList.length < 4) {
      var r = Math.floor(Math.random() * 49) + 1;
      if(_selectedNumList.indexOf(r) === -1) _selectedNumList.push(r);
    }
    console.log('_selectedNumList', _selectedNumList);
    setSelectedNumList(_selectedNumList);
    setSelectedNumCount(4);
  }

  const removeNumberList = () => {
    setSelectedNumList([]);
    setSelectedNumCount(0);
  }

  return (
    <div className="ticket">
      <div className="ticket-header">
        <FontAwesomeIcon onClick={removeNumberList} icon={faTrashCan} style={{color: "rgb(241,137,104)"}} size="lg"/>
        <button className="quick-choose" onClick={quickChoose}>Quick Choose</button>
      </div>
      <div className="check-container">
        <p>Choose 4 numbers</p>
        {selectedNumCount == 4 && <ConfirmCheckBox />}
      </div>
      <div className="panel-wrapper">
        {/* <span>{number}</span> */}
        {arrayNum.map((val, index) => (
          <ToggleButton
            value={val}
            key={index}
            selectedNumCount={selectedNumCount}
            selectedNumList={selectedNumList}
            setSelectedNumCount={setSelectedNumCount}
            setSelectedNumList={setSelectedNumList}
          />
        ))}
      </div>
    </div>
  );
};

export default Ticket;
