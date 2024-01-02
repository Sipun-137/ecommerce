import mongoose from "mongoose";


const ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: { type: Number, required: true },
    category: String,
    sizes: Array,
    deliveryinfo: String,
    onsale: String,
    priceDrop: String,
    imgUrl: { type: String, required: true }
}, { timestamps: true })

const Product = mongoose.models.Products || mongoose.model("Products", ProductSchema)
export default Product;