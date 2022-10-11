const express = require("express")
const dotenv = require("dotenv")
const { graphqlHTTP } = require('express-graphql')
const { connectDB } = require("./src/db")

dotenv.config()

const app = express()

connectDB()

app.get('/', (req, res) => {
    res.send('HELLO WORLD')
})

app.use('/graphql', graphqlHTTP({
    schema: require('./src/graphql/schema'),
    graphiql: true
}))

app.listen(process.env.PORT, () => {
    console.log(`Server is running at port ${process.env.PORT}`)
})