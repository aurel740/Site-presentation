import React from 'react';
import "../style/Accueil.scss"


const Accueil = () => {

    return (
        <section id='Accueil'>
            <div className='fondNoir'> 
            <div className='accueilDiv'>            
            <h2>Thiré Aurélie</h2>
            <h1>Développeuse web junior</h1>
            <p> Diplômé de la formation <strong>OpenClassrooms</strong> en développement web, je suis motivé et disponible pour mettre mes compétences 
                à profit près <strong>d'Orléans</strong> ou à <strong>distance</strong>.<br/><br/>En tant que <strong>développeuse web</strong> polyvalent et passionné, je suis à l'aise 
                en travail d'équipe et en autonomie, prêt à apporter des idées innovantes pour satisfaire les besoins des clients. 
                Je suis également curieuse des nouvelles technologies, notamment <strong>l'IA</strong>, que j'aimerais intégrer dans mes projets.<br/><br/>
                Contactez-moi pour discuter de mes réalisations et projets en cours.</p>
                <a href="#Competence"><i className="fa-solid fa-sort-down scroll"></i></a>
                </div>
                </div>           

        </section>
    );
};

export default Accueil;