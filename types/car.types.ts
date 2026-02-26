export interface CarModel {
    id_car_model?: number
    id_car_brand_fk?: number
    id_car_category_fk?: number
    name?: string
    category?: string | null
    brand?: string | null
    details?: string | null
    image_url?: string | null
    created_at?: Date | null
    deleted_at?: Date | null
}

export type CarModelErrors = {
    [K in keyof Omit<CarModel, 'category' | 'brand'>]?: boolean
}

export interface CarModelReturn<T> {
    data?: T
    success: boolean
    message?: string
    errors?: CarModelErrors
}

// ------------------|
// ------------------| Category
// ------------------|

export interface CarCategory {
    id_car_category?: number
    name?: string
    price?: number
    description?: string
    created_at?: Date
    deleted_at?: Date
}

export type CarCategoryErrors = {
    [K in keyof CarCategory]?: boolean
}

export interface CarCategoryReturn<T> {
    data?: T
    success: boolean
    message?: string
    errors?: CarCategoryErrors
}

// ------------------|
// ------------------| brand
// ------------------|

export interface CarBrand {
    id_car_brand?: number
    name?: string
    image_url?: string
    created_at?: Date
    deleted_at?: Date
}

export type CarBrandErrors = {
    [K in keyof CarBrand]?: boolean
}

export interface CarBrandReturn<T> {
    data?: T
    success: boolean
    message?: string
    errors?: CarBrandErrors
}