import React, { useState } from 'react';

const FormPortfolio = () => {
    const [title, setTitle] = useState('');
    const [images, setImages] = useState([]);
    const [description, setDescription] = useState('');
    const [lien, setLien] = useState('');
    const [resume, setResume] = useState('');
    const [errorMessage, setErrorMessage] = useState('Veuillez saisir les champs');
    const [fileCount, setFileCount] = useState(0);

    let user = JSON.parse(sessionStorage.getItem('user'));

    const handleImageChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const selectedImages = selectedFiles.slice(0, 4); // Limitez le nombre d'images à 4
      
        setImages(selectedImages);
        setFileCount(selectedImages.length);
      };
      
      const postPortfolio = (e) => {
        e.preventDefault();
        // Créer le tableau d'objets d'images avec les URLs correspondantes
        const imagesArray = [];
        for (let i = 0; i < images.length; i++) {
          const imageURL = `${window.location.origin}/images/${images[i].name}`;
          imagesArray.push({ imageURL });
        }        
        
        const formData = new FormData();
        formData.append('userId', user.userId);
        formData.append('title', title);
        for (let i = 0; i < images.length; i++) {
          formData.append('images', images[i]);
        }        
        formData.append('description', description);
        formData.append("resume", resume)
        formData.append("lien",lien)

        console.log(formData)
      
        // Envoyer les données au serveur
        const portfolioData = {
        userId: user.userId,
        title: title,
        images: imagesArray,
        resume: resume,
        description: description,
        lien: lien,
        };
        console.log(portfolioData)


            fetch('http://localhost:4000/api/portfolio', {
              method: 'POST',
              headers: {
                'Authorization':`Bearer ${user.token}`,
              },
              body: formData,
            })
              .then(response => {
                if (!response.ok) {
                  console.log("erreur ici en response", response);
                  console.log("console user",user)
                  setErrorMessage("probleme d'enregistrement")
                }else{
                  setErrorMessage("projet enregistré")
                }
                return response.json()
              })
              .then(data => {
                console.log("console data", data)
              })
              .catch(error => {
                console.error('Error:', error);
                setErrorMessage("Erreur dans le fetch");
              });
        };

return (
  <div>
  <form className='formPortfolio' onSubmit={postPortfolio}>
    <label htmlFor="title" name="title">Titre portfolio</label>
    <input type="text" name='title' id='title' value={title} onChange={(e) => setTitle(e.target.value)} />

    <label htmlFor="images">Images (sélectionnez plusieurs fichiers)</label>
    <input type="file" name='images' id='images' onChange={handleImageChange} accept='.png,.jpg' multiple />

    <p>{fileCount} fichier(s) sélectionné(s)</p>
    <label htmlFor="resume" name='resume' id='resume'>Resumer</label>
    <input type="text" value={resume} onChange={(e) => setResume(e.target.value)} />

    <label htmlFor="description" name='description' id='description'>Description</label>
    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />

    <label htmlFor="lien" name='lien' id='lien'>Lien</label>
    <input type="text" value={lien} onChange={(e) => setLien(e.target.value)} />

    <button type="submit" name="portfolioSubmit">Envoyer</button>
    <p>{errorMessage}</p>
    {!user && <div>user pas présent</div>}  
  </form>

  </div>
);
};


export default FormPortfolio;
