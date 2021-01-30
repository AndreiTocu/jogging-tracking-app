import React, { useEffect, useState } from 'react'
import './App.css';

function App() {

  const [users, setUsers] = useState();

  useEffect(() => {
    fetch('/api/users').then(response => {
      return response.json();
    }).then(data => {
      setUsers(data);
    });
  }, []);

  const list = users && users.map(user => {
    return <li>{user.name}|{user.email}</li>
  });

  return (
    <div className="App">
      <div>Users</div>
      <ul>
        {list}
      </ul>
    </div>
  );
}

export default App;
