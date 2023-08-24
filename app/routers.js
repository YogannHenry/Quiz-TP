const express = require('express');
const mainController = require('./controllers/mainController');
const quizController = require('./controllers/quizController');
const tagController = require('./controllers/tagController');
const userController = require('./controllers/userController');
const sessionController = require('./controllers/sessionController');
const userMiddleware = require('./middlewares/userMiddleware');

const router = express.Router();

/* pages publiques */
router.get('/', userMiddleware, mainController.homePage);

router.get('/register', userController.index);

router.post('/register', userController.register);

router.get('/login', sessionController.loginPage);

router.post('/login', userController.login);

router.get('/logout', userController.logout);

/* pages nécéssitant d'être connecté */
// on peut mettre autant de middlewares qu'on veut entre la route et le controller

router.get('/quiz/:id', userMiddleware, quizController.show);

router.get('/tags', userMiddleware, tagController.index);

router.get('/tags/:id', userMiddleware, tagController.show);


module.exports = router;