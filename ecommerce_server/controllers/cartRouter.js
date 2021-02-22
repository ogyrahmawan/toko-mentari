const {Product, User, Cart} = require('../models/index')

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
                attributes: ['id', 'UserId', 'ProductId', 'quantity']
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
                ProductId : +req.body.ProductId
            }
            let productData = await Product.findOne({
                where: {
                    id: obj.ProductId
                }
            })
            let data = await Cart.findOne({
                include:{
                    model: Product
                },
                where: {
                    UserId: obj.UserId,
                    ProductId : obj.ProductId
                },
                attributes: ['id', 'UserId', 'ProductId', 'quantity']
            })
            //kalau belum ada
            if(!data) {
                //cek stocknya masih ada atau tidak
    
                if(productData.stock > 0) {
                    let cart = await Cart.create(obj)
                    res.status(201).json(cart)
                } else {
                    throw({
                        status: 400,
                        message: 'stock not available'
                    })
                }
            } 
            //kalau sudah ada
            else {
                if((data.quantity + 1) <= productData.stock) {
                    let cart = await Cart.update({quantity: +data.quantity + 1}, {
                        where: {
                            id: data.id
                        },
                        returning: true
                    })

                    res.status(200).json(cart[1][0])
                } else {
                    throw({
                        status: 400,
                        message: 'stock not available'
                    })
                }
            }
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
}
module.exports = CartRouter