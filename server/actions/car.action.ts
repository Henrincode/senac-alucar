'use server'

import { CarModelErrors, CarModel, CarModelReturn, CarCategoryReturn, CarCategory, CarCategoryErrors } from "@/types/car.types";
import carService from "../services/car.service";
import { updateTag } from "next/cache";

// findModel
export async function findCarModel(): Promise<CarModelReturn<CarModel[]>> {
    try {
        const data = await carService.findModels()
        return { success: true, data }
    } catch (error) {
        console.error('ERROR findCarModel', error)
        return { success: false }
    }
}

// createModel
export async function createCarModel(
    params: CarModel & { name: string }
): Promise<CarModelReturn<CarModel>> {

    if (!params) return { success: false, message: 'Não foi passado nenhum pârametro' }
    const id_car_category_fk = params.id_car_category_fk
    const id_car_brand_fk = params.id_car_brand_fk
    const name = params.name?.toString().trim()
    const image_url = params.image_url?.toString().trim() || null
    const details = params.details?.toString().trim() || null

    const errors: CarModelErrors = {}

    if (!id_car_category_fk || isNaN(id_car_category_fk)) errors.id_car_category_fk = true
    if (!id_car_brand_fk || isNaN(id_car_brand_fk)) errors.id_car_brand_fk = true
    if (!name) errors.name = true

    if (Object.keys(errors).length > 0) return { success: false, errors }

    try {
        params = {
            id_car_category_fk, id_car_brand_fk, name, image_url, details
        }

        const data = await carService.createModel(params)
        updateTag('cars')
        return { success: true, data }
    } catch (error) {
        console.error('ERROR createCarModel', error)
        return { success: false, message: 'Erro interno no servidor' }
    }
}

// updateModel
export async function updateCarModel(
    params: CarModel & { id_car_model: number, name: string }
): Promise<CarModelReturn<CarModel>> {

    if (!params) return { success: false, message: 'Não foi passado nenhum pârametro' }
    const id_car_model = params.id_car_model
    const id_car_category_fk = params.id_car_category_fk
    const id_car_brand_fk = params.id_car_brand_fk
    const name = params.name?.toString().trim()
    const image_url = params.image_url?.toString().trim() || null
    const details = params.details?.toString().trim() || null

    const errors: CarModelErrors = {}

    if (!id_car_model || isNaN(id_car_model)) errors.id_car_model = true
    if (!id_car_category_fk || isNaN(id_car_category_fk)) errors.id_car_category_fk = true
    if (!id_car_brand_fk || isNaN(id_car_brand_fk)) errors.id_car_brand_fk = true
    if (!name) errors.name = true

    if (Object.keys(errors).length > 0) return { success: false, errors }

    try {
        params = {
            id_car_model, id_car_category_fk, id_car_brand_fk, name, image_url, details
        }

        const data = await carService.updateModel(params)
        updateTag('cars')
        return { success: true, data }
    } catch (error) {
        console.error('ERROR updateCarModel', error)
        return { success: false, message: 'Erro interno no servidor' }
    }
}

// deleteModel
export async function deleteCarModel(id: number): Promise<CarModelReturn<CarModel>> {
    if (!id || isNaN(id)) return { success: false, message: 'ID não informado' }
    try {
        const data = await carService.deleteModel(id)
        updateTag('cars')
        return { success: true, data }
    } catch (error) {
        console.error(error)
        return { success: false, message: 'Erro interno no servidor' }
    }
}

// ------------------|
// ------------------| category
// ------------------|

// find category
export async function findCarCategories(): Promise<CarCategoryReturn<CarCategory[]>> {
    try {
        const data = await carService.findCategories()
        updateTag('cars')
        return { success: true, data }
    } catch (error) {
        console.error('ERROR ACTION findCarCategories', error)
        return { success: false, message: 'Erro interno no servidor' }
    }
}

// find category by id
export async function findCarCategoryById(id: number): Promise<CarCategoryReturn<CarCategory>> {
    if (!id) return { success: false, message: 'Parametro ID faltando' }
    if (isNaN(id)) return { success: false, message: 'Parametro id deve ser do tipo' }

    try {
        const data = await carService.findCategoryById(id)
        updateTag('cars')
        return { success: true, data }
    } catch (error) {
        console.error('ERROR ACTION findCarCategoryById', error)
        return { success: false, message: 'Erro interno no servidor' }
    }
}

// create category
export async function createCarCategory(
    params: CarCategory & { name: string }
): Promise<CarCategoryReturn<CarCategory>> {

    if (!params) return { success: false, message: 'Não foi passado nenhum pârametro' }
    const name = params.name?.toString().trim()

    const errors: CarCategoryErrors = {}

    if (!name) errors.name = true

    if (Object.keys(errors).length > 0) return { success: false, errors }

    try {
        params = {
            name
        }
        const data = await carService.createCategory(params)
        updateTag('cars')
        return { success: true, data }
    } catch (error) {
        console.error('ERROR ACTION createCarCategory', error)
        return { success: false, message: 'Erro interno no servidor' }
    }
}

// update category
export async function updateCarCategory(
    params: CarCategory & { id_car_category: number, name: string }
): Promise<CarCategoryReturn<CarCategory>> {

    if (!params) return { success: false, message: 'Não foi passado nenhum pârametro' }
    const id_car_category = params.id_car_category
    const name = params.name?.toString().trim()

    const errors: CarCategoryErrors = {}

    if (!id_car_category || isNaN(id_car_category)) errors.id_car_category = true
    if (!name) errors.name = true

    if (Object.keys(errors).length > 0) return { success: false, errors }

    try {
        params = {
            id_car_category, name
        }
        const data = await carService.updateCategory(params)
        updateTag('cars')
        return { success: true, data }
    } catch (error) {
        console.error('ERROR ACTION updateCarCategory', error)
        return { success: false, message: 'Erro interno no servidor' }
    }
}

// delete category
export async function deleteCarCategory(id: number): Promise<CarCategoryReturn<CarCategory>> {
    if (!id) return { success: false, message: 'Parametro ID faltando' }
    if (isNaN(id)) return { success: false, message: 'Parametro id deve ser do tipo' }

    try {
        const data = await carService.deleteCategory(id)
        updateTag('cars')
        return { success: true, data }
    } catch (error) {
        console.error('ERROR ACTION deleteCarCategory', error)
        return { success: false, message: 'Erro interno no servidor' }
    }
}

// ------------------|
// ------------------| brands
// ------------------|

