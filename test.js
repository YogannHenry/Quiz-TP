

require('dotenv').config();


// via un require sur un dossier, on cible le fichier index.js qui sera visé par defaut
// on peut mentionner le fichier, OU mentionner le dossier qui va par défaut chercher le fichier index.js de ce dossier
// dans ce fichier index.js on va récupérer tous les modèles puis les exporter, afin de centraliser les require
const { Level, Question, Answer, Tag, Quiz, User } = require('./app/models') // ici on récupères tous nos modèles avec toutes nos liaisons


async function test() {


    try {
        // // FINDALL
        // // objectif : récupérer tous les niveaux
        // const levels = await Level.findAll();
        // console.log(levels);

        // // FINDBYID
        // // si on peut utiliser Level pour appeler des méthodes, c'est parce que la méthode en question est 'static'
        // const oneLevel = await Level.findById(3);
        // console.log(oneLevel);


        // // INSERT
        // // 1 créer une instance de user
        // const michel = new User({
        //     email: 'michel@michel.fr',
        //     password:'michel123',
        //     firstname:'michel', 
        //     lastname:'michelor'
        // });
        // // à partir de là on a une instance côté express qu'on aimerait sauvegarder côté BDD

        // // 2 appeler une méthode de notre instance
        // const response = await michel.insert();
        // console.log(response);


        // // UPDATE
        // const result = await User.findById(1)
        // console.log(result);
        // // avec les données récupérées, on crée un moule d'utilisateur, reprenant les données de l'utilisateur qu'on a récupéré
        // const updatedUser = new User({
        //     id: result.id,
        //     email: result.email,
        //     password: result.password,
        //     firstname: "FEELIP",
        //     lastname: result.lastname,
        // });
        // updatedUser.update();

        // DELETE
        // const result = await User.findById(7)
        // console.log(result);
        // const userToDelete = new User({
        //     id: result.id,
        // })
        // const response = await userToDelete.delete();
        // console.log(response);


        // ! les test ci-dessus fonctionnent avec la pré-factorisation du coreModel (voir le commit associé), à partir d'ici, on va utiliser le coreModel ET des callbacks

        // User.findAll(    
        //     // ci -dessous on retrouve la fonction appellée "callback" dans findAll
        //     (error, results) => {

        //         if (results === null) {
        //             console.log("no user found");
        //         } else {
        //             console.log(results);
        //         }
        //     }
        // )


        // User.findById(id, (error, result) => {
            
        //     console.log("hello");
        //     console.log(result);
        // })
        // !! Test avec sequelize

        // // récupérer tous les levels : 
        // const result = await Level.findAll();
        // console.log(result);


        // // crer un niveau : 
        // const newlevel = await Level.create({ name: "ok" });

        // // récupérer un niveau
        // // cf findOne

        // // récupérer un niveau vec des conditions
        // const levelFound = await Level.findAll({
        //     where: {
        //         id: 2
        //     }
        // });
        // console.log(levelFound);

        // TEST challenge E04

        // const result = await Question.findAll();
        // console.log(result);

        // const questionFound = await Question.findOne({
        //     where: {
        //         id: 3
        //     }
        // });
        // console.log(questionFound);

        // const oneQuestion = await Question.findByPk(3);
        // console.log(oneQuestion);

        // const veryHardLevel = await Level.create({
        //     name: 'très difficile'
        // })

        // const newLevel = await Level.bulkCreate([ { name: 'très difficile' }, ],{ fields: ['name'] } ); 
        // console.log(newLevel);


        // // si un niveau avec les critères spécifiés existe, on ne créera pas de nouvel enregistrement, sinon on le créera 
        // const otherLevel = await Level.findOrCreate({ where : {name: 'très difficile' }})

        // TESTS ASSOCIATIONS

        // on veut récupérer une question avec son level
    //     const result = await Question.findOne({
    //         where: {
    //             id: 5
    //         },
    //         include: Level // sans as, on mentionne directement la classe, donc ici Level (sans les quotes !)
    //     })
    //     console.log(result);

    //     // on veut récupérer un niveau de difficulté avec les questions associées
    //     const result2 = await Level.findOne({
    //         where: {
    //             id: 2
    //         },
    //         include: 'questions'
    //     })
    //    // console.log(result2);

    //     // les questions avec les réponses (les possibles)
    //     const questionsWithAnswers = await Question.findAll({
    //         where: {
    //             id: 4
    //         },
    //         include: "answers"
    //     })
    //     console.log(questionsWithAnswers[0].answers);

    // TEST TABLE LIAISON
    
    // const movieQuiz = await Tag.findAll({
    //     where: {
    //         name: "Cinéma"
    //     },
    //     include: "quizzes"
    // })
    //console.log(movieQuiz);


    const quizAndTags = await Quiz.findAll({
        where: {
            id: 4
        }, include: "tags"
    });
    

    console.log(quizAndTags);
    
} catch(raclette) {
        console.log(raclette);
    }
}

test();

