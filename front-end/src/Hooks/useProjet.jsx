import { useState, useEffect } from 'react';

const useProjet = () => {
  const [projets, setProjets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://boucroux.freeboxos.fr:4000/api/projet')
      .then(response => response.json())
      .then(data => {
        setProjets(data);
        setIsLoading(false);
      })
      .catch(error => console.error(error));
  }, []);
  

  const getProjetById = (id) => {
    return projets.find(projet => projet.id === id);
  }

  return { projets, isLoading, getProjetById };
};

export default useProjet;