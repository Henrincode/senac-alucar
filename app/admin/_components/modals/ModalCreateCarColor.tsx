'use client'

export default function ModalCreateCarColor({ closeModal }: { closeModal: () => void }) {

    return (
        <div onMouseDown={(e) => e.stopPropagation()} className="
            w-full
            lg:max-w-4xl bg-white
        ">
            Carro cor
        </div>
    )
}