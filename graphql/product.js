exports.Product = `
  extend type Query {
    products: [Product]
    product(_id: String!): Product
  }

  extend type Mutation {
    createProduct(input: ProductInput): Product
  }

  type Product {
    _id: String
    title: String
    price: Int
    stock: Int
  }

  input ProductInput {
    title: String
    stock: Int
    price: Int 
  } 
`

exports.productResolvers = {
  Query: {
    products: async (_, {}, { productRequester }) => {
      return await productRequester.send({ type: 'index', query: {} })
    },
    product: async (_, { _id }, { productRequester }) => {
      return await productRequester.send({ type: 'show', _id })
    }
  },
  Mutation: {
    createProduct: async (_, { input }, { productRequester })=> {
      return await productRequester.send({ type: 'store', body: input }) 
    }
  }
}