const { Quiz } = require('../models')


const mainController = {
    homePage: async (req, res) => {
        try {
            const quizzes = await Quiz.findAll({
                include: 'author'
            });

            res.render('home', { quizzes });

          } catch (error) {

            console.error(error);
            res.status(500).send(`An error occured with the database :\n${error.message}`);
          };
    },
};

module.exports = mainController;