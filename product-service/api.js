const app = require('./app')

const listener = app.listen(0, ()=> console.log(`Listening on port ${listener.address().port}`))