const express = require("express")
const dotenv = require("dotenv")
const { graphqlHTTP } = require('express-graphql')
const { connectDB } = require("./src/db")
const cookieParser = require("cookie-parser")
const { create } = require("./src/models/user.model")
const { authenticate } = require("./src/middleware/auth")
const { userData } = require('./src/middleware/userData')

dotenv.config()

const app = express()

app.use(cookieParser())

app.use('/graphql', graphqlHTTP({
    schema: require('./src/graphql/schema'),
    graphiql: true
}))

app.set("view engine", "ejs")
app.set("views", "./src/templates/views")

app.use(express.urlencoded({ extended: true }))

app.use(authenticate)
app.use(userData)

connectDB()

require("./src/routes")(app)

/* app.get('/test', (req, res) => {
    const { createJWT } = require('./src/util/auth')

    const user = {
        id: '1',
        username: 'christophert',
        firstName: 'Christopher',
        lastName: 'Thrutchley',
        favoriteColor: 'It changes from time to time but right now it\'s definitely like orange',
        favoriteNumber: 10
    }

    res.send(createJWT(user))
}) */

app.listen(process.env.PORT, () => {
    console.log(`Server is running at port ${process.env.PORT}`)
})