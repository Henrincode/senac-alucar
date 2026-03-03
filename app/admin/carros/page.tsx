import { findCarBrands, findCarCategories, findCarModels } from "@/server/actions/car.action"
import ClientViewAdmin from "./ClientView"

export default async function PageAdmin() {
    const cars = await findCarModels()
    const categories = await findCarCategories()
    const brands = await findCarBrands()
    return (
        <ClientViewAdmin cars={cars} categories={categories} brands={brands} />
    )
}