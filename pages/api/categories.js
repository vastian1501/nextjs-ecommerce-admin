import { Category } from "@/models/Category";
import { mongooseConect } from "@/lib/mongoosedb";

export default async function handler(req, res){
    const { method } = req
    await mongooseConect()

    if( method === "GET"){
        res.json(await Category.find().populate('parent'))
    }

    if( method === "POST"){
        const { name, parentCategory, properties } = req.body
        await Category.create({
            name,
            parent: parentCategory || undefined,
            properties
        })

        res.json('OK')
    }

    if( method === 'PUT'){
        const { name, parentCategory, _id, properties } = req.body

        await Category.updateOne({_id},{
            name,
            parent: parentCategory || undefined,
            properties
        })

        res.json('Category update')
    }

    if( method === 'DELETE'){
        const { _id } = req.query

        await Category.deleteOne({_id})

        res.json('Category delete')
    }
}