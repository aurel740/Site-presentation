import React from 'react';
import "../style/Navigation.scss"

const Navigation = ({ activeSection }) => {

  return (
    // Ajoutez une classe conditionnelle "show" si showMenu est true
    <ul>
      <li>
        <a href="#Accueil" className={activeSection === "Accueil" ? "nav-active" : ""}>Accueil</a>
      </li>
      <li>
        <a href="#Competence" className={activeSection === "Competence" ? "nav-active" : ""}>Compétences</a>
      </li>
      <li>
        <a href="#Portfolio" className={activeSection === "Portfolio" ? "nav-active" : ""}>Portfolio</a>
      </li>
      <li>
        <a href="#Projet" className={activeSection === "Projet" ? "nav-active" : ""}>Projets</a>
      </li>
      <li>
        <a href="#Contact" className={activeSection === "Contact" ? "nav-active" : ""}>Contact</a>
      </li>
    </ul>
  );
};

export default Navigation;