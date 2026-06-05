const Player = ({ color = "#fff", size = "24" }) => {
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
			<circle cx='12' cy='7' r='4' />
			<path d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2' />
		</svg>
	);
};

export default Player;
