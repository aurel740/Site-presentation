import React, { useEffect } from 'react';
import FormPortfolio from './FormPortfolio';
import "../style/ModaleForm.scss"

const ModaleForm = ({ setShowFormModale }) => {

    useEffect(() => {
        const handleOutsideClick = (e) => {
          if (e.target.classList.contains('modale-container2')) {
            setShowFormModale(false);
          }
        };
    
        document.addEventListener('click', handleOutsideClick);
    
        return () => {
          document.removeEventListener('click', handleOutsideClick);
        };
      });

    return (
        <div className="modale-container2">
            <div className="modaleForm">
                    <FormPortfolio/> 
            </div>
        </div>
    );
};

export default ModaleForm;