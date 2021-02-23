const CartRouter = require('../controllers/cartRouter')
const authenctication = require('../middleware/authentication')
const authorization = require('../middleware/CustomerAuthorization')
const route = require('express').Router()

route.use(authenctication)
route.get('/', CartRouter.getCart)
route.post('/', CartRouter.addCart)
route.delete('/:id', authorization, CartRouter.deleteFromCart)
route.post('/checkout', CartRouter.makeTransaction)
route.get('/transaction', CartRouter.getTransaction )

module.exports = route