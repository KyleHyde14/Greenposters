import PlayerList from "./PlayerList";

const GameSetup = ({
  players,
  setPlayers,
  impostorCount,
  setImpostorCount,
  startGame,
}) => {
  const maxImpostors = Math.floor(players.length / 5) + 1 || 1;
  const isReadyToStart = players.length >= 3;

  const getImpostorButtons = () => {
    const buttons = [];
    for (let i = 1; i <= maxImpostors; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setImpostorCount(i)}
          style={{
            backgroundColor:
              impostorCount === i ? "#50fa7b" : "var(--primary-color)",
            color: impostorCount === i ? "black" : "var(--text-color)",
            fontWeight: impostorCount === i ? "bold" : "normal",
          }}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="setup-container">
      <PlayerList players={players} setPlayers={setPlayers} />

      <div className="setup-group">
        <h3>Selecciona el número de Impostores</h3>
        <p>Máximo: {maxImpostors}.</p>
        <div className="impostor-count-selector">{getImpostorButtons()}</div>
      </div>

      <button onClick={startGame} disabled={!isReadyToStart}>
        {isReadyToStart ? `Comenzar Partida` : "Mínimo 3 Jugadores"}
      </button>

      {!isReadyToStart && (
        <p style={{ color: "yellow" }}>
          ¡Necesitas al menos 3 jugadores para empezar!
        </p>
      )}
    </div>
  );
};

export default GameSetup;
