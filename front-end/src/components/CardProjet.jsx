import React from 'react';
import useProjet from '../Hooks/useProjet';

const CardProjet = () => {
const {projets, isLoading} = useProjet();


    return (
        <div className='cardProjet'>
            {isLoading && <span>Loading...</span>}
            {projets.map((object, index) => (
                <div 
                key={object.id}
                title='projet'
                className='divProjet'
                style={{ flexDirection: window.innerWidth >= 1029 && index % 2 === 0 ? 'row-reverse' : 'row'}} // inverser le sens entre l'image et le texte, une fois sur deux.
                >
                    <div className='listDescription'>
                        <h5>{object.title}</h5>
                        <p>Objectif :</p>
                        <ul className='list'>
                        {object.list.map((item, index) => (
                            <li className="mot-clef" key={index}>{item.motClef}</li>
                            ))}
                        </ul>
                    </div>
                    <img src={object.imagesProjet} alt={object.title} />
                </div>
            ))}
        </div>
    );
};

export default CardProjet;