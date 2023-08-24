const { Tag } = require('../models');

const tagController = {
    async index(req, res) {
        try {

            const tags = await Tag.findAll();

            res.render('tags', { tags: tags });
            // res.render('tags', { tags });
        } catch (error) {
            console.log(error.message);
        }
    },

    async show(req, res) {
        try {
            // * On a validé res.params avant
            const id = req.params.id;

            const tag = await Tag.findByPk(id, {
                include: {
                    association: 'quizzes', include: 'author'
                }
            });

            res.render('tag', { tag: tag })
        } catch (error) {
            console.log(error.message);
        }
    }
}

module.exports = tagController;