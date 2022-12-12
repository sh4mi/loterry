import React from "react";
import "../styles/radio.css";

const Radio = ({text, onChange, selected, value}) => {
	return (
		<div
			className="modern-radio-container"
			onClick={() => {
				onChange(value);
			}}
		>
			<div
				className={`radio-outer-circle ${value !== selected && "unselected"}`}
			>
				<div
					className={`radio-inner-circle ${value !== selected &&
						"unselected-circle"}`}
				/>
			</div>
			<div className="helper-text">{text}</div>
		</div>
	)
};

export default Radio;
