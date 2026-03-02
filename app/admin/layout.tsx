import { findCarBrands } from "@/server/actions/car.action";
import AsideBarAdmin from "./_components/AsideBarAdmin";
import NavBarAdm from "./_components/NavBarAdm";
import { CarBrand, CarBrandReturn } from "@/types/car.types";

export default async function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {

    const dataBrands = await findCarBrands()

    
    
    return (
        <>
            <NavBarAdm />
            <main className="pt-20">{children}</main>
        </>
    )
}