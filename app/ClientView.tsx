'use client'

import { useState } from "react"

interface Errors {
    name?: boolean
    mail?: boolean
    phone?: boolean
    city?: boolean
    minDate?: boolean
    maxDate?: boolean
}

export function ClientView() {
    const [minDate, setMinDate] = useState('')
    const [maxDate, setMaxDate] = useState('')
    const [carSelected, setCarSelected] = useState('1')

    const [name, setName] = useState('')
    const [mail, setMail] = useState('')
    const [phone, setPhone] = useState('')
    const [city, setCity] = useState('')

    const [errors, setErrors] = useState<Errors>({})

    async function btnRegister() {
        setErrors({})
        const newErrors: Errors = {}

        if (!name) newErrors.name = true
        if (!mail) newErrors.mail = true
        if (!phone) newErrors.phone = true
        if (!city) newErrors.city = true
        if (!minDate) newErrors.minDate = true
        if (!maxDate) newErrors.maxDate = true
        setErrors(newErrors)
        console.log('errors', errors)
        console.log('newerrors', newErrors)
    }

    return (
        <div className="
            w-dvw min-h-dvh md:h-dvh 

            bg-[url('https://dicas.olx.com.br/wp-content/uploads/2023/11/melhores-carros-para-pegar-estrada-2023.jpg')]
            bg-cover bg-center bg-no-repeat
        ">
            {/* background filter blur */}
            <div className="
                flex flex-col justify-center items-center
                w-full min-h-dvh md:h-full py-2 md:p-6
                backdrop-blur
            ">
                {/* main */}
                <div className="
                    box flex flex-row justify-center gap-8
                    h-full md:max-h-200
                    
                    [&>div]:rounded-lg
                ">
                    {/* form */}
                    <div className="
                        overflow-auto
                        self-star
                        flex flex-col gap-2
                        w-full md:w-100 p-2

                        text-white
                        bg-gray-700/80
                        shadow-2xl shadow-black/80

                        [&_.col]:flex-1
                        [&_.col]:flex
                        [&_.col]:flex-col

                        [&_.line]:h-0.5
                        [&>.line]:rounded-full
                        [&_.line]:bg-white/20

                        [&_.label]:pl-4
                        [&_.label]:font-light
                        [&_.label]:text-sm
                        [&_.label]:text-gray-300

                        [&_.input]:w-full
                        [&_.input]:p-2
                        [&_.input]:outline-none
                        [&_.input]:rounded-lg
                        [&_.input]:text-white
                        [&_.input]:border-2
                        [&_.input]:border-white

                        [&_.date]:w-full
                        [&_.date]:p-2
                        [&_.date]:outline-none
                        [&_.date]:rounded-lg
                        [&_.date]:text-whaite
                        [&_.date]:border-2
                        [&_.date]:border-whaite
                    ">
                        <h2 className="font-semibold text-4xl text-center md:italic">RESERVAR CARRO</h2>
                        <div className="line hidden"></div>
                        <p className="px-4 hidden font-light text-md text-justify hyphens-auto text-gray-200">
                            Aproveite nossas ofertas e seleciona ao lado a categoria
                            e modelo do carro, entraremos em contato com você informando
                            disponibildiade ou sugerindo o melhor veículo disponivel
                            na categoria
                        </p>
                        <div className="line"></div>
                        <input onChange={(e) => setName(e.target.value)} value={name}
                            type="text" placeholder="Nome completo" className={`input ${errors?.name && 'ring-2 ring-red-500'}`} />

                        <input onChange={(e) => setMail(e.target.value)} value={mail}
                            type="text" placeholder="E-Mail" className={`input ${errors.mail && 'ring-2 ring-red-500'}`} />

                        <input onChange={(e) => setPhone(e.target.value)} value={phone}
                            type="number" placeholder="Telefone" min={0} className={`
                        input [appearance:textfield]
                        [&::-webkit-outer-spin-button]:appearance-none
                        [&::-webkit-inner-spin-button]:appearance-none
                        ${errors.phone && 'ring-2 ring-red-500'}
                        `} />

                        <input onChange={(e) => setCity(e.target.value)} value={city}
                            type="text" placeholder="Cidade" className={`input ${errors.city && 'ring-2 ring-red-500'}`} />

                        <div className="flex flex-col md:flex-row gap-2">
                            <div className="col">
                                <label htmlFor="startDate" className="label">Retirada</label>
                                <input type="date" name="" id="startDate" max={maxDate} onChange={(e) => setMinDate(e.target.value)}
                                className={`date ${errors.minDate && 'ring-2 ring-red-500'}`} />
                            </div>
                            <div className="col">
                                <label htmlFor="endDate" className="label">Devolução</label>
                                <input type="date" name="" id="endDate" min={minDate} onChange={(e) => setMaxDate(e.target.value)}
                                className={`date ${errors.maxDate && 'ring-2 ring-red-500'}`} />
                            </div>
                        </div>
                        <div className="line"></div>
                        {/* space */}
                        <div className="flex-1 flex flex-col gap-2">
                            {/* car select */}
                            <div className="flex flex-row gap-2
                                [&_.button]:p-2
                                [&_.button]:rounded-lg
                                [&_.button]:border-2
                                [&_.button]:border-white
                                [&_.button]:bg-gray-600
                                [&_.button]:
                            ">
                                <button type="button" onClick={() => setCarSelected('1')} className="button">{"<<"}</button>

                                <select name="" id="" onChange={(e) => setCarSelected(e.target.value)} value={carSelected} className="button flex-1 text-center">
                                    <option value="1">Onix</option>
                                    <option value="2">HB20</option>
                                </select>

                                <button type="button" onClick={() => setCarSelected('2')} className="button">{">>"}</button>
                            </div>
                        </div>
                        <div className="line"></div>
                        <button onClick={btnRegister} type="button" className="p-2 rounded-lg text-2xl text-gray-800 bg-amber-300 hover:bg-yellow-100 transition-all cursor-pointer">Reservar</button>
                    </div>

                    {/* select car */}
                    <div className="
                        flex-1 hidden md:flex flex-col
                        min-h-0 p-2

                        bg-amber-50/80
                        shadow-2xl shadow-black/80
                    ">
                    </div>
                </div>
            </div>
        </div>
    )
}