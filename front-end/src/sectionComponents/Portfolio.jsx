import React, { useState } from 'react';
import "../style/Portfolio.scss"
import CardPortfolio from '../components/CardPortfolio';
import FormPortfolio from '../components/FormPortfolio';

const Portfolio = () => {
    const [showPortfolio, setShowPortfolio] = useState(true);
    let user = JSON.parse(sessionStorage.getItem('user'));
    return (
        <section id='Portfolio'>
            <div className='titreEnBlanc imgPortfolio'>
                <h3 className='fondTitre'>Portfolio</h3>
                </div>
                <h4 className='sous-titrePortefolio'>Projet formation OpenClassrooms</h4>
                {showPortfolio && <CardPortfolio setShowPortfolio={setShowPortfolio}/>}
                {user && <FormPortfolio />}
        </section>
    );
};

export default Portfolio;