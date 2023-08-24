const { Quiz } = require('../models')


const quizController = {

    async show(req, res) {
        try {
        // on a besoin de l'id du quiz
        // Avant on : valide cette ID
            const quizId = parseInt(req.params.id);
            // on récupère le quiz
            // findByPk est une méthode qui permet de récupérer 1 entrée de BDD lorsqu'on connaît l'id de l'entrée
            // dans le cas où on ne connaitrait pas cet id, on pourrait plutôt utiliser findOne
            const quiz = await Quiz.findByPk(quizId, {
                include: [
                    { association: 'author' },
                    { association: 'tags' },
                    { association: 'questions', include: ['level', 'answers'] },
                ]
            });
            // console.log(quiz);


            // on les envoie à la vue




            // const quiz = await Quiz.findByPk(req.params.id, {
            // include: [
            //     {model: User, as: "user"},
            //     {model: Tag, as: "tags"},
            //     {model: Question, as: "questions",
            //         include: [
            //             {model: Level, as: "level"},
            //             {model: Answer, as: "answers"}]
            //     }]
            // });



            res.render('quizz', { quiz });
        } catch(e) {
            console.log(e);
        }
    }
};

module.exports = quizController;