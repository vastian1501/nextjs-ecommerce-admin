import mongoose, { model, models, Schema } from "mongoose";

const productSchema = new Schema({
    name:{type:String, required:true},
    description: String,
    price: {type: Number, required: true},
    images:[{type:String}],
    category:{type:mongoose.Types.ObjectId, ref:'Category'},
    properties: {type:Object},
})

export const Product =models.Product || model('Product', productSchema)