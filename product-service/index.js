const cote = require('cote')({ redis: { host: 'localhost', port: "6379" } })
const productService = new cote.Responder({ 
    name: 'Product Service',
    key: 'product'
})

const app = require('./app')
 
productService.on('index', async ({ query }, cb) => {
    try {
        const docs = await app.service('products').find({query})
        cb(null, docs)   
    } catch (error) {
        cb(error, null)
    }    
})

productService.on('show', async ({ _id }, cb) => {
    try {
        const doc = await app.service('products').get(_id)
        cb(null, doc)
    } catch (error) {
        cb(error, null)
    }
})

productService.on('store', async ({ body }, cb) => {
    try {
        const doc = await app.service('products').create(body)
        cb(null, doc)
    } catch (error) {
        cb(error, null)
    }
})

productService.on('update', async ({ _id, body }, cb) => {
    try {
        const doc = await app.service('products').patch(_id, body)
        cb(null, doc)
    } catch (error) {
        cb(error, null)
    }
})