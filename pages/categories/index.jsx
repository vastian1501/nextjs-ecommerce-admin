import Layout from "@/components/Layout"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import { withSwal } from "react-sweetalert2"

const CategoriesPage = ({swal}) => {
    const [editedCategory, setEditedCategory] = useState()
    const [name, setName] = useState('')
    const [parentCategory, setParentCategory] = useState()
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getCategories()
    }, [])


    const handleSaveCategory = async (e) => {
        e.preventDefault()
        const data = { name, parentCategory }
        if (editedCategory) {
            data._id = editedCategory._id
            await axios.put('/api/categories', data)
            setEditedCategory(null)
        } else {
            await axios.post('/api/categories', data)
        }
        getCategories()
        setName('')
    }

    const getCategories = async () => {
        const { data } = await axios.get('/api/categories')
        //console.log(data)
        setCategories(data)

    }

    const handleEditCategory = (category) => {
        setEditedCategory(category)
        setName(category.name)
        setParentCategory(category.parent?._id)
        console.log(editedCategory)
    }

    const handleDeleteCategory = (category) => {
        swal.fire({
            title: 'Eliminar Categoria',
            text: '¿Estas seguro que quieres eliminar la categoria '+category.name+'?',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Si, estoy seguro',
            confirmButtonColor: '#d55',
            reverseButtons: true,
            didOpen: () => {
                // run when swal is opened...
            },
            didClose: () => {
                // run when swal is closed...
            }
        }).then( async result => {
            if(result.isConfirmed){
                const {_id} = category
                await axios.delete('/api/categories?_id='+_id)
                getCategories()
            }
        }).catch(error => {
            // when promise rejected...
        });
    }

    return (
        <Layout>
            <h1 >Categorias</h1>
            <form onSubmit={handleSaveCategory}>
                <label htmlFor="">{editedCategory ? 'Editar categoria' : 'Crear nueva categoria'}</label>
                <div className="flex">
                    <input type="text" placeholder="Nombre de la categoria" value={name} onChange={e => setName(e.target.value)} className="w-1/2" />
                    <select name="" id="" className="ml-4 w-1/3" onChange={e => setParentCategory(e.target.value)} value={parentCategory}>
                        <option value="" default>Sin categoria padre</option>
                        {categories && categories.map(category => (
                            <option key={category} value={category._id}>{category.name}</option>
                        ))}
                    </select>

                </div>
                <button type="submit" className="btn-primary">Guardar</button>
            </form>
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 md:my-6">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full text-left text-sm font-light">
                            <thead className="border-b font-medium dark:border-neutral-500">
                                <tr>
                                    <th scope="col" className="px-6 py-4 uppercase">Nombre</th>
                                    <th scope="col" className="px-6 py-4 uppercase">Categoria Padre</th>
                                    <th scope="col" className="px-6 py-4 uppercase">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map(category =>
                                (<tr key={category._id} className="border-b dark:border-neutral-500">
                                    <td className="whitespace-nowrap px-6 py-4 font-medium">{category.name}</td>
                                    <td className="whitespace-nowrap px-6 py-4 font-medium">{category?.parent?.name}</td>
                                    <td className="whitespace-nowrap px-6 py-4 flex gap-2">
                                        <button className="btn-secondary" onClick={() => handleEditCategory(category)}>Editar</button>

                                        <button className="btn-danger flex justify-center" onClick={()=> handleDeleteCategory(category)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>)
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default withSwal(({ swal }, ref) => (
    <CategoriesPage swal={swal} />
));
