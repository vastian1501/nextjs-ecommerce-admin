import { Product } from "@/models/Product"
import { mongooseConect } from "@/lib/mongoosedb"

export default async function handler(req, res) {
    const { method } = req
    await mongooseConect();

    if( method == "GET" ){

        if(req.query?.id){
            res.json(await Product.findOne({_id:req.query.id}))
        }else{
            res.json(await Product.find())
        }

    }

    if( method === 'POST'){
        const {name, description, price, images} = req.body

        if( !name || !description || !price  ){
            return res.status(400).json({error:'Los campos no pueden estar vacios'})
        }else{
            const productDoc = await Product.create({
                name,description, price, images
            })
            return res.status(200).json({ name: 'Peticion recibida' })
        }

    }

    if( method == "PUT" ){

        const {_id, name, description, price, images} = req.body

        if( !name || !description || !price  ){
            return res.status(400).json({error:'Los campos no pueden estar vacios'})
        }else{
            //console.log(id)
            await Product.updateOne(
                {_id},
                {
                    name,
                    description, 
                    price, 
                    images
                }
            ) 
            return res.status(200).json({ name: 'Producto actualizado' })
        }

    }

    if( method == "DELETE" ){

        if(req.query?.id){
            //console.log(req.query?.id)
            await Product.deleteOne({_id:req.query.id})
            return res.status(200).json({ name: 'Producto borrado' })
        }

    }
    
  }