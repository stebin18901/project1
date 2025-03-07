import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css';

function TableEditor() {
  const { tableId } = useParams();
  const navigate = useNavigate();
  const [rows, setRows] = useState([
    { id: 1, name: 'Player 1', score: 100, rank: 1, previousRank: 1 },
    { id: 2, name: 'Player 2', score: 90, rank: 2, previousRank: 2 },
  ]);

  // Function to update ranks when scores change
  const updateRanks = (updatedRows) => {
    const sortedRows = [...updatedRows].sort((a, b) => b.score - a.score);
    return sortedRows.map((row, index) => ({
      ...row,
      previousRank: row.rank,
      rank: index + 1,
    }));
  };

  const addRow = () => {
    const newRow = {
      id: rows.length + 1,
      name: `Player ${rows.length + 1}`,
      score: 0,
      rank: rows.length + 1,
      previousRank: rows.length + 1,
    };
    setRows(updateRanks([...rows, newRow]));
  };

  const updateRow = (id, field, value) => {
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, [field]: value } : row
    );
    setRows(updateRanks(updatedRows));
  };

  const adjustScore = (id, value) => {
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, score: row.score + value } : row
    );
    setRows(updateRanks(updatedRows));
  };

  const saveTable = () => {
    localStorage.setItem(`table-${tableId}`, JSON.stringify(rows));
    alert('Table saved!');
  };

  const shareLink = () => {
    const viewLink = `${window.location.origin}/view/${tableId}`;
    navigator.clipboard.writeText(viewLink);
    alert('View link copied to clipboard!');
  };

  return (
    <div className="table-editor-container">
      <h1>Edit Table: {tableId}</h1>
      <div className="button-group">
        <button onClick={addRow} className="btn">➕ Add Row</button>
        <button onClick={saveTable} className="btn btn-save">💾 Save Table</button>
        <button onClick={shareLink} className="btn btn-share">🔗 Share Link</button>
      </div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Score</th>
              <th>Indicator</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className={row.rank !== row.previousRank ? 'rank-change' : ''}>
                <td>{row.rank}</td>
                <td>
                  <input
                    type="text"
                    value={row.name}
                    onChange={(e) => updateRow(row.id, 'name', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={row.score}
                    onChange={(e) => updateRow(row.id, 'score', parseInt(e.target.value) || 0)}
                  />
                  <button onClick={() => adjustScore(row.id, 10)} className="btn-score">+10</button>
                  <button onClick={() => adjustScore(row.id, -10)} className="btn-score">-10</button>
                </td>
                <td>
                  <span className={`indicator ${row.previousRank > row.rank ? 'up' : row.previousRank < row.rank ? 'down' : ''}`}>
                    {row.previousRank > row.rank ? '⬆️' : row.previousRank < row.rank ? '⬇️' : '➖'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableEditor;
