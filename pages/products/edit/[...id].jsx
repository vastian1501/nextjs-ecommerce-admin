import ProductForm from "@/components/ProductForm"
import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const Edit = () => {
    const router = useRouter()
    const { id } = router.query
    const [info, setInfo] = useState(null)

    useEffect(() => {
        if(id){
            axios.get('/api/products?id='+id).then((response) =>{
                setInfo(response.data)
            })
        }

    }, [id])
    
  return (
  <>
    { info && (
        <ProductForm {...info} title="Editar Producto"/>
    )}
  </>
  )
}

export default Edit