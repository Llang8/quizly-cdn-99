const axios = require('axios')

module.exports = async(req,res) => {
    const query = `
        query quizBySlug($slug: String!) {
            quizBySlug(slug: $slug) {
                id,
                slug,
                description,
                title,
                questions {
                    id,
                    title,
                    order,
                    correctAnswer
                }
            }
        }
    `

    try {
        const response = await axios.post('http://localhost:3000/graphql', {
            query: query,
            variables: {
                slug: req.params.slug
            }
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const quizData = response.data.data.quizBySlug
        res.render('quiz', { quiz: quizData, user: req.verifiedUser.user })
    }
    catch (err) {
        console.log(err)
        res.redirect('/')
    }
}