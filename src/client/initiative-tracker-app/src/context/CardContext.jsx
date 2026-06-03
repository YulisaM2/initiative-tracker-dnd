import { createContext } from "react";
import { useState, useEffect } from "react";

export const CardContext = createContext();

const CardProvider = ({ children }) => {
    // Populate the page with cards based on the characters in the db.
    const [characters, setCharacters] = useState([]);
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    // Generic states
    const [loading, setLoading] = useState(true);
    const [err, setError] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();

        async function loadCharacters() {
        try {
            // Ping db
            const response = await fetch(import.meta.env.VITE_API_CHAR_URL, { signal: abortController.signal });
            if(!response.ok) 
                throw new Error(`HTTP error! status: ${response.status}`);
            
            // Update state with the fethed characters
            const res = await response.json();
            setCharacters(res);

        } catch(error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
        };

        loadCharacters();
        
        // Cleanup on unmount
        return () => abortController.abort()
    }, []);

    const contextData = { 
        characters,
        setCharacters,
        selectedCharacter,
        setSelectedCharacter
    };

    return (
         <CardContext.Provider value={ contextData }>
            {loading ? (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100vh",
                    }}
                >
                </div>
            ) : (
                children
            )}
        </CardContext.Provider>
    );
};

export default CardProvider;