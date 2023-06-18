import Layout from "@/components/Layout"
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Alert from "@/components/Alert";

const ProductForm = (info) => {
    const {_id, name:nameInfo, description:descriptionInfo, price:priceInfo, title} = info;

    const [name, setName] = useState( nameInfo || '');
    const [description, setDescription] = useState(descriptionInfo || '')
    const [price, setPrice] = useState(priceInfo || '')
    const [alertError, setAlertError] = useState('')
    const router = useRouter()
    
    const handleSubmit = async (e)=>{
        e.preventDefault()
        const data = {name, description, price}

        if(_id){
            await axios.put('/api/products', {...data, _id})
        }else{
            try {
                await axios.post('/api/products', data)
                
            } catch (error) {
                console.log(error)
                setAlertError(error?.response?.data.error)
            }
        }

        router.push('/products')
    
        
    }
    

    return (
        <Layout>
            <div className="flex flex-col w-1/2">
                <form onSubmit={handleSubmit}>
                    <h1 >{title}</h1>
                    { alertError && <Alert>{alertError}</Alert> }
                    <label htmlFor="">Nombre del producto</label>
                    <input type="text" value={name} placeholder="Nombre del producto" onChange={e => setName(e.target.value)}  />
                    <label htmlFor="">Descripción</label>
                    <textarea placeholder="Descripcion producto" onChange={(e) => setDescription(e.target.value)} value={description}/>
                    <label htmlFor="">Precio</label>
                    <input type="number" value={price} placeholder="Precio" onChange={e => setPrice(e.target.value)} />
                    <button className="btn-primary">Guardar</button>
                </form>
            </div>
        </Layout>
    )
}

export default ProductForm
