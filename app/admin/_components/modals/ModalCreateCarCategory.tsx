'use client'

import { createCarCategory, deleteCarCategory, findCarCategories, updateCarCategory } from "@/server/actions/car.action"
import { CarCategory } from "@/types/car.types"
import { useEffect, useState } from "react"

export default function ModalCreateCarCategory({ closeModal }: { closeModal: () => void }) {

    const [data, setData] = useState<CarCategory[]>([])

    const [inputCreateData, setInputCreateData] = useState('')
    const [inputUpdateData, setInputUpdateData] = useState<number>()
    const [inputDeletData, setInputDeletData] = useState<number>()

    const [name, setName] = useState('')

    const [message, setMessage] = useState('')

    // Load data
    async function loadData(reset: boolean = false) {
        const res = await findCarCategories()
        if (res.success && res.data.length > 0) {
            setData(res.data)
            if (!inputUpdateData || inputUpdateData === inputDeletData) setInputUpdateData(res.data[0].id_car_category)
            if (!inputDeletData || reset) setInputDeletData(res.data[0].id_car_category)
        }
    }

    // Create
    async function clickCreateData() {
        const data = await createCarCategory({ name: inputCreateData })
        setMessage('')
        if (data.success) {
            setInputCreateData('')
        } else {
            setMessage(data.message)
        }

        await loadData()
    }

    // Update
    async function clickUpdateData() {
        const payload = {
            id_car_category: Number(inputUpdateData),
            name
        }

        if (name) await updateCarCategory(payload)

        setName('')
        await loadData()
        setInputUpdateData(payload.id_car_category)
    }

    // Delete
    async function clickDeleteData() {
        const id = Number(inputDeletData)
        const res = await deleteCarCategory(id)
        setMessage('')
        if (res.success) {
            await loadData(true)
        } else {
            const msg = res.message === '23503' ? 'Categoria não esta limpa' : 'Erro desconhecido'
            setMessage(msg)
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <>
            <div onMouseDown={(e) => e.stopPropagation()} className="
                flex
                flex-col
                items-center
                gap-2

                w-full
                lg:w-fit
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
                [&_.campo]:lg:w-50
                [&_.campo]:px-2
                [&_.campo]:py-1
                [&_.campo]:text-gray-700
                [&_.campo]:bg-blue-50

                [&_.line]

                [&_button]:w-full
                [&_button]:px-2
                [&_button]:py-1
                [&_button]:lg:text-sm
                [&_button]:transition-all
                [&_button]:text-gray-800
                [&_button]:hover:text-white
                [&_button]:bg-blue-300
                [&_button]:hover:bg-blue-500
                [&_button]:cursor-pointer
            ">
                <p className="text-2xl">Carro Categoria</p>

                <div className="w-full h-1 rounded-full bg-white/20"></div>

                <div className="flex flex-col lg:flex-row flex-wrap gap-2 w-full">

                    {/* creat */}
                    <form action={clickCreateData} className="flex flex-col items-center gap-2">
                        <input onChange={(e) => setInputCreateData(e.target.value)} value={inputCreateData}
                            type="text" name="name" placeholder="Escreva um nome" className="campo"
                        />
                        <button>Cadastrar</button>
                    </form>

                    <div className="h-line"></div>

                    {/* delete */}
                    <div className="flex flex-col items-center gap-2">
                        <select onChange={(e) => setInputDeletData(Number(e.target.value))} value={inputDeletData} name="category" id="category" className="campo">
                            {data.map((c, i: number) => <option key={i} value={c.id_car_category}>{c.name}</option>)}
                        </select>
                        <button onClick={clickDeleteData} type="button">Apagar</button>
                    </div>

                    <div className="h-line"></div>

                    {/* update */}
                    <div className="flex flex-col gap-2">
                        {/* select */}
                        <div className="flex flex-row gap-2">
                            <select onChange={(e) => setInputUpdateData(Number(e.target.value))} name="category" id="category" value={inputUpdateData} className="campo">
                                {data.map((c, i: number) => <option key={i} value={c.id_car_category}>{c.name}</option>)}
                            </select>
                            {/* selected */}
                            <input onChange={(e) => setName(e.target.value)} value={name}
                                type="text" placeholder={data.find((c) => c.id_car_category === Number(inputUpdateData))?.name} className="campo" />
                        </div>
                        {/* update button */}
                        <button onClick={clickUpdateData} type="button" className="button">Renomear</button>
                    </div>
                </div>
                {message && (<p>{message}</p>)}
            </div>
        </>
    )
}