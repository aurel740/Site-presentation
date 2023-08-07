import React from 'react';
import BarreNavigation from '../components/BarreNavigation';
import Accueil from '../sectionComponents/Accueil';
import Competence from '../sectionComponents/Competence';
import Portfolio from '../sectionComponents/Portfolio';
import Projet from '../sectionComponents/Projet';
import Contact from '../sectionComponents/Contact';
import '../style/Formulaire.scss'
const Home = () => {
    return (
        <div className='corps'>
            <BarreNavigation />
            <Accueil />
            <Competence />
            <Portfolio />
            <Projet />
            <Contact />
        </div>
    );
};

export default Home;