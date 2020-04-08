import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories')
      .then(res => {
        setRepositories(res.data);
      })
  }, []);

  async function handleAddRepository() {
    const rep = {
      url: `New URL ${Date.now()}`,
      title: `Title ${Date.now()}`,
      techs: ["Tech 001", "Tech 002"]    
    };

    const res = await api.post('repositories', rep);

    setRepositories([...repositories, res.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const result = repositories.filter(rep => (rep.id !== id));

    setRepositories(result);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map(rep => (
          <li key={rep.id} >
            { rep.title }

            <button onClick={() => handleRemoveRepository(rep.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
