const BassClef = ({ size = "24" }) => {
	return (
		<svg
			xmlns='http://w3.org'
			viewBox='0 0 24 24'
			width={size}
			height={size}
			style={{ overflow: "visible" }}
		>
			<defs>
				<filter id='gold-glow' x='-200%' y='-200%' width='500%' height='500%'>
					<feGaussianBlur stdDeviation='2.0' result='blur' />
					{/* This floods the blur layer with your CSS variable color */}
					<feFlood flood-color='var(--bardic-glow-color)' result='glow-color' />
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

			<g
				transform='translate(-0.5, -1.0) scale(1.12)'
				transform-origin='center'
			>
				<path
					className='clef-glow-target'
					d='M4.5 13.5a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8Z'
				/>

				<path
					className='clef-glow-target'
					d='M5.2 10.3c-.2-.6-.5-.5-.7 0s0 1.5.5 1.5.8-.8.6-1.5c-.3-1.6 1.1-3.8 3.5-4.3 3.5-.8 6.2 1.4 6.2 5.5 0 4.0-1.9 7.6-3.8 9.8l-.3-.6c1.6-2.1 3.1-5.4 3.1-9.2 0-3.6-1.8-5.3-4.9-4.5-2.4 1.1-3.9 2.3-4.1 4.1l-.1.7Z'
				/>

				<path
					className='clef-glow-target'
					d='M18.2 9.0a1.5 1.5 0 1 1-1.5 1.5 1.5 1.5 0 0 1 1.5-1.5Z'
				/>

				<path
					className='clef-glow-target'
					d='M18.2 14.5a1.5 1.5 0 1 1-1.5 1.5 1.5 0 0 1 1.5-1.5Z'
				/>
			</g>
		</svg>
	);
};

export default BassClef;
