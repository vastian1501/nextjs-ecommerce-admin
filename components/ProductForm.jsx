import Layout from "@/components/Layout"
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Alert from "@/components/Alert";
import Image from "next/image";
import { DotLoader, BarLoader } from "react-spinners";
import { ReactSortable } from "react-sortablejs";

const ProductForm = (info) => {
    const { _id, name: nameInfo, category: categoryInfo, description: descriptionInfo, price: priceInfo, title, images: imagesInfo, properties: propertiesInfo } = info;

    const [name, setName] = useState(nameInfo || '');
    const [category, setCategory] = useState(categoryInfo || '');
    const [images, setImages] = useState(imagesInfo || [])
    const [description, setDescription] = useState(descriptionInfo || '')
    const [price, setPrice] = useState(priceInfo || '')
    const [alertError, setAlertError] = useState('')
    const [isLoading, setisLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [productProperties, setProductProperties] = useState(propertiesInfo || {})
    const router = useRouter()

    const handleSaveProduct = async (e) => {
        e.preventDefault()
        const data = { name, description, price, images, category, properties: productProperties }

        if (_id) {
            await axios.put('/api/products', { ...data, _id })
        } else {
            try {
                await axios.post('/api/products', data)

            } catch (error) {
                console.log(error)
                setAlertError(error?.response?.data.error)
            }
        }

        router.push('/products')
    }

    const handleUploadImage = async (e) => {
        const files = e.target?.files
        setisLoading(true)
        if (files?.length > 0) {
            const data = new FormData()

            for (const file of files) {
                data.append('file', file)
            }
            const { data: info } = await axios.post('/api/uploads', data)

            setImages(oldImages => {
                return [...oldImages, ...info.links]
            })
            setisLoading(false)
        }
    }

    const updateImagesOrder = (images) => {
        setImages(images)
    }

    useEffect(() => {
        axios.get('/api/categories').then(response => {
            setCategories(response.data)
        })
    }, [])

    const propertiesToFill = [];
    if (categories.length > 0 && category) {
        let catInfo = categories.find(({ _id }) => _id === category);
        propertiesToFill.push(...catInfo.properties);
        while (catInfo?.parent?._id) {
            const parentCat = categories.find(({ _id }) => _id === catInfo?.parent?._id);
            propertiesToFill.push(...parentCat.properties);
            catInfo = parentCat;
        }
    }

    function setProductProp(propName, value) {
        setProductProperties(prev => {
            const newProductProps = { ...prev };
            newProductProps[propName] = value;
            return newProductProps;
        });
    }

    return (
        <Layout>
            <div className="flex flex-col w-full lg:w-1/2">
                <form onSubmit={handleSaveProduct}>
                    <h1 >{title}</h1>
                    {alertError && <Alert>{alertError}</Alert>}
                    <label htmlFor="">Nombre del producto</label>
                    <input type="text" value={name} placeholder="Nombre del producto" onChange={e => setName(e.target.value)} />
                    <label htmlFor="">Categoria</label>
                    <select name="" id="" value={category} onChange={e => setCategory(e.target.value)}>
                        <option value="">Sin Categoria</option>
                        {categories && categories.map(category => (
                            <option key={category._id} value={category._id}>{category.name}</option>
                        ))}
                    </select>
                    {propertiesToFill.length > 0 && propertiesToFill.map(p => (
                        <div key={p.name} className="">
                            <label>{p.name[0].toUpperCase() + p.name.substring(1)}</label>
                            <div>
                                <select value={productProperties[p.name]}
                                    onChange={ev =>
                                        setProductProp(p.name, ev.target.value)
                                    }
                                >
                                    {p.values.map(v => (
                                        <option key={v} value={v}>{v}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    ))}
                    <label htmlFor="">Fotos</label>
                    <div className="flex flex-wrap gap-1">
                        <ReactSortable list={images} setList={updateImagesOrder} className="flex flex-wrap gap-1">
                            {!!images?.length && images.map(link => (
                                <div key={link} className=" h-24">
                                    <img src={link} alt="" className="max-w-full h-24 rounded shadow-md border border-gray-200" />
                                </div>
                            ))}
                        </ReactSortable>
                        {
                            isLoading &&
                            <div className="h-24 flex  items-center">
                                <BarLoader color="#36d7b7" />
                            </div>
                        }
                        <div className="inline-block">
                            <label className=" w-24 h-24 rounded-md flex flex-col items-center justify-center text-gray-500 gap-1 bg-gray-200 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
                                </svg>
                                Subir
                                <input type="file" className="hidden" onChange={e => handleUploadImage(e)} multiple />
                            </label>
                        </div>
                    </div>
                    <label htmlFor="">Descripción</label>
                    <textarea placeholder="Descripcion producto" onChange={(e) => setDescription(e.target.value)} value={description} />
                    <label htmlFor="">Precio</label>
                    <input type="number" value={price} placeholder="Precio" onChange={e => setPrice(e.target.value)} />
                    <button className="btn-primary">Guardar</button>
                </form>
            </div>
        </Layout>
    )
}

export default ProductForm
