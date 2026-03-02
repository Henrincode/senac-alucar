'use client'

import imageCompression from "browser-image-compression"
import { useState } from "react"
import Image from 'next/image'

interface FileToUpload {
    image: File
    name: string
}

export default function ModalCreateCarModel({ closeModal }: { closeModal: () => void }) {

    const [addCar, setAddCar] = useState(false)

    const [imageUrl, setImageUrl] = useState('')
    const [fileToUpload, setFileUpload] = useState<FileToUpload>()

    // capturar o arquivo do input, comprimir e enviar o obj para um hook
    async function renderImage(e: React.ChangeEvent<HTMLInputElement>) {

        // captura o arquivo do input
        const imageFile = e.target.files?.[0]
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

                [&_.button]:w-full
                [&_.button]:px-2
                [&_.button]:py-1
                [&_.button]:lg:text-sm
                [&_.button]:transition-all
                [&_.button]:text-gray-800
                [&_.button]:hover:text-white
                [&_.button]:bg-blue-300
                [&_.button]:hover:bg-blue-500
                [&_.button]:cursor-pointer
            ">
                <div className="relative flex flex-row items-center lg:gap-2 w-full lg:w-4xl text-2xl">
                    <button onClick={() => setAddCar(true)} className="lg:absolute px-2 py-1 text-sm text-gray-800 bg-blue-300">Adicionar</button>
                    <p onClick={() => setAddCar(false)} className="flex-1 text-right lg:text-center"><span className="hidden lg:inline">Carro</span> modelo</p>
                </div>

                <div className="w-full h-1 rounded-full bg-white/20"></div>

                {addCar && (
                    <>
                        <label htmlFor="foto">enviar foto</label>
                        <input id="foto" onChange={renderImage} type="file" accept="image/*" className="hidden" />
                        <div className="flex justify-center items-center size-25  bg-amber-100">
                            <Image alt="" width={500} height={500} src={imageUrl || 'https://freepngimg.com/save/webp/3964-hyundai-car-logo-png-brand-image'} />
                        </div>
                    </>
                )}
            </div>
        </>
    )
}