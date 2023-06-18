import { model, models, Schema } from "mongoose";

const productSchema = new Schema({
    name:{type:String, required:true},
    description: String,
    price: {type: Number, required: true}
})

export const Product =models.Product || model('Product', productSchema)