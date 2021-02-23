const {Product, User, Cart} = require('../models/index')
const {sequelize} = require('../models/index')
const Xendit = require('xendit-node')
const x = new Xendit({
    secretKey: 'xnd_development_nR1bhWWT3qRDOPr66ylbAuHepJsl0z5zfZWeidX4yhEuPIZEDywZOTyrqrdp9'
}) 

class CartRouter {
    static async getCart (req, res, next) {
        try {
            let data = await Cart.findAll({
                where: {
                    UserId: req.userLoggedIn.id
                },
                include: {
                    model: Product
                },
                attributes: ['id', 'UserId', 'ProductId', 'status']
            })
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
    static async addCart (req, res, next) {
        try {
            let obj = {
                UserId: req.userLoggedIn.id,
                ProductId : +req.body.ProductId,
                status: 'unpaid'
            }
            let cart = await Cart.create(obj)
            res.status(201).json(cart)
        } catch (error) {
            next(error)
        }
    }
    static async deleteFromCart (req, res, next) {
        try {
            let id = req.params.id
            let data = await Cart.destroy({
                where: {
                    id
                }
            })
            res.status(200).json({message: `delete success`})
        } catch (error) {
            next(error)
        }
    }
    static async makeTransaction (req, res, next) {
        const t = await sequelize.transaction()
        try {
            let data = req.body.cartData
            let promises = []
            for(let i = 0; i < data.length; i++){
                promises.push(await Cart.update({status: 'paid'}, {
                    where: {
                        id: data[i].id
                    }
                }))
            }
            let result = await Promise.all(promises)
            await t.commit()
            const { Invoice } = x;
            const invoiceSpecificOptions = {};
            const i = new Invoice(invoiceSpecificOptions);
            const resp = await i.createInvoice({
                externalID: 'demo_1475801962607',
                amount: req.body.totalPrice,
                payerEmail: req.body.email,
                description: 'Payment for ebook',
            });
            res.status(201).json(resp.invoice_url)
        } catch (error) {
            await t.rollback()
            next(error)
        }
    }
    static async getTransaction (req, res, next) {
        try {
            let data = await Cart.findAll({
                where: {
                    UserId: req.userLoggedIn.id,
                    status: 'paid'
                },
                order: [
                    ['id']
                ],
                include: {
                    model: Product
                },
                attributes: ['id', 'UserId', 'status']
            })

            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
}
module.exports = CartRouter