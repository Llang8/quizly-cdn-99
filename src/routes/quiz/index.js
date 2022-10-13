const MainQuizRouter = require("express").Router()

MainQuizRouter.route('/create')
    .get(require('./create.view.js'))
    .post(require('./create'))

MainQuizRouter.route('/:slug')
    .get(require('./quiz.view.js'))

MainQuizRouter.route('/:slug/submit')
    .post(require('./submit.js'))

MainQuizRouter.route('/success/:slug')
    .get(require('./success.view.js'))

MainQuizRouter.route('/results/:id')
    .get(require('./results.view.js'))

module.exports = MainQuizRouter