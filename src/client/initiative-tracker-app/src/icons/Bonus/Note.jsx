const Note = ({ color = "#fff", size = "24" }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 24 24'
			width={size}
			height={size}
		>
			<g transform='translate(0, +3)'>
				<path d='M9 16.15A3 3 0 1 0 6 19a2.93 2.93 0 0 0 3-2.85V3.7l10-2v11.45A3 3 0 1 0 16 16a2.93 2.93 0 0 0 3-2.85V1L8.5 3.1A.5.5 0 0 0 8 3.6v12.55Z' />
			</g>{" "}
		</svg>
	);
};

export default Note;
