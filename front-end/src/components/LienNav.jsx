import React, { useState } from 'react';
import '../style/BarreNavigation.scss';
import LogoDiscord from '../assets/LogoDiscord.png';
import LogoLinkedin from '../assets/logoLinkedin.png';

const LienNav = () => {
  const [showImage, setShowImage] = useState(true);

  const handleClick = () => {
    setShowImage(!showImage);
  };

  return (
    <div className={`Logo${showImage ? '' : ' animate'}`}>
      <a href="https://www.linkedin.com/in/aur%C3%A9lie-thir%C3%A9-576000196/">
        <img src={LogoLinkedin} alt="logo Linkedin" />
      </a>
      <button className="discord" onClick={handleClick}>
        {showImage ? (
          <img src={LogoDiscord} alt="logo discord" />
        ) : (
          '   nom d\'utilisateur : AT-contact#5046'
        )}
      </button>
    </div>
  );
};

export default LienNav;
