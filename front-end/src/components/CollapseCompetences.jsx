import React, { useEffect, useState } from 'react';
import competenceData from '../data/competence.json';
import "../style/CollapseCompetences.scss"
import CollapseItem from './CollapseItem';

const CollapseCompetences = () => {
  // eslint-disable-next-line no-unused-vars
  const [competenceCollapse, setCompetenceCollapse] = useState(competenceData);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {competenceCollapse.map((item, index) => (
        <CollapseItem
        color={item.color}
          key={item.id}
          title={item.title}
          content={item.item.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
          toggleCollapse={() => {}}
        />
      ))}
    </>
  );
};

export default CollapseCompetences;
