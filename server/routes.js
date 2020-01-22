const Products = require('./controllers/Products.controller');

module.exports = app =>{
    app.get("/api/products", Products.getAll)
    app.post("/api/products", Products.create);
}