import React from 'react';
import "../style/Modale.scss"

const Modale = ({ objet, onClose }) => {
  const handleModalClose = () => {
    onClose();
  };

  return (
    <div className="modale-container">
      <div className="modale">
        <div className='en-tete'>
          <span></span>
          <h6>{objet.title}</h6>
          <i className="fa-solid fa-xmark" onClick={handleModalClose}></i>
        </div>
        
        <div className='image'>
          <img src={objet.images[1].image} alt="image1 du projet" className="imagePrincipale"/>
          <div className='imageEnPlus'>          
          <img src={objet.images[2].image} alt="image2 du projet" />
          <img src={objet.images[3].image} alt="image3 du projet" />
          </div>
        </div>
        <div className='textDescriptionModale'>  
        <p>{objet.description} <br></br> {objet.lien && <a className='lienGitHub' href={objet.lien}>Lien vers le github</a>}</p>
        </div>
      
        
        
      </div>
    </div>
  );
};

export default Modale;


