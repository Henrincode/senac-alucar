'use client'

export default function ModalCreateCarColor({ closeModal }: { closeModal: () => void }) {

    return (
        <div onMouseDown={(e) => e.stopPropagation()} className="min-w-100 bg-white">
            Carro cor
        </div>
    )
}