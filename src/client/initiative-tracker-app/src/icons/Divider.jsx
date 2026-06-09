const Divider = ({ className = "" }) => {
	return (
		<svg
			xmlns='http://w3.org'
			viewBox='0 0 100 4'
			preserveAspectRatio='none'
			className={`${className}`}
		>
			<path d='M 0,1 C 25,1 45,0 50,0 C 55,0 75,1 100,1 C 75,1 55,2 50,2 C 45,2 25,1 0,1 Z' />{" "}
		</svg>
	);
};

export default Divider;
