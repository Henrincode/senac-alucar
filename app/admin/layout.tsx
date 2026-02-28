import AsideBarAdmin from "./_components/AsideBarAdmin";
import NavBarAdm from "./_components/NavBarAdm";

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {

    return (
        <>
            <NavBarAdm />
            <div className="
                box flex flex-row 
                pt-20
                bg-gray-300
                ">
                {/* aside */}
                <AsideBarAdmin />
                {/* conteúdo */}
                <main className="flex-1">{children}</main>
            </div>
        </>
    )
}