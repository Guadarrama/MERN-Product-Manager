const Product = require('../models/Product.model')

class ProductsController {
    getAll(req, res){
        Product.find({})
            .then(products => res.json(products))
            .catch(err => res.json(err));
    }
    create(req, res){
        let newProduct = new Product(req.body);
        newProduct.save()
            .then(() => res.json({msg: "product created"}))
            .catch(err => res.json(err));
    }
}

module.exports = new ProductsController();