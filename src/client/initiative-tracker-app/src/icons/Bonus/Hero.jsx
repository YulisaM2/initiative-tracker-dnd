const Hero = ({ size = "24" }) => {
	return (
		<svg xmlns='http://w3.org' viewBox='0 0 24 24' width={size} height={size}>
			<path d='M12 2S5 3.5 3 5v6c0 5.5 4 9.5 9 11 5-1.5 9-5.5 9-11V5c-2-1.5-9-3-9-3Zm0 4.2v0l1.83 3.69 4.05.59-2.93 2.86.69 4.05-3.64-1.92-3.64 1.92.69-4.05-2.93-2.86 4.05-.59L12 4.2Z' />{" "}
		</svg>
	);
};

export default Hero;
