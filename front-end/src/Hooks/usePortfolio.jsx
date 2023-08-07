import { useState, useEffect } from 'react';

const usePortfolio = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4000/api/portfolio')
      .then(response => response.json())
      .then(data => {
        setPortfolios(data);
        console.log(data)
        setIsLoading(false);
      })
      .catch(error => console.error(error));
  }, []);
  

  const getPortfolioById = (id) => {
    return portfolios.find(portfolio => portfolio.id === id);
  }

  return { portfolios, isLoading, getPortfolioById };
};

export default usePortfolio;