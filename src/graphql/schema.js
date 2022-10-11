const { GraphQLSchema, GraphQLObjectType } = require('graphql')
const queries = require('./queries')

const QueryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'This type holds all of my queries',
    fields: queries
})

module.exports = new GraphQLSchema({
    query: QueryType
})