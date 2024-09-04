import { useState } from 'react';

export default function Player({ initialName, symbol, isActive, onNameChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialName);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleClick = () => {
    if (isEditing) {
        onNameChange({ symbol, name: name || initialName });
        if (!name) {
            setName(initialName);
        }
    }
    setIsEditing((prev) => !prev);
  };

  return (
    <li className={isActive ? "player active" : "player"}>
      {!isEditing && <span className="player-name">{name}</span>}
      {isEditing && (
        <input type="text" value={name} onChange={handleNameChange} />
      )}
      <button onClick={handleClick}>{isEditing ? "Save" : "Edit"}</button>
      <span className="player-symbol">{symbol}</span>
    </li>
  );
}
