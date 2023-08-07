import React from 'react';
import "../style/Projet.scss"
import CardProjet from '../components/CardProjet';
import FormProjet from '../components/FormProjet';

const Projet = () => {
    let user = JSON.parse(sessionStorage.getItem('user'));
    return (
        <section id='Projet'>
            <div className='titreEnBlanc imgProjet'>
                <h3 className='fondTitre'>Projet en cours</h3>
            </div>
            <h4 className='sous-titrePortefolio'>Projet personnel</h4>
            <CardProjet />
            {user && <FormProjet />}
        </section>
    );
};

export default Projet;