const { ApolloServer, gql, ApolloError } = require('apollo-server')
const merge = require('lodash')
const cote = require('cote')({ redis: { host: 'localhost', port: "6379" } })

const { Order, orderResolvers } = require('./order')
const { Product, productResolvers } = require('./product')

const productRequester = new cote.Requester({ 
  name: 'Product Requester', 
  key: 'product',
})
const orderRequester = new cote.Requester({ 
  name: 'Order Requester', 
  key: 'order',
})

// If you had Query fields not associated with a
// specific type you could put them here
const Query = `
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`
const resolvers = {}

const server = new ApolloServer({
  typeDefs: [ Query, Product, Order ],
  resolvers: merge(resolvers, productResolvers, orderResolvers),
  context: ({ req }) => ({
    productRequester,
    orderRequester
  })
})

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
})