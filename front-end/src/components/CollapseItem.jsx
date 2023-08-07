import React, { useState } from 'react';


const CollapseItem = ({ title, content,color }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`collapseItem ${isOpen ? 'open' : ''}`} style={isOpen ? { boxShadow: '8px 8px 5px rgba(0, 0, 0, 0.113)' } : null}>
      <div className={`collapse__title ${color}`} onClick={toggleCollapse}>
        <span> </span>
        <h4>{title}</h4>
        <i className={`fas ${isOpen ? 'fa-sort-up' : 'fa-sort-down'}`} onClick={toggleCollapse}></i>
      </div>
      {isOpen && <ul className="collapse__content">{content}</ul>}
    </div>
  );
};

export default CollapseItem;
