import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';

function TableView() {
  const { tableId } = useParams();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const savedTable = localStorage.getItem(`table-${tableId}`);
    if (savedTable) {
      const parsedRows = JSON.parse(savedTable);
      const sortedRows = parsedRows.sort((a, b) => b.score - a.score);
      setRows(sortedRows);
    }
  }, [tableId]);

  return (
    <div className="container">
      <h1>Leaderboard: {tableId}</h1>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => {
              const rankChange = row.previousRank - (index + 1);
              return (
                <tr key={row.id}>
                  <td className="rank">
                    {index + 1}
                    <span className={`rank-indicator ${rankChange > 0 ? 'up' : rankChange < 0 ? 'down' : 'same'}`}>
                      {rankChange > 0 ? ' ⬆' : rankChange < 0 ? ' ⬇' : ' ➖'}
                    </span>
                  </td>
                  <td>{row.name}</td>
                  <td>{row.score}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableView;
