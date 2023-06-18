import { useState, useEffect } from "react"
import Layout from "@/components/Layout"
import Link from "next/link"
import axios from "axios";
import { toLocalCurrency } from "@/helpers/helper";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    try {
      const { data } = await axios.get('/api/products')
      setProducts(data)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <Layout>
      <Link className="bg-cyan-800 rounded p-2 text-white" href={'/products/new'}>Nuevo Producto</Link>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 md:my-6">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4 uppercase">Nombre</th>
                    <th scope="col" className="px-6 py-4 uppercase">Precio</th>
                    <th scope="col" className="px-6 py-4 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product =>
                  (<tr key={product._id} className="border-b dark:border-neutral-500">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">{product.name}</td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">{toLocalCurrency(product.price)}</td>
                    <td className="whitespace-nowrap px-6 py-4 flex gap-2">
                      <Link href={'/products/edit/' + product._id}>
                        <button className="btn-secondary">Editar</button>
                        
                      </Link>
                      <Link href={'/products/delete/' + product._id}>
                        <button className="btn-danger flex justify-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                        </button>
                      </Link>
                    </td>
                  </tr>)
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Products
