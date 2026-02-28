'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NavBarAdm() {
    const router = useRouter()
    return (
        <>
            {/* nav */}
            <nav className="fixed w-full bg-gray-700">
                <div className="
                    box flex flex-row justify-between items-center
                    gap-2 p-2
                    text-white
                    [&_.link]:hover:text-gray-300
                ">
                    {/* logo */}
                    <div className="font-semibold text-3xl">
                        <Link onClick={() => router.refresh()} href={'/admin'} className="link">
                            CPainel - Alucar
                        </Link>
                    </div>
                    {/* links */}
                    <ul className="flex flex-row gap-4">
                        <li><Link onClick={() => router.refresh()} href={'/admin/reservas'} className="link">Reservas</Link></li>
                        <li><Link onClick={() => router.refresh()} href={'/admin/clientes'} className="link">Clientes</Link></li>
                        <li><Link onClick={() => router.refresh()} href={'/admin/carros'} className="link">Carros</Link></li>
                    </ul>
                </div>
            </nav>
        </>
    )
}