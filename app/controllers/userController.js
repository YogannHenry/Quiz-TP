const { User } = require('../models');
const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');

const userController = {

    async index(req, res) {
        res.render('signup');
    },

    async register(req, res) {


        try {
            const { firstname, lastname, email, password, passwordConfirm } = req.body;


            // * enforcer ces règles avec des regex
            // * les mots de passe doivent être minimum de 8 caractères de long et comporter des caractères spéciaux, et des chiffres

            if(password !== passwordConfirm) {
                return res.render('signup', {error: 'Les mots de passe ne correspondent pas'});
            }

            if(! emailValidator.validate(email)) {
                return res.render('signup', {error: 'votre email n\'est pas valide'});
            }

            const exists = await User.findOne({
                where: {email: email}
            });


            // envoie de mail de confirmation

            if(exists) {
                return res.render('signup', {error: 'qqchose s\'est mal passé'});
            }
            
            // on définit la manière dont on va "mélanger le mot de passe" en fonction de la quantité de sel
            // 10 représente le nombre de tour où on va mélanger le mot de passe, + il y a de tours + le mdp est mélangé, mais + on exploite le processeur et donc + le temps de réponse pour l'inscription sera élévé (avec bcrypt par défaut on met 10)
            const salt = await bcrypt.genSalt(10);
            // on applique le mélange au mot de passe
            const hash = await bcrypt.hash(password, salt);

            // Pa$$w0rd!
            // $2b$10$l444BkmS0.Q5mt/sYT79/O4Ndkf1bZ7cVTdYUiFGs4cl.WauLbOjK
            // $2b$10$PzFPi0oUqWwsakOlAzqAYu4wL49eumCQo.zoYftecLS5BrettVe6a

            await User.create({
                firstname,
                lastname,
                email,
                password: hash
            });

            // envoie de mail de confirmation
            res.render('signup', {message: 'Vous pouvez maintenant vous connecter'});
        } catch (error) {
            console.log(error);
            res.status(500).render('signup', {error: error.message});
        }
    },

    async login(req, res) {
        
        // on récupère l'email et le mot de passe du formulaire
        // depuis le body, on récupère 2 variables, email et password
        const {  email, password } = req.body;
        // on vérifie que l'email existe
        const user = await User.findOne({
            where: {email}
        });
        // si l'email n'existe pas, on arrête le process en disant à l'utilisateur qu'il y a eu un pb
        if (!user) {
            res.render('login', {error: 'wrong password or email'});
            return res.status(500).render('signup', {error: 'wrong email or password'});
        }  else {
            // on vérifie le mot de passe (avec bcrypt)
            // on compare le mot de passe du formulaire avec celui enregistré en base
            // vu que le mdp en base est chiffré on a besoin de bcrypt pour la comparaison
            const match = await bcrypt.compare(password, user.password);

            // si le mot de passe est validé, on envoie l'utilisateur vers une autre page
            
            if (match) {
                // l'utilisateur a réussi à se connecter : 
                // on enregistre une session pour l'utilisateur : 
                // on remplit notre session utilisateur à travers "req"
                req.session.user = user;
                // on supprime le mot de passe dans la session (pour qu'il ne soit pas exploité)
                delete req.session.user.password;

                res.redirect('/');
            } else {
                res.render('login', {error: 'wrong password or email'});
                return  res.status(500).render('signup', {error: 'wrong email or password'});
            }
        }
    },

    logout(req, res) {
        delete req.session.user;
        res.redirect('/login');
    }
};

module.exports = userController;