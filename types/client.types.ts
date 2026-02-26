    export interface Client {
        id_client?: number
        name?: string
        email?: string
        created_at?: Date
        deleted_at?: Date
    }

    export interface ClientDB {
        id_client?: string
        name?: string
        email?: string
        created_at?: Date
        deleted_at?: Date
    }

    export type ClientErrors = {
        [K in keyof Client]?: boolean
    }

    export interface ClientReturn<T> {
        success: boolean
        data?: T
        message?: string
        errors?: ClientErrors
    }