import React, { useState, useEffect } from 'react';
import api from './services/api';

import './styles.css';

function App() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    api.get('repositories').then((response) => {
      setRepos(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo repositorio ${Date.now()}`,
      url: 'http://github.com',
      techs: ['Tech 1', 'Tech 2'],
    });

    const repo = response.data;

    setRepos([...repos, repo]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const deletedRepo = repos.filter((item) => {
      return item.id !== id;
    });

    setRepos(deletedRepo);
  }

  return (
    <div className='container'>
      <ul data-testid='repository-list'>
        {repos.map(({ id, title }) => (
          <li key={id}>
            {title}
            <button onClick={() => handleRemoveRepository(id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
