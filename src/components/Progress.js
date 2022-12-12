import React from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ProgressCircle = (props) => {
  const { money, days, time } = props;
  const percentage = 66;

  // return <CircularProgressbar value={percentage} text={`${percentage}%`} counterClockwise={true} styles={buildStyles({
  //   trailColor:'#56D6FF',
  //   pathColor: '#2A7BB6',
  // })}/>;
  return (
    <CircularProgressbarWithChildren
      value={66}
      counterClockwise={true}
      styles={buildStyles({
        trailColor: "#56D6FF",
        pathColor: "#2A7BB6",
      })}
    >
      <div style={{fontSize:'44px',fontWeight:700,color:'#2A7BB6'}}><span style={{fontSize: '70%'}}>$</span>1200</div>
      <div style={{fontSize: '18px',fontWeight:500}}>50 days<br></br>05:18:10</div>
    </CircularProgressbarWithChildren>
  );
};

export default ProgressCircle;
