const axios = require('axios')

module.exports = async (req, res) => {
    console.log(req.body, req.verifiedUser.user._id)

    const answers = []

    for (const answer in req.body) {
        if (answer !== 'title' && answer !== 'quizId') {
            answers.push({
                questionId: answer,
                answer: req.body[answer]
            })
        }
    }

    const mutation = `
    mutation submitQuiz($userId: String!, $quizId: String!, $answers: [AnswerInput!]!) { 
        submitQuiz( userId: $userId, quizId: $quizId, answers: $answers ) 
    }`

    try {
        const response = await axios.post('http://localhost:3000/graphql',
        { 
            query: mutation,
            variables: {
                userId: req.verifiedUser.user._id,
                quizId: req.body.quizId,
                answers: answers
            }
        },
        {
            headers: {
                'Content-Type': 'application/json',
            }
        });   
        const submissionId = response.data.data.submitQuiz
        res.redirect(`/quiz/results/${submissionId}`)
    }
    catch(err) {
        res.redirect('/')
    }
}