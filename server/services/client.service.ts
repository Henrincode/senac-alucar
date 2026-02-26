import { Client, ClientDB, ClientReturn } from "@/types/client.types";
import { unstable_cache } from "next/cache";
import sql from "../db";

// find client
const find = unstable_cache(
    async (): Promise<Client[]> => {
        const data = await sql<ClientDB[]>`
            SELECT * FROM alc_clients
        `
        return data.map((d: ClientDB) => ({
            ...d,
            id_client: Number(d.id_client)
        })) as Client[]
    },
    ['clients'],
    { tags: ['clients'] }
)

// find client by id
const findById = unstable_cache(
    async (id: number): Promise<Client | null> => {
        const [data] = await sql<ClientDB[]>`
            SELECT * FROM alc_clients
            where id_client = ${id}
        `
        if (!data) return null
        return { ...data, id_client: Number(data.id_client) } as Client
    },
    ['client-find-by-id'],
    { tags: ['clients'] }
)

// create client
async function create(params: Client & { name: string }): Promise<Client | null> {
    const [data] = await sql<ClientDB[]>`
        INSERT INTO alc_clients ${sql(params)}
        returning *
    `
    if (!data) return null
    return { ...data, id_client: Number(data.id_client) } as Client
}

// update client
async function update(params: Client & { id_client: number, name: string }): Promise<Client | null> {
    const [data] = await sql<ClientDB[]>`
        UPDATE alc_clients set ${sql(params)}
        where id_client = ${params.id_client}
        returning *
    `
    if (!data) return null
    return { ...data, id_client: Number(data.id_client) } as Client
}

// delete client
async function remove(id: number): Promise<Client | null> {
    const [data] = await sql<ClientDB[]>`
        DELETE FROM alc_clients
        where id_client = ${id}
        returning *
    `
    if (!data) return null
    return { ...data, id_client: Number(data.id_client) } as Client
}

const clientService = {
    find,
    findById,
    create,
    update,
    delete: remove
}

export default clientService