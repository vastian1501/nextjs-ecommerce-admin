import { Category } from "@/models/Category";
import { mongooseConect } from "@/lib/mongoosedb";

export default async function handler(req, res){
    const { method } = req
    await mongooseConect()

    if( method === "GET"){
        res.json(await Category.find().populate('parent'))
    }

    if( method === "POST"){
        const { name, parentCategory } = req.body
        await Category.create({
            name,
            parent: parentCategory
        })

        res.json('OK')
    }

    if( method === 'PUT'){
        const { name, parentCategory, _id } = req.body

        await Category.updateOne({_id},{
            name,
            parent: parentCategory
        })

        res.json('Category update')
    }

    if( method === 'DELETE'){
        const { _id } = req.query

        await Category.deleteOne({_id})

        res.json('Category delete')
    }
}