import { useState } from "react";
import GameSetup from "./components/GameSetup";
import GameScreen from "./components/GameScreen";
import "./App.css";

function App() {
  const [players, setPlayers] = useState([]);
  const [impostorCount, setImpostorCount] = useState(1);
  const [gameState, setGameState] = useState("setup"); // 'setup' | 'playing'
  const [roundKey, setRoundKey] = useState(0); // <--- NUEVO: Clave para forzar el reinicio de la ronda

  const startGame = () => {
    if (players.length >= 3) {
      // Asegura que el número de impostores no supere el máximo permitido
      const maxImpostors = Math.floor(players.length / 5) + 1 || 1;
      const finalImpostorCount = Math.min(impostorCount, maxImpostors);

      setImpostorCount(finalImpostorCount); // Acepta la configuración final
      setGameState("playing");
      setRoundKey((prev) => prev + 1); // <--- IMPORTANTE: Reinicia la clave al iniciar
    }
  };

  // Vuelve a la pantalla de configuración para cambiar jugadores/impostores
  const goToSetup = () => {
    setGameState("setup");
  };

  const startNewRound = () => {
    // <--- LÓGICA DE REINICIO: Solo actualiza la clave para forzar el remonte de GameScreen
    setRoundKey((prev) => prev + 1);
  };

  return (
    <div className="App">
      <h1>Greenposters</h1>

      {gameState === "setup" ? (
        <GameSetup
          players={players}
          setPlayers={setPlayers}
          impostorCount={impostorCount}
          setImpostorCount={setImpostorCount}
          startGame={startGame}
        />
      ) : (
        <GameScreen
          // <--- IMPORTANTE: Usamos la clave para forzar la recreación del componente
          key={roundKey}
          players={players}
          impostorCount={impostorCount}
          goToSetup={goToSetup}
          startNewRound={startNewRound}
        />
      )}
    </div>
  );
}

export default App;
