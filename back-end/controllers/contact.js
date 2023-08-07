const nodeoutlook = require('nodejs-nodemailer-outlook');

exports.sendMessage = (req, res) => {
  const contactObject = req.body;
  console.log("Données du formulaire reçues :", contactObject);
  const { Nom, Prenom, Societe, Email, Message } = req.body;
  console.log("Données de req.body:", req.body);
  console.log("Données de Nom :", Nom);

  // Vérifier que tous les champs du formulaire sont remplis
  if (!Nom || !Prenom || !Societe || !Message || !Email) {
    return res.status(400).json({ error: 'Veuillez remplir tous les champs du formulaire' });
  }

  // Envoi de l'e-mail à l'aide de nodejs-nodemailer-outlook
  nodeoutlook.sendEmail({
    host: 'smtp.office365.com',
    port:587,
    secure:false,
    auth: {
      user: process.env.USER_EMAIL, // Remplacez par votre adresse email
      pass: process.env.USER_PASSWORD, // Remplacez par votre mot de passe email
    },
    from: process.env.USER_EMAIL,
    to: process.env.USER_EMAIL, // Adresse e-mail du destinataire (vous)
    subject: 'Nouveau message de contact', // Sujet de l'e-mail
    html: `
      <h3>Nouveau message de contact</h3>
      <p><strong>Nom:</strong> ${Nom}</p>
      <p><strong>Prénom:</strong> ${Prenom}</p>
      <p><strong>Société:</strong> ${Societe}</p>
      <p><strong>Message:</strong> ${Message}</p>
      <p><strong>Email:</strong> ${Email}</p>
    `,
    onError: (e) => console.log(e),
    onSuccess: (i) => res.send("Email envoyé")
  }, (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'envoi de l\'e-mail', err);
      res.status(500).json({ error: 'Une erreur est survenue lors de l\'envoi de l\'e-mail' });
    } else {
      console.log('E-mail envoyé avec succès', result);
      res.status(200).json({ message: 'E-mail envoyé avec succès' });
    }
  });
};
