import React, { useState, useEffect, useContext } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import Card from "../components/Card/Card.jsx";
import { CardContext } from "../context/CardContext.jsx";
import Controls from "../components/Controls/Controls.jsx";
import { DeleteAllButton } from "../components/Controls/DeleteAllButton.jsx";

const CardsPage = () => {
	const { characters, setSelectedCharacter } = useContext(CardContext);
	const { enableScreenDrag } = useContext(CardContext);
	return (
		<div className='page-wrapper'>
			{/* Used to navigate by dragging the page itself
			Added screen drag check to avoid problems like dragging a card while 
			dragging yourself around the grid. */}
			<TransformWrapper
				initialScale={1}
				initialPositionX={0}
				initialPositionY={0}
				limitToBounds={true} // Infinite scrolling is too much for scope of app
				panning={{
					disabled: !enableScreenDrag,
					velocityDisabled: false,
					excluded: [
						"input",
						"textarea",
						"button",
						"react-transform-component-no-drag",
					],
					boundsPaddingX: 300, // Limit in pxs
					boundsPaddingy: 300,
				}}
				zooming={{
					disabled: !enableScreenDrag,
					excluded: [
						"input",
						"textarea",
						"button",
						"react-transform-component-no-drag",
					],
				}}
			>
				<TransformComponent
					wrapperStyle={{ width: "100vw", height: "100vh" }}
					contentStyle={{ display: "flex", alignItems: "center" }}
				>
					<main className='card-board-grid'>
						{
							// Render the cards with the character's data
							characters.map((character) => (
								<Card key={character._id} character={character} />
							))
						}
					</main>
				</TransformComponent>
			</TransformWrapper>
			<Controls />
			<DeleteAllButton />
		</div>
	);
};

export default CardsPage;
