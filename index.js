require('dotenv').config();

const path = require('path');
const express = require('express');
const session = require('express-session')
const router = require('./app/routers');

const port = process.env.PORT || 3000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');

// extended false, car la librairie de base qui gère les formulaires nous suffit amplement
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, './assets')))


// on rajoute la gestion des sessions
app.use(session({
   secret: 'keyboard cat', // permet de chiffrer la session
   resave: true, //sauvegarder automatiquement la session  
   saveUninitialized: true, // permet de sauvegarder une session même si elle n'a pas été initialisée
}))

// on appelle notre middleware qui cherche à savoir si l'utilisateur est connecté



app.use(router);

app.listen(port, _ => {
   console.log(`http://localhost:${port}`);
});


