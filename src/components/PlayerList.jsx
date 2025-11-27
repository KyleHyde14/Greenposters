import { useState } from "react";

const PlayerList = ({ players, setPlayers }) => {
  const [newPlayerName, setNewPlayerName] = useState("");

  const addPlayer = () => {
    const trimmedName = newPlayerName.trim();
    if (trimmedName && !players.includes(trimmedName)) {
      setPlayers([...players, trimmedName]);
      setNewPlayerName("");
    }
  };

  const removePlayer = (name) => {
    setPlayers(players.filter((p) => p !== name));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addPlayer();
    }
  };

  return (
    <div className="setup-group">
      <h3>Lista de Jugadores ({players.length})</h3>
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="Nombre del Jugador"
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={addPlayer} disabled={newPlayerName.trim() === ""}>
          Añadir
        </button>
      </div>

      {players.length > 0 && (
        <ul className="player-list">
          {players.map((player, index) => (
            <li key={index}>
              {player}
              <button
                className="remove-btn"
                onClick={() => removePlayer(player)}
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlayerList;
