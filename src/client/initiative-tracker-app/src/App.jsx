import CardPage from "./pages/CardsPage";
import CardContext from "./context/CardContext";
import { Toaster } from "sonner";

function App() {
	return (
		<div id='app'>
			<CardContext>
				<CardPage />
			</CardContext>
			<Toaster richColors closeButton />
		</div>
	);
}

export default App;
