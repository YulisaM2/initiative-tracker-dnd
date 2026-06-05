const GrabLocked = ({ color = "#fff", size = "24" }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 24 24'
			width={size}
			height={size}
			stroke={color}
			fill='none'
			strokeWidth='2.5'
		>
			<path d='M7 11V7a5 5 0 0 1 10 0v4' />
			<rect x='5' y='11' width='14' height='10' rx='2' ry='2' />
		</svg>
	);
};

export default GrabLocked;
