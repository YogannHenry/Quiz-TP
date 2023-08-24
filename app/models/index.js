
// on récupère tous les modèles pour centraliser
const Level = require('./level');
const Question = require('./question');
const Answer = require('./answer');
const User = require('./user');
const Quiz = require('./quiz');
const Tag = require('./tag');





// dans ce fichier on va spécifier tous les rapports entre les tables : côté aller et côté retour

//  0N - hasMany
//  01 - belongsTo
//  11 - hasOne
//  NN - belongsToMany


// moyen mémotechnique : pour trouver la clé étrangère, quand on utilise has_many, on parle de l'id de la table de gauche (et de sa référence dans la table de droite)
// et quand on utilise belongsTo, la clé étrangère parle de la table de droite, et la clé étrangère se trouve dans la clé de gauche


/* question -0N         11 - answer  (réponses potentielles)*/

// question - answer - une question a plusieurs réponses potenitelles (pas bonnes réponses) 0N
Question.hasMany(Answer, {
    foreignKey: 'question_id',
    as: 'answers'
});

// answer - question - une réponse appartient à une question 11
Answer.belongsTo(Question, {
    foreignKey: 'question_id',
    as: 'question'
});


/* question - 11  01 - answer (bonne réponse) */
//question - answer (bonnes réponses)
Question.belongsTo(Answer, {
    foreignKey: 'answer_id',
    as: 'right_answer'
})



/*  question -11       0N- level   */

// question - level -  une question a un niveau 1-1
Question.belongsTo(Level, {
    // clé étrangère
    foreignKey: 'level_id',
    // le nom du champ qui va contenir les résultats
    // lorsque on a une relation 11, pas besoin de spécifier de 'as', on aura quand même un résultat dans une clé
    // si on a pas de 'as', le nom de la clé qui va être crée sera le nom de la classe mentionnée (ici 'Level')
    as: 'level'
})

// level - question - un level peut avoir plusieurs questions 0N
Level.hasMany(Question, {
    foreignKey: 'level_id', // on re mentionne la clé étrangère pour le chemin retour
    as: 'questions' // pour trouver comment nommer le 'as', on regarde l'élément à droite de la configuration en corus (ici level)
});


/* user - 0N            11 - Quiz */
// User -quiz - un utilisateur peut créer de 0 à plusieurs quiz
User.hasMany(Quiz, {
    foreignKey: 'user_id',
    as: 'quizzes'
})

Quiz.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'author'
})

/* quiz - 0N             11 question */
// quiz question
Quiz.hasMany(Question, {
    foreignKey: 'quiz_id',
    as: 'questions'
})

Question.belongsTo(Quiz, {
    foreignKey: 'quiz_id',
    as: 'quiz'
})


// Quiz -0N           0N theme
// quiz -theme, un quiz a plusieurs themes et un thème a plusieurs quiz
// ce qui nous amène à faire définir une table de liaison

// pour se faire, on va utiliser des informations qui sont les suivantes : la table à travers laquelle le lien va être fait, et avec une clé étrangère et une autre

Quiz.belongsToMany(Tag, {
    as: 'tags',
    // à travers :
    through: 'quiz_has_tag',
    // clé étrangère 1
    foreignKey: 'quiz_id',
    // clé étrangère 2
    otherKey: 'tag_id'
});

Tag.belongsToMany(Quiz, {
    as: 'quizzes',
    through: 'quiz_has_tag',
    foreignKey: 'tag_id',
    otherKey: 'quiz_id',
});

// on exporte tous les modèles
module.exports = { Level, Question, Answer, Quiz, Tag, User, Answer }