const cote = require('cote')({ redis: { host: 'localhost', port: "6379" } })
const orderService = new cote.Responder({ 
    name: 'Order Service',
    key: 'order'
})

const app = require('./app')

const Order = require('./model')
 
orderService.on('index', async ({ query }, cb) => {
    try {
        const docs = await app.service('orders').find({query})
        cb(null, docs)   
    } catch (error) {
        cb(error, null)
    }    
})

orderService.on('show', async ({ _id }, cb) => {
    try {
        const doc = await app.service('orders').get(_id)
        cb(null, doc)
    } catch (error) {
        cb(error, null)
    }
})

orderService.on('store', async ({ body }, cb) => {
    try {
        const doc = await app.service('orders').create(body)        
        cb(null, doc)              
    } catch (error) {
        cb(error, null)
    }    
})

orderService.on('update', async ({ _id, body }, cb) => {
    try {
        const doc = await app.service('orders').patch(_id, body)
        cb(null, doc)
    } catch (error) {
        cb(error, null)
    }
})

// Hooks
const productRequester = new cote.Requester({ 
    name: 'Product Requester', 
    key: 'product',
})

app.service('orders').hooks({
    after: {
        create: [
            (context) => {
                productRequester.send({ type: 'update', _id: context.data.productId, body: {$inc: {stock: 1}} })
                return context
            }
        ]
    }
})