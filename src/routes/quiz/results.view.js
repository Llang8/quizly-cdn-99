const axios = require('axios')

module.exports = async(req,res) => {
    const query = `
        query submission($id: ID!) {
            submission(id: $id) {
                id,
                quiz {
                    title
                },
                user {
                    id
                },
                score
            }
        }
    `

    try {
        const response = await axios.post('http://localhost:3000/graphql',
        { 
            query: query,
            variables: {
                id: req.params.id
            }
        },
        {
            headers: {
                'Content-Type': 'application/json',
            }
        });   
        res.render('quiz-results', { submission: response.data.data.submission })
    }
    catch(err) {
        console.log(err)
        res.redirect('/')
    }
}