'use client'

import { useState } from "react"
import { FaPaintbrush } from "react-icons/fa6"
import { IoIosColorFill } from "react-icons/io"
import { IoClose } from "react-icons/io5"

export default function ModalCreateCarColor({ closeModal }: { closeModal: () => void }) {

    const [page, setPage] = useState<string>('create')
    const [inputColor, setInputColor] = useState('')

    return (
        <div onMouseDown={(e) => e.stopPropagation()} className="
            w-full
            sm:max-w-xl

            drop-shadow-xl
            drop-shadow-black/50
        ">
            <div className="
                relative
                flex flex-row items-center gap-2
                p-4 sm:p-6 rounded-t-2xl
                font-bold
                text-2xl sm:text-4xl italic
                text-gray-700
                bg-amber-400
                ">
                <FaPaintbrush />
                <p>Cores dos carros</p>
                <div className="
                    absolute right-6
                    rounded-full
                    bg-gray-700 text-amber-200

                    hover:bg-gray-800 hover:text-amber-500
                    cursor-pointer transition-all
                ">
                    <IoClose />
                </div>
            </div>

            <div className="h-1 bg-gray-500"></div>

            <div className="
                flex flex-row justify-center items-center  gap-2
                p-2
                bg-white
                
                [&_button]:flex-1
                [&_button]:py-2
                [&_button]:rounded-lg
                [&_button]:font-semibold
                [&_button]:text-center
                [&_button]:text-gray-500
                [&_button]:bg-gray-100
                [&_button]:select-none
                [&_button]:cursor-pointer

                ">
                <button onClick={() => setPage('create')} className="hover:bg-blue-200">
                    Adicionar
                </button>
                <button onClick={() => setPage('update')} className="hover:bg-blue-200">
                    Editar
                </button>
                <button onClick={() => setPage('delete')} className="hover:bg-red-200">
                    Apagar
                </button>
            </div>

            <div className="h-0.5 bg-gray-100"></div>

            <div className="
                min-h-50 p-4 rounded-b-lg
                
                bg-white
                ">
                {/* create */}
                {page === 'create' && (
                    <>
                        <p className="font-bold text-xl text-gray-700">
                            Adicionar uma nova cor
                        </p>
                        <p className="italic text-sm text-gray-500">
                            Escreva o nome da cor e use a caixa colorida para mudar de a cor.
                        </p>

                        <div className="flex flex-row items-stretch gap-2 mt-4">
                            <input type="text" placeholder="Nome da cor" className="
                                w-full p-2 rounded-xl
                                border-2 outline-none
                                text-2xl
                                border-blue-200
                                bg-blue-50
                            "/>
                            <label htmlFor="inputColor" style={{ backgroundColor: inputColor || '#ccc' }}
                                className="relative flex justify-center items-center w-15 rounded-2xl">

                                <IoIosColorFill className="text-white size-full p-3" />

                                <input onChange={e => setInputColor(e.target.value)} id='inputColor' type="color"
                                    className="
                                    absolute
                                    size-0
                                    
                                    bottom-0
                                "/>
                            </label>
                        </div>
                    </>
                )}

                {/* update */}
                {page === 'update' && (
                    <p>Editar</p>
                )}

                {/* delete */}
                {page === 'delete' && (
                    <p>Apagar</p>
                )}
            </div>
        </div>
    )
}