const Hero = ({ size = "24" }) => {
	return (
		<svg
			xmlns='http://w3.org'
			viewBox='0 0 24 24'
			width={size}
			height={size}
			style={{ overflow: "visible" }}
		>
			<defs>
				<filter id='red-glow' x='-200%' y='-200%' width='500%' height='500%'>
					<feGaussianBlur stdDeviation='2.0' result='blur' />
					<feFlood flood-color='var(--heroic-glow-color)' result='glow-color' />
					<feComposite
						in='glow-color'
						in2='blur'
						operator='in'
						result='colored-blur'
					/>
					<feMerge>
						<feMergeNode in='colored-blur' />
						<feMergeNode in='colored-blur' />
						<feMergeNode in='SourceGraphic' />
					</feMerge>
				</filter>
			</defs>

			<path
				className='glow-target'
				d='M12 2S5 3.5 3 5v6c0 5.5 4 9.5 9 11 5-1.5 9-5.5 9-11V5c-2-1.5-9-3-9-3Zm0 4.5 1.5 3.2 3.5.5-2.5 2.5.6 3.5-3.1-1.6-3.1 1.6.6-3.5-2.5-2.5 3.5-.5L12 6.5Z'
			/>
		</svg>
	);
};

export default Hero;
