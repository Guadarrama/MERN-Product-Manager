const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "a title is required"],
        minlength: [2, "Name min length is 2 characters"]
    },
    price: {
        type: Number,
        required: [true, "Must enter name"]
    },
    description: String
    }
    //{timestamps: true}
);

module.exports = mongoose.model("Product", ProductSchema);