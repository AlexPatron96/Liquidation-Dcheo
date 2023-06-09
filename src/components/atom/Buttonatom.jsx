import React from "react";

const Buttonatom = ({ created, title, color, ico, size }) => {
	return (
		<button
			type="button"
			style={{ fontSize: `${size}px` }}
			className={`btn btn-${color ? color : "success"}`}
			onClick={created}
		>
			<i className={`fa-solid ${ico ? ico : "fa-circle-plus"} bx-fw`}></i>
			{title}
		</button>
	);
};

export default Buttonatom;
