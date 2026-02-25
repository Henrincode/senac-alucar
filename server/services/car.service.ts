import { CarModel } from "@/types/car.types";
import sql from "@/server/db";
import { unstable_cache } from "next/cache";

// find
const findModels = unstable_cache(
    async (): Promise<CarModel[]> => {
        const data = await sql`
            SELECT
                id_car_model,
                id_car_brand_fk,
                id_car_category_fk,
                name,
                details,
                image_url,
                created_at,
                deleted_at
                category cat.name,
                brand bra.name
            from alc_car_models car
            inner join alc_car_categories cat
                on car.id_car_category_fk = cat.id_car_category
            inner join alc_car_brands bra
                on car.id_car_brand_fk = bra.id_car_brand
        `
        return data.map((d) => ({
            ...d,
            id_car_model: Number(d.id_car_model),
            id_car_brand_fk: Number(d.id_car_brand_fk),
            id_car_category_fk: Number(d.id_car_category_fk)
        }))
    },
    ['cars-models'],
    { tags: ['cars'] }
)

// create
async function createModel(
    params: CarModel & { id_car_model: number, name: string }
) {
    await sql`
        INSERT INTO alc_car_models ${sql(params)}
    `
}

// update
async function updateModel(
    params: CarModel & { id_car_model: number }
) {
    await sql`
        UPDATE alc_car_models set ${sql(params)}
        where id_car_model = ${params.id_car_model}
    `
}

// delete
async function deleteModel(
    params: CarModel & { id_car_model: number }
) {
    await sql`
        DELETE from alc_car_models
        where id_car_model = ${params.id_car_model}
    `
}

const carService = {
    findModels,
    createModel,
    updateModel,
    deleteModel
}

export default carService