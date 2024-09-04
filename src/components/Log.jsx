export default function Log({turns}) {
    return (
      <ol id="log">
        {turns.map(({ cell, player }) => (
          <li key={`${cell.row}-${cell.col}`} className="highlighted">
            {`${player} selected cell (${cell.row}, ${cell.col})`}
          </li>
        ))}
      </ol>
    );
}