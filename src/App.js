import React, {useState, useEffect} from "react";
import "./styles.css";

import api from "./services/api" 

function App() {

  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      id: "123",
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    });

    const repository = response.data;
    console.log(repository)
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    
    if(response.status === 204){
      const repositoriesUpdate = repositories.filter(repository => repository.id !== id);
  
      setRepositories(repositoriesUpdate);
    }

  }

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(repository => (
            <>
              <li key={repository.id}>{repository.title}</li>
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </>
          ))}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
