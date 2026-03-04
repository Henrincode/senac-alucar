'use client'

import imageCompression from "browser-image-compression"
import { ReactElement, useEffect, useState } from "react"
import Image from 'next/image'
import { CarBrand, CarCategory, CarModel, CarModelErrors, CarModelReturn } from "@/types/car.types"
import { createCarModel, deleteCarModel, findCarBrands, findCarCategories, findCarModels, updateCarModel } from "@/server/actions/car.action"
import { IoCloseSharp } from "react-icons/io5"
import { IoIosCreate } from "react-icons/io"
import { MdCreate } from "react-icons/md"
import { FaCirclePlus, FaPlus } from "react-icons/fa6"
import { TbCirclePlus } from "react-icons/tb"

// TypeScript
interface FileToUpload {
    image: File
    name: string
}

const IMG_URL_DEFAULT = "https://st2.depositphotos.com/2268879/7526/v/450/depositphotos_75266819-stock-illustration-car-silhouette-modern.jpg"

export default function ModalCreateCarModel({ closeModal }: { closeModal: () => void }) {

    // page load
    useEffect(() => {
        loadModels()
        loadCategories()
        loadBrands()
    }, [])

    //-- STATES

    // DOM states
    const [addCar, setAddCar] = useState(false)

    // DB states
    const [models, setModels] = useState<CarModel[]>([])
    const [categories, setCategories] = useState<CarCategory[]>([])
    const [brands, setBrands] = useState<CarBrand[]>([])
    const [createCarErrors, setCreateCarErrors] = useState<CarModelErrors>({})

    // form states
    const [inputName, setInputName] = useState<string>('')
    const [inputCategory, setInputCategory] = useState<string>('')
    const [inputBrand, setInputBrand] = useState<string>('')
    const [inputDetails, setInputDetails] = useState<string>('')

    // file image states
    const [fileToUpload, setFileUpload] = useState<FileToUpload | null>(null)
    const [imageUrl, setImageUrl] = useState<string | null>(null)

    // id for edit car
    const [idForEdit, setIdForEdit] = useState<number | null>()

    //-- FUNCTIONS

    // DB load
    async function loadModels() {
        const response = await findCarModels()
        if (response.success) setModels(response.data)
    }
    async function loadCategories() {
        const response = await findCarCategories()
        if (response.success) {
            setCategories(response.data)
            setInputCategory(String(response.data[0].id_car_category))
        }
    }
    async function loadBrands() {
        const response = await findCarBrands()
        if (response.success) {
            setBrands(response.data)
            setInputBrand(String(response.data[0].id_car_brand))
        }
    }

    // form reset
    async function resetForm() {
        setInputName('')
        setInputCategory(String(categories[0].id_car_category))
        setInputBrand(String(brands[0].id_car_brand))
        setInputDetails('')

        setFileUpload(null)
        setImageUrl(null)

        setIdForEdit(null)
        setAddCar(false)
    }

    // open new car
    async function openNewCar() {
        setInputName('')
        setInputCategory(String(categories[0].id_car_category))
        setInputBrand(String(brands[0].id_car_brand))
        setInputDetails('')

        setFileUpload(null)
        setImageUrl(null)

        setIdForEdit(null)
        setAddCar(true)
    }


    // create car
    async function btn_createCar(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const payload: CarModel & { name: string } = {
            id_car_category_fk: Number(inputCategory),
            id_car_brand_fk: Number(inputBrand),
            name: inputName,
            details: inputDetails,
            image_file: fileToUpload
        }

        console.log('creat', payload)

        const response = await createCarModel(payload)
        if (response.success) {
            // const newModel = models.push(response.data)

            loadModels()
            resetForm()
            setFileUpload(null)
            setAddCar(false)
            setIdForEdit(null)
        } else {
            // Tratar erros
            if (response.errors) setCreateCarErrors(response.errors)
        }
    }

    // edit car
    async function editCar(car: CarModel) {

        setIdForEdit(car.id_car_model)
        setInputName(String(car.name))
        setInputCategory(String(car.id_car_category_fk))
        setInputBrand(String(car.id_car_brand_fk))
        setInputDetails(String(car.details || ''))

        // setFileUpload(null)
        setImageUrl(String(car.image_url || ''))

        setAddCar(true)
    }

    async function btn_updateCar(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const payload: CarModel & { id_car_model: number, name: string } = {
            id_car_model: Number(idForEdit),
            id_car_category_fk: Number(inputCategory),
            id_car_brand_fk: Number(inputBrand),
            name: inputName,
            details: inputDetails,
            image_file: fileToUpload
        }

        console.log(payload)

        const response = await updateCarModel(payload)
        if (response.success) {
            loadModels()
            resetForm()
            setFileUpload(null)
            setAddCar(false)
            setIdForEdit(null)
        } else {
            if (response.errors) setCreateCarErrors(response.errors)
        }
    }

    async function btn_delete() {
        if (!idForEdit) return
        const response = await deleteCarModel(idForEdit)

        if (response.success) {
            loadModels()
            resetForm()
        } else {
            if (response.errors) setCreateCarErrors(response.errors)
        }

    }

    // capturar o arquivo do input, comprimir e enviar o obj para um hook
    async function renderImage(e: React.ChangeEvent<HTMLInputElement>) {

        // captura o arquivo do input
        const imageFile = e.currentTarget.files?.[0]
        if (!imageFile) return

        // configuração da compressão, useWebWorker não trava o component
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1000,
            useWebWorker: true,
        }

        try {
            // comprime o arquivo
            const compressedFile = await imageCompression(imageFile, options)

            // cria url para preview
            const url = URL.createObjectURL(compressedFile)
            setImageUrl(url)

            // cria obj para tratar no backend
            const fileToUpload = {
                image: compressedFile,
                name: imageFile.name
            }

            // salva no hook
            setFileUpload(fileToUpload)

        } catch (error) {
            console.error("Erro:", error)
        }
    }

    return (
        <div onMouseDown={(e) => e.stopPropagation()} className="
            flex
            flex-col
            items-center
            gap-2
            h-[200%]

            w-full
            lg:max-w-4xl
            p-2
            rounded-2xl
            **:rounded-2xl
            **:outline-none
            
            text-white
            bg-blue-600

            [&_.h-line]:self-stretch
            [&_.h-line]:w-full
            [&_.h-line]:lg:w-1
            [&_.h-line]:h-1
            [&_.h-line]:lg:h-auto
            [&_.h-line]:rounded-full
            [&_.h-line]:bg-white/20

            [&_.campo]:w-full
            [&_.campo]:px-2
            [&_.campo]:py-1
            [&_.campo]:text-gray-700
            [&_.campo]:bg-blue-50

            [&_.button]:w-full
            [&_.button]:px-2
            [&_.button]:py-1
            [&_.button]:lg:text-sm
            [&_.button]:transition-all
            [&_.button]:text-gray-800
            [&_.button]:hover:text-white
            
            [&_.button]:cursor-pointer
            ">

            <div className="relative flex flex-row items-center lg:gap-2 w-full text-2xl">
                <button onClick={openNewCar} className="absolute flex flex-row gap- items-center px-2 py-1 text-sm text-gray-800 bg-blue-300 hover:bg-blue-500 hover:text-white cursor-pointer"><FaPlus /> Adicionar</button>
                <button onClick={closeModal} className="absolute right-0 px-2 py-1 text-sm text-gray-800 bg-blue-300 hover:bg-blue-500 hover:text-white cursor-pointer"><span className="font-extrabold">X</span> fechar</button>
                <p className="flex-1 text-center">Modelos<span className="hidden lg:inline"> de carros</span></p>
            </div>

            <div className="w-full h-1 rounded-full bg-white/20"></div>

            {addCar || (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                    {models.map((d, i) => (
                        <div key={i} onClick={() => editCar(d)} className="flex flex-col gap-1 p-2 text-center shadow-lg bg-white/10 hover:scale-150 hover:shadow-black/50 hover:bg-blue-500 transition-all cursor-pointer">
                            <Image
                                width={400}
                                height={400}
                                src={d.image_url || IMG_URL_DEFAULT} alt=""
                                className="aspect-video h-full object-cover" />
                            <div>
                                <p className="text-xl lg:text-3xl">{d.name}</p>
                                <p className="text-sm">{d.brand} / {d.category}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* form create car */}
            {addCar && (
                <form onReset={resetForm} onSubmit={(e) => idForEdit ? btn_updateCar(e) : btn_createCar(e)} className="grid grid-cols-1 lg:grid-cols-8 gap-2 w-full">
                    {/* Coluna da Imagem */}
                    <div className="col-span-1 lg:row-span-3 lg:col-span-4">

                        {/* form image */}
                        <input id="inputImage" onChange={renderImage} type="file" accept="image/*" className="hidden" />

                        <div className="relative size-full rounded-lg aspect-video lg:aspect-auto overflow-hidden">
                            <Image
                                alt=""
                                width={400}
                                height={400}
                                src={imageUrl || IMG_URL_DEFAULT}
                                className="absolute inset-0 size-full object-cover"
                            />
                            <label htmlFor="inputImage" className={`
                                        ${imageUrl ? "opacity-0" : "opacity-100"}
                                        cursor-pointer absolute transition-all hover:opacity-100 flex justify-center items-center size-full bg-black/30`}
                            >
                                <p className="size-fit p-2 shadow-lg shadow-black/50 text-gray-700 bg-white/90 rounded hover:bg-blue-200/90">
                                    enviar foto
                                </p>
                            </label>
                        </div>
                    </div>

                    {/* campos */}

                    {/* name */}
                    <input onChange={(e) => setInputName(e.target.value)} value={inputName} type="text" placeholder="Nome do modelo" className="campo lg:col-span-2" />

                    {/* categories */}
                    <select onChange={(e) => setInputCategory(e.target.value)} value={inputCategory} className="campo">
                        {categories.map((d, i) => (
                            <option key={i} value={d.id_car_category}>{d.name}</option>
                        ))}
                    </select>

                    {/* brands */}
                    <select onChange={(e) => setInputBrand(e.target.value)} value={inputBrand} className="campo">
                        {brands.map((d, i) => (
                            <option key={i} value={d.id_car_brand}>{d.name}</option>
                        ))}
                    </select>

                    {/* Textarea que define a altura da segunda linha */}
                    <textarea onChange={(e) => setInputDetails(e.target.value)} defaultValue={inputDetails} rows={8} className="campo lg:col-span-4 resize-none"></textarea>

                    {/* buttons */}
                    <div className=" lg:col-span-4 flex flex-row gap-2">
                        <button type="submit" className="button bg-blue-300 hover:bg-blue-500">{idForEdit ? 'Atualizar' : 'Cadastrar'}</button>
                        <button type="reset" className="button bg-blue-300 hover:bg-blue-500">Cancelar</button>
                        <button onClick={btn_delete} type="button" className={`${idForEdit || 'hidden'} button bg-red-300 hover:bg-red-500`}>Excluir</button>
                    </div>
                </form>
            )}
        </div>
    )
}