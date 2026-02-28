'use client'

export default function ClientViewAdmin() {
    return (
        <div className="
        [&_.icon-img]:size-30
        [&_.icon-img]:rounded-xl
        [&_.icon-img]:bg-gray-500

        [&_.icon-tittle]:text-center
        [&_.icon-tittle]:
        [&_.icon-tittle]:
        [&_.icon-tittle]:
        [&_.icon-tittle]:
        ">
            <ul className="flex flex-row justify-center gap-4">
                <li>
                    <div className="icon-img"></div>
                    <p className="icon-tittle">Reservas</p>
                </li>
                <li>
                    <div className="icon-img"></div>
                    <p className="icon-tittle">Usuários</p>
                </li>
                <li>
                    <div className="icon-img"></div>
                    <p className="icon-tittle">Carros</p>
                </li>
            </ul>
        </div>
    )
}