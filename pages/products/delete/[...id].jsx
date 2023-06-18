import Layout from "@/components/Layout"
import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"


const DeleteProduct = () => {
    const [product, setProduct] = useState()

    const router = useRouter()
    const id = router.query.id


    useEffect(() => {
      axios.get('/api/products?id='+id).then(response =>{
        setProduct(response.data)
      })
    }, [id])
    
    const handleGoBack = () => {
        router.push('/products')
    }

    const handleDeleteProduct = () =>{
        if(id){
            axios.delete('/api/products?id='+id)
            handleGoBack()
        }
    }


  return (
    <Layout>
        <div className="flex flex-col justify-center">
            <h1 className="text-center font-semibold text-xl my-8">¿Esta seguro que desea eliminar el producto {product?.name}?</h1>
            <div className="flex gap-8 self-center"> 
                <button  onClick={handleDeleteProduct} className="btn-danger">Si</button>
                <button onClick={handleGoBack} className="btn-gray">No</button>
            </div>
        </div>
    </Layout>
  )
}

export default DeleteProduct
