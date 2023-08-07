import React, { useState, useEffect } from 'react';
import usePortfolio from '../Hooks/usePortfolio';
import Modale from './Modale';
import '../style/Portfolio.scss';

const CardPortfolio = () => {
  // let user = JSON.parse(sessionStorage.getItem('user'));
  const { portfolios, isLoading } = usePortfolio();
  const [selectedObjet, setSelectedObjet] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePortfolioClick = (objet) => {
    setSelectedObjet(objet);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.classList.contains('modale-container')) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    
    <div className='cardPortfolio'>
      {isLoading && <span>Loading...</span>}
      {portfolios.map((objet) => (
        <div
          key={objet.id}
          title="portfolio"
          alt={objet.title}
          onClick={() => handlePortfolioClick(objet)}
          className='divFiche'
          style={{ backgroundImage: `url(${objet.images[0].image})` }}
        >
          <div className='description'>
            <h2>{objet.title}</h2>
            <p>{objet.resume}</p>
            <p className='cliquez'>Cliquez pour en voir plus</p>
          </div>
        </div>
      ))}
      {isModalOpen && selectedObjet && (
        <Modale objet={selectedObjet} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default CardPortfolio;
