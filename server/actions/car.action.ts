'use server'

import { CarErrors, CarModel, CarsReturn } from "@/types/car.types";
import carService from "../services/car.service";

// findModel
export async function findCarModel() {
    try {
        const data = await carService.findModels()
        return data
    } catch (error) {
        console.error('ERROR findCarModel', error)
        return []
    }
}

// createModel
export async function createCarModel(params: CarModel): Promise<CarsReturn> {
    if (!params) return { success: false, message: 'Não foi passado nenhum pârametro' }

    params.name = params.name?.toString().trim()
    params.image_url = params.image_url?.toString().trim()
    params.details = params.details?.toString().trim()

    const errors: CarErrors = {}
    const data: CarModel = {}

    params.name ? data.name = params.name : errors.name = true
    params.image_url ? data.image_url = params.image_url : errors.image_url = true
    params.details ? data.details = params.details : errors.details = true

    if(Object.keys(errors).length > 0) return {success: false, errors}

        try {

        } catch (error) {
            console.error('ERROR createCarModel', error)
            return { success: false, message: 'Erro interno no servidor' }
        }
}

// updateModel

// deleteModel