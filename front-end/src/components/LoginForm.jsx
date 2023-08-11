import React, { useState } from 'react';
import "../style/connection.scss";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const login = (e) => {
    e.preventDefault();
  
    fetch('http://localhost:4000/api/auth/login', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(response => {
        let erreur;
  
        if ((email.value && password.value) && !response.ok) {
          erreur = 'Adresse email ou mot de passe incorrect';
        }
        if ((!email.value || !password.value) && !response.ok) {
          erreur = 'Veuillez saisir tous les champs';
        }
  
        if (erreur) {
          setErrorMessage(erreur);
        } else {
          setErrorMessage('');
          // Rediriger vers une autre page
          console.log(response);
        }
  
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Réponse non valide');
        }
      })
      .then(data => {
        console.table(data);
        sessionStorage.setItem('user', JSON.stringify(data));
        let user = JSON.parse(sessionStorage.getItem('user'));
        if (user) {
          // Effectuez ici les actions souhaitées après la connexion réussie
          console.log('Connexion réussie');
          window.location.href = '../developpeur-web-junior-orleans/';
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  
  // const signUp = () => {
  //   // Effectuez ici les actions pour la création d'un nouveau compte utilisateur
  //   fetch('http://localhost:4000/api/auth/signup', {
  //     method: 'POST',
  //     headers: {
  //       'accept': 'application/json',
  //       'content-type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       email: email,
  //       password: password
  //     })
  //   })
  //     .then(response => {
  //       if (response.ok) {
  //         console.log('Compte utilisateur créé avec succès');
  //         // Effectuez ici les actions souhaitées après la création du compte
  //       } else {
  //         setErrorMessage('Erreur lors de la création du compte utilisateur');
  //         throw new Error('Erreur lors de la création du compte utilisateur');
  //       }
  //     })
  //     .catch(error => {
  //       console.error('Error:', error);
  //     });
  // };


  return (
      <div className='logIn'>
        <h4>Connection</h4>
        <form className='formLogIn' onSubmit={login}>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Adresse email" />
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" />
          <button type="submit">Se connecter</button>
        </form>
        <div id="erreur">{errorMessage}</div>
        {/* <button onClick={signUp}>S'enregistrer</button> */}
      </div>
  );
};

export default LoginForm;
