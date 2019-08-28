exports.Order = `
  extend type Query {
    orders: [Order]
    order(_id: String!): Order
  }

  extend type Mutation {
    createOrder(input: OrderInput): Order
  }

  type Order {
    _id: String
    productId: String
    product: Product
    userId: String
    qty: Int
    price: Int 
  }

  input OrderInput {
    productId: String
    userId: String
    qty: Int
    price: Int 
  }  
`

exports.orderResolvers = {
  Query: {
    orders: async (_, {}, { orderRequester }) => {
        return await orderRequester.send({ type: 'index' })
    },
    order: async (_, { _id }, { orderRequester }) => {
        return await orderRequester.send({ type: 'show', _id })
    }
  },
  Order: {
    product: async (order, _, { productRequester }) => {
        return await productRequester.send({ type: 'show', _id: order.productId })
    }
  },
  Mutation: {
    createOrder: async (_, { input }, { orderRequester })=> {
        return await orderRequester.send({ type: 'store', body: input })
    }
  }
}