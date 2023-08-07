import React from 'react';
import CollapseCompetences from '../components/CollapseCompetences';

const Competence = () => {
    return (
        <section id='Competence'>
            <h3 className='titreEnNoir'>Compétences</h3>
            <div className='CollapseFlex'>
                <CollapseCompetences />
            </div>
            
        </section>
    );
};

export default Competence;