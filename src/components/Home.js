import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const createNewTable = () => {
    const tableId = Math.random().toString(36).substring(7); // Generate a unique ID
    navigate(`/edit/${tableId}`);
  };

  return (
    <div>
      <h1>Score Table App</h1>
      <button onClick={createNewTable}>Create New Table</button>
      <p>Enter a table ID to view:</p>
      <input type="text" id="tableId" placeholder="Table ID" />
      <button onClick={() => navigate(`/view/${document.getElementById('tableId').value}`)}>
        View Table
      </button>
    </div>
  );
}

export default Home;