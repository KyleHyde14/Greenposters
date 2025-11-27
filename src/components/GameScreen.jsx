import { useState } from "react";
import wordsData from "../assets/words.json";

const GameScreen = ({ players, impostorCount, goToSetup, startNewRound }) => {
  // El uso de la prop 'key' en App.jsx se encarga de reiniciar estos estados
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [isWordVisible, setIsWordVisible] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [isImpostorRevealed, setIsImpostorRevealed] = useState(false);

  // Función para configurar la partida (se ejecuta solo al montar el componente)
  const setupGame = () => {
    const allWords = wordsData.words;
    // Seleccionamos la palabra común
    const commonWord = allWords[Math.floor(Math.random() * allWords.length)];

    // 1. Crear una lista de todos los índices de jugadores [0, 1, 2, ...]
    const playerIndices = players.map((_, i) => i);

    // 2. Mezclar los índices para seleccionar a los impostores al azar
    playerIndices.sort(() => 0.5 - Math.random());

    // 3. Los primeros 'impostorCount' son los índices de los impostores
    const impostorIndices = playerIndices.slice(0, impostorCount);

    // 4. Crear la lista final de roles, PRESERVANDO EL ORDEN ORIGINAL DE LOS JUGADORES
    const gameRoles = players.map((name, index) => {
      // Si el índice del jugador está en la lista de impostorIndices, es el impostor
      const isImpostor = impostorIndices.includes(index);

      return {
        name,
        role: isImpostor ? "Impostor" : "Tripulante",
        word: isImpostor ? "Impostor" : commonWord,
      };
    });

    return { roles: gameRoles, commonWord: commonWord };
  };

  // Inicialización de la partida: esto se ejecuta cada vez que el componente se remonta
  const [gameData] = useState(() => setupGame());
  const playerRoles = gameData.roles;
  const commonWord = gameData.commonWord;

  const currentPlayer = playerRoles[currentPlayerIndex];

  // El resto de funciones (handleReveal, handleNextPlayer) y el renderizado
  // se mantienen como estaban, ya que App.jsx se encarga de reiniciar el estado.

  const handleReveal = () => {
    if (!isWordVisible) {
      setIsWordVisible(true);
    }
  };

  const handleNextPlayer = () => {
    setIsWordVisible(false);

    if (currentPlayerIndex === playerRoles.length - 1) {
      setGameStarted(true);
      setCurrentPlayerIndex(0);
    } else {
      setCurrentPlayerIndex((prev) => prev + 1);
    }
  };

  // --- Renderizado ---

  if (!gameStarted) {
    // 1. Fase de reparto de palabras
    return (
      <div className="game-screen">
        <h2>Turno de: **{currentPlayer.name}**</h2>
        <p>
          Pasa el dispositivo a este jugador y asegúrate de que nadie más mire.
        </p>

        <div
          className="player-card"
          style={{ background: "var(--secondary-color)" }}
        >
          {isWordVisible ? (
            <div className="card-content">
              <p>Tu Palabra Secreta es:</p>
              <div
                className={`word-display ${
                  currentPlayer.role === "Impostor" ? "impostor-word" : ""
                }`}
              >
                {currentPlayer.word}
              </div>
              <p style={{ marginTop: "20px" }}>
                Memorízala y pulsa **Siguiente**.
              </p>
              <button onClick={handleNextPlayer}>
                {currentPlayerIndex < playerRoles.length - 1
                  ? "Siguiente Jugador »"
                  : "¡Empezar a Jugar!"}
              </button>
            </div>
          ) : (
            <div className="card-content">
              <p>Pulsa el botón de abajo para revelar tu palabra.</p>
              <button onClick={handleReveal}>👀 Revelar </button>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    // 2. Fase de Juego (Discusión / Final)
    const impostors = playerRoles
      .filter((p) => p.role === "Impostor")
      .map((p) => p.name);

    return (
      <div className="game-screen">
        <h2 style={{ color: "#FFD700" }}>¡A investigar! 🕵️‍♀️</h2>
        <p>Todos tienen su rol. ¡Es hora de debatir y encontrar al impostor!</p>

        {!isImpostorRevealed ? (
          // Pantalla de Discusión
          <div
            className="player-card"
            style={{
              marginTop: "30px",
              backgroundColor: "var(--secondary-color)",
            }}
          >
            <h3>¿Quién es el impostor?</h3>
            <p>
              Cuando la discusión termine y hayan votado, pulsa para ver la
              verdad.
            </p>

            <button
              onClick={() => setIsImpostorRevealed(true)}
              style={{
                backgroundColor: "#ff5757",
                boxShadow: "0 4px #c93737",
                marginTop: "20px",
              }}
            >
              ¡Revelar Impostor!
            </button>
          </div>
        ) : (
          // Pantalla Final - Impostor Revelado
          <div
            className="player-card"
            style={{
              marginTop: "30px",
              backgroundColor: "var(--secondary-color)",
            }}
          >
            <h3>¡Fin de la Ronda!</h3>
            <h4 style={{ color: "var(--primary-color)" }}>
              El Impostor (o los impostores) era/n:
            </h4>
            <div
              className="word-display impostor-word"
              style={{ fontSize: "2em", marginBottom: "10px" }}
            >
              {impostors.join(" y ")}
            </div>
            <hr style={{ borderColor: "var(--secondary-color)" }} />
            <h4 style={{ color: "#FFD700" }}>La Palabra Secreta era:</h4>
            <div className="word-display" style={{ fontSize: "2em" }}>
              {commonWord}
            </div>
          </div>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          <button
            onClick={startNewRound}
            style={{
              backgroundColor: "#FFD700",
              boxShadow: "0 4px #c2a700",
              color: "black",
            }}
          >
            Otra Ronda
          </button>
          <button onClick={goToSetup}> Cambiar Jugadores</button>
        </div>
      </div>
    );
  }
};

export default GameScreen;
