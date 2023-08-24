

const userMiddleware = (req, res, next) => {
    // si l'utilisateur possède une session
        // on l'envoie sur la suite du process
    if (req.session.user) {
        //on a besoin de faire circuler la session de requête en requête, afin que la session de l'utilisateur ne soit pas oubliée, pour se faire, on passe la session de la requête de l'utilisateur à la réponse qu'on va envoyer
        // on a besoin de la faire passer à chaque route, un peu comme une course de relai, ou un badge d'autorisation, le client envoie la session au serveur à travers sa requête, et le serveur la renvoie au client à travers sa réponse
        res.locals.user = req.session.user;
        // next nous envoie vers le controller qui suit 
        next();
    } else {
        // sinon, on redirige l'utilisateur et on lui envoie un message
        res.locals.user = false;
        res.redirect('login');
    }
}

module.exports = userMiddleware;