import CardPage from "./pages/CardsPage";
import CardContext from "./context/CardContext";

function App() {
  return (
    <div id="app">
      <CardContext>
        <CardPage />
      </CardContext>
    </div>
  );
}

export default App;
