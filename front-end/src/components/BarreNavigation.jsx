import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import "../style/BarreNavigation.scss";
import LienNav from './LienNav';

const BarreNavigation = () => {
  const [isConnected, setIsConnected] = useState(!!JSON.parse(sessionStorage.getItem('user')));
  const [showMenu, setShowMenu] = useState(window.innerWidth < 580); // Initialise showMenu en fonction de la largeur de l'écran
  const [menuOpen, setMenuOpen] = useState(false); // État local pour contrôler l'affichage du menu
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let currentSection = "";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();

        if (rect.top <= 0 && rect.bottom > 0) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);



  const handleDisconnect = () => {
    sessionStorage.removeItem('user');
    setIsConnected(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Inverser l'état de menuOpen au clic sur l'icône burger
  };

  useEffect(() => {
    // Mettre à jour showMenu en fonction de la largeur de l'écran lorsqu'il change
    const handleResize = () => {
      setShowMenu(window.innerWidth < 580);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav>
      <LienNav />
      {isConnected ? (
        <div>
          <button className='edition'>édition</button>
          <button onClick={handleDisconnect}>Déconnexion</button>
        </div>
      ) : null}

      {/* Afficher l'icône burger et définir le onClick pour afficher ou masquer le menu */}
      {showMenu && (
        <div onClick={toggleMenu} className='divMenu'>
          <button className="burger-icon"><i className="fa-solid fa-bars" ></i></button>
          {menuOpen && <Navigation activeSection={activeSection}/>}
        </div>
      )}

      {!showMenu && (
        <Navigation activeSection={activeSection}/>
      )}
    </nav>
  );
};

export default BarreNavigation;
