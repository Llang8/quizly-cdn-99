const { GraphQLString, GraphQLNonNull, GraphQLList } = require('graphql')
const { QuestionInputType } = require('./types')
const { User, Quiz, Question } = require("../models")
/* 
* Register a user
*/
const register = {
    type: GraphQLString,
    args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
    },
    async resolve(parent,args) {
        // Check if a user with passed email exists
        const checkUser = await User.findOne({ email: args.email })

        if (checkUser) {
            throw new Error("User with this email address already exists")
        }

        const newUser = new User({ 
            username: args.username,
            password: args.password,
            email: args.email
        })

        await newUser.save()

        return newUser.id
    }
}

const login = {
    type: GraphQLString,
    args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
    },
    async resolve(parent,args) {
        const user = await User.findOne({ email: args.email  })

        if (!user || user.password !== args.password) {
            throw new Error("Password incorrect or user with this email does not exist")
        }

        return 'User Logged in'
    }
}

const createQuiz = {
    type: GraphQLString,
    args: {
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        userId: { type: GraphQLString },
        questions: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(QuestionInputType))) }
    },
    async resolve(parent, args) {
        /*
        Slugifying: 
        "This is a title" -> "this-is-a-title",
        "This is a title & a description" -> "this-is-a-title-a-description" 
        */
        const slug = args.title.toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replaceAll(' ', '-')

        let fullSlug = ''

        while(true) {
            let slugId = Math.floor(Math.random() * 1000000)
    
            fullSlug = slug + slugId

            const existingQuiz = await Quiz.findOne({ slug: fullSlug })

            if (!existingQuiz) {
                break
            }
        }

        const quiz = new Quiz({
            title: args.title,
            description: args.description,
            userId: args.userId,
            slug: fullSlug
        })

        await quiz.save()

        for (const question of args.questions) {
            const questionObject = new Question({
                title: question.title,
                correctAnswer: question.correctAnswer,
                order: question.order,
                quizId: quiz.id
            })
            questionObject.save()
        }

        return quiz.slug
    }
}

module.exports = {
    register,
    login,
    createQuiz
}