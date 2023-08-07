import React, { useState } from 'react';
import "../style/Contact.scss"
import { NavLink } from 'react-router-dom';
import LienNav from '../components/LienNav';

const Contact = () => {
  // const [Nom, setNom] = useState('');
  // const [Prenom, setPrenom] = useState('');
  // const [Societe,setSociete] = useState('');
  // const [Email,setEmail] = useState('');
  // const [Message,setMessage] = useState('');

    console.log(sessionStorage);

    const [formData, setFormData] = useState({
      Nom: "",
      Prenom: "",
      Societe: "",
      Email: "",
      Message: "",
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    };
  
    const handleSubmitContact = (e) => {
      e.preventDefault();
  
      // Envoi des données au serveur à l'aide de fetch ou d'une autre méthode d'envoi asynchrone
      fetch("http://localhost:4000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (response.ok) {
            // Gérer la réponse réussie du serveur
            console.log("Formulaire soumis avec succès");
          } else {
            // Gérer les erreurs du serveur
            console.error("Erreur lors de la soumission du formulaire");
            console.log(response);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Réponse du serveur :", data);
        })
        .catch((error) => {
          // Gérer les erreurs de la requête
          console.error("Erreur lors de la requête", error);
        });
    };
      

    return (
        <section id='Contact'>
            <div className='fondNoir'>
              <div className='fondContact flex'><h3 className='titreContact'>Contactez-moi</h3>
                <form onSubmit={handleSubmitContact}>
                    <div className='formulaire'>                    
                        <div className='infoMessage'>
                        <label htmlFor="Nom">Nom</label>
                        <input type="text" id='Nom' name='Nom' placeholder='Veuillez saisir votre nom' onChange={handleChange} required/>
                        <label htmlFor="Prenom">Prénom</label>
                        <input type="text" id='Prenom' name='Prenom' placeholder='Veuillez saisir votre prénom' onChange={handleChange} required/>
                        <label htmlFor="Societe">Société</label>
                        <input type="text" id='Societe' name='Societe' placeholder='Veuillez saisir votre societe' onChange={handleChange} required/>
                        <label htmlFor="Email">Votre e-mail</label>
                        <input type="email" id='Email' name='Email' placeholder='Veuillez saisir votre e-mail' onChange={handleChange} required/>
                    </div>
                    <div className='message'>
                    <label htmlFor="Message">Message</label>
                        <textarea type="text" id='Message' name='Message' placeholder='Veuillez saisir votre message' rows="7" onChange={handleChange} required/>
                    </div>
                    </div>
                    <input type="submit" value="Validez" className='validez'></input>
                </form>
                <div className='footer'>
                <div>
                    <NavLink to="/connection">
                    <i className="fa-solid fa-circle"></i>
                    </NavLink>
                </div>
                <LienNav /></div>
            </div>
            </div>
        </section>
    );
};

export default Contact;