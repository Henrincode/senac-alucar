'use client'

import { useState } from "react"

export function ClientView() {
    const [minDate, setMinDate] = useState('')
    const [maxDate, setMaxDate] = useState('')
    const [carSelected, setCarSelected] = useState('1')
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
                        [&_.date]:text-black
                        [&_.date]:border-2
                        [&_.date]:border-black
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
                        <input type="text" placeholder="Nome completo" className="input" />
                        <input type="text" placeholder="E-Mail" className="input" />
                        <input type="number" placeholder="Telefone" min={0} className="
                        input [appearance:textfield]
                        [&::-webkit-outer-spin-button]:appearance-none
                        [&::-webkit-inner-spin-button]:appearance-none"/>
                        <input type="text" placeholder="Cidade" className="input" />
                        <div className="flex flex-col md:flex-row gap-2">
                            <div className="col">
                                <label htmlFor="startDate" className="label">Retirada</label>
                                <input type="date" name="" id="startDate" max={maxDate} onChange={(e) => setMinDate(e.target.value)} className="date invert" />
                            </div>
                            <div className="col">
                                <label htmlFor="endDate" className="label">Devolução</label>
                                <input type="date" name="" id="endDate" min={minDate} onChange={(e) => setMaxDate(e.target.value)} className="date invert" />
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
                        <button type="button" className="p-2 rounded-lg text-2xl text-gray-800 bg-amber-300 hover:bg-yellow-100 transition-all cursor-pointer">Reservar</button>
                    </div>

                    {/* select car */}
                    <div className="
                        flex-1 hidden md:flex flex-col
                        min-h-0 p-2

                        bg-amber-50/80
                        shadow-2xl shadow-black/80
                    ">
                        <p>aasdasd</p>
                        <p>aasdasd</p>
                        <p>aasdasd</p>
                        <p>aasdasd</p>
                        <p>aasdasd</p>
                        <p>aasdasd</p>
                        <p>aasdasd</p>
                        <p>aasdasd</p>
                        <p>aasdasd</p>
                        <p>aasdasd</p>
                        <div className="flex-1 min-h-0 p-10">
                            <img src="https://maxitintas.vteximg.com.br/arquivos/ids/156554-600-600/Preto-Onix-Hyundai-SW.png?v=638017888489900000" alt="" className="max-h-full object-contain" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}