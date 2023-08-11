import React, { useState} from 'react';

const FormProjet = () => {
    const [title, setTitle] = useState('');
    const [imagesProjet, setImagesProjet] = useState(null);
    const [list, setList] = useState([]);
    const [errorMessage, setErrorMessage] = useState('Veuillez saisir les champs');

    let user = JSON.parse(sessionStorage.getItem('user'));

      
    const handleImageChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const selectedImage = selectedFiles[0]; 
        setImagesProjet(selectedImage);
      };

    const postProjet = (e) => {
        e.preventDefault();
        // Créer le tableau d'objets d'images avec les URLs correspondantes


        const imageURL = `${window.location.origin}/images/${imagesProjet.name}`;
         
        const formData = new FormData();
        formData.append('userId', user.userId);
        formData.append('title', title);
        formData.append('images', imagesProjet);
        for (let i = 0; i < list.length; i++) {
            formData.append(`list[${i}].motClef`, list[i]);
          }

        console.log(formData);

        // Envoyer les données au serveur
        const projetData = {
            userId: user.userId,
            title: title,
            images: imageURL,
            list: list,
        };
        console.log(projetData);
// {/* <i className="fa-solid fa-arrow-right"></i> */}
        fetch('http://localhost:4000/api/projet', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user.token}`,
            },
            body: formData,
        })
        .then(response => {
            if (!response.ok) {
                console.log("erreur ici en response", response);
                console.log("console user", user);
                setErrorMessage("probleme d'enregistrement");
            } else {
                setErrorMessage("projet enregistré");
            }
            return response.json();
        })
        .then(data => {
            console.log("console data", data);
        })
        .catch(error => {
            console.error('Error:', error);
            setErrorMessage("Erreur dans le fetch");
        });
    };

    return (
        <div>
                <form className='formProjet' onSubmit={postProjet}>
                    <label htmlFor="title" name="title">Titre projet</label>
                    <input type="text" name='title' id='title' value={title} onChange={(e) => setTitle(e.target.value)} />

                    <label htmlFor="imagesProjet">Images</label>
                    <input type="file" name='imagesProjet' id='imagesProjet' accept='.png,.jpg' onChange={handleImageChange}/>

                    <label htmlFor="list" name='list' id='list'>Mots-clés (séparés par des virgules)</label>
                    <input type="text" value={list.join(',')} onChange={(e) => setList(e.target.value.split(','))} />

                    <button type="submit">Envoyer</button>
                    <p>{errorMessage}</p>
                    {!user && <div>user pas présent</div>}
                </form>
                </div>
    );
};

export default FormProjet;

